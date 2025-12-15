// src/utils/signInterceptor.ts
import { BatchInterceptor } from '@mswjs/interceptors';
import { FetchInterceptor } from '@mswjs/interceptors/fetch';
import { XMLHttpRequestInterceptor } from '@mswjs/interceptors/XMLHttpRequest';
import CryptoJS from 'crypto-js';



export class ParamsEncry{
  SIGN_HEADER = 'X-Validate';
  TIMESTAMP_HEADER = 'X-Timestamp';
  NONCE_HEADER = 'X-Nonce';
  APP_SECRET = 'sk-adslfkogmelzdlkfotkeled';
  ignore = [];

  constructor(options = {}){
    this.SIGN_HEADER = options.SIGN_HEADER || this.SIGN_HEADER
    this.TIMESTAMP_HEADER = options.TIMESTAMP_HEADER || this.TIMESTAMP_HEADER
    this.NONCE_HEADER = options.NONCE_HEADER || this.NONCE_HEADER
    this.APP_SECRET = options.APP_SECRET || this.APP_SECRET
    this.ignore = options.ignore || this.ignore
  }
  init(){
    const interceptor = new BatchInterceptor({
      name: 'lightweight-sign',
      interceptors: [new FetchInterceptor(), new XMLHttpRequestInterceptor()],
    });

    interceptor.on('request', async ({ request }) => {
      const requestCloneForResponseEvent = request.clone()
      const url = new URL(requestCloneForResponseEvent.url);
      const method = requestCloneForResponseEvent.method.toUpperCase();

      if (this.ignore.some(p => url.pathname.includes(p))) return;

      const timestamp = Date.now().toString();
      const nonce = CryptoJS.lib.WordArray.random(16).toString();

      let rawString = '';

      // 1. GET / DELETE → query string 按 key=value&key=value 排序后拼接
      if (method === 'GET' || method === 'DELETE') {
        if (url.searchParams.entries().next().done === false) {
          const sorted = Array.from(url.searchParams.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([k, v]) => `${k}=${v}`)
            .join('&');
          rawString = sorted;
        }
      }
      else if (['POST', 'PUT', 'PATCH'].includes(method)) {
        const ct = (requestCloneForResponseEvent.headers.get('content-type') || '').toLowerCase();
        if (url.searchParams.entries().next().done === false) {
          const sorted = Array.from(url.searchParams.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([k, v]) => `${k}=${v}`)
            .join('&');
          rawString = sorted;
        }
        // 文件上传、流式、二进制直接跳过签名空字符串或固定值
        if (
          ct.includes('multipart/form-data') ||
          ct.includes('application/octet-stream') ||
          !requestCloneForResponseEvent.body
        ) {
          rawString += 'no-body'; // 或者写死一个值，比如 "no-body"
        } else {
          const text = await requestCloneForResponseEvent.text(); // 直接 await 读取
          rawString += text; // urlencoded 或 text
        }
      }
      // 最终签名字符串：method + path + query/body + timestamp + nonce + secret
      const signString = method + rawString + timestamp + nonce + this.APP_SECRET;
      const sign = CryptoJS.HmacSHA256(signString, this.APP_SECRET).toString();

      request.headers.set(this.SIGN_HEADER, sign);
      request.headers.set(this.TIMESTAMP_HEADER, timestamp);
      request.headers.set(this.NONCE_HEADER, nonce);
    });

    interceptor.apply(); // 全局生效
  }
}