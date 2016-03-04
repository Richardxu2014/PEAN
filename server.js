'use strict';
/**
 * 服务启动文件
 * 启动方式 node server.js 
 */

require.extensions['.server.controller.js'] = require.extensions['.js'];
require.extensions['.server.model.js']      = require.extensions['.js'];
require.extensions['.server.routes.js']     = require.extensions['.js'];

var config = require('./config/config');

// Init the express application
var app = require('./config/express')();

// Start the app by listening on <port>
app.listen(config.port);

process.on('uncaughtException', function(err) {
    console.log(err);
});

// Expose app
var exports = module.exports = app;

// Logging initialization
console.log('application started on port ' + config.port);