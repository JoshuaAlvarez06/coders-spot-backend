const service = require('./users.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const hasProperties = require('../utils/hasProperties');
const hasRequiredProperties = hasProperties(
  'username',
  'first_name',
  'last_name',
  'email'
);

const userExists = async (req, res, next) => {
  const { userId } = req.params;
  let foundUser;
  let errorStatus;
  //Conditionals to determine which service function is going to be used
  if (req.originalUrl.includes('posts')) {
    foundUser = await service.readUsersPosts(userId);
    errorStatus = `User with ID ${userId} does not exist or there are no posts by the user.`;
  } else if (req.originalUrl.includes('comments')) {
    foundUser = await service.readUsersComments(userId);
    errorStatus = `User with ID ${userId} does not exist or there are no comments by the user.`;
  } else {
    foundUser = await service.read(userId);
    errorStatus = `User with ID ${userId} does not exist.`;
  }
  if (foundUser) {
    res.locals.user = foundUser;
    return next();
  }
  next({
    status: 404,
    message: errorStatus,
  });
};

const userExistsByEmail = async (req, res, next) => {
  const { email } = req.params;
  const foundUser = await service.readByEmail(email);
  if (foundUser) {
    res.locals.userByEmail = foundUser;
    return next();
  }
  next({
    status: 404,
    message: `User with email, ${email}, does not exist`,
  });
};

const VALID_PROPERTIES = ['username', 'first_name', 'last_name', 'email'];

const validBodyProperties = (req, res, next) => {
  const { data = {} } = req.body;
  const invalidProperties = Object.keys(data).filter(
    (key) => !VALID_PROPERTIES.includes(key)
  );
  if (invalidProperties.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidProperties.join(' ')}`,
    });
  }
  next();
};

const list = async (req, res) => {
  const data = await service.list();
  res.json({ data });
};

const read = (req, res) => {
  res.json({ data: res.locals.user });
};

const readByEmail = (req, res, next) => {
  res.json({ data: res.locals.userByEmail });
};

const create = async (req, res, next) => {
  const newUser = {
    ...req.body.data,
  };
  await service.userExists(newUser.email).then(async (data) => {
    if (data.length > 0) {
      res.status(201).json('User Already Exists.');
    }
  });
  await service
    .create(newUser)
    .then((response) => res.json({ data: response }));
};

const update = async (req, res) => {
  const { userId } = req.params;
  const updatedUser = {
    ...req.body.data,
  };
  const data = await service.update(userId, updatedUser);
  res.json({ data });
};

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(userExists), read],
  readByEmail: [asyncErrorBoundary(userExistsByEmail), readByEmail],
  create: [validBodyProperties, asyncErrorBoundary(create)],
  update: [
    asyncErrorBoundary(userExists),
    validBodyProperties,
    asyncErrorBoundary(update),
  ],
};
