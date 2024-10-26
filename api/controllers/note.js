const Note = require("../models/Note");

const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = new Note({
      title,
      description,
    });

    await newNote.save();
    res
      .status(201)
      .json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to get notes" });
  }
};

module.exports = {
  createNote,
  getNotes,
};
