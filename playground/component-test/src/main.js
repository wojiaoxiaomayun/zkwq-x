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
CheckUpdate()
// onlineChangeBaseUI(null,{
//   primary:'red'
// })

// const messages = {
//   en: {
//     message: 'hello',
//     ...enLocale // 或者用 Object.assign({ message: 'hello' }, enLocale)
//   },
//   zh: {
//     message: '你好',
//     ...zhLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
//   }
// }
// // Create VueI18n instance with options
// const i18n = new VueI18n({
//   locale: 'en', // set locale
//   messages, // set locale messages
// })
Vue.use(BaseUI)
new Vue({
  render:h => h(App)
}).$mount('#app')