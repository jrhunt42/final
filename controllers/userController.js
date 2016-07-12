var User = require('../models/users');

module.exports = {
    
	get : function(req, res){
		// Read user(s)
		if(req.params.id) {
		    //get one
		    console.log("userController get one");
		    User.findById(req.params.id, function(err,user) {
		        if(err) {
		            console.error("userController: error trying to find a user");
		            res.status(404).send("no user found");
		        } else {
		            res.send(user);
		        }
		    });
		} else {
		    //get all (or many)
		    console.log("userController get many");
		    User.find({}, function(err, users) {
		        if(err) {
		            console.error("userController: error trying to find all users");
		            res.status(404).send("no users");
		        } else {
		            res.send(users);
		        }
		    });
		}
	},
	create : function(req, res) {
	    // Create new user
	    console.log("userController create new user");
	    var newUser = new User(req.body);
	    newUser.save(function(err, user) {
	        if(err) {
	            console.error("userController: error trying to create user", err);
	            res.status(500).send("create user failed");
	        } else {
	            res.send( user);
	        }
	    });
	},
	update : function(req, res){
		// Update a user
		//TBD
		console.log("userController: unhandled update");
		res.status(501).send("unknown request");
	},
	delete : function(req, res){
		// Delete a user
		//TBD
		console.log("userController: unhandled delete");
		res.status(501).send("unknown request");
	}

};