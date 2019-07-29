const http = require('http');  //创建服务器 http
 
const hostname = '127.0.0.1';   //IP地址
const port = 3000;   //端口号

const server = http.createServer((req, res) => {  //监听到请求后，回调 function   req 请求相关的信息（如：从哪来过来的，类型是get还是post等信息）
    // res 告诉服务器给这个请求响应的内容
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');  // 返回的请求头  200 成功  文本内容Content-Type   是 text/plain
    res.end('Hello World\n');  //返回的内容，改变内容的重启服务 ctrl+c关掉， 再重启 node server.js
});

//listen 监听 来自 127.0.0.1 3000 的请求

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
