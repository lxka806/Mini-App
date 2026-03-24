const express = require("express")
const { createaccount, login } = require("../controllers/user.contollers")

const usersRouter = express.Router()

usersRouter.route("/singin").post(createaccount)
usersRouter.route("/login").post(login)

module.exports = usersRouter