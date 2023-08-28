interface GeneralObject {
  [prop: string]: string | number | boolean | null | undefined
}

interface Base64Options {
  readonly encode: (str: string) => string
  readonly decode: (str: string) => string
}

function utf8_encode(str: string): string {
  str = str.replace(/\r\n/g, "\n")
  let utftext = ""
  for (let n = 0; n < str.length; n++) {
    let c = str.charCodeAt(n)
    if (c < 128) {
      utftext += String.fromCharCode(c)
    } else if ((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192)
      utftext += String.fromCharCode((c & 63) | 128)
    } else {
      utftext += String.fromCharCode((c >> 12) | 224)
      utftext += String.fromCharCode(((c >> 6) & 63) | 128)
      utftext += String.fromCharCode((c & 63) | 128)
    }
  }
  return utftext
}

function utf8_decode(utftext: string): string {
  let str = ""
  let i = 0
  let c = 0, c1 = 0, c2 = 0;
  while (i < utftext.length) {
    c = utftext.charCodeAt(i)
    if (c < 128) {
      str += String.fromCharCode(c)
      i++
    } else if ((c > 191) && (c < 224)) {
      c1 = utftext.charCodeAt(i + 1)
      str += String.fromCharCode(((c & 31) << 6) | (c1 & 63))
      i += 2
    } else {
      c1 = utftext.charCodeAt(i + 1)
      c2 = utftext.charCodeAt(i + 2)
      str += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63))
      i += 3
    }
  }
  return str
}

const key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

/* Base64 的转码和解码 */
const Base64: Base64Options = {
  encode: function (input: string): string {
    let output = ""
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0
    input = utf8_encode(input)
    while (i < input.length) {
      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)
      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63
      if (isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN(chr3)) {
        enc4 = 64
      }
      output = output + key.charAt(enc1) + key.charAt(enc2) + key.charAt(enc3) + key.charAt(enc4)
    }
    return output
  },
  decode: function (input: string): string {
    let output = ""
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "")
    while (i < input.length) {
      enc1 = key.indexOf(input.charAt(i++))
      enc2 = key.indexOf(input.charAt(i++))
      enc3 = key.indexOf(input.charAt(i++))
      enc4 = key.indexOf(input.charAt(i++))
      chr1 = (enc1 << 2) | (enc2 >> 4)
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
      chr3 = ((enc3 & 3) << 6) | enc4
      output = output + String.fromCharCode(chr1)
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2)
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3)
      }
    }
    output = utf8_decode(output)
    return output
  }
}

/* 引用数据类型的深拷贝 */
function deepCopy(obj: Object, set: Set<Object> = new Set()): Object{
  if (typeof obj !== 'object' || obj === null) return obj
  if (set.has(obj)) return obj // 防止爆栈
  set.add(obj)
  let res: any;
  switch (obj.constructor) {
    case Array: {
      res = []
      for (let item of (obj as [])) {
        res.push(deepCopy(item, set))
      }
      break
    }
    case Set: {
      res = new Set();
      (obj as Set<any>).forEach(item => {
        res.add(deepCopy(item, set))
      })
      break
    }
    case Map: {
      res = new Map();
      (obj as Map<any, any>).forEach((item, i) => {
        res.set(deepCopy(i, set), deepCopy(item, set))
      })
      break
    }
    default: {
      res = {}
      for (let i in obj) {
        res[i] = deepCopy((obj as any)[i], set)
      }
    }
  }
  return res
}

/* 赛选对象中的属性，返回一个新的对象 */
function filterObject(obj: Object, str?: string, bol?: boolean): Object {
  let res: any = {}
  if (!str) return Object.assign(res, obj)
  let arr = str.split(",")
  if (bol === undefined) bol = true
  if (bol) {
    for (let item of arr) {
      (obj as any)[item] && (res[item] = (obj as any)[item]);
    }
  } else {
    Object.assign(res, obj)
    for (let item of arr) {
      delete res[item]
    }
  }
  return res
}

/* 将 url 中的参数转换为对象 */
function getQuery(href: string = window.location.href): GeneralObject {
  let qobj = {}
  let start = href.indexOf("?")
  if (start === -1) return qobj
  let end: any = href.indexOf("#")
  if (end === -1 || start > end) {
    end = undefined
  }
  let search = href.slice(start + 1, end)
  if (search === "") return qobj
  let qarr = search.split("&")
  for (let item of qarr) {
    if (!item) continue
    let itemarr = item.split("=");
    (qobj as any)[decodeURIComponent(itemarr[0])] = decodeURIComponent((itemarr[1] || ""))
  }
  return qobj
}

/* 将对象转换为 url 参数 */
function queryString(obj: GeneralObject, bol: boolean = false): string {
  let arr = []
  for (let i in obj) {
    if (obj[i] === null || obj[i] === undefined) obj[i] = ""
    arr.push(encodeURIComponent(i) + '=' + encodeURIComponent((obj as any)[i]))
  }
  let str = arr.join('&')
  return (str && bol) ? '?' + str : str
}

/* 保留几位小数 */
function toFixed(num?: number | string, s?: number | string): string | undefined {
  if (num === undefined) { // 第一个参数为undefined
    return undefined
  }
  let numn = Number(num)
  if (isNaN(numn)) { // 第一个参数不是数字
    throw "argument for toFixed error"
  }
  if (numn > Math.pow(10,21)) { // 第一个参数太大
    return String(numn)
  }
  let sn = Number(s)
  if (s === undefined || sn == 0) { // 没有第二个参数或者第二个数可以被Number()转化成0
    return String(Math.round(numn))
  }
  if (isNaN(sn)) { // 第二个参数不是个数字
    throw "The argument of C.toFixed must be a number"
  }
  if (sn > 20 || sn < 0) { // 第二个参数超出范围
    throw "The second argument of C.toFixed must be between 0 and 20"
  }
  let nums: string | number = String(numn)
  let numarr = nums.split(".")
  if (numarr.length < 2) {
    nums += "."
    for (let i = 0; i < sn; i++) {
      nums += "0"
    }
    return nums
  }
  let int = numarr[0]
  let dec = numarr[1]
  if (dec.length == sn) {
    return nums
  }
  if (dec.length < sn) {
    for (let i = 0; i < sn - dec.length; i++){
      nums += "0"
    }
    return nums
  }
  nums = int + "." + dec.slice(0, sn)
  let last = dec.slice(sn, sn + 1)
  if (parseInt(last, 10) >= 5) {
    let x = 10 ** sn
    nums = ((parseFloat(nums) * x) + 1) / x
    nums = nums.toFixed(sn)
  }
  return nums
}