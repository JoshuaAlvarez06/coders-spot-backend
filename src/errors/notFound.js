const notFound = (req, res, next) => {
    next({
        status: 404,
        message: `Page not found.`
    });
};

module.exports = notFound;