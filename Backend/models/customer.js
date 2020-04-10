const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const customerSchema = mongoose.Schema({
    aadharNumber: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    lat: {
        type:String,
    },
    long: {
        type:String
    }
});

customerSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this.id}, config.get('ConclaveKey'));
    return token;
} 

const Customer = new mongoose.model('Customer', customerSchema, 'Customers');

function validateRequest(body) {
    const schema = {
        aadharNumber: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        userName: Joi.string().required(),
        lat: Joi.string().allow(''),
        long: Joi.string().allow('')
    }

    return Joi.validate(body, schema);
};

module.exports.Customer = Customer;
module.exports.validateRequest = validateRequest;