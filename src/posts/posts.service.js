const knex = require('../db/connection');

const list = () => {
  return knex('posts as p').select('*');
};

const read = (post_id) => {
  return knex('posts as p').select('*').where({ post_id }).first();
};

const readPostComments = (post_id) => {
  return knex('comments as c')
    .join('users as u', 'c.user_id', 'u.id')
    .select(
      'c.comment_id',
      'c.comment_content',
      'c.created_at',
      'u.first_name',
      'u.last_name',
      'u.username'
    )
    .where({ post_id })
    .then((response) => {
      if (response.length) {
        response;
      }
    });
};

const create = (newPost) => {
  return knex('posts').insert(newPost);
};

module.exports = {
  list,
  read,
  readPostComments,
  create,
};
