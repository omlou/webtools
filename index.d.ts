export interface Tools {
  filterObject:(obj:object,str?:string,bol?:boolean)=>object
  deepCopy:(obj:object)=>object
  getQuery:(href?:string)=>object
  queryString:(obj:object,bol?:boolean)=>string
  toFixed:(num:number|string,s?:number|string)=>string
  formSubmit:(obj:object)=>void
  readText:(url:string)=>Promise<any>
  readJSON:(url:string)=>Promise<any>
  getStore:(str:string)=>any
  setStore:(str:string,data:any)=>void
  unid:()=>string
  colorRGB:(str:string)=>Array<number>
  Base64:{
    encode:(str:string)=>string,
    decode:(str:string)=>string
  }
}
export declare const filterObject:Tools["filterObject"]
export declare const deepCopy:Tools["deepCopy"]
export declare const getQuery:Tools["getQuery"]
export declare const queryString:Tools["queryString"]
export declare const toFixed:Tools["toFixed"]
export declare const formSubmit:Tools["formSubmit"]
export declare const readText:Tools["readText"]
export declare const readJSON:Tools["readJSON"]
export declare const getStore:Tools["getStore"]
export declare const setStore:Tools["setStore"]
export declare const unid:Tools["unid"]
export declare const colorRGB:Tools["colorRGB"]
export declare const Base64:Tools["Base64"]
declare const tools:Tools
export default tools