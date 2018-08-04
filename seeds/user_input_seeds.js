exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("user_input")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("user_input").insert([
        {
          userName: "Jeff",
          source: "http://www.bbc.co.uk/news",
          domain: "bbc.co.uk",
          keywords: "World Cup"
        },
        {
          userName: "putintrump",
          source: "http://www.usatoday.com/news",
          domain: "usatoday.com",
          keywords: "Putin Trump"
        },
        {
          userName: "JB",
          source: "https://www.washingtonpost.com",
          domain: "washingtonpost.com",
          keywords: "Trump Russia"
        }
      ]);
    });
};
