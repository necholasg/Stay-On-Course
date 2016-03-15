myApp.factory('storageFactory', function($http, $state){
  factory = {};

  factory.newSearch = function(newSearch, callback){
    $http.post('/newSearch', newSearch).success(function(res){
      if(res.status == 'error'){
        console.log('error in search');
      }else{
        callback(res)
      };
    });


  };

  return factory;
})
