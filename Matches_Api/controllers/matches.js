/* eslint-disable no-unused-vars */
const Matches = require('../model/matches');
const { v4: uuidv4 } = require('uuid');

exports.getMatches = (req, res, next) => {
	Matches.find({}, (err, result) => {
		if (err) {
			res.status(500).json({
				message: 'Contact admin',
				error: err,
			});
		} else {
			if (result.length > 0) {
				res.status(200).json({
					Matches: result,
				});
			} else {
				res.status(204).json({
					Matches: result,
				});
			}
		}
	});
};

exports.getMatch = (req, res, next) => {
	const target = req.params.Id;

	Matches.findById({ _id: target }, (err, result) => {
		if (err) {
			res.status(500).json(err);
		} else {
			if (result !== null) {
				res.status(200).json({
					match: result,
				});
			} else {
				res.status(204).json();
			}
		}
	});
};

// exports.getReset = (req, res, next) => {
// 	Matches.updateMany(
// 		{},
// 		{ $set: { counted: false } },
// 		{ new: true },
// 		(err, result) => {
// 			if (err) {
// 				res.status(500).json({
// 					message: 'Contact admin',
// 					error: err,
// 				});
// 			} else {
// 				res.status(200).json(result);
// 			}
// 		}
// 	);
// };

exports.postPopulated = (req, res, next) => {
	let resultCount;

	Matches.find({}, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			resultCount = result.length;
		}
	});

	if (resultCount === 0) {
		Matches.insertMany(req.body, { ordered: true }, (err, result) => {
			if (err) {
				console.log(err);
				res.status(500).json({
					message: 'Contact admin',
					err: err,
				});
			} else {
				res.status(204).json({
					Matches: result,
				});
			}
		});
	} else {
		res.stauts(400).json({
			message: 'Bad Request refer to documentation',
		});
	}
};

exports.postMatch = (req, res, next) => {
	let rPlayer1 = false;
	let rPlayer2 = false;
	let player1I;
	let player2I;

	const player1 = req.body.player1;
	const player2 = req.body.player2;

	if (player1 !== player2 && (player1, player2) !== undefined) {
		fetch('http://localhost:8080/api/players')
			.then((response) => response.json())
			.then((data) => {
				data.Users.forEach((player) => {
					if (player._id === player1) {
						rPlayer1 = true;
						player1I = player;
					} else if (player._id === player2) {
						rPlayer2 = true;
						player2I = player;
					}
				});

				if (rPlayer1 === true && rPlayer2 === true) {
					const match = new Matches({
						_id: uuidv4(),
						player1: {
							_id: player1I._id,
							name: player1I.name,
							score: 0,
						},
						player2: {
							_id: player2I._id,
							name: player2I.name,
							score: 0,
						},
						winner: {
							message: 'Match created',
						},
						counted: false,
						finished: false,
					});

					match
						.save()
						.then(
							res.status(201).json({
								message: 'Match saved successfully',
								Match: {
									match,
								},
							})
						)
						.catch((err) => {
							res.status(500).json({
								message: 'Contact Administrator',
								error: err,
							});
						});
				}
			})
			.catch((err) => {
				res.status(500).json({
					message: 'Contact Administrator',
					error: err,
				});
			});
	} else {
		res.status(400).json({
			message: 'Bad Request refer to documentation',
		});
	}
};

exports.putFinish = (req, res, next) => {
	const target = req.params.Id;

	Matches.findByIdAndUpdate(
		{ _id: target },
		{ $set: { finished: true } },
		{ new: true },
		(err, result) => {
			if (err) {
				res.status(500).json({
					message: 'Contact admin',
					error: err,
				});
			} else {
				// eslint-disable-next-line semi
				fetch('http://localhost:8080/api/players-score')
					.then((result) => result.json)
					.then((data) => console.log(data))
					.catch((err) => console.log(err));
				res.status(200).json({
					result,
				});
			}
		}
	);
};

exports.patchScore = (req, res, next) => {
	const target = req.params.Id;
	const targetP = req.body.player;

	if (targetP !== undefined) {
		if (targetP === 'player1' || targetP === 'player2') {
			if (targetP === 'player1') {
				Matches.findById({ _id: target }, (err, result) => {
					if (err) {
						res.status(500).json({
							message: 'Contact admin',
							error: err,
						});
					} else {
						if (result !== null) {
							if (result.finished === false) {
								const targetS = (result.player1.score += 1);
								Matches.findByIdAndUpdate(
									{ _id: target },
									{ $set: { 'player1.score': targetS } },
									{ new: true },
									(err, updatedS) => {
										if (err) {
											console.log(err);
										} else {
											if (updatedS.player2.score < updatedS.player1.score) {
												const score =
													updatedS.player1.score - updatedS.player2.score;
												Matches.findByIdAndUpdate(
													{ _id: target },
													{
														$set: {
															winner: {
																player: updatedS.player1._id,
																name: updatedS.player1.name,
																score: score,
															},
														},
													},
													{ new: true },
													(err, updatedM) => {
														if (err) {
															console.log(err);
														} else {
															res.status(200).json(updatedM);
														}
													}
												);
											} else if (
												updatedS.player2.score === updatedS.player1.score
											) {
												Matches.findByIdAndUpdate(
													{ _id: target },
													{
														$set: {
															winner: {
																message: 'Tie',
															},
														},
													},
													{ new: true },
													(err, updatedM) => {
														if (err) {
															console.log(err);
														} else {
															res.status(200).json(updatedM);
														}
													}
												);
											} else {
												const score =
													updatedS.player2.score - updatedS.player1.score;
												Matches.findByIdAndUpdate(
													{ _id: target },
													{
														$set: {
															winner: {
																player: updatedS.player2._id,
																name: updatedS.player2.name,
																score: score,
															},
														},
													},
													{ new: true },
													(err, updatedM) => {
														if (err) {
															console.log(err);
														} else {
															res.status(200).json(updatedM);
														}
													}
												);
											}
										}
									}
								);
							} else {
								res.status(400).json({
									message: 'Match already finished, please start a new match',
								});
							}
						} else {
							res.status(400).json({
								message: 'Bad result please refer to documentation',
							});
						}
					}
				});
			} else if (targetP === 'player2') {
				Matches.findById({ _id: target }, (err, result) => {
					if (err) {
						console.log(err);
					} else {
						if (result !== null) {
							if (result.finished === false) {
								const targetS = result.player2.score + 1;
								Matches.findByIdAndUpdate(
									{ _id: target },
									{ $set: { 'player2.score': targetS } },
									{ new: true },
									(err, updatedS) => {
										if (err) {
											console.log(err);
										} else {
											if (updatedS.player1.score < updatedS.player2.score) {
												const score =
													updatedS.player2.score - updatedS.player1.score;
												Matches.findByIdAndUpdate(
													{ _id: target },
													{
														$set: {
															winner: {
																player: updatedS.player2._id,
																name: updatedS.player2.name,
																score: score,
															},
														},
													},
													{ new: true },
													(err, updatedM) => {
														if (err) {
															console.log(err);
														} else {
															res.status(200).json(updatedM);
														}
													}
												);
											} else if (
												updatedS.player2.score === updatedS.player1.score
											) {
												Matches.findByIdAndUpdate(
													{ _id: target },
													{
														$set: {
															winner: {
																message: 'Tie',
															},
														},
													},
													{ new: true },
													(err, updatedM) => {
														if (err) {
															console.log(err);
														} else {
															res.status(200).json(updatedM);
														}
													}
												);
											} else {
												const score =
													updatedS.player1.score - updatedS.player2.score;
												Matches.findByIdAndUpdate(
													{ _id: target },
													{
														$set: {
															winner: {
																player: updatedS.player1._id,
																name: updatedS.player1.name,
																score: score,
															},
														},
													},
													{ new: true },
													(err, updatedM) => {
														if (err) {
															console.log(err);
														} else {
															res.status(200).json(updatedM);
														}
													}
												);
											}
										}
									}
								);
							} else {
								res.status(400).json({
									message: 'Match already finished, please start a new match',
								});
							}
						} else {
							res.stauts(400).json({
								message: 'Bad Request refer to documentation',
							});
						}
					}
				});
			}
		} else {
			res.status(400).json({
				message: 'Bad Request please refer to documentation',
			});
		}
	} else {
		res.status(400).json({
			message: 'Bad Request please refer to documentation',
		});
	}
};

exports.deleteAllMatches = (req, res, next) => {
	Matches.deleteMany({}, (err, result) => {
		if (err) {
			res.status(500).json({
				message: 'Contact admin',
				err: err,
			});
		} else {
			res.status(204).json(result);
		}
	});
};

exports.deleteMatch = (req, res, next) => {
	const target = req.params.Id;

	console.log(target);

	Matches.findByIdAndDelete({ _id: target }, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.status(204).json();
		}
	});
};

// exports.countMatch = (req, res, next) => {
// 	const target = req.params.Id;
// 	const count = req.body.counted;

// 	Matches.findByIdAndUpdate(
// 		{ _id: target },
// 		{ $set: { counted: count } },
// 		{ upsert: true, new: true },
// 		(err, result) => {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				res.status(200).json(result);
// 			}
// 		}
// 	);
// };
