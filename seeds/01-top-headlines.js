const headlines = require('../data/headlines-seed-data');

exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('headline').del()
  await knex('headline').insert(headlines);
};
