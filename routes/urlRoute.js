const express = require("express");
const { handleGenerateNewShortURL, redirectUrl, getStats } = require("../controllers/urlController");
const router = express.Router();

router.post("/shorten", handleGenerateNewShortURL);
router.get("/:shortCode", redirectUrl);
router.get("/stats/:shortCode", getStats);

module.exports = router;