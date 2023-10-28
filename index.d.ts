interface GeneralObject {
    [prop: string]: string | number | boolean | null | undefined;
}
interface FormOptions {
    action?: string;
    method?: string;
    enctype?: string;
    data?: any;
}
declare class Base64 {
    constructor(key: string | undefined);
    private key;
    encode(input: string): string;
    decode(input: string): string;
    private utf8_encode;
    private utf8_decode;
}
declare function deepCopy(obj: any, set?: Set<any>): any;
declare function filterObject(obj: Object, str?: string, bol?: boolean): Object;
declare function getQuery(href?: string): GeneralObject;
declare function queryString(obj: GeneralObject, bol?: boolean): string;
declare function toFixed(num?: number | string, s?: number | string): string | undefined;
declare function formSubmit(obj: FormOptions): void;
declare function readText(url: string): Promise<string>;
declare function readJSON(url: string): Promise<any>;
declare function getStore(str: string): any;
declare function setStore(str: string, data: any): void;
declare function unid(): string;
declare function colorRGB(str: string): Array<number> | undefined;
declare function clipboardWrite(content: any, type?: string): Promise<void>;

declare const _default: {
    Base64: typeof Base64;
    deepCopy: typeof deepCopy;
    filterObject: typeof filterObject;
    getQuery: typeof getQuery;
    queryString: typeof queryString;
    toFixed: typeof toFixed;
    formSubmit: typeof formSubmit;
    readText: typeof readText;
    readJSON: typeof readJSON;
    getStore: typeof getStore;
    setStore: typeof setStore;
    unid: typeof unid;
    colorRGB: typeof colorRGB;
    clipboardWrite: typeof clipboardWrite;
};

export { Base64, FormOptions, GeneralObject, clipboardWrite, colorRGB, deepCopy, _default as default, filterObject, formSubmit, getQuery, getStore, queryString, readJSON, readText, setStore, toFixed, unid };
