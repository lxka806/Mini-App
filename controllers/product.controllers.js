const path = require("path")

const readFile = require("../utils/readfile")
const writefile = require("../utils/writefile")

const POSTS_PATH = path.join(__dirname, "../data/products.json")
const USERS_PATH = path.join(__dirname, "../data/users.json")

// GET - retrieve all products with user names
// searches for user by userId to attach userName
const addProduct = async (req, res) => {
    try{
        
        const products = await readFile(POSTS_PATH)
        const users = await readFile(USERS_PATH)

        const result = products.map(product => {
            const user = users.find(user => user.id === product.userId)

            return {
                ...product,
                userName: user ? user.userName : "Unknown"
            }
        })

        res.json(result)

    }catch(e){
        res.status(500).json({ message: e.message })
        console.log(e)
    }
}

const { v4: uuidv4 } = require("uuid")

// POST - create new post
// validates userId and content fields
const createPost = async (req, res) => {
    try{
        const { userId, content } = req.body

        if(!userId || !content){
        return res.status(400).json({ message: "Missing fields" })
        }

        const posts = await readFile(POSTS_PATH)

        const newPost = {
        postId: uuidv4(),
        userId,
        content
        }

        posts.push(newPost)
        await writefile(POSTS_PATH, posts)

        res.status(201).json(newPost, POSTS_PATH)

    }catch(e){
        res.status(500).json({ message: e.message })
    }
}

// PUT/PATCH - update existing post
// searches for post by postId, then verifies ownership
const editPost = async (req, res) => {
    try{
        const { postId, userId, content } = req.body

        const posts = await readFile(POSTS_PATH)

        const postIndex = posts.findIndex(p => p.postId === postId) 
        
        if(posts[postIndex].userId !== userId){
            return res.status(403).json({ message: "Not allowed" })
        }

        posts[postIndex].content = content

        await writefile(POSTS_PATH, posts)

        res.json({
            message: "Post updated",
            post: posts[postIndex]
        })

    }catch(e){
        res.status(500).json({ message: e.message })
    }
}

// DELETE - remove existing post
// searches for post by postId, then verifies ownership
const deletePost = async (req, res) => {
    try{
        const { postId, userId } = req.body

        const posts = await readFile(POSTS_PATH)

        const post = posts.find(p => p.postId === postId)

        if(!post){
            return res.status(404).json({ message: "Post not found" })
        }

        if(post.userId !== userId){
            return res.status(403).json({ message: "Not allowed" })
        }

        const newPosts = posts.filter(p => p.postId !== postId)

        await writefile(POSTS_PATH, newPosts)

        res.json({ message: "Post deleted" })

    }catch(e){
        res.status(500).json({ message: e.message })
    }
}


module.exports = {
    addProduct,
    editPost,
    deletePost,
    createPost
}