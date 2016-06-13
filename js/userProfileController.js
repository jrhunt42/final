angular.module("fotoChallenge")
  .controller("userProfileController",userProfileController);
  
   userProfileController.$inject = ["fotoFactory"];
  function userProfileController(fotoFactory){
    var fotoUser = this;
    console.log("fotoUserController");

    fotoUser.title = "User Profile";
    //fotoUser.items = fotoFactory.data;

//    todo.addItem = function(){
//      console.log("Adding Item!!!!");
//      todo.items.push(todo.newItem);
//      todo.newItem = {};
//    };
    
//    todo.activeItems = function(){
//      console.log("checking for active items");
//      var active = [];
//      for (var i=0; i<todo.items.length; i++) {
//       if(!todo.items[i].complete) {
//          active.push(todo.items[i]);
//        }
//      }
//      return active;
//    };
    
  }