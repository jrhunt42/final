var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = mongoose.Schema({
	username 	: { type: String, required:true, unique:true },
	password    : { type: String, required:true },
	email       : String,
	phone       : String
});

// Apply the uniqueValidator plugin to userSchema. 
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);