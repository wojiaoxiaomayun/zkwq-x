网站更新版本检测

> npm i @zkwq/unplugin-version-check -S

* webpack

  ```javascript
  //config.js
  const {VersionCheckWebpack} = require('@zkwq/unplugin-version-check')
  plugins:[
    VersionCheckWebpack({
      //应用名称
      name?:'default-application',
      //index页面地址
      indexPath?:'dist/index.html'
    })
  ]
  ```
* vite

  ```javascript
  //vite.config.js
  import {VersionCheckVite} from '@zkwq/unplugin-version-check'
  plugins: [
     VersionCheckVite({
      //应用名称
      name?:'default-application',
      //index页面地址
      indexPath?:'dist/index.html'
     })
  ]
  ```

---

* 项目代码中

```javascript

import {CheckUpdate} from '@zkwq/unplugin-version-check/dist/online'
//默认，url默认location.origin
//弹出window.confirm,确定重载url + `?new Date().getTime()`
CheckUpdate();

//or
CheckUpdate({
  name?:'default-application',
  url?:location.origin
})

//or
//updateVersion必须执行，否则缓存版本不更新，下次检测版本依旧不一致
CheckUpdate({
  name?:'default-application',
  url?:location.origin
},(updateVersion) => {
  //自定义更新逻辑
  //例子
	this.$confirm('检测到系统更新，是否现在更新？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              updateVersion();
              location.href = location.origin + `?${new Date().getTime()}`
            }).catch(() => {  
		console.log('用户未执行更新操作，无需执行updateVersion方法')
            });
  //updateVersion();
})
```
