const express = require('express');
const mongoose = require('mongoose');
const {Family, validateRequest} = require('../models/family');
const customer_auth = require('../middleware/customer-auth');

var router = express.Router();

router.post('/', customer_auth, async (req, res) => {
    var {error} = validateRequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let family = await Family.findOne({coid: req.cust});
    if (!family) {
        family = new Family({
            coid: req.cust
        })

        await family.save()
    }

    try {
        family = await Family.findByIdAndUpdate(family._id, {
            $push: {
                familyMembers : {
                    aadharNumber: req.body.aadharNumber,
                    phoneNumber: req.body.phoneNumber
                }
            }
        }, {new:true});
    
        res.send("Family member added");
    } catch (e) {
        console.log(e);
        res.status(500).send("Error. Try again");
    }
})

module.exports = router