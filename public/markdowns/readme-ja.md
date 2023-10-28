### 言語

* [English](https://github.com/omlou/webtools#readme)
* [简体中文](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-zh.md)
* [日本語](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-ja.md)
* [한국어](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-ko.md)
* [Français](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-fr.md)

### 紹介

* フロントエンド開発でよく使用されるツール。
* 例: Base64エンコード/デコード、データの深いコピー、URLパラメータの抽出など。

### 使い方

#### 伝統的なプロジェクトで使用

```html
<script src="https://unpkg.com/@xlou/webtools@1.1.7/dist/umd/webtools.min.js"></script>
<!-- ファイルをダウンロードしてローカルで使用することをお勧めします。 -->
<script>
  /* このJSファイルを含めた後、toolsオブジェクトはwindowで利用可能になります。 */
  let query = tools.getQuery()
</script>
```

#### Vue、React、Angular、およびその他のNodeプロジェクトで使用

インストール

``` bash
npm i @xlou/webtools -S
```

main.jsまたはmain.tsで

``` javascript
/* 特定の関数を使用 */
import { getQuery } from '@xlou/webtools'

let query = getQuery()

/* パッケージ全体を使用 */
import tools from '@xlou/webtools'

let query = tools.getQuery()
```

### API

#### deepCopy &ensp; 参照型の深いコピー

パラメータの詳細

```typescript
function deepCopy(obj: any, set?: Set<any>): any;
```

使用例

``` javascript
let objA = { m: "こんにちは", n: [1, 2, 3] }
let objB = deepCopy(a) // objB => { m: "こんにちは", n: [1, 2, 3] }
objA.m = "こんにちは、世界"
objB.n[0] = 4 // objB => { m: "こんにちは、世界", n: [4, 2, 3] }
console.log(objA) // objA => { m: "こんにちは", n: [1, 2, 3] }
```

#### getQuery &ensp; URLパラメータの取得

パラメータの詳細

``` typescript
interface GeneralObject {
  [prop: string]: string | number | boolean | null | undefined;
}
function getQuery(href?: string): GeneralObject;
/* hrefが提供されない場合、現在のページのURLからパラメータを取得します。 */
```

使用例

``` javascript
/* 現在のページのURLがwww.xxx.com?name=tom&id=1の場合 */
let q0 = getQuery() // q0 => { name: "tom", id: 1 }
let q1 = getQuery("www.xxx.com?type=1") // q1 => { type: 1 }
```

#### queryString &ensp; オブジェクトをクエリ文字列に変換

パラメータの詳細

``` typescript
function queryString(obj: GeneralObject, bol?: boolean): string;
```

使用例

``` javascript
let a = { name: "tom", id: 1 }
let m = queryString(a) // m => "name=tom&id=1"
let n = queryString(a, true) // n => "?name=tom&id=1"
```

#### filterObject &ensp; オブジェクトのフィルタリング

パラメータの詳細

``` typescript
function filterObject(obj: Object, str?: string, bol?: boolean): Object;
```

使用例

``` javascript
let a = { m: 123, n: "こんにちは", p: 456, q: 789 }
let b = filterObject(a, "p, q") // b => { p: 456, q: 789 }
let c = filterObject(a, "p, q", false) // b => { m: 123, n: "こんにちは" }
```

#### toFixed &ensp; 小数点の桁数をフォーマット

パラメータの詳細

``` typescript
function toFixed(num?: number | string, s?: number | string): string | undefined;
```

使用例

``` javascript
let a = 1.335
let m = a.toFixed(2) // m => 1.33 デフォルトのtoFixedメソッドを使用すると予期しない結果が発生する可能性があります。
let n = toFixed(a, 2) // n => 1.34
let p = toFixed(a) // p => 1
```

#### formSubmit &ensp; ファイルのダウンロードをシミュレーションするフォームの提出

パラメータの詳細

``` typescript
function formSubmit(obj: FormOptions): void;
```

使用例

``` javascript
formSubmit({
  method: "post", // リクエストタイプ
  action: "./hello", // リクエストURL
  /* ... その他のフォームパラメータ */
  data: { name: "tom" } // リクエストデータ
})
```

#### readText &ensp; テキストファイルの読み取り

パラメータの詳細

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

#### readJSON &ensp; JSONファイルの読み取り

パラメータの詳細

``` typescript
function readJSON(url: string): Promise<any>;
```

使用例

``` javascript
readJSON("./hello.json")
.then(res => {
  console.log(res)
})
```

#### getStore &ensp; localStorageから読み取り、適用可能な

場合はJSONを解析

パラメータの詳細

``` typescript
function getStore(str: string): any;
```

使用例

``` javascript
/* キー: a, 値: { "m": "こんにちは" } */
let b = getStore("a") // b => { m: "こんにちは" }
```

#### setStore &ensp; localStorageに書き込み、オブジェクトをJSONに解析

パラメータの詳細

``` typescript
function setStore(str: string, data: any): void;
```

使用例

``` javascript
let a = { m: "こんにちは" }
let b = "tom"
setStore('p', a) // キー: p, 値: { "m": "こんにちは" }
setStore('q', b) // キー: q, 値: tom
```

#### Base64 &ensp; Base64を使用して文字列のエンコードおよびデコード

パラメータの詳細

``` typescript
class Base64 {
  constructor(key: string | undefined);
  private key;
  encode(input: string): string;
  decode(input: string): string;
  private utf8_encode;
  private utf8_decode;
}
```

使用例

``` javascript
const base64 = new Base64()
let a = base64.encode("こんにちは、世界!") // a => 'wqTspIDtlITroIHsoJzsmqTslZkg'
let b = base64.decode('wqTspIDtlITroIHsoJzsmqTslZkg') // b => "こんにちは、世界!"
```

#### unid &ensp; ユニークなID文字列の生成

パラメータの詳細

``` typescript
function unid(): string;
```

使用例

``` javascript
let a = unid() // a => 'xenj1qoj5lbei4nh2'
```

#### colorRGB &ensp; カラーからRGB値を取得

パラメータの詳細

``` typescript
function colorRGB(str: string): Array<number> | undefined;
```

使用例

``` javascript
colorRGB("#f00") // [255, 0, 0]
colorRGB("#ff7300") // [255, 115, 0]
colorRGB("rgb(128, 55, 255)") // [128, 55, 255]
```

#### clipboardWrite &ensp; 指定されたコンテンツをクリップボードにコピーします。

パラメータの詳細

``` typescript
function clipboardWrite(content: any, type?: string): Promise<void>;
```

使用例

``` javascript
function copyText() {
  clipboardWrite("こんにちは、世界!") // 'type'パラメータが指定されていない場合、デフォルトで'text/plain'になります。
  .then(() => {
    console.log("コピー成功")
  })
}
async function copyImage() {
  const res = await fetch("./flower.png")
  const blob = await res.blob()
  clipboardWrite(blob, blob.type)
  .then(() => {
    console.log("コピー成功")
  })
}
```