angular.module("fotoChallenge")
  .controller("fotoLoginController",fotoLoginController);

    fotoLoginController.$inject = ["fotoFactory", "userFactory"];
  function fotoLoginController(fotoFactory, userFactory){
    var fotoLogin = this;
    console.log("fotoLogin Controller, showNewUserForm= ", userFactory.showNewUserForm);

    fotoLogin.fotoFactory = fotoFactory;
    fotoLogin.userFactory = userFactory;
    // get the current user list
    
    userFactory.allUsers()
      .then (function(response) {
        console.log("fotoLogin get all users:", response.data);
        userFactory.fotoUsers = response.data;
      })
      .catch (function(error) {
        console.error("fotoLogin unable to get all users:", error);
      });
      
    //fotoLogin.currentUser = fotoFactory.currentUser;
    //fotoLogin.loggedIn = fotoFactory.loggedIn;
    //fotoLogin.fotoGallery = fotoFactory.fotoGallery;
    //fotoLogin.fotoUsers = fotoFactory.fotoUsers;
    if(userFactory.loggedIn) {
      fotoFactory.currentTitle = "Logout";
    } else {
      fotoFactory.currentTitle = "Login";
    }
    
    fotoLogin.setCurrentUser = function() {
      //console.log("fotoLogin setting currentUser, name =" + fotoLogin.currentUserName);
      for (var user in userFactory.fotoUsers) {
        //console.log("fotoLogin checking:" + fotoFactory.fotoUsersList[user].user + " against " + fotoLogin.currentUserName);
        if(userFactory.fotoUsers[user].username === userFactory.selectedUser) {
          console.log("fotoLogin setting currentUser to:", userFactory.fotoUsers[user]);
          //fotoLogin.currentUser = fotoFactory.fotoUsersList[user];
          userFactory.currentUser = userFactory.fotoUsers[user];
          userFactory.loggedIn = true;
          //fotoLogin.loggedIn = true;
          fotoFactory.currentTitle = "Logout";
          
          return;
        }
      }
      console.log("Error - fotoLogin did not find currentUserName:" +userFactory.selectedUser);
      userFactory.currentUser = undefined;
      userFactory.loggedIn = false;
      //fotoLogin.loggedIn = false;
      fotoFactory.currentTitle = "Login";
    };
    
    fotoLogin.logout = function() {
      console.log("fotoLogin logging out");
      userFactory.currentUser = undefined;
      userFactory.loggedIn = false;
      //fotoLogin.loggedIn = false;
      fotoFactory.currentTitle = "Login";
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
          userFactory.currentUser = fotoLogin.newUser;
          console.log("fotoLogin setting currentUser:", fotoFactory.currentUser);
          userFactory.loggedIn = true;
          // update collection of users
          userFactory.fotoUsers[fotoLogin.newUser.username] = fotoLogin.newUser;
          console.log("fotoLogin fotoUsers:", userFactory.fotoUsers);
          //reset form data
          fotoLogin.newUser = {};
          console.log("fotoLogin checking currentUser:", userFactory.currentUser);

        })
        .catch(function(error) {
          console.error("fotoLogin unable to create newUser:", error);
        });

      //var newUser = new fotoFactory.FotoUser(fotoLogin.newUserName, fotoLogin.newUserPassword, fotoLogin.newUserEmail, fotoLogin.newUserPhone);
      //fotoFactory.fotoUsers[fotoLogin.newUserName] = newUser;
      //fotoFactory.currentUser = newUser;
      //fotoFactory.loggedIn = true;
      //fotoHome.loggedIn = true;
      
    };
    
    fotoLogin.signUp = function() {
      userFactory.showNewUserForm = true;
    };
    
    fotoLogin.cancelNewUser = function(e) {
      console.log("cancel new user form");
      e.preventDefault();
      userFactory.showNewUserForm = false;
    };
  }