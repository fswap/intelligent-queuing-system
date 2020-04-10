const express = require('express');
const mongoose = require('mongoose');
const {Item, validateRequest} = require('../models/item');
const shopkeeper_auth = require('../middleware/shopkeeper-auth');

var router = express.Router();

router.post('/', shopkeeper_auth, async (req, res) => {

    Item.find({sid: req.shop}).exec().then(async function(data){
        return res.status(200).send(data)
    }).catch((err)=>{
        return res.status(400).send(err);
    })
})

module.exports = router