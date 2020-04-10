const express = require('express');
const mongoose = require('mongoose');
const {Shop} = require('../models/shop');
const {Item} = require('../models/item');
const customer_auth = require('../middleware/customer-auth');
const geolib = require('geolib');
var router = express.Router();

router.post('/', async (req, res) => {
    Shop.find().then(function(data){
        var sid=[];
        for(var i=0;i<data.length;i++)
        {
            var x = geolib.getPreciseDistance(
                { latitude: req.body.latitude, longitude: req.body.longitude },
                { latitude: data[i].lat, longitude: data[i].long }
            ); 
            if(x<2000)
            {
                sid.push(data[i]._id);
            }
        }
        if(sid.length>0)
        {
            var obj_ids = sid.map(function(id) { return (id); });
            Item.find({sid:{$in:obj_ids}}).exec().then(function(Data){
                if(Data.length>0)
                    return res.status(200).send(Data)
                else
                    return res.status(200).send('No Items Found')
            }).catch((err)=>{
                return res.status(400).send(err)
            })
        }
        else
        {
            return res.status(200).send('No Shops Near Your Locality');
        }
    }).catch((err)=>{
        return res.status(400).send(err)
    })
})

module.exports = router