import { promises as fs } from "fs";
import path from "path";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadVideoToS3 from "../services/S3.service.js";
import transcribeVideo from "../services/videoTranscription.service.js";
import axios from "axios";

const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/mpeg", "video/quicktime"];

const LANGFLOW_API_URL =
    "https://api.langflow.astra.datastax.com/lf/95a48fd4-e2ec-4849-a8d3-979fcdec7e2e/api/v1/run/de602d29-bd84-4761-80c0-091755d4292a";
const LANGFLOW_Transcibe_TOKEN = process.env.LANGFLOW_Transcibe_TOKEN;

console.log(LANGFLOW_Transcibe_TOKEN);

const cleanupFile = async (filePath) => {
    try {
        filePath && (await fs.unlink(filePath));
    } catch (error) {
        console.error("File cleanup failed:", error);
    }
};

const processVideo = async (file) => {
    if (!ALLOWED_VIDEO_TYPES.includes(file.mimetype)) {
        throw new Error("Invalid file type. Please upload a video file");
    }

    const s3Response = await uploadVideoToS3(file.path);
    return await transcribeVideo(s3Response);
};

const processWithLangflow = async (transcription) => {
    try {
        const response = await axios.post(
            LANGFLOW_API_URL,
            {
                input_value: transcription,
                output_type: "chat",
                input_type: "chat",
                tweaks: {
                    "ChatInput-Hg56Q": {},
                    "OpenAIModel-DDRlg": {},
                    "ChatOutput-7z6FZ": {},
                    "Prompt-AETfb": {},
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${LANGFLOW_Transcibe_TOKEN}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(`Langflow API Error: ${error.message}`);
    }
};

export const uploadTranscript = asyncHandler(async (req, res) => {
    const isVideoUpload = !!req.file;

    try {
        const transcribe = isVideoUpload
            ? await processVideo(req.file)
            : req.body.transcriptionText;
        // console.log(transcribe)
        const langflowResponse = await processWithLangflow(transcribe);
        console.dir(langflowResponse, { depth: null });
        return res.status(200).send(langflowResponse);
    } catch (error) {
        return res
            .status(error.status || 500)
            .send(error.message || "Error processing request");
    } finally {
        if (isVideoUpload) {
            await cleanupFile(req?.file?.path);
        }
    }
});
