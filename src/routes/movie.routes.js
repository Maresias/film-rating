const { Router } = require("express")

const MovieController = require("../controllers/MovieController")


const movieRoutes = Router()
const movieController = new MovieController()

movieRoutes.post("/", movieController.create)

module.exports = movieRoutes