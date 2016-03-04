'use strict';

// user controller
angular.module('user').controller('UserCtrl', ['$scope', '$stateParams', '$location',  'User',
  function ($scope, $stateParams, $location, User) {
    $scope.role = 'admin';
    $scope.create = function () {
      var user = new User({
        userName:    this.userName,
        displayName: this.displayName,
        password:    this.password,
        role:        this.role,
        mobile:      this.mobile
      });
      user.$save(function (response) {
        $location.path('user/' + response.id);
      }, function (errorResponse) {
        $scope.errors = errorResponse.data;
      });
    };

    $scope.remove = function (id) {
      if (id) {
          User.delete({userId: id},function(){
              $location.path('user');
          })
      }
    };

    $scope.update = function () {
      $scope.error = null;
      var user = $scope.user;
      user.$update(function () {
        $location.path('user/' + user._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.find = function () {
      $scope.users = User.query();
    };

    $scope.findOne = function () {
      $scope.user = User.get({
        userId: $stateParams.userId
      });
    };
  }
]);
