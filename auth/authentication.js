// Authentication using JSON Web Token (JWT)
const settings = require('../config');
const moment = require('moment');
const jwt = require('jwt-simple');

//
// Encode (from username to token)
//
function encodeToken(username) {
    const playload = {
        exp: moment().add(10, 'days').unix(),
        iat: moment().unix(),
        sub: username   // or any object you choose! 
    }
    return jwt.encode(playload, settings.secretKey);
}

//
// Decode (from token to username)
//
function decodeToken(token, callback) {

    try {
        const payload = jwt.decode(token, settings.secretKey);

        // Check if the token has expired.
        const now = moment().unix();
        if (now > payload.exp) {
            // console.log('Token has expired.')
            callback('Token has expired!', null);
        } else {
            callback(null, payload);
        }
    } catch (err) {
        callback(err, null);
    }
}

module.exports = {
    encodeToken,
    decodeToken
}