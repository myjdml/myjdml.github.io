---
title: hexo简单部署
date: 2020-09-02 12:56:32
categories: 
    - JavaScript
tags: 
    - hexo
---

## 写在前面

hexo是一个十分流行的搭建静态博客的框架，许多软件工程师使用它来搭建自己的博客，今天我就来说一说使用它的心得体会  

首先，一定要去hexo的官方网站去读一读[官方文档](https://hexo.io/zh-cn/docs/)。绝大多数问题都能在这里找到答案

## 基本步骤

### 建立Github库
首先,在你的github上新建一个库，这个库的名称一定要符合命名规范`<YourMame>.github.io`

### 建立本地仓库
建立一个本地文件夹，用来存放你的博客项目，名字随你的喜好

### 安装hexo
```shell
npm install hexo -g #安装  
npm update hexo -g #升级  
```

### 初始化hexo
```shell
hexo init #初始化
hexo generate #生成
hexo server #启动服务预览
```
然后，打开浏览器，在地址栏输入http://localhost:4000/就可以看到一个简单的博客界面了

## 项目的目录结构
```shell
.
├── public //打包后的资源文件
├── scaffolds //基本md配置
├── source //主要存放你要展示的文章，和一些页面的配置
│   ├── _posts // 
│   │   └── img
│   │       └── Fetch
│   ├── about //关于页面
│   ├── categories //分类页面
│   ├── images //主要存放文档中的图片
│   ├── search //搜索控件
│   └── tags //标签页面
├── themes //存放下载的主题
├── _config.yml //配置文件，非常重要！！！具体参见官方文档
├── db.json
├── package-lock.json
├── package.json
└── yarn.lock
```

## 一定要配置的东西
```yml
# 配置和远端仓库的链接
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: git
  repo: https://github.com/myjdml/myjdml.github.io.git
  branch: maste

# 搜索配置文件
search:
  path: search.xml
  field: post
  format: html
  limit: 10000
```

## 向远端仓库提交
1. git初始化
2. 执行`hexo deploy`(若未成功，查看git是否初始化。注意一定要把主题里的`.git`文件夹删了。)

## 主题美化

好了，到现在，一个简单的博客已经搭建完成了。接下来，你会发现一个问题，那就是原生的主题实在是太丑了！！！所以，我们需要下载使用你喜欢的主题

1. 下载主题
```shell
$ git clone https://github.com/Fechin/hexo-theme-diaspora.git themes/diaspora
```

2. 启用主题

启用主题需要修改_config.yml中的一些配置

```yml
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: diaspora # 这里填上你想要使用的主题名
```

然后看一看主题的文档，添加一些自己喜欢的配置就可以了！

## 补充说明

+ 如果使用gitee的pages的话，尽量使用https。http有几率出现页面无法完全部署的情况。
+ 如果发现gitee数据没有更新的情况的话，需要在pages里进行手动更新。