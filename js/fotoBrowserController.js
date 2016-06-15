angular.module("fotoChallenge")
  .controller("fotoBrowserController",fotoBrowserController);
  
  fotoBrowserController.$inject = ["fotoFactory"];
  
  function fotoBrowserController(fotoFactory){
    var fotoBrowser = this;
    console.log("fotoBrowserController");

    fotoBrowser.title = "Gallery of Fotos";
    fotoBrowser.currentUser = fotoFactory.currentUser;
    fotoBrowser.loggedIn = fotoFactory.loggedIn;
    fotoBrowser.fotoUsersList = fotoFactory.fotoUsersList;
    
    fotoBrowser.newVote = function(foto) {
      //console.log("fotoBrowser.newVote with fotoUser:" + foto.user + " and currentUser: " + fotoBrowser.currentUser.user);
      // check to make sure this user can vote on this foto
      // 1) currentUser can not be foto owner
      // 2) currentUser can not already have voted for this foto
      //
      // first check to see if currentUser is owner
      if(foto.user === fotoBrowser.currentUser.user) {
        alert("Sorry, you can't vote for your own fotos");
        return;
      }
      // now need to check if current user has already voted for this foto
      // get index of this foto to access its voters list
      var index = fotoFactory.fotoUsersList[foto.user].fotos.indexOf(foto);
      //console.log("found foto at index: " +index);
      if(fotoBrowser.fotoUsersList[foto.user].fotos[index].voters.indexOf(fotoBrowser.currentUser.user) !== -1) {
        //currentUser has already voted for this foto, can't vote again
        alert("Sorry, you have already voted for this foto");
        return;
      }
      
      //if we reach here, this is a valid vote, find this foto vote count in fotoUsersList 
      var myCount = ++fotoFactory.fotoUsersList[foto.user].fotos[index].voteCount;
      
      // add this user to set of voters on this foto
      fotoFactory.fotoUsersList[foto.user].fotos[index].voters.push(fotoBrowser.currentUser.user);
      
      //if this foto is already in carousel, we don't need to update carousel, even with this 
      // new vote since this vote can only increases voteCount for one of the already top vote getters
      if(foto.inCarousel) {
        console.log("newVote for foto already inCarousel");
        return;
      }
      //check the new vote count for this foto against the minimum count 
      //foto in carousel to see if carousel might need updating
      //ties do not cause a carousel change
      //console.log("myCount:" + myCount);
      
      if(myCount > fotoFactory.fotoCarousel.getMinVoteCount()) {
        console.log("new vote changes carousel");
        // call update carousel to reset the fotos in carousel
        fotoFactory.fotoCarousel.fotoCarouselUpdate();
      } else {
        console.log("new vote does not change carousel")
      }
      
    };

    
  }