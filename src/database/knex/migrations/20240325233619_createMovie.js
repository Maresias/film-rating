
exports.up = knex => knex.schema.createTable("movie", table =>{
    table.increments("id")
    table.text("title")
    table.text("description")

    table.timestamp("created_at").default(knex.fn.now())
})

exports.down = kenx => knex.schema.dropTable("movie")
