const express = require("express");
const Blog = require("../models/blogs");
const router = express.Router();

router.get("/getBlogs", async (req, res) => {
    console.log("getBlogs route accessed.");
    try {
        const blogs = await Blog.find();
        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found." });
        }
        console.log("Blogs found:", blogs);

        const blogData = blogs.map(blog => {
            return {
                _id: blog._id,
                blogTitle: blog.blogTitle,
                blogFlair: blog.blogFlair,
                blogBody: blog.blogBody,
                blogImage: blogImage
            };
        });
        console.log("Mapped canteens data:", blogData);
        res.json(blogData);
        console.log("Data sent to frontend:", blogData);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;
