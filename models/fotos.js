var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');

var fotoSchema = mongoose.Schema({
	imgPath 	: { type: String, required: true}, // the public url for this image
	user 		: {	type : mongoose.Schema.ObjectId, ref  : 'User', required:true}, // link to user
	caption     : String,
	voteCount   : { type: Number, default: 0 },
	voters      : [ { type : mongoose.Schema.ObjectId, ref  : 'User'} ], // link to voters(other users) if any...
	timeStamp   : { type: Date, default: Date.now },
	theme       : { type: mongoose.Schema.ObjectId, ref: 'ContestTheme', required:true}, // link to contest themes
	location    : mongoose.Schema.Types.Point //geoJSON Point object = longitude,latitude for this foto

});

module.exports = mongoose.model('Foto', fotoSchema);