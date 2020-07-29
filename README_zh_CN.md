# 命令行翻译

[English](README.md)

## 安装
Fork 本项目并 clone 到本地
`git clone <fork 的项目地址>`

安装 [Deno](https://deno.land/)
```
curl -fsSL https://deno.land/x/install/install.sh | sh
```

安装 mpg123 
```bash
sudo apt-get install mpg123
```

可选操作：
- 在 `~/.bashrc` 中增加别名
  ```
  alias fy="<your-path>/cli-dict/run.sh"
  ```

## 使用方法

- 本地直接调用： `./run.sh hello`
- 启动 HTTP 服务： `./start-http-server.sh`

## TODO

- 以 HTTP 服务端的方式运行，并创建 shell 客户端访问服务端取得翻译结果
- 保存单词列表到 MongoDB
- 创建 [Deno](https://deno.land/) 的 Dockerfile, 参考 [aredwood/deno-docker](https://github.com/aredwood/deno-docker/blob/master/Dockerfile)
- 创建 docker-compose 文件，包涵 Deno 和 MongoDB
