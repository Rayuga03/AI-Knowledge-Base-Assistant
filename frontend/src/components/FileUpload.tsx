import { useState } from "react";
import api from "../services/api";

function FileUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a PDF.");
            return;
        }

        const formData = new FormData();

        formData.append("document", file);

        setIsUploading(true);

        try {
            const response = await api.post("/api/upload", formData);

            console.log(response.data);

            alert(JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.error(error);

            alert("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <h2>Upload PDF</h2>

            <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                disabled={isUploading}
            />

            <button
                onClick={handleUpload}
                disabled={isUploading}
            >
                {isUploading ? "Uploading..." : "Upload"}
            </button>
        </div>
    );
}

export default FileUpload;