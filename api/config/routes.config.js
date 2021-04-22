const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.middleware');
const passport = require('passport');
const upload = require('./multer.config');
const GOOGLE_SCOPES = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'];

const houses = require('../controllers/houses.controller');
const booking = require('../controllers/bookings.controller');
const users = require('../controllers/users.controller');


router.get('/houses', houses.list);
router.post('/login', users.login);
router.get('/activate', users.activate);
router.get('/register', upload.single('image'), users.register);
router.post('/logout', secure.isAuthenticated, users.logout);

router.post('/users', upload.single('image'), users.create);
router.get('/users/:id', secure.isAuthenticated, users.get);
router.delete('/users/:id', secure.isAuthenticated, users.delete);
router.patch('/users/:id', secure.isAuthenticated, users.update);

router.get('/houses/:id', houses.get);
router.post('/houses', secure.isAuthenticated, upload.single('image'), houses.create);
router.put('/houses/:id', secure.isAuthenticated, upload.single('image'), houses.update);
router.delete('/houses/:id', secure.isAuthenticated, houses.delete);

router.get('/authenticate/google', passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }));
router.get('/authenticate/google/cb', users.loginWithGoogle);

router.get('/users', users.list); 
// router.get('/users', secure.isAuthenticated, secure.checkRole('admin'), users.list); 
// router.get('/users/:id/users-list', secure.isAuthenticated, secure.checkRole('admin'), users.list); 

router.post('/houses/:houseId/bookings', secure.isAuthenticated, upload.single('image'), booking.create);
// router.put('/booking/:id', secure.isAuthenticated, booking.updateBooking);

// router.get('/private', checkRoles('ADMIN'), (req, res) => {
//     res.render('private', { user: req.user });
// });

//Borrar estas 2 lineas cuando churule el compass
// router.get('/users', users.list);
// router.get('/booking', booking.list);

router.post('/totp', users.totp)

module.exports = router;
