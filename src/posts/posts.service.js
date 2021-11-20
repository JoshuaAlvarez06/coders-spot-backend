const knex = require('../db/connection');

const list = () => {
  return knex('posts as p').select('*');
};

const read = (post_id) => {
  return knex('posts as p').where({ post_id }).first();
};

const readPostComments = (post_id) => {
  return knex('comments as c')
    .join('users as u', 'c.user_id', 'u.id')
    .where({ post_id: post_id });
};

const readComment = (commentId) => {
  return knex('comments').where({ comment_id: commentId }).first();
};

const create = (newPost) => {
  return knex('posts').insert(newPost);
};

const createComment = (newComment) => {
  return knex('comments').insert(newComment, '*');
};

const destroy = (postId) => {
  return knex('posts').where({ post_id: postId }).del();
};

const update = (updatedPost, postId) => {
  return knex('posts').where({ post_id: postId }).update(updatedPost);
};

const destroyComment = (commentId) => {
  return knex('comments').where({ comment_id: commentId }).del();
};

module.exports = {
  list,
  read,
  readPostComments,
  create,
  destroy,
  update,
  createComment,
  destroyComment,
  readComment,
};
