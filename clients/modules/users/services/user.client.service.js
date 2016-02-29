'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('user').factory('User', ['$resource',
  function ($resource) {
    return $resource('api/user/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

