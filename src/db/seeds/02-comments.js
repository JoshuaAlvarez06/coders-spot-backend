const comments = require("../fixtures/comments");

exports.seed = (knex) => {
  return knex
    .raw("TRUNCATE TABLE comments RESTART IDENTITY CASCADE")
    .then(() => knex("comments").insert(comments));
};