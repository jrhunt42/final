angular.module("fotoChallenge")
  .controller("userProfileController",userProfileController);
  
   userProfileController.$inject = ["fotoFactory", "userFactory"];
  function userProfileController(fotoFactory, userFactory){
    var fotoUser = this;
    console.log("fotoUserController");

    fotoUser.fotoFactory = fotoFactory;
    fotoUser.userFactory = userFactory;
    //fotoUser.currentUser = fotoFactory.currentUser;
    fotoFactory.currentTitle = userFactory.currentUser.username + " Profile";
    //fotoUser.loggedIn = fotoFactory.loggedIn;
    //fotoUser.fotoUsers = fotoFactory.fotoUsers;
    fotoUser.fotoGallery = fotoFactory.fotoGallery;
    
    fotoUser.currentUserView = function(foto) {
      //console.info(foto);
      return (foto.user === userFactory.currentUser.username);
    };
    
    fotoUser.deleteFoto = function(foto) {
      console.log("fotoUser delete foto for user: " +foto.user);
      // remove this foto from the owners list of fotos
      var index = fotoFactory.fotoGallery.indexOf(foto);
      //console.log("delete foto found at index: " + index);
      //fotoFactory.fotoGallery.splice(index,1);
    };
    
    fotoUser.addFoto = function(imgName) {
      //take the img name and create a new foto object and add to this users foto array
      //note that we do not have to update carousel since this new foto can not have any votes yet
      console.log("fotoUser add foto with img:" +imgName.name);
      var newImgPath = "./images/"+imgName.name;
      //console.log(newImgPath);
      //console.log(fotoUser.currentUser);
      //var newFoto = new fotoFactory.FotoObject(fotoUser.currentUser.user, newImgPath, "dummy caption", 0, [], [], Date.now());
      //console.log(newFoto);
      //fotoFactory.fotoGallery.push(newFoto);
      
    };

  }