'use strict';

module.exports = function(app) {
    // Root routing
    var core = require('../../app/controllers/core');
    // Define error pages
  	app.route('/server-error').get(core.renderServerError);

    app.route('/login').get(core.login);

    app.route('/').get(core.layout);
};