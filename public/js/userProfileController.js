angular.module("fotoChallenge")
  .controller("userProfileController",userProfileController);
  
   userProfileController.$inject = ["fotoFactory", "userFactory", "Upload"];
  function userProfileController(fotoFactory, userFactory, Upload){
    var fotoUser = this;
    console.log("fotoUserController");

    fotoUser.fotoFactory = fotoFactory;
    fotoUser.userFactory = userFactory;
    userFactory.showNewUserForm = false;
    fotoUser.showContactInfo = false;
    fotoUser.showAddFoto = false;
    fotoFactory.currentTitle = userFactory.currentUser.username + " Profile";
    fotoUser.fotoGallery = [];
    fotoUser.newFoto = {};
    fotoUser.userQuery={
      user: userFactory.currentUser._id
    };
    
    fotoUser.currentUserView = function(foto) {
      //console.info(foto);
      //TBD don't need this now since backend filtering fotos on get request?
      return (foto.user.username === userFactory.currentUser.username);
    };
    
    fotoUser.deleteFoto = function(foto) {
      //console.log("fotoUser delete foto for user: " +foto.user);
      // remove this foto
      fotoFactory.destroyFoto(foto._id)
      .then(function(response) {
          // update collection of fotos for this user
          fotoUser.getFotos(fotoUser.userQuery);
      })
      .catch(function(error) {
        console.error("userProf unable to delete foto:", error);
      });
    };
    
    fotoUser.addFoto = function(imgName) {
      //take the img and related info and build a new foto object

      //console.log("fotoUser add foto with img:" +imgName.name);
      //temporary path until the backend can store and update with public url
      var newImgPath = "./images/"+imgName.name;
      
//      var fotoSchema = mongoose.Schema({
//      imgPath 	: { type: String, required: true}, // the public url for this image
//      user 		: {	type : mongoose.Schema.ObjectId, ref  : 'User', required:true}, // link to user
//      caption     : String,
//      voteCount   : { type: Number, default: 0 },
//      voters      : [ { type : mongoose.Schema.ObjectId, ref  : 'User'} ], // link to voters(other users) if any...
//      timeStamp   : { type: Date, default: Date.now },
//      theme       : { type: String, default:"All" required:true}, // contest themes
//      locationString: String,  //used as inout to geocode and get position data
//      point    : mongoose.Schema.Types.Point //geoJSON Point object = longitude,latitude for this foto
//                    (NOTE: we will convert to this format on the back end)
//      });
      fotoUser.newFoto = {
        imgPath   : newImgPath, //placeholder path, this will get replaced on backend
        user      : userFactory.currentUser,
        caption   : fotoUser.newCaption,
        voteCount : 0,
        voters    : [],
        timeStamp : Date.now(),
        theme     : fotoUser.newTheme,
        locationString  : fotoUser.newLocation,
        point  : {}
      };
      console.log("userProf newFoto:", fotoUser.newFoto);
      //because we have multipart form, we replace fotoFactory.createFoto(newFoto)
      //this ends up doing a POST request to the specific url
      Upload.upload({
        url   :'/api/v0/fotos',
        data  : {
          files : fotoUser.newImg,
          data  : fotoUser.newFoto
        }
      })
        .then(function(response){
          //console.log("add foto response: ", response);
          // update collection of fotos for this user
          fotoUser.getFotos(fotoUser.userQuery);
          // TBD reset form data
          fotoUser.newImg = {};
          fotoUser.newCaption = "";
          fotoUser.newTheme = "";
          fotoUser.newLocation = "";

        })
        .catch(function(error) {
          console.error("userProf unable to create newFoto:", error);
        });

    };

    fotoUser.getFotos = function(query) {
      //pass in query
      fotoFactory.allFotos(query)
        .then(function(response){
          //console.log("fotoUser getFotos returned:", response);
          // set current fotos
          fotoUser.fotoGallery = response.data;
        })
        .catch(function(err){
          console.log("fotoUser getFotos error:", err);
        });
    };
    
    fotoUser.updateProfile = function() {
      console.log("fotoUser update profile");
      // TBD
      alert("feature not yet implemented");
    };
    
    fotoUser.updateInfo = function(foto) {
      console.log("fotoUser update foto info: ", foto)
      // TBD
      alert("feature not yet implemented")
    }
    
    fotoUser.showContactForm = function() {
      //console.log("show contact info")
      fotoUser.showContactInfo = true;
    }
    
    fotoUser.closeContactForm = function() {
      //console.log("close contact info")    
      fotoUser.showContactInfo = false;
    }
    
    fotoUser.addFotoForm = function() {
      fotoUser.showAddFoto = true;
    }
    
    fotoUser.closeAddFoto = function() {
      fotoUser.showAddFoto = false;
    }
    
    fotoUser.getFotos(fotoUser.userQuery);
}