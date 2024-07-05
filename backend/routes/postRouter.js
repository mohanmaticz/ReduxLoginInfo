const express = require("express");
const router = express.Router();

//Importing the api controller
const {
        createPost,
        getPosts,
        getPost,
        editPost,
        deletePost
    } = require("../controllers/postController");

//Importing the JWT Authentication Middleware
const {authVerify} = require("../helper/authVerify")

router.post("/", authVerify, createPost)
router.get("/", authVerify, getPosts)

router.get("/:id", authVerify, getPost)
router.put("/:id", authVerify, editPost)
router.delete("/:id", authVerify, deletePost)

module.exports = router;