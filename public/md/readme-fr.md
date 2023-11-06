### Langues

* [English](https://github.com/omlou/webtools#readme)
* [简体中文](https://github.com/omlou/webtools/blob/master/public/md/readme-zh.md)
* [日本語](https://github.com/omlou/webtools/blob/master/public/md/readme-ja.md)
* [한국어](https://github.com/omlou/webtools/blob/master/public/md/readme-ko.md)
* [Français](https://github.com/omlou/webtools/blob/master/public/md/readme-fr.md)

### Introduction

* Outils couramment utilisés en développement frontend.
* Exemples : Encodage/Décodage Base64, copie profonde des données, extraction des paramètres d'URL, etc.

### Utilisation

#### Utilisation dans des projets traditionnels

```html
<script src="https://unpkg.com/@xlou/webtools@1.1.9/dist/umd/webtools.min.js"></script>
<!-- Il est recommandé de télécharger le fichier et de l'utiliser localement -->
<script>
  /* Après avoir inclus ce fichier JS, l'objet tools sera disponible dans la fenêtre */
  let query = tools.getQuery()
</script>
```

#### Utilisation dans des projets Vue, React, Angular et autres projets Node

Installation

``` bash
npm i @xlou/webtools -S
```

Dans main.js ou main.ts

``` javascript
/* Utilisation de fonctions spécifiques */
import { getQuery } from '@xlou/webtools'

let query = getQuery()

/* Utilisation du package complet */
import tools from '@xlou/webtools'

let query = tools.getQuery()
```

### API

#### deepCopy &ensp; Copie profonde pour les types de référence

Détails des paramètres

```typescript
function deepCopy(obj: any, set?: Set<any>): any;
```

Exemple d'utilisation

``` javascript
let objA = { m: "bonjour", n: [1, 2, 3] }
let objB = deepCopy(a) // objB => { m: "bonjour", n: [1, 2, 3] }
objA.m = "salut"
objB.n[0] = 4 // objB => { m: "salut", n: [4, 2, 3] }
console.log(objA) // objA => { m: "bonjour", n: [1, 2, 3] }
```

#### getQuery &ensp; Obtenir les paramètres d'URL

Détails des paramètres

``` typescript
interface GeneralObject {
  [prop: string]: string | number | boolean | null | undefined;
}
function getQuery(href?: string): GeneralObject;
/* Si href n'est pas fourni, il obtient les paramètres de l'URL de la page actuelle. */
```

Exemple d'utilisation

``` javascript
/* Si l'URL de la page actuelle est www.xxx.com?name=tom&id=1 */
let q0 = getQuery() // q0 => { name: "tom", id: 1 }
let q1 = getQuery("www.xxx.com?type=1") // q1 => { type: 1 }
```

#### queryString &ensp; Convertir un objet en chaîne de requête

Détails des paramètres

``` typescript
function queryString(obj: GeneralObject, bol?: boolean): string;
```

Exemple d'utilisation

``` javascript
let a = { name: "tom", id: 1 }
let m = queryString(a) // m => "name=tom&id=1"
let n = queryString(a, true) // n => "?name=tom&id=1"
```

#### filterObject &ensp; Filtrer un objet

Détails des paramètres

``` typescript
function filterObject(obj: Object, str?: string, bol?: boolean): Object;
```

Exemple d'utilisation

``` javascript
let a = { m: 123, n: "bonjour", p: 456, q: 789 }
let b = filterObject(a, "p, q") // b => { p: 456, q: 789 }
let c = filterObject(a, "p, q", false) // b => { m: 123, n: "bonjour" }
```

#### toFixed &ensp; Format des décimales

Détails des paramètres

``` typescript
function toFixed(num?: number | string, s?: number | string): string | undefined;
```

Exemple d'utilisation

``` javascript
let a = 1.335
let m = a.toFixed(2) // m => 1.33 L'utilisation de la méthode toFixed par défaut peut entraîner des résultats inattendus
let n = toFixed(a, 2) // n => 1.34
let p = toFixed(a) // p => 1
```

#### formSubmit &ensp; Simuler la soumission de formulaire pour le téléchargement de fichiers

Détails des paramètres

``` typescript
function formSubmit(obj: FormOptions): void;
```

Exemple d'utilisation

``` javascript
formSubmit({
  method: "post", // Type de requête
  action: "./hello", // URL de la requête
  /* ... Autres paramètres de formulaire */
  data: { name: "tom" } // Données de la requête
})
```

#### readText &ensp; Lire des fichiers texte

Détails des paramètres

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

#### readJSON &ensp; Lire des fichiers JSON

Détails des paramètres

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

#### getStore &ensp; Lire depuis localStorage, analyse JSON si applicable

Détails des paramètres

``` typescript
function getStore(str: string): any;
```

Exemple d'utilisation

``` javascript
/* clé : a, valeur : {

 "m": "bonjour" } */
let b = getStore("a") // b => { m: "bonjour" }
```

#### setStore &ensp; Écrire dans localStorage, analyser les objets en JSON si applicable

Détails des paramètres

``` typescript
function setStore(str: string, data: any): void;
```

Exemple d'utilisation

``` javascript
let a = { m: "bonjour" }
let b = "tom"
setStore('p', a) // clé : p, valeur : { "m": "bonjour" }
setStore('q', b) // clé : q, valeur : tom
```

#### Base64 &ensp; Encoder et décoder des chaînes en utilisant Base64

Détails des paramètres

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

Exemple d'utilisation

``` javascript
const base64 = new Base64()
let a = base64.encode("Bonjour, le monde !") // a => 'SGVsbG8sIEJyb3duLCBsZS1tb25kIQ=='
let b = base64.decode('SGVsbG8sIEJyb3duLCBsZS1tb25kIQ==') // b => "Bonjour, le monde !"
```

#### unid &ensp; Générer une chaîne d'ID unique

Détails des paramètres

``` typescript
function unid(): string;
```

Exemple d'utilisation

``` javascript
let a = unid() // a => 'xenj1qoj5lbei4nh2'
```

#### colorRGB &ensp; Obtenir les valeurs RGB d'une couleur

Détails des paramètres

``` typescript
function colorRGB(str: string): Array<number> | undefined;
```

Exemple d'utilisation

``` javascript
colorRGB("#f00") // [255, 0, 0]
colorRGB("#ff7300") // [255, 115, 0]
colorRGB("rgb(128, 55, 255)") // [128, 55, 255]
```

#### clipboardWrite &ensp; Copier le contenu spécifié dans le presse-papiers.

Détails des paramètres

``` typescript
function clipboardWrite(content: any, type?: string): Promise<void>;
```

Exemple d'utilisation

``` javascript
function copyText() {
  clipboardWrite("Bonjour, le monde !") // Si le paramètre 'type' n'est pas spécifié, il est défini par défaut sur 'text/plain'.
  .then(() => {
    console.log("Copie réussie")
  })
}
async function copyImage() {
  const res = await fetch("./flower.png")
  const blob = await res.blob()
  clipboardWrite(blob, blob.type)
  .then(() => {
    console.log("Copie réussie")
  })
}
```