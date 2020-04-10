const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
  const token = req.header('shop-auth-token');
  if(!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, config.get('ConclaveKey'));
    req.shop = decoded._id;    
    next();
  } catch (e) {
    return res.status(400).send("Invalid token");
  }
};

module.exports = auth;