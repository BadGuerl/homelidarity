  
const passport = require('passport');
const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');

passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then(user => next(null, user))
    .catch(next);
});

passport.use('local-auth', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, next) => {
  User.findOne({ email })
    .then(user => {
      if (!user) {
        next(null, null, { email: 'Email o contraseña no válido'})
      } else {
        return user.checkPassword(password)
          .then(match => {
            if (match) {
              next(null, user)
            } else {
              next(null, null, { email: 'Email o contraseña no válido' })
            }
          })
      }
    }).catch(next)
}));

passport.use('google-auth', new GoogleStrategy({
  clientID: process.env.G_CLIENT_ID,
  clientSecret: process.env.G_CLIENT_SECRET,
  callbackURL: process.env.G_REDIRECT_URI || '/api/authenticate/google/cb',
}, (accessToken, refreshToken, profile, next) => {
  console.log(accessToken);
  console.log(refreshToken);
  console.log(profile);

  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0] ? profile.emails[0].value : undefined;

  if (googleId && name && email) {
    User.findOne({ $or: [
        { email},
        {'social.google': googleId }
      ]})
      .then(user => {
        if (!user) {
          user = new User({
            name,
            email,
            password: mongoose.Types.ObjectId(),
            social: {
              google: googleId
            },
            verified: {
              date: new Date(),
              token: null
            }
          });
          return user.save()
            .then(user => next(null, user))
        } else {
          next(null, user);
        }
      }).catch(next)
  } else {
    next(null, null, { oauth: 'respuesta no válida de google oauth' })
  }
}));