angular.module("fotoChallenge")
  .controller("fotoLoginController",fotoLoginController);
  
    fotoLoginController.$inject = ["fotoFactory"];
  function fotoLoginController(fotoFactory){
    var fotoLogin = this;
    console.log("fotoLoginController");

    fotoLogin.title = "Foto Login page";
    fotoLogin.currentUser = fotoFactory.currentUser;
    fotoLogin.fotoUsersList = fotoFactory.fotoUsersList;
    
    fotoLogin.setCurrentUser = function() {
      //console.log("fotoLogin setting currentUser, name =" + fotoLogin.currentUserName);
      for (var user in fotoFactory.fotoUsersList) {
        console.log("fotoLogin checking:" + fotoFactory.fotoUsersList[user].user + " against " + fotoLogin.currentUserName);
        if(fotoFactory.fotoUsersList[user].user === fotoLogin.currentUserName) {
          console.log("fotoLogin setting currentUser to:" + user);
          fotoLogin.currentUser = fotoFactory.fotoUsersList[user];
          fotoFactory.currentUser = fotoFactory.fotoUsersList[user];
          
          return;
        }
      }
      console.log("Error - fotoLogin did not find currentUserName:" +fotoLogin.currentUserName)
      fotoFactory.currentUser = fotoFactory.fotoUsersList["none"];
    }

//    todo.addItem = function(){
//      console.log("Adding Item!!!!");
//      todo.items.push(todo.newItem);
//      todo.newItem = {};
//    };
    
//    todo.activeItems = function(){
//      console.log("checking for active items");
//      var active = [];
//      for (var i=0; i<todo.items.length; i++) {
//        if(!todo.items[i].complete) {
//          active.push(todo.items[i]);
//        }
//      }
//      return active;
//    };
    
  }