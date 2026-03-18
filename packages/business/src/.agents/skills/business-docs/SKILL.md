---
name: business-docs
description: "@zkwq-x/business 组件库文档技能。当用户询问该组件库的组件用法、工具函数、服务模块、安装方式、Props/Events/Methods/Slots 等任何与 business 包相关的问题时，使用本技能提供准确的文档参考和代码示例。"
---

# @zkwq-x/business 组件库文档

## 库概述

`@zkwq-x/business` 是一个基于 Vue.js 的企业级组件库，提供 UI 组件、工具函数和服务模块。

**源码位置**: `packages/business/src/`
**完整文档**: `packages/business/README.md`

## 安装与引入

```bash
npm install @zkwq-x/business
```

### 完整引入

```javascript
import Vue from 'vue';
import Business from '@zkwq-x/business';
import '@zkwq-x/business/style/index.scss';

Vue.use(Business);
```

### 按需引入

```javascript
import { ComponentName } from '@zkwq-x/business';
import '@zkwq-x/business/style/index.scss';
```

## 基础 UI 组件

基础 UI 组件与 Element-UI 用法完全一致，将 `el-` 前缀替换为 `base-` 即可。

```vue
<!-- Element-UI -->
<el-button type="primary">按钮</el-button>

<!-- business 组件库 -->
<base-button type="primary">按钮</base-button>
<base-input v-model="input" />
<base-table :data="tableData"> ... </base-table>
```

## Icon 图标

图标与 Element-UI 用法完全一致，将 `el-icon-` 前缀替换为 `base-icon-` 即可。

```vue
<!-- Element-UI -->
<i class="el-icon-plus"></i>
<i class="el-icon-search"></i>
<i class="el-icon-delete"></i>

<!-- business 组件库 -->
<i class="base-icon-plus"></i>
<i class="base-icon-search"></i>
<i class="base-icon-delete"></i>
```

图标也可以配合按钮等组件使用：

```vue
<!-- Element-UI -->
<el-button icon="el-icon-search">搜索</el-button>
<el-button type="primary" icon="el-icon-plus">新增</el-button>

<!-- business 组件库 -->
<base-button icon="base-icon-search">搜索</base-button>
<base-button type="primary" icon="base-icon-plus">新增</base-button>
```

所有 Element-UI 内置图标均可通过将 `el-icon-` 替换为 `base-icon-` 的方式使用，图标名称保持不变。

## 普通组件速查表

| 组件名 | 标签名 | 说明 |
|--------|--------|------|
| AggsItemH | `<aggs-item-h>` | 水平聚合项，展示水平排列的可筛选聚合数据 |
| AggsItemV | `<aggs-item-v>` | 垂直聚合项，展示垂直排列的可筛选聚合数据 |
| ReadableItem | `<readable-item>` | 可读项，展示论文/文献的标题、作者、摘要、关键词等 |
| BounceLoading | `<bounce-loading>` | 弹跳加载动画 |
| AppDialog | `<app-dialog>` | 应用对话框，v-model 控制显隐 |
| SmoothNumber | `<smooth-number>` | 平滑数字变化动画 |
| Avatar | `<avatar>` | 头像组件 |
| CircleTranslateButton | `<circle-translate-button>` | 圆形翻译按钮 |
| Annex | `<annex>` | 附件列表组件 |
| XCard | `<x-card>` | 卡片组件，支持 header/cover/footer/action 插槽 |
| XHeader | `<x-header>` | 头部组件，支持返回按钮 |
| XTab | `<x-tab>` | 标签页组件 |
| Cover | `<cover>` | 封面图组件 |
| WangEditor | `<wang-editor>` | 富文本编辑器 |
| AppNumberBoard | `<app-number-board>` | 数字面板 |
| UserProfile | `<user-profile>` | 用户资料卡 |
| InstitutionAvatar | `<institution-avatar>` | 机构头像 |
| InstitutionProfile | `<institution-profile>` | 机构资料卡 |
| InstitutionX | `<institution-x>` | 机构扩展组件 |
| Institution | `<institution>` | 机构组件 |
| AuthorX | `<author-x>` | 作者扩展组件 |
| Author | `<author>` | 作者组件 |
| AuthorOrIns | `<author-or-ins>` | 作者或机构组件 |
| AppTip | `<app-tip>` | 提示组件，type: info/success/warning/error |
| DatePickerX | `<date-picker-x>` | 日期选择器扩展 |
| Keywords | `<keywords>` | 关键词标签列表 |
| ImageViewer | `<image-viewer>` | 图片查看器 |
| HoverCard | `<hover-card>` | 悬停卡片，trigger/content 插槽 |
| FollowButton | `<follow-button>` | 关注/取消关注按钮 |
| AvatarGroup | `<avatar-group>` | 头像组，支持 max 截断 |
| CaptchaDialog | `<captcha-dialog>` | 机器人图形验证对话框 |
| CaptchaFormItem | `<captcha-form-item>` | 验证码表单项 |
| MultipleSpan | `<multiple-span>` | 多值文本（数组转逗号分隔行内 span） |

详细 Props/Events/Methods/Slots 见 `references/components.md`。

## 工具函数速查（BaseUtil）

```javascript
import { BaseUtil } from '@zkwq-x/business'
```

### 常用函数分类

| 分类 | 函数 |
|------|------|
| 加密 | `MD5(msg)` / `AESEncode` / `AESDecode` / `AESEncodeBase64` / `AESDecodeBase64` |
| ID生成 | `generateId()` / `randomString(len)` / `guid()` / `GenerateNonce(len)` |
| 类型检测 | `isString` / `isObject` / `isEmpty` / `isArrayEmpty` / `isFunction` / `isDefined` |
| 数字格式化 | `formatNumber(val)` / `formatKNumber(val)` / `scaleNumber(val, scale)` |
| 数组/字符串转换 | `ConvertArrayToString(arr, sep?)` / `ConvertStringToArray(str, sep?)` |
| 数组操作 | `ArraySwapItems` / `ArrayUpItem` / `ArrayDownItem` / `ArrayValueEquals` |
| 文件下载 | `DownloadFile(base64, name)` / `DownloadUrl(url, name)` / `isPDF(file)` |
| 浏览器检测 | `isIE()` / `isEdge()` / `isFirefox()` / `isSupportWebp()` |
| URL处理 | `getQueryString(name, mode?)` / `getPlainUrl(url)` |
| 存储（localStorage） | `setStorage(key, val, expire?)` / `getStorage(key)` / `removeStorage(key)` |
| 存储（sessionStorage） | `setSession(key, val, expire?)` / `getSession(key)` / `removeSession(key)` |
| HTML处理 | `clearHighlight(str)` / `ClearHtml(text)` |
| 其他 | `CalcTextWidth(text, font?)` / `getStringLength(str)` / `isArrayContains(arr, item)` |

详细参数说明见 `references/utils.md`。

## 其他工具类

| 导出名 | 说明 |
|--------|------|
| `Base64Util` | Base64 编解码：`.encode(str)` / `.decode(str)` |
| `http` | HTTP 请求封装：`.get` / `.post` / `.put` / `.delete` |
| `CONSTANT` | 业务常量集合（资源类型、上传地址、移动断点等） |
| `ScrollTool` | 滚动监听工具类，`new ScrollTool(dom?)` |
| `ExportUtil` | 资源导出（Excel/RIS）：`exportExcel(...)` / `exportRIS(...)` |
| `Bus` | 事件总线：`.on` / `.trigger` / `.remove` |
| `CheckRobot` | 机器人验证：`CheckRobot.createCaptchaDialog()` |
| `HighLight` | 关键词高亮：`.check(str, keywords)` / `.build(obj, keywords, options?)` |

详细说明见 `references/utils.md` 和 `references/services.md`。

## 样式深度定制

`base-input` 和 `base-select` 相对于原版 Element-UI 有较大的视觉风格改动（无边框 + 底部线条动画、浮动 label），外部项目如需深度定制样式，请参考 `references/style-customization.md`，其中包含：

- input/select 的 DOM 结构差异和关键 CSS 类说明
- 新增 Props（`ripple`、`showLabel`、`enableFocusClass` 等）对样式的影响
- 各场景的 SCSS 覆盖示例
- SCSS 变量速查表

如需通过 SCSS 变量进行全局主题定制（如替换主色、调整输入框尺寸等），请参考 `references/var-scss.md`，其中包含：

- `var.scss` 的引入方式与覆盖顺序
- 颜色、Input、Select、字体、边框等全量变量速查
- 典型场景示例（替换主色、调整输入框、修改下拉面板等）

## 服务模块（Service）

```javascript
import { Service } from '@zkwq-x/business'
```

| 方法 | 说明 |
|------|------|
| `Service.SaveLog(params, app, user, module)` | 保存用户操作日志 |
| `Service.ExportResource(params)` | 导出资源（返回 Blob） |
| `Service.ExportResourceTxt(params)` | 导出资源为文本（返回 Blob） |
| `Service.GetUserV2(uid, user_id, app_id)` | 获取用户信息 V2 |

详细说明见 `references/services.md`。

## 指令

```vue
<!-- 水波纹效果 -->
<button v-ripple>点击我</button>
```

## 使用规范

- 引入组件时需同时引入样式：`import '@zkwq-x/business/style/index.scss'`
- 存储函数默认过期：localStorage 2小时，sessionStorage 20小时；传 `-1` 为永不过期
- `CheckRobot.createCaptchaDialog()` 为单例，通常在 axios 响应拦截器中 403 时调用
- `HighLight.build()` 对对象返回 Proxy，访问属性时才实际执行高亮
- `CONSTANT` 中的 `UPLOAD_ACTION`、`BASE_FILE_URL` 是基于 `window.location` 的动态值
