myApp.controller('jobSearchController', function($scope, $window, storageFactory, $timeout, ngToast, $uibModal){
  var toastMe = function(){
    ngToast.create({
    className: 'success',
    content: '<a>Search Complete!</a>'
    });
  }
  var toastMeNo = function(){
    ngToast.create({
    className: 'danger',
    content: '<a>Sorry, no results. Try again!</a>'
    });
  }

  $scope.newSearch = function(){
    if($scope.jobSearch.state){
      $scope.jobSearch.state = $scope.jobSearch.state.abbreviation;
    };
    storageFactory.newSearch($scope.jobSearch, function(data){
      // console.log(data);
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
  $scope.searchForm = function(){
    $timeout(function(){$scope.resetForm();},1500);
  }
  $scope.resetForm = function(){
    $scope.searchMe.$setPristine();
  }

  $scope.states = getStates();

});

myApp.controller('jobModalInstanceCtrl', function ($scope, $uibModalInstance,options,postFactory, job, lists) {
  $scope.options = options;
  $scope.newPost = {};
  $scope.newPost.job_title = job.title || job.jobTitle;
  $scope.newPost.company_name = job.company;
  $scope.newPost.location = job.location;
  $scope.newPost.url = job.url || job.detailUrl;

  $scope.submitPost = function() {
    postFactory.addPost($scope.newPost,lists,function(data){
      $scope.newPost = {};
      $uibModalInstance.close(data);
    });
  }

  $scope.cancel = function () {
    $uibModalInstance.close('cancel');
  };

});
