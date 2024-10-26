const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const colors = require("colors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgYellow.italic);
});
