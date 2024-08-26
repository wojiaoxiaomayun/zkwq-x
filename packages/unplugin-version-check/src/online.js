export const CheckUpdate = (options,callBack) => {
  if(!options){
    options = {}
  }
  options.name = options.name || 'default-application';
  options.url = options.url || location.origin;
  let CHECK_KEY = options.name + "-version"
  let response = fetch(options.url + "?" + new Date().getTime())
  response.then(async e => {
    let data = await e.text();
    let regx = new RegExp(`<!--${options.name}-version:(\\d+)-->`);
    let matchs = regx.exec(data)
    if(matchs && matchs.length == 2){
        let version = matchs[1]
        let oldVersion = window.localStorage.getItem(CHECK_KEY);
        if(!oldVersion){
            window.localStorage.setItem(CHECK_KEY,version)
        }else{
            if(version != oldVersion){
              // 获取HTML根节点之外的注释
              let documentVersion = Array.from(document.childNodes)
              .find(node => {
                let status = node.nodeType === Node.COMMENT_NODE
                let newRegx = new RegExp(`${options.name}-version:(\d+)`);
                return status && newRegx.test(node.data)
              })?.data?.replace(`${options.name}-version:`,'');
              if(documentVersion == version){
                window.localStorage.setItem(CHECK_KEY,version)
                return;
              }
              if(callBack){
                callBack(() => {
                  window.localStorage.setItem(CHECK_KEY,version)
                });
                return;
              }
              if (window.confirm("检测到系统版本更新，是否现在更新？")) {
                  window.localStorage.setItem(CHECK_KEY,version)
                  location.href = options.url + "?" + new Date().getTime();
              }
            }
        }
    }
  })
}