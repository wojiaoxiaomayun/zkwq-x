# SCSS 变量定制（var.scss）

本文档说明如何通过引入 `var.scss` 来覆盖组件库的 SCSS 变量，实现全局主题定制。

---

## 引入方式

在项目的全局样式入口文件（通常是 `main.scss` 或 `variables.scss`）中，在引入组件库样式**之前**引入并覆盖变量：

```scss
// 1. 先引入 var.scss 获取变量定义
@import '@zkwq/business/dist/var.scss';

// 2. 在此处覆盖你需要修改的变量
$--color-primary: #1890ff;
$--input-border-color: #d9d9d9;

// 3. 再引入组件库完整样式（使用你覆盖后的变量）
@import '@zkwq/business/style/index.scss';
```

> 注意：变量覆盖必须在 `style/index.scss` 引入之前完成，否则不会生效。

---

## 常用变量速查

### 颜色

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `$--color-primary` | `#2F3A91` | 主色，影响按钮、高亮线、聚焦色、已选项等 |
| `$--color-success` | `#67C23A` | 成功色 |
| `$--color-warning` | `#E6A23C` | 警告色 |
| `$--color-danger` | `#F56C6C` | 危险/错误色 |
| `$--color-info` | `#909399` | 信息色 |
| `$--color-text-primary` | `#303133` | 主要文字色 |
| `$--color-text-regular` | `#606266` | 常规文字色 |
| `$--color-text-secondary` | `#8590a6` | 次要文字色 |
| `$--color-text-placeholder` | `#C0C4CC` | 占位符文字色 |
| `$--background-color-base` | `#F3F5F8` | 基础背景色（tag、hover 等） |

### Input

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `$--input-border-color` | `#DCDFE6` | 底部静态线颜色 |
| `$--input-hover-border` | `#8590a6` | hover 时底线颜色 |
| `$--input-placeholder-color` | `#8590a6` | 浮动 label 默认颜色 |
| `$--input-font-size` | `14px` | 输入框字号 |
| `$--input-height` | `40px` | 输入框高度 |

### Select

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `$--select-option-color` | `#8590a6` | 选项默认文字色 |
| `$--select-option-hover-background` | `#F3F5F8` | 选项 hover 背景 |
| `$--select-option-selected-font-color` | `#2F3A91` | 已选项文字色（跟随 primary） |
| `$--select-option-disabled-color` | `#8590a6` | 禁用选项颜色 |
| `$--select-dropdown-background` | `#ffffff` | 下拉面板背景 |
| `$--select-dropdown-border` | `#E4E7ED` | 下拉面板边框色 |
| `$--select-dropdown-shadow` | `0 2px 12px 0 rgba(0,0,0,0.1)` | 下拉面板阴影 |
| `$--select-dropdown-max-height` | `274px` | 下拉面板最大高度 |
| `$--select-option-height` | `34px` | 选项行高 |

### 字体

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `$--font-size-base` | `14px` | 基础字号 |
| `$--font-size-small` | `13px` | 小字号 |
| `$--font-size-extra-small` | `12px` | 超小字号 |
| `$--font-line-height-primary` | `24px` | 主要行高 |

### 边框与圆角

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `$--border-color-base` | `#DCDFE6` | 基础边框色 |
| `$--border-color-light` | `#E4E7ED` | 浅边框色 |
| `$--border-radius-base` | `4px` | 基础圆角 |
| `$--border-radius-small` | `2px` | 小圆角 |
| `$--border-radius-circle` | `100%` | 圆形 |

### 层级（z-index）

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `$--index-normal` | `1` | 普通层级 |
| `$--index-top` | `1000` | 顶层（下拉、弹窗等） |
| `$--index-popper` | `2000` | Popper 层级 |

---

## 典型场景示例

### 替换主色

```scss
@import '@zkwq/business/dist/var.scss';

$--color-primary: #1890ff; // 蓝色主题

@import '@zkwq/business/style/index.scss';
```

### 调整输入框风格

```scss
@import '@zkwq/business/dist/var.scss';

$--input-border-color: #d9d9d9;
$--input-hover-border: #40a9ff;
$--input-height: 36px;

@import '@zkwq/business/style/index.scss';
```

### 修改下拉面板尺寸

```scss
@import '@zkwq/business/dist/var.scss';

$--select-dropdown-max-height: 320px;
$--select-option-height: 40px;

@import '@zkwq/business/style/index.scss';
```

---

## 注意事项

- `var.scss` 中的变量使用 `!default`，因此只需在引入后直接赋值即可覆盖，无需 `!important`
- 若使用 `vue-cli` 或 `vite`，可在 `vue.config.js` / `vite.config.js` 的 `css.loaderOptions.scss.additionalData` 中全局注入，避免每个文件重复引入
- 覆盖变量只影响通过 SCSS 编译的样式，不影响已内联的 `style` 属性
