const crypto = require('crypto');

// const secret = process.env.HASH_SECRET || 'aBadCryptoSecret';

const hash = password => {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return { salt, hash };
};

const verifyPassword = function(password, userHash, userSalt) {
  let hash = crypto
    .pbkdf2Sync(password, userSalt, 1000, 64, `sha512`)
    .toString(`hex`);
  return userHash === hash ? true : false;
};

module.exports = { hash, verifyPassword };
