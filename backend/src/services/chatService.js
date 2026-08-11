const { ChatGoogle } = require("@langchain/google");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { retrieveDocuments } = require("./retrieveService");

const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash", 
    temperature: 0,
}); 

const getChatResponse = async (question) => {
    // 1. Retrieve relevant chunks from ChromaDB
    const documents = await retrieveDocuments(question);
 
    // 2. Convert retrieved chunks into context
    const context = documents
        .join("\n\n");

    // 3. Give the context + question to Gemini
    const prompt = `
You are an AI assistant that answers questions using the provided document context.
 
Use ONLY the information from the context to answer the question.

If the answer is not present in the context, say:
"I could not find this information in the uploaded documents."

Context:
${context}

Question:
${question}

Answer:
`;

    // 4. Generate answer
    const response = await model.invoke(prompt);

    return response.content;
};

module.exports = {
    getChatResponse,
};