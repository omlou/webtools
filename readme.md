### 介绍

* 前端开发中常用的工具
* 如：Base64 编码解码、数据深拷贝、获取地址栏参数等

### 使用

#### 在传统项目中使用

```html
<script src="https://unpkg.com/@xlou/webtools@1.1.4/dist/umd/webtools.min.js"></script>
<!-- 建议下载下来使用 -->
<script>
  /* 引入了该 js 文件后，会在 window 上赋值 tools 对象 */
  let query = tools.getQuery()
  let str = Base64.encode("hello webtools")
</script>
```

#### 在 Vue 、React 和 Angular 等 node 项目中使用

安装

``` bash
npm i @xlou/webtools -S
```

main.js / main.ts 中使用

``` javascript
/* 按需取用 */
import { Base64, getQuery } from '@xlou/webtools'

let query = getQuery()
let str = Base64.encode("hello webtools")

/* 整包使用 */
import tools from '@xlou/webtools'

let query = tools.getQuery()
let str = tools.Base64.encode("hello webtools")
```

### API

#### deepCopy

引用类型的深拷贝

``` javascript
let objA = { m: "hello", n: [1, 2, 3] }
let objB = deepCopy(a) // objB => { m: "hello", n: [1, 2, 3] }
objA.m = "hi"
objB.n[0] = 4 // objB => { m: "hi", n: [4, 2, 3] }
console.log(objA) // objA => { m: "hello", n: [1, 2, 3] }
```

#### getQuery(href)&ensp;获取 url 地址的参数，href 不传则获取当前页面地址栏参数

``` javascript
/* 如果此时页面的地址为 www.xxx.com?name=tom&id=1 */
var q0=getQuery() // q0={name:"tom",id:1}
var q1=getQuery("www.xxx.com?type=1") // q1={type:1}
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
var m=a.toFixed(2) // m=1.33 使用默认的 toFixed 方法，会出现和正常认知不符情况
var n=toFixed(a,2) // n=1.34
var p=toFixed(a) // p=1
```

#### formSubmit(obj)&ensp;js 模拟 form 表单提交，常用于 post 下载文件

``` javascript
formSubmit({
  method:"post", // 请求类型
  action:"./hello", // 请求地址
  /* ... 其它 form 表单参数 */
  data:{name:"tom"} // 请求参数
})
```

#### filterObject(obj,str?,bol?)&ensp;过滤对象

``` javascript
var a={m:123,n:"hello",p:456,q:789}
var b=filterObject(a,"p,q") // b={p:456,q:789}
var c=filterObject(a,"p,q",false) // b={m:123,n:"hello"}
```

#### readText(url)&ensp;读取文本文件

``` javascript
readText("./hello.txt")
.then(res=>{
  console.log(res)
})
```

#### readJSON(url)&ensp;读取 json 文件

``` javascript
readJSON("./hello.json")
.then(res=>{
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

#### Base64&ensp;对字符串进行 Base64 编码和解码

``` javascript
var a=Base64.encode("你好，Tom") // a='5L2g5aW977yMVG9t'
var b=Base64.decode('5L2g5aW977yMVG9t') // b="你好，Tom"
```

#### unid()&ensp;返回一个唯一不重复的 id 字符串

``` javascript
var a=unid() // a='xenj1qoj5lbei4nh2'
```

#### colorRGB(str)&ensp;返回一个颜色值的 R 、G 、B 值

``` javascript
colorRGB("#f00") // [255,0,0]
colorRGB("#ff7300") // [255,115,0]
colorRGB("rgb(128,55,255)") // [128,55,255]
```