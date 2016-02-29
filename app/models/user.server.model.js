'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    validator = require('validator');

//验证号码长度大于6位
var validatePassword = function(password) {
    return (password && password.length > 5);
};

var validateMobile = function (mobile) {
  return validator.isMobilePhone(mobile, 'zh-CN');
};

/**
 * User Schema
 */
var UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: '请填写用户名',
        trim: true
    },
    displayName: {
        type: String,
        required: '请填写用户昵称',
        trim: true
    },
    password: {
        type: String,
        default: '',
        validate: [validatePassword, '密码太短，必须是六位以上']
    },
    mobile: {
        type: String,
        default: '',
        validate: [validateMobile, '手机号码格式不正确']
    },
    salt: {
        type: String
    },
    roles: {
        type: [{
          type: String,
          enum: ['user', 'admin']
        }],
        default: ['user']
    },
    updated: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    }
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
    if (this.password && this.password.length > 1) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

/*
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
    } else {
        return password;
    }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

mongoose.model('User', UserSchema);