import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

async function uploadVideoToS3(filePath) {
    try {
        if (!filePath) {
            throw new Error("File path is required");
        }

        const fileName = `${Date.now()}-${path.basename(filePath)}`;
        const fileStream = fs.readFileSync(filePath);

        await s3Client.send(new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `videos/${fileName}`,
            Body: fileStream
        }));

        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/videos/${fileName}`;
    } catch (error) {
        throw new Error(`Upload failed: ${error.message}`);
    }
}

export default uploadVideoToS3;