const express = require('express');

const populateControllers = require('../controllers/populate');

const Router = express.Router();

Router.get('/populate/matches', populateControllers.postMatchesP);

Router.get('/populate/players', populateControllers.postPlayersP);

module.exports = Router;
