angular.module("fotoChallenge")
  .controller("fotoHomeController",fotoHomeController);
  
    fotoHomeController.$inject = ["fotoFactory"];
  function fotoHomeController(fotoFactory){
    var fotoHome = this;
    console.log("fotoHomeController");

    fotoHome.title = "Foto Home page";
    fotoHome.carousel = fotoFactory.fotoCarousel;

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