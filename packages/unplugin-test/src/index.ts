import { createUnplugin } from 'unplugin'
const fse = require('fs-extra')
const chardet = require('chardet');

export const unplugin = createUnplugin((options: any) => {
  return {
    name: 'unplugin-test',
    // webpack's id filter is outside of loader logic,
    // an additional hook is needed for better perf on webpack
    loadInclude(id) {
      return !id.endsWith('.html')
    },
    async load(id){
      try{
        if(id.includes('\.css')){
          const originalContent = fse.readFileSync(id, 'utf-8')

        // 进行替换操作，例如将所有 'foo' 替换为 'bar'
        const modifiedContent = originalContent.replace(/foo/g, 'bar')

        // 返回修改后的文件内容
        return modifiedContent
        }
      }catch(ex){

      }
      
      return null;
    }
  }
})

export const vitePlugin = unplugin.vite
export const rollupPlugin = unplugin.rollup
export const webpackPlugin = unplugin.webpack
export const rspackPlugin = unplugin.rspack
export const esbuildPlugin = unplugin.esbuild