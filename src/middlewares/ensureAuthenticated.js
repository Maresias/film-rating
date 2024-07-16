const { verify } = require("jsonwebtoken")
const AppError = require("../Utils/AppError")
const authConfig = require("../configs/auth")

function ensureAuthenticated(request, response, next){
    const authHeader = request.headers.authorization
}