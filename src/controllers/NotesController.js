const knex = require("../database/knex")
const AppError = require("../Utils/AppError")

class NotesController {
    async create(request, response){
        const { rating, tags, movie_id } = request.body
        const user_id = request.user.id

        const filmWasRated = await knex("notes").where({user_id: user_id}).where({movie_id:movie_id})

        if(filmWasRated.length !== 0){
            throw new AppError("Filme já avaliado")
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
        const { note_id } = request.params
        const { rating } = request.body
        const user_id = request.user.id

        const note = await knex("notes").where({id:note_id}).where({user_id:user_id})

        
        if(!note.length){
            throw new AppError("Nota não encontrada")
        }
        
        const ratingInt = parseInt(rating)
        
        if(ratingInt > 5 || ratingInt < 1){
            throw new AppError("A nota no filme deve está entre 1 e 5")
        }

        await knex("notes").where({id:note_id}).update({rating: rating, updated_:knex.raw(`DATETIME('now')`)})


        response.json()
    }

    async show(request, response){
        const { id }  = request.params

        const note = await knex("notes").select(['notes.id', 'notes.rating', 'movie.title', 'movie.description', 'notes.updated_'])
        .where('notes.id',id)
        .join('movie', 'notes.movie_id', '=', 'movie.id')

        const noteTag = await knex("tags").where('tags.note_id', id)

        const noteWithTag = note.map( notes => {
            return {
                ...notes,
                tag:noteTag
            }
        })
        
        return response.json(noteWithTag)
    }

    async index(request, response){
        const user_id = request.user.id
        const notes  = await knex("notes").select(['notes.id', 'rating', 'notes.movie_id', 'movie.title', 'movie.description'])
        .where('notes.user_id', user_id)
        .join('movie', 'notes.movie_id', '=', 'movie.id')

        const userTags = await knex("tags").where({user_id})

        const notesWithTags = notes.map( note => {
            const noteTags =  userTags.filter( tag => tag.note_id === note.id)

            return {
                ...note,
                tag:noteTags
            }
        })
        return response.json(notesWithTags)
    }

    async delete(request, response){
        const { id } = request.user.id

        await knex("notes").where({id}).delete()

        return response.json()
    }

}

module.exports = NotesController