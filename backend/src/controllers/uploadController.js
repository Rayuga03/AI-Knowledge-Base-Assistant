const { saveDocument } = require("../services/uploadService");

const uploadDocument =async (req, res) => {
    const response = await saveDocument(req.file);

    res.status(200).json(response);
};

module.exports = {
    uploadDocument,
};