angular.module("fotoChallenge")
  .controller("fotoCommonController",fotoCommonController);
  
    fotoCommonController.$inject = ["fotoFactory"];
  function fotoCommonController(fotoFactory){
    var fotoCommon = this;
    console.log("fotoCommonController");
    fotoCommon.factoryData = fotoFactory;
    //fotoCommon.loggedIn = fotoCommon.factoryData.loggedIn; 
    //fotoCommon.title = fotoCommon.factoryData.currentTitle;
  }