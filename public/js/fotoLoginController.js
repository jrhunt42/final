angular.module("fotoChallenge")
  .controller("fotoLoginController",fotoLoginController);

    fotoLoginController.$inject = ["fotoFactory", "userFactory", "$state"];
  function fotoLoginController(fotoFactory, userFactory, $state){
    var fotoLogin = this;
    console.log("fotoLogin Controller, showNewUserForm= ", userFactory.showNewUserForm);

    fotoLogin.fotoFactory = fotoFactory;
    fotoLogin.userFactory = userFactory;
    fotoLogin.showLoginForm = false;

    // get the current user list
    userFactory.allUsers()
      .then (function(response) {
        console.log("fotoLogin get all users:", response.data);
        userFactory.fotoUsers = response.data;
      })
      .catch (function(error) {
        console.error("fotoLogin unable to get all users:", error);
      });

    if(userFactory.loggedIn) {
      fotoFactory.currentTitle = "Logout";
      userFactory.navState = "Logout";
    } else {
      fotoFactory.currentTitle = "Login";
      userFactory.navState = "Login/SignUp";
    }

    fotoLogin.setCurrentUser = function() {
      for (var user in userFactory.fotoUsers) {
        if(userFactory.fotoUsers[user].username === userFactory.selectedUser) {
          console.log("fotoLogin setting currentUser to:", userFactory.fotoUsers[user]);
          userFactory.currentUser = userFactory.fotoUsers[user];
          userFactory.loggedIn = true;
          fotoFactory.currentTitle = "Logout";
          userFactory.navState = "Logout";
          $state.go('userProfile');

          return;
        }
      }
      console.log("Error - fotoLogin did not find currentUserName:" +userFactory.selectedUser);
      userFactory.currentUser = undefined;
      userFactory.loggedIn = false;
      fotoFactory.currentTitle = "Login";
      userFactory.navState = "Login/SignUp";
    };

    fotoLogin.loginUser = function() {
      //console.log("checking for valid login, username::: password ", fotoLogin.loginUser.username, fotoLogin.loginUser.password)
      for (var user in userFactory.fotoUsers) {
        if(userFactory.fotoUsers[user].username === fotoLogin.loginUser.username) {
          if(userFactory.fotoUsers[user].password === fotoLogin.loginUser.password) {
            console.log("fotoLogin setting currentUser to:", userFactory.fotoUsers[user]);
            userFactory.currentUser = userFactory.fotoUsers[user];
            userFactory.loggedIn = true;
            fotoFactory.currentTitle = "Logout";
            userFactory.navState = "Logout";
            fotoLogin.loginUser.username = "";
            fotoLogin.loginUser.password = "";
            $state.go('userProfile');

            return;
          } else {
            // invalid login
            console.log("password check failed");
            break;
          }
        }
        console.log("check next user")
      }
      console.log("Error - fotoLogin did not find currentUserName:", fotoLogin.loginUser.username);
      alert("Login failed");
      userFactory.currentUser = undefined;
      userFactory.loggedIn = false;
      fotoFactory.currentTitle = "Login";
      userFactory.navState = "Login/SignUp";
    };

    fotoLogin.logout = function() {
      console.log("fotoLogin logging out");
      userFactory.currentUser = undefined;
      userFactory.loggedIn = false;
      fotoFactory.currentTitle = "Login";
      userFactory.navState = "Login/SignUp";
    };

    fotoLogin.createNewUser = function(){
      //hide input form
      //process the submitted info to create a new foto user
      //add new user to fotoUsersList
      userFactory.showNewUserForm = false;
      // check for duplicate user name
      for (var user in userFactory.fotoUsers) {
        if(userFactory.fotoUsers[user].username === fotoLogin.newUser.username) {
          //this user already exists
          //console.log("create new user duplicate name");
          alert("Duplicate user name, use a different name");
          return;
        }
      }
      console.log("fotoLogin newUser form:", fotoLogin.newUser);
      userFactory.createUser(fotoLogin.newUser)
        .then(function(response){

          //set logged in data to this new user
          userFactory.currentUser = response.data;
          //console.log("fotoLogin setting currentUser:", userFactory.currentUser);
          userFactory.loggedIn = true;
          // update collection of users
          userFactory.fotoUsers[fotoLogin.newUser.username] = response.data;
          //console.log("fotoLogin fotoUsers:", userFactory.fotoUsers);
          //reset form data
          fotoLogin.newUser = {};
          //console.log("fotoLogin checking currentUser:", userFactory.currentUser);
          fotoFactory.currentTitle = "Logout";
          userFactory.navState = "Logout";

          $state.go('userProfile');

        })
        .catch(function(error) {
          console.error("fotoLogin unable to create newUser:", error);
        });

    };

    fotoLogin.signUp = function() {
      userFactory.showNewUserForm = true;
    };

    fotoLogin.login = function() {
      fotoLogin.showLoginForm = true;
    }

    fotoLogin.cancelNewUser = function(e) {
      //console.log("cancel new user form");
      e.preventDefault();
      userFactory.showNewUserForm = false;
    };

    fotoLogin.cancelLogin = function(e) {
      //console.log("cancel login form");
      e.preventDefault();
      fotoLogin.showLoginForm = false;
    };
  }
