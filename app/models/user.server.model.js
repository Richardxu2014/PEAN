'use strict';

/**
 * Module dependencies.
 */
var Sequelize = require('sequelize'),
    sequelize = require('../../config/database'),
    crypto = require('crypto');

var hashPassword = function(salt, password) {
    if (salt && password) {
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    } else {
        return password;
    }
};

module.exports = sequelize.define('user', {
    userName: {
        type: Sequelize.STRING,
        field: 'user_name',
        unique: true,
        validate: {
            notEmpty: {
                args: true,
                msg: "用户名不能为空"
            }
        }
    },
    displayName: {
        type: Sequelize.STRING,
        field: 'display_name',
        validate: {
            notEmpty: {
                args: true,
                msg: "用户昵称不能为空"
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        default: '',
        validate: {
            len: {
                args: [6,20],
                msg: "密码必须为6到20位的字母或数字"
            }
        }
    },
    mobile: {
        type: Sequelize.STRING,
        default: '',
        validate: {
            is :{
                args:/^1[345678]{1}\d{9}$/ , //
                msg: '手机号码格式不正确'
            }
        }
    },
    role: {
        type: Sequelize.STRING,
        default: 'user' // [user,  admin]
    },
    source:{
        type: Sequelize.STRING,
        default: '管理员添加'
    },
    salt: {
        type: Sequelize.STRING
    }

}, {
    freezeTableName: true,
    timestamps: true,
    hooks:{
        beforeCreate: function(user){
            if (user.password.length > 1) {
                var salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
                user.salt = salt.toString();
                user.password = hashPassword(user.salt, user.password);
            }
        }
    },
    instanceMethods: {
        authenticate: function (password) {
            return this.password === hashPassword(this.salt, password)
        }
    }
});
