const db = require("./connections");

module.exports = {
  getAll() {
    return db("user_input");
  },
  list() {
    return db("user_input");
  },
  read(userName) {
    return db("user_input")
      .select()
      .where("userName", userName);
    //   .first();
  },
  create(user) {
    return db("user_input")
      .insert(user)
      .returning("*")
      .then(record => record[0]);
  },
  update(userName, user) {
    return db("user_input")
      .update(user)
      .where("userName", userName)
      .returning("*")
      .then(record => record[0]);
  },
  delete(userName) {
    return db("user_input")
      .delete()
      .where("userName", userName)

  }
};
