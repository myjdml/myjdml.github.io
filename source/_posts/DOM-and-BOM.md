---
title: DOM&BOM课件
date: 2021-05-23 21:35:59
categories: 
    - JavaScript
tags: 
    - DOM
    - BOM
    - prototype
    - js
top_img: https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/DOM1.jpg
cover: https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/DOM1.jpg
---

## js的补充——原型与原型链⛓

相信大家一定尝试过使用class定义类，使用new创建对象了吧！这其实就是ES6的语法糖。虽然这种写法非常的舒服，并且和其他高级语言（例如jvav）的语法十分类似，但是它的内部其实是用原型链实现的，这一点和一些其他语言是不一样的

### 什么是原型

原型既指构造函数的prototype属性指向的对象

这句话一听，相信很多同学都会一脸懵逼。没关系，看下面这张图

![proto5](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/proto5.jpg)

这张图很好的描述了一个原型链，等我们讲完之后再回过头来看，可以帮助我们更好的理解原型链

### 构造函数——Constructor

为了更清楚的理解原型，我们首先创建一个构造函数

```js
function Person(){}
```

### 原型——prototype

原型实际上指的就是一个对象。这个对象可以被实例所继承。我们可以在原型上定义一些属性和方法，这样的话，通过继承，实例也可以拥有这些属性和方法。（继承这个行为是在new中实现的）

对于什么是实例，我们放到下一点来说，让我们先来聊聊原型和构造函数

原型和构造函数的关系就是，构造函数内部有一个名为prototype的属性，通过这个属性是可以访问到原型对象的！

![code1](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/code1.jpg)

我们可以看到，在这里，Person就是构造函数。Person.prototype就是原型

![proto1](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/proto1.jpg)

### 实例——instance

还记得我们刚刚提到过的实例吗，现在我们就来详细的说一说

我们之前创建了一个Person构造函数，那么现在，我们就可以使用new操作符来创建构造函数

![proto2](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/proto2.jpg)

![code2](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/code2.jpg)

我们可以使用instanceof来检查myPerson是否是Person的实例

现在，我们来做点不一样的，我们可以使用prototype，在构造函数上添加一个属性

![code3](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/code3.jpg)

我们可以看到，我们在Person的原型上添加了一个属性后，实例上也继承了这个属性

### 隐式原型——proto

实际上，通过实例，我们依然可以访问到原型

这里，我们就要使用一个属性——`__proto__`(它本质上是一个内部属性，不是一个对外正式开放的API，由于浏览器的广泛支持才加入了ES6)

![proto3](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/proto2.jpg)

这里，我们分别通过构造函数的`prototype`属性和实例的`__proto__`属性来访问原型，事实证明，用这两种方法都是可以访问到原型对象的

![code4](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/code4.jpg)

### 构造函数——constructor

前面我们说过了，构造函数可以通过prototype来访问原型，那么原型能否通过某种方法来访问构造函数呢？

答案当然是可以的！！
这就是constructor

![code5](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/code5.jpg)

通过上面的代码，我们可以清楚的发现，Person的原型的constructor指向的就是Person本身

![proto4](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/proto4.jpg)

> Tip: 这里需要注意的一点是，constructor是原型的一个属性。Constructor指的才是构造函数。这个一定要弄清楚，不要弄混了！

### 实例，构造函数和原型之间的关系

前面基本上已经基本吧原型相关的知识点讲的7788了，大家没弄懂的话可以课下多看看课件，或者翻阅相关的资料。

接下来我们要讲的是实例，构造函数和原型之间的关系

之前我们说过，实例可以访问到原型对象，而原型对象可以访问到构造函数。之前，我们在实例中是无法访问构造函数的。而现在，我们可以通过原型对象为跳板，就可以实现这个操作

![code6](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/code6.jpg)

不知道大家有没有发现，在之前的代码中，我们在构造函数的原型中添加了type属性，其值为'name is Person'。而我们通过构造函数生成的实例是有type这个属性的。这是因为当我们实例的一个属性是，如果没有找到这个属性，就会追着`__proto__`到指定的原型上去找，如果还是找不到就到原型的原型上去找

![code7](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/code7.jpg)

在上面的代码中，我们尝试去寻找myPerson自身的属性，结果却并不理想。但是当我们尝试去打印myPerson.type是，却没有返回undefined。这就是上面说的遍历原型，因为我们在之前在构造函数中定义过这个属性，所以我们访问实例的type属性并没有返回undefined。

如果这个比较难理解，没关系，我们稍微改一下代码

![code8](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/code8.jpg)

这里，我们改动的地方其实只有一行，我们在new完实例之后立马就给实例添加的type属性。所以，我们查找myPrson的属性是我们可以找到type，并且我们访问myPerson.type的时候也是直接访问的实例上的属性

### 原型链

讲了这么久了，终于要讲到原型链了！

其实，有了前面的这些知识铺垫，原型链这个概念其实并不难理解。原型链就是一连串的对象，我们通过`__proto__`将其连接起来，形成了一个可以互相访问的关系。

原型可以通过 `__proto__` 访问到原型的原型，比方说这里有个构造函数 Person 然后“继承”前者的有一个构造函数 People，然后 new People 得到实例 p

当访问 p 中的一个非自有属性的时候，就会通过 `__proto__` 作为桥梁连接起来的一系列原型、原型的原型、原型的原型的原型直到 Object 构造函数为止。

这个搜索的过程形成的链状关系就是原型链

下面让我们来做一些演示

![code9](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/code9.jpg)

图例：

![proto5](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/proto5.jpg)

原型链搜索：

![code10](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/code10.jpg)

## 前言

一个完整的 JavaScript 实现应该由下列三个不同的部分组成 ：

+ ECMAScript 核心：为不同的宿主环境提供核心的脚本能力；
+ **DOM（文档对象模型）**：规定了访问HTML 和XML 的应用程序接口；
+ **BOM（浏览器对象模型）**：提供了独立于内容而在浏览器窗口之间进行交互的对象和方法。



ECMA-262 标准规定了这门语言的下列组成部分： 语法 类型  语句  关键字 保留字  操作符  对象

## DOM

### 概述

究竟什么是DOM呢？简单的来说，DOM是一套对文档内容进行抽象和概念化的方法。

#### 举个🌰

当有人在向我们问路的时候，我们会这样告诉他，你要找的地方就在这条街前面直走左边第三栋房子。这样的话只要那个问路的人对左边和第三个的认知和我一样，那么他就能清楚的知道他要找的房子在哪里。

而浏览器网页其实也是一样的，因为JavaScript预先定义了image和forms等术语，于是，我们通过这些规则，可以精准的指定到网页中的某个元素，例如：

```js
document.images[2]
document.forms['detail']
```

我们把这种查找文档元素的操作叫做DOM操作

#### 定义

文档对象模型，是document object model的简称。它时针对HTML和XML文档的一个API（应用程序编程接口）描绘了一个层次化的节点树，允许开发人员添加，移除和修改页面的某一部分

### DOM的层次

#### 文档：DOM中的D

在文档对象模型中，最重要的莫过于是document（文档）了。当我们创建了一个网页并且把它加载到浏览器中，浏览器就会把你写的代码转换为一个文档对象。

#### 对象：DOM中的O

我们知道，对象是一种自足的数据集合。与特定对象相关联的变量称为这个对象的属性，只有特定对象才能调用的函数称为这个对象的方法。

在JavaScript中，对象可以分为三种类型

+ 用户自定义对象：由代码编写人员自行创建的对象
+ 内建对象： JavaScript的内部对象，如Array, Math
+ 宿主对象：由浏览器提供的对象

这里我们主要研究的是第三个——宿主对象

宿主对象中，最早出现的是BOM，也就是我们后面要说的浏览器对象模型，这个我们放到后面再说。

现在我们主要聊的是DOM

#### 模型：DOM中的M

DOM中的M代表着模型。既然是模型，那么它就代表着他不是真实的事物，但是它却有所有它代表的真实事物的所有特点。浏览器把网页呈现出来，让我们可以看到，同时，它也生成了一个模型页面里的元素，在这个模型里都可以找到，并且，我们可以对其进行操作。

DOM会把文档解析成一棵树，更确切的说，它把文档解析成了一个家谱树。在家族成员里，有父、子、兄弟等关系。这种树形结构可以很好的把一些比较复杂的关系直观的表示出来。

请看下面这个简单的网页

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DOM</title>
</head>
<body>
  <h1>购物清单</h1>
  <p>必须要购买的东西</p>
  <ul>
    <li>牛奶</li>
    <li>面包</li>
    <li>xxjj的应援牌</li>
  </ul>
</body>
</html>
```

效果如下：

![browser](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/browser1.jpg)

这份文档我们可以用下面的模型来表示

![DOM1](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/DOM1.jpg)

这就是有上面这个网页的代码解析出来的DOM树，比起用家谱树来描述，我觉得用节点树来描述其实更加的合适。

根元素的是`<html>`，它有`<head>`和`<body>`两个元素。其中`<body>`中有三个子元素分别是`<h1>`、`<p>`和`<ul>`。继续往下，我们会发现。`<ul>`还有三个子元素`<li>`。

通过这个节点树，我们可以清楚的知道页面上元素之间的关系。

### 节点

节点是一个网络术语，它表示的是网络的一个连接点。网络就是由一些节点构成的集合。

在DOM中，一个又一个的节点构成了整个文档

DOM的节点分为很多类型，我们目前主要需要掌握的有三种：元素节点、文本节点和属性节点。

#### 元素节点

元素节点就相当于document的原子，它构成了网页的基本骨架。标签的名字就是元素的名字。元素节点里面还可以包含节点，也就是说，它可以拥有子节点。在一个网页中，唯一没有被包含的是元素是<html>元素

#### 文本节点

元素节点只是所有节点的一种，如果一个网页只有元素节点是肯定不行的。这样网页什么内容都没有，实际上在网页中，内容是占了绝大部分的。就像上面的那个购物清单的网页，<p>元素里所包含的内容就是文本"必须要购买的东西“。它就是一个文本节点。

文本节点总是包含在元素节点的内部的，用来丰富网页的内容，但是，并非是所有的元素节点都包含有文本节点

#### 属性节点

属性节点是对一个元素进行更具体的描述，就像这样

```html
<li title="xxjj yyds">xxjj的应援牌</li>
```

这里的`title="xxjj yyds"`就是一个属性节点。我们可以看到，属性节点是放在起始标签里面的。所以，属性节点是被包含在元素节点中的。也就是说，所有的属性都被元素包含，但是并非所有的元素节点都包含着属性节点。

### 操作节点——增删改查

#### 获取节点 🚙

- **通过节点关系**

| 要求                                      | 操作                                                | 备注                 |
| ----------------------------------------- | --------------------------------------------------- | -------------------- |
| 获取一个元素节点的第一个子节点/元素节点   | 元素节点对象.firstChild/firstElementChild           |                      |
| 获取一个元素节点的最后一个子节点/元素节点 | 元素节点对象.lastChild/lastElementChild             |                      |
| 获取一个元素节点的下一个节点对象/元素对象 | 元素节点对象.nextSibling/nextElementSibling         |                      |
| 获取一个元素节点的上一个节点对象/元素对象 | 元素节点对象.previousSibling/previousElementSibling |                      |
| 获取一个元素节点的父节点                  | 元素节点对象.parentNode                             |                      |
| 获取一个元素节点的所有子节点              | 元素节点对象.childNodes/children                    | 获取到的是一个类数组 |

- **元素ID**💎

`getElementById`方法是document对象特有的函数，传入一个参数即元素的id属性值，将返回一个对象。

```
<div id="title">Hi<div>

document.getElementById('title')
```

- **标签名字**🥊

`getElementsByTagName`方法会返回一个类数组对象，每个对象数组分别对应着文档里有着给定标签里的一个元素。类似于ge tElementById，这个方法也是只有一个参数的函数，它的参数是标签名。

```
<ul>       
    <li>1</li>        
    <li>2</li>        
    <li>3</li>
</ul>
document.getElementsByTagName('li')
```

- **类名**🎩

`getElementsByClassName`方法让我们能够通过class类名来访问元素。它的返回值和getElementsByTagName类似，都是返回一个类数组对象

```
<p class="red">Hi</p>
<div class="red">Hi</div>

document.getElementsByClassName('red')
```

- **css选择器**🔔

html5中新增的两个方法，参数则都为CSS选择器字符串

`querySelector`方法返回单个节点，如果有多个匹配元素就只返回第一个，如果找不到匹配就返回null。

`querySelectorAll`方法返回一个类数组对象

```
<div id="title">Hi<div>    
document.querySelector('#title')

<ul>    
    <li>1</li>    
    <li>2</li>    
    <li>3</li>
</ul>    
document.querySelector('li')

<p class="red">Hi</p>
<div class="red">Hi</div>    
document.querySelector('.red')
```

#### 增加 🚗

- `Document.createElement()`创建一个元素节点
  `Document.createElement()`方法创建由tagName指定的HTML元素，或一个[`HTMLUnknownElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLUnknownElement)，如果tagName不被识别。

- `document.createTextNode()`创建一个文本节点

- `appendChild()`  向节点的子节点列表的末尾添加新的子节点。

- `insertBefore()` 节点任意位置插入

#### 删除  🚓

- `parentNode.removeChild ()`从父节点下删除节点,返回删除节点
  被移除的这个子节点仍然存在于内存中,只是没有添加到当前文档的DOM树中,因此,你还可以把这个节点重新添加回文档中 。如果不保存引用则在短时间内会被内存管理回收

#### 修改 🚕

- 替换节点 ：`replaceChild(插入的节点，被替换的节点)`这个方法接收两个参数，一个是插入的节点，一个是用于替换的节点，返回的是被替换的节点

- 替换内容：  `innerHTML`/`innerText`属性。

### 事件🧤

事件就是用户或浏览器自身执行的某种动作。诸如 click 、 load 和 mouseover ，都是事件的名字。
而响应某个事件的函数就叫做事件处理程序（或事件侦听器）。事件处理程序的名字以 "on" 开头，因此
click 事件的事件处理程序就是 onclick ， load 事件的事件处理程序就是 onload

|             常见的事件             |                                                              |
| :--------------------------------: | :----------------------------------------------------------: |
|               click                |                           点击事件                           |
|             mouseover              | 鼠标指针位于一个元素外部，然后用户将首次移动到另一个元素边界之内时触发 |
|             mouseleave             |           元素上方的光标移动到元素范围之外时触发。           |
|               focus                |                    在元素获得焦点时触发。                    |
|                blur                |                    在元素失去焦点时触发。                    |
| UI（User Interface，用户界面）事件 |      当用户与页面上的元素交互时触发(load ,unload,error)      |
|              滚轮事件              |             当使用鼠标滚轮（或类似设备）时触发；             |
|              键盘事件              |                     当键盘输入的时候触发                     |

**事件有 DOM0级  DOM2级 DOM3级**

#### DOM 事件模型

**DOM 0级事件模型**：将一个函数赋值给一个事件处理程序属性

- HTML中直接绑定

```html
<button id="button" onclick="handleClick()">ClickMe</button>
<script>    
function handleClick () 
  {       
    let button = document.getElementById("button");         
    button.innerHTML = "hello!"    
  }
</script>
```

- JS指定属性值

```js
let button = document.getElementById("button");
button.onclick = function() {}
```

- 删除事件处理程序

```js
button.onclick = null
```

从技术上来说，W3C的DOM标准并不支持上述最原始的添加事件监听函数的方式，这些都是在DOM标准形成前的事件模型。尽管没有正式的W3C标准，但这种事件模型仍然得到广泛应用，这就是我们通常所说的0级DOM。

**DOM 2级事件模型**

DOM1级于1998年10月1日成为W3C推荐标准。

1级DOM标准中并没有定义事件相关的内容，所以没有所谓的1级DOM事件模型。

DOM2级事件定义了两个方法，用于处理指定和删除事件处理程序的操作： addEventListener()
和 removeEventListener() 。所有DOM节点中都包含这两个方法，并且它们都接受 3 个参数：要处
理的事件名、作为事件处理程序的函数和一个布尔值。最后这个布尔值参数如果是 true ，表示在捕获
阶段调用事件处理程序；如果是 false ，表示在冒泡阶段调用事件处理程序。

（事件冒泡在之后讲）

```js
let button = document.getElementById("button");
let click = function (){ ... }
button.addEventListener('click', click, false)
button.removeEventListener('click', click, false)
```

**DOM 0级和DOM 2级事件模型比较**

- 移除监听函数

  ```js
  button.onclick = null
  
  button.removeEventListener('click', click) //注意，addEventListener()添加的匿名函数无法移除
  button.removeEventListener('click', function () {}) //这样移除监听函数的方法是错误的！！
  ```

- 同时绑定多个监听器

  ```html
  <button id="button">ClickMe</button>
  
  <script>        
    let button = document.querySelector('#button');
  
    button.onclick = function () { console.log(1) }        
    button.onclick = function () { console.log(2) }    
  
    button.addEventListener('click', function () { console.log(3) }, false)         
    button.addEventListener('click', function () { console.log(4) }, false)
  </script>
  ```

可见DOM0 级后绑定的函数会把前边的替换掉，而DOM 2级可以同时绑定多个监听器，因此推荐使用addEventListener方法监听事件。

**事件对象** 👩🧑

指定事件处理程序具有一些独到之处。首先，这样会创建一个封装着元素属性值的函数。这个
函数中有一个局部变量 event ，也就是**事件对象**。

触发DOM上的事件后，会产生一个事件对象event，作为参数传给监听函数。

通过 event 变量，可以直接访问事件对象，你不用自己定义它，也不用从函数的参数列表中读取。
在这个函数内部， this 值等于事件的目标元素。

- 事件对象常用属性

- - target 事件的目标

- - type 被触发的事件的类型

- 事件对象常用方法

- - preventDefault() 取消事件的默认行为

- - stopPropagation() 阻止事件继续传播（冒泡和捕获），不包括在当前节点上其他的事件监听函数。

- - stopImmediatePropagation() 阻止所有事件继续传播，包括在当前节点上其他的事件监听函数。return false 相当于同时执行了 event.preventDefault 与 event.stopPropagation

了解更多事件对象的属性和方法 [事件对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)

尝试一下实现页面内点击弹窗外部关闭弹窗，点击弹窗内部不会关闭弹窗。

```html
<html>

<body>
    <div id="pop-up-window"></div>
</body>

<script>
    let body = document.querySelector('body');
    let popUpWindow = document.getElementById('pop-up-window');
    body.addEventListener('click', function (e) {
        popUpWindow.style.display = 'none'
    }, false)
    popUpWindow.addEventListener('click', function (e) {
        e.stopPropagation() //在弹窗内部点击时阻止事件传播，因此不会触发body的click事件    
    }, false)
</script>

</html>
```

#### 事件冒泡和事件捕获

❓ 下面的代码当中一个div元素当中有一个p子元素，如果两个元素都有一个click的处理函数，那么我们怎么才能知道哪一个函数会首先被触发呢？

```html
<div id="outer">
    <p id="inner">Click me!</p>
</div>
```

为了解决这个问题微软和网景提出了两种几乎完全相反的概念。

🙃在过去糟糕的日子里，浏览器的兼容性比现在要小得多，Netscape（网景）只使用事件捕获，而Internet Explorer只使用事件冒泡。当W3C决定尝试规范这些行为并达成共识时，他们最终得到了包括这两种情况（捕捉和冒泡）的系统，最终被应用在现在浏览器里。

**事件捕获和冒泡是现代浏览器的执行事件的两个不同阶段**

![5.2.jpeg](https://cdn.nlark.com/yuque/0/2019/jpeg/358252/1573824698657-f19c612f-37ac-4917-9093-04bb3567f0c3.jpeg)

微软提出了名为**事件冒泡**(event bubbling)的事件流。事件冒泡可以形象地比喻为把一颗石头投入水中，泡泡会一直从水底冒出水面。也就是说，事件会从最内层的元素开始发生，一直向上传播，直到document对象。

因此上面的例子在事件冒泡的概念下发生click事件的顺序应该是**p -> div -> body -> html -> document**

网景提出另一种事件流名为**事件捕获**(event capturing)。与事件冒泡相反，事件会从最外层开始发生，直到最具体的元素。

上面的例子在事件捕获的概念下发生click事件的顺序应该是**document -> html -> body -> div -> p**

```html
<div class="father">
        father
        <div class="child">
            child
        </div>
 </div>
    
 <script>
    let father = document.querySelector('.father')
    let child = document.querySelector('.child')
    
    //事件捕获
    // father.addEventListener('click', () => { alert('father') }, true)
    // child.addEventListener('click', () => { alert('child') }, true)

   // father.addEventListener('click', () => { alert('father') }, false)   
   // child.addEventListener('click', () => { alert('child') }, false)
    
</script>
```

**事件委托**🍑

对“事件处理程序过多”问题的解决方案就是事件委托。**事件委托利用了事件冒泡**，只指定一个事
件处理程序，就可以管理某一类型的所有事件。例如， click 事件会一直冒泡到 document 层次。也就
是说，我们可以为整个页面指定一个 onclick 事件处理程序，而不必给每个可单击的元素分别添加事
件处理程序。

- 在页面中设置事件处理程序所需的时间更少。只添加一个事件处理程序所需的 DOM引用更少，
  所花的时间也更少。

- 整个页面占用的内存空间更少，能够提升整体性能。
  最适合采用事件委托技术的事件包括 click 、 mousedown 、 mouseup 、 keydown 、 keyup 和 keypress

```html
<ul id="color-list">
    <li>red</li>
    <li>yellow</li>
    <li>blue</li>
    <li>green</li>
    <li>black</li>
    <li>white</li>
</ul>

<script>
(function(){
    var color_list = document.getElementById('color-list');
    var colors = color_list.getElementsByTagName('li');
    for(var i=0;i<colors.length;i++){                          colors[i].addEventListener('click',showColor,false);
    };
    function showColor(e){
        var x = e.target;
        alert("The color is " + x.innerHTML);
    };
})();

(function(){
    var color_list = document.getElementById('color-list');
    color_list.addEventListener('click',showColor,false);
    function showColor(e){
        var x = e.target;
        if(x.nodeName.toLowerCase() === 'li'){
            alert('The color is ' + x.innerHTML);
        }
    }
})();
</script>

```

## BOM

上面我们已经聊了DOM，现在我们再来说一说BOM。BOM这个概念在前面也提到过，BOM的B指的是browser，BOM的全称是browser object model

> **浏览器对象模型**(BOM)指的是由[Web浏览器](https://zh.wikipedia.org/wiki/Web浏览器)暴露的所有对象组成的表示模型。BOM与[DOM](https://zh.wikipedia.org/wiki/文档对象模型)不同，其既没有标准的实现，也没有严格的定义, 所以浏览器厂商可以自由地实现BOM。	——维基百科

我们说了BOM是由一些基本的对象构成的，那么究竟是哪些对象呢，下面我们来看一下BOM的基本对象

![](https://user-gold-cdn.xitu.io/2019/12/7/16edf3f9f4713339?imageslim)



上面可以看到BOM的六大对象为：

1. document  ： DOM
2. event     : 事件对象
3. history   : 浏览器的历史记录
4. location  : 窗口的url  地址栏的信息
5. screen    : 显示设备的信息
6. navigator : 浏览器的配置信息

在学习BOM对象之前，让我们来对比一下DOM与BOM

|            DOM             |                          BOM                           |
| :------------------------: | :----------------------------------------------------: |
|        文档对象模型        |                     浏览器对象模型                     |
|     顶级对象是document     |                    顶级对象是window                    |
| 可以用来操作html页面的元素 |                用来和浏览器之间进行交互                |
|     标准化是w3c来制定      | 是由各浏览器厂商在各自浏览器上定义，没有一个统一的标准 |

### BOM的顶级对象window对象的常用方法

#### 弹窗输入

```js
let result = window.prompt(text, value);
```

- `result` 用来存储用户输入文字的字符串，或者是 null。
- `text` 用来提示用户输入文字的字符串，如果没有任何提示内容，该参数可以省略不写。
- `value` 文本输入框中的默认值，该参数也可以省略不写。不过在 Internet Explorer 7 和 8 中，省略该参数会导致输入框中显示默认值"undefined"。

例：

```js
let res = prompt('你的名字是', 'xxjj')
```

![BOM1](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/BOM1.jpg)

#### 弹窗输出

```js
alert(value)
```

例：

```js
alert(`我的名字是${res}`)
```

![BOM2](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/BOM2.jpg)

#### 定时器⏰（非常重要！！！

`setTimeout(函数，时间)`只执行一次 , 返回一个 ID（数字），可以将这个ID传递给 `clearTimeout()` 来取消执行。

```js
setTimeout(function(){ alert("Hello"); }, 3000);
```

`setInterval(函数，时间)`无限执行

```js
setInterval(function(){ alert("Hello"); }, 3000);
```

`clearTimeout(定时器名称)`清除定时器

#### 其它

1. confirm("");带确定、取消的提示框，分别返回true、false
2. close();关闭当前浏览器窗口。
3. open();打开一个新窗口
   参数一：新窗口的地址
   参数二：新窗口的名字
   参数三：新窗口的各种配置属性

### histroy对象

1. length; 查看浏览器的历史访问的网页的个数；
2. back(); 加载history列表中的前一个url
3. forward();加载history列表中的下一个url
4. go(); 加载history列表中的某个具体页面
5. go(0);相当于刷新页面

### location对象

里面封装当前窗口打开的url

```js
location
location.href // 完整的URL路径
location.protocol // 协议名            
location.hostname // 主机名
location.port // 端口号
location.host // 主机名+端口号        
location.pathname // 文件路径
location.search // 从？开始的参数部分
location.hash // 从#开始的锚点部分
```

### screen对象

显示设备的信息

1. screen.height;屏幕的像素高度
2. screen.width;屏幕的像素宽度
3. screen.availHeight;屏幕的像素高度减去系统部件高度之后的值(只读)
4. screen.availWidth;屏幕的像素宽度减去系统部件宽度之后的值(只读)
5. screen.availLeft;未被系统部件占用的最左侧的像素值(只读)[chrome和firefox返回0，IE不支持]
6. screen.availTop;未被系统部件占用的最上方的像素值(只读)[chrome和firefox返回0，IE不支持]

### navigator对象

  提供了与浏览器有关的信息

1. navigator.appCodeName;浏览器的代码名。
2. navigator.appName;完整的浏览器名称。
3. navigator.appVersion;浏览器的平台和版本信息。
4. navigator.userAgent;包含浏览器的名称、内核、版本号等。
5. navigator.plugins;检测有无插件。
6. navigator.onLine;表示是否连接到了因特网。

## 关于浏览器宽高尺寸的获取

### 窗口位置

用来确定和修改 window 对象位置的属性和方法有很多。IE、Safari、Opera 和 Chrome 都提供了
`screenLeft`和 `screenTop` 属性，分别用于表示窗口相对于屏幕左边和上边的位置。

### 窗口大小

跨浏览器确定一个窗口的大小不是一件简单的事。IE9+、Firefox、Safari、Opera 和 Chrome 均为此提
供了 4个属性： `innerWidth` 、 `innerHeight` 、 `outerWidth` 和 `outerHeight` 。

### 滚动距离

+ `window.screenTop`

![](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fdeveloper.mozilla.org%2F%40api%2Fdeki%2Ffiles%2F842%2F%3DScrollTop.png&sign=b875b90bbc079fd402de167891a9d3c515093a62d673a42fbaa7d30111b8688b)

+ `window.screenLeft`

### document相关宽高介绍📑

**与client相关的宽高**

可视区指的是浏览器减去上面菜单栏，下面状态栏和任务栏，右边滚动条（如果有的话）后的中间网页内容的单页面积大小。

与client相关的宽高又有如下几个属性：

- `document.body.clientWidth`

- `document.body.clientHeight`

- 假入无padding无滚动条，`clientWidth=style.width`

- 假如有padding无滚动轴，`clientWidth`=`style.width`+`style.padding*2`

- 假如有padding有滚动，且滚动是显示的，`clientWidth`=`style.width`+`style.padding*2`滚动轴宽度

**与offset相关宽高介绍**

- `document.body.offsetWidth` =`clientWidth+border`

- `document.body.offsetHeight` =`clientHeight+border`

- `offsetLeft`/ `offsetTop` (可控制元素移动)

- 以`offsetLeft`为例进行说明，在不同的浏览器中其值不同，且与父元素的position属性（relative,absolute,fixed）有关

- - 在父元素均不设置position属性时，在Chrome，opera和IE浏览器中`offsetLeft`是元素边框外侧到浏览器窗口内侧的距离 且`body.offsetLeft`=0

- - 当父元素设置position元素时又分为两种情况

  - - 如果父元素是body且body设置了position属性，在Chrome和opera浏览器中`offsetLeft`是元素边框外侧到body边框外侧的距离 
    - 如果父元素不是body元素且设置了position属性时，`offsetLeft`为元素边框外侧到父元素边框内测的距离

## 作业

+ Lv1: 下面这段代码，有些字被遮起来了。要求: 在这个页面的最下方添加一个按钮，点击让这些字显示出来，再点击再次被遮挡。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    span {
      background-color: black;
    }
  </style>
</head>
<body>
  <div>
    <p>刚才有个朋友问我：<span>英</span>老师，发生甚么事了？</p>
    <p>给我发来两张截图，</p>
    <p>我一看！噢，原来是昨晚有个年轻人，<span>5nm</span>的，说能不能教教我<span>挤牙膏大法</span>。</p>
    <p>我说可以，我说你用<span>Arm</span>的死劲不好用，他不服气。</p>
    <p>我说小朋友你<span>两个核贵不过我一个核</span>，他说你这也没用，我说我这个有用。</p>
    <p>这是化劲，传统<span>摩尔定律</span>是讲化劲的，四两八千金，200多核的<span>英国大伟达</span>都干不过我一个核。</p>
    <p>他说要和我试试，我说可以。</p>
    <p>我一说，他啪就做出来了，很快啊。</p>
    <p>然后上来就是一个<span>4x CPU</span>，一个<span>6x GPU</span>，一个<span>15x ML</span>！</p>
    <p>我全部防出去了，防出去以后自然是传统<span>挤牙膏</span>宜点到为止，右拳指着<span>软件兼容</span>，没打他。</p>
    <p>因为这时间按传统他已经输了，他也承认我先打到他要害。我收拳的时间不打了，他突然袭击<span>“不涨价”</span>来打我脸。</p>
    <p>我大E了啊，没有闪。</p>
    <p>两分多钟以后，当时流眼泪了，捂着眼我就停停。</p>
    <p>我说小<span>Apple</span>你不讲<span>摩尔定律</span>。他忙说对不起，不懂规矩啊，他说他是乱打的。</p>
    <p>他可不是乱打的，<span>CPU GPU</span>训练有素，后来他说在<span>手机</span>上练过十几年<span>芯片</span>，看来是有备而来。</p>
    <p>这个<span>Apple</span>，不讲武德。来，骗！来，偷袭！我这个<span>14nm+++</span>的老同志。</p>
    <p>这好吗？这不好。我劝这个<span>Apple</span>，耗子尾汁，好好反思，以后不要再犯这样的聪明，小聪明。</p>
    <p><span>IT界</span>要以核为贵，要讲<span>摩尔定律</span>，不要搞窝里斗！</p>
    <p>谢谢朋友们！</p>
    <p></p>
  </div>
</body>
</html>
```

![homework](https://image-cloud-1303857647.cos.ap-chengdu.myqcloud.com/%E7%AC%94%E8%AE%B0/2020%E7%BA%A2%E5%B2%A9Web%E5%89%8D%E7%AB%AF%E8%AF%BE%E4%BB%B6/%E7%AC%AC%E4%BA%94%E6%AC%A1%E8%AF%BE%E5%9B%BE%E7%89%87/homework.jpg)

+ Lv2:  自己构建一个简单页面 ，实现一下几个按钮功能

- - 主题颜色更改按钮： 点击后，可以更改页面主题颜色

- - 字体大小更改按钮：点击后，可以更改字体大小（最少三个大小）

+ Lv3:  对于下列列表：

  + 实现点击不同的 `li`  能打印出所对应的内容（通过事件委托）
  + 通过 `js`  设置 单数`li`样式为红色 , 双数 `li`为绿色

+ Lv4:  实现一个留言板

  要求： 在评论区输入留言 ，点击发送后，在留言板中能够插入新的留言 

## Ref

[理解：javascript中DOM0,DOM2,DOM3级事件模型](https://juejin.im/post/6844903853956022285)

[原生DOM入门](https://juejin.im/post/6844903545414615048)

[JS之BOM详解](https://juejin.im/post/6844904015646441485)


