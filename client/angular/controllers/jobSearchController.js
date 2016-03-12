myApp.controller('jobSearchController', function($scope, $window, storageFactory, $timeout, ngToast){
  var toastMe = function(){
    ngToast.create({
    className: 'success',
    content: '<p>Search Complete!</p>'
    });
  }
  var toastMeNo = function(){
    ngToast.create({
    className: 'danger',
    content: '<p>Sorry, no results. Try again!</p>'
    });
  }

  $scope.newSearch = function(){
    if($scope.jobSearch.state){
      $scope.jobSearch.state = $scope.jobSearch.state.abbreviation;
    };
    storageFactory.newSearch($scope.jobSearch, function(data){
      console.log(data);
      $scope.jobs = [];
      if(data.length === 0){
        console.log("nothing to display");
        toastMeNo();
        $scope.jobSearch = {};
      }else if(data.dice && data.git){
        $scope.dice = data.dice.resultItemList;
        $scope.git = data.git;
        $scope.jobs = $scope.dice.concat($scope.git)
        $scope.jobSearch = {};
        toastMe();
      }else if(data.resultItemList){
        $scope.jobs = data.resultItemList;
        $scope.jobSearch = {};
        toastMe();
      }else{
        $scope.jobs = data;
        $scope.jobSearch = {};
        toastMe();
      }

    })
  };
})
