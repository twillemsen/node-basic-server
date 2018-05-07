const routes = require('express').Router();
const AuthController = require('../controllers/authetication.contoller');

routes.post('/login', AuthController.login);
routes.post('/register', AuthController.register);

module.exports = routes;