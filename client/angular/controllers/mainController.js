myApp.controller('mainController', function($scope, $window, auth, postFactory,$uibModal){

  $scope.posts = [];

  $scope.models = {
      selected: null,
      lists: {"Prospects": [], "Applied": [], "Pending":[], "Completed": []}
  };


  $scope.get = function() {
    console.log("getting");

    postFactory.allPosts(function(data){
    posts = data;
    for (i in posts) {
      switch(posts[i].status){
        case "Prospective":
          $scope.models.lists.Prospects.push(posts[i]);
          break;
        case "Applied":
          $scope.models.lists.Applied.push(posts[i]);
          break;
        case "Pending":
          $scope.models.lists.Pending.push(posts[i]);
          break;
        case "Completed":
          $scope.models.lists.Completed.push(posts[i]);
          break;
      }
    };
    });
  }

  $scope.get();


  $scope.test = function (){
    $scope.models.lists.Completed.push({'job_title':'test','company_name':'testtt'});
    console.log($scope.models.lists);
  }

    $scope.open = function (size) {

      var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'postForm.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
      options: function () {
        return ["Prospective","Applied","Pending","Completed"];
        }
      }
      });

      modalInstance.result.then(function(data) {
          $scope.get();
        });
    };


});





myApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance,options,postFactory) {
  $scope.options = options;

  $scope.submitPost = function() {
    postFactory.addPost($scope.newPost,function(data){
      $scope.newPost = {};
      $uibModalInstance.close(data);
    });
  }

  $scope.cancel = function () {
    $uibModalInstance.close('cancel');
  };

});
