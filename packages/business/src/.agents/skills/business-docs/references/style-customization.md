# 样式深度定制指南

本文档面向需要对 `base-input` 和 `base-select` 进行深度样式定制的场景，说明这两个组件相对于原版 Element-UI 的结构差异、新增特性及推荐的覆盖方式。

---

## base-input

### 结构差异

原版 Element-UI 的 input 使用带边框的矩形输入框，本组件改为**无边框 + 底部线条**风格：

- `.base-input__inner` 的 `border` 被设为 `none`，`border-radius` 为 `0`，背景透明
- 底部线条通过父容器 `.base-input` 的 `::before` / `::after` 伪元素实现：
  - `::before`：静态底线，颜色为 `$--input-border-color`（`#DCDFE6`），hover 时变为 `$--input-hover-border`
  - `::after`：聚焦高亮线，颜色为 `$--color-primary`（`#2F3A91`），通过 `scaleX(0 → 1)` 动画展开
- 以上效果仅在父容器有 `.is-rippled` 类时生效（由 prop `ripple` 控制，默认 `true`）

### 浮动 Label

组件新增了浮动 placeholder 效果，由 `.base-input__placeholder` 元素实现（prop `showLabel` 默认 `true`）：

- 默认状态：与输入框等高，颜色为 `$--input-placeholder-color`
- 激活状态（`.is-active`，即有值或聚焦时）：向上位移 `translateY(-10px)`，字号缩小至 `12px`
- 聚焦时（父容器有 `.is-focused`）：浮动 label 颜色变为 `$--color-primary`

> 注意：启用 `showLabel` 时，原生 `placeholder` 属性会被置为 `null`，浮动 label 承担占位符职责。

### 新增 Props（影响样式）

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| ripple | Boolean | true | 是否启用底部线条动画。设为 `false` 则无底线，需自行提供边框样式 |
| showLabel | Boolean | true | 是否启用浮动 label。设为 `false` 则恢复原生 placeholder 行为 |
| enableFocusClass | Boolean | true | 聚焦时是否在根元素添加 `.is-focused` 类 |
| alwaysShowClear | Boolean | false | 是否始终显示清除按钮（不依赖 hover/focus 状态） |
| tags | Array | [] | 传入已选 tag 列表，用于多选场景下浮动 label 的激活判断 |

### 关键 CSS 类

| 类名 | 触发条件 | 说明 |
|------|----------|------|
| `.is-rippled` | `ripple: true` | 启用底部线条伪元素 |
| `.is-focused` | 聚焦且 `enableFocusClass: true` | 聚焦状态，浮动 label 变色 |
| `.is-disabled` | `disabled: true` | 禁用状态，文字颜色变浅，cursor 变为 not-allowed |
| `.base-input__placeholder.is-active` | 有值或聚焦 | 浮动 label 上移激活态 |

### 定制示例

**替换底部线条颜色：**
```scss
.base-input.is-rippled::before {
  background-color: #e0e0e0; // 覆盖静态底线颜色
}
.base-input.is-rippled::after {
  background-color: #your-primary-color; // 覆盖聚焦高亮线颜色
}
```

**恢复传统边框风格（禁用 ripple）：**
```vue
<base-input :ripple="false" :show-label="false" placeholder="请输入" />
```
```scss
.base-input__inner {
  border: 1px solid #dcdfe6 !important;
  border-radius: 4px !important;
  padding: 0 12px !important;
}
```

**自定义浮动 label 样式：**
```scss
.base-input__placeholder {
  color: #999; // 默认颜色
  font-size: 14px;
}
.base-input__placeholder.is-active {
  color: #666; // 激活后颜色
  transform: translateY(-14px); // 调整上移距离
}
.base-input.is-focused .base-input__placeholder.is-active {
  color: #your-primary-color; // 聚焦时颜色
}
```

---

## base-select

### 结构说明

`base-select` 内部使用 `base-input` 渲染输入框，因此继承了所有 input 的底部线条和浮动 label 特性。

额外的结构差异：

- 下拉箭头图标（`.base-select__caret`）位于 `base-input` 的 `suffix` slot 内，通过 `rotateZ` 控制展开/收起动画
- 多选 tag 列表（`.base-select__tags`）绝对定位于输入框内，`z-index` 为 `$--index-normal`

### Tag 样式定制

多选模式下，已选项以 tag 形式展示，样式已从原版大幅定制：

| 属性 | 定制值 | 说明 |
|------|--------|------|
| `border-radius` | `20px` | 圆角胶囊形 |
| `height` | `26px` | 比原版更紧凑 |
| `background-color` | `$--background-color-base`（`#F3F5F8`） | 浅灰背景，无边框 |
| `color` | `$--color-text-secondary`（`#8590a6`） | 次要文字色 |
| 关闭按钮背景 | `$--color-text-placeholder` | 灰色圆形关闭按钮 |

覆盖 tag 样式：
```scss
.base-select .base-tag {
  border-radius: 4px; // 改为方形
  background-color: #e8f0fe !important;
  color: #1a73e8 !important;
}
.base-select .base-tag__close.base-icon-close {
  background-color: #1a73e8;
}
```

### 下拉面板

下拉面板类名为 `.base-select-dropdown`，挂载在 `body` 下（`popperAppendToBody: true`）。

| 属性 | 默认值 | 对应变量 |
|------|--------|----------|
| 背景色 | `#ffffff` | `$--select-dropdown-background` |
| 边框 | `1px solid #E4E7ED` | `$--select-dropdown-border` |
| 阴影 | `0 2px 12px 0 rgba(0,0,0,0.1)` | `$--select-dropdown-shadow` |
| 最大高度 | `274px` | `$--select-dropdown-max-height` |
| 选项高度 | `34px` | `$--select-option-height` |

选项状态颜色：

| 状态 | 颜色 | 对应变量 |
|------|------|----------|
| 默认 | `#8590a6` | `$--select-option-color` |
| hover | 背景 `#F3F5F8` | `$--select-option-hover-background` |
| 已选中 | `#2F3A91`（primary），加粗 | `$--select-option-selected-font-color` |
| 禁用 | `#8590a6` | `$--select-option-disabled-color` |

### 新增 Props（影响样式）

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| ripple | Boolean | true | 透传给内部 `base-input`，控制底部线条 |
| showLabel | Boolean | true | 透传给内部 `base-input`，控制浮动 label |
| placement | String | `'bottom-start'` | 下拉面板弹出方向 |
| visibleArrow | Boolean | false | 是否显示下拉面板的箭头指示 |

### 定制示例

**覆盖下拉面板样式：**
```scss
// 注意：面板挂载在 body 下，需要全局样式或使用 popperClass prop
.base-select-dropdown {
  border-radius: 8px;
  border-color: #e0e0e0;
}
.base-select-dropdown__item {
  height: 40px;
  line-height: 40px;
}
.base-select-dropdown__item.selected {
  color: #your-primary-color;
  background-color: #f0f4ff;
}
```

**通过 popperClass 精准定位：**
```vue
<base-select popper-class="my-select-dropdown" v-model="val">
  ...
</base-select>
```
```scss
.my-select-dropdown {
  .base-select-dropdown__item {
    padding: 0 16px;
  }
}
```

---

## SCSS 变量速查

如果项目中引入了 SCSS 变量文件，可直接覆盖以下变量来批量修改样式：

```scss
// 主色（影响底部高亮线、聚焦 label 颜色、已选项颜色）
$--color-primary: #your-color;

// Input 底部静态线颜色
$--input-border-color: #dcdfe6;

// Input hover 时底线颜色
$--input-hover-border: #8590a6;

// Input placeholder / 浮动 label 默认颜色
$--input-placeholder-color: #8590a6;

// Select 选项默认文字颜色
$--select-option-color: #8590a6;

// Select 选项 hover 背景
$--select-option-hover-background: #F3F5F8;

// Select 下拉面板最大高度
$--select-dropdown-max-height: 274px;
```
