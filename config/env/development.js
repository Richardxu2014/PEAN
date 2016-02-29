/**
 * Created by richard on 16/1/13.
 */

'use strict';

module.exports = {
    db: {
        uri: 'mongodb://localhost/scdata',
        options: {
            user: '',
            pass: ''
        },
        // Enable mongoose debug mode
        debug: process.env.MONGODB_DEBUG || false
    },
    app: {
        title: '[Development]七彩51流量'
    },
    assets: {
        css: [
            'clients/modules/**/css/*.css'
        ],
        js: [
            'clients/modules/application.js',
            'clients/modules/config.js',
            'clients/modules/register.js',
            'clients/modules/*/*.js',
            'clients/modules/*/*/*.js'
        ],
        loginJs: [
            'clients/modules/application.js',
            'clients/modules/config.js',
            'clients/modules/register.js',
            'clients/modules/authentication/*.js',
            'clients/modules/authentication/*/*.js'
        ]
    }
};