### 言語

[English](https://github.com/omlou/webtools#readme)  
[简体中文](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-zh.md)  
[한국어](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-ko.md)  
[日本語](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-ja.md)  
[Français](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-fr.md)  

### 概要

* フロントエンド開発で一般的に使用されるツール
* 例：Base64エンコードとデコード、データの深いコピー、URLのパラメーター取得など

### 使用法

#### 伝統的なプロジェクトでの使用

```html
<script src="https://unpkg.com/@xlou/webtools@1.1.4/dist/umd/webtools.min.js"></script>
<!-- ダウンロードして使用することをおすすめします -->
<script>
  /* このjsファイルをインポートすると、windowにtoolsオブジェクトが追加されます */
  let query = tools.getQuery()
  let str = Base64.encode("hello webtools")
</script>
```

#### Vue、React、Angularなどのノードプロジェクトでの使用

インストール

``` bash
npm i @xlou/webtools -S
```

main.js / main.ts での使用

``` javascript
/* 必要なものだけを使用 */
import { Base64, getQuery } from '@xlou/webtools'

let query = getQuery()
let str = Base64.encode("hello webtools")

/* パッケージ全体を使用 */
import tools from '@xlou/webtools'

let query = tools.getQuery()
let str = tools.Base64.encode("hello webtools")
```

### API

#### deepCopy &ensp; 参照型の深いコピー

パラメーターの説明

```typescript
function deepCopy(obj: any, set?: Set<any>): any;
```

使用例

``` javascript
let objA = { m: "hello", n: [1, 2, 3] }
let objB = deepCopy(a) // objB => { m: "hello", n: [1, 2, 3] }
objA.m = "hi"
objB.n[0] = 4 // objB => { m: "hi", n: [4, 2, 3] }
console.log(objA) // objA => { m: "hello", n: [1, 2, 3] }
```

#### getQuery &ensp; URLのパラメーターを取得

パラメーターの説明

``` typescript
interface GeneralObject {
  [prop: string]: string | number | boolean | null | undefined;
}
function getQuery(href?: string): GeneralObject;
/* hrefを渡さない場合、現在のページのURLのパラメーターを取得します */
```

使用例

``` javascript
/* この時、ページのURLが www.xxx.com?name=tom&id=1 であるとします */
let q0 = getQuery() // q0 => { name: "tom", id: 1 }
let q1 = getQuery("www.xxx.com?type=1") // q1 => { type: 1 }
```

#### queryString &ensp; オブジェクトをURLのパラメーターに変換

パラメーターの説明

``` typescript
function queryString(obj: GeneralObject, bol?: boolean): string;
```

使用例

``` javascript
let a = { name: "tom", id: 1 }
let m = queryString(a) // m => "name=tom&id=1"
let n = queryString(a, true) // n => "?name=tom&id=1"
```

#### filterObject &ensp; オブジェクトをフィルタリング

パラメーターの説明

``` typescript
function filterObject(obj: Object, str?: string, bol?: boolean): Object;
```

使用例

``` javascript
let a = { m: 123, n: "hello", p: 456, q: 789 }
let b = filterObject(a, "p, q") // b => { p: 456, q: 789 }
let c = filterObject(a, "p, q", false) // b => { m: 123, n: "hello" }
```

#### toFixed &ensp; 指定した小数点以下の桁数を保持

パラメーターの説明

``` typescript
function toFixed(num?: number | string, s?: number | string): string | undefined;
```

使用例

``` javascript
let a = 1.335
let m = a.toFixed(2) // m => 1.33 デフォルトのtoFixedメソッドを使用すると、通常の認識とは異なる結果になることがあります
let n = toFixed(a, 2) // n => 1.34
let p = toFixed(a) // p => 1
```

#### formSubmit &ensp; JavaScriptでフォームを送信し、ファイルをPOSTでダウンロードする

パラメーターの説明

``` typescript
function formSubmit(obj: FormOptions): void;
```

使用例

``` javascript
formSubmit({
  method: "post", // リクエストの種類
  action: "./hello", // リクエスト先のアドレス
  /* ... その他のフォームパラメーター */
  data: { name: "tom" } // リクエストのパラメーター
})
```

#### readText &ensp; テキストファイルを読み込む

パラメーターの説明

``` typescript
function readText(url: string): Promise<string>;
```

使用例

``` javascript
readText("./hello.txt")
.then(res => {
  console.log(res)
})
```

#### readJSON &ensp; JSONファイルを読み込む

パラメーターの説明

``` typescript
function readJSON(url: string): Promise<any>;
```

使用例

``` javascript
readJSON

("./hello.json")
.then(res => {
  console.log(res)
})
```

#### getStore &ensp; localStorageを読み込む。もしデータがJSON形式なら、直接JavaScriptのオブジェクトとして返されます

パラメーターの説明

``` typescript
function getStore(str: string): any;
```

使用例

``` javascript
/* キー: a, 値: { "m": "hello" } */
let b = getStore("a") // b => { m: "hello" }
```

#### setStore &ensp; localStorageを設定する。データがJavaScriptのオブジェクトの場合、JSONに変換して保存されます

パラメーターの説明

``` typescript
function setStore(str: string, data: any): void;
```

使用例

``` javascript
let a = { m: "hello" }
let b = "tom"
setStore('p', a) // キー: p, 値: { "m": "hello" }
setStore('q', b) // キー: q, 値: tom
```

#### Base64 &ensp; 文字列をBase64でエンコードとデコード

パラメーターの説明

``` typescript
interface Base64Options {
  readonly encode: (str: string) => string;
  readonly decode: (str: string) => string;
}
const Base64: Base64Options;
```

使用例

``` javascript
let a = Base64.encode("你好，Tom") // a => '5L2g5aW977yMVG9t'
let b = Base64.decode('5L2g5aW977yMVG9t') // b => "你好，Tom"
```

#### unid &ensp; 一意で重複しないID文字列を生成

パラメーターの説明

``` typescript
function unid(): string;
```

使用例

``` javascript
let a = unid() // a => 'xenj1qoj5lbei4nh2'
```

#### colorRGB &ensp; 色の値をR、G、B値で返す

パラメーターの説明

``` typescript
function colorRGB(str: string): Array<number> | undefined;
```

使用例

``` javascript
colorRGB("#f00") // [255, 0, 0]
colorRGB("#ff7300") // [255, 115, 0]
colorRGB("rgb(128, 55, 255)") // [128, 55, 255]
```