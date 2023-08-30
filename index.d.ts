interface GeneralObject {
    [prop: string]: string | number | boolean | null | undefined;
}
interface Base64Options {
    readonly encode: (str: string) => string;
    readonly decode: (str: string) => string;
}
interface FormOptions {
    action?: string;
    method?: string;
    enctype?: string;
    data?: any;
}
declare const Base64: Base64Options;
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

declare const _default: {
    Base64: Base64Options;
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
};

export { Base64, Base64Options, FormOptions, GeneralObject, colorRGB, deepCopy, _default as default, filterObject, formSubmit, getQuery, getStore, queryString, readJSON, readText, setStore, toFixed, unid };
