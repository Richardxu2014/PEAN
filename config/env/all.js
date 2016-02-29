'use strict';

module.exports = {
    app: {
        title: '七彩51流量',
        description: '七彩投资51流量管理系统',
        keywords: '51流量, 微信'
    },
    port: process.env.PORT || 3008,
    templateEngine: 'swig',
    jwtTokenSecret: 'SeverColor51LiuLiang',    
    assets: {
        lib: {
            css: [
                'clients/lib/bootstrap/dist/css/bootstrap.css',
                'clients/lib/ace/font-awesome.min.css',
                'clients/lib/ace/ace-fonts.css',
                'clients/lib/ace/ace.min.css'
            ],
            js: [
                'clients/lib/jquery/dist/jquery.min.js',
                'clients/lib/bootstrap/dist/js/bootstrap.min.js',
                'clients/lib/angular/angular.js',
                'clients/lib/angular-resource/angular-resource.js',
                'clients/lib/ngstorage/ngStorage.js',
                'clients/lib/angular-ui-router/release/angular-ui-router.js',
                'clients/lib/ace/ace-elements.js',
                'clients/lib/ace/ace-extra.js',
                'clients/lib/ace/ace.js',
                'clients/lib/ace/jquery.dataTables.min.js',
                'clients/lib/ace/jquery.dataTables.bootstrap'
            ]
        },
        // css: [
        //     'clients/modules/**/css/*.css'
        // ],
        // js: [
        //     'clients/modules/application.js',
        //     'clients/modules/config.js',
        //     'clients/modules/register.js',
        //     'clients/modules/*/*.js',
        //     'clients/modules/*/*/*.js'
        // ],
        tests: [
           
        ]
    },
    server: {
        models: 'app/models/*.js',
        routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    }
};