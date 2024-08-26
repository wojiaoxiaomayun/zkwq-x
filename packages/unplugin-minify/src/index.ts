import { createUnplugin } from 'unplugin'
const minify = require('@node-minify/core');
const cleanCSS = require('@node-minify/clean-css');
const uglifyJs = require('@node-minify/uglify-js');

export type UserOptions = {
  path?:string
}

export const minifyCss = (input:string,output:string) => {
  minify({
    compressor: cleanCSS,
    input: input,
    output: output,
    replaceInPlace: true,
    sync: true,
    callback: function(err:any, min:any) {
      if(err){
        console.error(err,min)
      }
    }
  });
}
export const minifyJs = (input:string,output:string) => {
  minify({
    compressor: uglifyJs,
    input: input,
    output: output,
    replaceInPlace: true,
    sync: true,
    callback: function(err:any, min:any) {
      if(err){
        console.error(err,min)
      }
    }
  });
}

const MinifyPlugin = createUnplugin((options:UserOptions = {
  path:'dist'
}) => {
  return {
    name: 'unplugin-minify',
    // more hooks coming
    vite:{
      apply: 'build',
      closeBundle:() => {
        console.log('------unplugin-minify---------')
        console.log('-------------------------------')
        console.log('---------开始压缩文件------------')
        minifyCss(`${options.path || 'dist'}/**/*.css`,'$1.min.css')
        console.log('---------css压缩完成------------')
        minifyJs(`${options.path || 'dist'}/**/*.js`,'$1.min.js')
        console.log('---------js压缩完成------------')
        minifyJs(`${options.path || 'dist'}/**/*.cjs`,'$1.min.cjs')
        console.log('---------csj压缩完成------------')
        console.log('-------------------------------')
        console.log('---------全部压缩完成------------')
      }
    }
  }
})

export const MinifyPluginVite = MinifyPlugin.vite