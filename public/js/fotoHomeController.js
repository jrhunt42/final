angular.module("fotoChallenge")
  .controller("fotoHomeController",fotoHomeController);
  
    fotoHomeController.$inject = ["fotoFactory", '$state', "userFactory"];
  function fotoHomeController(fotoFactory, $state, userFactory){
    var fotoHome = this;
    console.log("fotoHomeController");

    fotoHome.fotoFactory = fotoFactory;
    fotoFactory.currentTitle = "Foto Wars";
    fotoHome.carouselInterval = 3000;
    userFactory.showNewUserForm = false;
    fotoHome.showContestInfoForm = false;
    fotoHome.fotoGallery = [];
    
    // set up default filter theme
    fotoHome.currentTheme = fotoFactory.themes[0]; //theme[0]="All"
    fotoHome.fotoQuery={
      //theme: fotoHome.currentTheme
    };
    
    fotoHome.setContestTheme = function() {
      var theme = fotoHome.currentTheme
      console.log("fotoHome set contest: ", theme);
      // if theme="all", find all fotos
      if(theme === fotoFactory.themes[0]) {
        fotoHome.fotoQuery={};
      } else {
        fotoHome.fotoQuery={
          theme:  theme
        };
      }
      fotoHome.getFotos(fotoHome.fotoQuery);
    };
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
    
    fotoHome.getFotos = function(query) {
    //pass in query string?
    fotoFactory.allFotos(query)
      .then(function(response){
        console.log("fotoHome getFotos returned:", response);
        //now filter by theme?
        // set current fotos
        fotoHome.fotoGallery = response.data;
        // build carousel based on current vote count and current images
        fotoHome.fotoCarousel.setCarouselFotos();
      })
      .catch(function(err){
        console.log("fotoHome getFotos error:", err);
      });
    };
    
    // grab default fotos to use to build carousel
    fotoHome.getFotos(fotoHome.fotoQuery);
    
    //initial carousel
    // carousel lives only in this controller because it is a front end "view" concept only
    // and only used by this page
    fotoHome.fotoCarousel = new CarouselFotos ( []);
    fotoHome.sizeOfCarousel = 3;
    
    function CarouselFotos (fotos) {
      this.fotos = fotos;
    };
      
    CarouselFotos.prototype.setCarouselFotos = function() {
      console.log("start setCarouselFotos");
      //remove any existing fotos in carousel
      while(this.fotos.length > 0) {
          this.fotos.pop();
      }
            
      // iterate thru all fotos, keeping the (sizeOfCarousel) highest vote getters in 
      // the carousel fotos array
      //console.log("setCarouselFotos step1");
      for(var foto in fotoHome.fotoGallery) {
        //console.log("setCarouselFotos inside loop");
          // until we have minimum number carousel fotos, just add each one
          if(this.fotos.length < fotoHome.sizeOfCarousel) {
              this.fotos.push(fotoHome.fotoGallery[foto]);
          } else {
            //now we want to replace only if the current fotos voteCount
            //is greater than one already in the carousel
            //we want to keep the carousel order by vote count so we always check/replace
            //lowest vote count foto
            // start with sorted carousel and reorder by vote count only if we change contents
            // rather than every time thru loop
            this.fotos.sort(fotoSortByVote);
            for(var j=0; j< this.fotos.length; j++) {
                if(fotoHome.fotoGallery[foto].voteCount > this.fotos[j].voteCount) {
                    //need to replace a foto
                    this.fotos[j] = fotoHome.fotoGallery[foto];
                    this.fotos.sort(fotoSortByVote);
                    break; //don't need to look at the rest of the fotos if we do replace
                }
            }
          }
        }
      };
      
      //sort carousel fotos by voteCount, lowest votes first
      function fotoSortByVote (foto1, foto2) {
            if(foto1.voteCount < foto2.voteCount) {
                  return -1;
            }
            if(foto1.voteCount > foto2.voteCount) {
                  return 1;
            }
            // the vote counts are equal
            return 0;
      }

  }