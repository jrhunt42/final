angular.module("fotoChallenge")
  .controller("fotoCommonController",fotoCommonController);
  
    fotoCommonController.$inject = ["fotoFactory", "userFactory"];
  function fotoCommonController(fotoFactory, userFactory){
    var fotoCommon = this;
    console.log("fotoCommonController");
    fotoCommon.factoryData = fotoFactory;
    fotoCommon.userFactoryData = userFactory;
    //fotoCommon.loggedIn = fotoCommon.factoryData.loggedIn; 
    //fotoCommon.title = fotoCommon.factoryData.currentTitle;
  }