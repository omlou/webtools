### 언어

* [English](https://github.com/omlou/webtools#readme)
* [简体中文](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-zh.md)
* [日本語](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-ja.md)
* [한국어](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-ko.md)
* [Français](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-fr.md)

### 소개

* 프론트엔드 개발에서 자주 사용되는 도구들입니다.
* 예시: Base64 인코딩/디코딩, 데이터 깊은 복사, URL 매개변수 추출 등.

### 사용법

#### 전통적인 프로젝트에서 사용하기

```html
<script src="https://unpkg.com/@xlou/webtools@1.1.6/dist/umd/webtools.min.js"></script>
<!-- 파일을 로컬로 다운로드하여 사용하는 것이 좋습니다. -->
<script>
  /* 이 JS 파일을 포함한 후, tools 객체가 window에 사용 가능해집니다 */
  let query = tools.getQuery()
  let str = Base64.encode("hello webtools")
</script>
```

#### Vue, React, Angular 및 기타 Node 프로젝트에서 사용하기

설치

```bash
npm i @xlou/webtools -S
```

`main.js` 또는 `main.ts`에서

```javascript
/* 특정 함수 사용 */
import { Base64, getQuery } from '@xlou/webtools'

let query = getQuery()
let str = Base64.encode("hello webtools")

/* 전체 패키지 사용 */
import tools from '@xlou/webtools'

let query = tools.getQuery()
let str = tools.Base64.encode("hello webtools")
```

### API

#### deepCopy &ensp; 참조 유형에 대한 깊은 복사

매개 변수 정보

```typescript
function deepCopy(obj: any, set?: Set<any>): any;
```

사용 예시

```javascript
let objA = { m: "hello", n: [1, 2, 3] }
let objB = deepCopy(a) // objB => { m: "hello", n: [1, 2, 3] }
objA.m = "hi"
objB.n[0] = 4 // objB => { m: "hi", n: [4, 2, 3] }
console.log(objA) // objA => { m: "hello", n: [1, 2, 3] }
```

#### getQuery &ensp; URL 매개변수 가져오기

매개 변수 정보

```typescript
interface GeneralObject {
  [prop: string]: string | number | boolean | null | undefined;
}
function getQuery(href?: string): GeneralObject;
/* href가 제공되지 않으면 현재 페이지의 URL에서 매개변수를 가져옵니다 */
```

사용 예시

```javascript
/* 현재 페이지의 URL이 www.xxx.com?name=tom&id=1 인 경우 */
let q0 = getQuery() // q0 => { name: "tom", id: 1 }
let q1 = getQuery("www.xxx.com?type=1") // q1 => { type: 1 }
```

#### queryString &ensp; 객체를 쿼리 문자열로 변환

매개 변수 정보

```typescript
function queryString(obj: GeneralObject, bol?: boolean): string;
```

사용 예시

```javascript
let a = { name: "tom", id: 1 }
let m = queryString(a) // m => "name=tom&id=1"
let n = queryString(a, true) // n => "?name=tom&id=1"
```

#### filterObject &ensp; 객체 필터링

매개 변수 정보

```typescript
function filterObject(obj: Object, str?: string, bol?: boolean): Object;
```

사용 예시

```javascript
let a = { m: 123, n: "hello", p: 456, q: 789 }
let b = filterObject(a, "p, q") // b => { p: 456, q: 789 }
let c = filterObject(a, "p, q", false) // b => { m: 123, n: "hello" }
```

#### toFixed &ensp; 소수 자릿수 서식 지정

매개 변수 정보

```typescript
function toFixed(num?: number | string, s?: number | string): string | undefined;
```

사용 예시

```javascript
let a = 1.335
let m = a.toFixed(2) // m => 1.33 기본 toFixed 메서드를 사용하면 예상치 못한 결과가 나올 수 있습니다
let n = toFixed(a, 2) // n => 1.34
let p = toFixed(a) // p => 1
```

#### formSubmit &ensp; 파일 다운로드를 위한 Form 제출 시뮬레이션

매개 변수 정보

```typescript
function formSubmit(obj: FormOptions): void;
```

사용 예시

```javascript
formSubmit({
  method: "post", // 요청 유형
  action: "./hello", // 요청 URL
  /* ... 기타 form 매개변수 */
  data: { name: "tom" } // 요청 데이터
})
```

#### readText &ensp; 텍스트 파일 읽기

매개 변수 정보

```typescript
function readText(url: string): Promise<string>;
```

사용 예시

```javascript
readText("./hello.txt")
.then(res => {
  console.log(res)
})
```

#### readJSON &ensp; JSON 파일 읽기

매개 변수 정보

```typescript
function readJSON(url: string): Promise<any>;
```

사용 예시

```javascript
readJSON("./hello.json")
.then(res => {
  console.log(res)
})
```

#### getStore &ensp; localStorage에서 읽기, 적용 가능한 경우 JSON 파싱

매개 변수 정보

```typescript
function getStore(str: string): any;
```

사용 예시

```javascript
/* 키: a, 값: { "m": "hello" } */
let b = getStore("a") // b => { m: "hello" }
```

#### setStore &ensp; localStorage에 쓰기, 객체를 JSON으로 변환하여 적용 가능한 경우

매개 변수 정보

```typescript
function setStore(str: string, data: any): void;
```

사용 예시

```javascript
let a = { m: "hello" }
let b = "tom"
setStore('p', a) // 키: p, 값: { "m": "hello" }
setStore('q', b) // 키: q, 값: tom
```

#### Base64 &ensp; Base64를 사용하여 문자열 인코딩 및 디코딩

매개 변수 정보

```typescript
interface Base64Options {
  readonly encode: (

str: string) => string;
  readonly decode: (str: string) => string;
}
const Base64: Base64Options;
```

사용 예시

```javascript
let a = Base64.encode("Hello, Tom") // a => '5L2g5aW977yMVG9t'
let b = Base64.decode('5L2g5aW977yMVG9t') // b => "Hello, Tom"
```

#### unid &ensp; 고유한 ID 문자열 생성

매개 변수 정보

```typescript
function unid(): string;
```

사용 예시

```javascript
let a = unid() // a => 'xenj1qoj5lbei4nh2'
```

#### colorRGB &ensp; 색상의 RGB 값을 가져오기

매개 변수 정보

```typescript
function colorRGB(str: string): Array<number> | undefined;
```

사용 예시

```javascript
colorRGB("#f00") // [255, 0, 0]
colorRGB("#ff7300") // [255, 115, 0]
colorRGB("rgb(128, 55, 255)") // [128, 55, 255]
```