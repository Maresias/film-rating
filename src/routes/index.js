const { Router } = require("express")

const userRouter = require("./users.routes")
const movieRouter = require("./movie.routes")
const notesRouter = require("./notes.routes")

const routes = Router()

routes.use("/users", userRouter)
routes.use("/movie", movieRouter)
routes.use("/notes", notesRouter)


module.exports = routes