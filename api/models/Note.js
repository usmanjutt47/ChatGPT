const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String },
});

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;
