# 服务模块详细文档

## Service

```javascript
import { Service } from '@zkwq-x/business'
```

---

### 日志服务

#### SaveLog(params, application, user, module)
保存用户操作日志。

| 参数 | 类型 | 说明 |
|------|------|------|
| params | Object | 日志参数对象，字段见下表 |
| application | Object | 应用对象，包含 `{ id, name, topic, topicId }` |
| user | Object | 用户对象，包含 `{ uid, name, avatar, institution, anonymous }` |
| module | String | 模块名称，默认 `'后台管理'`，传 `'前台'` 时 event_key 默认为 `'operation'` |

**params 字段说明**

| 字段 | 必填 | 说明 |
|------|------|------|
| eventKey | 否 | 事件键值（英文），不填时按 module 自动赋值。预定义值：`page_visit`、`operation`、`operation_admin`，也可自定义 |
| eventValue | 否 | 事件中文描述，自定义 eventKey 时建议填写 |
| eventDesc | 否 | 事件详细描述 |
| url | 否 | 请求链接，不填时自动取 `window.location.href` |
| eventParams | 否 | 请求参数 |
| status | 否 | 请求状态，`'error'` 或 `'success'` |
| result | 否 | 请求结果 |
| fromUrl | 否 | 原始链接（如页面跳转前的链接） |

**返回值**: Promise

```javascript
Service.SaveLog(
  {
    eventKey: 'operation_admin',
    eventDesc: '用户登录',
    url: window.location.href,
    status: 'success'
  },
  { id: 'app001', name: '管理系统', topic: '', topicId: '' },
  { uid: '1', name: 'admin', avatar: '', institution: '', anonymous: false },
  '用户管理'
).then(() => {
  console.log('日志保存成功')
})
```

---

### 资源导出服务

#### ExportResource(params)
导出资源为 Excel 文件，返回 Blob。

| 字段 | 类型 | 说明 |
|------|------|------|
| appid | String | 应用 ID |
| fileName | String | 导出文件名 |
| sheetName | String | Sheet 名称 |
| head | Array | 表头，格式 `[['列1'], ['列2']]` |
| data | Array | 数据，格式 `[['值1'], ['值2']]` |

```javascript
Service.ExportResource({
  appid: 'app001',
  fileName: 'export',
  sheetName: 'Sheet1',
  head: [['姓名'], ['年龄']],
  data: [['张三'], ['18']]
}).then(blob => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'export.xlsx'
  link.click()
})
```

#### ExportResourceTxt(params)
导出资源为文本文件，返回 Blob。

| 字段 | 类型 | 说明 |
|------|------|------|
| appid | String | 应用 ID |
| fileName | String | 导出文件名 |
| text | Array | 文本行数组，格式 `['行1', '行2']` |

```javascript
Service.ExportResourceTxt({
  appid: 'app001',
  fileName: 'export',
  text: ['第一行内容', '第二行内容']
}).then(blob => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'export.txt'
  link.click()
})
```

---

### 用户服务

#### GetUserV2(uid, user_id, app_id)
获取用户信息（V2 版本）。

| 参数 | 类型 | 说明 |
|------|------|------|
| uid | String | 目标用户 ID |
| user_id | String | 当前登录用户 ID |
| app_id | String | 应用 ID |

**返回值**: Promise（包含用户信息）

```javascript
Service.GetUserV2('target-uid', 'current-uid', 'app001').then(userInfo => {
  console.log(userInfo)
})
```

---

### 搜索建议服务

以下方法均接收一个 `query` 字符串参数，返回 Promise（建议列表）。部分方法需要携带 HKY Token，内部已自动处理。

| 方法 | 说明 |
|------|------|
| `SuggestScholars(query)` | 学者搜索建议（v1） |
| `SuggestScholarsV2(query)` | 学者搜索建议（v2，走 insKnowApi） |
| `SuggestInstitutions(query)` | 机构搜索建议 |
| `SuggestSciencedata(query)` | 科学数据建议 |
| `SuggestBookdata(query)` | 图书建议 |
| `SuggestFundedProject(query)` | 资助项目建议 |
| `SuggestPatent(query)` | 专利建议 |
| `SuggestArticle(query)` | 论文建议 |
| `SuggestJournal(query)` | 期刊建议 |
| `SuggestConference(query)` | 会议建议 |
| `SuggestProjectV2(query)` | 项目标题建议（v2） |
| `SuggestSoftware(query)` | 软著建议 |
| `SuggestAward(query)` | 奖项建议 |
| `SuggestReprot(query)` | 报告建议（注意：函数名存在拼写错误，源码为 `SuggestReprot`） |
| `SuggestMonograph(query)` | 专著建议 |

```javascript
Service.SuggestScholars('张三').then(list => {
  console.log(list)
})
```

---

### 翻译服务

#### TranslateV2(params)
翻译文本（v3 接口）。

```javascript
Service.TranslateV2({ text: 'hello', target: 'zh' }).then(result => {
  console.log(result)
})
```

#### GetLang(params)
检测文本语言。

```javascript
Service.GetLang({ text: 'hello world' }).then(result => {
  console.log(result.lang)
})
```

---

### 数据统计服务

#### FruitCount(sid, isWhite, deleteCache)
获取学者成果统计数量。

| 参数 | 类型 | 说明 |
|------|------|------|
| sid | String | 学者 ID |
| isWhite | Boolean | 是否白名单 |
| deleteCache | Boolean | 是否删除缓存 |

```javascript
Service.FruitCount('scholar-id', false, false).then(count => {
  console.log(count)
})
```

---

### Token 工具

#### getHKYToken()
从 Cookie 中读取 `XSRF-TOKEN`，用于 HKY 接口鉴权。未找到时返回默认 token。内部搜索建议方法已自动调用，一般无需手动使用。

```javascript
const token = Service.getHKYToken()
```

---

### 文件服务

文件上传地址通过 `CONSTANT.UPLOAD_ACTION` 或 `CONSTANT.UPLOAD_ACTION_HKY` 获取，基于当前 `window.location` 动态生成。

```javascript
import { CONSTANT } from '@zkwq-x/business'

// 在 base-upload 组件中使用
<base-upload :action="CONSTANT.UPLOAD_ACTION" />
```

| 常量 | 说明 |
|------|------|
| `CONSTANT.UPLOAD_ACTION` | 通用文件上传地址，路径为 `/file/uploadfile` |
| `CONSTANT.UPLOAD_ACTION_HKY` | HKY 文件上传地址，路径为 `/hky/api/v1/files` |

文件下载基础 URL 使用 `CONSTANT.BASE_FILE_URL`，其值末尾已包含 `?fastdfspath=`，直接拼接路径值即可，**不要加斜杠**：

```javascript
// 正确
const fileUrl = CONSTANT.BASE_FILE_URL + 'path/to/file.pdf'

// 错误（会导致路径多一个斜杠）
// const fileUrl = CONSTANT.BASE_FILE_URL + '/path/to/file.pdf'
```

---

### 搜索结果高亮

搜索结果高亮处理推荐使用 `HighLight` 工具：

```javascript
import { HighLight } from '@zkwq-x/business'

// 对搜索结果对象批量高亮
const highlighted = HighLight.build(resultItem, searchKeywords, { ignoreCase: true })
// 访问 highlighted.title 时自动返回高亮后的 HTML 字符串
```

搜索结果展示推荐使用 `ReadableItem` 组件配合 `AggsItemH` / `AggsItemV` 组件。
