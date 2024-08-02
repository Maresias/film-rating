const knex = require("../database/knex")
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

    async index(request, response){
        const { title } = request.body
        const [movie ] = await knex("movie").whereLike({title: title})


        return response.json(movie)
    }

    async show(request, response){
        const { id } = request.params

        const movie = await knex("movie").where({id})
        const rating = await knex("notes").where({movie_id:id})
        const tags = await knex("tags").where({movie_id:id})

        return response.json({
            ...movie,
            rating,
            tags
        })
    }
}

module.exports = MovieController
