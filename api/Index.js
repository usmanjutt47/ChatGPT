const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

mongoose
  .connect(
    "mongodb+srv://usmanjutt04747:kg9EpS2LVhs4ity0@cluster0.weips.mongodb.net/Sticky-Notes"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Failed to connect MongoDB", err));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const NoteSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String },
});

const Note = mongoose.model("Note", NoteSchema);

app.post("/notes", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : null;

    const newNote = new Note({
      title,
      description,
      image,
    });

    await newNote.save();
    res
      .status(201)
      .json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to get notes" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
