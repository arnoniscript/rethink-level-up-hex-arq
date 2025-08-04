const express = require('express');
const router = express.Router();
const AuthController = require('./http/AuthController');
const UserRepository = require('../infraestructure/repositories/UserRepository');
const AuthUseCases = require('../application/AuthUseCases');
const TaskController = require('./http/TaskController');
const TaskUseCases = require('../application/TaskUseCases');
const TaskRepository = require('../infraestructure/repositories/TaskRepository');


const userRepository = new UserRepository();
const authUseCases = new AuthUseCases(userRepository, process.env.JWT_SECRET);
const authController = new AuthController(authUseCases);
const taskRepository = new TaskRepository();
const taskUseCases = new TaskUseCases(taskRepository);
const taskController = new TaskController(taskUseCases);



router.post('/auth/register', (req, res) => authController.register(req, res));
router.post('/auth/login', (req, res) => authController.login(req, res));
router.post('/tasks', (req, res) => taskController.createTask(req, res)); 
router.get('/tasks', (req, res) => taskController.getTasks(req, res));










module.exports = router;