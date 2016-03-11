myApp.controller('authController', function($scope, $state, auth){
  $scope.user = {};
  $scope.loggedIn = false;
  $scope.show_registration = false;

  $scope.register = function(){
    auth.register($scope.new_user).error(function(error){
      // console.log(typeof error);
      if (typeof error === 'string'){
        $scope.error = "Your username/email already exists.";
        $scope.new_user.password = "";
        $scope.new_user.confirm_password = "";
      }
      else{
        $scope.error = error;
        $scope.new_user.password = "";
        $scope.new_user.confirm_password = "";
      }
    }).then(function(){
      $state.go('home');
    });
  };

  $scope.logIn = function(){
    console.log("test");
    auth.logIn($scope.login_user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };
})

myApp.controller('NavCtrl', function($scope, auth){
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;

    $scope.tree = [{
      name: "Temp 1",
      link: "#"
    }, {
      name: "Temp 2",
      link: "#"
    },{
      name: "Temp 3",
      link: "#"
    }];
  });
