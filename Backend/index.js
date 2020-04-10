const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EventEmitter = require('events');
const config = require('config');

const register = require('./routes/register');
const login = require('./routes/login');
const add_family = require('./routes/add_family');
const shop_reg = require('./routes/shop_reg');
const add_item = require('./routes/add_item');
const shop_view_items = require('./routes/shop_view_items')
const fetch_shop = require('./routes/fetch_shop');
const shop_login = require('./routes/shop_login');
const cust_location = require('./routes/cust_location');

var app = express();

const ee = new EventEmitter();
ee.setMaxListeners(0);

if (!config.get('ConclaveKey')){
  console.error("Private Key not set");
  process.exit(0);
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Enclave_Conclave", {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => console.log("Connected to MongoDB"))
    .catch(() => console.log("Could not connect to MongoDB"));

app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/register', register);
app.use('/login', login);
app.use('/add-family', add_family);
app.use('/shop-reg', shop_reg);
app.use('/shop-login', shop_login);
app.use('/add-item',add_item);
app.use('/shop-view-items',shop_view_items);
app.use('/cust-location', cust_location)
app.use('/fetch-shop-items',fetch_shop)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})