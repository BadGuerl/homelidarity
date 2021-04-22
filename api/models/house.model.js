const mongoose = require('mongoose');
// const moment = require('moment');
const Schema = mongoose.Schema;
// const User = require('./user.model');

require('../models/user.model')

const houseSchema = new Schema({
    images: {
        type: [String],
        required: 'Se requieren imagenes de la vivienda',
        validate: {
            validator: function (value) {
                try {
                    const url = new URL(value);
                    return url.protocol === 'http:' || url.protocol === 'https:'
                } catch (error) {
                    return false;
                }
            },
            message: props => `URL de la imagen no valida`
        }
    },
    description: {
        type: String,
        required: 'La description es requerida',
        minLength: [50, 'La descripcion necesita 50 caracteres minimo']
    },
    capacity: {
        type: Number,
        required: 'La capacidad es requerida',
        min: [1, 'La capacidad debe ser mayor que 0']
    },
    enabled: { // habilitada movilidad reducida
        type: Boolean
    },
    sponsored: {
        type: Boolean
    },
    address: {
        type: String,
        required: 'La direccion es obligatoria'
    },
    city: {
        type: String,
        required: 'La ciudad es obligatoria'
    },
    postalCode: {
        type: String,
        required: 'El codigo postal es obligatorio'
    },
    farmacia: {
        type: Boolean
    },
    escuela: {
        type: Boolean
    },
    metro: {
        type: Boolean
    },
    supermercado: {
        type: Boolean
    },
    idHost: {
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: void 0,
            required: 'Se requiere la localizacion de la vivienda',
            validate: {
                validator: function ([lng, lat]) {
                    return isFinite(lng) && isFinite(lat) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
                },
                message: props => `Ubicacion no valida`
            }
        }
    }
    // start: {
    //     type: Date,
    //     required: 'La fecha de entrada es requerida',
    //     validate: {
    //         validator: function (value) {
    //             return moment().isBefore(moment(value))
    //         },
    //         message: props => `La entrada no puede ser posterior a la fecha actual`
    //     }
    // },
    // end: {
    //     type: Date,
    //     validate: {
    //         validator: function (value) {
    //             return moment(value).isAfter(moment(this.start)) || moment(value).isSame(moment(this.start))
    //         },
    //         message: props => `La salida no puede ser anterior a la fecha de entrada`
    //     }
    // }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            ret.id = doc.id;
            ret.id = ret.id;
            ret.location = ret.location.coordinates;
            return ret;
        }
    }
});

houseSchema.index({ location: '2dsphere' });

const House = mongoose.model('House', houseSchema);
module.exports = House;