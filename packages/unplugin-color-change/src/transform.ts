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

  // 找出 :root 区块
  const rootCssRegex = /:root\s*\{[\s\S]*?\}/gi;
  const rootMatches = Array.from(code.matchAll(rootCssRegex));

  const rootRanges = rootMatches.map(m => ({
    start: m.index!,
    end: m.index! + m[0].length,
    content: m[0]
  }));

  function inRoot(index: number) {
    return rootRanges.some(r => index >= r.start && index < r.end);
  }

  function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }


  options.colors.forEach(option => {
    Object.keys(option).forEach(color => {
      const replaceColor = option[color];
      const regexp = new RegExp(escapeRegExp(color), 'gi');
      for (const match of code.matchAll(regexp)) {
        if (inRoot(match.index!)) continue; // ⭐关键：跳过 :root

        codeObj.update(
          match.index!,
          match.index! + match[0].length,
          replaceColor
        );
      }
    });
  });

  //单独处理:root里面的颜色
  rootRanges.forEach(root => {
    let newContent = root.content;

    options.colors.forEach(option => {
      Object.keys(option).forEach(color => {
        const replaceColor = option[color];

        if (typeof replaceColor === 'string' && !replaceColor.startsWith('var(')) {
          const regexp = new RegExp(escapeRegExp(color), 'gi');
          newContent = newContent.replace(regexp, replaceColor);
        }
      });
    });

    codeObj.update(root.start, root.end, newContent);
  });

  
  return codeObj.toString()
}