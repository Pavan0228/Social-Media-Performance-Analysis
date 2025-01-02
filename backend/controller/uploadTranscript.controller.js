import { promises as fs } from "fs";
import path from "path";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadVideoToS3 from "../services/S3.service.js";
import transcribeVideo from "../services/videoTranscription.service.js";

const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/mpeg", "video/quicktime"];

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

export const uploadTranscript = asyncHandler(async (req, res) => {
    const isVideoUpload = !!req.file;

    try {
        const transcribe = isVideoUpload
            ? await processVideo(req.file)
            : req.body.transcriptionText;

        console.log("Transcription:", transcribe);

        const transcriptPath = path.join(process.cwd(), "VideoTranscript.json");
        const transcriptData = await fs.readFile(transcriptPath, "utf8");
        const parsedData = JSON.parse(transcriptData);

        return res.status(200).json({
            success: true,
            data: parsedData,
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error processing request",
        });
    } finally {
        if (isVideoUpload) {
            await cleanupFile(req?.file?.path);
        }
    }
});
