angular.module("fotoChallenge",['ui.router', 'ngAnimate','ui.bootstrap', 'ngFileUpload'])
  .config(todoRouter)
  .directive('fileModel', ['$parse', function ($parse) {
     return {
       restrict: 'A',
       link: function (scope, element, attrs) {
         var model = $parse(attrs.fileModel);
         var modelSetter = model.assign;
         element.bind('change', function () {
           scope.$apply(function () {
             modelSetter(scope, element[0].files[0]);
           });
         });
       }
     };
   }]);

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
  



