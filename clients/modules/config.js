'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', '$httpProvider',
   function ($locationProvider, $httpProvider) {
       //$locationProvider.html5Mode(true).hashPrefix('!');
       $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
		            return {
		                'request': function (config) {
		                    config.headers = config.headers || {};
		                    if ($localStorage.token) {
		                    	console.log('aaaaaaaaaaaaaaaaaaaaaa');
		                    	console.log($localStorage.token);
		                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
		                    }
		                    return config;
		                },
		                'responseError': function(response) {
		                    if(response.status === 401 || response.status === 403) {

		                        $location.path('/login');
		                    }
		                    return $q.reject(response);
		                }
		            };
		        }]);

   }
]);

angular.module(ApplicationConfiguration.applicationModuleName).run(function ($rootScope, $state) {

//    // Check authentication before changing state
//    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
//        if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
//            // var allowed = false;
//            // // toState.data.roles.forEach(function (role) {
//            // //     if (Authentication.user.roles !== undefined && Authentication.user.roles.indexOf(role) !== -1) {
//            // //         allowed = true;
//            // //         return true;
//            // //     }
//            // });

//            if (!allowed) {
//                event.preventDefault();
//                // if (Authentication.user !== undefined && typeof Authentication.user === 'object') {
//                //     $state.go('forbidden');
//                // } else {
//                    $state.go('authentication.signin').then(function () {
//                        storePreviousState(toState, toParams);
//                    });
//                // }
//            }
//        }
//    });

   // Record previous state
   $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
       storePreviousState(fromState, fromParams);
   });

   // Store previous state
   function storePreviousState(state, params) {
       // only store this state if it shouldn't be ignored
       if (!state.data || !state.data.ignoreState) {
           $state.previous = {
               state: state,
               params: params,
               href: $state.href(state, params)
           };
       }
   }
});

//Then define the init function for starting up the application
angular.element(document).ready(function () {
    //Then init the app
    angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});



