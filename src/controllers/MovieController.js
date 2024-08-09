const knex = require("../database/knex")
const sqliteConnection = require("../database/sqlite")
const AppError = require("../Utils/AppError")

class MovieController {
    async create(request, response){
        const { title, description } = request.body

        if(!title || !description){
            return new AppError("Os campos Titulo e Descrição não podem está vazios")
        }

        const database = await sqliteConnection()

        await database.run(
            "INSERT INTO movie (title, description) VALUES ( ?, ?)", [title, description]
        )

        return response.status(201).json()
    }

    async index(request, response){
        const { title }  = request.query
        const [ movie ] = await knex.select('id', 'title', 'description').from('movie').whereLike("title",`%${title}%`)

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
