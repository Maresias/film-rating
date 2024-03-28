const knex = require("../database/knex")

class NotesController {
    async create(request, response){
        const { rating, tags } = request.body
        const { user_id, movie_id } = request.params

        const note_id = await knex("notes").insert({
            rating,
            user_id,
            movie_id
        })

    }
}