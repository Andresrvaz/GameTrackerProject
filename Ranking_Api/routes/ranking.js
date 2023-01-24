const express = require("express");

const rankingController = require("../controllers/ranking");

const Router = express.Router();

Router.get("/rankings", rankingController.getRankings);

Router.get("/rankings/:Id", rankingController.getRanking);

Router.post("/rankings/players", rankingController.postRanking);

Router.delete("/rankings/:Id", rankingController.deleteRanking);

Router.delete("/rankings", rankingController.deleteAllRankings);

module.exports = Router;
