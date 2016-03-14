myApp.factory('storageFactory', function($http, $state){
  factory = {};

  factory.newSearch = function(newSearch, callback){
    // console.log(newSearch);
    $http.post('/newSearch', newSearch).success(function(res){
      if(res.status == 'error'){
        console.log('error in loading names');
      }else{
        callback(res)
      };
    });


  };

  return factory;
})
