const jwt = require('jsonwebtoken');
const { configs } = require('../config');


const verifyToken = (req, res, next) => {
  const token = req.body.token;
  if (!token) 
    return res.status(403).send("A token is required for authentication");
  
    try {
      const decoded = jwt.verify(token, configs.JWT_KEY);
      req.username = decoded.data;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;
