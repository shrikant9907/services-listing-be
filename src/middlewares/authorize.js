const { StatusCodes } = require('http-status-codes');
const { sendResponse } = require('../utils/helper');

const authorize = (roles) => {
    return (req, res, next) => {
        if (!Array.isArray(roles)) {
            roles = [roles];
        }

        if (roles.includes('admin') && req.user.role === 'admin') {
            return next();
        }

        if (roles.includes('user') && req.user.id === req.params.id) {
            return next();
        }

        return sendResponse(res, StatusCodes.FORBIDDEN, 'Permission denied');
    };
};

module.exports = authorize;
