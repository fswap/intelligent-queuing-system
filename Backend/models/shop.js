const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const shopSchema = mongoose.Schema({
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
    address : {
        type:String,
        required: true
    },
    pincode: {
        type:String,
        required: true
    },
    lat: {
        type:String,
    },
    long: {
        type:String
    }

});

shopSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this.id}, config.get('ConclaveKey'));
    return token;
} 

const Shop = new mongoose.model('Shop', shopSchema, 'Shops');

function validateRequest(body) {
    const schema = {
        aadharNumber: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        userName: Joi.string().required(),
        address: Joi.string().required(),
        pincode: Joi.string().length(6).required(),
        lat: Joi.string().required(),
        long: Joi.string().required()
    }

    return Joi.validate(body, schema);
};

module.exports.Shop = Shop;
module.exports.validateRequest = validateRequest;