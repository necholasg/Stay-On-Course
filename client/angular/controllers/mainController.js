myApp.controller('mainController', function($scope, $window, auth, postFactory,$uibModal){


  $scope.posts = [];

  $scope.models = {
      selected: null,
      lists: {"Prospects": [], "Applied": [], "Pending":[], "Completed": []}
  };



  $scope.get = function() {

    postFactory.allPosts(function(data){
    posts = data;
    for (i in posts) {
      switch(posts[i].status){
        case "Prospects":
          $scope.models.lists.Prospects[posts[i].index] = posts[i];
          break;
        case "Applied":
          $scope.models.lists.Applied[posts[i].index] = posts[i];
          break;
        case "Pending":
          $scope.models.lists.Pending[posts[i].index] = posts[i];
          break;
        case "Completed":
          $scope.models.lists.Completed[posts[i].index] = posts[i];
          break;
      }
    };
    });
  }

  $scope.get();

  $scope.newCardLocation = function(index, item, listName){
    item.status = listName;
    switch(item.status){
        case "Prospects":
          item.index = $scope.models.lists.Prospects.indexOf(item);
          break;
        case "Applied":
          item.index = $scope.models.lists.Applied.indexOf(item);
          break;
        case "Pending":
          item.index = $scope.models.lists.Pending.indexOf(item);
          break;
        case "Completed":
          item.index = $scope.models.lists.Completed.indexOf(item);
          break;
    }

    postFactory.editPost(item, function(){

      for (var key in $scope.models.lists){
        for (i in $scope.models.lists[key]){
          if ($scope.models.lists[key][i] != null ){
            var updating_object = $scope.models.lists[key][i];
            updating_object.index = $scope.models.lists[key].indexOf(updating_object);
            postFactory.editPost(updating_object,function(){
            })
          }
        }
      }
    })

    $scope.open = function (size) {

      var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'postForm.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
      options: function () {
        return ["Prospects","Applied","Pending","Completed"];
        },
      lists : function() {
        return $scope.models.lists;
        },
      }
      });

      modalInstance.result.then(function(data) {
        if (data.status == "Completed") {
          $scope.models.lists.Completed.push(data);
        }
        if (data.status == "Prospects") {
          $scope.models.lists.Prospects.push(data);
        }
        if (data.status == "Applied") {
          $scope.models.lists.Applied.push(data);
        }
        if (data.status == "Pending") {
          $scope.models.lists.Pending.push(data);
        }
        });
    };

});





myApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance,options,postFactory,lists) {
  $scope.options = options;



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
