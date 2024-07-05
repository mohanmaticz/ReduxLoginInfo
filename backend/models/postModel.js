const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    user : {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    title : {
        type: String,
        required: [true, "Please enter your email"],
        unique: true
    },
    content : {
        type: String,
        required: [true, "Please enter your password"]
    }
})

const postModel = mongoose.model('Post', postSchema)
module.exports = postModel
