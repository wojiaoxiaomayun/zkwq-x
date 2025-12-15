# @zkwq/params-encry

一个轻量级的参数加密和签名验证库，用于在发送 HTTP 请求时自动添加签名验证头信息。

## 功能特性

- 自动拦截 Fetch API 和 XMLHttpRequest 请求
- 支持多种 HTTP 方法（GET、POST、PUT、DELETE、PATCH）
- 自动生成时间戳和随机数
- 使用 HMAC-SHA256 算法进行签名
- 支持自定义请求头和密钥
- 可配置忽略特定路径的签名

## 安装

```bash
npm install @zkwq/params-encry
# 或
yarn add @zkwq/params-encry
# 或
pnpm add @zkwq/params-encry
```

## 使用方法

### 基本用法

```javascript
import { ParamsEncry } from '@zkwq/params-encry';

// 创建实例
const paramsEncry = new ParamsEncry();

// 初始化拦截器
paramsEncry.init();

// 现在所有的 HTTP 请求都会自动添加签名头
fetch('/api/user', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### 自定义配置

```javascript
import { ParamsEncry } from '@zkwq/params-encry';

const paramsEncry = new ParamsEncry({
  SIGN_HEADER: 'X-Custom-Sign',        // 自定义签名头名称，默认为 'X-Validate'
  TIMESTAMP_HEADER: 'X-Custom-Time',   // 自定义时间戳头名称，默认为 'X-Timestamp'
  NONCE_HEADER: 'X-Custom-Nonce',       // 自定义随机数头名称，默认为 'X-Nonce'
  APP_SECRET: 'your-custom-secret',    // 自定义密钥，默认为 'sk-adslfkogmelzdlkfotkeled'
  ignore: ['/api/public', '/upload']    // 忽略这些路径的签名
});

paramsEncry.init();
```

### 签名算法说明

签名生成规则如下：

1. **GET/DELETE 请求**：
   - 将查询参数按 key 升序排列，拼接成 `key1=value1&key2=value2` 格式
   - 签名字符串：`method + query + timestamp + nonce + secret`

2. **POST/PUT/PATCH 请求**：
   - 先处理查询参数（如果有），按 key 升序排列
   - 然后处理请求体：
     - 如果是 `multipart/form-data` 或 `application/octet-stream`，使用固定值 `no-body`
     - 否则使用请求体的原始文本
   - 签名字符串：`method + query + body + timestamp + nonce + secret`

3. 使用 HMAC-SHA256 算法对签名字符串进行加密

## 示例

```javascript
import { ParamsEncry } from '@zkwq/params-encry';

// 初始化
const paramsEncry = new ParamsEncry();
paramsEncry.init();

// GET 请求
fetch('/api/user?id=123&name=test', {
  method: 'GET'
});

// POST 请求
fetch('/api/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'test',
    age: 25
  })
});

// 带查询参数的 POST 请求
fetch('/api/user?action=update', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id: '123',
    name: 'new name'
  })
});
```

## 注意事项

1. 拦截器会在全局范围内生效，影响所有的 Fetch API 和 XMLHttpRequest 请求
2. 文件上传（multipart/form-data）和二进制流（application/octet-stream）请求会使用固定值 `no-body` 作为请求体部分
3. 确保服务端使用相同的签名算法和密钥进行验证
4. 时间戳和随机数会自动生成，无需手动设置

## API 参考

### ParamsEncry 类

#### 构造函数

```typescript
constructor(options?: ParamsEncryOptions)
```

#### 参数

- `options` (可选): 配置对象
  - `SIGN_HEADER` (string): 签名头名称，默认为 `'X-Validate'`
  - `TIMESTAMP_HEADER` (string): 时间戳头名称，默认为 `'X-Timestamp'`
  - `NONCE_HEADER` (string): 随机数头名称，默认为 `'X-Nonce'`
  - `APP_SECRET` (string): 签名密钥，默认为 `'sk-adslfkogmelzdlkfotkeled'`
  - `ignore` (string[]): 忽略签名的路径数组

#### 方法

- `init()`: 初始化并应用拦截器

## 许可证

ISC