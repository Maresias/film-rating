const { Router } = require("express")

const UsersController = require("../controllers/UsersController")
const MovieController = require("../controllers/MovieController")

const userRouters = Router()
const usersController = new UsersController()
const movieController = new MovieController()


userRouters.post("/", usersController.create)
userRouters.put("/:id", usersController.update)

userRouters.post("/",movieController.create)


module.exports = userRouters