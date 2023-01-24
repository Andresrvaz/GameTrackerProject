const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
	_id: {
		type: String,
		required: true,
	},
	winner: {},
	counted: {
		type: Boolean,
	},
	finished: {
		type: Boolean,
	},
	player1: {
		_id: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		score: {
			type: Number,
			required: true,
		},
	},
	player2: {
		_id: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		score: {
			type: Number,
			required: true,
		},
	},
});

module.exports = mongoose.model('Match', matchSchema);
