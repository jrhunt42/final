angular.module("fotoChallenge")
	.factory("fotoFactory", fotoFactory);
	
function fotoFactory() {
      console.log("fotoFactory constructor");
      var todoItems = [
      {name:"Gym", complete: false}, 
      {name:"Tanning", complete: false}, 
      {name:"Laundry", complete: false},
      {name:"Groceries", complete: true}
      ];
      
      return {
          data:todoItems
      };

}