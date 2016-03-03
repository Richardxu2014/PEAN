'use strict';

// user controller
angular.module('user').controller('UserCtrl', ['$scope', '$stateParams', '$location',  'User', '$q',
  function ($scope, $stateParams, $location, User, $q) {

    $scope.create = function () {
      var user = new User({
        userName:    this.userName,
        displayName: this.displayName,
        password:    this.password,
        roles:       this.roles,
        mobile:      this.mobile
      });
        console.log(user);
      user.$save(function (response) {
        $location.path('user/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.remove = function (user) {
      if (user) {
        user.$remove();
        for (var i in $scope.user) {
          if ($scope.user[i] === user) {
            $scope.user.splice(i, 1);
          }
        }
      } else {
        $scope.user.$remove(function () {
          $location.path('user');
        });
      }
    };

    $scope.update = function (isValid) {
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
