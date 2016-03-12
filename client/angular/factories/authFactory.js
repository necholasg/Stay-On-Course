myApp.factory('auth', function($http, $window, $state){
  var auth = {};

  auth.saveToken = function (token){
    $window.localStorage['soc'] = token;
  };

  auth.getToken = function (){
    return $window.localStorage['soc'];
  }

  auth.isLoggedIn = function(){
  var token = auth.getToken();

  if(token){
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  // $window.onbeforeunload = function(){
  //   $window.localStorage.removeItem('soc');
  // }

  auth.currentUser = function(){
    if(auth.isLoggedIn()){
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.username;
    }
  };

  auth.register = function(user){
    return $http.post('/register', user).success(function(data){
        auth.saveToken(data.token);
    });
  };

  auth.logIn = function(user){
    return $http.post('/login', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logOut = function(){
    $window.localStorage.removeItem('soc');
    $state.go('index');
  };

  return auth;
})
