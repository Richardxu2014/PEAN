'use strict';



angular.module('core').controller('HeaderCtrl', ['$scope', '$state', '$window', '$localStorage',
    function($scope, $state, $window, $localStorage){
        if($localStorage.user === undefined){
            $window.location.href = '/login';
            return false;
        }
        $scope.user = $localStorage.user;
        $scope.user.company = '七彩51流量微信后台';
        $scope.logout = function() {
            delete $localStorage.token;
            delete $localStorage.user;
            console.log('退出登录成功');
            $window.location.href = '/login';
        };
    }
]);




