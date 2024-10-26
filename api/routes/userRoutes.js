const express = require("express");
const {
  register,
  getAllUsers,
  login,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-users", getAllUsers);

module.exports = router;
