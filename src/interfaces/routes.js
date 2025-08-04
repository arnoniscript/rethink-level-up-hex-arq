const express = require('express');
const router = express.Router();
const AuthController = require('./http/AuthController');
const UserRepository = require('../infraestructure/repositories/UserRepository');
const AuthUseCases = require('../application/AuthUseCases');

const userRepository = new UserRepository();
const authUseCases = new AuthUseCases(userRepository, process.env.JWT_SECRET);
const authController = new AuthController(authUseCases);

router.post('/auth/register', (req, res) => authController.register(req, res));
router.post('/auth/login', (req, res) => authController.login(req, res));


module.exports = router;