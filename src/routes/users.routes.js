const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UsersController = require("../controllers/UsersController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")


const userRouters = Router()
const upload = multer(uploadConfig.MULTER)



const usersController = new UsersController()

userRouters.post("/", usersController.create)
userRouters.put("/", ensureAuthenticated, usersController.update)
userRouters.patch("/avatar", ensureAuthenticated, upload.single("avatar"), (request, response) => {
    console.log(request.file.filename)
    response.json()
})




module.exports = userRouters