const express = require("express");
const {
  register,
  getAllUsers,
  login,
  createNote,
  getUserNotes,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-users", getAllUsers);
router.post("/notes", createNote);
router.get("/:userId/notes", getUserNotes);

module.exports = router;
