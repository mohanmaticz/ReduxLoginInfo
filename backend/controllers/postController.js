const { FindMany, FindById, FindByIdAndDelete, FindByIdAndUpdate } = require('../helper/mongooseHelper')
const Post = require('../models/postModel')

//POST - /post/ (To create post)
exports.createPost = async (req, res) => {
    try {
        const {title, content} = req.body
        const post = {
            user: req.user.id,
            title,
            content,
        }

        const newPost = await new Post(post)
        await newPost.save()

        res.status(200).json(newPost)
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

//GET - /post/ (To get all the post)
exports.getPosts = async (req, res) => {
    try {
        const posts = await FindMany(Post)

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

//GET - /post/:id (To get single post)
exports.getPost = async (req, res) => {
    try {
        const {id} = req.params
        const query = {_id: id}
        const selection = {_id: 0, user: 0}
        const post = await FindById(Post, query, selection)

        if (!post) {
            return res.status(404).json({
                success: false,
                error: "Posts not found"
            })
        }

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

//PUT - /post/:id (To edit the post)
exports.editPost = async (req, res) => {
    try {
        const {id} = req.params
        const query = {_id: id}
        const post = await FindById(Post, query)

        if (!post) {
            return res.status(404).json({
                success: false,
                error: "Post not found"
            })
        }

        const newData = req.body
        const selection = {_id: 0, user: 0}
        const updatedPost = await FindByIdAndUpdate(Post, query, newData, selection)
        res.status(200).json({
            success: true,
            updatedPost
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

//DELETE - /post/:id (To delete the post)
exports.deletePost = async (req, res) => {
    try {
        const {id} = req.params
        const query = {_id: id}
        const post = await FindByIdAndDelete(Post, query)

        if (!post) {
            return res.status(404).json({
                success: false,
                error: "Post not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Post removed",
            post
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

