const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const playerSchema = new Schema({
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
});
module.exports = mongoose.model('Player', playerSchema);
