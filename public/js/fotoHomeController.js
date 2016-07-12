angular.module("fotoChallenge")
  .controller("fotoHomeController",fotoHomeController);
  
    fotoHomeController.$inject = ["fotoFactory", '$state', "userFactory"];
  function fotoHomeController(fotoFactory, $state, userFactory){
    var fotoHome = this;
    console.log("fotoHomeController");

    fotoHome.fotoFactory = fotoFactory;
    fotoFactory.currentTitle = "Foto Wars";
    //fotoHome.carousel = fotoFactory.fotoCarousel;
    fotoHome.carouselInterval = 3000;
    //fotoHome.loggedIn = fotoFactory.loggedIn;
    userFactory.showNewUserForm = false;
    fotoHome.showContestInfoForm = false;
    // build carousel based on current vote count and current images
    fotoFactory.fotoCarousel.setCarouselFotos();
    
    fotoHome.showForm = function() {
      //console.log("show new user form");
      userFactory.showNewUserForm = true;
      $state.go('fotoLogin');
    };
    
    fotoHome.showInfoForm = function() {
      //console.log("show contest info form");
      fotoHome.showContestInfoForm = true;
    };    
    
    fotoHome.closeInfoForm = function() {
      fotoHome.showContestInfoForm = false;
    };    
  }