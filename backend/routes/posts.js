const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  console.log("Incoming data:", req.body);

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required." });
  }

  try {
    const newPost = new Post({ title, description });
    await newPost.save();

    // emit socket event
    const io = req.app.get("io");
    io.emit("new-post", newPost);

    res.status(201).json(newPost);
      } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

module.exports = router;
