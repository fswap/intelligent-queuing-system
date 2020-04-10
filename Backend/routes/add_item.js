const express = require('express');
const mongoose = require('mongoose');
const {Item, validateRequest} = require('../models/item');
const shopkeeper_auth = require('../middleware/shopkeeper-auth');

var router = express.Router();

router.post('/', shopkeeper_auth, async (req, res) => {
    var {error} = validateRequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let item = new Item({
        sid: req.shop,
        itemName: req.body.itemName,
        itemPrice: req.body.itemPrice,
        quantityInStock: req.body.quantityInStock

    })
    await item.save().then(()=>{
        return res.status(200).send('Item Uploaded Successfully');
    }).catch((err)=>{
        return res.status(400).send(err);
    })
})

module.exports = router