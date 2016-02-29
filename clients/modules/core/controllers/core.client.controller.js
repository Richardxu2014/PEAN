'use strict';


angular.module('core').controller('HeaderCtrl', ['$scope', 'Authentication',
    function($scope, Authentication){
        $scope.authentication = Authentication;
    }
]);

angular.module('core').controller('HomeCtrl', ['$scope',
    function($scope){
    }
]);




