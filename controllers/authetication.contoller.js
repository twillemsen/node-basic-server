const auth = require('../auth/authentication');
let ApiError = require('../model/ApiError');

module.exports = {

    validateToken (req, res, next) {
        console.log('validateToken called');
        const token = req.header('x-access-token') || ''

        auth.decodeToken(token, (err, payload) => {
            if (err) {
                // Invalid token
                // Oud: const error = new ApiError(err.message || err, 401);
                const error = new ApiError("Not authorised", 401);
                next(error);
            } else {
                console.log('Authenticated! Payload = ');
                console.dir(payload);
                req.user = payload.sub;
                next();
            }
        })
    },

    login (req, res, next) {
        let username = req.body.username || '';
        let password = req.body.password || '';

        console.log('login called');
        res.send(auth.encodeToken(req.username));
    },

    register (req, res, next) {
        console.log('register called');
        res.send(auth.encodeToken(req.body.firstname));
    }
}