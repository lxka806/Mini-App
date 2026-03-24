const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 3000
const userRouter = require("./routers/user.route")

app.use(express.json())

app.use("/api", userRouter)

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

