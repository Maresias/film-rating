const AppError = require("../Utils/AppError")

const sqliteConnection = require("../database/sqlite")

class UsersController {
    async create(request, response){
        const {name, email, password} = request.body

        const database = await sqliteConnection()
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    }
}


module.exports = UsersController