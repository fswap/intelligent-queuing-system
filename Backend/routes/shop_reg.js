const express = require('express');
const mongoose = require('mongoose');
const {Shop, validateRequest} = require('../models/shop');

var router = express.Router();

router.post('/', async (req, res) => {
    var {error} = validateRequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let shop = await Shop.findOne({aadharNumber: req.body.aadharNumber});
    if (shop) return res.status(400).send("Already registered. Please sign in");

    shop = new Shop({
        aadharNumber: req.body.aadharNumber,
        phoneNumber: req.body.phoneNumber,
        userName: req.body.userName,
        address: req.body.address,
        pincode: req.body.pincode,
        lat: req.body.lat,
        long: req.body.long
    });

    try {
        await shop.save();
        res.send("Registered !");
    } catch (e) {
        console.log(e);
    }
})

module.exports = router