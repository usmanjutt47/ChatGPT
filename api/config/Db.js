const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://usmanjutt04747:kg9EpS2LVhs4ity0@cluster0.weips.mongodb.net/Sticky-Notes"
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Failed to connect MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;
