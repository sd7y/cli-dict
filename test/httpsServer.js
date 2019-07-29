let https = require("https");
let fs = require("fs");
var querystring = require('querystring');

// Configuare https
// openssl genrsa -out privatekey.pem 1024
// openssl req -new -key privatekey.pem -out certrequest.csr
// openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
const httpsOption = {
    key : fs.readFileSync("./cert/privatekey.pem"),
    cert: fs.readFileSync("./cert/certificate.pem")
}
// Create service
// http.createServer(app).listen(80);
https.createServer(httpsOption, function(request, response) {

    console.log(request);
    // console.log(request.rawHeaders)
    
    console.log(request.url);

    var body = "";
    //每当接收到请求体数据，累加到 post 中
    request.on('data', function (chunk) {
        body += chunk;  //一定要使用 +=，如果body=chunk，因为请求 favicon.ico，body 会等于{}
        console.log("chunk:",chunk);
    });
 
    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    request.on('end', function () {
        // 解析参数
        body = querystring.parse(body);  //将一个字符串反序列化为一个对象
        console.log("body:", body);
        // 设置响应头部信息及编码\<br><br>      res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        if(body.name && body.url) { // 输出提交的数据
            response.write("网站名：" + body.name);
            response.write("<br>");
            response.write("网站 URL：" + body.url);
        } else {  // 输出表单
            response.write('Hello world!');
        }
        response.end();
    });

    // response.writeHead(200, {'Content-Type': 'text/plain'});
    // response.end('Hello World\n');
}).listen(4443);