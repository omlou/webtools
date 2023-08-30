function utf8_encode(str) {
    str = str.replace(/\r\n/g, "\n");
    let utftext = "";
    for (let n = 0; n < str.length; n++) {
        let c = str.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }
    return utftext;
}
function utf8_decode(utftext) {
    let str = "";
    let i = 0;
    let c = 0, c1 = 0, c2 = 0;
    while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
            str += String.fromCharCode(c);
            i++;
        }
        else if ((c > 191) && (c < 224)) {
            c1 = utftext.charCodeAt(i + 1);
            str += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
            i += 2;
        }
        else {
            c1 = utftext.charCodeAt(i + 1);
            c2 = utftext.charCodeAt(i + 2);
            str += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
            i += 3;
        }
    }
    return str;
}
const key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
/* Transcoding and decoding of Base64 */
const Base64 = {
    encode: function (input) {
        let output = "";
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
        input = utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + key.charAt(enc1) + key.charAt(enc2) + key.charAt(enc3) + key.charAt(enc4);
        }
        return output;
    },
    decode: function (input) {
        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = key.indexOf(input.charAt(i++));
            enc2 = key.indexOf(input.charAt(i++));
            enc3 = key.indexOf(input.charAt(i++));
            enc4 = key.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = utf8_decode(output).replace(/\u0000/g, "");
        return output;
    }
};
/* Deep copy of reference data types */
function deepCopy(obj, set = new Set()) {
    if (typeof obj !== 'object' || obj === null)
        return obj;
    if (set.has(obj))
        return obj; // 防止爆栈
    set.add(obj);
    let res;
    switch (obj.constructor) {
        case Array: {
            res = [];
            for (let item of obj) {
                res.push(deepCopy(item, set));
            }
            break;
        }
        case Set: {
            res = new Set();
            obj.forEach(item => {
                res.add(deepCopy(item, set));
            });
            break;
        }
        case Map: {
            res = new Map();
            obj.forEach((item, i) => {
                res.set(deepCopy(i, set), deepCopy(item, set));
            });
            break;
        }
        default: {
            res = {};
            for (let i in obj) {
                res[i] = deepCopy(obj[i], set);
            }
        }
    }
    return res;
}
/* Filter object properties and return a new object */
function filterObject(obj, str, bol) {
    let res = {};
    if (!str)
        return Object.assign(res, obj);
    let arr = str.split(",");
    if (bol === undefined)
        bol = true;
    if (bol) {
        for (let item of arr) {
            item = item.trim();
            obj[item] && (res[item] = obj[item]);
        }
    }
    else {
        Object.assign(res, obj);
        for (let item of arr) {
            delete res[item];
        }
    }
    return res;
}
/* Convert URL parameters to an object */
function getQuery(href = window.location.href) {
    let qobj = {};
    let start = href.indexOf("?");
    if (start === -1)
        return qobj;
    let end = href.indexOf("#");
    if (end === -1 || start > end) {
        end = undefined;
    }
    let search = href.slice(start + 1, end);
    if (search === "")
        return qobj;
    let qarr = search.split("&");
    for (let item of qarr) {
        if (!item)
            continue;
        let itemarr = item.split("=");
        qobj[decodeURIComponent(itemarr[0])] = decodeURIComponent((itemarr[1] || ""));
    }
    return qobj;
}
/* Convert an object to URL parameters */
function queryString(obj, bol = false) {
    let arr = [];
    for (let i in obj) {
        if (obj[i] === null || obj[i] === undefined)
            obj[i] = "";
        arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
    }
    let str = arr.join('&');
    return (str && bol) ? '?' + str : str;
}
/* Round to a specified number of decimal places */
function toFixed(num, s) {
    if (num === undefined) { // First argument is undefined
        return undefined;
    }
    let numn = Number(num);
    if (isNaN(numn)) { // First argument is not a number
        throw "argument for toFixed error";
    }
    if (numn > Math.pow(10, 21)) { // First argument is too large
        return String(numn);
    }
    let sn = Number(s);
    if (s === undefined || sn == 0) { // No second argument or second argument can be converted to 0
        return String(Math.round(numn));
    }
    if (isNaN(sn)) { // Second argument is not a number
        throw "The argument of C.toFixed must be a number";
    }
    if (sn > 20 || sn < 0) { // Second argument out of range
        throw "The second argument of C.toFixed must be between 0 and 20";
    }
    let nums = String(numn);
    let numarr = nums.split(".");
    if (numarr.length < 2) {
        nums += ".";
        for (let i = 0; i < sn; i++) {
            nums += "0";
        }
        return nums;
    }
    let int = numarr[0];
    let dec = numarr[1];
    if (dec.length == sn) {
        return nums;
    }
    if (dec.length < sn) {
        for (let i = 0; i < sn - dec.length; i++) {
            nums += "0";
        }
        return nums;
    }
    nums = int + "." + dec.slice(0, sn);
    let last = dec.slice(sn, sn + 1);
    if (parseInt(last, 10) >= 5) {
        let x = 10 ** sn;
        nums = ((parseFloat(nums) * x) + 1) / x;
        nums = nums.toFixed(sn);
    }
    return nums;
}
/* Simulate form submission, often used for POST downloading files */
function formSubmit(obj) {
    const { document } = window;
    const form = document.createElement("form");
    const { data } = obj;
    delete obj.data;
    for (let i in obj) {
        obj[i] && (form[i] = obj[i]);
    }
    form.style.display = "none";
    for (let i in data) {
        const input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", i);
        input.value = data[i];
        form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
}
/* Read text file */
function readText(url) {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = e => {
            res(xhr.response);
        };
        xhr.onerror = e => {
            rej(e);
        };
        xhr.open('GET', url, true);
        xhr.send();
    });
}
/* Read JSON file */
function readJSON(url) {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = e => {
            res(JSON.parse(xhr.response));
        };
        xhr.onerror = e => {
            rej(e);
        };
        xhr.open('GET', url, true);
        xhr.send();
    });
}
function getStore(str) {
    let storage = localStorage.getItem(str);
    if (typeof storage === "string") {
        try {
            storage = JSON.parse(storage);
        }
        catch (e) { }
    }
    return storage;
}
function setStore(str, data) {
    if (typeof data === 'object' && data !== null) {
        try {
            data = JSON.stringify(data);
        }
        catch (err) { }
    }
    localStorage.setItem(str, data);
}
function unid() {
    return Math.floor(Math.random() * 10e13).toString(36) + Date.now().toString(36);
}
function colorRGB(str) {
    const reg16 = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    const regRGB = /^(rgb\(|RGB\()[\s\S]+\)/;
    let co = str.toLowerCase();
    let res = [];
    if (reg16.test(co)) {
        if (co.length === 4) {
            let conew = "#";
            for (let i = 1; i < 4; i += 1) {
                conew += co.slice(i, i + 1).concat(co.slice(i, i + 1));
            }
            co = conew;
        }
        for (let i = 1; i < 7; i += 2) {
            res.push(parseInt("0x" + co.slice(i, i + 2)));
        }
        return res;
    }
    if (regRGB.test(co)) {
        res = co.replace(/( |\(|\)|rgb|RGB)+/g, "").split(",");
        return res.map(Number);
    }
}
var index = {
    Base64,
    deepCopy,
    filterObject,
    getQuery,
    queryString,
    toFixed,
    formSubmit,
    readText,
    readJSON,
    getStore,
    setStore,
    unid,
    colorRGB
};

export { Base64, colorRGB, deepCopy, index as default, filterObject, formSubmit, getQuery, getStore, queryString, readJSON, readText, setStore, toFixed, unid };
