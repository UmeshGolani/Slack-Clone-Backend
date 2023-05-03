const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (payload, expiresIn = '1d') => {
  return jwt.sign(payload, config.jwt.secret, { expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, config.jwt.secret);
};

module.exports = { generateToken, verifyToken };
