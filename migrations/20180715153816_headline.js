exports.up = function(knex, Promise) {
  return knex.schema.createTable("headline", table => {
    table.increments();
    table.text("name").notNullable();
    table.text("title").notNullable();
    table.text("author").notNullable();
    table.text("description").notNullable();
    table.text("url").notNullable();
    table.text("urlToImage");
    table.string("publishedAt");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("headline");
};
