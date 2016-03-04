'use strict';

angular.module('core').controller('CoreCtrl', ['$scope', '$window', '$localStorage',
    function($scope, $window, $localStorage){

        if($localStorage.user === undefined){
            $window.location.href = '/login';
            return false;
        }
        $scope.user = $localStorage.user;
        $scope.user.company = '七彩51流量微信后台';

        $scope.menus = [
            {title: '用户管理', state: 'user.list', iconClass: 'icon-group',    childs: [] },
            {title: '菜单管理', state: 'user.list', iconClass: 'icon-cogs', childs: [] },
            {title: '消息管理', state: 'user.list', iconClass: 'icon-envelope', childs: [] }
        ]

        $scope.logout = function() {
            delete $localStorage.token;
            delete $localStorage.user;
            $window.location.href = '/login';
        };
    }
]);