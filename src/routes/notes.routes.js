const { Router } = require("express")

const NotesController = require("../controllers/NotesController")

const notesRoutes = Router()

const notesController = new NotesController()

notesRoutes.use("/:user_id/:movie_id", notesController.create)