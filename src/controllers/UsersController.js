const { hash } = require("bcryptjs")
const AppError = require("../Utils/AppError")

const sqliteConnection = require("../database/sqlite")

class UsersController {
    async create(request, response){
        const {name, email, password} = request.body

        const database = await sqliteConnection()
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if (checkUserExists){
            throw new AppError("Este e-mail já está em uso. ")
        }

        const hashedPassword = await  hash(password, 8)

        await database.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ? )",
            [name, email, hashedPassword]
        )

        return response.status(201).json()
    }

    async update(request, response){
        const {name, email, password } = request.body
        const {id} = request.params

        const database = await database.get("SELECT * FROM users WHERE id = (?)", [id])

        if(!user){
            throw new AppError("Usuário não encontrado")
        }

        const userWithUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(userWithUpdateEmail && userWithUpdateEmail.id !== id){
            throw new AppError("Este e-mail já está em uso. ")
        }

        user.name = name
        user.email = email
        user.password = await hash(password, 8)

        await database.run(
            `UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = ?`,
            [user.name, user.email, user.password, new Date(), id]
        )

        return response.json()

    }
}


module.exports = UsersController