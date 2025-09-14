---
author: myjdml
pubDatetime: 2024-03-17T18:13:41.816Z
title: Nginx初识
slug: "nginx-first-learning"
featured: false
ogImage: https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/img/nginx-1.jpg
tags:
  - Nginx
  - Blog
  - 部署
description: "This is a post which from Hexo to Astro."
---

## Table of contents

## 起因

其实，笔者之前一直使用的是宝塔面板进行的http服务的建立，刚开始用宝塔的时候，虽然知道这玩意有很大的安全隐患，但它方便啊，就直接一键部署了！

后来，在使用宝塔的过程中，发现了很多使用非常糟心的体验。可能是我个人的问题，除了第一次登录宝塔的时候是没有问题的，后面登陆的时候都异常的缓慢，操作也经常失效。让我真正想去换掉宝塔的时候是一次突然发现站点直接g了。（疑似nginx服务挂了）

干脆，就直接在服务器中部署nginx得了，我也只需要这一个功能（

$$
\begin{aligned}&\mathbf{H}=\sigma(\mathbf{X}\mathbf{W}^{(1)}+\mathbf{b}^{(1)})\\ &\mathbf{O}=\mathbf{H}\mathbf{W}{}^{(2)}+\mathbf{b}{}^{(2)}\end{aligned}
$$

## Nginx简单介绍

`Nginx`是一个高性能的`http`和反向代理服务器，其特点是占用内存小，并发能力强。`Nginx`专为性能优化而开发，性能是其最重要的考量，能经受高负载的考验，有报告表明能支持高达50000个并发连接数。

### 反向代理

正向代理：在浏览器中配置代理服务器，通过代理服务器进行互联网访问。

反向代理：将请求发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据后，再返回给客户端，此时反向代理服务器和目标服务器对外就是一个服务器，暴漏的是代理服务器地址。

### 负载均衡

如果请求数过大，单个服务器解决不了，我们增加服务器的数量，然后将请求分发到各个服务器上，将原先请求集中到单个服务器的情况改为请求分发到多个服务器上，就是负载均衡。

### 安装

`Nginx`需要几个依赖包，分别是`pcre`，`openssl`，`zlib`，在安装`nginx`之前需要先安装这几个依赖。

1. `nginx`官网下载`nginx`，官网地址：[https://nginx.org/download/](https://link.segmentfault.com/?enc=veTtEKk9xhq4N%2FL%2Fbxwcjw%3D%3D.4O2CDVXaOoi1Ztx4DJSAcpY4JJjm%2BFtKPw8Xdz4i9KM%3D)；
2. 将压缩包拖到服务器上;
3. 使用命令`tar -xvf nginx-1.12.2.tar.gz`解压压缩包;
4. 使用命令`./configure`检查；
5. 使用命令`make && make isntall`编译安装；

> 具体安装方式参见[Nginx运维](https://github.com/dunwu/nginx-tutorial/blob/master/docs/nginx-ops.md#linux-%E5%AE%89%E8%A3%85)

**安装成功后，在`usr`会多出来一个文件夹，`local/nginx`，在`nginx`的`sbin`文件夹下有启动脚本。** 根据nginx版本不同目录也不同，我的是`local/webserver/nginx`

### 启动

#### 常见命令

```
nginx               启动Nginx
nginx -s stop       快速关闭Nginx，可能不保存相关信息，并迅速终止web服务。
nginx -s quit       平稳关闭Nginx，保存相关信息，有安排的结束web服务。
nginx -s reload     因改变了Nginx相关配置，需要重新加载配置而重载。
nginx -s reopen     重新打开日志文件。
nginx -c filename   为 Nginx 指定一个配置文件，来代替缺省的。
nginx -t            不运行，仅仅测试配置文件。nginx 将检查配置文件的语法的正确性，并尝试打开配置文件中所引用到的文件。
nginx -v            显示 nginx 的版本。
nginx -V            显示 nginx 的版本，编译器版本和配置参数。
```

#### 简单配置

`nginx`的配置文件在`/usr/local/nginx/conf`中的`nginx.conf`。

```
#user  nobody;
worker_processes  1;

#pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        location / {
            root   html;
            index  index.html index.htm;
        }
    }
}
```

我们需要关注的是http块，静态资源部署使用其中的server就够了，注意，这个是可以配置多个的！

在这里填上站点的相关信息，就可以访问了

## SSL

现在虽然可以访问站点了，但想要https还要配置ssl证书

首先，查看 nginx 是否安装 http_ssl_module 模块。

```shell
/usr/local/nginx/sbin/nginx -V
```

如果出现 configure arguments: –with-http_ssl_module, 则已安装

安装完成后，需要修改一下nginx.config

```
server {
    ........

    # ssl证书地址
    ssl_certificate     /usr/local/nginx/cert/ssl.pem;  # pem文件的路径(也可以是crt文件)
    ssl_certificate_key  /usr/local/nginx/cert/ssl.key; # key文件的路径

    # ssl验证相关配置
    ssl_session_timeout  5m;    #缓存有效期
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;    #加密算法
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;    #安全链接可选的加密协议
    ssl_prefer_server_ciphers on;   #使用服务器端的首选算法

    .........
}
```

到这个时候，其实已经完成了。但我们可以再给它加一个http 重定向 https

```
server {
    listen       80;
    server_name  hack520.com www.hack520.com;
    return 301 https://$server_name$request_uri;
}
```

最后重启nginx，就大功告成了

> 如果各种操作正确的话，https仍然访问失败的话，可以尝试一下执行`netstat -ntulp |grep 443`看看nginx服务是否开启了, nginx重启命令有时会抽风，关了再开就好了

## refs

[Nginx极简教程](https://github.com/dunwu/nginx-tutorial)

[Nginx 安装 SSL 配置 HTTPS 超详细完整全过程](https://segmentfault.com/a/1190000022673232)
