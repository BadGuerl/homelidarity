const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('../models/house.model');
require('../models/user.model');

const hospitalSchema = new Schema({
    address: {
        type: String,
        required: 'La direccion es obligatoria'
    },
    city: {
        type: String,
        required: 'La ciudad es obligatoria'
    },
    postalCode: {
        type: Number,
        required: 'El codigo postal es obligatorio'
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
            required: 'The location of the event is required',
            validate: {
                validator: function ([lng, lat]) {
                    return isFinite(lng) && isFinite(lat) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
                },
                message: props => `Invalid location coordinates`
            }
        }
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            ret.id = doc.id;
            ret.location = ret.location.coordinates;
            return ret;
        }
    }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;