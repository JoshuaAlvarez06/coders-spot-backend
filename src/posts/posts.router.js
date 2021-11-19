const router = require('express').Router();
const controller = require('./posts.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router
  .route('/')
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router
  .route('/:postId')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.destroy)
  .all(methodNotAllowed);

router
  .route('/:postId/comments')
  .get(controller.read)
  // .post(controller.createComment)
  .all(methodNotAllowed);

module.exports = router;
