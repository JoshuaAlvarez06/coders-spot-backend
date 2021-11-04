const router = require("express").Router();
const controller = require("./posts.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router.route("/:postId").get(controller.read).all(methodNotAllowed);

router.route("/:postId/comments").get(controller.read).all(methodNotAllowed);

module.exports = router;
