const express = require("express");
const { saveFiles, readFiles } = require("../controllers/files");
const router = express.Router();

router.post("/upload", saveFiles);

router.get("/:city", readFiles);

module.exports = router;
