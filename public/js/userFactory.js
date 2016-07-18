
angular.module("fotoChallenge")
	.factory("userFactory", userFactory);

userFactory.$inject = ['$http'];

function userFactory($http){
  console.log("userFactory constructor");
  var factoryObject = {};
  
  factoryObject.fotoUsers = {};
  
  factoryObject.currentUser = undefined;
  factoryObject.loggedIn = false;
  factoryObject.navState = "Login/SignIn";

  factoryObject.allUsers = function(){
    return $http.get('/api/v0/users');
  };
  
  factoryObject.singleUser = function(id){
    return $http.get('/api/v0/users/'+id);
  };
  
  factoryObject.createUser = function(user){
    return $http.post('/api/v0/users' , user);
  };
  
  factoryObject.updateUser = function(user){
    return $http.put('/api/v0/users/'+ user._id , user);
  };
  
  factoryObject.destroyUser = function(id){
    return $http.delete('/api/v0/users/'+ id);
  };

  return factoryObject;
}
