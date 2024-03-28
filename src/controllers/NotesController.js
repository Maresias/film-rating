const knex = require("../database/knex")

class NotesController {
    async create(request, response){
        const { rating, tags } = request.body
    }
}