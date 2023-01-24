const Users = require('../models/usersP');
const Matches = require('../models/matchesP');

exports.postMatchesP = (req, res, next) => {
	fetch('http://localhost:8090/api/matches/get/populated', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(Matches),
	})
		.catch((err) => console.log(err))
		.then(res.status(201).json());
};

exports.postPlayersP = (req, res, next) => {
	fetch('http://localhost:8080/api/players/get/populated/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(Users),
	})
		.catch((err) => console.log(err))
		.then(res.status(201).json());
};
