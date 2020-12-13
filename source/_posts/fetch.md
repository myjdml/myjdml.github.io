---
title: Fetch笔记
date: 2020-09-02 15:56:32
categories: 
    - JavaScript
tags: 
    - js
    - Fetch
    - Ajax
mp3: http://cdn.redrock.team/hello-student_music1.mp3
---

## 关于AJAX的一些回顾

![ajax](/images/Fetch/ajax.jpg)

基本步骤：  

进行Ajax请求相信大家一定不陌生，这里我们一起回顾一下，ajax请求是什么样的！

```js
let btn = document.querySelector("#btn");
btn.addEventListener('click', () => {
    let username = document.querySelector("#username").value;


     // //1.创建一个新的XMLHttpRequest对象
     // let xhr = new XMLHttpRequest();
     // //指定发送
     // xhr.open("get", "../php/checkUsername.php?username=" + username, true);
     // //发送
     // xhr.send(null);
     // //发送成功需要执行的代码
     // xhr.onreadystatechange = function () {
     //     let result = xhr.responseText;
     //     document.querySelector("#result").innerHTML = result;
     // }

    //1.创建一个新的XMLHttpRequest对象
    let xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        //兼容IE6
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //对于get
        //2.准备发送
        xhr.open("get", "../php/checkUsername.php?username=" + username, true);
        //3.执行发送
        xhr.send(null);
    //对于post
        //2.准备发送
        xhr.open("post", "../php/checkUsername.php", true);
        //3.执行发送
        let param = "username=" + username;
        //对于post请求来说，参数应该放在请求体当中。
        //设置xhr请求信息，只有post请求有
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(param);

    //4.设置回调函数
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let result = xhr.responseText;
                document.querySelector("#result").innerHTML = result;
            }
        }

    }
})
```

## Fetch Fetch Fetch！！！

当我们使用javascript去发送和接收一些信息的时候，我们会发起一个叫做ajax请求的东西。ajax是一种技术，当我们需要发送和接收信息时，信息返回回来，我们需要改变HTML，将它添加到页面中。这个时候浏览器往往需要重新渲染。而我们如果使用了ajax技术的话，浏览器不需要去重新刷新页面，而是只改变需要更新的部分，让页面局部刷新。  

由于原生的js代码实现ajax十分的繁琐，并且有各种适配的问题，所以Jquery封装库实现ajax横空出世，在当时成为了一股潮流。它只需要引入Jquery文件，进行一些简单的配置，就可以实现ajax异步请求。  

```js
$.ajax('some-url', {
  success: (data) => { /* do something with the data */ },
  error: (err) => { /* do something when an error happens */}
});
```

### Fetch的支持

![image](/images/Fetch/brower.png)

Fetch的支持性非常好，支持几乎所有的主流浏览器（老版的IE和迷你版的欧朋除外）。而且因为Fetch是原生的方法，所以它在项目中使用十分的安全。如果你需要使用一些方法，原生不支持。这里有一些[补充](https://github.com/github/fetch)  

### 使用Fetch获取数据

使用Fetch获取数据很容易，只需要知道资源地址就可以  

例如我想获取到Chris的仓库的数据，我只需要发送一个get请求给`api.github.com/users/chriscoyier/repos`  

这样就是一个fetch请求：

```js
fetch('https://api.github.com/users/chriscoyier/repos');
```

这是不是很简单！！！  

接下来Fetch返回的是一个Promise对象，这是一个不需要回调函数就可以操作异步方法的对象。  

获取到数据之后，我们将我们需要进行的一些操作放在`.then`方法里  

```js
fetch('https://api.github.com/users/chriscoyier/repos')
  .then(response => {/* do something */})
```

如果你是第一次使用fetch，你会对它返回的response十分惊喜。如果你使用`console.log(response)`，你将得到下面这些信息

```js
{
  body: ReadableStream
  bodyUsed: false
  headers: Headers
  ok : true
  redirected : false
  status : 200
  statusText : "OK"
  type : "cors"
  url : "http://some-website.com/some-url"
  __proto__ : Response
}
```

这里，你会看到fetch会返回给你一些参数，这些参数会告诉你请求的状态。你会看到请求成功（ok: true; status: 200）。但是你也许注意到了, 在这些参数中你看不到任何你请求成功的数据！！  

事实就是如此，我们从GitHub获取的数据隐藏在body的可读文档流中。我们需要一个合适的方法去转换这些文档流，让它们变成我们可以使用的数据。  
我们知道GitHub返回的是一串json数据，我们可以使用`response.json`来转换这些数据。  

这里有一些其他的方法去处理不同类型的数据。如果返回的数据是XML格式的。可以用`response.text`进行数据转换；如果返回的数据是图片。可以用`response.blob`  

所有的这些转换方法（`response.json` 或者其他所有的）返回的都是另一个Promise对象，我们可以再用一个`.then`方法来获取这些数据。

```js
fetch('https://api.github.com/users/chriscoyier/repos')
  .then(response => response.json())
  .then(data => {
    // Here's a list of repos!
    console.log(data)
  });
```

OK!!这就是一个完整的用fetch进行异步操作的代码了。简短且简单🧲

### 用Fetch发送数据

使用fetch发送消息是十分优雅的，你可以只需要配置一下配置项就可以使用。

```js
fetch('some-url', options);
```

第一个参数，你需要设置你提交请求的方式。如果你没有设置，fetch会自动将设置为get  

第二个参数，设置你的请求头。在现在这个时间段，我们主要用的是json数据。所以我们就设置`content-Type`为`application/json`  

第三个参数，设置的是body里的json数据处理。我们使用json数据的时候通常要进行一些处理。所以我们通常会设置`JSON.stringify`  

下面是一个post请求的实例：  

```js
let content = {some: 'content'};

// The actual fetch request
fetch('some-url', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(content)
})
// .then()...
```

如果你的眼光足够敏锐，你就会发现有一些模版代码对于很多`post`,`put`和`delete`请求都适用。当我们已经明确了我们会发送json数据的时候，我们可以重复的将头部设置为`JSON.stringify`  

但是即使我们使用模板代码，fetch依然可以把异步请求实现的很好。  

然而当使用fetch的时候处理错误信息的时候，并没有像处理成功信息这么容易。。。  

### 使用fetch处理错误信息

尽管我们一直希望ajax请求能成功，但是有时候它总是会失败的。一旦失败，有很多种可能性导致fetch请求失败。包括并不限于以下这几点：  

1. 你尝试去请求一个不存在的资源。
2. 你没有权限去获取资源。
3. 你设置的一些的请求参数错误。
4. 服务器抛出错误。
5. 服务器请求超时。
6. 服务器宕机。
7. 后台的API改变
8. 。。。

如果你的请求失败了，那么就大事不妙了！！你可以想象这样的一种情景，你正在进行网上购物。这时，一个错误产生了，但是设计这个网站的人并没有设计处理请求错误的函数。因此，在你点击购买之后，一切都静止了，什么变化都没有发生。那个页面就挂在那儿，你不知道发生了什么，不知道你是否购买成功了。  

现在，让我们去尝试获取一个不存在的资源来学习来学习如何在使用Fetch的时候处理错误。举个例子，我们错误的把`chriscoyier`拼写成了`chrissycoyier`。

```js
// Fetching chrissycoyier's repos instead of chriscoyier's repos
fetch('https://api.github.com/users/chrissycoyier/repos')
```

我们知道这个请求会产生错误，因为在GitHub上是没有`chrissycoyier`的。因为错误是promise对象返回的，我们使用`catch`去处理它。  

在不知道具体的处理方法之前，你可能会写出这样一段代码。

```js
fetch('https://api.github.com/users/chrissycoyier/repos')
  .then(response => response.json())
  .then(data => console.log('data is', data))
  .catch(error => console.log('error is', error));
```

然后触发你的fetch请求，你将会得到这样的一个结果：

![image](/images/Fetch/error1.png)

> Fetch failed, but the code that gets executed is the second `.then` instead of `.catch`

为什么第二个`.then`方法会调用执行？为什么promise不想我们所期望的那样使用`.catch`去捕获错误。太恐怖了！！！😱😱😱  

如果我们使用`console.log`去执行响应回来的数据。我们会看到一些不同的值  

```js
{
  body: ReadableStream
  bodyUsed: true
  headers: Headers
  ok: false // Response is not ok
  redirected: false
  status: 404 // HTTP status is 404.
  statusText: "Not Found" // Request not found
  type: "cors"
  url: "https://api.github.com/users/chrissycoyier/repos"
}
```

这些数据大部分都是正常的，比如`ok`,`status`和`statusText`。并且，如同我们所预料是我一样，我们并没有在这其中发现chrissycoyier在GitHub上的数据。  

这个例子充分告诉了我们一件十分重要的事情，Fetch并不会关注你的ajax是否成功。它只关注发送请求，并且从从服务器收到响应。这意味着当请求失败时，我们需要自己抛出错误。  

因此，在第一个`.then`请求中，只有当请求成功时，才应该对返回的数据进行处理。验证请求是否成功其实很简单，只需要判断`response`是否为`ok`就可以了。

```js
fetch('some-url')
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      // Find some way to get to execute .catch()
    }
  });
```

当我们知道我们的请求并没有成功时，我们可以通过`throw`抛出一个错误，或者使用Promise中的`reject`去激活`catch`方法。

```js
// throwing an Error
else {
  throw new Error('something went wrong!')
}

// rejecting a Promise
else {
  return Promise.reject('something went wrong!')
}
```

以上的两种方式，使用任意一种就可以了。因为这两种方式都可以激活`.catch`方法  

在这里，我选择去使用`Promise.reject`,因为它更容易去执行。`Errors`也很好，但是它的执行比较困难，它唯一的好处是它在堆栈跟踪方面有着得天独厚的优势，但再Fetch方法中我们并不需要这种特质。  

所以，代码就变成了这样： 

```js
fetch('https://api.github.com/users/chrissycoyier/repos')
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject('something went wrong!')
    }
  })
  .then(data => console.log('data is', data))
  .catch(error => console.log('error is', error));
```

![image](/images/eFetch/error2.png)

> Failed request, but error gets passed into catch correctly

太好了！！现在我们有办法去捕获错误了。  

但是我们这样处理错误信息返回一个普通的文本并不是特别的友好。我们并不知道究竟是什么地方出问题了。我十分确信再遇到错误时收到这样一个错误信息你并不会感到十分愉快。。。

![image](/images/Fetch/error3.png)

> Yeah… I get it that something went wrong… but what exactly? 🙁

到底是什么错了？是服务器超时了吗？是我的连接被切断了吗？我们没有方法去得知！我们需要一种方法能告诉我们请求发生了什么错误，然后我们就可以很方便的处理它。  

让我们再来看一看返回的信息，看能不能找到什么灵感

```js
{
  body: ReadableStream
  bodyUsed: true
  headers: Headers
  ok: false // Response is not ok
  redirected: false
  status: 404 // HTTP status is 404.
  statusText: "Not Found" // Request not found
  type: "cors"
  url: "https://api.github.com/users/chrissycoyier/repos"
}
```

oh,太好了！在这个案例中，错误的原因是我们请求的资源不存在。我们可以返回一个404状态码。这样我们就知道该做什么了。  

将`status`和`statusText`放入`.catch`方法中，我们可以使用`.reject`来做这件事:  

```js
fetch('some-url')
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText
      })
    }
  })
  .catch(error => {
    if (error.status === 404) {
      // do something about 404
    }
  })
```

好！现在想对于之前已经有了很大的进展了！   

这种错误处理方式对于不需要特定解释的那些确定的HTTP状态是已经完全足够了的，像：

+ 401: Unauthorized
+ 404: Not found
+ 408: Connection timeout

但是它对于这一种情况就会显得特别不友好：

+ 400: Bad request.

是什么造成了一个错误的请求？太多的可能性了！例如，如果你丢失了一些必要的参数，会返回400。

![image](/images/Fetch/error4.png)

> Stripe’s explains it returns a 400 error if the request is missing a required field

如果我们只像之前一样处理的话，那么只会返回一个400错误。我们就不知道究竟发生了什么。我们需要更多的信息来告诉我们，究竟缺少了什么？是用户忘记填写了姓名？邮箱？还是信用卡信息？我们并不知道。  

理想的来说，这种情况下服务器应该返回一个对象，告诉我们请求为什么会失败。如果你的后台使用的是node和express，你可能会这么写。  

```js
res.status(400).send({
  err: 'no first name'
})
```

在这里，我们不能再第一个`.then`方法里使用reject,因为我们只能在执行了`response.json`之后才能读取服务器抛出的错误，然后我们才能决定我们做些什么。  

就像下面这些代码：

```js
fetch('some-error')
  .then(handleResponse)

function handleResponse(response) {
  return response.json()
    .then(json => {
      if (response.ok) {
        return json
      } else {
        return Promise.reject(json)
      }
    })
}
```

让我们剖析一下这一坨代码究竟在干啥！首先我们使用`response.json`来读取服务器返回给我们的json数据。因为`response.json`返回的是一个json对象，所以我们可以立即使用`.then`方法去读取这个数据究竟是啥。  

我们在第一个`.then`方法里包含着第二个`.then`方法因为我们需要去判断`response.ok`是否为真，从而判断响应是否成功  

如果你想将 status和statusText和json一起发送给`.catch`,你可以使用`Object.assign()`将它们联合在一起。

```js
let error = Object.assign({}, json, {
  status: response.status,
  statusText: response.statusText
})
return Promise.reject(error)
```

使用新的`handelResponse`函数，你可以这样书写代码。这种方式可以自动将数据发送给`.then`和`.catch`

```js
fetch('some-url')
  .then(handleResponse)
  .then(data => console.log(data))
  .catch(error => console.log(error))
```

这是我们十分高兴，因为我们折腾了老半天，终于完成了对错误的处理。但是当我们坐下来，喝着咖啡，享受着这惬意的下午茶的时候。我们突然意识到。。。我们似乎还没有对响应数据做处理！！！

### 处理其他响应类型 

到目前为止，我们只处理了Fetch的json数据请求。这在当今90%的API都返回json数据的情况下解决了大部分的问题。  

但是，另外的10%怎么办。。。  

假如你使用上面的代码去接受XML的响应，你将立即捕获一个错误：

![image](/images/Fetch/failed-text-response.png)

> Parsing an invalid JSON produces a Syntax error

因为返回的是一串xml数据，而非json数据。最简单的，我们不能返回`response.json`, 取而代之的是`response.text`。想要这么做的话，我们需要检查请求头里的 content type

```js
.then(response => {
  let contentType = response.headers.get('content-type')

  if (contentType.includes('application/json')) {
    return response.json()
    // ...
  }

  else if (contentType.includes('text/html')) {
    return response.text()
    // ...
  }

  else {
    // Handle other responses accordingly...
  }
});
```



下面是之前所有代码的一个合集：

```js
fetch('some-url')
  .then(handleResponse)
  .then(data => console.log(data))
  .catch(error => console.log(error))

function handleResponse (response) {
  let contentType = response.headers.get('content-type')
  if (contentType.includes('application/json')) {
    return handleJSONResponse(response)
  } else if (contentType.includes('text/html')) {
    return handleTextResponse(response)
  } else {
    // Other response types as necessary. I haven't found a need for them yet though.
    throw new Error(`Sorry, content-type ${contentType} not supported`)
  }
}

function handleJSONResponse (response) {
  return response.json()
    .then(json => {
      if (response.ok) {
        return json
      } else {
        return Promise.reject(Object.assign({}, json, {
          status: response.status,
          statusText: response.statusText
        }))
      }
    })
}
function handleTextResponse (response) {
  return response.text()
    .then(text => {
      if (response.ok) {
        return json
      } else {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          err: text
        })
      }
    })
}
```

如果你决定使用Fetch，那么你将会经常使用到`control`+`c`/`v`。如果需要在项目中大量使用Fetch的话，下面介绍了一个Fetch的库--zIFetch.

### 介绍 zIFetch

zIFetch是一个抽象了数据处理函数的库，它让你只需要关心数据和错误处理而不需要担心响应。

使用zlFetch，首先你可以这么安装它。

```shell
npm install zl-fetch --save
```

然后，你可以在库里引用它。

```js
// Polyfills (if needed)
require('isomorphic-fetch') // or whatwg-fetch or node-fetch if you prefer

// ES6 Imports
import zlFetch from 'zl-fetch';

// CommonJS Imports
const zlFetch = require('zl-fetch');
```

zIFetch不仅仅可以移除处理Fetch响应数据的需要。它还可以帮你发送数据而不需要在body里对数据进行转换

下面的这些代码就是一个例子：

```js
let content = {some: 'content'}

// Post request with fetch
fetch('some-url', {
  method: 'post',
  headers: {'Content-Type': 'application/json'}
  body: JSON.stringify(content)
});

// Post request with zlFetch
zlFetch('some-url', {
  method: 'post',
  body: content
});
```

zIFetch还使得web Tokens认证变得更加容易

身份验证的标准是在头部添加一个`Authorization`密钥。`Authorization`的内容将会设置到`Bearer your-token-here`。zlFetch将帮助你添加这个`token`配置的字段。

所以下面这两段代码实际上是等价的

```js
let token = 'someToken'
zlFetch('some-url', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

// Authentication with JSON Web Tokens with zlFetch
zlFetch('some-url', {token});
```

### 总结

Fetch是一项十分神奇的技术，它使得收发消息变得更加容易。我们不需要使用XHR请求，也不需要引入像jQuery一样的库。

尽管Fetch很好，但是它处理起错误来却并不简单。你需要将许多错误信息传递到`.catch`方法中

使用zlFetch可以避免进行错误处理。


### ref 

[Using Fetch](https://css-tricks.com/using-fetch/) 