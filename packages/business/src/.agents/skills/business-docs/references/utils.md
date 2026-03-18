# 工具函数详细文档

## BaseUtil

```javascript
import { BaseUtil } from '@zkwq-x/business'
```

---

### 加密与哈希

#### MD5(message)
计算字符串的 MD5 哈希值。
```javascript
BaseUtil.MD5('hello world') // => '5eb63bbbe01eeed093cb22bb8f5acdc3'
```

#### AESEncode(message[, aesKeyStr, aesIvStr])
AES 加密，返回十六进制密文，默认使用内置 AES_KEY/AES_IV。
```javascript
const encrypted = BaseUtil.AESEncode('sensitive data')
```

#### AESDecode(message[, aesKeyStr, aesIvStr])
解密 AESEncode 产生的密文。

#### AESEncodeBase64 / AESDecodeBase64
AES 加密/解密，Base64 格式密文。

---

### ID 与字符串生成

| 函数 | 说明 | 返回 |
|------|------|------|
| `generateId()` | 0-9999 随机整数 | Number |
| `randomString(len)` | 随机小写字母+数字字符串 | String |
| `guid()` | UUID 字符串 | String |
| `GenerateNonce(len)` | 大写随机字符串，len 为空返回 null | String\|null |

---

### 数据验证与处理

```javascript
BaseUtil.isEmpty(null)         // true
BaseUtil.isEmpty('')           // true
BaseUtil.isEmpty([])           // true
BaseUtil.isEmpty({})           // true
BaseUtil.isArrayEmpty([])      // true
BaseUtil.isString('hello')     // true
BaseUtil.isObject({})          // true
BaseUtil.isFunction(() => {})  // true
BaseUtil.isDefined(null)       // false
BaseUtil.HasChinese('你好')    // true
BaseUtil.IsNumber(123)         // true
BaseUtil.isSupportWebp()       // Boolean
```

---

### 表单验证（Element-UI validator 规范）

```javascript
rules: {
  phone:     [{ validator: BaseUtil.ValidateMobile,     trigger: 'blur' }],
  smsCode:   [{ validator: BaseUtil.ValidateMobileCode, trigger: 'blur' }],
  captcha:   [{ validator: BaseUtil.ValidateCaptcha,    trigger: 'blur' }],
  email:     [{ validator: BaseUtil.ValidateEmail,      trigger: 'blur' }],
  emailCode: [{ validator: BaseUtil.ValidateEmailCode,  trigger: 'blur' }],
}
```

---

### 数字格式化

```javascript
BaseUtil.formatNumber(5416252)    // => '5,416,252'
BaseUtil.formatKNumber(6252)      // => '6.3K'
BaseUtil.formatKNumber(6252)      // 注意：10K 以上使用小写 k，如 formatKNumber(12000) => '12k'
BaseUtil.formatKNumber(500)       // => 500
BaseUtil.scaleNumber(3.14159, 2)  // => '3.14'（返回 string，Number.toFixed 结果）
```

---

### 数组/字符串转换

```javascript
BaseUtil.ConvertArrayToString(['张三', '李四'])       // => '张三,李四'
BaseUtil.ConvertArrayToString(['a', 'b'], ' | ')     // => 'a | b'
// 注意：若传入值本身已是 string，直接原样返回；首元素为 null/'null' 时返回 ''
BaseUtil.ConvertStringToArray('张三,李四')            // => ['张三', '李四']
BaseUtil.ConvertStringToArray('a|b', '|')            // 支持自定义分隔符
BaseUtil.clearHighlight('<span class="Highlight">高亮</span>文本') // => '高亮文本'
BaseUtil.ClearHtml('<p>内容</p>')                    // => '内容'
```

---

### 数组操作

| 函数 | 说明 |
|------|------|
| `ArraySwapItems(arr, src, dest)` | 交换两个元素位置 |
| `ArrayValueEquals(a, b)` | 严格比较两数组是否相同（文档误写为 `ArrayValueEquals`，源码实际导出名为 `ArrayValueEquals`，注意：内部实现用 `!==` 逐元素比较，非深比较） |
| `ArrayUpItem(arr, index)` | 元素上移一位 |
| `ArrayDownItem(arr, index)` | 元素下移一位 |
| `isArrayContains(arr, item)` | 检查是否包含元素 |

---

### 文件与下载

```javascript
BaseUtil.DownloadFile(base64Data, 'report.pdf')
BaseUtil.DownloadUrl('https://example.com/file.pdf', 'file.pdf')
BaseUtil.Base64toBlob(base64Data, 'application/pdf')  // => Blob
BaseUtil.isPDF(file).then(result => console.log(result)) // Promise<Boolean>
```

---

### 浏览器环境检测

```javascript
BaseUtil.isIE()      // Boolean
BaseUtil.isEdge()    // Boolean
BaseUtil.isFirefox() // Boolean
```

---

### URL 与参数处理

```javascript
// URL: https://example.com?id=123
BaseUtil.getQueryString('id')          // => '123'（找不到时返回 ''，不是 null）
BaseUtil.getQueryString('id', 'hash')  // hash 路由模式
BaseUtil.getPlainUrl('https://example.com/page?id=1') // => 'https://example.com/page'
// 注意：getPlainUrl 传入 null/undefined 时返回 null
```

---

### 数据存储

```javascript
// localStorage（默认 7200000ms = 2h 过期，-1 永不过期）
BaseUtil.setStorage('user', { id: 1 })
BaseUtil.setStorage('token', 'abc', -1)
const user = BaseUtil.getStorage('user')  // 过期返回 null
BaseUtil.removeStorage('user')

// sessionStorage（默认 72000000ms = 20h 过期，注意：无永不过期选项，且过期清除的是 localStorage 而非 sessionStorage，属已知 bug）
BaseUtil.setSession('temp', { page: 1 })
const data = BaseUtil.getSession('temp')
BaseUtil.removeSession('temp')
```

---

### 其他工具

```javascript
BaseUtil.ClearInterval(timer)              // 安全清除 setInterval
BaseUtil.ClearTimeout(timer)               // 安全清除 setTimeout
BaseUtil.CalcTextWidth('Hello', '14px sans-serif') // 文本像素宽度
BaseUtil.getStringLength('你好hello')      // => 9（中文×2 + 英文×1）
```

---

## Base64Util

```javascript
import { Base64Util } from '@zkwq-x/business'

Base64Util.encode('hello world')  // => 'aGVsbG8gd29ybGQ='
Base64Util.decode('aGVsbG8gd29ybGQ=')  // => 'hello world'
```

---

## http（HTTP 请求）

```javascript
import { http } from '@zkwq-x/business'

http.get('/api/data', params, config)
http.post('/api/data', { name: 'test' }, config)
http.postForm('/api/data', { name: 'test' })   // 以 application/x-www-form-urlencoded 提交
http.postBlob('/api/data', params)             // 返回 Blob，用于文件下载
http.put('/api/data/1', { name: 'updated' }, config)
http.delete('/api/data/1', params, config)
http.upload('/api/upload', [{ key: 'file', value: fileObj }]) // multipart/form-data 上传
```

> 所有方法均支持可选第三个参数 `config`（透传给 axios，可覆盖 `baseURL` 等）。`get` / `delete` 的第二个参数为 query params 对象。

---

## CONSTANT（业务常量）

```javascript
import { CONSTANT } from '@zkwq-x/business'
```

| 常量名 | 值 | 说明 |
|--------|-----|------|
| TYPE_ARTICLE | 'article' | 文章 |
| TYPE_PATENT | 'patent' | 专利 |
| TYPE_REPORT | 'report' | 报告 |
| TYPE_BOOK | 'book' | 图书 |
| TYPE_HANDBOOK | 'handbook' | 手册 |
| TYPE_PROJECT | 'project' | 项目 |
| TYPE_SCIENCE_DB | 'sciencedata' | 科学数据 |
| TYPE_SOFTWARE | 'software' | 软件 |
| TYPE_MONOGRAPH | 'monograph' | 专著 |
| TYPE_AWARD | 'award' | 奖项 |
| TYPE_LITERATURE | 'literature' | 文献 |
| TYPE_NEWS | 'news' | 新闻 |
| TYPE_JOURNAL | 'journal' | 期刊 |
| TYPE_CHINAXIV | 'chinaxiv' | ChinaXiv |
| TYPE_BULLETIN | 'bulletin' | 公告 |
| TYPE_BULLETIN_REPORT | 'bulletin_report' | 公告报告 |
| TYPE_FAVLIST | 'favlist' | 收藏列表 |
| TYPE_COMMENT | 'comment' | 评论 |
| VOTE_TYPE_NEUTRAL | 'neutral' | 中立投票 |
| VOTE_TYPE_UP | 'up' | 点赞 |
| TYPE_FOLLOWER | 'follower' | 粉丝 |
| TYPE_FOLLOWEE | 'followee' | 关注 |
| MOBILE_CLIENT_WIDTH | 576 | 移动端宽度断点 |
| UPLOAD_ACTION | 动态 | 默认上传地址（基于 location） |
| UPLOAD_ACTION_HKY | 动态 | HKY 上传地址（基于 location） |
| BASE_FILE_URL | 动态 | 文件下载基础 URL（基于 location） |

```javascript
if (item.type === CONSTANT.TYPE_ARTICLE) { /* 处理文章 */ }
const isPC = window.innerWidth > CONSTANT.MOBILE_CLIENT_WIDTH
```

---

## ScrollTool

```javascript
import { ScrollTool } from '@zkwq-x/business'

const scroller = new ScrollTool(this.$refs.container)

scroller.init((position, isBottom, type, event) => {
  if (type === 'vertical' && isBottom) {
    this.loadMore() // 纵向滚动到底，加载更多
  }
})

scroller.toTop()    // 滚动到顶部
scroller.toLeft()   // 滚动到最左侧
scroller.destroy()  // 组件销毁时调用
```

**构造参数：**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| dom | Element | document | 监听滚动的 DOM 元素 |
| useCapture | Boolean | false | 是否使用捕获阶段 |

**init 回调参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| scrollPosition | Number | 当前滚动位置 |
| isBottom | Boolean | 是否到达底部/右侧边缘 |
| scrollType | String | 'vertical' 或 'horizontal' |
| event | Event | 原始滚动事件 |

---

## ExportUtil（资源导出）

```javascript
import { Quote } from '@zkwq-x/business'
// 或具名导入：
import { exportExcel, exportRIS, buildExcelParams, buildRISParams } from '@zkwq-x/business/src/util/quote'
```

### exportExcel(applicationId, fileName, sheetName, models, resourcePrefix)
将资源数据导出为 Excel (.xlsx) 并触发下载，返回 Promise。
```javascript
exportExcel('app001', '论文导出', '论文', articleList, 'https://example.com/article/')
```

### buildExcelParams(applicationId, fileName, sheetName, models, resourcePrefix)
构建 Excel 导出参数对象（不触发下载），返回包含 `appid`、`fileName`、`sheetName`、`head`、`data` 的对象。

### exportRIS(applicationId, fileName, models, resourcePrefix)
将资源数据导出为 RIS (.ris) 并触发下载，返回 Promise。
```javascript
exportRIS('app001', '专利导出', patentList, 'https://example.com/patent/')
```

### buildRISParams(applicationId, fileName, models, resourcePrefix)
构建 RIS 导出参数对象（不触发下载），返回包含 `appid`、`fileName`、`text` 的对象。

---

## Bus（事件总线）

```javascript
import { Bus } from '@zkwq-x/business'

// 监听事件
Bus.on('custom-event', (data) => {
  console.log('收到:', data)
})

// 触发事件（options 可包含 success 回调，handler 有返回值时会调用 success(returnValue)，否则调用 success()）
Bus.trigger('custom-event', { message: 'Hello', success: (ret) => {} })

// 移除监听（需传相同函数引用；不传 callBack 则移除该事件所有监听）
const handler = (data) => console.log(data)
Bus.on('event', handler)
Bus.remove('event', handler)
Bus.remove('event')  // 移除 'event' 的全部监听
```

---

## CheckRobot（机器人验证）

命令式弹出图形验证码对话框，验证通过后页面自动刷新。单例模式，防止重复弹出。

**典型用法：在 axios 响应拦截器中处理 403。**

```javascript
import { CheckRobot } from '@zkwq-x/business'

axios.interceptors.response.use(null, error => {
  if (error.response?.status === 403) {
    CheckRobot.createCaptchaDialog()
  }
  return Promise.reject(error)
})
```

> 注意：`CheckRobot` 是具名导出的模块对象，调用方式为 `CheckRobot.createCaptchaDialog()`，不是 `new CheckRobot()`。

---

## HighLight（关键词高亮）

```javascript
import { HighLight } from '@zkwq-x/business'

// 检查是否包含关键词
HighLight.check('Vue is awesome', ['Vue'], true) // => true（ignoreCase=true）

// 高亮字符串
const html = HighLight.build('Vue is awesome', ['Vue'], { ignoreCase: true })
// => '<span class="highlight_text ">Vue</span> is awesome'

// 高亮对象属性（返回 Proxy，访问属性时才执行高亮）
const obj = { title: 'Vue框架介绍', abstract: '关于Vue的详细介绍' }
const highlighted = HighLight.build(obj, ['Vue'], {})
console.log(highlighted.title) // 高亮后的 title 字符串
```

**build options 参数：**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| ignoreCase | Boolean | false | 是否忽略大小写 |
| startTag | String | 'span' | 高亮包裹标签名（源码内部字段名为 `tag`，通过 `options.startTag` 读取） |
| classMapper | Array | [] | 关键词样式映射 `[{ patten: '词', classList: ['class'] }]` |

> 注意：`particiles` 为空数组时 `build` 直接返回原始值；`check` 的第三个参数 `ignoreCase` 默认值为 `false`。
