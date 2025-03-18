import Vue from "vue";
import App from './App.vue'
import BaseUI from '@zkwq/business'
import '@zkwq/business/dist/index.min.css'
// import './theme.scss';
import {onlineChangeBaseUI} from '@zkwq/unplugin-color-change/dist/online'
import { CheckUpdate } from "@zkwq/unplugin-version-check/dist/online";
import VueI18n from 'vue-i18n'
import enLocale from '@zkwq/business/dist/locale/lang/en'
import zhLocale from '@zkwq/business/dist/locale/lang/zh-CN'
import ruLocale from '@zkwq/business/dist/locale/lang/ru-RU'
CheckUpdate()
// onlineChangeBaseUI(null,{
//   primary:'red'
// })
Vue.use(VueI18n)
const messages = {
  en: {
    message: 'hello',
    ...enLocale // 或者用 Object.assign({ message: 'hello' }, enLocale)
  },
  zh: {
    message: '你好',
    ...zhLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
  },
  ru: {
    message: '你好',
    ...ruLocale
  }
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages, // set locale messages
})
console.log(i18n)
Vue.use(BaseUI,{
  locale:zhLocale
})
new Vue({
  i18n:i18n,
  render:h => h(App)
}).$mount('#app')