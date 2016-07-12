var Foto  = require('../models/fotos');

module.exports = {
    
	get : function(req, res){
		// Read foto(s)
		if(req.params.id) {
		    //get one
		    console.log("fotoController get one");
		    Foto.findById(req.params.id, function(err,foto) {
		        if(err) {
		            console.error("fotoController: error trying to find a foto");
		            res.status(404).send("no foto found");
		        } else {
		            res.send(foto);
		        }
		    });
		} else {
		    //get all (or many)
		    console.log("fotoController get many");
		    Foto.find({}, function(err, fotos) {
		        if(err) {
		            console.error("fotoController: error trying to find all fotos");
		            res.status(404).send("no fotos");
		        } else {
		            res.send(fotos);
		        }
		    });
		}
	},
	create : function(req, res) {
		console.log("fotoController create foto");
	    // Create a new foto
	    // grab the pieces of the multipart form
	    
	    // write new data to DB so I can get an object ID
	    
	    // use object ID as key for storing image to AWS S3
	    
	    // get public URL for image and update imgPath in DB
	    
	    // now we can finally send response
	    
	},
	update : function(req, res){
		// Update a foto
		//TBD
		console.log("fotoController: unhandled update");
		res.status(501).send("unknown request");
	},
	delete : function(req, res){
		// Delete a foto
		//TBD
		console.log("fotoController: unhandled delete");
		res.status(501).send("unknown request");
	}

};