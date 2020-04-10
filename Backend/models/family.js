const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const familySchema = mongoose.Schema({
    coid: {
        type: String,
        required: true
    },
    familyMembers: [{
        aadharNumber: String,
        phoneNumber: String
    }]
});

const Family = new mongoose.model('Family', familySchema, 'Family');

function validateRequest(body) {
    const schema = {
        aadharNumber: Joi.string().required(),
        phoneNumber: Joi.string().required(),
    }

    return Joi.validate(body, schema);
};

module.exports.Family = Family;
module.exports.validateRequest = validateRequest;