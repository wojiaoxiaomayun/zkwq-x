import { ParamsEncry } from './index.js'

let paramsEncry = new ParamsEncry()
paramsEncry.init()

fetch('/toolsApi/headline/getPermissions?userId=b2a3b156460c45589b892a2e5f66cc5f', {
  method: 'POST',
  body: JSON.stringify({
    b:'2',
    a: '1',
  })
})
