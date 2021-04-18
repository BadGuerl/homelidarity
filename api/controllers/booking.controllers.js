const mongoose = require('mongoose');
const createError = require('http-errors');
const House = require('../models/house.model');
const Booking = require('../models/booking.model');
const User = require('../models/user.model');

/* Borrar esto cuando churule el compass*/
module.exports.list = (req, res, next) => {
    Booking.find()
        .then(booking => res.json(booking))
        .catch(next)
}
/* hasta aqui*/

module.exports.create = (req, res, next) => {
    House.findById(req.body.idHouse)
        .then(house => {
            // console.log(req.user.balance);
            // console.log(house.docImage);
            if (house) {

                if (req.body.docImage) {
                    Booking.create(req.body)
                        .then(booking => res.status(201).json(booking))
                        .catch(error => {
                            next(error);
                        })
                    // return booking.create({
                    //     status: 'Pendiente de aprobacion',
                    //     house: user.idHouse,
                    //     guest: user.idGuest
                    // })
                    //     .then(booking => {
                    //         if (booking) {
                    //             res.redirect('/houses')
                    //         }
                    //     })
                    //     .catch(createError(403, 'No se ha podido crear el la reserva'))
                } else {
                    next(createError(403, 'No existe ningun documento acreditativo'))
                }
            } else {
                next(createError(404, 'Esta casa no esta disponible'))
            }
        })
        .catch(error => next(error))
}



module.exports.updateBooking = (req, res, next) => {
    const { id } = req.params;

    User.findByIdAndUpdate(id, req.body, { new: false })
        .then(user => res.status(202).json(user))
        .catch(next)
}




module.exports.acceptBooking = (req, res, next) => {
    const bookingId = req.params.id;
    req.body.status = 'Reserva aceptada';
    Booking.findByIdAndUpdate(bookingId, { $set: req.body }, { runValidators: true })
        .then((booking) => {
            if (booking) {
                res.redirect('/house');
            } else {
                next(createError(404, 'Esta reserva no existe'));
            }
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                const booking = req.body;
                booking.id = req.params.id;
                res.render('/house', {
                    errors: error.errors,
                    booking: booking,
                });
            } else {
                next(error);
            }
        });
}

module.exports.cancelBooking = (req, res, next) => {
    const bookingId = req.params.id;
    req.body.status = 'Reserva cancelada';
    Booking.findByIdAndUpdate(bookingId, { $set: req.body }, { runValidators: true })
        .then((booking) => {
            if (booking) {
                res.redirect('/house');
            } else {
                next(createError(404, 'Esta reserva no existe'));
            }
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                const booking = req.body;
                booking.id = req.params.id;
                res.render('/house', {
                    errors: error.errors,
                    booking: booking,
                });
            } else {
                next(error);
            }
        });
}