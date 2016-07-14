angular.module("fotoChallenge")
  .controller("userProfileController",userProfileController);
  
   userProfileController.$inject = ["fotoFactory", "userFactory", "Upload"];
  function userProfileController(fotoFactory, userFactory, Upload){
    var fotoUser = this;
    console.log("fotoUserController");

    fotoUser.fotoFactory = fotoFactory;
    fotoUser.userFactory = userFactory;
    fotoFactory.currentTitle = userFactory.currentUser.username + " Profile";
    fotoUser.fotoGallery = [];
    fotoUser.newFoto = {};
    
    
    fotoUser.currentUserView = function(foto) {
      //console.info(foto);
      return (foto.user.username === userFactory.currentUser.username);
    };
    
    fotoUser.deleteFoto = function(foto) {
      console.log("fotoUser delete foto for user: " +foto.user);
      // TBD remove this foto
      //var index = fotoFactory.fotoGallery.indexOf(foto);
      //console.log("delete foto found at index: " + index);
      //fotoFactory.fotoGallery.splice(index,1);
    };
    
    fotoUser.addFoto = function(imgName) {
      //take the img and related info and build a new foto object

      console.log("fotoUser add foto with img:" +imgName.name);
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
//      location    : mongoose.Schema.Types.Point //geoJSON Point object = longitude,latitude for this foto
//      });
      fotoUser.newFoto = {
        imgPath   : newImgPath,
        user      : userFactory.currentUser,
        caption   : "dummy caption",
        voteCount : 0,
        voters    : [],
        timeStamp : Date.now(),
        theme     : "All",
        location  : {}
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
          fotoUser.getFotos();
          // TBD reset form data

        })
        .catch(function(error) {
          console.error("userProf unable to create newFoto:", error);
        });

    };

    fotoUser.getFotos = function() {
      //pass in query string?
      fotoFactory.allFotos()
        .then(function(response){
          console.log("fotoUser getFotos returned:", response);
          //now filter by userId?
          // set current fotos
          fotoUser.fotoGallery = response.data;
        })
        .catch(function(err){
          console.log("fotoUser getFotos error:", err);
        });
    };
    
    fotoUser.getFotos();
}