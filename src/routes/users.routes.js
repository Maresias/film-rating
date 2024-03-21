const { Router } = require("express")

const UsersController = require("../controllers/UsersController")

const userRouters = Router()
const usersController = new UsersController()


userRouters.post("/", usersController.create)
userRouters.put("/:id", usersController.update)


module.exports = userRouters