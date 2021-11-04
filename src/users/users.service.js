const knex = require("../db/connection");

const list = () => {
  return knex("users").select("*");
};

const read = (user_id) => {
  return knex("users").select("*").where({ user_id }).first();
};

const readUsersPosts = (user_id) => {
  return knex("posts as p")
    .select("*")
    .where({ "p.user_id": user_id })
    .then((response) => {
      if (response.length) {
        response;
      }
    });
};

const readByEmail = (email) => {
  return knex("users").where({ email }).first();
};

const create = (newUser) => {
  return knex("users")
    .insert(newUser, "*")
    .then((rows) => rows[0]);
};

const userExists = (email) => {
  return knex("users").where({ email });
};

const update = (user_id, updatedUser) => {
  return knex("users")
    .where({ user_id })
    .update(updatedUser, "*")
    .then((rows) => rows[0]);
};

const readUsersComments = (user_id) => {
  return knex("comments as c")
    .join("posts as p", "c.post_id", "p.post_id")
    .select("*")
    .where({ "c.user_id": user_id })
    .then((response) => {
      if (response.length) {
        response;
      }
    });
};

module.exports = {
  list,
  read,
  readUsersPosts,
  readUsersComments,
  create,
  update,
  userExists,
  readByEmail,
};
