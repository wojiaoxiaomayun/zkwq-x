import { createUnplugin } from 'unplugin';
const fse = require('fs-extra')
export type UserOptions = {
  name?:string,
  indexPath?:string
}
export const VersionCheck = createUnplugin((options:UserOptions = {
  name:'default-application',
  indexPath:'dist/index.html'
}) => {
  if(!options){
    options = {}
  }
  options.name = options.name || 'default-application';
  options.indexPath = options.indexPath || 'dist/index.html';
  return {
    name: 'unplugin-version-check',
    writeBundle(){
      let content = fse.readFileSync(options.indexPath,{encoding:'utf8', flag:'r'})
      content += `<!--${options.name}-version:${new Date().getTime()}-->`
      fse.writeFileSync(options.indexPath,content)
    }
  }
})

export const VersionCheckVite = VersionCheck.vite
export const VersionCheckWebpack = VersionCheck.webpack
export const VersionCheckRollup = VersionCheck.rollup
export const VersionCheckRspack = VersionCheck.rspack
export const VersionCheckEsbuild = VersionCheck.esbuild