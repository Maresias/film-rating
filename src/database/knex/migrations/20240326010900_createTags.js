
exports.up = knex => knex.schema.createTable("tags", table =>{
    table.increments("id")
    table.text("name").notNullable()

    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE")
    table.integer("user_id").references("id").inTable("users")
    table.integer("movie_id").references("id").inTable("movie")
})

exports.down = knex => knex.schema.dropTable("tags")
