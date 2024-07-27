const express = require("express");
const {
  registerUser,
  loginUser,
  getLoggedInUser,
} = require("../controllers/user");
const ensureAuth = require("../config/ensureAuth");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", ensureAuth, getLoggedInUser);

module.exports = router;
