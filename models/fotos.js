var mongoose = require('mongoose');

var fotoSchema = mongoose.Schema({
	imgPath 	: String,
	// link to user object
	user 		: {	type : mongoose.Schema.ObjectId, ref  : 'User'},
	caption     : String,
	voteCount   : Number,
	voters      : [{	type : mongoose.Schema.ObjectId, ref  : 'User'} ],
	timeStamp   : Date,
	theme       : String,
//	location    : 

});

module.exports = mongoose.model('Foto', fotoSchema);