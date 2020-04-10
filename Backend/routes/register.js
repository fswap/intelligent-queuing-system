const express = require('express');
const mongoose = require('mongoose');
const {Customer, validateRequest} = require('../models/customer');

var router = express.Router();

router.post('/', async (req, res) => {
    var {error} = validateRequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await Customer.findOne({aadharNumber: req.body.aadharNumber});
    if (customer) return res.status(400).send("Already registered. Please sign in");

    customer = new Customer({
        aadharNumber: req.body.aadharNumber,
        phoneNumber: req.body.phoneNumber,
        userName: req.body.userName,
        lat: "0",
        long: "0"
    });

    try {
        await customer.save();
        res.send("Registered !");
    } catch (e) {
        console.log(e);
    }
})

module.exports = router