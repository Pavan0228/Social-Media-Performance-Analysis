import sharp from "sharp";

const thumbnailController = {
    async analyzeThumbnail(req, res) {
        try {
            const {
                file,
                body: { topic },
            } = req;
    
            if (!file)
                return res
                    .status(400)
                    .json({ error: "No image file uploaded" });
            if (!topic)
                return res.status(400).json({ error: "Topic is required" });
    
            const imageBuffer = file.buffer;
            const metadata = await sharp(imageBuffer).metadata();
            const aspectRatio = metadata.width / metadata.height;
    
            const [brightness, contrast, colorVariety, complexity] =
                await Promise.allSettled([
                    this.analyzeBrightness(imageBuffer),
                    this.analyzeContrast(imageBuffer),
                    this.analyzeColorVariety(imageBuffer),
                    this.analyzeComplexity(imageBuffer),
                ]);
    
            // Extract valid scores or use fallback values
            const brightnessScore =
                brightness.status === "fulfilled" ? brightness.value.score : 0;
            const contrastScore =
                contrast.status === "fulfilled" ? contrast.value.score : 0;
            const colorVarietyScore =
                colorVariety.status === "fulfilled" ? colorVariety.value.score : 0;
            const complexityScore =
                complexity.status === "fulfilled" ? complexity.value.score : 0;
    
            const topicAnalysis = this.analyzeTopicRelevance(topic);
            const topicScore = topicAnalysis.score || 0;
    
            const scores = [
                brightnessScore,
                contrastScore,
                colorVarietyScore,
                complexityScore,
                topicScore,
            ];
    
            const overallScore =
                scores.reduce((a, b) => a + b, 0) / scores.length;
    
            const suggestions = [
                ...(brightnessScore < 70 ? [brightness.value?.feedback] : []),
                ...(contrastScore < 70 ? [contrast.value?.feedback] : []),
                ...(colorVarietyScore < 70 ? [colorVariety.value?.feedback] : []),
                ...(complexityScore < 70 ? [complexity.value?.feedback] : []),
                ...(topicScore < 70 ? [topicAnalysis.feedback] : []),
                ...(aspectRatio < 1.7 || aspectRatio > 1.8
                    ? ["Consider using YouTube's recommended 16:9 aspect ratio"]
                    : []),
            ];
    
            return res.json({
                status: "success",
                overall_score: Math.round(overallScore * 100) / 100,
                quality: overallScore >= 70 ? "good" : "needs improvement",
                detailed_scores: {
                    brightness: Math.round(brightnessScore * 100) / 100,
                    contrast: Math.round(contrastScore * 100) / 100,
                    color_variety: Math.round(colorVarietyScore * 100) / 100,
                    visual_complexity: Math.round(complexityScore * 100) / 100,
                    topic_relevance: Math.round(topicScore * 100) / 100,
                },
                suggestions,
                image_metrics: {
                    width: metadata.width,
                    height: metadata.height,
                    aspect_ratio: Math.round(aspectRatio * 100) / 100,
                },
            });
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({
                error: "Failed to analyze thumbnail",
                details: error.message,
            });
        }
    },
    
    async analyzeBrightness(imageBuffer) {
        const { channels } = await sharp(imageBuffer).stats();
        const brightness =
            channels.reduce((sum, channel) => sum + channel.mean, 0) /
            channels.length;
        const score = (brightness / 255) * 100;
        return {
            score,
            feedback:
                score > 30 && score < 85
                    ? "Good brightness level"
                    : "Consider adjusting the brightness",
        };
    },

    async analyzeContrast(imageBuffer) {
        const { channels } = await sharp(imageBuffer).stats();
        const contrast =
            channels.reduce((sum, channel) => sum + channel.stdev, 0) /
            channels.length;
        const score = Math.min((contrast / 128) * 100, 100);
        return {
            score,
            feedback:
                score > 40
                    ? "Good contrast"
                    : "Consider increasing the contrast",
        };
    },

    async analyzeColorVariety(imageBuffer) {
        // Resize the image to simplify color analysis (optional)
        const resizedBuffer = await sharp(imageBuffer)
            .resize(100, 100, { fit: "inside" }) // Reducing image size for faster processing
            .toBuffer();

        // Extract raw pixel data
        const { data } = await sharp(resizedBuffer).raw().toBuffer({ resolveWithObject: true });

        const colorSet = new Set();
        for (let i = 0; i < data.length; i += 3) {
            // Combine RGB values into a single unique string
            const color = `${data[i]}-${data[i + 1]}-${data[i + 2]}`;
            colorSet.add(color);
        }

        // Determine the variety of colors
        const uniqueColorCount = colorSet.size;
        const score = Math.min((uniqueColorCount / 5000) * 100, 100); // Scale based on a threshold

        return {
            score,
            feedback:
                score > 50
                    ? "Good color variety"
                    : "Consider using more contrasting or diverse colors",
        };
    },


    async analyzeComplexity(imageBuffer) {
        const { entropy } = await sharp(imageBuffer).stats();
        const score = Math.min((entropy / 8) * 100, 100);
        return {
            score,
            feedback:
                score > 40
                    ? "Good visual complexity"
                    : "Consider adding more visual elements or text",
        };
    },

    analyzeTopicRelevance(topic) {
        const words = topic.toLowerCase().split(/\s+/);
        const feedback = [
            ...(words.length < 3
                ? ["Consider using a more descriptive topic"]
                : []),
            ...(/\d/.test(topic)
                ? ["Numbers in topics can be attention-grabbing"]
                : []),
            ...(topic.includes("how") || topic.includes("why")
                ? ["Question-based topics often perform well"]
                : []),
        ];
        return {
            score: Math.min(words.length * 20, 100),
            feedback:
                feedback.length > 0
                    ? feedback.join(" | ")
                    : "Topic length and structure look good",
        };
    },
};

export default thumbnailController;
