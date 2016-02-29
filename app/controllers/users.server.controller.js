'use strict';

/**
 * Module dependencies.
 */
var path         = require('path'),
    mongoose     = require('mongoose'),
    User         = mongoose.model('User'),
    jwt          = require("jsonwebtoken"),
    errorHandler = require(path.resolve('./app/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            console.log(err)
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(user);
        }
    });
};

exports.read = function (req, res) {
    res.json(req.user);
};

exports.update = function (req, res) {
    var user = req.user;


    user.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(user);
        }
    });
};

/**
 * Delete an user
 */
exports.delete = function (req, res) {
    var user = req.user;

    user.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(user);
        }
    });
};

/**
 * List of users
 */
exports.list = function (req, res) {
    User.find().exec(function (err, users) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(users);
        }
    });
};

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'User is invalid'
        });
    }

    User.findById(id).populate('user', 'displayName').exec(function (err, user) {
        if (err) {
            return next(err);
        } else if (!user) {
            return res.status(404).send({
                message: 'No user with that identifier has been found'
            });
        }
        req.user = user;
        next();
    });
};


exports.signIn = function (req, res) {
    console.log(req.body);
    User.findOne({userName: req.body.userName, roles: 'admin'}, function(err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "有错误 错误信息: " + err
                });
            } else {
                if (user) {
                    if(user.authenticate(req.body.password)){
                        delete user.salt;
                        delete user.password;
                        user.password = '';
                        user.salt = '';
                        var data = {
                            type: true,
                            user: user,
                            token: jwt.sign(user, config.jwtTokenSecret)
                        };
                        console.log(data);
                        res.json(data);
                    }else{
                        res.json({
                            type: false,
                            data: "密码错误"
                        });
                    }
                                         
                } else {
                    res.json({
                        type: false,
                        data: "用户不存在"
                    });    
                }
            }
    });
};

exports.signUp = function (req, res) {
    var param = {
        userName: 'xulq', 
        password: '123123123', 
        displayName: 'testname44444'
    };
    User.findOne(param, function(err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
                console.log(err);
            } else {
                if (user) {
                    res.json({
                        type: false,
                        data: "user already exists!"
                    });
                } else {
                    var userModel = new User(param);
                    console.log(userModel);
                    userModel.save(function(err, user) {
                        console.log('5555555');
                        console.log(user);
                        console.log(err);

                        user.token = jwt.sign(user, '51liuliang');
                        user.save(function(err, admin1) {
                            console.log('666666666');
                            console.log(err);
                            res.json({
                                type: true,
                                data: admin1,
                                token: admin1.token
                            });
                        });
                    })
                }
            }
        });
};

