const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({

    userName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    profilePicture : {
        type : String,
        required: false,
    },
    follower: [{type: ObjectId,ref:"User"}],
    following: [{type: ObjectId,ref:"User"}]
});

const User = mongoose.model("User", userSchema);
module.exports = User;