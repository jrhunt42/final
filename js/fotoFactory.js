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
            console.debug("setCarouselFotos finished emptying carousel");
            
            // iterate thru all users and each of their fotos,
            // keeping the three highest vote getters in the carousel fotos array
            // while iterating, mark each foto inCarousel false until we finish all checking
            

                  for(var foto in fotoGallery) {
                        //console.debug("setCarouselFotos checking next foto");
                        //always clear inCarousel flag until the end
                        fotoGallery[foto].inCarousel = false;
                        // until we have minimum number carousel fotos, just add each one
                        if(this.fotos.length < 3) {
                              //console.debug("setCarouselFotos inital push");
                              console.debug("pushing:" + fotoGallery[foto].imgPath);
                              this.fotos.push(fotoGallery[foto]);
                              console.log(this.fotos);
                        } else {
                              //now we want to replace only if the current fotos voteCount
                              //is greater than one already in the carousel
                              //we want to keep the carousel order by vote count so we always check/replace
                              //lowest vote count foto
                              // start with sorted carousel and reorder by vote count only if we change contents
                              // rather than every time thru loop
                              this.fotos.sort(fotoSortByVote);
                              for(var j=0; j< this.fotos.length; j++) {
                                    if(fotoGallery[foto].voteCount > this.fotos[j].voteCount) {
                                          //need to replace a foto
                                          console.debug("replacing vote:::with" + this.fotos[j].voteCount +":::" +fotoGallery[foto].voteCount);
                                          console.debug(this.fotos[j]);
                                          console.debug(fotoGallery[foto]);
                                          this.fotos[j] = fotoGallery[foto];
                                          this.fotos.sort(fotoSortByVote);
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
      
      //create some static data
      // some foto objects
      var johnFoto1 = new FotoObject("john", "https://cohort-work-jrhunt42.c9users.io/midterm/images/IMGP1249.JPG", "dummy caption",2,["craig","angie"],[],false, Date.now());
      var bikeFoto1 = new FotoObject("bikenut","https://cohort-work-jrhunt42.c9users.io/midterm/images/06-IMG_2100.JPG","dummy caption",0, [], [], false, Date.now());
      var bikeFoto2 = new FotoObject("bikenut","https://cohort-work-jrhunt42.c9users.io/midterm/images/IMGP0603.JPG","dummy caption",0,[], [], false, Date.now());
      var kelseyFoto1 = new FotoObject("kelsey","https://cohort-work-jrhunt42.c9users.io/midterm/images/IMGP0017.JPG", "dummy caption", 0, [],[],false,Date.now());
      var kelseyFoto2 = new FotoObject("kelsey","https://cohort-work-jrhunt42.c9users.io/midterm/images/IMGP0473.JPG","dummy caption",3,["craig","angie","john"],[],false,Date.now());
      var mtndudeFoto1 = new FotoObject("mtndude","https://cohort-work-jrhunt42.c9users.io/midterm/images/DSC_0011.jpg","dummy caption",1,["craig"],[],false,Date.now());
      var mtndudeFoto2 = new FotoObject("mtndude","https://cohort-work-jrhunt42.c9users.io/midterm/images/IMG_2573.jpg","dummy caption",0,[],[],false,Date.now());
      var craigFoto1 = new FotoObject("craig","https://cohort-work-jrhunt42.c9users.io/midterm/images/IMGP1235.JPG","dummy caption",0,[],[],false,Date.now());
      var craigFoto2 = new FotoObject("craig","https://cohort-work-jrhunt42.c9users.io/midterm/images/IMGP1211.JPG","dummy caption",0,[],[],false,Date.now());
      var angieFoto1 = new FotoObject("angie","https://cohort-work-jrhunt42.c9users.io/midterm/images/IMGP0741.JPG","dummy caption",0,[],[],false,Date.now());
      var angieFoto2 = new FotoObject("angie","https://cohort-work-jrhunt42.c9users.io/midterm/images/08-IMG_2063.JPG","dummy caption",1,["craig"],[],false,Date.now());
      
      
      // some users
      var john = new FotoUser("john", "pwjohn", "abc@gmail.com", "123-456-7890");
      var bikenut = new FotoUser("bikenut", "pwbikenut", "xyz@yahoo.com", "987-654-3210");
      var kelsey = new FotoUser("kelsey", "pwkelsey", "wtf@hotmail.com", "303-867-5309");
      var mtndude = new FotoUser("mtndude", "pwmtndude", "stfu@aol.com", "666-666-6666");
      var craig = new FotoUser("craig", "pwcraig", "rtfm@gmail.com", "234-567-8901");
      var angie = new FotoUser("angie", "pwangie", "aaa@yahoo.com", "876-543-2109");
      
      //initial user list
      var fotoUsers = {
            "john":     john,
            "bikenut":  bikenut,
            "kelsey":   kelsey,
            "mtndude":  mtndude,
            "craig":    craig,
            "angie":    angie
      };
      
      var fotoGallery = [
            johnFoto1,
            bikeFoto1,
            kelseyFoto1,
            bikeFoto2,
            kelseyFoto2,
            angieFoto1,
            mtndudeFoto2,
            craigFoto1,
            angieFoto2,
            craigFoto2,
            mtndudeFoto1
            
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