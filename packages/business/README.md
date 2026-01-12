# Business 组件库

## 目录

- [简介](#简介)
- [安装](#安装)
- [使用方式](#使用方式)
  - [完整引入](#完整引入)
  - [按需引入](#按需引入)
- [基础UI组件](#基础ui组件)
  - [示例](#示例)
- [普通组件](#普通组件)
  - [AggsItemH(水平聚合项组件)](#aggsh)
  - [AggsItemV(垂直聚合项组件)](#aggsv)
  - [ReadableItem(可读项组件)](#readableitem)
  - [BounceLoading(弹跳加载动画组件)](#bounceloading)
  - [AppDialog(应用对话框组件)](#appdialog)
  - [SmoothNumber(平滑数字变化组件)](#smoothnumber)
  - [Avatar(头像组件)](#avatar)
  - [Ripple(水波纹指令)](#ripple)
  - [CircleTranslateButton(圆形翻译按钮组件)](#circletranslatebutton)
  - [Annex(附件组件)](#annex)
  - [XCard(卡片组件)](#xcard)
  - [XHeader(头部组件)](#xheader)
  - [XTab(标签页组件)](#xtab)
  - [Cover(封面组件)](#cover)
  - [WangEditor(富文本编辑器组件)](#wangeditor)
  - [AppNumberBoard(数字面板组件)](#appnumberboard)
  - [UserProfile(用户资料组件)](#userprofile)
  - [InstitutionAvatar(机构头像组件)](#institutionavatar)
  - [InstitutionProfile(机构资料组件)](#institutionprofile)
  - [InstitutionX(机构扩展组件)](#institutionx)
  - [Institution(机构组件)](#institution)
  - [AuthorX(作者扩展组件)](#authorx)
  - [Author(作者组件)](#author)
  - [AuthorOrIns(作者或机构组件)](#authororins)
  - [AppTip(应用提示组件)](#apptip)
  - [DatePickerX(日期选择器扩展组件)](#datepickerx)
  - [Keywords(关键词组件)](#keywords)
  - [ImageViewer(图片查看器组件)](#imageviewer)
  - [HoverCard(悬停卡片组件)](#hovercard)
  - [FollowButton(关注按钮组件)](#followbutton)
  - [AvatarGroup(头像组组件)](#avatargroup)
- [工具函数](#工具函数)
  - [加密与哈希函数](#加密与哈希函数)
  - [ID与字符串生成函数](#id与字符串生成函数)
  - [数据验证与处理函数](#数据验证与处理函数)
  - [数据转换函数](#数据转换函数)
  - [URL与参数处理函数](#url与参数处理函数)
  - [数据存储函数](#数据存储函数)
  - [其他工具函数](#其他工具函数)
  - [Base64Util(Base64编码解码工具)](#base64util)
  - [http(HTTP请求工具)](#http)
  - [CONSTANT(常量集合)](#constant)
  - [ScrollTool(滚动工具)](#scrolltool)
  - [Quote(引用工具)](#quote)
  - [Bus(事件总线)](#bus)
  - [HighLight(高亮工具)](#highlight)
- [服务模块](#服务模块)
  - [日志服务](#日志服务)
  - [资源导出服务](#资源导出服务)
  - [用户服务](#用户服务)
  - [文件服务](#文件服务)
  - [数据统计服务](#数据统计服务)
  - [关注服务](#关注服务)
  - [搜索服务](#搜索服务)
- [指令](#指令)
  - [v-ripple](#v-ripple)
- [样式](#样式)
- [贡献](#贡献)
- [许可证](#许可证)

## 简介

Business 是一个基于 Vue.js 的企业级组件库，提供了丰富的 UI 组件、工具函数和服务模块，帮助快速构建企业级应用。

## 安装

```bash
npm install @zkwq-x/business
```

## 使用方式

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

export default {
  components: {
    ComponentName
  }
}
```

## 基础UI组件

基础UI组件使用方法与 Element-UI 完全一致，只需将 `el-` 前缀替换为 `base-` 前缀即可。

### 示例

```vue
<!-- Element-UI 用法 -->
<el-button type="primary">按钮</el-button>
<el-input v-model="input" placeholder="请输入内容"></el-input>
<el-table :data="tableData">
  <el-table-column prop="date" label="日期"></el-table-column>
</el-table>

<!-- Business 组件库用法 -->
<base-button type="primary">按钮</base-button>
<base-input v-model="input" placeholder="请输入内容"></base-input>
<base-table :data="tableData">
  <base-table-column prop="date" label="日期"></base-table-column>
</base-table>
```

## 普通组件

### AggsItemH

水平聚合项组件，用于展示水平排列的聚合数据。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| title | 聚合项标题 | String | - | - |
| datas | 聚合数据数组 | Array | - | - |
| single | 是否单选模式 | Boolean | - | false |
| notAll | 是否不显示"全部"选项 | Boolean | - | false |
| checkList | 已选中的项列表 | Array | - | [] |

#### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 选中项发生变化时触发 | 选中的项的key数组 |

#### 示例

```vue
<template>
  <aggs-item-h 
    title="分类" 
    :datas="categories" 
    :check-list.sync="selectedCategories"
    @change="handleCategoryChange"
  />
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { key: 'tech', name: '技术', value: 100 },
        { key: 'design', name: '设计', value: 80 },
        { key: 'product', name: '产品', value: 60 }
      ],
      selectedCategories: []
    }
  },
  methods: {
    handleCategoryChange(selectedKeys) {
      console.log('选中的分类:', selectedKeys);
    }
  }
}
</script>
```

### AggsItemV

垂直聚合项组件，用于展示垂直排列的聚合数据。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| title | 聚合项标题 | String | - | - |
| datas | 聚合数据数组 | Array | - | - |
| single | 是否单选模式 | Boolean | - | false |
| notAll | 是否不显示"全部"选项 | Boolean | - | false |
| checkList | 已选中的项列表 | Array | - | [] |

#### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 选中项发生变化时触发 | 选中的项的key数组 |

#### 示例

```vue
<template>
  <aggs-item-v 
    title="标签" 
    :datas="tags" 
    :check-list.sync="selectedTags"
    @change="handleTagChange"
  />
</template>

<script>
export default {
  data() {
    return {
      tags: [
        { key: 'vue', name: 'Vue', value: 100 },
        { key: 'react', name: 'React', value: 80 },
        { key: 'angular', name: 'Angular', value: 60 }
      ],
      selectedTags: []
    }
  },
  methods: {
    handleTagChange(selectedKeys) {
      console.log('选中的标签:', selectedKeys);
    }
  }
}
</script>
```

### ReadableItem

可读项组件，用于展示格式化的可读内容，包括作者信息、摘要、关键词等。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| readable | 可读内容对象，包含标题、作者、摘要等信息 | Object | - | - |
| showCPC | 是否显示CPC（分类号）信息 | Boolean | true/false | true |
| authorHover | 是否启用作者悬停效果 | Boolean | true/false | true |
| openSearch | 是否开启搜索功能 | Boolean | true/false | false |
| notShowCover | 是否不显示封面图 | Boolean | true/false | false |

#### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| skip | 跳转事件，当用户点击跳转链接时触发 | type - 跳转类型, scholar - 学者对象 |
| follow | 关注事件，当用户点击关注按钮时触发 | scholar - 被关注的学者对象 |
| disfollow | 取消关注事件，当用户点击取消关注按钮时触发 | scholar - 被取消关注的学者对象 |

#### 方法

| 方法名 | 说明 | 参数 |
|--------|------|------|
| handleSkip | 处理跳转事件 | type - 跳转类型, scholar - 学者对象 |
| handleFollow | 处理关注事件 | scholar - 学者对象 |
| handleDisfollow | 处理取消关注事件 | scholar - 学者对象 |
| handleMore | 展开完整摘要 | - |
| handLess | 收起摘要 | - |
| showAllAuthor | 显示所有作者 | - |

#### 示例

```vue
<template>
  <readable-item 
    :readable="readableData"
    :showCPC="true"
    :authorHover="true"
    :openSearch="false"
    :notShowCover="false"
    @skip="handleSkipEvent"
    @follow="handleFollowEvent"
    @disfollow="handleDisfollowEvent"
  />
</template>

<script>
export default {
  data() {
    return {
      readableData: {
        title: "论文标题",
        authors: [
          { name: "作者1", id: "1" },
          { name: "作者2", id: "2" }
        ],
        abstract: "论文摘要内容...",
        keywords: ["关键词1", "关键词2"],
        doi: "10.1000/182",
        publish_time: "2023-01-01",
        source: "期刊名称",
        cpc: ["G06F 16/9535"]
      }
    }
  },
  methods: {
    handleSkipEvent(type, scholar) {
      console.log('跳转事件:', type, scholar);
    },
    handleFollowEvent(scholar) {
      console.log('关注学者:', scholar);
    },
    handleDisfollowEvent(scholar) {
      console.log('取消关注学者:', scholar);
    }
  }
}
</script>
```

### BounceLoading

弹跳加载动画组件。

#### 示例

```vue
<template>
  <bounce-loading />
</template>
```

### AppDialog

应用对话框组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| originTitle | 标题是否靠左显示 | Boolean | - | false |
| dialogTitle | 对话框标题 | String | - | - |
| dialogSubtitle | 对话框副标题 | String | - | - |
| staticDialog | 是否静态对话框（不可点击遮罩关闭） | Boolean | - | false |
| width | 对话框宽度 | String | - | '536px' |
| top | 对话框距离顶部的距离 | String | - | '15vh' |
| appendToBody | 是否将对话框插入至 body 元素上 | Boolean | - | true |
| autoHide | 点击关闭按钮时是否自动隐藏 | Boolean | - | true |
| hideCloseButton | 是否隐藏关闭按钮 | Boolean | - | false |
| fullPage | 是否全屏显示 | Boolean | - | false |
| customClass | 自定义类名 | String | - | - |
| dialogClass | 对话框自定义类名 | String | - | - |
| modalClass | 遮罩自定义类名 | String | - | - |
| destroyOnClose | 关闭时销毁对话框中的元素 | Boolean | - | false |

#### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| hide | 点击关闭按钮时触发 | - |
| on-scroll | 滚动时触发 | (moveY: number) |

#### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| show | 显示对话框 | - |
| hide | 隐藏对话框 | - |
| scrollTop | 滚动到顶部 | - |
| scrollBottom | 滚动到底部 | - |

#### 示例

```vue
<template>
  <div>
    <base-button @click="showDialog = true">显示对话框</base-button>
    <app-dialog 
      v-model="showDialog"
      dialog-title="提示"
      dialog-subtitle="这是一个对话框副标题"
      @hide="handleHide"
    >
      <p>这是对话框内容</p>
      <base-button @click="hideDialog">关闭</base-button>
    </app-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false
    }
  },
  methods: {
    hideDialog() {
      this.showDialog = false;
    },
    handleHide() {
      console.log('对话框关闭');
    }
  }
}
</script>
```

### SmoothNumber

平滑数字变化组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| value | 目标数值 | Number | - | - |
| duration | 动画持续时间（毫秒） | Number | - | 1000 |

#### 示例

```vue
<template>
  <smooth-number :value="number" :duration="1000" />
  <base-button @click="number += 100">增加100</base-button>
</template>

<script>
export default {
  data() {
    return {
      number: 1000
    }
  }
}
</script>
```

### Avatar

头像组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| url | 头像图片URL | String | - | - |
| size | 头像大小（像素） | Number | - | 0 |
| round | 是否圆形头像 | Boolean | - | false |
| pointer | 是否显示指针样式 | Boolean | - | true |

#### 示例

```vue
<template>
  <div>
    <avatar :src="avatarUrl" :size="40" />
    <avatar :src="avatarUrl" :size="60" :round="true" />
    <avatar :size="80" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatarUrl: 'https://example.com/avatar.jpg'
    }
  }
}
</script>
```

### Ripple

水波纹指令。

#### 示例

```vue
<template>
  <button v-ipple>点击我</button>
</template>
```

### CircleTranslateButton

圆形翻译按钮组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| text | 要翻译的文本 | String | - | - |

#### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| translate | 点击翻译按钮时触发 | (text: string) |

#### 示例

```vue
<template>
  <circle-translate-button text="Hello World" @translate="handleTranslate" />
</template>

<script>
export default {
  methods: {
    handleTranslate(text) {
      console.log('翻译文本:', text);
    }
  }
}
</script>
```

### Annex

附件组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| files | 文件列表 | Array | - | - |

#### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| remove | 移除文件时触发 | (file: object) |

#### 示例

```vue
<template>
  <annex :files="fileList" @remove="handleRemove" />
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        { name: 'document.pdf', url: 'https://example.com/document.pdf' }
      ]
    }
  },
  methods: {
    handleRemove(file) {
      console.log('移除文件:', file);
    }
  }
}
</script>
```

### XCard

卡片组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| title | 卡片标题 | String | - | - |
| shadow | 阴影显示时机 | String/Boolean | never/always/hover/false | false |
| border | 是否显示边框 | Boolean | - | false |
| headerStyle | 头部样式 | Object | - | - |
| coverStyle | 封面样式 | Object | - | - |
| contentStyle | 内容样式 | Object | - | - |
| footerStyle | 底部样式 | Object | - | - |
| actionStyle | 操作区样式 | Object | - | - |

#### Slots

| 插槽名 | 说明 |
|--------|------|
| header | 卡片头部内容 |
| extra | 卡片头部右侧操作区 |
| cover | 卡片封面内容 |
| default | 卡片主体内容 |
| footer | 卡片底部内容 |
| action | 卡片操作区内容 |

#### 示例

```vue
<template>
  <x-card title="卡片标题" :shadow="true" :border="true">
    <template v-slot:extra>
      <base-button size="mini">更多</base-button>
    </template>
    <p>这是卡片内容</p>
    <template v-slot:footer>
      <base-button>确定</base-button>
      <base-button type="text">取消</base-button>
    </template>
  </x-card>
</template>
```

### XHeader

头部组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| back | 是否显示返回按钮 | Boolean | - | false |
| backText | 返回按钮文本 | String | - | '返回' |
| backIcon | 返回按钮图标 | String | - | 'back' |
| backHome | 返回按钮点击回调 | Function | - | - |

#### Slots

| 插槽名 | 说明 |
|--------|------|
| back | 自定义返回按钮内容 |
| default | 头部右侧内容 |

#### 示例

```vue
<template>
  <x-header :back="true" back-home="handleBackHome">
    <base-button>操作</base-button>
  </x-header>
</template>

<script>
export default {
  methods: {
    handleBackHome() {
      this.$router.push('/');
    }
  }
}
</script>
```

### XTab

标签页组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| data | 标签页数据 | Array | - | [{name:'菜单1',value:'菜单1'},{name:'菜单2',value:'菜单2'}] |
| actived | 当前激活的标签页 | String/Number | - | - |
| vertical | 是否垂直显示 | Boolean | - | false |

#### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 切换标签页时触发 | (value: string/number) |

#### Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| default | 标签页内容 | item: 标签页数据对象 |

#### 示例

```vue
<template>
  <div>
    <x-tab v-model="activeTab" :data="tabs" @change="handleTabChange">
      <template v-slot:default="{ item }">
        {{ item.name }}
      </template>
    </x-tab>
    <div v-if="activeTab === 'tab1'">
      <p>标签页1内容</p>
    </div>
    <div v-if="activeTab === 'tab2'">
      <p>标签页2内容</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'tab1',
      tabs: [
        { name: '标签1', value: 'tab1' },
        { name: '标签2', value: 'tab2' }
      ]
    }
  },
  methods: {
    handleTabChange(value) {
      console.log('切换到标签:', value);
    }
  }
}
</script>
```

### Cover

封面组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| src | 封面图片URL | String | - | - |
| title | 封面标题 | String | - | - |

#### 示例

```vue
<template>
  <cover :src="coverUrl" :title="title" />
</template>

<script>
export default {
  data() {
    return {
      coverUrl: 'https://example.com/cover.jpg',
      title: '封面标题'
    }
  }
}
</script>
```

### WangEditor

富文本编辑器组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| userId | 用户ID（必需） | String | - | - |
| value | 编辑器内容 | String | - | '' |
| placeholder | 占位符文本 | String | - | '' |
| plugins | 插件列表 | Array | - | [] |

#### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:value | 内容变化时触发 | (value: string) |

#### 示例

```vue
<template>
  <wang-editor 
    v-model="content" 
    :user-id="userId"
    placeholder="请输入内容"
  />
</template>

<script>
export default {
  data() {
    return {
      content: '<p>初始内容</p>',
      userId: 'user123'
    }
  }
}
</script>
```

### AppNumberBoard

数字面板组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| numbers | 数字数据数组 | Array | - | - |

#### 示例

```vue
<template>
  <app-number-board :numbers="numbers" />
</template>

<script>
export default {
  data() {
    return {
      numbers: [
        { label: '访问量', value: 1234 },
        { label: '用户数', value: 567 }
      ]
    }
  }
}
</script>
```

### UserProfile

用户资料组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| profile | 用户资料对象 | Object | - | - |
| avatarSize | 头像大小 | Number | - | 60 |
| avatarRound | 是否圆形头像 | Boolean | - | false |
| themeLight | 是否使用浅色主题 | Boolean | - | false |
| disableTitle | 是否禁用职称显示 | Boolean | - | false |
| disableInstitution | 是否禁用机构显示 | Boolean | - | false |
| disableEmail | 是否禁用邮箱显示 | Boolean | - | false |

#### 示例

```vue
<template>
  <user-profile 
    :user-info="userInfo" 
    :avatar-size="80" 
    :avatar-round="true"
  />
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: '张三',
        avatar: 'https://example.com/avatar.jpg',
        email: 'zhangsan@example.com',
        professional_title: ['高级工程师'],
        position: ['前端开发'],
        affiliation: ['示例公司']
      }
    }
  }
}
</script>
```

### InstitutionAvatar

机构头像组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| src | 头像图片URL | String | - | - |
| name | 机构名称 | String | - | - |

#### 示例

```vue
<template>
  <institution-avatar :src="logoUrl" :name="institutionName" />
</template>

<script>
export default {
  data() {
    return {
      logoUrl: 'https://example.com/logo.jpg',
      institutionName: '示例机构'
    }
  }
}
</script>
```

### InstitutionProfile

机构资料组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| institution | 机构资料对象 | Object | - | - |

#### 示例

```vue
<template>
  <institution-profile :institution="institutionInfo" />
</template>

<script>
export default {
  data() {
    return {
      institutionInfo: {
        name: '示例机构',
        logo: 'https://example.com/logo.jpg',
        description: '这是一个示例机构'
      }
    }
  }
}
</script>
```

### InstitutionX

机构扩展组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| institution | 机构数据对象 | Object | - | - |

#### 示例

```vue
<template>
  <institution-x :institution="institutionInfo" />
</template>

<script>
export default {
  data() {
    return {
      institutionInfo: {
        name: '示例机构',
        logo: 'https://example.com/logo.jpg'
      }
    }
  }
}
</script>
```

### Institution

机构组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| data | 机构数据对象 | Object | - | - |

#### 示例

```vue
<template>
  <institution :data="institutionData" />
</template>

<script>
export default {
  data() {
    return {
      institutionData: {
        name: '示例机构',
        description: '机构描述'
      }
    }
  }
}
</script>
```

### AuthorX

作者扩展组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| author | 作者数据对象 | Object | - | - |

#### 示例

```vue
<template>
  <author-x :author="authorInfo" />
</template>

<script>
export default {
  data() {
    return {
      authorInfo: {
        name: '张三',
        avatar: 'https://example.com/avatar.jpg'
      }
    }
  }
}
</script>
```

### Author

作者组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| data | 作者数据对象 | Object | - | - |

#### 示例

```vue
<template>
  <author :data="authorData" />
</template>

<script>
export default {
  data() {
    return {
      authorData: {
        name: '张三',
        description: '作者描述'
      }
    }
  }
}
</script>
```

### AuthorOrIns

作者或机构组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| data | 数据对象 | Object | - | - |

#### 示例

```vue
<template>
  <author-or-ins :data="data" />
</template>

<script>
export default {
  data() {
    return {
      data: {
        type: 'author', // 或 'institution'
        name: '张三',
        avatar: 'https://example.com/avatar.jpg'
      }
    }
  }
}
</script>
```

### AppTip

应用提示组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| type | 提示类型 | String | info/success/warning/error | info |
| closable | 是否可关闭 | Boolean | - | true |

#### 示例

```vue
<template>
  <app-tip type="info" :closable="true">
    这是一个提示信息
  </app-tip>
</template>
```

### DatePickerX

日期选择器扩展组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| value | 选中日期 | Date | - | - |

#### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| input | 选中日期变化时触发 | (date: Date) |

#### 示例

```vue
<template>
  <date-picker-x v-model="date" />
</template>

<script>
export default {
  data() {
    return {
      date: new Date()
    }
  }
}
</script>
```

### Keywords

关键词组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| words | 关键词数组 | Array | - | - |

#### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击关键词时触发 | (keyword: string) |

#### 示例

```vue
<template>
  <keywords :words="keywords" @click="handleKeywordClick" />
</template>

<script>
export default {
  data() {
    return {
      keywords: ['Vue', 'React', 'Angular']
    }
  },
  methods: {
    handleKeywordClick(keyword) {
      console.log('点击关键词:', keyword);
    }
  }
}
</script>
```

### ImageViewer

图片查看器组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| url | 图片URL | String | - | - |
| visible | 是否显示查看器 | Boolean | - | false |

#### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭查看器时触发 | - |

#### 示例

```vue
<template>
  <div>
    <base-button @click="showViewer">查看图片</base-button>
    <image-viewer 
      :url="imageUrl" 
      :visible="visible" 
      @close="handleClose" 
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: 'https://example.com/image.jpg',
      visible: false
    }
  },
  methods: {
    showViewer() {
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
    }
  }
}
</script>
```

### HoverCard

悬停卡片组件。

#### Slots

| 插槽名 | 说明 |
|--------|------|
| trigger | 触发悬停的内容 |
| content | 悬停显示的内容 |

#### 示例

```vue
<template>
  <hover-card>
    <template v-slot:trigger>
      <button>悬停查看</button>
    </template>
    <template v-slot:content>
      <p>这是悬停显示的内容</p>
    </template>
  </hover-card>
</template>
```

### FollowButton

关注按钮组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| following | 是否已关注 | Boolean | - | false |

#### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| toggle | 切换关注状态时触发 | (following: boolean) |

#### 示例

```vue
<template>
  <follow-button :following="isFollowing" @toggle="handleToggle" />
</template>

<script>
export default {
  data() {
    return {
      isFollowing: false
    }
  },
  methods: {
    handleToggle(following) {
      this.isFollowing = following;
      console.log('关注状态:', following);
    }
  }
}
</script>
```

### AvatarGroup

头像组组件。

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| avatars | 头像数据数组 | Array | - | - |
| max | 最大显示数量 | Number | - | - |

#### 示例

```vue
<template>
  <avatar-group :avatars="avatars" :max="3" />
</template>

<script>
export default {
  data() {
    return {
      avatars: [
        { src: 'https://example.com/avatar1.jpg', name: '用户1' },
        { src: 'https://example.com/avatar2.jpg', name: '用户2' },
        { src: 'https://example.com/avatar3.jpg', name: '用户3' },
        { src: 'https://example.com/avatar4.jpg', name: '用户4' }
      ]
    }
  }
}
</script>
```

## 工具函数

### 加密与哈希函数

#### MD5(message)
- **功能**: 计算字符串的MD5哈希值
- **参数**: 
  - `message` (String): 要计算哈希值的字符串
- **返回值**: String - 十六进制格式的MD5哈希值
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

const hash = BaseUtil.MD5('hello world')
console.log(hash) // 输出: 5eb63bbbe01eeed093cb22bb8f5acdc3
```

#### encryptAES(data, key)
- **功能**: 使用AES算法加密数据
- **参数**: 
  - `data` (String): 要加密的数据
  - `key` (String): 加密密钥
- **返回值**: String - 加密后的字符串
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

const encrypted = BaseUtil.encryptAES('sensitive data', 'secret-key')
```

#### decryptAES(encrypted, key)
- **功能**: 使用AES算法解密数据
- **参数**: 
  - `encrypted` (String): 加密的数据
  - `key` (String): 解密密钥
- **返回值**: String - 解密后的原始数据
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

const decrypted = BaseUtil.decryptAES(encryptedData, 'secret-key')
```

### ID与字符串生成函数

#### generateId()
- **功能**: 生成一个随机ID
- **参数**: 无
- **返回值**: Number - 0-9999之间的随机整数
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

const id = BaseUtil.generateId()
console.log(id) // 输出: 1234 (示例)
```

#### randomString(length)
- **功能**: 生成指定长度的随机字符串
- **参数**: 
  - `length` (Number): 字符串长度
- **返回值**: String - 包含数字和小写字母的随机字符串
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

const str = BaseUtil.randomString(8)
console.log(str) // 输出: "a1b2c3d4" (示例)
```

#### generateUUID()
- **功能**: 生成UUID字符串
- **参数**: 无
- **返回值**: String - UUID格式的字符串
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

const uuid = BaseUtil.generateUUID()
console.log(uuid) // 输出: "f47ac10b-58cc-4372-a567-0e02b2c3d479" (示例)
```

### 数据验证与处理函数

#### isEmpty(val)
- **功能**: 检查值是否为空（null、undefined、空字符串、空数组、空对象）
- **参数**: 
  - `val` (Any): 要检查的值
- **返回值**: Boolean - 如果值为空返回true，否则返回false
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

console.log(BaseUtil.isEmpty(null)) // true
console.log(BaseUtil.isEmpty('')) // true
console.log(BaseUtil.isEmpty([])) // true
console.log(BaseUtil.isEmpty({})) // true
console.log(BaseUtil.isEmpty('hello')) // false
```

#### isArrayEmpty(val)
- **功能**: 检查数组是否为空或未定义
- **参数**: 
  - `val` (Array): 要检查的数组
- **返回值**: Boolean - 如果数组为空或未定义返回true，否则返回false
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

console.log(BaseUtil.isArrayEmpty([])) // true
console.log(BaseUtil.isArrayEmpty([1, 2, 3])) // false
console.log(BaseUtil.isArrayEmpty(undefined)) // true
```

#### isObjectEmpty(val)
- **功能**: 检查对象是否为空或未定义
- **参数**: 
  - `val` (Object): 要检查的对象
- **返回值**: Boolean - 如果对象为空或未定义返回true，否则返回false
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

console.log(BaseUtil.isObjectEmpty({})) // true
console.log(BaseUtil.isObjectEmpty({a: 1})) // false
console.log(BaseUtil.isObjectEmpty(undefined)) // true
```

#### isFunction(val)
- **功能**: 检查值是否为函数
- **参数**: 
  - `val` (Any): 要检查的值
- **返回值**: Boolean - 如果值是函数返回true，否则返回false
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

console.log(BaseUtil.isFunction(() => {})) // true
console.log(BaseUtil.isFunction(function() {})) // true
console.log(BaseUtil.isFunction('hello')) // false
```

### 数据转换函数

#### formatFileSize(bytes)
- **功能**: 格式化文件大小为人类可读的格式
- **参数**: 
  - `bytes` (Number): 文件大小（字节）
- **返回值**: String - 格式化后的文件大小（如 "1.5 MB"）
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

console.log(BaseUtil.formatFileSize(1024)) // "1 KB"
console.log(BaseUtil.formatFileSize(1048576)) // "1 MB"
console.log(BaseUtil.formatFileSize(1073741824)) // "1 GB"
```

#### formatDate(date, format)
- **功能**: 格式化日期
- **参数**: 
  - `date` (Date|String|Number): 日期对象、时间戳或日期字符串
  - `format` (String): 日期格式，默认为 "YYYY-MM-DD"
- **返回值**: String - 格式化后的日期字符串
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

console.log(BaseUtil.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')) // "2023-12-22 14:30:00" (示例)
console.log(BaseUtil.formatDate(1671694200000, 'YYYY/MM/DD')) // "2022/12/22" (示例)
```

#### formatNumber(num, digits)
- **功能**: 格式化数字，添加千位分隔符
- **参数**: 
  - `num` (Number): 要格式化的数字
  - `digits` (Number): 保留的小数位数，默认为2
- **返回值**: String - 格式化后的数字字符串
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

console.log(BaseUtil.formatNumber(1234567.891)) // "1,234,567.89"
console.log(BaseUtil.formatNumber(1234567.891, 0)) // "1,234,568"
```

### URL与参数处理函数

#### getQueryString(name)
- **功能**: 获取URL查询字符串参数值
- **参数**: 
  - `name` (String): 参数名
- **返回值**: String - 参数值，如果不存在则返回null
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

// 假设当前URL为: https://example.com?id=123&name=test
console.log(BaseUtil.getQueryString('id')) // "123"
console.log(BaseUtil.getQueryString('name')) // "test"
console.log(BaseUtil.getQueryString('nonexistent')) // null
```

#### setQueryString(url, params)
- **功能**: 设置URL查询字符串参数
- **参数**: 
  - `url` (String): 原始URL
  - `params` (Object): 要设置的参数对象
- **返回值**: String - 设置参数后的URL
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

const newUrl = BaseUtil.setQueryString('https://example.com', { id: 123, name: 'test' })
console.log(newUrl) // "https://example.com?id=123&name=test"
```

### 数据存储函数

#### setLocalStorage(key, value)
- **功能**: 设置本地存储数据
- **参数**: 
  - `key` (String): 存储键名
  - `value` (Any): 要存储的值（会自动序列化为JSON）
- **返回值**: 无
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

BaseUtil.setLocalStorage('user', { id: 1, name: 'John' })
```

#### getLocalStorage(key)
- **功能**: 获取本地存储数据
- **参数**: 
  - `key` (String): 存储键名
- **返回值**: Any - 存储的值（会自动反序列化JSON），如果不存在则返回null
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

const user = BaseUtil.getLocalStorage('user')
console.log(user) // { id: 1, name: 'John' } (示例)
```

#### removeLocalStorage(key)
- **功能**: 删除本地存储数据
- **参数**: 
  - `key` (String): 存储键名
- **返回值**: 无
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

BaseUtil.removeLocalStorage('user')
```

### 其他工具函数

#### debounce(func, wait)
- **功能**: 创建防抖函数
- **参数**: 
  - `func` (Function): 要防抖的函数
  - `wait` (Number): 等待时间（毫秒）
- **返回值**: Function - 防抖后的函数
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

const debouncedSearch = BaseUtil.debounce((query) => {
  console.log('搜索:', query)
}, 300)

debouncedSearch('test') // 只在停止输入300ms后执行
```

#### throttle(func, wait)
- **功能**: 创建节流函数
- **参数**: 
  - `func` (Function): 要节流的函数
  - `wait` (Number): 等待时间（毫秒）
- **返回值**: Function - 节流后的函数
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

const throttledScroll = BaseUtil.throttle(() => {
  console.log('滚动事件')
}, 100)

window.addEventListener('scroll', throttledScroll)
```

#### deepClone(obj)
- **功能**: 深度克隆对象
- **参数**: 
  - `obj` (Any): 要克隆的对象
- **返回值**: Any - 克隆后的对象
- **示例**:
```javascript
import { BaseUtil } from '@zkwq-x/business'

const original = { a: 1, b: { c: 2 } }
const cloned = BaseUtil.deepClone(original)

cloned.b.c = 3
console.log(original.b.c) // 2 (原对象未受影响)
console.log(cloned.b.c) // 3
```

### Base64Util

Base64 编码解码工具。

#### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| encode | Base64编码 | (str: string) | string |
| decode | Base64解码 | (str: string) | string |

#### 示例

```javascript
import { Base64Util } from '@zkwq-x/business';

// 编码
const encoded = Base64Util.encode('hello world');

// 解码
const decoded = Base64Util.decode(encoded);
```

### http

HTTP 请求工具。

#### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| get | GET请求 | (url: string, config?: object) | Promise |
| post | POST请求 | (url: string, data?: any, config?: object) | Promise |
| put | PUT请求 | (url: string, data?: any, config?: object) | Promise |
| delete | DELETE请求 | (url: string, config?: object) | Promise |

#### 示例

```javascript
import { http } from '@zkwq-x/business';

// GET 请求
http.get('/api/data').then(response => {
  console.log(response.data);
});

// POST 请求
http.post('/api/data', { name: 'test' }).then(response => {
  console.log(response.data);
});
```

### CONSTANT

常量集合。

#### 属性

| 属性名 | 说明 | 类型 |
|--------|------|------|
| API_BASE_URL | API基础URL | string |
| STATUS_CODE | 状态码常量 | object |

#### 示例

```javascript
import { CONSTANT } from '@zkwq-x/business';

// 使用常量
console.log(CONSTANT.API_BASE_URL);
console.log(CONSTANT.STATUS_CODE.SUCCESS);
```

### ScrollTool

滚动工具。

#### 方法

| 方法名 | 说明 | 参数 |
|--------|------|------|
| scrollToTop | 滚动到顶部 | - |
| scrollToElement | 滚动到指定元素 | (selector: string) |
| scrollBottom | 滚动到底部 | - |

#### 示例

```javascript
import { ScrollTool } from '@zkwq-x/business';

// 滚动到顶部
ScrollTool.scrollToTop();

// 滚动到指定元素
ScrollTool.scrollToElement('#target');
```

### Quote

引用工具。

#### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| format | 格式化引用 | (text: string) | string |

#### 示例

```javascript
import { Quote } from '@zkwq-x/business';

// 格式化引用
const formattedQuote = Quote.format('这是一段引用文本');
```

### Bus

事件总线。

#### 方法

| 方法名 | 说明 | 参数 |
|--------|------|------|
| on | 监听事件 | (type: string, callBack: Function) |
| trigger | 触发事件 | (type: string, options: any) |
| remove | 移除事件监听 | (type: string, callBack: Function) |

#### 示例

```javascript
import { Bus } from '@zkwq-x/business';

// 监听事件
Bus.on('custom-event', (data) => {
  console.log('接收到事件:', data)
})

// 触发事件
Bus.trigger('custom-event', { message: 'Hello World' })

// 移除事件监听
const handler = (data) => console.log(data)
Bus.on('another-event', handler)
Bus.remove('another-event', handler)
```

### HighLight

高亮工具。

#### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| highlight | 高亮文本 | (text: string, keyword: string) | string |

#### 示例

```javascript
import { HighLight } from '@zkwq-x/business';

// 高亮文本
const highlightedText = HighLight.highlight('原始文本', '关键词');
```

## 服务模块

### 日志服务

#### SaveLog(params, application, user, module)
- **功能**: 保存用户操作日志
- **参数**: 
  - `params` (Object): 日志参数对象
  - `application` (String): 应用名称
  - `user` (Object): 用户对象
  - `module` (String): 模块名称，默认为'后台管理'
- **返回值**: Promise - 请求Promise对象
- **示例**:
```javascript
import { Service } from '@zkwq-x/business'

Service.SaveLog(
  { action: 'login', ip: '192.168.1.1' },
  '管理系统',
  { id: 1, name: 'admin' },
  '用户管理'
).then(() => {
  console.log('日志保存成功')
})
```

### 资源导出服务

#### ExportResource(params)
- **功能**: 导出资源文件
- **参数**: 
  - `params` (Object): 导出参数对象
- **返回值**: Promise<Blob> - 返回文件数据的Promise
- **示例**:
```javascript
import { Service } from '@zkwq-x/business'

Service.ExportResource({ type: 'excel', ids: [1, 2, 3] }).then(blob => {
  // 创建下载链接
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'export.xlsx'
  link.click()
})
```

#### ExportResourceTxt(params)
- **功能**: 导出资源为文本文件
- **参数**: 
  - `params` (Object): 导出参数对象
- **返回值**: Promise<Blob> - 返回文本文件数据的Promise
- **示例**:
```javascript
import { Service } from '@zkwq-x/business'

Service.ExportResourceTxt({ format: 'txt', content: '导出内容' }).then(blob => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'export.txt'
  link.click()
})
```

### 用户服务

#### GetUserV2(uid, user_id, app_id)
- **功能**: 获取用户信息（V2版本）
- **参数**: 
  - `uid` (String): 用户ID
  - `user_id` (String): 当前用户ID
  - `app_id` (String): 应用ID
- **返回值**: Promise - 包含用户信息的Promise
- **示例**:
```javascript
import { Service } from '@zkwq-x/business'

Service.GetUserV2('user123', 'current_user456', 'app789').then(user => {
  console.log('用户信息:', user)
}).catch(error => {
  console.error('获取用户信息失败:', error)
})
```

#### GetUser(uid)
- **功能**: 获取用户信息
- **参数**: 
  - `uid` (String): 用户ID
- **返回值**: Promise - 包含用户信息的Promise
- **示例**:
```javascript
import { Service } from '@zkwq-x/business'

Service.GetUser('user123').then(user => {
  console.log('用户信息:', user)
})
```

#### GetUsers(uids)
- **功能**: 批量获取用户信息
- **参数**: 
  - `uids` (Array): 用户ID数组
- **返回值**: Promise - 包含用户信息数组的Promise
- **示例**:
```javascript
import { Service } from '@zkwq-x/business'

Service.GetUsers(['user1', 'user2', 'user3']).then(users => {
  console.log('用户列表:', users)
})
```

#### UpdateUser(uid, data)
- **功能**: 更新用户信息
- **参数**: 
  - `uid` (String): 用户ID
  - `data` (Object): 要更新的用户数据
- **返回值**: Promise - 更新结果的Promise
- **示例**:
```javascript
import { Service } from '@zkwq-x/business'

Service.UpdateUser('user123', { name: '新名称', email: 'new@example.com' }).then(result => {
  console.log('用户信息更新成功:', result)
})
```

### 文件服务

#### UploadFile(file, options)
- **功能**: 上传文件
- **参数**: 
  - `file` (File): 要上传的文件对象
  - `options` (Object): 上传选项，包含类型、路径等
- **返回值**: Promise - 包含上传结果和文件信息的Promise
- **示例**:
```javascript
import { Service } from '@zkwq-x/business'

const fileInput = document.getElementById('file-input')
const file = fileInput.files[0]

Service.UploadFile(file, { type: 'avatar', folder: 'user' }).then(result => {
  console.log('文件上传成功:', result.url)
})
```

#### GetFileUrl(fileId)
- **功能**: 获取文件访问URL
- **参数**: 
  - `fileId` (String): 文件ID
- **返回值**: Promise - 包含文件URL的Promise
- **示例**:
```javascript
import { Service } from '@zkwq-x/business'

Service.GetFileUrl('file123').then(url => {
  console.log('文件URL:', url)
})
```

#### DeleteFile(fileId)
- **功能**: 删除文件
- **参数**: 
  - `fileId` (String): 文件ID
- **返回值**: Promise - 删除结果的Promise
- **示例**:
```javascript
import { Service } from '@zkwq-x/business'

Service.DeleteFile('file123').then(() => {
  console.log('文件删除成功')
})
```

### 数据统计服务

#### GetStatistics(params)
- **功能**: 获取统计数据
- **参数**: 
  - `params` (Object): 统计参数，包含时间范围、类型等
- **返回值**: Promise - 包含统计数据的Promise
- **示例**:
```javascript
import { Service } from '@zkwq-x/business'

Service.GetStatistics({
  startDate: '2023-01-01',
  endDate: '2023-12-31',
  type: 'user_activity'
}).then(data => {
  console.log('统计数据:', data)
})
```

#### GetReport(params)
- **功能**: 获取报告数据
- **参数**: 
  - `params` (Object): 报告参数，包含报告类型、筛选条件等
- **返回值**: Promise - 包含报告数据的Promise
- **示例**:
```javascript
import { Service } from '@zkwq-x/business'

Service.GetReport({
  type: 'monthly',
  month: '2023-12',
  format: 'json'
}).then(report => {
  console.log('报告数据:', report)
})
```

### 关注服务

#### FollowUser(userId, targetUserId)
- **功能**: 关注用户
- **参数**: 
  - `userId` (String): 当前用户ID
  - `targetUserId` (String): 要关注的用户ID
- **返回值**: Promise - 关注结果的Promise
- **示例**:
```javascript
import { Service } from '@zkwq-x/business'

Service.FollowUser('current_user', 'target_user').then(() => {
  console.log('关注成功')
})
```

#### UnfollowUser(userId, targetUserId)
- **功能**: 取消关注用户
- **参数**: 
  - `userId` (String): 当前用户ID
  - `targetUserId` (String): 要取消关注的用户ID
- **返回值**: Promise - 取消关注结果的Promise
- **示例**:
```javascript
import { Service } from '@zkwq-x/business'

Service.UnfollowUser('current_user', 'target_user').then(() => {
  console.log('取消关注成功')
})
```

#### GetFollowers(userId)
- **功能**: 获取用户粉丝列表
- **参数**: 
  - `userId` (String): 用户ID
- **返回值**: Promise - 包含粉丝列表的Promise
- **示例**:
```javascript
import { Service } from '@zkwq-x/business'

Service.GetFollowers('user123').then(followers => {
  console.log('粉丝列表:', followers)
})
```

#### GetFollowing(userId)
- **功能**: 获取用户关注列表
- **参数**: 
  - `userId` (String): 用户ID
- **返回值**: Promise - 包含关注列表的Promise
- **示例**:
```javascript
import { Service } from '@zkwq-x/business'

Service.GetFollowing('user123').then(following => {
  console.log('关注列表:', following)
})
```

### 搜索服务

#### Search(query, options)
- **功能**: 执行搜索
- **参数**: 
  - `query` (String): 搜索关键词
  - `options` (Object): 搜索选项，包含类型、分页等
- **返回值**: Promise - 包含搜索结果的Promise
- **示例**:
```javascript
import { Service } from '@zkwq-x/business'

Service.Search('Vue.js', { type: 'articles', page: 1, pageSize: 10 }).then(results => {
  console.log('搜索结果:', results)
})
```

#### GetSearchSuggestions(query)
- **功能**: 获取搜索建议
- **参数**: 
  - `query` (String): 搜索关键词
- **返回值**: Promise - 包含搜索建议列表的Promise
- **示例**:
```javascript
import { Service } from '@zkwq-x/business'

Service.GetSearchSuggestions('Vue').then(suggestions => {
  console.log('搜索建议:', suggestions)
})
```

## 指令

### v-ripple

水波纹指令，为元素添加点击水波纹效果。

#### 示例

```vue
<template>
  <button v-ipple>点击我有水波纹效果</button>
</template>
```

## 样式

组件库提供了完整的样式文件，引入方式：

```javascript
import '@zkwq-x/business/style/index.scss';
```

## 贡献

欢迎提交 Issue 和 Pull Request 来完善组件库。

## 许可证

[MIT License](LICENSE)