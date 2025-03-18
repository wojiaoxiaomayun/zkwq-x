import MagicString from 'magic-string';
import { UserOptions } from './index';
export const transform = (code:string,options:UserOptions = {
  colors:[],
  suffix:['css','scss']
}) => {
  if(options.colors.length == 0){
    return code;
  }
  const codeObj = new MagicString(code);
  options.colors.forEach(option => {
    let initColors = Object.keys(option);
    if(initColors.length > 0){
      initColors.forEach(color => {
        let replaceColor = option[color];
        //替换正常的颜色值
        let regexp = new RegExp(`${color}`,'gi')
        let colors = Array.from(code.matchAll(regexp))
        colors.forEach(e => {
          codeObj.update(e.index!,e.index! + e[0].length,replaceColor)
        })
      })
    }
  })
  //单独处理:root里面的颜色
  let rootCssRegex = new RegExp(/:root\s?{\s?\n?.*?\s?\n?}/gi);
  let roots = Array.from(code.matchAll(rootCssRegex))
  options.colors.forEach(option => {
    let initColors = Object.keys(option);
    if(initColors.length > 0){
      initColors.forEach(color => {
        let replaceColor = option[color] as any;
        if(!replaceColor.startsWith('var(')){
          //替换正常的颜色值
          let regexp = new RegExp(`${color}`,'gi')
          roots.forEach(root => {
            root['replace'] = root[0].replace(regexp,replaceColor)
          })
        }
      })
    }
  })
  roots.forEach(root => {
    codeObj.update(root.index!,root.index! + root[0].length,root['replace'] || root[0])
  })
  return codeObj.toString()
}