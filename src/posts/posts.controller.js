const service = require("./posts.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const postExists = async (req, res, next) => {
  const { postId } = req.params;
  let foundPost;
  let errorStatus;
  //Conditionals to determine which service function is going to be used
  if (req.originalUrl.includes("comments")) {
    foundPost = await service.readPostComments(postId);
    errorStatus = `Post with ID ${postId} does not exist or there are no comments for the post.`;
  } else {
    foundPost = await service.read(postId);
    errorStatus = `Post with ID ${postId} does not exist.`;
  }
  if (foundPost) {
    res.locals.post = foundPost;
    return next();
  }
  next({
    status: 404,
    message: errorStatus,
  });
};

const VALID_PROPERTIES = ["post_title", "post_content", "user_id"];

const validBodyProperties = (req, res, next) => {
  const { data = {} } = req.body;
  const invalidProperties = Object.keys(data).filter(
    (key) => !VALID_PROPERTIES.includes(key)
  );
  if (invalidProperties.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidProperties.join(" ")}`,
    });
  }
  next();
};

const list = async (req, res) => {
  const data = await service.list();
  res.json({ data });
};

const read = (req, res) => {
  res.json({ data: res.locals.post });
};

const create = async (req, res) => {
  const newPost = {
    ...req.body.data,
  };
  const data = await service.create(newPost);
  res.status(201).json({ data });
};

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(postExists), read],
  create: [validBodyProperties, asyncErrorBoundary(create)],
};
