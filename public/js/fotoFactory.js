angular.module("fotoChallenge")
	.factory("fotoFactory", fotoFactory);

fotoFactory.$inject = ['$http'];

function fotoFactory($http) {
      console.log("fotoFactory constructor");

  var factoryObject = {};
  
  // note that "All" for this app means all fotos
  factoryObject.themes = ['All', 'Animals', 'Flowers', 'People', 'Scenery', 'Sports'];
  
  factoryObject.allFotos = function(query){
    return $http({
      method: "GET",
      url: '/api/v0/fotos',
      params: query
    });
  };
  
  factoryObject.singleFoto = function(id){
    return $http.get('/api/v0/fotos/'+id);
  };
  
  factoryObject.createFoto = function(foto){
      // note that this function currently is not used, instead
      // ngFileUpload module Upload embeds a post request with multipart form data
    return $http.post('/api/v0/fotos' , foto);
  };
  
  factoryObject.updateFoto = function(foto){
    return $http.put('/api/v0/fotos/'+ foto._id , foto);
  };
  
  factoryObject.destroyFoto = function(id){
    return $http.delete('/api/v0/fotos/'+ id);
  };
  
  // set inital application states
  factoryObject.currentTitle = "Foto Challenge";
  //factoryObject.currentTheme = "All";


  return factoryObject;
}
