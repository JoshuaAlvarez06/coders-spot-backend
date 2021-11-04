const posts = require("../fixtures/posts");

exports.seed = (knex) => {
  return knex
    .raw("TRUNCATE TABLE posts RESTART IDENTITY CASCADE")
    .then(() => knex("posts").insert(posts));
};