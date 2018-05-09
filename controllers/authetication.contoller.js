const auth = require('../auth/authentication');
let ApiError = require('../model/ApiError');
const assert = require('assert');

module.exports = {

    validateToken (req, res, next) {
        console.log('validateToken called');
        const token = req.header('x-access-token') || ''

        auth.decodeToken(token, (err, payload) => {
            if (err) {
                // Invalid token
                // Oud: const error = new ApiError(err.message || err, 401);
                next(new ApiError(err.message, 401));
            } else {
                console.log('Authenticated! Payload = ');
                console.dir(payload);
                req.user = payload.sub;
                next();
            }
        });
    },

    login (req, res, next) {
        let username = req.body.username || '';
        let password = req.body.password || '';

        console.log('login called');
        res.send(auth.encodeToken(username));
    },

    register (req, res, next) {
        console.log('register called');

        try {
            assert(typeof (req.body.username) === "string", 'username must be a string');
            assert(typeof (req.body.password) === "string", 'password must be a string');
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 412)
            next(error)
            return
        }

        //Oud:
        // if (req.body.username == null && req.body.password == null) {
        //     next(new ApiError("username and password must be provided", 401));
        // } else if (req.body.username == null) {
        //     next(new ApiError("username must be provided", 401)); 
        // } else if (req.body.password == null) {
        //     next(new ApiError("password must be provided", 401));
        // } else {
            // Voeg toe aan bv. database

            /* Hieronder kan ook: 
            const userinfo {
                token: auth.encodeToken(username);
                password: req.body.password
            }
            res.status(200).json(userinfo).end();
            */

        const userinfo = {
            token: auth.encodeToken(req.body.password),
            username: req.body.username            
        }

            // Oud:
            // res.send(auth.encodeToken(req.body.username));

        res.status(200).json(userinfo).end();
        console.log('register successful');
    }
}