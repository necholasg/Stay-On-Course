myApp.controller('mainController', function($scope, $window, auth, postFactory,$uibModal){

  $scope.posts = [];

  $scope.models = {
      selected: null,
      lists: {"Prospects": [], "Applied": [], "Pending":[], "Completed": []}
  };



  $scope.get = function() {
    console.log("getting");

    postFactory.allPosts(function(data){
    // console.log(data);
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
    console.log($scope.models);
    });
  }
$scope.get();
// console.log("times");

  // $scope.$watch('package', function() {
  //   console.log('HERERHERHEREHRER');
  //   $scope.models.lists.Completed.push(package);
  //   console.log($scope.models.lists.Completed);
  // });
  // $scope.delivery = function(){
  //   console.log(package);
  //   $scope.posts.push(package);
  //   $scope.get();
  //   console.log("after get");
  // }
  // var package;

  // $scope.listMoved = function(data){
  //   console.log(data);
  // }

  $scope.newCardLocation = function(index, item, listName){

    item.newLocation = listName;
    item.newIndex = index;
    postFactory.editPost(item, function(){

    })
  }


  $scope.test = function (){
    console.log("got here");
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
        if (data.status == "Completed") {
          $scope.models.lists.Completed.push(data);
        }
        if (data.status == "Prospective") {
          $scope.models.lists.Prospects.push(data);
        }
        if (data.status == "Applied") {
          $scope.models.lists.Applied.push(data);
        }
        if (data.status == "Pending") {
          $scope.models.lists.Pending.push(data);
        }
        console.log(data);
        // console.log("above");
        // $scope.get();
        // console.log($scope.models);
        // console.log("below");

        // $scope.test();
        // package = data;
        // $scope.delivery();
        // console.log(package);
        // console.log($scope);
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
