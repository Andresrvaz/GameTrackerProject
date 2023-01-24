const express = require('express');

const userControllers = require('../controllers/users');

const Router = express.Router();

Router.get('/players', userControllers.getPlayers);

Router.get('/players/:Id', userControllers.getPlayer);

Router.get('/players-score', userControllers.updatePlayerScore);

Router.post('/players', userControllers.postPlayers);

Router.post('/players/get/populated', userControllers.postPopulatePlayer)

Router.patch('/players/:Id', userControllers.patchPlayer);

Router.delete('/players', userControllers.deleteAllPlayers);

Router.delete('/players/:Id', userControllers.deletePlayer);

module.exports = Router;
