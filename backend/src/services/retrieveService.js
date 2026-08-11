const embeddings = require("../ai/embeddingModel");
const { getCollection } = require("../ai/vectorStore");

const retrieveDocuments = async (question) => {
    // 1. Convert user's question into an embedding
    const queryVector = await embeddings.embedQuery(question);

    // 2. Get our ChromaDB collection
    const collection = await getCollection();

    // 3. Search for the most similar chunks
    const results = await collection.query({
        queryEmbeddings: [queryVector],
        nResults: 10 , //how many top chunks to retrieve
    });
    // console.log("Retrieved documents:", results.documents[0]);

// Return the retrieved document chunks
    return results.documents[0] || [];
    
};

module.exports = {  
    retrieveDocuments ,
};  
