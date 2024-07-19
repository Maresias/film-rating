const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UsersController = require("../controllers/UsersController")
const UserAvatarController = require("../controllers/UserAvatarcController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")


const userRouters = Router()
const upload = multer(uploadConfig.MULTER)



const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

userRouters.post("/", usersController.create)
userRouters.put("/", ensureAuthenticated, usersController.update)
userRouters.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)


module.exports = userRouters