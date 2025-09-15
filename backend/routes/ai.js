const express = require("express");
const { chat, generateArticle } = require("../controllers/aiController");

const router = express.Router();

router.post("/chat", chat);
router.post("/generate-article", generateArticle);

module.exports = router;
