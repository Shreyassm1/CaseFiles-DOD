const express = require("express");
const router = express.Router();
const Blog = require("../models/blogs");

router.post("/blogUpload", async (req, res) => {
    try {
        const { blogTitle, blogFlair, blogBody, blogImage} = req.body;

        if (!blogTitle || !blogFlair || !blogBody || !blogImage) {
            return res.status(400).json({ message: "Invalid request body." });
        }

        const blogInfo = {
            blogTitle,
            blogFlair,
            blogBody,
            blogImage
        };

        await Blog.create(blogInfo);

        return res.status(201).json({ message: "Blog." });
    } catch (error) {
        console.error("Error in /blogUpload:", error);
        return res.status(500).json({ error: "Internal Server error." });
    }
});

module.exports = router;
