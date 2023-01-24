const express = require('express');

const matchControllers = require('../controllers/matches');

const Router = express.Router();

Router.get('/matches', matchControllers.getMatches);

Router.get('/matches/:Id', matchControllers.getMatch);

// Router.get('/matches/get/reset', matchControllers.getReset);

Router.post('/matches/get/populated', matchControllers.postPopulated);

Router.post('/matches', matchControllers.postMatch);

// Router.post('/matches/:Id', matchControllers.countMatch);

Router.put('/matches/:Id', matchControllers.putFinish);

Router.patch('/matches/:Id', matchControllers.patchScore);

Router.delete('/matches', matchControllers.deleteAllMatches);

Router.delete('/matches/:Id', matchControllers.deleteMatch);

module.exports = Router;
