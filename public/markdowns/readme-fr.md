### Langues

* [English](https://github.com/omlou/webtools#readme)
* [简体中文](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-zh.md)
* [日本語](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-ja.md)
* [한국어](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-ko.md)
* [Français](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-fr.md)

### Introduction

* Outils couramment utilisés dans le développement frontal
* Exemples : Encodage et décodage Base64, copie profonde des données, récupération des paramètres de l'URL, etc.

### Utilisation

#### Utilisation dans les projets traditionnels

```html
<script src="https://unpkg.com/@xlou/webtools@1.1.4/dist/umd/webtools.min.js"></script>
<!-- Il est recommandé de le télécharger et de l'utiliser localement -->
<script>
  /* Après avoir importé ce fichier JavaScript, un objet tools sera ajouté à la fenêtre (window) */
  let query = tools.getQuery()
  let str = Base64.encode("hello webtools")
</script>
```

#### Utilisation dans des projets avec Vue, React, Angular, etc.

Installation

``` bash
npm i @xlou/webtools -S
```

Utilisation dans main.js / main.ts

``` javascript
/* Importation des fonctions requises */
import { Base64, getQuery } from '@xlou/webtools'

let query = getQuery()
let str = Base64.encode("hello webtools")

/* Importation de l'ensemble du package */
import tools from '@xlou/webtools'

let query = tools.getQuery()
let str = tools.Base64.encode("hello webtools")
```

### API

#### deepCopy &ensp; Copie profonde des types de référence

Description des paramètres

```typescript
function deepCopy(obj: any, set?: Set<any>): any;
```

Exemple d'utilisation

``` javascript
let objA = { m: "hello", n: [1, 2, 3] }
let objB = deepCopy(a) // objB => { m: "hello", n: [1, 2, 3] }
objA.m = "hi"
objB.n[0] = 4 // objB => { m: "hi", n: [4, 2, 3] }
console.log(objA) // objA => { m: "hello", n: [1, 2, 3] }
```

#### getQuery &ensp; Récupération des paramètres de l'URL

Description des paramètres

``` typescript
interface GeneralObject {
  [prop: string]: string | number | boolean | null | undefined;
}
function getQuery(href?: string): GeneralObject;
/* Si href n'est pas spécifié, les paramètres de l'URL de la page actuelle seront récupérés */
```

Exemple d'utilisation

``` javascript
/* Supposons que l'URL de la page soit www.xxx.com?name=tom&id=1 */
let q0 = getQuery() // q0 => { name: "tom", id: 1 }
let q1 = getQuery("www.xxx.com?type=1") // q1 => { type: 1 }
```

#### queryString &ensp; Conversion d'un objet en paramètres d'URL

Description des paramètres

``` typescript
function queryString(obj: GeneralObject, bol?: boolean): string;
```

Exemple d'utilisation

``` javascript
let a = { name: "tom", id: 1 }
let m = queryString(a) // m => "name=tom&id=1"
let n = queryString(a, true) // n => "?name=tom&id=1"
```

#### filterObject &ensp; Filtrage d'objets

Description des paramètres

``` typescript
function filterObject(obj: Object, str?: string, bol?: boolean): Object;
```

Exemple d'utilisation

``` javascript
let a = { m: 123, n: "hello", p: 456, q: 789 }
let b = filterObject(a, "p, q") // b => { p: 456, q: 789 }
let c = filterObject(a, "p, q", false) // b => { m: 123, n: "hello" }
```

#### toFixed &ensp; Arrondi à un certain nombre de décimales

Description des paramètres

``` typescript
function toFixed(num?: number | string, s?: number | string): string | undefined;
```

Exemple d'utilisation

``` javascript
let a = 1.335
let m = a.toFixed(2) // m => 1.33 En utilisant la méthode toFixed par défaut, les résultats peuvent différer des attentes habituelles
let n = toFixed(a, 2) // n => 1.34
let p = toFixed(a) // p => 1
```

#### formSubmit &ensp; Simulation de soumission de formulaire en JavaScript, souvent utilisée pour télécharger des fichiers avec la méthode POST

Description des paramètres

``` typescript
function formSubmit(obj: FormOptions): void;
```

Exemple d'utilisation

``` javascript
formSubmit({
  method: "post", // Type de requête
  action: "./hello", // Adresse de la requête
  /* ... Autres paramètres de formulaire */
  data: { name: "tom" } // Paramètres de la requête
})
```

#### readText &ensp; Lecture de fichiers texte

Description des paramètres

``` typescript
function readText(url: string): Promise<string>;
```

Exemple d'utilisation

``` javascript
readText("./hello.txt")
.then(res => {
  console.log(res)
})
```

#### readJSON &ensp; Lecture de fichiers JSON

Description des paramètres

``` typescript
function readJSON(url: string): Promise<any>;
```

Exemple d'utilisation

``` javascript
readJSON("./hello.json")
.then(res => {
  console.log(res)
})
```

#### getStore &ensp; Lecture de données depuis le stockage localStorage ; si c'est du JSON, un objet JavaScript est renvoyé directement

Description des paramètres

``` typescript
function getStore(str: string): any;
```

Exemple d'utilisation

``` javascript
/* Clé : a, Valeur : { "m": "hello" } */
let b = getStore("a") // b => { m: "hello" }
```

#### setStore &ensp; Stockage de données dans le localStorage ; si les données sont un objet JavaScript, elles sont converties en JSON avant d'être stockées

Description des paramètres

``` typescript
function setStore(str: string, data: any): void;
```

Exemple d'utilisation

``` javascript
let a =

 { m: "hello" }
let b = "tom"
setStore('p', a) // Clé : p, Valeur : { "m": "hello" }
setStore('q', b) // Clé : q, Valeur : tom
```

#### Base64 &ensp; Encodage et décodage Base64 des chaînes

Description des paramètres

``` typescript
interface Base64Options {
  readonly encode: (str: string) => string;
  readonly decode: (str: string) => string;
}
const Base64: Base64Options;
```

Exemple d'utilisation

``` javascript
let a = Base64.encode("Hello，Tom") // a => '5L2g5aW977yMVG9t'
let b = Base64.decode('5L2g5aW977yMVG9t') // b => "Hello，Tom"
```

#### unid &ensp; Génération d'une chaîne d'identifiant unique et non répétée

Description des paramètres

``` typescript
function unid(): string;
```

Exemple d'utilisation

``` javascript
let a = unid() // a => 'xenj1qoj5lbei4nh2'
```

#### colorRGB &ensp; Renvoie les valeurs R, G et B d'une couleur

Description des paramètres

``` typescript
function colorRGB(str: string): Array<number> | undefined;
```

Exemple d'utilisation

``` javascript
colorRGB("#f00") // [255, 0, 0]
colorRGB("#ff7300") // [255, 115, 0]
colorRGB("rgb(128, 55, 255)") // [128, 55, 255]
```