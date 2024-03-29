const { Router } = require("express")

const NotesController = require("../controllers/NotesController")

const notesRoutes = Router()

const notesController = new NotesController()

notesRoutes.post("/:user_id/:movie_id", notesController.create)
notesRoutes.get("/:id", notesController.show)
notesRoutes.delete("/:id", notesController.delete)
notesRoutes.put("/:user_id/:note_id", notesController.update)

module.exports = notesRoutes