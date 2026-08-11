const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");//Using Google Gemini embeddings

const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-embedding-2",
});

module.exports = embeddings; 