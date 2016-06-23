angular.module("fotoChallenge")
	.factory("fotoFactory", fotoFactory);
	
function fotoFactory() {
      console.log("fotoFactory constructor");

      var sizeOfCarousel = 3;

      function FotoUser(user, password, email, phone) {
            this.user = user;
            this.password = password;
            this.email = email;
            this.phone = phone;
      }
      
      function FotoObject(user, imgPath, caption, voteCount, voters, comments, timeStamp) {
            this.user = user;
            this.imgPath = imgPath;
            this.caption = caption;
            this.voteCount = voteCount;
            this.voters = voters;
            this.comments = comments;
            this.timeStamp = timeStamp;
      }
      
      function CarouselFotos (fotos) {
            this.fotos = fotos;
      }
      
//      CarouselFotos.prototype.getMinVoteCount = function() {
//            //return the lowest vote count for the fotos currently in the carousel
//            var minVoteCount = 0;
//            if(this.fotos.length !== 0) {
//                  for(var i=0; i<this.fotos.length; i++) {
//                        if(this.fotos[i].voteCount < minVoteCount) {
//                              minVoteCount = this.fotos[i].voteCount;
//                        }
//                  }
//            }
//            //console.log("getMinVoteCount returns: " + minVoteCount);
//            return minVoteCount;
//      }
      CarouselFotos.prototype.setCarouselFotos = function() {
            console.log("start setCarouselFotos");
            //remove any existing fotos in carousel
            while(this.fotos.length > 0) {
                  this.fotos.pop();
            }
            // iterate thru all fotos, keeping the (sizeOfCarousel) highest vote getters in 
            // the carousel fotos array
            for(var foto in fotoGallery) {
                  // until we have minimum number carousel fotos, just add each one
                  if(this.fotos.length < sizeOfCarousel) {
                        this.fotos.push(fotoGallery[foto]);
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
                                    this.fotos[j] = fotoGallery[foto];
                                    this.fotos.sort(fotoSortByVote);
                                    break; //don't need to look at the rest of the fotos if we do replace
                              }
                        }
                  }
            }
      };
      
//      CarouselFotos.prototype.fotoCarouselUpdate = function() {
//
//            // just rebuild carousel from scratch based on current data...since I already
//            // have that function anyway
//            console.log("fotoCarouselUpdate");
//            this.setCarouselFotos();
//            
//      };
      
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
      var johnFoto1 = new FotoObject("john", "../midterm/images/IMGP1249.JPG", "dummy caption",2,["craig","angie"],[], Date.now());
      var bikeFoto1 = new FotoObject("bikenut","../midterm/images/06-IMG_2100.JPG","dummy caption",0, [], [], Date.now());
      var bikeFoto2 = new FotoObject("bikenut","../midterm/images/IMGP0603.JPG","dummy caption",0,[], [], Date.now());
      var kelseyFoto1 = new FotoObject("kelsey","../midterm/images/IMGP0017.JPG", "dummy caption", 0, [],[],Date.now());
      var kelseyFoto2 = new FotoObject("kelsey","../midterm/images/IMGP0473.JPG","dummy caption",3,["craig","angie","john"],[],Date.now());
      var mtndudeFoto1 = new FotoObject("mtndude","../midterm/images/DSC_0011.jpg","dummy caption",1,["craig"],[],Date.now());
      var mtndudeFoto2 = new FotoObject("mtndude","../midterm/images/IMG_2573.jpg","dummy caption",0,[],[],Date.now());
      var craigFoto1 = new FotoObject("craig","../midterm/images/IMGP1235.JPG","dummy caption",0,[],[],Date.now());
      var craigFoto2 = new FotoObject("craig","../midterm/images/IMGP1211.JPG","dummy caption",0,[],[],Date.now());
      var angieFoto1 = new FotoObject("angie","../midterm/images/IMGP0741.JPG","dummy caption",0,[],[],Date.now());
      var angieFoto2 = new FotoObject("angie","../midterm/images/08-IMG_2063.JPG","dummy caption",1,["craig"],[],Date.now());
      
      
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
            
      
      // set inital application states
      var currentUser = john;
      var loggedIn = true;
      var currentTitle = "Foto Challenge";
      
      //initial carousel
      var fotoCarousel = new CarouselFotos ( []);

      
      return {
            //constructors
            FotoUser:   FotoUser,
            FotoObject: FotoObject,
            
            //instances
            currentUser:      currentUser,
            loggedIn:         loggedIn,
            currentTitle:     currentTitle,
            fotoCarousel :    fotoCarousel,
            fotoUsers :   fotoUsers,
            fotoGallery: fotoGallery
            
      };
}