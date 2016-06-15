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
      //console.log("fotoBrowser.newVote with:" + foto.user);
      // TBD check to make sure this user can vote on this foto
      // 1) currentUser can not be foto owner
      // 2) currentUser can not already have votd for this foto
      
      //this is a valid vote, find this foto in fotoUsersList and bump its vote count
      var index = fotoFactory.fotoUsersList[foto.user].fotos.indexOf(foto);
      //console.log("found foto at index: " +index);
      var myCount = ++fotoFactory.fotoUsersList[foto.user].fotos[index].voteCount;
      
      // TBD add this user to set of voters on this foto
      
      //check the new vote count against the minimum count foto in
      //carousel to see if carousel might need updating
      //console.log("myCount:" + myCount);
      
      if(myCount > fotoFactory.fotoCarousel.minVoteCount) {
        console.log("new vote changes carousel");
        //the lowest vote count foto is first in the carousel, replace it
        //with this foto or call update carousel?
        fotoFactory.fotoCarousel.fotoCarouselUpdate(foto);
      } else {
        console.log("new vote does not change carousel")
      }
      
    };


//    done.completedItems = function(){
//      console.log("checking for completed items");
//      var completed=[];
//      for (var i=0; i<done.items.length; i++) {
//        if(done.items[i].complete) {
//          completed.push(done.items[i]);
//        }
//      }
//      return completed;
//    };
    
  }