const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    blogTitle: {
        type: String,
        required: true,
    },
    blogFlair: {
        type: String,
        requried: true,
    },
    blogBody: {
        type: String,
        required: true,
    },
    blogImage: {
        type: String,
        required: false,
    },
},
{timestamps: true}
);

const blog = mongoose.model("blog", blogSchema);
module.exports = blog;
