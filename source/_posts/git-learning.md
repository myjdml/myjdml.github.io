---
title: Git在前端项目中的一些使用
date: 2020-10-04 17:46:33
categories: 
    - 项目规范
tags: 
    - git
    - 前端
top_img: https://user-gold-cdn.xitu.io/2018/5/16/16369a14ec8704fc?imageslim
cover: https://user-gold-cdn.xitu.io/2018/5/16/16369a14ec8704fc?imageslim
---

## Git链接远程仓库

当我们创建了一个项目的时候。首先我们应该把本地的Git仓库和远端的Git仓库连接起来。  
```shell
$ git remote add origin git@github.com:michaelliao/learngit.git
```
我们可以使用下面的这个命令查看连接的远程仓库
```shell
$ git remote -v
```
接着，我们就可以向远程仓库提交内容了
```shell
$ git push -u origin master
```
> 第一次提交的时候，需要加上`-u`参数，它不仅会把本地的master仓库推送到远程的master仓库，而且会把两者关联起来。这样的话在以后的提交中就可以简化命令，不用携带`-u`参数  

同时，当你连接了远程仓库之后，你就可以随时使用`git pull`来拉取你远程仓库里的代码。

## 一次命令push多个远程仓库

git支持绑定多个push的远程地址，所以我们可以添加多个地址，可以做到一行代码，同时提交到多个仓库。  

使用如下命令：
```shell
$ git remote set-url --add github <你的仓库地址>
```
也可以直接修改配置文件进行添加：
> 打开 .git/config 找到 [remote "github"]，添加对应的 url 即可
```shell
[remote "github"]
    url = https://github.com/zxbetter/test.git
    fetch = +refs/heads/*:refs/remotes/github/*
    url = https://git.oschina.net/zxbetter/test.git
```

## 创建新分支

首先，我们创建dev分支，并且切换到dev分支
```shell
$ git checkout -b dev
```
当然，使用`-b`参数是简化命令，通过下面的两条命令也可以达到一样的效果：
```shell
$ git branch dev
$ git checkout dev
```
然后，你可以使用`git branch`查看当前的分支  
这一切做好之后，我们就可以使用`git checkout <分支名>`在不同的分支之间进行任意的切换

## 合并分支
合并分支非常的简单，只需要一行命令即可
```shell
$ git merge dev
$ # 将dev分支的内容合并到当前分支上
```
但是，这行命令并不是所有时候都会顺利的被执行。如果两个分支的同一文件差异较大，则会产生冲突，这个时候就需要打开产生冲突的文件进行手动的修复。

## commit的一些规范

### 一些常规的commit规范

+ type: commit 的类型
+ feat: 新特性
+ fix: 修改问题
+ refactor: 代码重构
+ docs: 文档修改
+ style: 代码格式修改, 注意不是 css 修改
+ test: 测试用例修改
+ chore: 其他修改, 比如构建流程, 依赖管理.
+ scope: commit 影响的范围, 比如: route, component, utils, build...
+ subject: commit 的概述, 建议符合  50/72 formatting
+ body: commit 具体修改内容, 可以分为多行, 建议符合 50/72 formatting
+ footer: 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.

### Commitizen: 替代你的 git commit

这是一个特别神奇的工具，可以帮助我们实现git commit规范，使用了这个插件，我们就可以使用`git cz`命令来代替`git commit`来提交规范。  

### 全局安装
```shell
npm install -g commitizen cz-conventional-changelog
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
# 全局模式下, 需要 ~/.czrc 配置文件, 为 commitizen 指定 Adapter.
```

### 在项目里安装
```shell
npm install -D commitizen cz-conventional-changelog
```
package.json中的配置
```json
"script": {
    ...,
    "commit": "git-cz",
},
"config": {
    "commitizen": {
        "path": "node_modules/cz-conventional-changelog"
    }
}
```

如果全局安装过 commitizen, 那么在对应的项目中执行 git cz or npm run commit 都可以.

效果如下:  
![img](https://user-gold-cdn.xitu.io/2018/5/16/16369a14ec8704fc?imageslim)

## 杂记

+ 当我们发现每次push的时候都要输入git的帐号和密码时，但我们又不想用ssh连接。这个时候我们就可以尝试去使用这么一行命令
```shell
git config --global credential.helper store
```
> 这行命令产生的作用只有一个，就是在本地全局建立一个文本，在你每次输入帐号和密码的时候记录当前的帐号和密码。这样的话，只需要输入一次帐号和密码，之后push的时候就都不需要输入了！



## Ref

[廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/896043488029600/898732864121440)  
[优雅的提交你的 Git Commit Message](https://juejin.im/post/6844903606815064077)