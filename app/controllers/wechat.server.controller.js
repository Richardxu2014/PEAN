'use strict';

var crypto = require('crypto');
var WechatAPI = require('wechat-api');
var config = require('../../config/config');


////测试订阅号
//var config = {
//    token: 'luliangdevtest',
//    encodingAESKey: 'C9Zqzugcw02s4zUr9Of60peSIzhXPca7v043EI4T0fv',
//    appid: 'wx52d72e78b0ecf0f0',
//    appScret: 'wx52d72e78b0ecf0f0'
//};



//创建User表并 添加一个管理员用户
exports.sign = function (req, res) {
    var params = req.body;
    console.log(params);
    var signature = params.signature;
    var timestamp = params.timestamp;
    var nonce = params.nonce;
    var echostr = params.echostr;
    var tmpArr = [config.wechat.token, timestamp, nonce];
    tmpArr.sort();
    var tmpStr = tmpArr.join('');
    var sha1 = crypto.createHash('sha1');
    sha1.update(tmpStr);
    var shaResult = sha1.digest('hex');
    if(shaResult == signature){
        res.send(echostr);
    }else{
        console.log('不是微信的请求！验证没通过');
        res.send('不是微信的请求！验证没通过');
    }
};