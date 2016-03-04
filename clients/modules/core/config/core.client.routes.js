'use strict';


angular.module('core').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home',{
                url: '/',
                templateUrl: '/modules/core/views/home.client.view.html',
                controller: 'CoreCtrl'
            });
    }]);