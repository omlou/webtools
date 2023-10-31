### Languages

* [English](https://github.com/omlou/webtools#readme)
* [简体中文](https://github.com/omlou/webtools/blob/master/public/md/readme-zh.md)
* [日本語](https://github.com/omlou/webtools/blob/master/public/md/readme-ja.md)
* [한국어](https://github.com/omlou/webtools/blob/master/public/md/readme-ko.md)
* [Français](https://github.com/omlou/webtools/blob/master/public/md/readme-fr.md)

### Introduction

* Commonly used tools in frontend development.
* Examples: Base64 encoding/decoding, deep copying of data, extracting URL parameters, etc.

### Usage

#### Using in Traditional Projects

```html
<script src="https://unpkg.com/@xlou/webtools@1.1.8/dist/umd/webtools.min.js"></script>
<!-- It's recommended to download and use the file locally -->
<script>
  /* After including this JS file, the tools object will be available on the window */
  let query = tools.getQuery()
</script>
```

#### Using in Vue, React, Angular, and Other Node Projects

Installation

``` bash
npm i @xlou/webtools -S
```

In main.js or main.ts

``` javascript
/* Using specific functions */
import { getQuery } from '@xlou/webtools'

let query = getQuery()

/* Using the entire package */
import tools from '@xlou/webtools'

let query = tools.getQuery()
```

### API

#### deepCopy &ensp; Deep Copy for Reference Types

Parameter Details

```typescript
function deepCopy(obj: any, set?: Set<any>): any;
```

Usage Example

``` javascript
let objA = { m: "hello", n: [1, 2, 3] }
let objB = deepCopy(a) // objB => { m: "hello", n: [1, 2, 3] }
objA.m = "hi"
objB.n[0] = 4 // objB => { m: "hi", n: [4, 2, 3] }
console.log(objA) // objA => { m: "hello", n: [1, 2, 3] }
```

#### getQuery &ensp; Get URL Parameters

Parameter Details

``` typescript
interface GeneralObject {
  [prop: string]: string | number | boolean | null | undefined;
}
function getQuery(href?: string): GeneralObject;
/* If href is not provided, it gets parameters from the current page's URL */
```

Usage Example

``` javascript
/* If the current page's URL is www.xxx.com?name=tom&id=1 */
let q0 = getQuery() // q0 => { name: "tom", id: 1 }
let q1 = getQuery("www.xxx.com?type=1") // q1 => { type: 1 }
```

#### queryString &ensp; Convert Object to Query String

Parameter Details

``` typescript
function queryString(obj: GeneralObject, bol?: boolean): string;
```

Usage Example

``` javascript
let a = { name: "tom", id: 1 }
let m = queryString(a) // m => "name=tom&id=1"
let n = queryString(a, true) // n => "?name=tom&id=1"
```

#### filterObject &ensp; Filter an Object

Parameter Details

``` typescript
function filterObject(obj: Object, str?: string, bol?: boolean): Object;
```

Usage Example

``` javascript
let a = { m: 123, n: "hello", p: 456, q: 789 }
let b = filterObject(a, "p, q") // b => { p: 456, q: 789 }
let c = filterObject(a, "p, q", false) // b => { m: 123, n: "hello" }
```

#### toFixed &ensp; Format Decimal Places

Parameter Details

``` typescript
function toFixed(num?: number | string, s?: number | string): string | undefined;
```

Usage Example

``` javascript
let a = 1.335
let m = a.toFixed(2) // m => 1.33 Using the default toFixed method might lead to unexpected results
let n = toFixed(a, 2) // n => 1.34
let p = toFixed(a) // p => 1
```

#### formSubmit &ensp; Simulate Form Submission for File Downloads

Parameter Details

``` typescript
function formSubmit(obj: FormOptions): void;
```

Usage Example

``` javascript
formSubmit({
  method: "post", // Request type
  action: "./hello", // Request URL
  /* ... Other form parameters */
  data: { name: "tom" } // Request data
})
```

#### readText &ensp; Read Text Files

Parameter Details

``` typescript
function readText(url: string): Promise<string>;
```

Usage Example

``` javascript
readText("./hello.txt")
.then(res => {
  console.log(res)
})
```

#### readJSON &ensp; Read JSON Files

Parameter Details

``` typescript
function readJSON(url: string): Promise<any>;
```

Usage Example

``` javascript
readJSON("./hello.json")
.then(res => {
  console.log(res)
})
```

#### getStore &ensp; Read from localStorage, Parsing JSON if Applicable

Parameter Details

``` typescript
function getStore(str: string): any;
```

Usage Example

``` javascript
/* key: a, value: { "m": "hello" } */
let b = getStore("a") // b => { m: "hello" }
```

#### setStore &ensp; Write to localStorage, Parsing Objects to JSON if Applicable

Parameter Details

``` typescript
function setStore(str: string, data: any): void;
```

Usage Example

``` javascript
let a = { m: "hello" }
let b = "tom"
setStore('p', a) // key: p, value: { "m": "hello" }
setStore('q', b) // key: q, value: tom
```

#### Base64 &ensp; Encode and Decode Strings using Base64

Parameter Details

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

Usage Example

``` javascript
const base64 = new Base64()
let a = base64.encode("Hello, World!") // a => 'SGVsbG8sIFdvcmxkIQ=='
let b = base64.decode('SGVsbG8sIFdvcmxkIQ==') // b => "Hello, World!"
```

#### unid &ensp; Generate a Unique ID String

Parameter Details

``` typescript
function unid(): string;
```

Usage Example

``` javascript
let a = unid() // a => 'xenj1qoj5lbei4nh2'
```

#### colorRGB &ensp; Get RGB Values from a Color

Parameter Details

``` typescript
function colorRGB(str: string): Array<number> | undefined;
```

Usage Example

``` javascript
colorRGB("#f00") // [255, 0, 0]
colorRGB("#ff7300") // [255, 115, 0]
colorRGB("rgb(128, 55, 255)") // [128, 55, 255]
```

#### clipboardWrite &ensp; Copy the specified content to the clipboard.

Parameter Details

``` typescript
function clipboardWrite(content: any, type?: string): Promise<void>;
```

Usage Example

``` javascript
function copyText() {
  clipboardWrite("Hello, World!") // If the 'type' parameter is not specified, it defaults to 'text/plain'.
  .then(() => {
    console.log("Copy successful")
  })
}
async function copyImage() {
  const res = await fetch("./flower.png")
  const blob = await res.blob()
  clipboardWrite(blob, blob.type)
  .then(() => {
    console.log("Copy successful")
  })
}
```