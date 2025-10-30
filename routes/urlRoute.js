const express = require("express");
const { handleGenerateNewShortURL, redirectUrl, getStats } = require("../controllers/urlController");
const router = express.Router();

router.post("/api/shorten", handleGenerateNewShortURL);
router.get("/r/:shortCode", redirectUrl);
router.get("/api/stats/:shortCode", getStats);

module.exports = router;