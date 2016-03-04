/**
 * Created by richard on 16/1/13.
 */

'use strict';

module.exports = {
    db: {
        database: 'scdata',
        username: 'xulq',
        password: '321`',
        options: {
            host: 'localhost',
            dialect: 'postgres',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        }
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