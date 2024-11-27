const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    phone: {
        type: String,
        trim: true,
        minlength: [10, 'Phone number must be at least 10 digits'],
        maxlength: [15, 'Phone number cannot exceed 15 digits'],
        validate: {
            validator: function (v) {
                return /\d{10,15}/.test(v);
            },
            message: 'Phone number must contain only digits.',
        },
        default: null,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
