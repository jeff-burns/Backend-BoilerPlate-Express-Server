exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_input", table => {
    table.string("userName");
    table.string("source");
    table.string("domain");
    table.string("keywords");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("user_input");
};
