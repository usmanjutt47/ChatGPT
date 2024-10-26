const mongoose = require("mongoose");

const getRandomColor = () => {
  const colors = [
    "#FFADAD",
    "#FFD6A5",
    "#FDFFB6",
    "#CAFFBF",
    "#9BF6FF",
    "#A0C4FF",
    "#BDB2FF",
    "#FFC6FF",
    "#FFFFFC",
    "#E6E6FA",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String },
    content: { type: String },
    color: { type: String, default: getRandomColor },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
