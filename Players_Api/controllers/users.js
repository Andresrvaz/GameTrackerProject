/* eslint-disable no-unused-vars */
const Users = require('../model/users');
const { v4: uuidv4 } = require('uuid');

exports.getPlayers = (req, res, next) => {
	Users.find({}, (err, result) => {
		if (err) {
			res.status(500).json({
				message: 'Contact admin',
				error: err,
			});
		} else if (result.length > 0) {
			res.status(200).json({
				Users: result,
			});
		} else {
			res.status(204).json();
		}
	});
};

exports.getPlayer = (req, res, next) => {
	const target = req.params.Id;

	Users.find({ _id: target }, (err, result) => {
		if (err) {
			res.status(500).json({
				message: 'Contact admin',
				error: err,
			});
		} else {
			if (result.length > 0) {
				res.status(200).json(result);
			} else {
				res.status(204).json();
			}
		}
	});
};

exports.postPlayers = (req, res, next) => {
	if (req.body.player === undefined) {
		res.status(400).json({
			message: 'Bad Request, please refer to documentation',
		});
	} else {
		const player = req.body.player;

		if (player.length >= 4 && player.length < 14) {
			const pId = uuidv4();

			const user = new Users({
				_id: pId,
				name: player,
				score: 0,
			});

			user
				.save()
				.then(
					res.status(201).json({
						message: 'Player Registered Succesfully',
						player: {
							id: pId,
							name: player,
							score: 0,
						},
					})
				)
				.catch((err) =>
					res.status(500).json({
						message: 'Contact admin',
						error: err,
					})
				);
		} else {
			res.status(400).json({
				message: 'Bad Request refer to documentation',
			});
		}
	}
};

exports.postPopulatePlayer = (req, res, next) => {
	let resultCount;

	Users.find({}, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			resultCount = result.length;
		}
	});
	console.log(resultCount);
	if (resultCount === undefined || resultCount === 0) {
		Users.insertMany(req.body, { ordered: true }, (err, result) => {
			if (err) {
				console.log(err);
				res.status(500).json({
					message: 'Contact admin',
					err: err,
				});
			} else {
				res.status(204).json({
					Users: result,
				});
			}
		});
	} else {
		res.status(400).json({
			message: 'Bad request refer to documentation',
		});
	}
};

exports.patchPlayer = (req, res, next) => {
	const target = req.params.Id;
	const uTarget = req.body.name;

	if (uTarget !== undefined && uTarget.length >= 4 && uTarget.length < 14) {
		Users.findByIdAndUpdate(
			{ _id: target },
			{ $set: { name: uTarget } },
			{ new: true },
			(err, result) => {
				if (err) {
					res.status(500).json({
						message: 'Contact admin',
						error: err,
					});
				} else {
					res.status(200).json({
						result,
					});
				}
			}
		);
	} else {
		res.status(400).json({
			message: 'Bad request refer to documentation',
		});
	}
};
exports.deleteAllPlayers = (req, res, next) => {
	let isEmpty = false;

	Users.find({}, (err, result) => {
		if (err) {
			res.status(500).json({
				message: 'Contact admin',
				err: err,
			});
		} else {
			if (result.length === 0 || result === undefined || result === null) {
				isEmpty = true;
			}
		}
	});

	if (isEmpty === true) {
		Users.deleteMany({}, (err, result) => {
			if (err) {
				res.status(500).json({
					message: 'Contact admin',
					error: err,
				});
			} else {
				res.status(204).json();
			}
		});
	} else {
		res.status(204).json();
	}
};

exports.deletePlayer = (req, res, next) => {
	const target = req.params.Id;

	Users.findByIdAndDelete({ _id: target }, (err, result) => {
		if (err) {
			res.status(500).json({
				message: 'Contact admin',
				error: err,
			});
		} else {
			res.status(204).json(result);
		}
	});
};

exports.updatePlayerScore = (req, res, next) => {
	console.log('You are here');
	Users.find({}, (err, users) => {
		if (err) {
			res.status(500).json({
				message: 'Contact admin',
				error: err,
			});
		} else {
			users.forEach((user) => {
				fetch('http://localhost:8090/api/matches')
					.then((result) => result.json())
					.then((data) => {
						data.Matches.forEach((match) => {
							if (match.counted === false && match.finished === true) {
								if (user._id === match.winner.player) {
									Users.findByIdAndUpdate(
										{ _id: user._id },
										{ $inc: { score: 1 } }
									).then(() => {
										fetch('http://localhost:8090/api/matches/' + match._id, {
											method: 'POST',
											headers: {
												'Content-type': 'application/json',
											},
											body: JSON.stringify({
												counted: true,
											}),
										})
											.then((response) => response.json())
											.then((data) => {
												res.status(200).json({
													data,
												});
											})
											.catch((err) =>
												res.status(500).json({
													message: 'Contact admin',
													error: err,
												})
											);
									});
								}
							}
						});
					})
					.catch((err) =>
						res.status(500).json({
							message: 'Contact admin',
							error: err,
						})
					);
			});
		}
	});
	res.status(200).json();
};
