const sqliteConnection = require("../database/sqlite")

class MovieController {
    async create(request, response){
        const { title, description } = request.body

        const database = await sqliteConnection()

        await database.run(
            "INSERT INTO movie (title, description) VALUES ( ?, ?)", [title, description]
        )

        return response.status(201).json()
    }

    async show(request, response){

    }
}

module.exports = MovieController
