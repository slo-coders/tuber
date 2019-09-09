const crypto = require('crypto');

const secret = process.env.HASH_SECRET || 'aBadCryptoSecret';
// const saltySecret = secret + process.env.SALT;

const hash = password =>
  crypto
    .createHmac('sha256', secret)
    .update(password)
    .digest('hex');

module.exports = hash;
