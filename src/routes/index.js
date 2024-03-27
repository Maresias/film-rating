const { Router } = require("express")

const userRouter = require("./users.routes")
const movieRouter = require("./movie.routes")

const routes = Router()

routes.use("/users", userRouter)
routes.use("/movie", movieRouter)


module.exports = routes