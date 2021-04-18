const mongoose = require('mongoose');
const totp = require("totp-generator");
const Schema = mongoose.Schema
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    userState: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['GUEST', 'EDITOR', 'ADMIN'],
        default: 'GUEST',
    },
    name: {
        unique: true,
        type: String,
        required: 'Se requiere nombre de usuario'
    },
    email: {
        unique: true,
        type: String,
        required: 'Se requiere un email valido',
        match: [EMAIL_PATTERN, 'El email no es valido']
    },
    totpSecret: {
        type: String,
        required: true,
        default: () =>
            (Math.random().toString(36).substr(2) +
                Math.random().toString(36).substr(2) +
                Math.random().toString(36).substr(2)).slice(0, 16)
    },
    password: {
        type: String,
        required: 'Se requiere una contraseña valida',
        match: [PASSWORD_PATTERN, 'La contraseña no es valida']
    },
    avatar: {
        type: String,
        validate: {
            validator: function (value) {
                try {
                    const url = new URL(value);
                    return url.protocol === 'http:' || url.protocol === 'https:'
                } catch (error) {
                    return false;
                }
            },
            message: props => `URL de imagen no valida`
        }
    },
    verified: {
        date: Date,
        token: {
            type: String,
            default: () =>
                Math.random().toString(36).substr(2) +
                Math.random().toString(36).substr(2) +
                Math.random().toString(36).substr(2),
        }
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            delete ret.totpSecret;
            return ret
        }
    },
    toObject: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            delete ret.totpSecret;
            return ret
        }
    }
})

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10).then((hash) => {
            this.password = hash;
            next();
        });
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
};

// userSchema.methods.getTOTPQR = function () {
//     return `otpauth://totp/Iron%20Events:${this.email}?secret=${this.totpSecret}&issuer=Iron%20Events`
// };

userSchema.methods.checkTOTP = function (code) {
    return totp(this.totpSecret)
};

const User = mongoose.model('User', userSchema);
module.exports = User;