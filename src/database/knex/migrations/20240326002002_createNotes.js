
exports.up = knex => knex.schema.createTable("notes", table => {
    table.increments("id")
    table.integer("rating").notNullable()
    table.integer("user_id").references("id").inTable("users")
    table.integer("movie_id").references("id").inTable("movie")

    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("notes")
