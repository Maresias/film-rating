const knex = require("../database/knex")
const AppError = require("../Utils/AppError")

class NotesController {
    async create(request, response){
        const { rating, tags } = request.body
        const { user_id, movie_id } = request.params

        const filmWasRated = await knex("notes").where({user_id: user_id} && {movie_id: movie_id})

        if(filmWasRated.length !== 0){
            throw new AppError("Filme já avaliado pelo úsuario, caso queira você pode atualizar sua nota")
        }

        if(tags.length === 0 || rating.length === 0){
            throw new AppError("E Necessário 1 Tag e uma Nota")
        }

        const ratingInt = parseInt(rating)


        if(ratingInt > 5 || ratingInt < 1){
            throw new AppError("A nota no filme deve está entre 1 e 5")
        }



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

    async update(request, response){
        const { user_id, note_id } = request.params
        const { rating } = request.body

        const note = await knex("notes").where({id:note_id}).where({user_id:user_id})

        
        if(!note.length){
            throw new AppError("Nota não encontrada")
        }
        
        const ratingInt = parseInt(rating)
        
        if(ratingInt > 5 || ratingInt < 1){
            throw new AppError("A nota no filme deve está entre 1 e 5")
        }

        await knex("notes").where({id:note_id}).update({rating: rating})

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