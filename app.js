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