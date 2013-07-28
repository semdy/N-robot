## Node.js 微信机器人 ##

调用的 [simsimi](http://www.simsimi.com/) 的接口进行消息回复，可以去官网注册并申请 7 天免费的 Trial-key 。

**注意：** 1. 只接收微信的文字消息 2.把 key 替换成自己申请的 key 3.回复规则里植入广告太多，大家注意甄别 = =

    var http = require('http'),
        wechat = require('node-wechat')
        request = require('request');

    http.createServer(function (req, res) {
      wechat.handler(req, res);
      wechat.text(function (data) {
        var simsimi = {
          key: "your simsimi's key",
          lc: "ch",
          ft: "0.0",
          text : data.Content
        }
        var msg = {
          FromUserName : data.ToUserName,
          ToUserName : data.FromUserName,
          MsgType : "text",
          Content : "",
          FuncFlag : 0
        }
        var url = "http://sandbox.api.simsimi.com/request.p?key=" + simsimi.key + "&lc=" + simsimi.lc + "&ft=" + simsimi.ft + "&text=" + simsimi.text;
        request(url, function (err, res, body) {
          if (!err && res.statusCode == 200) {
            body = JSON.parse(body);
            msg.Content = body.response;
            wechat.send(msg);
          }
        });
      });
    }).listen(80);