import https from "https";
import { randomUUID } from "crypto";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function transcribeVideo(filePath, lang = "en", resultType = 1) {
    if (!filePath) {
        throw new Error("filePath is required");
    }

    const apiKeyId = process.env.SPEECHFLOW_API_KEY_ID;
    const apiKeySecret = process.env.SPEECHFLOW_API_KEY_SECRET;


    if (!apiKeyId || !apiKeySecret) {
        throw new Error("API credentials are required");
    }

    const createTranscriptionTask = () => {
        return new Promise((resolve, reject) => {
            let createRequest;

            if (filePath.startsWith("http")) {
                const createData = new URLSearchParams({
                    lang,
                    remotePath: filePath,
                }).toString();

                createRequest = https.request(
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Content-Length": createData.length,
                            keyId: apiKeyId,
                            keySecret: apiKeySecret,
                        },
                        hostname: "api.speechflow.io",
                        path: "/asr/file/v1/create",
                    },
                    handleResponse
                );

                createRequest.write(createData);
            } else {
                const boundary = randomUUID().replace(/-/g, "");
                const formData = createFormData(filePath, boundary);

                createRequest = https.request(
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": `multipart/form-data; boundary=${boundary}`,
                            "Content-Length": formData.length,
                            keyId: apiKeyId,
                            keySecret: apiKeySecret,
                        },
                        hostname: "api.speechflow.io",
                        path: `/asr/file/v1/create?lang=${lang}`,
                    },
                    handleResponse
                );

                createRequest.write(formData);
            }

            function handleResponse(createResponse) {
                let data = "";
                createResponse.on("data", (chunk) => (data += chunk));
                createResponse.on("end", () => {
                    try {
                        const response = JSON.parse(data);
                        if (response.code === 10000) {
                            resolve(response.taskId);
                        } else {
                            reject(new Error(response.msg));
                        }
                    } catch (err) {
                        reject(err);
                    }
                });
            }

            createRequest.on("error", reject);
            createRequest.end();
        });
    };

    const queryTranscriptionResult = (taskId) => {
        return new Promise((resolve, reject) => {
            const queryRequest = https.request(
                {
                    method: "GET",
                    headers: {
                        keyId: apiKeyId,
                        keySecret: apiKeySecret,
                    },
                    hostname: "api.speechflow.io",
                    path: `/asr/file/v1/query?taskId=${taskId}&resultType=${resultType}`,
                },
                (queryResponse) => {
                    let data = "";
                    queryResponse.on("data", (chunk) => (data += chunk));
                    queryResponse.on("end", () => {
                        try {
                            const response = JSON.parse(data);
                            resolve(response);
                        } catch (err) {
                            reject(err);
                        }
                    });
                }
            );

            queryRequest.on("error", reject);
            queryRequest.end();
        });
    };

    const createFormData = (filePath, boundary) => {
        let formData = `--${boundary}\r\n`;
        formData += `Content-Disposition: form-data; name="file"; filename="${getFileNameByPath(
            filePath
        )}"\r\n`;
        formData += "Content-Type: application/octet-stream\r\n\r\n";

        return Buffer.concat([
            Buffer.from(formData, "utf8"),
            fs.readFileSync(filePath),
            Buffer.from(`\r\n--${boundary}--\r\n`, "utf8"),
        ]);
    };

    const getFileNameByPath = (path) => {
        const index = path.lastIndexOf("/");
        return path.substring(index + 1);
    };

    try {
        const taskId = await createTranscriptionTask();

        // Poll for results
        let result;
        while (true) {
            result = await queryTranscriptionResult(taskId);
            if (result.code === 11000) {
                break;
            } else if (result.code !== 11001) {
                throw new Error(result.msg);
            }
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }

        // Parse the result and extract the script
        const parsedResult = JSON.parse(result.result);
        return parsedResult.sentences.map(sentence => sentence.s).join(" ");

    } catch (error) {
        throw new Error(`Transcription failed: ${error.message}`);
    }
}

export default transcribeVideo;