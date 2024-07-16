const { Router } = require("express")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const SessionsController = require("../controllers/SessionsController")
const sessionsController = new SessionsController()

const sessionsRoutes = Router()

sessionsRoutes.post("/", ensureAuthenticated, sessionsController.create)

module.exports = sessionsRoutes