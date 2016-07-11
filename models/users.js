var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username 	: String,
	password    : String,
	email       : String,
	phone       : String
});

module.exports = mongoose.model('User', userSchema);