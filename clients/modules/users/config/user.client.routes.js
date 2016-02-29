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
                templateUrl: 'modules/users/views/list.client.view.html'
            })
            .state('user.create', {
                url: '/create',
                templateUrl: 'modules/users/views/create.client.view.html'
            })
            .state('user.view', {
                url: '/:userId',
                templateUrl: 'modules/users/views/view.client.view.html'
            })
            .state('user.edit', {
                url: '/:userId/edit',
                templateUrl: '<h3>user Edit</h3>',
                data: {
                    roles: ['user', 'user']
                }
            })
            .state('authentication', {
                abstract: true,
                url: '/authentication',
                templateUrl: 'modules/users/views/authentication/authentication.client.view.html'
            })
            .state('authentication.signup', {
                url: '/signup',
                templateUrl: 'modules/users/views/authentication/signup.client.view.html'
            })
            .state('authentication.signin', {
                url: '/signin',
                templateUrl: 'modules/users/views/authentication/signin.client.view.html'
            });

    }]);