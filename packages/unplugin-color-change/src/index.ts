import { createUnplugin } from 'unplugin'
import { transform } from './transform';
import {ColorMix} from './online'

export interface BaseUIOptions {
  primary?: string,
  success?: string,
  warning?: string,
  danger?: string,
  info?: string
}

export const presetBaseUI = (options: BaseUIOptions = {}) => {
  const BaseUIColors = {
    primary: '#2F3A91',
    success: '#67C23A',
    warning: '#FF791A',
    danger: '#F1403C',
    info: '#8590a6'
  };
  let result: any = {}
  if (options.primary) {
    result[BaseUIColors.primary] = options.primary;
    [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].forEach(scale => {
      result[ColorMix('#FFFFFF', BaseUIColors.primary, scale)] = ColorMix('#FFFFFF', options.primary!, scale)
      result[ColorMix('#000000', BaseUIColors.primary, scale)] = ColorMix('#000000', options.primary!, scale)
    })
  }
  if (options.success) {
    result[BaseUIColors.success] = options.success;
    [0.8, 0.9].forEach(scale => {
      result[ColorMix('#FFFFFF', BaseUIColors.success, scale)] = ColorMix('#FFFFFF', options.success!, scale)
      result[ColorMix('#000000', BaseUIColors.success, scale)] = ColorMix('#000000', options.success!, scale)
    })
  }
  if (options.warning) {
    result[BaseUIColors.warning] = options.warning;
    [0.8, 0.9].forEach(scale => {
      result[ColorMix('#FFFFFF', BaseUIColors.warning, scale)] = ColorMix('#FFFFFF', options.warning!, scale)
      result[ColorMix('#000000', BaseUIColors.warning, scale)] = ColorMix('#000000', options.warning!, scale)
    })
  }
  if (options.danger) {
    result[BaseUIColors.danger] = options.danger;
    [0.8, 0.9].forEach(scale => {
      result[ColorMix('#FFFFFF', BaseUIColors.danger, scale)] = ColorMix('#FFFFFF', options.danger!, scale)
      result[ColorMix('#000000', BaseUIColors.danger, scale)] = ColorMix('#000000', options.danger!, scale)
    })
  }
  if (options.info) {
    result[BaseUIColors.info] = options.info;
    [0.8, 0.9].forEach(scale => {
      result[ColorMix('#FFFFFF', BaseUIColors.info, scale)] = ColorMix('#FFFFFF', options.info!, scale)
      result[ColorMix('#000000', BaseUIColors.info, scale)] = ColorMix('#000000', options.info!, scale)
    })
  }
  return result;
}
export const presetBaseUIDynamic = () => {
  const options = {
    primary:'--base-ui-primary',
    success:'--base-ui-success',
    warning:'--base-ui-warning',
    danger:'--base-ui-danger',
    info:'--base-ui-info',
  }
  const BaseUIColors = {
    primary: '#2F3A91',
    success: '#67C23A',
    warning: '#FF791A',
    danger: '#F1403C',
    info: '#8590a6'
  };
  let result: any = {}
  if (options.primary) {
    result[BaseUIColors.primary] = `var(${options.primary})`;
    [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].forEach((scale,index) => {
      result[ColorMix('#FFFFFF', BaseUIColors.primary, scale)] = `var(${options.primary}-F-${index})`
      result[ColorMix('#000000', BaseUIColors.primary, scale)] = `var(${options.primary}-0-${index})`
    })
  }
  if (options.success) {
    result[BaseUIColors.success] = `var(${options.success})`;
    [0.8, 0.9].forEach((scale,index) => {
      result[ColorMix('#FFFFFF', BaseUIColors.success, scale)] = `var(${options.success}-F-${index})`
      result[ColorMix('#000000', BaseUIColors.success, scale)] = `var(${options.success}-0-${index})`
    })
  }
  if (options.warning) {
    result[BaseUIColors.warning] = `var(${options.warning})`;
    [0.8, 0.9].forEach((scale,index) => {
      result[ColorMix('#FFFFFF', BaseUIColors.warning, scale)] = `var(${options.warning}-F-${index})`
      result[ColorMix('#000000', BaseUIColors.warning, scale)] = `var(${options.warning}-0-${index})`
    })
  }
  if (options.danger) {
    result[BaseUIColors.danger] = `var(${options.danger})`;
    [0.8, 0.9].forEach((scale,index) => {
      result[ColorMix('#FFFFFF', BaseUIColors.danger, scale)] = `var(${options.danger}-F-${index})`
      result[ColorMix('#000000', BaseUIColors.danger, scale)] = `var(${options.danger}-0-${index})`
    })
  }
  if (options.info) {
    result[BaseUIColors.info] = `var(${options.info})`;
    [0.8, 0.9].forEach((scale,index) => {
      result[ColorMix('#FFFFFF', BaseUIColors.info, scale)] =`var(${options.info}-F-${index})`
      result[ColorMix('#000000', BaseUIColors.info, scale)] = `var(${options.info}-0-${index})`
    })
  }
  return result;
}

export interface UserOptions {
  colors: Array<colorsOptions>,
  suffix: Array<string>
}

export interface colorsOptions {
  [name: string]: [value: string]
}

export const ColorChangeUnplugin = createUnplugin((options: UserOptions = {
  colors:[],
  suffix:['css','scss']
}, meta: any) => {
  let suffix = options.suffix || ['css','scss']
  return {
    name: 'unplugin-color-change',
    // enforce: meta.framework == 'webpack'?'pre':null,
    // webpack's id filter is outside of loader logic,
    // an additional hook is needed for better perf on webpack
    transformInclude(id: string) {
      let status = suffix.filter(item => id.endsWith("." + item)).length || suffix.filter(item => id.includes(`lang=${item}`)).length
      return status;
    },
    // just like rollup transform
    transform(code: string,id: string) {
      return transform(code, options)
    },
    // more hooks coming
    webpack(compiler: any) {
      // console.log(compiler.options.module.rules.forEach(rule => {
      //   console.log(rule)
      // }))
      // if (compiler.plugin) {
      //   compiler.plugin('emit', function (compilation:any, callback:Function) {
      //     // compilation.chunks 存放所有代码块，是一个数组
      //     compilation.chunks.forEach(function (chunk:any) {


      //       // Webpack 会根据 Chunk 去生成输出的文件资源，每个 Chunk 都对应一个及其以上的输出文件
      //       // 例如在 Chunk 中包含了 CSS 模块并且使用了 ExtractTextPlugin 时，
      //       // 该 Chunk 就会生成 .js 和 .css 两个文件
      //       chunk.files.forEach(function (filename:string) {
      //         // compilation.assets 存放当前所有即将输出的资源
      //         // 调用一个输出资源的 source() 方法能获取到输出资源的内容
      //         if(suffix.filter(item => filename.endsWith("." + item)).length){
      //           let source = compilation.assets[filename].source();
      //           source = transform(source,options)
      //           compilation.assets[filename] = {
      //               source: function () {
      //                   return source
      //               },
      //               size: function () {
      //                   return source.length
      //               }
      //           }
      //         }
      //       });
      //     });

      //     // 这是一个异步事件，要记得调用 callback 通知 Webpack 本次事件监听处理结束。
      //     // 如果忘记了调用 callback，Webpack 将一直卡在这里而不会往后执行。
      //     callback();
      //   })
      // } else {
      //   compiler.hooks.emit.tap('unplugin-color-change', (compilation: any) => {
      //     compilation.chunks.forEach(function (chunk: any) {
      //       chunk.files.forEach(function (filename: string) {
      //         if(suffix.filter(item => filename.endsWith("." + item)).length){
      //           let source = compilation.assets[filename].source();
      //           source = transform(source,options)
      //           compilation.assets[filename] = {
      //             source: function () {
      //               return source
      //             },
      //             size: function () {
      //               return source.length
      //             }
      //           }
      //         }
      //       });
      //     });
      //     return true;
      //   });
      // }


    },

  }
})


export const ColorChangeUnpluginVite = ColorChangeUnplugin.vite
export const ColorChangeUnpluginWebpack = ColorChangeUnplugin.webpack

export default ColorChangeUnplugin;