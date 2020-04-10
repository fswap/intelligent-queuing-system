const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const {Shop} = require('../models/shop');

var router = express.Router();

function validateRequest(body) {
    const schema = {
        phoneNumber: Joi.string().required(),
        aadharNumber: Joi.string().required()
    }

    return Joi.validate(body, schema);
};


router.post('/', async(req, res) => {
    var {error} = validateRequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let shop = await Shop.findOne({aadharNumber: req.body.aadharNumber});
    if (!shop) return res.status(400).send("No account is associated with this email address");
    
    if(shop.phoneNumber == req.body.phoneNumber){
        const token = shop.generateAuthToken();
    
        try {
            res.send(token);
        } catch (e) {
            console.log(e);
            res.status(500).send("Please try again")
        }
    } else {
        res.status(400).send("Invalid aadhar number or phone number");
    }
    
})

module.exports = router