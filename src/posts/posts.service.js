const knex = require('../db/connection');

const list = () => {
  return knex('posts as p').select('*');
};

const read = (post_id) => {
  return knex('posts as p').select('*').where({ post_id }).first();
};

const readPostComments = (post_id) => {
  return knex('comments as c')
    .join('posts as p', 'c.post_id', 'p.post_id')
    .select('*')
    .where({ 'c.post_id': post_id })
    .then((response) => {
      if (response.length) {
        response;
      }
    });
};

const create = (newPost) => {
  return knex('posts').insert(newPost);
};

const createComment = (newComment) => {
  return knex('comments as c').insert(newComment).where({ c });
};

module.exports = {
  list,
  read,
  readPostComments,
  create,
};
