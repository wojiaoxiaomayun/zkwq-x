# 组件详细文档

## 基础 UI 组件

与 Element-UI 完全兼容，`el-` 前缀替换为 `base-` 即可使用。

```vue
<base-button type="primary">按钮</base-button>
<base-input v-model="val" />
<base-table :data="list"><base-table-column prop="name" label="姓名" /></base-table>
<base-form :model="form" :rules="rules" ref="form"> ... </base-form>
<base-dialog v-model="visible"> ... </base-dialog>
<base-select v-model="val"><base-option value="1" label="选项1" /></base-select>
<base-pagination :total="100" v-model="page" />
```

---

## 普通组件

### AggsItemH — 水平聚合项

**Props**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | String | - | 聚合项标题 |
| datas | Array | - | 聚合数据数组 `[{ key, name, value }]` |
| single | Boolean | false | 是否单选模式 |
| notAll | Boolean | false | 是否不显示「全部」选项 |
| checkList | Array | [] | 已选中的 key 列表（支持 .sync） |

**Events**: `change(selectedKeys: Array)` — 选中项变化时触发

```vue
<aggs-item-h
  title="分类"
  :datas="[{ key: 'tech', name: '技术', value: 100 }]"
  :check-list.sync="selected"
  @change="handleChange"
/>
```

---

### AggsItemV — 垂直聚合项（复选框列表）

**Props**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | String | - | 标题 |
| datas | Array | - | 聚合数据数组 `[{ key, name, value }]` |
| checkList | Array | [] | 已选中的 key 列表（支持 .sync） |
| search | Boolean | false | 是否显示搜索框 |
| showNum | Number | 5 | 初始显示条数 |
| step | Boolean | false | 是否按步长加载（false 则一次展开全部） |

**Events**: `change(selectedKeys: Array)`

**Slots**: `head` — 自定义头部（替换默认标题栏）

```vue
<aggs-item-v
  title="标签"
  :datas="tags"
  :check-list.sync="selectedTags"
  :show-num="10"
  :search="true"
/>
```

---

### ReadableItem — 可读项

展示论文/文献/专利的标题、作者、摘要、关键词、CPC 分类号等完整信息。

**Props**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| readable | Object | - | 数据对象（title/author/abstracts/keywords/doi/year/source/cpc 等） |
| showCPC | Boolean | false | 是否显示 CPC 分类号 |
| authorHover | Boolean | false | 是否启用作者悬停效果 |
| openSearch | Boolean | false | 是否开启点击搜索功能 |
| notShowCover | Boolean | false | 是否不显示封面图 |
| showOpenAccesss | Boolean | false | 是否显示 Open Access 标记（注意：prop 名含三个 s） |

**Events**

| 事件 | 回调参数 | 说明 |
|------|----------|------|
| skip | (type, scholar) | 点击跳转链接 |
| follow | (scholar) | 点击关注按钮 |
| disfollow | (scholar) | 点击取消关注 |
| title-click | - | 点击标题时触发 |
| search-author | (author, type) | 点击作者名搜索 |
| search-tutor | (tutor, type) | 点击导师名搜索 |
| search-major | (major, type) | 点击专业搜索 |
| search-school | (school, type) | 点击学校搜索 |
| search-graduation | (graduation, type) | 点击学位授予单位搜索 |
| search-inventor | (inventor) | 点击发明人搜索 |
| search-applicant | (applicant) | 点击申请人搜索 |
| search-institution | (institution, type) | 点击机构搜索 |
| search-source | (source, type) | 点击来源期刊搜索 |
| search-subject | (subject, type) | 点击学科搜索 |
| search-keyword | (keyword, type) | 点击关键词搜索 |
| search-provider | (provider) | 点击提供者搜索 |
| search-conference | (conference) | 点击会议搜索 |

```vue
<readable-item
  :readable="{
    title: '论文标题',
    author: ['作者1'],
    author_id: ['uid1'],
    abstracts: '摘要内容...',
    keywords: ['关键词1'],
    doi: '10.1000/182',
    year: 2023,
    source: '期刊名称'
  }"
  @skip="handleSkip"
  @follow="handleFollow"
/>
```

---

### BounceLoading — 弹跳加载动画

```vue
<bounce-loading />
```

---

### AppDialog — 应用对话框

> 注意：AppDialog 不支持 `v-model`，显隐状态只能通过 `ref` 调用 `show()` / `hide()` 方法控制。

**Props**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| dialogTitle | String | - | 标题 |
| dialogSubtitle | String | - | 副标题 |
| width | String | '536px' | 宽度 |
| top | String | '15vh' | 距顶部距离 |
| staticDialog | Boolean | false | 是否禁止点击遮罩关闭 |
| appendToBody | Boolean | true | 是否插入 body |
| autoHide | Boolean | true | 点击关闭按钮时是否自动隐藏 |
| hideCloseButton | Boolean | false | 是否隐藏关闭按钮 |
| fullPage | Boolean | false | 是否全屏 |
| originTitle | Boolean | false | 标题是否靠左 |
| customClass / dialogClass / modalClass | String | - | 自定义类名 |
| destroyOnClose | Boolean | false | 关闭时销毁内部元素 |

**Events**: `hide` — 点击关闭时触发；`on-scroll(moveY)` — 滚动时触发

**Methods（通过 ref 调用）**: `show()` / `hide()` / `scrollTop()` / `scrollBottom()`

```vue
<app-dialog ref="dialog" dialog-title="提示" @hide="onHide">
  <p>内容</p>
</app-dialog>

<!-- 通过 ref 控制显隐 -->
<base-button @click="$refs.dialog.show()">打开</base-button>
```

---

### SmoothNumber — 平滑数字

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | Number | - | 目标数值 |
| duration | Number | 1000 | 动画时长（ms） |
| formatZero | String | null | 数值为 0 时的替代显示文本 |

```vue
<smooth-number :value="count" :duration="800" format-zero="暂无" />
```

---

### Avatar — 头像

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| url | String | - | 图片 URL，为空时显示默认占位 SVG |
| size | Number | 0 | 大小（px） |
| round | Boolean | false | 是否圆形 |
| pointer | Boolean | true | 是否显示指针样式 |

```vue
<avatar :url="avatarUrl" :size="40" :round="true" />
```

---

### CircleTranslateButton — 圆形翻译按钮

接收文献数据对象，点击后自动翻译标题和摘要，通过事件向父组件回传翻译结果。

| 参数 | 类型 | 说明 |
|------|------|------|
| model | Object | 文献数据对象（需含 `id`、`title`，可选 `abstracts`） |
| quotePlacement | String | 引用位置标识（预留参数） |

**Events**

| 事件 | 回调参数 | 说明 |
|------|----------|------|
| translate-title | (translatedText: string) | 标题翻译结果 |
| translate-abstracts | (translatedText: string) | 摘要翻译结果 |

```vue
<circle-translate-button
  :model="{ id: '123', title: '论文标题', abstracts: '摘要' }"
  @translate-title="title = $event"
  @translate-abstracts="abstracts = $event"
/>
```

---

### Annex — 附件上传

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| userId | String | **必填** | 上传者用户 ID |
| files | Array | [] | 文件列表（v-model），`[{ id, name, url, link, title, desc, size, create_time }]` |
| max | Number | 5 | 最大上传数量 |
| fileTypes | Array | [] | 允许的文件后缀，如 `['pdf','docx']`，空数组不限制 |
| edit | Boolean | false | 是否允许编辑附件标题/描述 |
| maxUploadFileSize | Number | 157286400 | 最大文件大小（字节），默认 150MB |
| checkPDF | Boolean | false | 是否校验 PDF 合法性 |

**Events**: `change(files, index, file)` — 上传成功后触发

```vue
<annex
  :user-id="userId"
  :files.sync="fileList"
  :max="3"
  :file-types="['pdf', 'docx']"
  :edit="true"
/>
```

---

### XCard — 卡片

**Props**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | String | - | 标题 |
| shadow | String/Boolean | false | 阴影：never/always/hover/false |
| border | Boolean | false | 是否显示边框 |
| headerStyle/coverStyle/contentStyle/footerStyle/actionStyle | Object | - | 各区域样式 |

**Slots**: `header` / `extra`（头部右侧） / `cover` / `default` / `footer` / `action`

```vue
<x-card title="标题" :shadow="true" :border="true">
  <template v-slot:extra><base-button size="mini">更多</base-button></template>
  <p>内容</p>
  <template v-slot:footer>
    <base-button>确定</base-button>
  </template>
</x-card>
```

---

### XHeader — 头部

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| back | Boolean | false | 是否显示返回按钮 |
| backText | String | '返回' | 返回按钮文本 |
| backIcon | String | 'back' | 返回按钮图标 |
| backHome | Function | - | 返回按钮点击回调，不传则调用 `$router.go(-1)` |

**Slots**: `back` / `default`（头部右侧内容）

```vue
<x-header :back="true" :back-home="() => $router.push('/')">
  <base-button>操作</base-button>
</x-header>
```

---

### XTab — 标签页

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | Array | [{name:'菜单1',value:'菜单1'},{name:'菜单2',value:'菜单2'}] | 标签数据，每项可加 `disabled: true` 禁用 |
| actived | String/Number | - | 当前激活标签（v-model，prop 名为 actived） |
| vertical | Boolean | false | 是否垂直显示 |

**Events**: `change(value)`

**Slots**: `default(item)` — 自定义标签内容

```vue
<x-tab :actived.sync="activeTab" :data="tabs" @change="onTabChange">
  <template v-slot:default="{ item }">{{ item.name }}</template>
</x-tab>
```

---

### Cover — 封面图片上传

> 注意：Cover 是上传组件，不是展示组件。用于上传并预览封面图片。

**Props**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| userId | String | **必填** | 上传者用户 ID |
| img | String | '' | 封面图路径（v-model） |
| width | Number | 314 | 组件宽度（px） |
| height | Number | 130 | 组件高度（px） |
| fullUrl | Boolean | false | emit 时是否拼接完整 URL 前缀 |
| suffixs | Array | ['jpg','jpeg','png','webp'] | 允许上传的图片后缀 |

**Events**: `update:img(path)` — 上传成功或清除后触发（v-model）

```vue
<cover
  :user-id="userId"
  :img.sync="coverPath"
  :width="400"
  :height="200"
/>
```

---

### WangEditor — 富文本编辑器

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| userId | String | **必填** | 用户 ID，用于图片/视频上传 |
| value | String | '' | 编辑器内容（HTML，v-model） |
| placeholder | String | '' | 占位符 |
| plugins | Array | [] | wangEditor 插件列表 |

**Events**: `update:value(html)` — 内容变化

```vue
<wang-editor v-model="content" :user-id="userId" placeholder="请输入内容" />
```

---

### AppNumberBoard — 数字面板

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | Array | - | 数字数据 `[{ key, value, is_hover_item? }]`，`key` 为标签，`value` 为数值 |
| divider | Boolean | true | 是否显示分隔线 |
| rever | Boolean | false | 是否数值在上、标签在下 |

**Events**: `click(item)` — 点击可悬停项（`is_hover_item: true` 且 `value > 0`）时触发

```vue
<app-number-board
  :data="[{ key: '访问量', value: 1234 }, { key: '关注者', value: 56, is_hover_item: true }]"
  @click="handleClick"
/>
```

---

### UserProfile — 用户资料

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| profile | Object | - | 用户数据，字段说明见下方 |
| avatarSize | Number | 60 | 头像大小 |
| avatarRound | Boolean | false | 是否圆形头像 |
| themeLight | Boolean | false | 是否浅色主题 |
| disableTitle | Boolean | false | 是否禁用职称显示 |
| disableInstitution | Boolean | false | 是否禁用机构显示 |
| disableEmail | Boolean | false | 是否禁用邮箱显示 |

`profile` 对象字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| name | String | 姓名 |
| avatar | String | 头像 URL |
| email | String | 邮箱 |
| orc_id | String | ORCID |
| professional_title | Array\<String\> | 职称列表 |
| position | Array\<String\> | 职位列表 |
| academic_title | Array\<String\> | 荣誉称号列表 |
| affiliation | Array\<String\> | 所属机构列表 |
| department | Array\<String\> | 部门列表 |

```vue
<user-profile :profile="userInfo" :avatar-size="80" :avatar-round="true" />
```

---

### InstitutionAvatar — 机构头像

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| url | String | - | 头像 URL，为空时显示占位图 |
| size | Number | 0 | 大小（px） |
| round | Boolean | false | 是否圆形 |
| pointer | Boolean | true | 是否显示指针样式 |

```vue
<institution-avatar :url="logoUrl" :size="40" />
```

---

### InstitutionProfile — 机构资料展示

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| profile | Object | - | 机构数据（name/logo） |
| avatarSize | Number | 56 | 头像大小 |
| avatarRound | Boolean | false | 是否圆形头像 |
| themeLight | Boolean | false | 是否浅色主题 |

```vue
<institution-profile :profile="{ name: '清华大学', logo: '...' }" :avatar-size="56" />
```

---

### InstitutionX — 机构列表编辑器

用于添加/编辑/排序/删除多个机构的列表编辑组件（带自动补全搜索）。

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| inss | Array | [] | 机构列表（v-model），每项 `{ id, name, logo }` |
| text | String | '机构' | 按钮和提示中的名称 |
| size | Number | 10000 | 最大允许添加数量 |

**Events**: `update:inss(inss)` — 列表变化时触发（v-model）

```vue
<institution-x :inss.sync="institutionList" :size="3" />
```

---

### Institution — 单机构搜索选择

单个机构的搜索选择输入框（带自动补全）。

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| ins | Object | - | 已选机构（v-model），`{ id, name, logo }` |
| placeholder | String | '请输入机构' | 输入框占位符 |
| tip | Boolean | false | 是否显示提示文字 |

**Events**: `update:ins(ins)` / `change(ins)`

```vue
<institution :ins.sync="selectedIns" :tip="true" />
```

---

### AuthorX — 作者列表编辑器

用于添加/编辑/排序/删除多个作者的列表编辑组件（带自动补全搜索）。

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| authors | Array | [] | 作者列表（v-model），每项 `{ id, name, institution[], institutionId[], orcid, cstr, contributor_equal_first, contrib_corresponding }` |
| text | String | '作者' | 按钮和提示中的名称 |
| CorrespondingAuthor | Boolean | false | 是否显示通讯作者/共同第一作者选项 |
| size | Number | 10000 | 最大允许添加数量 |
| disabled | Boolean | false | 是否禁用编辑（只读模式） |
| orcid | Boolean | false | 是否显示 ORCID 输入框 |
| cstr | Boolean | false | 是否显示 CSTR 输入框 |

**Events**: `update:authors(authors)` / `change(authors)`

```vue
<author-x
  :authors.sync="authorList"
  :corresponding-author="true"
  :orcid="true"
/>
```

---

### Author — 单作者搜索选择

单个作者的搜索选择输入框（带自动补全）。

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| author | Object | - | 已选作者（v-model），`{ id, name, institution }` |
| placeholder | String | '请输入姓名' | 输入框占位符 |
| tip | Boolean | false | 是否显示提示文字 |
| text | String | - | 提示文字中的称谓 |

**Events**: `update:author(author)` / `change(author)`

```vue
<author :author.sync="selectedAuthor" :tip="true" />
```

---

### AuthorOrIns — 作者或机构切换编辑器

通过单选按钮切换「作者列表编辑」和「机构列表编辑」两种模式。

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | Object | `{ authors: [], inss: [] }` | 数据对象（v-model） |
| personText | String | '作者' | 作者模式的标签文本 |
| insText | String | '机构' | 机构模式的标签文本 |

**Events**: `update:data(data)`

```vue
<author-or-ins
  :data.sync="{ authors: [], inss: [] }"
  person-text="作者"
  ins-text="机构"
/>
```

---

### AppTip — 应用提示

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | String | - | 主题色：不传为蓝色主题，`warning` 为橙色，`danger` 为红色 |
| content | String | - | 提示内容文本（也可用默认插槽） |
| icon | Boolean | false | 是否显示左侧图标 |

**Slots**: `content` — 自定义内容

```vue
<app-tip type="warning" :icon="true">这是一条警告提示</app-tip>
<app-tip type="danger" content="这是错误提示" />
```

---

### DatePickerX — 日期选择器扩展

带格式切换的日期选择器（支持年/年月/年月日三种精度动态切换）。

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| date | String | - | 选中日期字符串（v-model） |
| placeholder | String | - | 占位符 |
| type | String | 'year' | 初始格式类型：`year` / `month` / `date` |
| formats | Array | [{key:'year',name:'yyyy',format:'yyyy'},{key:'month',...},{key:'date',...}] | 可选格式列表 |

**Events**: `update:date(dateStr)`

```vue
<date-picker-x :date.sync="publishDate" type="date" placeholder="请选择日期" />
```

---

### Keywords — 关键词标签编辑

支持添加、删除、拖拽排序的标签编辑组件。

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| tags | Array | [] | 关键词字符串数组（v-model） |
| text | String | '关键词' | 添加按钮中的名称 |
| size | Number | 10000 | 最大允许数量 |
| placeholder | String | - | 输入框占位符 |

**Events**: `update:tags(tags)`

```vue
<keywords :tags.sync="keywordList" :size="8" text="关键词" />
```

---

### HoverCard — 悬停用户卡片

悬停时自动拉取并展示用户详细信息卡片（依赖全局 `user`、`applicationId`/`appid` 注入）。

| 参数 | 类型 | 说明 |
|------|------|------|
| uid | String/Boolean | 用户 UID，传 `false` 或空则禁用悬停 |

**Events**

| 事件 | 说明 |
|------|------|
| skip(type, scholar) | 点击跳转（首页等） |
| follow(scholar) | 关注后触发 |
| disfollow(scholar) | 取消关注后触发 |

**Slots**: `default` — 触发悬停的元素

```vue
<hover-card :uid="author.id" @skip="handleSkip">
  <span>{{ author.name }}</span>
</hover-card>
```

---

### FollowButton — 关注按钮

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| followeeId | String | - | 被关注者 ID |
| isFollower | Boolean | false | 初始是否已关注 |
| followeeSex | String | '' | 被关注者性别（'男'/'女'），影响按钮文案 |
| size | String | 'medium' | 按钮大小 |

**Events**: `follow` — 关注成功后触发；`disfollow` — 取消关注成功后触发

```vue
<follow-button
  :followee-id="scholar.id"
  :is-follower="scholar.is_followed"
  :followee-sex="scholar.sex"
  @follow="handleFollow"
  @disfollow="handleDisfollow"
/>
```

---

### AvatarGroup — 头像组

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| urls | Array | [] | 头像 URL 字符串数组 |
| size | Number | 40 | 单个头像大小（px） |
| round | Boolean | false | 是否圆形 |
| max | Number | 3 | 最大显示数量，超出显示 +N |

**Events**: `click(index)` — 点击某个头像时触发

```vue
<avatar-group :urls="avatarUrls" :max="5" :round="true" @click="handleAvatarClick" />
```

---

### CaptchaFormItem — 图形验证码表单项

在表单中嵌入图形验证码输入（算式结果）及自动刷新功能。

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| captcha | String | - | 验证码输入值（v-model） |
| captchaKey | String | - | 验证码 key，用于获取对应验证码图片 |
| prop | String | - | 表单校验 prop 名 |
| showLabel | Boolean | false | 是否显示 input label |

**Events**: `input(val)` — 输入变化

**Methods（通过 ref 调用）**: `refreshCaptcha()` — 刷新验证码图片

```vue
<base-form :model="form" :rules="rules" ref="form">
  <captcha-form-item
    prop="captcha"
    v-model="form.captcha"
    :captcha-key="clientId"
  />
</base-form>
```

---

### CaptchaDialog — 验证码对话框

完整的图形验证码弹窗，包含输入、校验、刷新逻辑，验证成功后触发 `on-success` 事件。

**Props**: 无（通过 ref 调用方法控制）

**Events**: `on-success` — 验证通过后触发

**Methods（通过 ref 调用）**: `show()` — 显示对话框；`hide()` — 关闭对话框

```vue
<captcha-dialog ref="captchaDialog" @on-success="handleCaptchaSuccess" />

<!-- 触发显示 -->
<base-button @click="$refs.captchaDialog.show()">验证</base-button>
```

---
