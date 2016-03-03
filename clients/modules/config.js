'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', '$httpProvider',
   function ($locationProvider, $httpProvider) {
       //$locationProvider.html5Mode(true).hashPrefix('!');
       $httpProvider.interceptors.push(['$q', '$location', '$localStorage', '$window',
           function($q, $location, $localStorage, $window) {
		            return {
		                'request': function (config) {
		                    config.headers = config.headers || {};
		                    if ($localStorage.token) {
		                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
		                    }
		                    return config;
		                },
		                'responseError': function(response) {
		                    if(response.status === 401 || response.status === 403) {
                                $window.location.href = '/login';
		                    }
		                    return $q.reject(response);
		                }
		            };
		        }]);

   }
]);

angular.module(ApplicationConfiguration.applicationModuleName).run(function ($rootScope, $state ) {

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



