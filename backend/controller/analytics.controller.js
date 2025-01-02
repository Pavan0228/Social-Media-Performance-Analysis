import fs from 'fs';
import path from 'path';
import { asyncHandler } from '../utils/asyncHandler.js';
import axios from 'axios';

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


export const Analytics_API = asyncHandler(async (req, res) => {
    try {
        const { message } = req.body; // Assuming the message comes in request body

        const apiUrl = 'https://api.langflow.astra.datastax.com/lf/95a48fd4-e2ec-4849-a8d3-979fcdec7e2e/api/v1/run/7c27ac3a-86ce-487c-b556-23fe15e4b3f9';
        
        const requestBody = {
            input_value: message,
            output_type: "chat",
            input_type: "chat",
            tweaks: {
                "File-3cVTS": {},
                "OpenAIEmbeddings-80ESk": {},
                "RecursiveCharacterTextSplitter-KqE0L": {},
                "AstraDB-hDJWJ": {},
                "ChatInput-M6aP0": {},
                "OpenAIEmbeddings-ynHWr": {},
                "AstraDB-TGuhY": {},
                "Prompt-NyZrP": {},
                "ParseData-UZvt6": {},
                "OpenAIModel-gx0dW": {},
                "ChatOutput-tCrRj": {}
            }
        };

        const response = await axios.post(apiUrl, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.LANGFLOW_API_TOKEN}` // Add your token in .env file
            },
            params: {
                stream: false
            }
        });
        
        res.status(200).send(response.data);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error processing request'
        });
    }
});