const service = require('./comments.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const hasProperties = require('../utils/hasProperties')
const hasRequiredProperties = hasProperties(
    'post_id',
    'user_id',
    'content',
);



module.exports = {
    
}