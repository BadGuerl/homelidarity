const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        next(createError(401, 'El usuario no esta autenticado'))
    }
};
