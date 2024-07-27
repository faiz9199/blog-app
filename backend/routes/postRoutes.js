const express = require("express");
const { createPost, getAllPost, getPostById } = require("../controllers/post");
const { upload } = require('../config/multer'); // Ensure the correct path to multer.js
const ensureAuth = require("../config/ensureAuth");
const getUserMiddleware = require("../middlewares/getUserMiddleware");
const router = express.Router();

router.post("/create-post", ensureAuth, getUserMiddleware, upload.single('imagelink'), createPost);
router.get("/get-posts", getAllPost);
router.get("/:id", getPostById);

module.exports = router;
