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
      
      //create some static data
      // some foto objects
      var johnFoto1 = new FotoObject("john", "https://pixabay.com/static/uploads/photo/2014/12/03/08/11/rhodesian-ridgeback-555187_960_720.jpg", "",0,[],[],false, Date.now());
      var bikeFoto1 = new FotoObject("bikenut","https://upload.wikimedia.org/wikipedia/commons/1/15/027_Cycling_Torres_del_Paine.jpg","",0, [], [], false, Date.now());
      var bikeFoto2 = new FotoObject("bikenut","http://www.free-motion.com/uploads/tx_templavoila/LA4A9937_1_MTB_Tourenprogramm_03.jpg","",0,[], [], false, Date.now());
      
      // some users
      var john = new FotoUser("john", "pwjohn", [], [ johnFoto1 ]);
      var bikenut = new FotoUser("bikenut", "pwbikenut", [], [ bikeFoto1, bikeFoto2 ]);
      
      //initial user list
      var fotoUsersList = {
            "none":     {},
            "john":     john,
            "bikenut":  bikenut
      };
      
      // initial user
      var currentUser = fotoUsersList["none"];
      
      //initial carousel
      var fotoCarousel = new CarouselFotos (0, [ johnFoto1, bikeFoto1, bikeFoto2]);
      
      return {
            //constructors
            FotoUser:   FotoUser,
            FotoObject: FotoObject,
            
            //instances
            currentUser: currentUser,
            fotoCarousel :    fotoCarousel,
            fotoUsersList :   fotoUsersList  
            
      };
}