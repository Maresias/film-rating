const knex = require("../database/knex")
const AppError = require("../Utils/AppError")

class NotesController {
    async create(request, response){
        const { rating, tags } = request.body
        const { user_id, movie_id } = request.params

        const [note_id] = await knex("notes").insert({
            rating,
            user_id,
            movie_id
        })

        const tagsInsert = tags.map(name =>{

            return {
                name,
                note_id,
                user_id,
                movie_id
            }
        })

        await knex("tags").insert(tagsInsert)

        response.json()
    }

    async show(request, response){
        const { id } = request.params

        const note = await knex("notes").where({id}).first()
        const tags = await knex("tags").where({note_id: id}).orderBy("name")

        return response.json({
            ...note,
            tags
        })
    }

    async delete(request, response){
        const { id } = request.params

        await knex("notes").where({id}).delete()

        return response.json()
    }
}

module.exports = NotesController