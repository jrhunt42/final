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
      
      function CarouselFotos (minVoteCount, fotos) {
            this.minVoteCount = minVoteCount;
            this.fotos = fotos;
      }
      
      CarouselFotos.prototype.fotoCarouselUpdate = function(foto) {
            //update function to replace a foto in carousel with the given foto
            console.log("fotoCarouselUpdate");
            // since carousel sorted, lowest vote is at end of carousel array
            fotoCarousel.fotos[2] = foto;
      };
      
      //sort carousel fotos by voteCount, highest votes first
      function fotoSortByVote (foto1, foto2) {
            if(foto1.voteCount < foto2.voteCount) {
                  return 1;
            }
            if(foto1.voteCount > foto2.voteCount) {
                  return -1;
            }
            // the vote counts are equal
            return 0;
      }
      
      //create some static data
      // some foto objects
      var johnFoto1 = new FotoObject("john", "https://pixabay.com/static/uploads/photo/2014/12/03/08/11/rhodesian-ridgeback-555187_960_720.jpg", "dummy caption",0,[],[],false, Date.now());
      var bikeFoto1 = new FotoObject("bikenut","https://upload.wikimedia.org/wikipedia/commons/1/15/027_Cycling_Torres_del_Paine.jpg","dummy caption",2, [], [], false, Date.now());
      var bikeFoto2 = new FotoObject("bikenut","http://www.free-motion.com/uploads/tx_templavoila/LA4A9937_1_MTB_Tourenprogramm_03.jpg","dummy caption",1,[], [], false, Date.now());
      var kelseyFoto1 = new FotoObject("kelsey","http://i484.photobucket.com/albums/rr205/masingad/MountainScene.jpg", "dummy caption", 2, ["bikenut", "john"],[],false,Date.now());
      var kelseyFoto2 = new FotoObject("kelsey","http://www.skiingthebackcountry.com/images/2211.jpg","dummy caption",0,[],[],false,Date.now());
      // some users
      var john = new FotoUser("john", "pwjohn", [], [ johnFoto1 ]);
      var bikenut = new FotoUser("bikenut", "pwbikenut", [], [ bikeFoto1, bikeFoto2 ]);
      var kelsey = new FotoUser("kelsey", "pwkelsey", [], [kelseyFoto1, kelseyFoto2]);
      
      //initial user list
      var fotoUsersList = {
            "none":     {},
            "john":     john,
            "bikenut":  bikenut,
            "kelsey":   kelsey
      };
      
      // initial user
      var currentUser = fotoUsersList["none"];
      var loggedIn = false;
      
      //initial carousel
      var fotoCarousel = new CarouselFotos (1, [ bikeFoto1, bikeFoto2, kelseyFoto1]);
      
      console.log("carousel before sort: " + fotoCarousel.fotos);
      fotoCarousel.fotos.sort(fotoSortByVote);
      console.log("carousel after sort: " + fotoCarousel.fotos);
      
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