### 언어

* [English](https://github.com/omlou/webtools#readme)
* [简体中文](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-zh.md)
* [日本語](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-ja.md)
* [한국어](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-ko.md)
* [Français](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-fr.md)

### 소개

* 프론트엔드 개발에서 자주 사용되는 도구들.
* 예시: Base64 인코딩/디코딩, 데이터의 깊은 복사, URL 매개변수 추출 등.

### 사용 방법

#### 전통 프로젝트에서 사용

```html
<script src="https://unpkg.com/@xlou/webtools@1.1.7/dist/umd/webtools.min.js"></script>
<!-- 파일을 다운로드하고 로컬로 사용하는 것이 좋습니다. -->
<script>
  /* 이 JS 파일을 포함한 후, tools 객체는 window에서 사용 가능합니다. */
  let query = tools.getQuery()
</script>
```

#### Vue, React, Angular 및 기타 Node 프로젝트에서 사용

설치

``` bash
npm i @xlou/webtools -S
```

main.js 또는 main.ts에서

``` javascript
/* 특정 함수 사용 */
import { getQuery } from '@xlou/webtools'

let query = getQuery()

/* 전체 패키지 사용 */
import tools from '@xlou/webtools'

let query = tools.getQuery()
```

### API

#### deepCopy &ensp; 참조 유형을 위한 깊은 복사

매개변수 세부 정보

```typescript
function deepCopy(obj: any, set?: Set<any>): any;
```

사용 예제

``` javascript
let objA = { m: "안녕", n: [1, 2, 3] }
let objB = deepCopy(a) // objB => { m: "안녕", n: [1, 2, 3] }
objA.m = "안녕하세요"
objB.n[0] = 4 // objB => { m: "안녕하세요", n: [4, 2, 3] }
console.log(objA) // objA => { m: "안녕", n: [1, 2, 3] }
```

#### getQuery &ensp; URL 매개변수 가져오기

매개변수 세부 정보

``` typescript
interface GeneralObject {
  [prop: string]: string | number | boolean | null | undefined;
}
function getQuery(href?: string): GeneralObject;
/* href를 제공하지 않으면 현재 페이지의 URL에서 매개변수를 가져옵니다. */
```

사용 예제

``` javascript
/* 현재 페이지의 URL이 www.xxx.com?name=tom&id=1인 경우 */
let q0 = getQuery() // q0 => { name: "tom", id: 1 }
let q1 = getQuery("www.xxx.com?type=1") // q1 => { type: 1 }
```

#### queryString &ensp; 객체를 쿼리 문자열로 변환

매개변수 세부 정보

``` typescript
function queryString(obj: GeneralObject, bol?: boolean): string;
```

사용 예제

``` javascript
let a = { name: "tom", id: 1 }
let m = queryString(a) // m => "name=tom&id=1"
let n = queryString(a, true) // n => "?name=tom&id=1"
```

#### filterObject &ensp; 객체 필터링

매개변수 세부 정보

``` typescript
function filterObject(obj: Object, str?: string, bol?: boolean): Object;
```

사용 예제

``` javascript
let a = { m: 123, n: "안녕", p: 456, q: 789 }
let b = filterObject(a, "p, q") // b => { p: 456, q: 789 }
let c = filterObject(a, "p, q", false) // b => { m: 123, n: "안녕" }
```

#### toFixed &ensp; 소수점 자릿수 형식 지정

매개변수 세부 정보

``` typescript
function toFixed(num?: number | string, s?: number | string): string | undefined;
```

사용 예제

``` javascript
let a = 1.335
let m = a.toFixed(2) // m => 1.33 기본 toFixed 메서드를 사용하면 예상치 못한 결과가 발생할 수 있습니다.
let n = toFixed(a, 2) // n => 1.34
let p = toFixed(a) // p => 1
```

#### formSubmit &ensp; 파일 다운로드를 위한 양식 제출 시뮬레이션

매개변수 세부 정보

``` typescript
function formSubmit(obj: FormOptions): void;
```

사용 예제

``` javascript
formSubmit({
  method: "post", // 요청 유형
  action: "./hello", // 요청 URL
  /* ... 다른 양식 매개변수 */
  data: { name: "tom" } // 요청 데이터
})
```

#### readText &ensp; 텍스트 파일 읽기

매개변수 세부 정보

``` typescript
function readText(url: string): Promise<string>;
```

사용 예제

``` javascript
readText("./hello.txt")
.then(res => {
  console.log(res)
})
```

#### readJSON &ensp; JSON 파일 읽기

매개변수 세부 정보

``` typescript
function readJSON(url: string): Promise<any>;
```

사용 예제

``` javascript
readJSON("./hello.json")
.then(res => {
  console.log(res)
})
```

#### getStore &ensp; localStorage에서 읽기, 적용 가능한 경우 JSON 구문 분석

매개변수 세부 정보

``` typescript
function getStore(str: string): any;
```

사용 예제

``` javascript
/* 키: a, 값: { "m": "안녕

" } */
let b = getStore("a") // b => { m: "안녕" }
```

#### setStore &ensp; localStorage에 쓰기, 객체를 JSON으로 구문 분석

매개변수 세부 정보

``` typescript
function setStore(str: string, data: any): void;
```

사용 예제

``` javascript
let a = { m: "안녕" }
let b = "tom"
setStore('p', a) // 키: p, 값: { "m": "안녕" }
setStore('q', b) // 키: q, 값: tom
```

#### Base64 &ensp; Base64를 사용하여 문자열 인코딩 및 디코딩

매개변수 세부 정보

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

사용 예제

``` javascript
const base64 = new Base64()
let a = base64.encode("안녕, 세계!") // a => 'wqTspIDtlITroIHsoJzsmqTslZkg'
let b = base64.decode('wqTspIDtlITroIHsoJzsmqTslZkg') // b => "안녕, 세계!"
```

#### unid &ensp; 고유한 ID 문자열 생성

매개변수 세부 정보

``` typescript
function unid(): string;
```

사용 예제

``` javascript
let a = unid() // a => 'xenj1qoj5lbei4nh2'
```

#### colorRGB &ensp; 색상에서 RGB 값을 가져오기

매개변수 세부 정보

``` typescript
function colorRGB(str: string): Array<number> | undefined;
```

사용 예제

``` javascript
colorRGB("#f00") // [255, 0, 0]
colorRGB("#ff7300") // [255, 115, 0]
colorRGB("rgb(128, 55, 255)") // [128, 55, 255]
```

#### clipboardWrite &ensp; 지정된 내용을 클립보드에 복사합니다.

매개변수 세부 정보

``` typescript
function clipboardWrite(content: any, type?: string): Promise<void>;
```

사용 예제

``` javascript
function copyText() {
  clipboardWrite("안녕, 세계!") // 'type' 매개변수를 지정하지 않으면 'text/plain'으로 기본 설정됩니다.
  .then(() => {
    console.log("복사 성공")
  })
}
async function copyImage() {
  const res = await fetch("./flower.png")
  const blob = await res.blob()
  clipboardWrite(blob, blob.type)
  .then(() => {
    console.log("복사 성공")
  })
}
```