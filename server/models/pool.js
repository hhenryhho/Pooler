const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const poolSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, unique: true, required: true }, // Unique pool name
	balance: Number,
	stocks: [],
	participants: [],
});

module.exports = mongoose.model('Pool', poolSchema);
