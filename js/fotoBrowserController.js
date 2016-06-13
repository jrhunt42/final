angular.module("fotoChallenge")
  .controller("fotoBrowserController",fotoBrowserController);
  
  fotoBrowserController.$inject = ["fotoFactory"];
  function fotoBrowserController(fotoFactory){
    var fotoBrowser = this;
    console.log("fotoBrowserController");

    fotoBrowser.title = "Foto Browser";
    fotoBrowser.currentUser = fotoFactory.currentUser;
    fotoBrowser.fotoUsersList = fotoFactory.fotoUsersList;


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