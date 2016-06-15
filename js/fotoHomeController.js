angular.module("fotoChallenge")
  .controller("fotoHomeController",fotoHomeController);
  
    fotoHomeController.$inject = ["fotoFactory"];
  function fotoHomeController(fotoFactory){
    var fotoHome = this;
    console.log("fotoHomeController");

    fotoHome.title = "Foto Wars";
    fotoHome.carousel = fotoFactory.fotoCarousel;
    fotoHome.carouselInterval = 3000;
    fotoHome.loggedIn = fotoFactory.loggedIn;

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