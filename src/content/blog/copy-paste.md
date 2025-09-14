---
author: myjdml
pubDatetime: 2024-03-17T18:13:41.816Z
title: Copy&Paste
slug: "copy-paste"
featured: false
ogImage: https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/191494cb93f849c888bed5423191e3d5~tplv-k3u1fbpfcp-watermark.awebp
tags:
  - 源码
  - 前端
  - 浏览器
description: "This is a post which from Hexo to Astro."
---

## Table of contents

## 前言

最近在掘金上看到这样一篇文章 [这个 29.7 K 的剪贴板 JS 库有点东西！](https://juejin.cn/post/6906635620752293902#heading-4)

文中说的clipboard剪切板库引起了我的兴趣，借这个机会刚好研究一下，浏览器有关剪切版的实现

话不多说，我们先来分析一下clipblard.js的源码

## clipblard.js源码分析

首先，这个项目里使用了两个第三方库——[tiny-emitter](https://github.com/scottcorgan/tiny-emitter)和[good-listener](https://github.com/zenorocha/good-listener)。分别用于事件监听和事件。关于这两个库的具体用法，本文就不赘述了。详细使用可以去GitHub查看。

### 简单使用

```html
<body>
  <!-- 1. Define some markup -->
  <input id="foo" type="text" value="hello" />
  <button class="btn" data-clipboard-action="copy" data-clipboard-target="#foo">
    Copy
  </button>

  <!-- 2. Include library -->
  <script src="../dist/clipboard.min.js"></script>

  <!-- 3. Instantiate clipboard -->
  <script>
    var clipboard = new ClipboardJS(".btn");

    clipboard.on("success", function (e) {
      console.log(e);
    });

    clipboard.on("error", function (e) {
      console.log(e);
    });
  </script>
</body>
```

上述代码是对clipboard的一个简单使用。首先，我们需要获取需要获取到需要复制的区域。上面的这个例子是通过自定义属性`data-clipboard-action`规定操作类型（复制、粘贴）, `data-clipboard-target`规定选择区域。我们也要可以把这个操作放在JavaScript里面来做

```html
<body>
  <!-- 1. Define some markup -->
  <button class="btn">Copy</button>
  <div>hello</div>

  <!-- 2. Include library -->
  <script src="../dist/clipboard.min.js"></script>

  <!-- 3. Instantiate clipboard -->
  <script>
    var clipboard = new ClipboardJS(".btn", {
      target: function () {
        return document.querySelector("div");
      },
    });

    clipboard.on("success", function (e) {
      console.log(e);
    });

    clipboard.on("error", function (e) {
      console.log(e);
    });
  </script>
</body>
```

### 构造函数

我们在使用clipboard之前，首先需要创建一个clipboard对象

```js
var clipboard = new ClipboardJS(".btn");
```

我们就先从这里入手，来看一看

`Clipboards`类定义在了根目录的clipboard.js里。

```js
constructor(trigger, options) {
    super();

    this.resolveOptions(options);
    this.listenClick(trigger);
}
```

在构造函数里，trigger是必填参数。它可选的参数类型是`String|HTMLElement|HTMLCollection|NodeList`, 一般我们输入的都是String，通过类选择器选择到相应的标签。

我们先看`this.listenClick()`方法

```js
listenClick(trigger) {
	this.listener = listen(trigger, 'click', (e) => this.onClick(e));
}
```

这里把传入的trigger通过`good-listenr`进行监听，当其触发点击事件的时候会触发`onClick`方法。

接下来我们先来说说构造函数里的另一个参数和方法，options是一个可选参数，其中有 四个属性：action, target, text, text, container。如果创建对象的时候未定义，那么，clipboard会默认使用默认预设。

`this.resolveOptions()`做的就是这件事情：

```js
resolveOptions(options = {}) {
    // 判断action是否存在且为function，不存在则使用默认预设
    this.action =
        typeof options.action === 'function'
        ? options.action
    	: this.defaultAction;
    // 判断target是否存在且为function，不存在则使用默认预设
    this.target =
        typeof options.target === 'function'
        ? options.target
    	: this.defaultTarget;
    // 判断text是否存在且为function，不存在则使用默认预设
    this.text =
        typeof options.text === 'function' ? options.text : this.defaultText;
    // 判断焦点元素是否传入，如果未传入吧的话默认使用document.body为焦点元素。
    this.container =
        typeof options.container === 'object' ? options.container : document.body;
}
```

### onClick()

```js
onClick(e) {
    const trigger = e.delegateTarget || e.currentTarget;
    const selectedText = ClipboardActionDefault({
        action: this.action(trigger),
        container: this.container,
        target: this.target(trigger),
        text: this.text(trigger),
    });

    // Fires an event based on the copy operation result.
    this.emit(selectedText ? 'success' : 'error', {
        action: this.action,
        text: selectedText,
        trigger,
        clearSelection() {
            if (trigger) {
                trigger.focus();
            }
            document.activeElement.blur();
            window.getSelection().removeAllRanges();
        },
    });
}
```

在这个方法中，做的第一件事情是选取目标元素`e.currentTarget`，至于`e.delegateTarget`其实我个人没有太明白作者的意图，作者为写明注释。查阅第三方资料得知，这个属性只有jQuery有。所以个人猜测，作者的意图可能是如果`target`是由JQuery选择器选择的话，优先调用`delegateTarget`选择点击元素，否则就调用原生的`currentTarget`。

然后`selectedText`会根据输入的一些预设进行处理。如果没有设置初始化参数，那么就会根据默认的设置进行初始化，如果传入了参数，则会由`ClipboardActionDefault()`进行处理。

接着，会进行一个事件分发，如果我们监听了success或error事件的话，那么我们会得到一个上述结构的回调。

其中，返回的`clearSelection()`函数会清除Selection中所有选择的块。

### 关于初始化的一些处理函数

```js
defaultAction(trigger) {
    return getAttributeValue('action', trigger);
}
defaultTarget(trigger) {
    const selector = getAttributeValue('target', trigger);

    if (selector) {
        return document.querySelector(selector);
    }
}
defaultText(trigger) {
    return getAttributeValue('text', trigger);
}
```

我们以上面这三个默认事件处理函数为例，我们发现它们有一个共同点，就是都调用了函数`getAttributeValue(suffix, element)`。

所以，我们先来看一看这个函数是干什么的

```js
/**
 * Helper function to retrieve attribute value.
 * @param {String} suffix
 * @param {Element} element
 */
function getAttributeValue(suffix, element) {
  const attribute = `data-clipboard-${suffix}`;

  if (!element.hasAttribute(attribute)) {
    return;
  }

  return element.getAttribute(attribute);
}
```

我们看到函数的定义，首先看到的就是两个参数。

- 第一个参数——`suffix`，它的作用是传入需要获取的类型。这点很好理解，我们看到上面的三个处理函数都传入的是其对应的类型。
- 第二个参数——`element`，它传入的则是trigger，目标元素。

这个函数做的事情就是结合suffix读取trigger里的自定义属性。如果有的话拿到对应的值返回，如果没有的话，直接返回。

### 一些静态方法

#### copy

```js
/**
   * Allow fire programmatically a copy action
   * @param {String|HTMLElement} target
   * @param {Object} options
   * @returns Text copied.
   */
static copy(target, options = { container: document.body }) {
    return ClipboardActionCopy(target, options);
}
```

对数据源做复制操作

#### cut

```js
/**
* Allow fire programmatically a cut action
* @param {String|HTMLElement} target
* @returns Text cutted.
*/
static cut(target) {
    return ClipboardActionCut(target);
}
```

> 期末考试，就先写到这里。后续更新随缘
