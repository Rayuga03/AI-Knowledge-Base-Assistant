const express = require("express");

const router = express.Router();

const { getChat } = require("../controllers/chatController");

router.post("/", getChat);

module.exports = router;