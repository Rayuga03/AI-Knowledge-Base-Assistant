const { getChatResponse } = require("../services/chatService");

const getChat = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question || !question.trim()) {
            return res.status(400).json({
                success: false,
                message: "Question is required.",
            });
        }

        const answer = await getChatResponse(question);

        res.status(200).json({
            success: true,
            answer,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to generate answer.",
        });
    }
};

module.exports = {
    getChat,
};