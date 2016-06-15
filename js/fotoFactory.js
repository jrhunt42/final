angular.module("fotoChallenge")
	.factory("fotoFactory", fotoFactory);
	
function fotoFactory() {
      console.log("fotoFactory constructor");


      function FotoUser(user, password, contactInfo, fotos) {
            this.user = user;
            this.password = password;
            this.contactInfo = contactInfo;
            this.fotos = fotos;
      }
      
      function FotoObject(user, imgPath, caption, voteCount, voters, comments, inCarousel, timeStamp) {
            this.user = user;
            this.imgPath = imgPath;
            this.caption = caption;
            this.voteCount = voteCount;
            this.voters = voters;
            this.comments = comments;
            this.inCarousel = inCarousel;
            this.timeStamp = timeStamp;
      }
      
      function CarouselFotos (fotos) {
            this.fotos = fotos;
      }
      CarouselFotos.prototype.getMinVoteCount = function() {
            //return the lowest vote count for the fotos currently in the carousel
            var minVoteCount = 0;
            if(this.fotos.length !== 0) {
                  for(var i=0; i<this.fotos.length; i++) {
                        if(this.fotos[i].voteCount < minVoteCount) {
                              minVoteCount = this.fotos[i].voteCount;
                        }
                  }
            }
            console.log("getMinVoteCount returns: " + minVoteCount);
            return minVoteCount;
      }
      CarouselFotos.prototype.setCarouselFotos = function() {
            console.log("start setCarouselFotos");
            //remove any existing fotos in carousel
            while(this.fotos.length > 0) {
                  this.fotos.pop();
            }
            console.log("setCarouselFotos finished emptying carousel");
            
            // iterate thru all users and each of their fotos,
            // keeping the three highest vote getters in the carousel fotos array
            // while iterating, mark each foto inCarousel false until we finish all checking
            for(var user in fotoUsersList) {
                  console.log("setCarouselFotos starting  to check user: " +fotoUsersList[user].user);
                  for(var foto in fotoUsersList[user].fotos) {
                        console.log("setCarouselFotos checking next foto");
                        //always clear inCarousel flag until the end
                        fotoUsersList[user].fotos[foto].inCarousel = false;
                        // until we have minimum number carousel fotos, just add each one
                        if(this.fotos.length < 3) {
                              console.log("setCarouselFotos inital push");
                              this.fotos.push(fotoUsersList[user].fotos[foto]);
                              console.log(this.fotos);
                        } else {
                              //now we want to replace only if the current fotos voteCount
                              //is greater than one already in the carousel
                              for(var j=0; j< this.fotos.length; j++) {
                                    if(fotoUsersList[user].fotos[foto].voteCount > this.fotos[j].voteCount) {
                                          //need to replace a foto
                                          console.log("replacing foto at index: " + j);
                                          this.fotos[j] = fotoUsersList[user].fotos[foto];
                                          break;
                                    }
                              }
                        }
                  }
            }
            
            // when finished, set inCarousel attribute for the fotos in the carousel
            for(var i=0; i<this.fotos.length; i++) {
                  this.fotos[i].inCarousel = true;
            }
      }
      
      CarouselFotos.prototype.fotoCarouselUpdate = function() {
            //update function to replace a foto in carousel with the given foto
            console.log("fotoCarouselUpdate");
            // just rebuild carousel from scratch?...since I already have that function anyway
            this.setCarouselFotos();
            
            // since carousel sorted, lowest vote is at end of carousel array
            //fotoCarousel.fotos[2] = foto;
      };
      
      //sort carousel fotos by voteCount, highest votes first
//      function fotoSortByVote (foto1, foto2) {
//            if(foto1.voteCount < foto2.voteCount) {
//                  return 1;
//            }
//            if(foto1.voteCount > foto2.voteCount) {
//                  return -1;
//            }
//            // the vote counts are equal
//            return 0;
//      }
      
      //create some static data
      // some foto objects
      var johnFoto1 = new FotoObject("john", "https://pixabay.com/static/uploads/photo/2014/12/03/08/11/rhodesian-ridgeback-555187_960_720.jpg", "dummy caption",0,[],[],false, Date.now());
      var bikeFoto1 = new FotoObject("bikenut","https://upload.wikimedia.org/wikipedia/commons/1/15/027_Cycling_Torres_del_Paine.jpg","dummy caption",0, [], [], false, Date.now());
      var bikeFoto2 = new FotoObject("bikenut","http://www.free-motion.com/uploads/tx_templavoila/LA4A9937_1_MTB_Tourenprogramm_03.jpg","dummy caption",0,[], [], false, Date.now());
      var kelseyFoto1 = new FotoObject("kelsey","http://i484.photobucket.com/albums/rr205/masingad/MountainScene.jpg", "dummy caption", 0, [],[],false,Date.now());
      var kelseyFoto2 = new FotoObject("kelsey","http://www.skiingthebackcountry.com/images/2211.jpg","dummy caption",0,[],[],false,Date.now());
      // some users
      var john = new FotoUser("john", "pwjohn", [], [ johnFoto1 ]);
      var bikenut = new FotoUser("bikenut", "pwbikenut", [], [ bikeFoto1, bikeFoto2 ]);
      var kelsey = new FotoUser("kelsey", "pwkelsey", [], [kelseyFoto1, kelseyFoto2]);
      
      //initial user list
      var fotoUsersList = {
            "john":     john,
            "bikenut":  bikenut,
            "kelsey":   kelsey
      };
      
      // initial user
      var currentUser = undefined;
      var loggedIn = false;
      
      //initial carousel
      var fotoCarousel = new CarouselFotos ( []);
      fotoCarousel.setCarouselFotos();
      
      //console.log("carousel before sort: " + fotoCarousel.fotos);
      //fotoCarousel.fotos.sort(fotoSortByVote);
      //console.log("carousel after sort: " + fotoCarousel.fotos);
      
      return {
            //constructors
            FotoUser:   FotoUser,
            FotoObject: FotoObject,
            
            //instances
            currentUser:      currentUser,
            loggedIn:         loggedIn,
            fotoCarousel :    fotoCarousel,
            fotoUsersList :   fotoUsersList 
            
      };
}