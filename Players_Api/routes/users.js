const express = require('express');

const userControllers = require('../controllers/users');

const Router = express.Router();

Router.get('/players',userControllers.getUser);

Router.post('/players',userControllers.postPlayers);

module.exports = Router;