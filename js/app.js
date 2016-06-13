angular.module("fotoChallenge",['ui.router'])
  .config(todoRouter);

todoRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  function todoRouter($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "partials/home.html",
        controller: "fotoHomeController as fotoHome"
      })
      .state('userProfile', {
        url: "/userProfile",
        templateUrl: "partials/userProfile.html",
        controller: "userProfileController as fotoUser"
      })
      .state('fotoBrowser', {
        url: "/fotoBrowser",
        templateUrl: "partials/fotoBrowser.html",
        controller: "fotoBrowserController as fotoBrowser"
      })
      .state('fotoLogin', {
        url: "/login",
        templateUrl: "partials/login.html",
        controller: "fotoLoginController as fotoLogin"
      });      
      
    //if can't find anything else, than go here....home page or 404 page
    $urlRouterProvider.otherwise('/');
  }
  



