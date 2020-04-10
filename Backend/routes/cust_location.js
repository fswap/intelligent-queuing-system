const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');

const {Customer} = require('../models/customer');
const cust_auth = require('../middleware/customer-auth');

function validateRequest(body) {
    const schema = {
        lat: Joi.string().required(),
        long: Joi.string().required()
    }

    return Joi.validate(body, schema);
}

var router = express.Router();

router.post('/', cust_auth, async (req, res) => {
    var {error} = validateRequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await Customer.findById(req.cust);
    if (!customer) return res.status(400).send("No record found");

    try {
        customer = await Customer.findByIdAndUpdate(req.cust, {
            $set: {
                lat: req.body.lat,
                long: req.body.long
            }
        })

        res.send("Location Updated");
    } catch (e) {
        console.log(e);
        res.status(500).send("Error. Try again");
    }
})

module.exports = router