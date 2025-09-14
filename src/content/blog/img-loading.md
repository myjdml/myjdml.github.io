---
author: myjdml
pubDatetime: 2024-03-17T18:13:41.816Z
title: 图片加载的一些说明
slug: "img-loading"
featured: false
tags:
  - js
  - http
  - 兼容性
description: "This is a post which from Hexo to Astro."
---

## Table of contents

## 图片访问403 Forbidden的问题

最近碰到了这么一个问题，一张图片，直接在浏览器里是可以打来的。但是通过`<img />`标签加载就会出现无法访问的情况，并且返回403 Forbidden。于是上网搜索了一下，原来这是由于服务器设置了防盗链的原因。

那么要如何解决呢？目前来说，有两种方法。

### 1.设置`images.weserv.nl`

这个方法的核心原理就是处理原图片的地址，将原图片缓存，然后使用一种不受限制的路径去访问它

> 这是yatessss大佬在vue完成知乎日报web版的解决方案

```js
getImage(url){
	console.log(url);
	// 把现在的图片连接传进来，返回一个不受限制的路径
	if(url !== undefined){
		return url.replace(/^(http)[s]*(\:\/\/)/,'https://images.weserv.nl/?url=');
	}
}
```

把图片路径直接传进去,替换一下原来url的`http/https`。或者直接在图片url前加上`https://images.weserv.nl/?url=`

### 2.使用`no-erferrer`

这个方法的核心原理是从源头入手，解决防盗链问题。

它仅仅需要在index.html的头部添加一个`<meta />`标签。内容如下：

```html
<meta name="referrer" content="no-referrer" />
```

这种方法的原理其实就是阻断事件源的发生。因为我们都知道，图片防盗链的原理是服务端检查头部的referrer字段。原来是浏览器会自动给服务端发送这个请求。如果添加了这行代码的话，那么浏览器就不会发送这个请求。那么服务端自然不能判断出这个请求是否同源。

**但是！！！**

如果你配置了类似于百度统计的功能。那么你就不能使用这个方法。因为像百度统计类似的统计网站是根据`referrer`进行统计的

## ref

- [访问图片出现403的解决办法](https://blog.csdn.net/tiantang_1986/article/details/83748782)
- [解决图片访问403 Forbidden问题](https://juejin.im/post/6844903832040767496)
