'use strict';

var ApplicationConfiguration = (function() {
    // Init module configuration options
    var applicationModuleName = '51liuliang';
    var applicationModuleVendorDependencies = ['ngResource', 'ui.router', 'ngStorage'];

    // Add a new vertical module
    var registerModule = function(moduleName) {
        // Create angular module
        angular.module(moduleName, []);

        // Add the module to the AngularJS configuration file
        angular.module(applicationModuleName).requires.push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
    };
})();