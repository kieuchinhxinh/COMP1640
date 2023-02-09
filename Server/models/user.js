const Joi = require('joi')
const mongoose = require('mongoose')

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 300
    },
    confirm_password: {
        type: String,
        required:false
    },
    role: {
        type: String,
        required: true,
    }

}))

function validateUser(user) {
    const schema =Joi.object ({
        name: Joi.string().min(5).max(100).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
        confirm_password: Joi.ref('password'),
        role: Joi.string().required()
    }).with('password', 'confirm_password')
    return schema.validate(user)
}

exports.User = User;
exports.validate = validateUser;
