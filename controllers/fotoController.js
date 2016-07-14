var Foto  = require('../models/fotos');

//get setup to use AWS S3 for storing actual foto images
var s3 = require('s3');
var mys3bucket = process.env.mys3bucket;
var s3Client = s3.createClient( {
	s3Options	: {
		accessKeyId	: process.env.mys3key,
		secretAccessKey	: process.env.mys3secret
	}
});


module.exports = {
    
	get : function(req, res){
		// Read foto(s)
		if(req.params.id) {
		    //get one
		    console.log("fotoController get one");
		    Foto.findById(req.params.id)
		    	.populate('user', 'username')
		    	.populate('voters')
		    	.exec(function(err, foto){
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
		    Foto.find({})
		    	.populate('user', 'username')
		    	.populate('voters')
		    	.exec(function(err,fotos){
			        if(err) {
		            	console.error("fotoController: error trying to find all fotos");
		            	res.status(404).send("no fotos");
		        	} else {
		        		//console.log("fotoController get many returned: ", fotos);
		            	res.send(fotos);
		        	}
		    	});
		}
	},
	create : function(req, res) {
		console.log("fotoController create foto");
	    // Create a new foto
	    // grab the pieces of the multipart form
        var fotoBody = req.body.data;
        var file = req.files.files;
	    
	    //console.log("fotoController req.body.data: ", fotoBody);
	    //console.log("fotoController req.files.files: ", file.path)
	    
	    // write new foto to DB so I can use mongoDB unique object ID as key for S3 storage
	    var newFoto = new Foto(fotoBody);
	    newFoto.save(function(err, foto) {
	        if(err) {
	            console.error("fotoController: error trying to create foto", err);
	            res.status(500).send("create foto failed");
	        } else {
	        	//console.log("add foto first create: ", foto);

    		    // use object ID of foto as the key for storing image file to AWS S3
    		    // note that S3 wants the key to be a string type
    		    var fileKey = foto._id.toString();
    		    var uploader = s3Client.uploadFile({
    		    	localFile	: file.path,
    		    	s3Params	: {
    		    		Bucket	: mys3bucket,
    		    		Key		: fileKey,
    		    		ACL		: 'public-read'
    		    	}
    		    });
    		    
    		    uploader.on('progress', function() {
    		    	//TBD use progress info in socket?
    		    	console.log("s3 upload progress", uploader.progressAmount, uploader.progressTotal);
    		    });
    		    
    		    uploader.on('end', function() {
    		    	//console.log("s3 upload complete");
    		    	// get public URL for image and update imgPath in DB
    		    	var url = s3.getPublicUrlHttp(mys3bucket, fileKey);
    		    	console.log("s3 upload public url: ", url);
    		    	
    		    	//update the imgPath(=URL) for this foto in DB
    		    	foto.imgPath = url;
    		    	Foto.findByIdAndUpdate(foto._id, foto, {new:true}, function(err,updateFoto) {
    		    		if(err) {
    		    			console.err("add foto url update error:", err);
    		    			res.status(500).send("create foto failed");
    		    		} else {
    		    			// now we can finally send response to front end
    		    			console.log("add foto url update success: ", updateFoto)
	            			res.send( updateFoto);
    		    		}
    		    	
    		    	});
    		    });
	        }
	    });
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
		// remember we want to delete from both AWS s3 and mongo
		res.status(501).send("unknown request");
	}

};