const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const profileSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, unique: true, required: true },
	balance: Number,
	friendList: [],
	pools: [],
});

module.exports = mongoose.model('Profile', profileSchema);
