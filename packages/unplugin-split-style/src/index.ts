import { createUnplugin } from 'unplugin'
const fse = require('fs-extra')

const cssMap = new Map()

export type UserOptions = {
  cssSuffix:Array<string>,
  writePath?:string,
  pathMapping?:{
    [name:string]:string
  }
}

const SplitStylePlugin = createUnplugin((options:UserOptions = {
  cssSuffix:['.css','scss'],
  writePath:'dist/css'
}) => {
  const pathMapping = options.pathMapping || {}
  const paths = Object.keys(options.pathMapping || {}).filter(path => path.startsWith('@/')).map(path => {
    return {
      originPath:path,
      replacePath:path.replace('@/','')
    }
  })
  const cssSuffix = options?.cssSuffix || ['.css','scss']
  return {
    name: 'unplugin-split-style',
    // webpack's id filter is outside of loader logic,
    // an additional hook is needed for better perf on webpack
    buildStart(){
      console.log('-----------unplugin-split-style---------------')
      console.log(`-----------当前拦截[${cssSuffix}]---------------`)
    },
    transformInclude(id:string) {
      if(cssSuffix.length > 0){
        return cssSuffix.find(item => id.includes(item))
      }
      return false;
    },
    // just like rollup transform
    transform(code:string,id:string) {
      console.log(`-----------拦截文件[${id}]---------------`)
      let originPath = paths.find(path => id.includes(path.replacePath))?.originPath
      let key:string = '';
      if(originPath){
        key = pathMapping[originPath]
      }else{
        key = Array.from(id.match(/.*\/(.*?)\./)!)[1];
      }
      try{
        code = code.replace(/\/\*.*?\*\//gmsi,'')
      }catch(ex){
        console.error(ex)
      }
      if(cssMap.has(key)){
        cssMap.set(key,cssMap.get(key) + code)
      }else{
        cssMap.set(key,code)
      }
      return code;
    },
    writeBundle(){
      if(cssMap.size > 0){
        console.log(`-----------开始写入文件---------------`)
        let writePath = options?.writePath || 'dist/css'
        Array.from(cssMap.keys()).forEach(async (key,index) => {
            const content = cssMap.get(key)
            cssMap.delete(key)
            try{
              await fse.outputFileSync(`${writePath}/${key}.css`, content)
            }catch(ex){
              console.error(ex)
            }
        });
        console.log(`-----------文件写入结束---------------`)
      }
    },
    // more hooks coming
    vite:{
      apply: 'build'
    }
  }
})

export const SplitStylePluginVite = SplitStylePlugin.vite
export const SplitStylePluginWebpack = SplitStylePlugin.webpack