const Rankings = require("../models/ranking");
const { v4: uuidv4 } = require("uuid");

exports.getRankings = (req, res, next) => {
  Rankings.find({}, (err, result) => {
    if (err) {
      res.status(500).json({
        message: "Contact Admin",
        err: err,
      });
    } else {
      if (result.length > 0 && result !== undefined && result !== null) {
        res.status(200).json({
          result,
        });
      } else {
        res.status(204).json();
      }
    }
  });
};

exports.getRanking = (req, res, next) => {
  const target = req.params.Id;

  Rankings.findById({ _id: target }, (err, result) => {
    if (err) {
      res.status(500).json();
    } else {
      res.status(200).json({
        result,
      });
    }
  });
};

exports.postRanking = (req, res, next) => {
  let playersArr = [];
  let rankedPlayersArr = [];

  fetch("http://localhost:8080/api/players")
    .then((response) => response.json())
    .then((data) => {
      playersArr = data.Users;

      rankedPlayersArr = playersArr.sort((a, b) => {
        return b.score - a.score;
      });

      const ranking = new Rankings({
        _id: uuidv4(),
        ranking: {
          rankedPlayersArr,
        },
      });
      ranking.save().then(res.status(201).json());
    })
    .catch((err) => console.log(err));
};

exports.deleteRanking = (req, res, next) => {
  const target = req.params.Id;

  Rankings.findByIdAndDelete({ _id: target }, (err, result) => {
    if (err) {
      res.status(500).json({
        message: "Contact admin",
        err: err,
      });
    } else {
      res.status(204).json();
    }
  });
};

exports.deleteAllRankings = (req, res, next) => {
  Rankings.deleteMany({}, (err, result) => {
    if (err) {
      res.status(500).json({
        message: "Contact admin",
        err: err,
      });
    } else {
      res.status(204).json();
    }
  });
};
