
var http = require('http'),
    url  = require('url'),
    fs   = require("fs"),
    qs   = require('querystring'),
    server;

server = http.createServer(function (req,res) {
    var urlData,
        encode   = "utf8",
        filePath = "view/error.html",
        //formData,
        action;

    urlData = url.parse(req.url,true);
    action = urlData.pathname;

    if (action === "/Signup") {

        /*  // jsonp请求，为get形式，不需要以下方法
        formData = '';
        req.on("data", function (data) {
            formData += data;
        });
        req.on("end", function () {
            var msg;
            user = qs.parse(formData);
            user.id = "123456";
            msg = JSON.stringify(user);
            console.log(msg);
            res.writeHead(200, {"Content-Type":"application/json;","Content-Length":msg.length});
            res.end(msg);
        });
        */

        user = urlData.query;
        console.log(user);
        var jsonp = user.callback + '(' + JSON.stringify(user) + ')';  // 此为获取zepto或jquery传来的callback参数，必须转换为string！！
        console.log(jsonp);

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(jsonp);
    }
    else {
        fs.readFile(filePath, encode, function(err, file) {
            res.writeHead(200, {"Content-Type":"application/json; charset=utf-8"});
            res.write('{"da":"yuyu"}');
            res.end();
        });
    }
        
});

server.listen(3000);

console.log('Server跑起來了，現在時間是:' + new Date());