myApp.controller('mainController', function($scope, $window, storageFactory){
  $scope.names = [];
  $scope.edit = true;

  storageFactory.allNames(function(data){
    $scope.names = data;
  });

  $scope.newName = function(){
    storageFactory.addName($scope.person, function(data){
      $scope.names = data
      $scope.person = {};
    })
  };

  $scope.getName = function(name){
    storageFactory.getName(name, function(data){
      $scope.editName = data;
    })
  }

  $scope.delete = function(name){
    storageFactory.delete(name, function(data){
      if(data.ok == 1){
        storageFactory.allNames(function(data){
          $scope.names = data;
        });
      }
    })
  }

  $scope.editMe = function(name){
    storageFactory.editName(name, function(data){
      storageFactory.allNames(function(data){
        $scope.names = data;
        $scope.editName = {};
      });
    })
  }



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
