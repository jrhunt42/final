angular.module("fotoChallenge")
  .controller("fotoBrowserController",fotoBrowserController);
  
  fotoBrowserController.$inject = ["fotoFactory", "userFactory"];
  
  function fotoBrowserController(fotoFactory, userFactory){
    var fotoBrowser = this;
    console.log("fotoBrowserController");

    fotoFactory.currentTitle = "Gallery of Fotos";
    fotoBrowser.fotoFactory = fotoFactory;
    fotoBrowser.userFactory = userFactory;
    //fotoBrowser.currentUser = fotoFactory.currentUser;
    //fotoBrowser.loggedIn = fotoFactory.loggedIn;
    //fotoBrowser.fotoUsers = fotoFactory.fotoUsers;
    fotoBrowser.fotoGallery = fotoFactory.fotoGallery;
    
    //set default sort field and ordering
    fotoBrowser.sortField = 'user';
    fotoBrowser.reverseOrdering = false;
    
    fotoBrowser.setOrderBy = function(field,ordering) {
      //console.log("fotoBrowser orderBy field, ordering"+ field + ":" +ordering);
      fotoBrowser.sortField = field;
      fotoBrowser.reverseOrdering = ordering;
    };
    
    fotoBrowser.bigFoto = function(foto) {
      console.log("fotoBrowser bigFoto");
      console.log(foto);
    };
    
    fotoBrowser.newVote = function(foto) {
      //console.log("fotoBrowser.newVote with fotoUser:" + foto.user + " and currentUser: " + fotoBrowser.currentUser.user);
      // check to make sure this user can vote on this foto
      // 1) currentUser can not be foto owner
      // 2) currentUser can not already have voted for this foto
      //
      // first check to see if currentUser is owner
      if(foto.user === userFactory.currentUser.username) {
        alert("Sorry, you can't vote for your own fotos");
        return;
      }
      // now need to check if current user has already voted for this foto
      // get index of this foto to access its voters list
      var index = fotoFactory.fotoGallery.indexOf(foto);
      //console.log("found foto at index: " +index);
      if(fotoFactory.fotoGallery[index].voters.indexOf(userFactory.currentUser.username) !== -1) {
        //currentUser has already voted for this foto, can't vote again
        alert("Sorry, you have already voted for this foto");
        return;
      }
      
      //if we reach here, this is a valid vote, find this foto vote count in fotoUsersList 
      var myCount = ++fotoFactory.fotoGallery[index].voteCount;
      
      // add this user to set of voters on this foto
      fotoFactory.fotoGallery[index].voters.push(userFactory.currentUser.username);
      
    };
    
  }