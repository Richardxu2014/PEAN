'use strict';

angular.module('authentication').controller('AuthenticationCtrl', ['$scope', '$state', '$http', '$location', '$localStorage', '$window', 'Authentication',
  function ($scope, $state, $http, $location, $localStorage, $window, Authentication) {
    $scope.authentication = Authentication;

    $scope.logout = function() {
      delete $localStorage.token;
      console.log('退出登录成功');
      $state.go('admin.list');
    };

    $scope.signin = function () {
      $http.post('/api/authenticate', $scope.credentials).success(function (response) {
        //$scope.authentication.user = response;
          console.log(response);


          if(response.type){
              $scope.authentication.user = response.user;
              $localStorage.token = response.token;
              $window.location.href = '/';
          }else{
              $scope.error = response.data;
          }

        // And redirect to the previous or home page
        //$state.go($state.previous.state.name || 'admin.list', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });


    };

    // OAuth provider request
    $scope.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };
  }
]);
