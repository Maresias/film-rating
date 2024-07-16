const { Router } = require("express")

const UsersController = require("../controllers/UsersController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")


const userRouters = Router()
const usersController = new UsersController()



userRouters.post("/", usersController.create)
userRouters.put("/", ensureAuthenticated, usersController.update)




module.exports = userRouters