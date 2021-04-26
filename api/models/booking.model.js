const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
require('../models/user.model');
require('../models/house.model');

const bookingSchema = new Schema({
  status: {
    type: String,
    enum: ['Pendiente', 'Aceptado', 'Cancelado', 'Finalizado']
  },
  available: {
    type: Boolean
  },
  docImage: {
    type: String,
    required: 'EL documento es obligatorio',
    validate: {
      validator: function (value) {
        try {
          const url = new URL(value);
          return url.protocol === 'http:' || url.protocol === 'https:'
        } catch (error) {
          return false;
        }
      },
      message: props => `La URL de la imagen no es correcta`
    }
  },
  idHouse: {
    type: Schema.Types.ObjectId,
    ref: 'House'
  },
  idGuest: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  start: {
    type: Date,
    required: 'La fecha de entrada es obligatoria',
    validate: {
      validator: function (value) {
        return moment().startOf('day').isBefore(moment(value))
      },
      message: props => `La fecha de entrada no puede ser anterior a la actual`
    }
  },
  end: {
    type: Date,
    validate: {
      validator: function (value) {
        return value? moment(value).isAfter(moment(this.start)):true
      },
      message: props => `La fecha de salida no puede ser anterior a la de entrada`
    }
  },
},
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        ret.id = doc.id;
        return ret;
      }
    }
  });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;