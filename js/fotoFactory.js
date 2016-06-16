angular.module("fotoChallenge")
	.factory("fotoFactory", fotoFactory);
	
function fotoFactory() {
      console.log("fotoFactory constructor");


      function FotoUser(user, password, email, phone) {
            this.user = user;
            this.password = password;
            this.email = email;
            this.phone = phone;
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
            //console.log("getMinVoteCount returns: " + minVoteCount);
            return minVoteCount;
      }
      CarouselFotos.prototype.setCarouselFotos = function() {
            console.log("start setCarouselFotos");
            //remove any existing fotos in carousel
            while(this.fotos.length > 0) {
                  this.fotos.pop();
            }
            //console.log("setCarouselFotos finished emptying carousel");
            
            // iterate thru all users and each of their fotos,
            // keeping the three highest vote getters in the carousel fotos array
            // while iterating, mark each foto inCarousel false until we finish all checking
            

                  for(var foto in fotoGallery) {
                        //console.log("setCarouselFotos checking next foto");
                        //always clear inCarousel flag until the end
                        fotoGallery[foto].inCarousel = false;
                        // until we have minimum number carousel fotos, just add each one
                        if(this.fotos.length < 3) {
                              //console.log("setCarouselFotos inital push");
                              this.fotos.push(fotoGallery[foto]);
                              console.log(this.fotos);
                        } else {
                              //now we want to replace only if the current fotos voteCount
                              //is greater than one already in the carousel
                              for(var j=0; j< this.fotos.length; j++) {
                                    if(fotoGallery[foto].voteCount > this.fotos[j].voteCount) {
                                          //need to replace a foto
                                          //console.log("replacing foto at index: " + j);
                                          this.fotos[j] = fotoGallery[foto];
                                          break;
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
      var johnFoto1 = new FotoObject("john", "https://cohort-work-jrhunt42.c9users.io/midterm/images/IMGP1249.JPG", "dummy caption",0,[],[],false, Date.now());
      var bikeFoto1 = new FotoObject("bikenut","https://cohort-work-jrhunt42.c9users.io/midterm/images/06-IMG_2100.JPG","dummy caption",0, [], [], false, Date.now());
      var bikeFoto2 = new FotoObject("bikenut","https://cohort-work-jrhunt42.c9users.io/midterm/images/IMGP0603.JPG","dummy caption",0,[], [], false, Date.now());
      var kelseyFoto1 = new FotoObject("kelsey","https://cohort-work-jrhunt42.c9users.io/midterm/images/IMGP0017.JPG", "dummy caption", 0, [],[],false,Date.now());
      var kelseyFoto2 = new FotoObject("kelsey","https://cohort-work-jrhunt42.c9users.io/midterm/images/IMGP0473.JPG","dummy caption",0,[],[],false,Date.now());
      // some users
      var john = new FotoUser("john", "pwjohn", "abc@gmail.com", "123-456-7890");
      var bikenut = new FotoUser("bikenut", "pwbikenut", "xyz@yahoo.com", "987-654-3210");
      var kelsey = new FotoUser("kelsey", "pwkelsey", "wtf@hotmail.com", "303-867-5309");
      
      //initial user list
      var fotoUsers = {
            "john":     john,
            "bikenut":  bikenut,
            "kelsey":   kelsey
      };
      
      var fotoGallery = [
            johnFoto1,
            bikeFoto1,
            bikeFoto2,
            kelseyFoto1,
            kelseyFoto2
            
      ];
            
      
      // initial user
      var currentUser = undefined;
      var loggedIn = false;
      
      //initial carousel
      var fotoCarousel = new CarouselFotos ( []);
      fotoCarousel.setCarouselFotos();
      
      return {
            //constructors
            FotoUser:   FotoUser,
            FotoObject: FotoObject,
            
            //instances
            currentUser:      currentUser,
            loggedIn:         loggedIn,
            fotoCarousel :    fotoCarousel,
            fotoUsers :   fotoUsers,
            fotoGallery: fotoGallery
            
      };
}