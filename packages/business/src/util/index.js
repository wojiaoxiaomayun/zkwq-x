import { Base64 } from '../util/base64'
import { AES_IV,AES_KEY } from '../constant'
import CryptoJS from 'crypto-js'

export const generateId = function() {
  return Math.floor(Math.random() * 10000)
}

export const randomString = function(length) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

export const isIE = function() {
  return !Vue.prototype.$isServer && !isNaN(Number(document.documentMode))
}

export const isEdge = function() {
  return !Vue.prototype.$isServer && navigator.userAgent.indexOf('Edge') > -1
}

export const isFirefox = function() {
  return !Vue.prototype.$isServer && !!window.navigator.userAgent.match(/firefox/i)
}

export const looseEqual = function(a, b) {
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b)
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

export const arrayEquals = function(arrayA, arrayB) {
  arrayA = arrayA || []
  arrayB = arrayB || []

  if (arrayA.length !== arrayB.length) {
    return false
  }

  for (let i = 0; i < arrayA.length; i++) {
    if (!looseEqual(arrayA[i], arrayB[i])) {
      return false
    }
  }

  return true
}

export const isEqual = function(value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return arrayEquals(value1, value2)
  }
  return looseEqual(value1, value2)
}

export const isEmpty = function(val) {

  if (val == null) return true

  if (typeof val === 'boolean') return false

  if (typeof val === 'number') return !val

  if (val instanceof Error) return val.message === ''

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length
    }
  }

  return false
}

export const isString = (obj) => {
  return Object.prototype.toString.call(obj) === '[object String]'
}

export const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export const isFunction = (functionToCheck) => {
  var getType = {}
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}

export const isUndefined = (val)=> {
  return val === void 0
}

export const isDefined = (val) => {
  return val !== undefined && val !== null
}

export const isSupportWebp = () => {
  try {
    return document.createElement('canvas').toDataURL('image/webp', 0.5).indexOf('data:image/webp') === 0
  } catch(err) {
    return false;
  }
}

export const isArrayContains = (arr, item) => {
  if (!isEmpty(arr)) {
    return arr.indexOf(item) !== -1
  } else {
    return false
  }
}

export const getStringLength = (str) => {
  let realLength = 0
  let len = str.length
  let charCode = -1
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) realLength += 1
    else realLength += 2
  }
  return realLength
}

export const scaleNumber = (val, scale) => {
  return Number(val).toFixed(scale)
}

/**
 * 获取URL参数值
 * @param name 参数名
 * @param mode 路由模式，默认HISTORY
 * @returns {string} 参数值
 */
export const getQueryString = (name, mode = 'history') => {
  if (mode === 'hash') {
    let search = window.location.hash.split('?')[1]
    if (search) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      let r = search.match(reg)
      if (r) {
        return decodeURIComponent(r[2])
      }
    }
  } else {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let r = window.location.search.substr(1).match(reg)
    if (r) {
      return decodeURIComponent(r[2])
    }
  }
  return ''
}

export const setStorage = (key, value, expire = 7200000) => {
  let data = {
    value: value,
    expire: expire,
    timestamp: Date.now(),
    isForever:expire == -1
  }
  window.localStorage.setItem(key, Base64.encode(JSON.stringify(data)))
}

export const getStorage = key => {
  let value = window.localStorage.getItem(key)
  if (!value) {
    return null
  }
  let data = JSON.parse(Base64.decode(value))
  if (!data.isForever && Date.now() > data.expire + data.timestamp) {
    window.localStorage.removeItem(key)
    return null
  } else {
    return data.value
  }
}

export const removeStorage = key => {
  window.localStorage.removeItem(key)
}


export const setSession= (key, value, expire = 72000000) => {
  let data = {
    value: value,
    expire: expire,
    timestamp: Date.now()
  }
  window.sessionStorage.setItem(key, Base64.encode(JSON.stringify(data)))
}

export const getSession = key => {
  let value = window.sessionStorage.getItem(key)
  if (!value) {
    return null
  }
  let data = JSON.parse(Base64.decode(value))
  if (Date.now() > data.expire + data.timestamp) {
    window.localStorage.removeItem(key)
    return null
  } else {
    return data.value
  }
}

export const removeSession = key => {
  window.sessionStorage.removeItem(key)
}


/**
 * 数字格式化
 * 5416252 => 5,416,252
 */
export const formatNumber = val => {
  val = '' + val
  let length = val.length
  let count = 0
  let result = ''
  for (let i = length - 1; i >= 0; i--) {
    let c = val.charAt(i)
    result += c
    count++
    if (count % 3 === 0 && i !== 0) {
      result += ','
    }
  }
  return result.split('').reverse().join('')
}

/**
 * 数字格式化
 * 6252 => 6.2K
 */
export const formatKNumber = val => {
  let result = val / 1000
  if (result < 1) {
    return val
  }
  if (result < 10) {
    return result.toFixed(1) + 'K'
  }
  if (result >= 10) {
    return result.toFixed(0) + 'k'
  }
}

export const getPlainUrl = url => {
  if (url) {
    return url.indexOf('?') !== -1 ? url.substring(0, url.indexOf('?')) : url
  }
  return null
}

/**
 * 手机号验证
 * @param rule
 * @param value
 * @param callback
 * @constructor
 */
export const ValidateMobile = (rule, value, callback) => {
  if (!value.number) {
    callback(new Error('请输入手机号'))
  } else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/gi.test(value.number))) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}
/**
 * 手机验证码验证
 * @param rule
 * @param value
 * @param callback
 */
export const ValidateMobileCode = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入短信验证码'))
  } else if (value.length !== 6) {
    callback(new Error('验证码填写错误'))
  } else if (!Number.isInteger(value - 0)) {
    callback(new Error('验证码填写错误'))
  } else {
    callback()
  }
}
/**
 * 验证码验证
 * @param rule
 * @param value
 * @param callback
 */
export const ValidateCaptcha = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入验证码'))
  } else if (!Number.isInteger(value - 0)) {
    callback(new Error('验证码填写错误'))
  } else {
    callback()
  }
}
/**
 * 邮箱验证
 * @param rule
 * @param value
 * @param callback
 * @constructor
 */
export const ValidateEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入邮箱'))
  } else if (!(/^\w+@([\da-z\.-]+)\.([a-z]+|[\u2E80-\u9FFF]+)$/gi.test(value))) {
    callback(new Error('请输入正确的邮箱'))
  } else {
    callback()
  }
}
/**
 * 邮箱验证码验证
 * @param rule
 * @param value
 * @param callback
 */
export const ValidateEmailCode = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入邮箱验证码'))
  } else if (value.length !== 6) {
    callback(new Error('验证码填写错误'))
  } else if (!Number.isInteger(value - 0)) {
    callback(new Error('验证码填写错误'))
  } else {
    callback()
  }
}

export const ClearInterval = (timer) => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

export const ClearTimeout = (timer) => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

export const ConvertArrayToString = (array, splitSign = ',') => {
  if (array && array.length > 0 && array[0] !== null && array[0] !== 'null') {
    if(typeof array == 'string'){
      return array
    }
    return array.join(splitSign)
  }
  return ''
}

export const ConvertStringToArray = (str, splitSign = ',') => {
  if (str) {
    return str.split(splitSign)
  }
  return []
}

export const isArrayEmpty = (array) => {
  return !(array && ((array.length > 0 && array.length !== 1) || (array.length === 1 && array[0] && array[0] !== 'null')))
}

export const clearHighlight = (str) => {
  if (!str) {
    return ''
  }
  return str.replace(/<span class="Highlight">/g, '').replace(/<\/span>/g, '')
}

export const AESEncode = (message,aesKeyStr = AES_KEY,aesIvStr = AES_IV) => {
  let aesKey = CryptoJS.enc.Utf8.parse(aesKeyStr)
  let aesIv = CryptoJS.enc.Utf8.parse(aesIvStr)
  let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(message), aesKey, { iv: aesIv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.ciphertext.toString()
}

export const AESDecode = (message,aesKeyStr = AES_KEY,aesIvStr = AES_IV) => {
  let aesKey = CryptoJS.enc.Utf8.parse(aesKeyStr)
  let aesIv = CryptoJS.enc.Utf8.parse(aesIvStr)
  let decrypt = CryptoJS.AES.decrypt(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(message)), aesKey, { iv: aesIv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return decrypt.toString(CryptoJS.enc.Utf8)
}
export const AESEncodeBase64 = (message,aesKeyStr = AES_KEY,aesIvStr = AES_IV) => {
  let aesKey = CryptoJS.enc.Utf8.parse(aesKeyStr)
  let aesIv = CryptoJS.enc.Utf8.parse(aesIvStr)
  let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(message), aesKey, { iv: aesIv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64)
}

export const AESDecodeBase64 = (message,aesKeyStr = AES_KEY,aesIvStr = AES_IV) => {
  let aesKey = CryptoJS.enc.Utf8.parse(aesKeyStr)
  let aesIv = CryptoJS.enc.Utf8.parse(aesIvStr)
  let decrypt = CryptoJS.AES.decrypt(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Base64.parse(message)), aesKey, { iv: aesIv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return decrypt.toString(CryptoJS.enc.Utf8)
}

export const HasChinese = str => {
  let regex = /.*[\u4e00-\u9fa5]+.*$/
  return regex.test(str)
  // return !(escape(str).indexOf( '%u' ) < 0)
}
export const HasWhiteSpace = str => {
  return str.indexOf(' ') !== -1
}

export const IsNumber = val => {
  return typeof val === 'number';
}

/**
 * 文件下载
 * @param base64File
 * @param fileName
 * @constructor
 */
 export const DownloadFile = (base64File, fileName) => {
  let blob = Base64toBlob(base64File)
  let a = document.createElement('a')
  a.href = window.URL.createObjectURL(blob)
  a.setAttribute('download', fileName)
  a.target = 'downloadIframe'
  a.click()
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blob, fileName)
  }
}

/**
 * Base64转换Blob
 * @param base64Data
 * @param contentType
 * @param sliceSize
 * @returns {Blob}
 * @constructor
 */
export const Base64toBlob = (base64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = window.atob(base64Data)
  const byteArrays = []
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)
    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
  const blob = new Blob(byteArrays, {type: contentType})
  return blob
}

/**
 * 文件下载
 * @param base64File
 * @param fileName
 * @constructor
 */
export const DownloadUrl = (url, fileName) => {
  let a = document.createElement('a')
  a.href = url
  a.setAttribute('download', fileName)
  a.target = 'downloadIframe'
  a.click()
}


/**
 * 交换数组两个元素位置
 * @param arr
 * @param src
 * @param dest
 * @returns {*}
 * @constructor
 */
 export const ArraySwapItems = (arr, src, dest) => {
  arr[src] = arr.splice(dest, 1, arr[src])[0]
  return arr
}

export const ArrayValueEquals = (a, b) => {
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};


/**
 * 数组元素向上一位
 * @param arr
 * @param index
 * @constructor
 */
export const ArrayUpItem = (arr, index) => {
  if (index === 0) {
    return
  }
  ArraySwapItems(arr, index, index - 1)
}

/**
 * 数组元素向下一位
 * @param arr
 * @param index
 * @constructor
 */
export const ArrayDownItem = (arr, index) => {
  if (index === arr.length - 1) {
    return
  }
  ArraySwapItems(arr, index, index + 1)
}

export const CalcTextWidth = (text, font = 'normal 14px \'pingfang SC\',\'helvetica neue\',arial,\'hiragino sans gb\',\'microsoft yahei ui\',\'microsoft yahei\',simsun,sans-serif') => {
  let canvas = CalcTextWidth.canvas || (CalcTextWidth.canvas = document.createElement('canvas'))
  let context = canvas.getContext('2d')
  context.font = font
  let metrics = context.measureText(text)
  return metrics.width
}

export const ClearHtml = (text) => {
  return text.replace(/(<([^>]+)>)/gi, '');
}

export const GenerateNonce = length => {
  if (!length) {
    return null
  }
  let nonce = ''
  for (; nonce.length < length; nonce += Math.random().toString(36).substr(2).toUpperCase()) {}
  return nonce.substr(0, length)
}

export const isPDF = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = e => {
      const arr = (new Uint8Array(e.target.result)).subarray(0, 4)
      let header = ''
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16)
      }
      resolve(header.toUpperCase() === '25504446')
    }
    fileReader.onerror = reject
    fileReader.readAsArrayBuffer(file)
  })
}