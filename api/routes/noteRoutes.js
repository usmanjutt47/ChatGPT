const express = require("express");
const multer = require("multer");
const { createNote, getNotes } = require("../controllers/note");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/notes", upload.single("image"), createNote);
router.get("/notes", getNotes);

module.exports = router;
