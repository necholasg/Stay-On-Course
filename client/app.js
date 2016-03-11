var myApp = angular.module('myApp', ['ui.bootstrap', 'ui.router', 'ui.navbar', 'jcs-autoValidate']);

myApp.run(function(defaultErrorMessageResolver){
  defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages){
    errorMessages['badName'] = 'Name must only contain Alpha characters.';
    });
  }
);

myApp.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('index',{
        url: '/',
        templateUrl: 'static/partials/main.html'
    })

// ---------------Example Route--------------------------

    // .state('admin',{
    //     url: '/admin',
    //     templateUrl: 'static/partials/admin.html',
    //     controller: 'authCtrl',
    //     onEnter: function($state, auth){
    //       if(auth.isLoggedIn()){
    //         $state.go('admin2');
    //       }
    //     }
    // })

});
