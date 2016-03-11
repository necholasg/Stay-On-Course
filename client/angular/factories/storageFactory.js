myApp.factory('storageFactory', function($http, $state){
  factory = {};
  names = [];

  factory.addName = function(newName, callback){
    $http.post('/names/new', newName).success(function(res){
      if(res.status == 'error'){
        console.log("error with adding name");
      }else{
        names.push(res);
        callback(names);
      }
    })
  };
  factory.allNames = function(callback){
    $http.get('/names').success(function(res){
      if(res.status == 'error'){
        console.log('error in loading names');
      }else{
        names = res
        callback(names)
      };
    });
  };
  factory.getName = function(name, callback){
    $http.get('/name/'+name._id).success(function(res){
      if(res.status == 'error'){
        console.log('error in loading names');
      }else{
        callback(res);
      };
    });
  };

  factory.editName = function(name, callback){
    $http.post('/name/edit/', name).success(function(res){
      if(res.status == 'error'){
        console.log('error in editing name');
      }else{
        callback(names)
      };
    });
  };

  factory.delete = function(name, callback){
    $http.get('/name/delete/'+name._id).success(function(res){
      if(res.status == 'error'){
        console.log("error with deleting name");
      }else{
        callback(res);
      }
    })
  };

  return factory;
})
