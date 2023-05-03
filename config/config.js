require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/slack-clone',
  SECRET_KEY: process.env.SECRET_KEY || 'mysecretkey',
};
