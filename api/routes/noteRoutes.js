const express = require("express");
const { createNote, getNotes } = require("../controllers/note");

const router = express.Router();

router.post("/notes", createNote);
router.get("/notes", getNotes);

module.exports = router;
