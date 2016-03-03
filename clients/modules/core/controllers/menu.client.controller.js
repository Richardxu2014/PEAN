'use strict';



angular.module('core').controller('MenuCtrl', ['$scope',
    function($scope){
        $scope.menus = [
            {title: '用户管理', state: 'user.list', iconClass: 'icon-group',    childs: [] },
            {title: '菜单管理', state: 'user.list', iconClass: 'icon-cogs', childs: [] },
            {title: '消息管理', state: 'user.list', iconClass: 'icon-envelope', childs: [] }
        ]
    }
]);




