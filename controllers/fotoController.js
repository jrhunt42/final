var Foto  = require('../models/fotos');
var request = require("request");


//get setup to use AWS S3 for storing actual foto images
var s3 = require('s3');
var mys3bucket = process.env.mys3bucket;
var s3Client = s3.createClient( {
	s3Options	: {
		accessKeyId	: process.env.mys3key,
		secretAccessKey	: process.env.mys3secret
	}
});

//get setup to geocode the provided foto location strings to get lat/long coordinates for each foto
var geocodeQueryUrl = "";


module.exports = {
    
	get : function(req, res){
		// Read foto(s)
		if(req.params.id) {
		    //get one
		    console.log("fotoController get one");
		    Foto.findById(req.params.id)
		    	.populate('user', 'username')
		    	.populate('voters', 'username')
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
		    console.log("fotoController get many, query: ", req.query);
		    Foto.find(req.query)
		    	.populate('user', 'username')
		    	.populate('voters', 'username')
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
		//console.log("fotoController create foto");
	    // Create a new foto
	    // grab the pieces of the multipart form
        var fotoBody = req.body.data;
        var file = req.files.files;
	    
	    //console.log("fotoController req.body.data: ", fotoBody);
	    //console.log("fotoController req.files.files: ", file.path)
	    //console.log("fotoController locationString: ", fotoBody.locationString);
	    
	    //geocode this location string
	    geocodeQueryUrl = "https://www.geocode.farm/v3/json/forward/?addr=" +fotoBody.locationString+"&lang=en&count=1";
	    console.log("geocodeQueryUrl: ", geocodeQueryUrl);
	    
	    var getGeocodePromise = new Promise(function(resolve, reject){
    		request.get(geocodeQueryUrl, function (error, response, body) {
        		if ( error ) { 
        			console.error("geocode query error; ", error);
        			reject(error);
        		}
        		else {
        			//console.log("geocode query success: ", response.body)
        			resolve(response.body);
        		}
    		});
	    });
	    
	    getGeocodePromise.then(function(body){
	    	//console.log("geocodePromise type of body: ", typeof body)
	    	var result = JSON.parse(body);
	    	//console.log("geocodePromise type of geocoding_results.RESULTS: ", typeof result.geocoding_results.RESULTS)
	    	//console.log("geocodePromise result: ",result.geocoding_results.RESULTS[0].COORDINATES);
	    	
	    	//set the locationString field based on geocode lookup
	    	var lat = parseFloat(result.geocoding_results.RESULTS[0].COORDINATES.latitude);
	    	var long = parseFloat(result.geocoding_results.RESULTS[0].COORDINATES.longitude);
	    	fotoBody.point= {
	    		type: "Point",
    			coordinates: [long, lat]
	    	}
	    	//console.log("geocodePromise fotoBody.location : ", fotoBody.point)
	    	//console.log("geocodePromise result: ",body["geocoding_results"]);
    		//console.log("geocodePromise result: ",body.geocoding_results.status);
    		//console.log("geocodePromise result: ",body.geocoding_results.results.coordinates);
    		
    		// write new foto to DB so I can use mongoDB unique object ID as key for S3 storage
	    	//console.log("fotoController after geocode fotoBody : ", fotoBody)
	    	var newFoto = new Foto(fotoBody);
	    	//console.log("fotoController ready to save new foto : ", newFoto)
	    	newFoto.save(function(err, foto) {
		        if(err) {
		            console.error("fotoController: error trying to create foto", JSON.stringify(err));
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
	    		    			console.error("add foto url update error:", err);
	    		    			res.status(500).send("create foto failed");
	    		    		} else {
	    		    			// now we can finally send response to front end
	    		    			//console.log("add foto url update success: ", updateFoto);
		            			res.send( updateFoto);
	    		    		}
	    		    	
	    		    	});
	    		    });
	        	}
	    	});
		})
		.catch(function(error) {
			console.error("geocode promise error: ", error);
			//set the locationString field to some default
			//TBD
		});
	},
	update : function(req, res){
		// Update a foto
		console.log("fotoController update id: ", req.params.id);
		console.log("fotoController update body: ", req.body);
		
		//need to check location string and re-geocode position info if it has changed
		//if (req.body.point === ) {
			// TBD
			// probably need to just do a find first so we have current db location string
			// to compare against and than do simple update if location unchanged
		//}
		
		
		Foto.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, updateFoto) {
			if(err) {
    		   console.error("fotoController db update error:", err);
    		   res.status(500).send("update foto failed");
			} else {
				//console.log("fotoController mongo update success: ", updateFoto);
				// Note: don't need to call populate because success return triggers a refresh
				// which already does the populate
				res.send( updateFoto);
			}
		});
	},
	delete : function(req, res){
		// Delete a foto
		console.log("fotoController delete: ", req.params.id);
		// remember we want to delete from both AWS s3 and mongo 

		Foto.findByIdAndRemove(req.params.id, function(err) {
    		if(err) {
    		   console.error("fotoController db delete error:", err);
    		   res.status(500).send("delete foto failed");
    		} else {
    			console.log("fotoController mongo delete success");
    			var objectKey = req.params.id.toString();
    			var s3Params = {
    		    		Bucket	: mys3bucket,
    		    		Delete	: {
    		    			Objects	: [
    		    				{ Key: objectKey}
    		    			]
    		    		}
    		    };
    		    var deleter = s3Client.deleteObjects(s3Params);
    		    
    		    deleter.on("error", function() {
    		    	console.error("fotoController s3 delete error:", err);
					res.status(500).send("delete foto failed");
    		    });
    		    
    		    deleter.on("end", function() {
    		    	console.log("fotoController s3 delete success");
		    		// now we can finally send response to front end
    		    	console.log("delete foto success: ");
	            	res.status(200).send();
    		    });
    		}
		});
	}

};