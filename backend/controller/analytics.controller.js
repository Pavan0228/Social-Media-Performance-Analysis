import fs from 'fs';
import path from 'path';
import { asyncHandler } from '../utils/asyncHandler.js';

export const Analytics = asyncHandler(async (req, res) => {
    // Direct path to the DataAnalysis.json file
    const analysisPath = path.join(process.cwd(), 'DataAnalysis.json');

    // Read the analysis file
    const analysisData = fs.readFileSync(analysisPath, 'utf8');
    
    // Parse the JSON data
    const parsedData = JSON.parse(analysisData);
    
    // Send the response back to frontend
    res.status(200).json({
        success: true,
        data: parsedData
    });
})
