'use strict';

angular.module('user').config(['$stateProvider',
    function($stateProvider){
        $stateProvider
            .state('user', {
                abstract: true,
                url: '/user',
                template: '<ui-view/>'
            })
            .state('user.list',{
                url: '',
                templateUrl: '/modules/users/views/list.client.view.html'
            })
            .state('user.create', {
                url: '/create',
                templateUrl: '/modules/users/views/create.client.view.html'
            })
            .state('user.view', {
                url: '/:userId',
                templateUrl: '/modules/users/views/view.client.view.html'
            })
            .state('user.edit', {
                url: '/:userId/edit',
                templateUrl: '<h3>user Edit</h3>',
                data: {
                    roles: ['user', 'user']
                }
            });

    }]);