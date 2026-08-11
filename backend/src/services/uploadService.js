const { loadPDF } = require("../ai/documentLoader");
const { splitDocuments } = require("../ai/textSplitter");
const embeddings = require("../ai/embeddingModel"); 
const { getCollection } = require("../ai/vectorStore");

const saveDocument = async (file) => {

    if (!file) {
        return {  
            success: false,
            message: "No file uploaded.",
        };
    }
    const documents = await loadPDF(file.path);
    const chunks = await splitDocuments(documents);
    const vectors = await embeddings.embedDocuments(//generating embeddings for chunks
    chunks.map(chunk => chunk.pageContent)
);
    const collection = await getCollection();

    await collection.add({

    ids: chunks.map((_, index) => `chunk-${Date.now()}-${index}`),

    documents: chunks.map(chunk => chunk.pageContent),

    embeddings: vectors,

    metadata: chunks.map(chunk => ({
    source: chunk.metadata?.source || "",
    page: chunk.metadata?.loc?.pageNumber || null,
})),
    
});

    return {
        success: true,
        message: "Vectors stored successfully.",
        totalChunks: chunks.length,
        totalEmbeddings: vectors.length,
        firstVectorDimension: vectors[0].length
    };
}; 

module.exports = {
    saveDocument,
};