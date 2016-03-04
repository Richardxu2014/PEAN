'use strict';

/**
 * Module dependencies.
 */
var path         = require('path'),
    jwt          = require("jsonwebtoken"),
    User         = require(path.resolve('./app/models/user.server.model'));

//创建User表并 添加一个管理员用户
exports.createTable = function (req, res) {
    User.sync({force: true}).then(function () {
        console.log('啦啦啦，连接数据库成功！');
        return User.create({
            userName: '51admin',
            displayName: '七彩管理员',
            password : '123123',
            mobile: '18626272086',
            role: 'admin',
            source: '管理员添加'
        });
    });
};

exports.create = function (req, res) {
    User.create(req.body).then(function(user){
        res.json(user);
    }).catch(function(err){
        console.log(err.errors);
        res.status(400).send(err.errors);
    });
};



exports.read = function (req, res) {
    res.json(req.user);
};

exports.update = function (req, res) {
    User.update(req.user).then(function() {
        res.json(user);
    }).catch(function(err){
        console.log(err.errors);
        res.status(400).send(err);
    });

};

/**
 * Delete an user
 */
exports.delete = function (req, res) {
    User.destroy({
        where: {id: req.user.id}
    }).then(function(count) {
        res.json(count);
    }).catch(function(err){
        //console.log(err);
        res.status(400).send(err);
    });
};

/**
 * List of users
 */
exports.list = function (req, res) {
    User.findAll().then(function(users) {
        res.json(users);
    }).catch(function(err){
        res.status(400).send(err);
    });
};

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
    User.findById(id).then(function(user) {
        req.user = user;
        next();
    }).catch(function(err){
        console.log(err);
        res.status(400).send(err);
    });
};


exports.signIn = function (req, res) {
    User.find({
        where :{
            userName: req.body.userName,
            role: 'admin'
        }
    }).then(function(user) {
        if (user) {
            if(user.authenticate(req.body.password)){
                user.password = '';
                user.salt = '';
                //var sign = {
                //    userName: user.userName,
                //    validity:
                //}
                var data = {
                    type: true,
                    user: user,
                    token: jwt.sign(user.userName, config.jwtTokenSecret)
                };
                res.json(data);
            }else{
                res.json({
                    type: false,
                    data: "密码错误"
                });
            }

        } else {
            res.json({ type: false, data: "用户不存在" });
        }
    }).catch(function(err){
        res.json({ type: false, data: "有错误 错误信息:"+ err });
    });
};


