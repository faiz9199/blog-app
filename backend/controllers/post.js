const prisma = require("../db/prisma");
const { uploadImageToSupabase } = require("../config/multer");

const createPost = async (req, res) => {
  const { title, content, published } = req.body;
  const authorId = req.user.id;
  const authorName = req.userDetails.name;

  if (!title || !content || !authorId || !authorName) {
    return res.status(400).json({ err: "Missing required fields" });
  }

  let imagelink = "";

  // Upload the image to Supabase if it exists
  if (req.file) {
    try {
      imagelink = await uploadImageToSupabase(req.file);
    } catch (error) {
      console.error("Error uploading image to Supabase:", error);
      return res.status(500).json({ err: "Error uploading image" });
    }
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        imagelink,
        published: Boolean(published),
        authorId,
        authorName,
      },
    });
    res.status(201).json({ msg: "Post created", post });
  } catch (error) {
    console.error("Prisma error:", error);
    return res.status(500).json({ err: "Internal server error", error });
  }
};

const getAllPost = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({ msg: "Posts retrieved successfully", posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      message: "An error occurred while fetching posts",
      error: error.message,
    });
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(200).json({ msg: "Post retrieved", post });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({
      message: "An error occurred while fetching post",
      error: error.message,
    });
  }
};

module.exports = { createPost, getAllPost, getPostById };
