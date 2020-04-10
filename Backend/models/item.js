const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const item = mongoose.Schema({
    sid: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemPrice: {
        type: String,
        required: true
    },
    quantityInStock: {
        type: String,
        required: true
    }
});

const Item = new mongoose.model('Item', item, 'items');

function validateRequest(body) {
    const schema = {
        sid: Joi.string().required(),
        itemName: Joi.string().required(),
        itemPrice: Joi.string().required(),
        quantityInStock: Joi.string().required(),
    }

    return Joi.validate(body, schema);
};

module.exports.Item = Item;
module.exports.validateRequest = validateRequest;