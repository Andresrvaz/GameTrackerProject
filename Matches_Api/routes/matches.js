const express = require('express');

const matchControllers = require('../controllers/matches');

const Router = express.Router();

Router.get('/matches', matchControllers.getMatches);

Router.get('/matches/:Id',matchControllers.getMatch);

Router.post('/matches', matchControllers.postMatch);

Router.patch('/matches/:Id',matchControllers.patchP1Score);

Router.delete('/matches', matchControllers.deleteAllMatches);

Router.delete('/matches/:Id', matchControllers.deleteMatch);

module.exports = Router;