angular.module("fotoChallenge")
  .controller("fotoLoginController",fotoLoginController);
  
    fotoLoginController.$inject = ["fotoFactory"];
  function fotoLoginController(fotoFactory){
    var fotoLogin = this;
    console.log("fotoLoginController");

    fotoLogin.title = "Login/Logout";
    fotoLogin.currentUser = fotoFactory.currentUser;
    fotoLogin.loggedIn = fotoFactory.loggedIn;
    fotoLogin.fotoGallery = fotoFactory.fotoGallery;
    fotoLogin.fotoUsers = fotoFactory.fotoUsers;
    
    fotoLogin.setCurrentUser = function() {
      //console.log("fotoLogin setting currentUser, name =" + fotoLogin.currentUserName);
      for (var user in fotoFactory.fotoUsers) {
        //console.log("fotoLogin checking:" + fotoFactory.fotoUsersList[user].user + " against " + fotoLogin.currentUserName);
        if(fotoFactory.fotoUsers[user].user === fotoLogin.currentUserName) {
          console.log("fotoLogin setting currentUser to:" + fotoFactory.fotoUsers[user]);
          //fotoLogin.currentUser = fotoFactory.fotoUsersList[user];
          fotoFactory.currentUser = fotoFactory.fotoUsers[user];
          fotoFactory.loggedIn = true;
          fotoLogin.loggedIn = true;
          
          return;
        }
      }
      console.log("Error - fotoLogin did not find currentUserName:" +fotoLogin.currentUserName)
      fotoFactory.currentUser = undefined;
      fotoFactory.loggedIn = false;
      fotoLogin.loggedIn = false;
    }
    
    fotoLogin.logout = function() {
      console.log("fotoLogin logging out");
      fotoFactory.currentUser = undefined;
      fotoFactory.loggedIn = false;
      fotoLogin.loggedIn = false;
    }
    
  }