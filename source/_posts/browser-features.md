---
title: 浏览器异闻录
date: 2021-05-27 19:27:14
categories: 
    - 浏览器
tags: 
    - 浏览器
    - 特性
    - V8
description: 本文主要记录一些日常开发的时候碰到的一些无伤大雅却不符合逻辑的，让人忍俊不禁的浏览器特性。如有错漏，还望指正!
top_img: https://images.idgesg.net/images/article/2021/04/chrome-features-100885320-large.jpg
cover: https://images.idgesg.net/images/article/2021/04/chrome-features-100885320-large.jpg
---



> 开这篇文章主要是因为在开发中碰到了一个浏览器相关的比较神奇的特性，虽然无伤大雅，但想着还是要弄清楚。于是就想专门用一篇文章记录一下。之后有什么相关的关于浏览器的特性也会在这篇文章更新。如有错漏，还望指正！

## 点击事件event，人格分裂

最近在调试的时候发现一个问题，事件监听的时候，打印整个event。结果是
```js
{
    currentTarget: null
    defaultPrevented: false
    detail: 1
}
```

发现`currentTarget`这个属性值为空

？？？

满头问号，于是打印`event.currentTarget`发现这个属性是正常的

```html
<div id="target">click me</div>
```

这。。不一致，盲猜是指针的问题。于是面向Google

找到这篇文章 [console log event object shows different object properties than it should have](https://stackoverflow.com/questions/26496176/console-log-event-object-shows-different-object-properties-than-it-should-have)。

总结了一下，大概就是说，在JavaScript控制台中，对于对象的打印实际上只是保存了对对象的引用，在我们点左边的小三角展开的时候浏览器就会去找这个对象展示出来。

所以这里的不一致就好解释了，我们打印的时候`currentTarget`确实是存在的，但是我们点击展开在打印这之间，浏览器因为某些策略，会把这个属性置为`null`，所以，我们在打印`evnet.currentTarget`显示正常，而直接打印`event`展开却显示为`null`。

文中的这个例子非常好的展现了这个特性：

```js
var foo = { };
for (var i = 0; i < 100; i++) {
    foo['longprefix' + i] = i;
}
console.log(foo);
foo.longprefix90 = 'abc';
```



