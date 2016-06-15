angular.module("fotoChallenge")
  .controller("userProfileController",userProfileController);
  
   userProfileController.$inject = ["fotoFactory"];
  function userProfileController(fotoFactory){
    var fotoUser = this;
    console.log("fotoUserController");

    fotoUser.title = "User Profile";
    fotoUser.currentUser = fotoFactory.currentUser;
    fotoUser.loggedIn = fotoFactory.loggedIn;
    fotoUser.fotoUsersList = fotoFactory.fotoUsersList;
    
    fotoUser.deleteFoto = function(foto) {
      console.log("fotoUser delete foto for user: " +foto.user);
      // remove this foto from the owners list of fotos
      var index = fotoFactory.fotoUsersList[foto.user].fotos.indexOf(foto);
      console.log("delete foto found at index: " + index);
      fotoFactory.fotoUsersList[foto.user].fotos.splice(index,1);
      
      // if this foto was in carousel, update carousel
      if(foto.inCarousel) {
        // need to update carousel
        fotoFactory.fotoCarousel.fotoCarouselUpdate();
      }
    };
    
    fotoUser.addFoto = function(imgName) {
      //take the img name and create a new foto object and add to this users foto array
      //note that we do not have to update carousel since this new foto can not have any votes yet
      console.log("fotoUser add foto with img:" +imgName.name);
      var newImgPath = "https://cohort-work-jrhunt42.c9users.io/midterm/images/"+imgName.name;
      //var newImgPath = "http://i1126.photobucket.com/albums/l615/jrhunt42/IMGP1268_zpsjkknzg8o.jpg";
      console.log(newImgPath);
      console.log(fotoUser.currentUser);
      var newFoto = new fotoFactory.FotoObject(fotoUser.currentUser.user, newImgPath, "dummy caption", 0, [], [], false, Date.now());
      console.log(newFoto);
      fotoFactory.fotoUsersList[fotoUser.currentUser.user].fotos.push(newFoto);
      
    };

  }