require("dotenv").config({quiet:true});

const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chatRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Backend is running..."); 
});

app.use("/api/chat", chatRoutes);//tells express if any req starting with /api/chat then it should be handled by this route chatRoutes
app.use("/api/upload", uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 

/*Architecture-

React
   ↓
POST /api/chat
   ↓
chatRoutes
   ↓
chatController
   ↓
chatService
   ↓
retrieveService
   ↓
Gemini Embedding
   ↓
ChromaDB
   ↓
Relevant Chunks
   ↓
chatService
   ↓
Gemini LLM
   ↓
Answer
*/ 