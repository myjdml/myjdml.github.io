---
title: Ajax简介
date: 2020-09-02 19:25:54
categories: 
    - JavaScript
tags: 
    - js
    - Ajax
mp3: http://cdn.redrock.team/hello-student_music1.mp3
---

## Day01

### 网络相关概念

+ 查看本机ip `ifconfig`
+ 连接到服务器 `ping baidu.com`
+ DNS服务器：解析域名
  - 个人电脑将域名传输给DNS服务器，服务器返回ip地址，个人电脑再将ip地址传给电信路由器，再连接到远端服务器
+ 真正访问时，会先访问本地host是否有自定义关系，如果有，则不会访问DNS服务器

### php基本语法

#### 基本内容

+ `echo` 打印内容
+ 变量声明使用$运算符
+ 进行变量加减的时候，也需要加上$符号，否则不能进行; 字符串拼接要用`.`连接
```php
$num1 = 100;
$num2 = 200;
$result = $num1 + $num2;
echo $result;
echo "<br>";

$str1 = 'hi ';
$str2 = " hello";
$str3 = $str1 . $str2;
echo $str3;
echo "<br>";
```

#### 数组的使用

##### 基本应用
```php
$arr = array();
$arr[0] = "zhangsan";
$arr[1] = "lisi";
$arr[2] = "wangwu";
//echo不能输出复杂数据类型
//输出复杂数据类型需要用到下面这两个方法
print_r($arr);
var_dump($arr);
//将数组转化为json格式的字符串的方法
json_encode($arr);

//自定义数组下标索引,剩下未定义的元素下标索引从“0”开始依次递增
$arr1 = array("name1"=>"zhangsan", "lisi", "wangwu");
var_dump($arr1);
```

##### 二维数组
```php
$arr2 = array();
$arr2["zhangsan"] = array("age"=>"18", "sex"=>"male", "height"=>"180");
$arr2["lisi"] = array("age"=>"18", "sex"=>"male", "height"=>"180");
$arr2["wangwu"] = array("age"=>"18", "sex"=>"male", "height"=>"180");
var_dump($arr2);
echo "<br>";
$result = json_encode($arr2);
echo "$result <br>";
```

##### 数组的遍历
```php
//count()方法，用来计算数组的长度
$arr3 = array("zhangsan", "lisi", "wangwu");
for ($i = 0;$i < count($arr3);$i++){
    $temp = $arr3[$i];
    echo $temp . "<br>";
};
//通过键值对循环遍历
$arr4 = array("name1"=>"zhangsan", "name2"=>"lisi", "name3"=>"wangwu");
foreach ($arr4 as $key => $value) {
    echo $key . ">>>" . $value . "<br>";
}
```

#### 函数的使用

```php
$arr5 = array("zhangsan", "lisi", "weangwu");
//系统函数
print_r($arr5);
var_dump($arr5);
echo json_encode($arr5);
//自定义函数
function add($num1, $num2) {
    return $num1 + $num2;
}
$addResult = add(3, 4);
echo "计算结果为：" . $addResult;
```

#### 参数的获取

get请求参数跟在url后面，多个参数使用&连接  
post请求的参数在请求体中

##### get请求

+ 预定义变量，处理get请求
  ```php
    echo "checkUserName  ";
    //通过key得到传过来的数据
    $username = $_GET["username"];
    $password = $_GET["password"];
    //条件判断处理数据
    if ($username === "admin" && $password === "123") {
        echo "Login success";
    } else {
        echo "Login failed";
    }
  ```
  
##### post请求

+ 预定义变量，处理post请求
  ```php
    echo "checkUserName  ";
    //通过key得到传过来的数据
    $username = $_POST["username"];
    $password = $_POST["password"];
    //条件判断处理数据
    if ($username === "admin" && $password === "123") {
        echo "Login success";
    } else {
        echo "Login failed";
    }
  ```
  
##### 实际应用

```php
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>学生成绩结果</title>
    <style>
        ul {
            list-style: none;
            color: darkred;
        }
    </style>
</head>
<body>
<?php

    $data = array();
    $data[123] = array("name" => "zhangsan", "chinese" => "103", "math" => "136", "english" => "222");
    $data[124] = array("name" => "zhangsan", "chinese" => "153", "math" => "125", "english" => "522");
    $data[125] = array("name" => "zhangsan", "chinese" => "163", "math" => "2454", "english" => "222");
    $code = $_POST["code"];
    //查询数据库,在此处使用前面构建的虚拟数据代替


?>

    <?php
    if (array_key_exists($code, $data)) {
        $result = $data[$code]
    ?>

    <div>
        <div><?php echo $result["name"] ?>的成绩如下</div>
        <ul>
            <li>语文：<?php echo $result["chinese"]?>分</li>
            <li>数学：<?php echo $result["math"]?>分</li>
            <li>英语：<?php echo $result["english"]?>分</li>
        </ul>
    </div>

    <?php
    } else {
    ?>
    <div>该学生考号不存在</div>
    <?php
    }
    ?>

</body>
</html>
```

### Ajax的4个步骤

![image](http://note.youdao.com/yws/res/1499/B67657C3BC0745BFA4B686A5008745B2)

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
        // //2.准备发送
        // xhr.open("get", "../php/checkUsername.php?username=" + username, true);
        // //3.执行发送
        // xhr.send(null);
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

### Ajax的使用

#### Ajax封装

```js
let myAjax = (type, url, param, dataType, callback, async) => {
    let xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (type === "get") {
        if (param && param !== "") {
            url += "?" + param;
        }
    }
    xhr.open(type, url, async);

    if (type === "get") {
        xhr.send(null);
    } else if (type === "post") {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(param);
    }

    if (async) {
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    let result = null;
                    if (dataType === "json") {
                        result = this.responseText;
                        result = JSON.parse(result);
                    } else if (dataType === "xml") {
                        result = this.responseXML;
                    } else {
                        result = this.responseText;
                    }
                    if (callback) {
                        callback(result);
                    }
                }
            }
        };
    } else {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let result = null;
                if (dataType === "json") {
                    result = xhr.responseText;
                    result = JSON.parse(result);
                } else if (dataType === "xml") {
                    result = xhr.responseXML;
                } else {
                    result = xhr.responseText;
                }
                if (callback) {
                    callback(result);
                }
            }
        }
    }
};

let obj = {

};
console.log(obj);

let myAjax2 = (obj) => {
    let defaults = {
        type: "get",
        url: "#",
        dataType: "json",
        data: {},
        async: true,
        success: function (result) {
            console.log(result);
        }
    };
    //obj属性覆盖
    //1、 如果有一些属性只存在obj中， 会给defaults中增加属性
    //2、 如果有一些属性在obj和defaults中都存在， 会将defaults中的默认值覆盖
    //3、 如果有一些属性只在defaults中存在， 在obj中不存在，这时候defaults中将保留预定义的属性
    for (let key in obj) {
        defaults[key] = obj[key];
    }

    let xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    let params = "";
    for (let attr in defaults.data) {
        params += attr + "=" + defaults.data[attr] + "&";
    }
    if (params) {
        params = params.substring(0, params.length - 1);
    }
    if (defaults.type === "get") {
        defaults.url += "?" + params;
    }
    xhr.open(defaults.type, defaults.url, defaults.async);
    if (defaults.type === "get") {
        xhr.send(null);
    }else if (defaults.type === "get") {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }

    if (defaults.async) {
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    let result = null;
                    if (defaults.dataType === "json") {
                        result = this.responseText;
                        result = JSON.parse(result);
                    } else if (defaults.dataType === "XML") {
                        result = this.responseXML
                    } else {
                        result = this.responseText
                    }

                    defaults.success(result);
                }
            }
        }
    } else {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let result = null;
                if (defaults.dataType === "json") {
                    result = xhr.responseText;
                    result = JSON.parse(result);
                } else if (defaults.dataType === "XML") {
                    result = xhr.responseXML
                } else {
                    result = xhr.responseText
                }

                defaults.success(result);
            }
        }
    }
};
```