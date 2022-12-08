### 介绍

前端开发中常用的小工具

### 使用

#### 在传统项目中使用

```html
<script src="https://gitee.com/xlou/webtools/raw/master/dist/webtools.min.js"></script>
<!-- 建议下载下来使用 -->
<script>
  /* 引入了该 js 文件后，会在 window 上赋值 tools 和 Base64 对象 */
  var query=tools.getQuery()
  var str=Base64.encode("hello webtools")
</script>
```

#### 在 Vue 、React 和 Angular 等项目中使用

安装

``` bash
npm i @xlou/webtools -S
```

main.js / main.ts 中使用

``` javascript
import {Base64,getQuery} from '@xlou/webtools'

var query=getQuery()
var str=Base64.encode("hello webtools")
```

### API

#### filterObject(obj,str?,bol?)&ensp;过滤对象

``` javascript
var a={m:123,n:"hello",p:456,q:789}
var b=filterObject(a,"p,q") // b={p:456,q:789}
var c=filterObject(a,"p,q",false) // b={m:123,n:"hello"}
```

#### deepCopy(obj)&ensp;深拷贝

``` javascript
var a={m:"hello",n:[1,2,3]}
var b=deepCopy(a) // b={m:"hello",n:[1,2,3]}
b.m="hi"
b.n[0]=4 // b={m:"hi",n:[4,2,3]}
console.log(a) // a={m:"hello",n:[1,2,3]}
```

#### getQuery()&ensp;获取当前页面地址栏参数

``` javascript
/* 如果此时页面的地址为 www.xxx.com?name=tom&id=1 */
var query=getQuery() // query={name:"tom",id:1}
```

#### queryString(obj,bol?)&ensp;将对象转化为地址栏参数

``` javascript
var a={name:"tom",id:1}
var m=queryString(a) // m="?name=tom&id=1"
var n=queryString(a,false) // n="name=tom&id=1"
```

#### toFixed(num,s?)&ensp;保留几位小数

``` javascript
var a=1.335
var m=q.toFixed(2) // m=1.33 使用默认的 toFixed 方法，会出现和正常认知不符情况
var n=toFixed(a,2) // n=1.34
var p=toFixed(a) // p=1
```

#### formSubmit(obj)&ensp;模拟 form 表单提交，常用于 post 下载文件

``` javascript
formSubmit({
  method:"post", // 请求类型
  action:"./hello", // 请求地址
  /* ... 其它 form 表单参数 */
  data:{name:"tom"} // 请求参数
})
```

#### readText(url,callback)&ensp;读取文本文件

``` javascript
readText("./hello.txt",res=>{
  console.log(res)
})
```

#### readJSON(url,callback)&ensp;读取 json 文件

``` javascript
readJSON("./hello.json",res=>{
  console.log(res)
})
```

#### getStore(str)&ensp;读取 localStorage ，如果是 json ，直接返回 js 对象 

``` javascript
/* key:a, value:{"m":"hello"} */
var b=getStore("a") // b={m:"hello"}
```

#### setStore(str,data)&ensp;设置 localStorage ，如果 data 是 js 对象，会尝试转换为 json 再存入

``` javascript
var a={m:"hello"}
var b="tom"
setStore('p',a) // key:p, value:{"m":"hello"}
setStore('q',b) // key:q, value:tom
```

#### unid()&ensp;返回一个唯一不重复的 id 字符串

``` javascript
var a=unid() // a='xenj1qoj5lbei4nh2'
```

#### Base64&ensp;对字符串进行 Base64 编码和解码

``` javascript
var a=Base64.encode("你好，Tom") // a='5L2g5aW977yMVG9t'
var b=Base64.decode('5L2g5aW977yMVG9t') // b="你好，Tom"
```