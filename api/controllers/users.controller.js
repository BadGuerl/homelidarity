const mongoose = require('mongoose');
const createError = require('http-errors');
const User = require('../models/user.model');
const passport = require('passport');
const mailer = require('../config/mailer.config');

/* Borrar esto cuando churule el compass */
module.exports.list = (req, res, next) => {
    const criteria = req.query;
    User.find(criteria)
        .then(users => res.json(users))
        .catch(next)
}
/* hasta aqui */

module.exports.get = (req, res, next) => {
    // Esto es del login social
    if (req.params.id === 'me') {
        return res.json(req.user)
    }
    
    User.findById(req.params.id)
        .then(user => res.status(200).json(user))
        .catch(next)
}

module.exports.create = (req, res, next) => {

    // if (req.file) {
    //     req.body.image = req.file.url
    // }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                next(createError(400, { errors: { email: 'Este correo ya existe' } }))
            } else {
                return User.create(req.body)
                    .then(user => {
                        mailer.sendValidationEmail(user.email, user.verified.token, user.name);
                        res.status(201).json(user)
                    });
            }
        })
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    const { id } = req.params;
    req.body.userState = false;

    User.findByIdAndUpdate(id, req.body, { new: false })
        .then(user => res.status(204).end())
        .catch(next)
}

module.exports.update = (req, res, next) => {
    const { id } = req.params;

    if (req.file) {
        req.body.image = req.file.url
    }

    User.findByIdAndUpdate(id, req.body, { new: false })
        .then(user => res.status(202).json(user))
        .catch(next)
}

module.exports.login = (req, res, next) => {
    passport.authenticate('local-auth', (error, user, validations) => {
        if (error) {
            next(error);
        } else if (!user) {
            next(createError(400, { errors: validations }))
        } else {
            req.login(user, error => {
                if (error) next(error)
                else res.json(user)
            })
        }
    })(req, res, next);
};

module.exports.register = (req, res, next) => {
    res.render('users/register');
};

module.exports.logout = (req, res, next) => {
    req.logout();
    res.status(204).end()
};

module.exports.totp = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next(createError(401, 'Usuario no autenticado'))
    }

    if (totp(req.user.totpSecret) === req.body.totp) {
        req.session.secondFactor = true
        return res.json(req.user)
    }

    next(createError(400, 'TOTP no válido'))
}

module.exports.activate = (req, res, next) => {
    User.findOneAndUpdate(
        { 'verified.token': req.query.token },
        { $set: { verified: { date: new Date(), token: null } } },
        { runValidators: true }
    ).then(user => {
        if (!user) {
            next(httpError(404, 'Token de activación invalido o expirado'))
        } else {
            res.redirect('/login');
        }
    }).catch(next);
};

module.exports.loginWithGoogle = (req, res, next) => {
    const passportController = passport.authenticate('google-auth', (error, user, validations) => {
        if (error) {
            next(error);
        } else {
            req.login(user, error => {
                if (error) next(error)

                else res.redirect(`${process.env.WEB_URL}/authenticate/google/cb`)
            })
        }
    })

    passportController(req, res, next);
}

module.exports.profile = async (req, res, next) => {
    const { email } = req.user;
    const user = await User.findOne({ email })
    if (!user) return next(createError(404, 'User not found'))

    return res.status(200).json({
        user,
    });
}