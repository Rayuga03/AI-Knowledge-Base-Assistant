const { ChromaClient } = require("chromadb");

///const client = new ChromaClient();
const client = new ChromaClient({
    host: "localhost",
    port: 8000,
});


const COLLECTION_NAME = "knowledge_base";

const getCollection = async () => {
    const collection = await client.getOrCreateCollection({
        name: COLLECTION_NAME,
        embeddingFunction: null,
       
    });

    return collection;
};

module.exports = { getCollection };   