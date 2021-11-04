const users = require("../fixtures/users");

exports.seed = (knex) => {
  return knex
    .raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
    .then(() => knex("users").insert(users));
};