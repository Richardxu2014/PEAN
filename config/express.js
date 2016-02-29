'use strict';

/**
 * Express 配置
 */
var express      = require('express'),
    path         = require('path'),
    logger       = require('morgan'),
    bodyParser   = require('body-parser'),
    jwt          = require("jsonwebtoken"),
    helmet       = require('helmet'),
    consolidate  = require('consolidate');

    global.config = require('./config');
module.exports = function(){
    // Initialize express app
    var app = express();

    // Globbing model files
    config.getGlobbedFiles('./app/models/*.js').forEach(function(modelPath) {
        require(path.resolve(modelPath));
    });

    // Setting application local variables
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.keywords = config.app.keywords;
    app.locals.jsFiles = config.getJavaScriptAssets();
    app.locals.cssFiles = config.getCSSAssets();
    app.locals.loginJsFiles = config.getLoginJavaScriptAssets();

    // Set swig as the template engine
    app.engine('server.view.html', consolidate[config.templateEngine]);

    // Set views path and view engine
    app.set('view engine', 'server.view.html');
    app.set('views', './app/views');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // Use helmet to secure Express headers
    var SIX_MONTHS = 15778476000;
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.use(helmet.hsts({
        maxAge: SIX_MONTHS,
        includeSubdomains: true,
        force: true
    }));
    app.disable('x-powered-by');

    app.use(express.static(path.resolve('./clients')));

    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        next();
    });


    var authorize = function(req, res, next) {
        var bearerToken;
        console.log('111111111111111111111111111111111111111111111');
        console.log(req.headers["authorization"]);
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            console.log('bbbbcccccc cccccc');
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            req.token = bearerToken;
            console.log(bearerToken);
            jwt.verify(bearerToken, config.jwtTokenSecret, function(err, decoded) {
                if (err) {

                    console.log('登录状态异常：' + err);
                    res.redirect("/login");
                } else {
                    console.log('=========================');
                    console.log(decoded);
                    console.log('=========================');

                    next();
                }
            });
        } else {
            console.log('请先登录！');
            res.redirect("/login");
        }
    };

    // Globbing routing files
    config.getGlobbedFiles('./app/routes/*.js').forEach(function(routePath) {
        require(path.resolve(routePath))(app, authorize);
    });


    // app.use(function (req, res, next) {
    //    if(req.path.indexOf('/api')>=0){
    //       next();
    //    }else{ //angular启动页
    //        //res.send("aaaaaa");
    //        res.redirect("/");
    //    }
    // });

    
    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function(err, req, res, next) {
        // If the error object doesn't exists
        if (!err) return next();

        // Log it
        console.error(err.stack);

        // Error page
        res.status(500).render('500', {
            error: err.stack
        });
    });

    // Assume 404 since no middleware responded
    app.use(function(req, res) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not Found'
        });
    });

    return app;
};