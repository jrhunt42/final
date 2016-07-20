angular.module("fotoChallenge")
  .controller("fotoBrowserController",fotoBrowserController);
  
  fotoBrowserController.$inject = ["fotoFactory", "userFactory", "NgMap"];
  
  function fotoBrowserController(fotoFactory, userFactory, NgMap){
    var fotoBrowser = this;
    console.log("fotoBrowserController");

    fotoFactory.currentTitle = "Gallery of Fotos";
    fotoBrowser.fotoFactory = fotoFactory;
    fotoBrowser.userFactory = userFactory;
    userFactory.showNewUserForm = false;
    fotoBrowser.showUserMap = false;
    fotoBrowser.showBigFoto = false;
    fotoBrowser.currentBigFoto = undefined;
    fotoBrowser.fotoGallery = [];
    fotoBrowser.latitude = 0;
    fotoBrowser.longitude = 0;
    fotoBrowser.zoom = 9;
    
    
    // set up default filter theme
    fotoBrowser.currentTheme = fotoFactory.themes[0]; //theme[0]="All"
    fotoBrowser.fotoQuery={
      //theme: fotoBrowser.currentTheme
    };
    
    
    
    //////////////foto sorting stuff///////////////////////////
    ///////note that this may go away when I have time to move sorting to backend////////
    //set default sort field and ordering
    fotoBrowser.currentSort = fotoFactory.sortOptions[0]; //sortOptions[0]="user"
    fotoBrowser.sortField = 'user';
    fotoBrowser.reverseOrdering = false;
    
    fotoBrowser.setCurrentSort = function() {
      switch(fotoBrowser.currentSort) {
        case fotoFactory.sortOptions[0]:
          fotoBrowser.sortField = 'user';
          fotoBrowser.reverseOrdering = false;
          break;
        case fotoFactory.sortOptions[1]:
          fotoBrowser.sortField = 'voteCount';
          fotoBrowser.reverseOrdering = true;
          break;
        case fotoFactory.sortOptions[2]:
          fotoBrowser.sortField = 'timestamp';
          fotoBrowser.reverseOrdering = true;
          break;
        default:
          console.error("fotoBrowser unrecognized sort option");
          fotoBrowser.sortField = 'user';
          fotoBrowser.reverseOrdering = false;
          break;
      }
    }
    
    fotoBrowser.setOrderBy = function(field,ordering) {
      //console.log("fotoBrowser orderBy field, ordering"+ field + ":" +ordering);
      fotoBrowser.sortField = field;
      fotoBrowser.reverseOrdering = ordering;
    };
    ////////////end foto sorting stuff///////////////////////////
    
    
    //////////////////foto get(query) related stuff///////////////////////////
    
    fotoBrowser.setContestTheme = function() {
      var theme = fotoBrowser.currentTheme;
      //console.log("fotoBrowser set contest: ", theme);
      if(theme === fotoFactory.themes[0]) {
        fotoBrowser.fotoQuery = {};
      } else {
        fotoBrowser.fotoQuery={
          theme:  theme
        };
      }
      fotoBrowser.getFotos(fotoBrowser.fotoQuery);
    };
    
      fotoBrowser.getFotos = function(query) {
      //pass in query string
      fotoFactory.allFotos(query)
        .then(function(response){
          //console.log("fotoBrowser getFotos returned:", response);
          // set current fotos
          fotoBrowser.fotoGallery = response.data;
        })
        .catch(function(err){
          console.log("fotoBrowser getFotos error:", err);
        });
    };
    
    fotoBrowser.bigFoto = function( event, foto) {
      console.log("fotoBrowser bigFoto");
      console.log(foto);
      fotoBrowser.currentBigFoto = foto;
      fotoBrowser.showBigFoto = true;
    };
    
      fotoBrowser.closeBigFoto = function() {
      console.log("fotoBrowser closeBigFoto");
      fotoBrowser.showBigFoto = false;
    };
    
    ////////////////////////end foto query related stuff/////////////////////
    
    ////////////////////foto voting/cancelling related stuff//////////////////////////
    
    fotoBrowser.showVoteButton = function(foto) {
      
      //console.log("fotoBrowser showVote login check")
      if(!userFactory.loggedIn) {
        //console.log("fotoBrowser showVote exit false")
        // must have a logged in user
        return false;
      }
      //console.log("fotoBrowser showVote user/owner check")
      if(userFactory.currentUser.username === foto.user.username) {
        //console.log("fotoBrowser showVote exit false")
        // can't vote for your own fotos
        return false;
      }
      //console.log("fotoBrowser showVote voter check, voters=", foto.voters)
      
      //console.log("fotoBrowser showVote voter check, index=", foto.voters.indexOf(userFactory.currentUser))
      //console.log("fotoBrowser showVote voter check, includes=", foto.voters.includes(userFactory.currentUser))
      for( var voter in foto.voters) {
        //console.log("fotoBrowser showVote loop, voter= ", voter.username)
        //console.log("fotoBrowser showVote loop, current user=", userFactory.currentUser.username)
        if(foto.voters[voter].username === userFactory.currentUser.username) {
          //console.log("fotoBrowser showVote exit user already voted")
          // can't vote for the same foto twice
          return false;
        }
      }
      //ok to vote
      //console.log("fotoBrowser showVote yes")
      return true;
      
    };
    
    fotoBrowser.showCancelVoteButton = function(foto) {
      //console.log("fotoBrowser cancelVote login check")
      if(!userFactory.loggedIn) {
        // must have a logged in user
        //console.log("fotoBrowser cancelVote exit false")
        return false;
      }
      //console.log("fotoBrowser cancelVote user/owner check")
      if(userFactory.currentUser.username === foto.user.username) {
        // can't vote or cancel vote on your fotos
        //console.log("fotoBrowser cancelVote exit false")
        return false;
      }
      //console.log("fotoBrowser cancelVote voter check, voters=", foto.voters)
      
      //console.log("fotoBrowser cancelVote voter check, index=", foto.voters.indexOf(userFactory.currentUser))
      for (var voter in foto.voters){
        //console.log("fotoBrowser cancelVote loop, voter= ", voter)
        //console.log("fotoBrowser cancelVote loop, current user=", userFactory.currentUser.username)
        if(foto.voters[voter].username === userFactory.currentUser.username) {
          // must have voted for this foto already in order to cancel
          //console.log("fotoBrowser found user exit true, show cancel")
          return true;
        }
      }
      //ok to cancel vote
      //console.log("fotoBrowser cancelVote did not find user, exit false")
      return false;
      
    };
    
    fotoBrowser.newVote = function(foto) {
      //console.log("fotoBrowser.newVote with fotoUser:" + foto.user + " and currentUser: " + fotoBrowser.currentUser.user);
      // check to make sure this user can vote on this foto
      // 1) currentUser can not be foto owner
      // 2) currentUser can not already have voted for this foto
      //
      // first check to see if currentUser is owner
      //if(foto.user.username === userFactory.currentUser.username) {
        //alert("Sorry, you can't vote for your own fotos");
        //return;
      //}
      // now need to check if current user has already voted for this foto
      // get index of this foto to access its voters list
      //var index = fotoBrowser.fotoGallery.indexOf(foto);
      //console.log("found foto at index: " +index);
      //if(fotoBrowser.fotoGallery[index].voters.indexOf(userFactory.currentUser) !== -1) {
        //currentUser has already voted for this foto, can't vote again
        //alert("Sorry, you have already voted for this foto");
        //return;
      //}
      
      // update the voteCount for this foto
      ++foto.voteCount;
      
      // add this user to set of voters on this foto
      foto.voters.push(userFactory.currentUser);
      
      //update this foto in database with new info
      fotoFactory.updateFoto(foto)
      .then(function() {
          // refresh the gallery
          fotoBrowser.getFotos(fotoBrowser.fotoQuery);
      })
      .catch(function(error) {
        console.error("fotoBrowser update foto error: ", error);
      });
      
    };
    
    fotoBrowser.cancelVote = function(foto) {
      //TBD
      // update the voteCount for this foto
      --foto.voteCount;
      
      // remove this user from set of voters on this foto
      for(var voter in foto.voters) {
        if( foto.voters[voter].username === userFactory.currentUser.username) {
          //console.log("fotoBrowser cancelVote index: ", voter);
          foto.voters.splice(voter,1);
        }
      }
      
      //update this foto in database with new info
      fotoFactory.updateFoto(foto)
      .then(function() {
          // refresh the gallery
          fotoBrowser.getFotos(fotoBrowser.fotoQuery);
      })
      .catch(function(error) {
        console.error("fotoBrowser update foto error: ", error);
      });
    };
    
    
    ///////////////////end foto voting/cancelling related stuff/////////////////
    

    
    ///////////////////map related stuff/////////////////
    
    // creates the map instance
    NgMap.getMap();
    
    // define function to current location to use for location searches
    fotoBrowser.getLocation = function( ) {

      var startPos;
      var geoOptions = {
  	    maximumAge: 5 * 60 * 1000, //5 mins, so we can used cached location for 5 mins
  	    timeout: 10 * 1000 // 10 secs?
      };

      navigator.geolocation.getCurrentPosition(fotoBrowser.geoSuccess, fotoBrowser.geoError, geoOptions);
    };
    
      fotoBrowser.geoSuccess = function(position) {
        //startPos = position;
        fotoBrowser.latitude = position.coords.latitude;
        fotoBrowser.longitude = position.coords.longitude;
        //console.log("latitude= ",fotoBrowser.latitude);
        //console.log("longitude= ",fotoBrowser.longitude);
      };
      fotoBrowser.geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };
      
      fotoBrowser.showMap = function(center) {
        var lat;
        var long;
        //console.log("fotoBrowser showMap center arg: ", center)
        if(center === "current"){
          lat=fotoBrowser.latitude
          long=fotoBrowser.longitude
        } else {
          //center is a foto object
          lat=center.point.coordinates[1]
          long=center.point.coordinates[0]
        }
        //console.log("fotoBrowser showMap lat, long: ", lat, long)
        fotoBrowser.mapCenter = [lat, long];
        fotoBrowser.showUserMap = true;
        //NgMap.getMap();
        
      };
      
      fotoBrowser.closeMap = function() {
        fotoBrowser.showUserMap = false;
      };
      
      /////////////////////// end map related stuff////////////////////////
    
    // get our current location, note that user has to give permission
    fotoBrowser.getLocation();
    
    // populate the gallery
    fotoBrowser.getFotos(fotoBrowser.fotoQuery);
    
}
  


