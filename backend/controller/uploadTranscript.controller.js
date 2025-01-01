import fs from 'fs';
import path from 'path';
import { asyncHandler } from '../utils/asyncHandler.js';

export const uploadTranscript = asyncHandler(async (req, res) => {
    // Direct path to the VideoTranscript.json file
    const transcriptPath = path.join(process.cwd(), 'VideoTranscript.json');

    // Read the transcript file
    const transcriptData = fs.readFileSync(transcriptPath, 'utf8');
    
    // Parse the JSON data
    const parsedData = JSON.parse(transcriptData);
    
    // Send the response back to frontend
    res.status(200).json({
        success: true,
        data: parsedData
    });
})

