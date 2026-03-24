const express = require("express")
const { addProduct, editPost, deletePost, createPost } = require("../controllers/product.controllers")

const usersRouter = express.Router()

usersRouter
    .route("/post")
    .get(addProduct)      // get posts with users
    .post(createPost)   
    .put(editPost)       // edit post
    .delete(deletePost)  // delete post

module.exports = usersRouter