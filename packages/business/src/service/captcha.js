import http from '../util/fetch'

export const GetCaptcha = key => { return http.get('/hky/api/v1/oauth/captcha', {key: key}) }
export const CheckCaptcha = (key, captcha) => { return http.post('/hky/open/oauth/api/v1/captcha', {key: key, captcha: captcha}) }