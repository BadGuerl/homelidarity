const mongoose = require('mongoose');
const createError = require('http-errors');
const House = require('../models/house.model');
const Booking = require('../models/booking.model');
const User = require('../models/user.model');

/* Borrar esto cuando churule el compass*/
module.exports.list = (req, res, next) => {
   

    Booking.find()
        .populate('idGuest', '_id name email')
        .populate({path:'idHouse',populate:{path:'idHost'}})
        .then(booking =>{
            res.json(booking);
        })
        .catch(next)
}
/* hasta aqui*/

module.exports.get = (req, res, next) => {
    Booking.findById(req.params.id)
        .populate('idGuest', '_id name email')
        .populate('idHouse')
        .then(booking => {
            if (booking) res.json(booking)
            else next(createError(404, 'Booking not found'))
        })
        .catch(next)
}

module.exports.create = (req, res, next) => {
    if (req.body.docImage) {
        Booking.create(req.body)
            .then(booking => res.status(201).json(booking))
            .catch(error => {
                next(error);
            })
    } else {
        next(createError(403, 'No existe ningun documento acreditativo'))
    }
}



module.exports.update = (req, res, next) => {
    const { id } = req.params;

    // Booking.findByIdAndUpdate(id, req.body, { new: false })
    //     .then(booking => res.status(200).json(booking))
    //     .catch(next)
    Booking.findById(id)
        .then(booking => {
            if (!booking) next(createError(404, 'booking not found'))
            else {
                Object.assign(booking, req.body)
                return booking.save()
                    .then(booking => res.json(booking))
            }
        })
}


module.exports.delete = (req, res, next) => {
    const criterial = { _id: req.params.id }
    if (req.user.role !== 'admin') {
        criterial.user = req.user.id;
    }

    Booking.findByIdAndDelete(criterial)
        .then(booking => {
            if (!booking) next(createError(404, 'Booking not found'))
            // else if (booking.host != req.user.id) next(createError(403, 'Only the owner of the house can perform this action'))
            // else return booking.delete();
            else return res.status(204).end();
        })
        .catch(next)
}