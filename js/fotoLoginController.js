angular.module("fotoChallenge")
  .controller("fotoLoginController",fotoLoginController);
  
    fotoLoginController.$inject = ["fotoFactory"];
  function fotoLoginController(fotoFactory){
    var fotoLogin = this;
    console.log("fotoLoginController");

    fotoLogin.title = "Foto Login page";
    //fotoHome.items = fotoFactory.data;

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