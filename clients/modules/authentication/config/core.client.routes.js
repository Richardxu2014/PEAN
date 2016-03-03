'use strict';

angular.module('authentication').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('login',{
                url: '/',
                templateUrl: '/modules/authentication/views/login.client.view.html',
                controller: 'AuthenticationCtrl'
            });
    }]);
