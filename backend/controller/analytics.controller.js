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

        const apiUrl = 'https://api.langflow.astra.datastax.com/lf/9cac6bbf-56ea-4f04-8ae0-6362611e8a28/api/v1/run/50c8abcf-3304-4ea7-995a-a6ac6ff16237';
        
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