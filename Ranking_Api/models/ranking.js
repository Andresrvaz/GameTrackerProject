const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rankingSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  ranking: {
    type: Array,
  },
});

module.exports = mongoose.model("Ranking", rankingSchema);
