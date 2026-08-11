import { useState } from "react";
import api from "../services/api";

function Chat() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleAsk = async () => {
        if (!question.trim()) {
            return;
        }

        setIsLoading(true);
        setAnswer("");

        try {
            const response = await api.post("/api/chat", {//API Call/ APT Request ,sent to backend
                question,
            });

            setAnswer(response.data.answer);
        } catch (error) {
            console.error(error);
            setAnswer("Failed to get an answer.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Ask a Question</h2>

            <input
                type="text"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask something about your documents..."
                disabled={isLoading}
            />

            <button
                onClick={handleAsk}
                disabled={isLoading || !question.trim()}
            >
                {isLoading ? "Thinking..." : "Ask"}
            </button>

            {answer && (
                <div>
                    <h3>Answer</h3>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
}

export default Chat;