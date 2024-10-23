const express = require("express");
const path = require("path");
const colors = require("colors");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const port = 3000;

connectDB();

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", noteRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`.green);
});
