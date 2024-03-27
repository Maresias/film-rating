const { Router } = require("express")

const UsersController = require("../controllers/UsersController")
const MovieController = require("../controllers/MovieController")

const userRouters = Router()
const usersController = new UsersController()


userRouters.post("/", usersController.create)
userRouters.put("/:id", usersController.update)




module.exports = userRouters