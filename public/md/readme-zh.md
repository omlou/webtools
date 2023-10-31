### 语言

* [English](https://github.com/omlou/webtools#readme)
* [简体中文](https://github.com/omlou/webtools/blob/master/public/md/readme-zh.md)
* [日本語](https://github.com/omlou/webtools/blob/master/public/md/readme-ja.md)
* [한국어](https://github.com/omlou/webtools/blob/master/public/md/readme-ko.md)
* [Français](https://github.com/omlou/webtools/blob/master/public/md/readme-fr.md)

### 简介

* 前端开发中常用的工具。
* 示例：Base64 编码/解码、深拷贝数据、提取URL参数等。

### 使用方法

#### 在传统项目中使用

```html
<script src="https://unpkg.com/@xlou/webtools@1.1.8/dist/umd/webtools.min.js"></script>
<!-- 推荐下载并本地使用文件 -->
<script>
  /* 包含此JS文件后，tools对象将在window上可用 */
  let query = tools.getQuery()
</script>
```

#### 在Vue、React、Angular和其他Node项目中使用

安装

``` bash
npm i @xlou/webtools -S
```

在main.js或main.ts中

``` javascript
/* 使用特定函数 */
import { getQuery } from '@xlou/webtools'

let query = getQuery()

/* 使用整个包 */
import tools from '@xlou/webtools'

let query = tools.getQuery()
```

### API

#### deepCopy &ensp; 引用类型的深拷贝

参数详情

```typescript
function deepCopy(obj: any, set?: Set<any>): any;
```

使用示例

``` javascript
let objA = { m: "hello", n: [1, 2, 3] }
let objB = deepCopy(a) // objB => { m: "hello", n: [1, 2, 3] }
objA.m = "hi"
objB.n[0] = 4 // objB => { m: "hi", n: [4, 2, 3] }
console.log(objA) // objA => { m: "hello", n: [1, 2, 3] }
```

#### getQuery &ensp; 获取URL参数

参数详情

``` typescript
interface GeneralObject {
  [prop: string]: string | number | boolean | null | undefined;
}
function getQuery(href?: string): GeneralObject;
/* 如果未提供href，它将从当前页面的URL中获取参数 */
```

使用示例

``` javascript
/* 如果当前页面的URL为www.xxx.com?name=tom&id=1 */
let q0 = getQuery() // q0 => { name: "tom", id: 1 }
let q1 = getQuery("www.xxx.com?type=1") // q1 => { type: 1 }
```

#### queryString &ensp; 将对象转换为查询字符串

参数详情

``` typescript
function queryString(obj: GeneralObject, bol?: boolean): string;
```

使用示例

``` javascript
let a = { name: "tom", id: 1 }
let m = queryString(a) // m => "name=tom&id=1"
let n = queryString(a, true) // n => "?name=tom&id=1"
```

#### filterObject &ensp; 过滤对象

参数详情

``` typescript
function filterObject(obj: Object, str?: string, bol?: boolean): Object;
```

使用示例

``` javascript
let a = { m: 123, n: "hello", p: 456, q: 789 }
let b = filterObject(a, "p, q") // b => { p: 456, q: 789 }
let c = filterObject(a, "p, q", false) // b => { m: 123, n: "hello" }
```

#### toFixed &ensp; 格式化小数位数

参数详情

``` typescript
function toFixed(num?: number | string, s?: number | string): string | undefined;
```

使用示例

``` javascript
let a = 1.335
let m = a.toFixed(2) // m => 1.33 使用默认的toFixed方法可能导致意外结果
let n = toFixed(a, 2) // n => 1.34
let p = toFixed(a) // p => 1
```

#### formSubmit &ensp; 模拟表单提交以下载文件

参数详情

``` typescript
function formSubmit(obj: FormOptions): void;
```

使用示例

``` javascript
formSubmit({
  method: "post", // 请求类型
  action: "./hello", // 请求URL
  /* ... 其他表单参数 */
  data: { name: "tom" } // 请求数据
})
```

#### readText &ensp; 读取文本文件

参数详情

``` typescript
function readText(url: string): Promise<string>;
```

使用示例

``` javascript
readText("./hello.txt")
.then(res => {
  console.log(res)
})
```

#### readJSON &ensp; 读取JSON文件

参数详情

``` typescript
function readJSON(url: string): Promise<any>;
```

使用示例

``` javascript
readJSON("./hello.json")
.then(res => {
  console.log(res)
})
```

#### getStore &ensp; 从localStorage中读取，如果适用，则解析为JSON

参数详情

``` typescript
function getStore(str: string): any;
```

使用示例

``` javascript
/* 键：a，值：{ "m": "hello" } */
let b = getStore("a") // b => { m: "hello" }
```

#### setStore &ensp; 写入localStorage，如果适用，将对象解析为JSON

参数详情

``` typescript
function setStore(str: string, data: any): void;
```

使用示例

``` javascript
let a = { m: "hello" }
let b = "tom"
setStore('p', a) // 键：p，值：{ "m": "hello" }
setStore('q', b) // 键：q，值：tom
```

#### Base64 &ensp; 使用Base64编码和解码字符串

参数详情

``` typescript
class Base64 {
  constructor(key?: string);
  private key;
  encode(input: string): string;
  decode(input: string): string;
  private utf8_encode;
  private utf8_decode;
}
```

使用示例

``` javascript
const base64 = new Base64()
let a = base64.encode("Hello, World!") // a => 'SGVsbG8sIFdvcmx

kIQ=='
let b = base64.decode('SGVsbG8sIFdvcmxkIQ==') // b => "Hello, World!"
```

#### unid &ensp; 生成唯一的ID字符串

参数详情

``` typescript
function unid(): string;
```

使用示例

``` javascript
let a = unid() // a => 'xenj1qoj5lbei4nh2'
```

#### colorRGB &ensp; 从颜色获取RGB值

参数详情

``` typescript
function colorRGB(str: string): Array<number> | undefined;
```

使用示例

``` javascript
colorRGB("#f00") // [255, 0, 0]
colorRGB("#ff7300") // [255, 115, 0]
colorRGB("rgb(128, 55, 255)") // [128, 55, 255]
```

#### clipboardWrite &ensp; 复制指定内容到剪贴板

参数详情

``` typescript
function clipboardWrite(content: any, type?: string): Promise<void>;
```

使用示例

``` javascript
function copyText() {
  clipboardWrite("Hello, World!") // 如果未指定'type'参数，默认为'text/plain'。
  .then(() => {
    console.log("复制成功")
  })
}
async function copyImage() {
  const res = await fetch("./flower.png")
  const blob = await res.blob()
  clipboardWrite(blob, blob.type)
  .then(() => {
    console.log("复制成功")
  })
}
```