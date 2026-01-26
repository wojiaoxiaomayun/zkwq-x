import CaptchaDialog from '../components/normal/captcha/CaptchaDialog.vue';
import Vue from 'vue'

let isShow = false

export const createCaptchaDialog = () => {
  if(isShow){
    return
  }
  let Dialog = Vue.extend(CaptchaDialog)
  let dialog = new Dialog()
    // 监听 success 事件
  dialog.$on('on-success', (result) => {
    isShow = false
    window.location.reload()
  })
  dialog.$mount(document.createElement('div'))
  dialog.show()
  isShow = true
}
