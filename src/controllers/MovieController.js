const sqliteConnection = require("../database/sqlite")

class MovieController {
    async create(request, response){
        const { title, description } = request.body

        const database = sqliteConnection()

        await database.run(
            "INSERT INTO movie (title, description) VALUES ( ?, ?)", [title, description]
        )

        return response.status(201).json()
    }
}

module.exports = MovieController
