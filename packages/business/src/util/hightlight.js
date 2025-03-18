const ChineseReg = new RegExp('[\\u4E00-\\u9FFF]','g'); // 定义一个正则表达式，用于匹配所有中文字符
const WordRegex = /\b[\w'-]+\b|[\\u4E00-\\u9FA5]+|[^\s]/gu; // 定义一个正则表达式，用于匹配英文单词和中文字符

function isChinese(str){
  return ChineseReg.test(str);       // 判断一个字符串是否包含中文字符
}

function extractWords(text) {    
  // 使用 match 方法提取所有匹配的单词和中文词语，并记录位置和长度
  const words = [];
  let match;
  let index = 0;
  while ((match = WordRegex.exec(text)) !== null) { // 循环匹配所有单词和中文词语
    words.push({
      value: match[0], // 匹配到的词语
      index: match.index, // 匹配到的词语的起始位置
      length: match[0].length, // 匹配到的词语的长度
      isChinese:isChinese(match[0]) // 判断匹配到的词语是否是中文
    });
    index = match.index + match[0].length; // 更新下一个匹配的起始位置
  }
  
  // 返回提取到的词语和位置的 map 对象数组
  return words;
}

export function check(str,particiles,ignoreCase = false){
  // 检查文本中是否包含指定的高亮词语
  if(ignoreCase){ // 如果需要忽略大小写
    particiles = particiles.map(e => e.toLocaleLowerCase()) // 将所有高亮词语转换为小写
    str = str.toLocaleLowerCase()
  }
  const items = extractWords(str); // 提取文本中的所有单词和中文词语
  return items.filter(item => { // 过滤出包含高亮词语的单词和中文词语
    if(item.isChinese){ // 如果是中文
      return particiles.filter(e => item.value.includes(e)).length > 0 // 判断中文词语是否包含任何一个高亮词语
    }
    return particiles.includes(item.value) // 判断英文单词是否包含在高亮词语列表中，并考虑大小写
  }).length > 0 // 判断是否至少包含一个高亮词语
}

export function build(obj,particiles,options){
  // 对文本进行高亮处理，并将高亮后的文本返回
  if(!obj || !particiles.length){
    return obj;
  }
  if(typeof obj == 'string' || typeof obj == 'number'){
    // 如果要高亮的文本是一个字符串或数字
    let content = obj + ''; // 将文本转换为字符串
    
    let dOptions = {
      ignoreCase:options?.ignoreCase || false, // 是否忽略大小写，默认值为 true
      tag:options?.startTag || 'span',
      classMapper:options.classMapper || []
    }
    if(dOptions.ignoreCase){
      particiles = particiles.map(e => e.toLocaleLowerCase()) // 将所有高亮词语转换为小写
      if(dOptions.classMapper){
        dOptions.classMapper.forEach(item => {
          item.patten = item.patten.toLocaleLowerCase()
        })
      }
      if(!dOptions.originalContent){
        dOptions.originalContent = content;
      }
      content = content.toLocaleLowerCase()
    }
    
    const items = extractWords(content); // 提取文本中的所有单词和中文词语
    const itemPositions = matchPosition(items,particiles) // 匹配高亮位置
    let positions = getPositions(content,itemPositions); // 优化并返回位置
    return render(dOptions.originalContent || content,positions,dOptions) // 渲染高亮文本
  }
  let proxy = new Proxy(obj,{
    get(target, key){
      // 使用代理对象来处理嵌套对象或数组的高亮
      let value = target[key]; // 获取要高亮的属性值
      if(value === undefined){
          return value;
      }
      if(target instanceof Array){
          let tempKey = parseInt(key) // 将键值转换为数字，以便处理数组
          if(isNaN(tempKey)){
              return value;
          }
      }
      if(typeof obj == 'string' || typeof obj == 'number'){
          return value; // 如果要高亮的属性是一个字符串或数字，直接返回
      }
      return build(target[key],particiles,options); // 递归地对属性值进行高亮处理
    }
  });
  return proxy;
}

function matchPosition(items,particiles){
  // 匹配高亮位置
  let moreFields = particiles.map(e => { // 将每个高亮词语提取出单词和中文词语
    return {
      original:e, // 高亮词语的原始值
      extractWords:extractWords(e) // 提取出高亮词语中的单词和中文词语
    };
  }).filter(e => e.extractWords.length > 1); // 过滤出包含多个单词或中文词语的高亮词语
  let result = items.map((item,index) => {
    // 对每个单词或中文词语进行高亮位置匹配
    if(item.isChinese){
      // 如果是中文词语
      item['hindex'] = [] // 初始化高亮位置数组
      particiles.filter(e => item.value.includes(e)).forEach(e => { // 循环遍历高亮词语列表
        let index = 0 // 初始化索引
        while(index < item.value.length){ // 循环遍历中文词语
          const foundIndex = item.value.indexOf(e,index); // 查找高亮词语在中文词语中的起始位置
          if(foundIndex !== -1){ // 如果找到高亮词语
            item.hindex.push({
              startIndex:item.index + foundIndex, // 高亮词语在文本中的起始位置
              endIndex:item.index + foundIndex + e.length, // 高亮词语在文本中的结束位置
              value:item.value, // 中文词语的值
              patten:e // 高亮词语的值
            })
            index = foundIndex + item.value.length // 更新下一个匹配的起始位置
          }else{
            break;
          }
        }
      })
    }else{
      // 如果是英文单词
      if(moreFields.length){
        // 如果存在包含多个单词或中文词语的高亮词语
        moreFields.forEach(field => {
          let extractWords = field.extractWords // 获取高亮词语中的单词和中文词语
          if(item.value == extractWords[0].value){ // 判断当前单词是否为高亮词语的第一个单词
            if(extractWords.filter((e,index1) => items[index + index1].value == e.value).length == extractWords.length){
              // 如果当前单词以及后续的单词都匹配高亮词语的每个单词
              extractWords.forEach((e,index1) => {
                // 对匹配到的每个单词进行高亮位置设置
                if(!items[index + index1].hindex){
                  items[index + index1]['hindex'] = [] // 初始化高亮位置数组
                }
                items[index + index1]['hindex'].push({
                  startIndex:items[index + index1].index, // 高亮词语在文本中的起始位置
                  endIndex:items[index + index1].index + items[index + index1].length, // 高亮词语在文本中的结束位置
                  value:items[index + index1].value, // 单词的值
                  patten:field.original // 高亮词语的值
                })
              })
            }
          }
        })
      }
      if(particiles.includes(item.value) && (!item.hindex || !item.hindex.length)){
        // 如果当前单词在高亮词语列表中，并且还没有被高亮
        item['hindex'] = [{
          startIndex:item.index, // 高亮词语在文本中的起始位置
          endIndex:item.index + item.length, // 高亮词语在文本中的结束位置
          value:item.value, // 单词的值
          patten:item.value // 高亮词语的值
        }]
      }
    }
    return item;
  })
  return result // 返回高亮位置信息
}
function getPositions(content,items){
  let hindexs = items.filter(item => item.hindex && item.hindex.length).map(item => item.hindex).flat(1).sort((a,b) => {
    // 对高亮位置进行排序，先按起始位置排序，再按结束位置排序
    if(a.startIndex - b.startIndex){
      return a.startIndex - b.startIndex;
    }
    return a.endIndex - b.endIndex
  })
  return mergePositions(content,hindexs);
}
function mergePositions(content,hindexs){
  let result = []
  let currentItem = null;
  for(let i = 0; i < hindexs.length; i++){
    let data = hindexs[i]
    if(currentItem){
      currentItem = {
        startIndex:currentItem.startIndex,
        endIndex:data.endIndex,
        value:content.substring(currentItem.startIndex,data.endIndex),
        patten:currentItem.patten
      }
    }else{
      currentItem = data
    }
    if(currentItem.value == currentItem.patten){
      result.push(currentItem)
      currentItem = null;
    }
  }
  return result;
}
function render(originContent,positions,options){
  // 渲染高亮文本
  let highlightedText = ""; // 初始化高亮文本
  let currentIndex = 0; // 初始化当前索引
  positions.forEach((h,index) => {
    // 循环遍历高亮位置
    if(h.endIndex <= currentIndex){
      // 如果高亮位置的结束位置小于等于当前索引，则跳过
      return;
    }
    if(h.endIndex > currentIndex && h.startIndex <= currentIndex && index > 0){
      // 如果高亮位置的结束位置大于当前索引，并且高亮位置的起始位置小于等于当前索引，并且当前索引不是第一个高亮位置，则更新高亮位置的起始位置
      h.startIndex = positions[index - 1].endIndex;
    }
    highlightedText += originContent.substring(currentIndex, h.startIndex); // 添加高亮位置之前的文本
    highlightedText += `<${options.tag} class="highlight_text ${options.classMapper?.find(e => e.patten == h.patten)?.classList?.join(' ') || ''}">${originContent.substring(h.startIndex, h.endIndex)}</${options.tag}>`; // 添加高亮文本
    currentIndex = h.endIndex + 1; // 更新当前索引
  });
  highlightedText += originContent.substring(currentIndex); // 添加高亮位置之后的文本
  return highlightedText; // 返回高亮文本
}
// console.log(HighLight('A novel type of porous carbon material for Li-S batteries was obtained by simple pyrolysis of natural bamboo waste at 850 degrees C. The activated bamboo-derived carbon (A_BC) contains abundant micropores and mesopores, possessing a large surface area of 1565.4 m(2) g(-1) and total pore volume of 0.95 cm(3) g(-1), which are larger than vast majority of biomass materials. All these advantages contribute to improving sulfur loading in the A_BC matrix materials, and a high sulfur content of 86 wt% in the A_BC/S composite can be achieved. As the cathode for Li-S batteries, it displayed superior electrochemical properties, with an initial discharge capacity of 1160 mA h g(-1) at 0.1 C (1 C = 1675 mA g(-1)) and 1050 mA h g(-1) remained after ten cycles. Further cycled at 0.2 C for one hundred cycles, reversible capacity of 930 and 710 mA h g(-1) was reserved for the first and the 100th cycle, respectively. Further increasing to 0.5 C and 1 C, it still showed capacities of 695 and 580 mA h g(-1) with coulombic efficiency over 95%, suggesting this porous A_BC could be a superior carbon matrix for high sulfur loading as the cathode of rechargeable Li-S batteries. (C) 2015 The Authors. Published by Elsevier B.V. on behalf of King Saud University.',['degrees C.','Li-S'],{ignoreCase:true,classMapper:[{patten:'degrees C.',classList:['niubi']}]}))
const HighLight = {
  check:check,
  build:build
}
export default HighLight;