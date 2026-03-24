const express = require("express")
const { createaccount } = require("../controllers/user.contollers")

const usersRouter = express.Router()

usersRouter.route("/users").post(createaccount)

module.exports = usersRouter