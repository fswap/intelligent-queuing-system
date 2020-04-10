const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
  const token = req.header('cust-auth-token');
  if(!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, config.get('ConclaveKey'));
    req.cust = decoded._id;    
    next();
  } catch (e) {
    return res.status(400).send("Invalid token");
  }
};

module.exports = auth;