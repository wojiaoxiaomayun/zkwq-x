import http from '../util/fetch'
/*日志接口参数
{
	//eventKey的值，不一定是下面三类，可以自定义，自定义时eventKey与eventValue一起填写就好
	//EVENT_PAGE_VISIT("page_visit","访问页面"),
    //EVENT_OPERATION("operation","事件操作"),
    //EVENT_OPERATION_ADMIN("operation_admin","管理员事件操作"),
	//eventKey为英文键值，eventValue为中文描述
	eventKey:
	//非必填，无值时key必须是上面三类，有值时为key可以自定义
	eventValue:
	//非必填，事件描述
	eventDesc：
	//非必填，请求链接，如为访问页面，则为当前页面的链接
	url:
	//非必填，请求参数
	eventParams：
	//非必填，请求状态error||success
	status：
	//非必填，请求结果，比如ajax中的返回结果
	result:
	//非必填，原始链接，比如页面跳转前的链接
	fromUrl：
	//非必填，建议填写应用名和模块，便于统计，如果可以，填写应用id，更加方便统计，id可以为自定义的uuid，确保同一应用uuid值一致即可
	application:{
		//应用id
		id:,
		//应用名
		name:,
		//应用专题
		topic:,
		//应用专题id
		topicId:,
		//应用模块
		module:
	}
	//非必填
	user:{
		id:,
		name:,
		avatar:,
		ins:
	}
}
*/
export const SaveLog = (params,application,user,module = '后台管理') => {
  if (!params.event_key) {
    if (module == '前台') {
      params.event_key = 'operation'
    } else {
      params.event_key = 'operation_admin'
    }
  }
  if(!params.application && application){
    params.application = {
      id: application.id,
      name: application.name,
      topic: application.topic,
      topicId: application.topicId,
      module: module
    }
  }
  if(!params.user && user){
    params.user = {
      id: user.uid,
      name: user.name,
      avatar: user.avatar,
      ins: user.institution,
      isReal:user.anonymous
    }
  }
  if (!params.url) {
    params.url = window.location.href
  }
  return http.post('/toolsApi/log/saveLog', params)
}
/**导出资源接口参数
  private String appid;
  private String fileName;
  private String sheetName;
  private List<List<String>> head;
  private List<List<String>> data;
  {
    appid,
    fileName,
    sheetName,
    head:[['aa'],['bb']],
    data:[['aa'],['bb']]
  }
**/
export const ExportResource = params => { return http.postBlob('/toolsApi/applicationExport/export', params) }
/**导出资源TXT接口参数
  private String appid;
  private String fileName;
  private List<String> text;
  {
    appid,
    fileName,
    text:['aa','bb']
  }
 */
export const ExportResourceTxt = params => { return http.postBlob('/toolsApi/applicationExport/exportTxt', params) }

export const GetUserV2 = (uid,userId) => http.get(`/hky/api/v2/scholars/${uid}`,{userId})

export const getHKYToken = () => {
  let cookie = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))
  return cookie == null ? '787d788a-bb1d-482b-bd64-c2613a204742' : cookie[1]
}
export const SuggestScholars = query => { 
  return http.get('/hky/api/v1/resources/scholar/suggestions', {q: query},{header:{
      'X-XSRF-TOKEN':getHKYToken()
  }}) 
}
export const SuggestScholarsV2 = query => { 
  return http.get('/insKnowApi/insKnowledgeBase/open/scholar/suggestions', {search: query}) 
}
export const SuggestInstitutions = query => { 
  return http.get('/hky/api/v3/resources/institution/suggestions', {q: query},{header:{
      'X-XSRF-TOKEN':getHKYToken()
  }}) 
}
export const SuggestSciencedata = query => { 
  return http.post('/hky/open/resources/api/v1/sciencedata/suggestions', {query:query},{header:{
      'X-XSRF-TOKEN':getHKYToken()
  }}) 
}
export const SuggestBookdata = query => { 
  return http.post('/hky/api/v2/resources/book/suggestions', {query:query},{header:{
      'X-XSRF-TOKEN':getHKYToken()
  }}) 
}
//资助项目
export const SuggestFundedProject = query => { 
  return http.get('/hky/api/v1/resources/project/suggestions', {q: query},{header:{
      'X-XSRF-TOKEN':getHKYToken()
  }}) 
}
//专利
export const SuggestPatent = query => { 
  return http.get('/hky/api/v1/resources/patent/suggestions', {q: query},{header:{
      'X-XSRF-TOKEN':getHKYToken()
  }}) 
}
//论文
export const SuggestArticle = query => { 
  return http.get('/hky/api/v1/resources/article/suggestions', {q: query},{header:{
      'X-XSRF-TOKEN':getHKYToken()
  }}) 
}
//期刊
export const SuggestJournal = query => { 
  return http.get('/hky/api/v1/resources/journal/suggestions', {q: query},{header:{
      'X-XSRF-TOKEN':getHKYToken()
  }}) 
}
//会议
export const SuggestConference = query => { 
  return http.get('/hky/api/v1/resources/conference/suggestions', {q: query},{header:{
      'X-XSRF-TOKEN':getHKYToken()
  }}) 
}
//项目标题
export const SuggestProjectV2 = query => { 
  return http.get('/hky/api/v2/resources/project/suggestions', {q: query},{header:{
      'X-XSRF-TOKEN':getHKYToken()
  }}) 
}
//软著标题
export const SuggestSoftware = query => { 
  return http.get('/hky/api/v2/resources/software/suggestions', {q: query},{header:{
      'X-XSRF-TOKEN':getHKYToken()
  }}) 
}
//奖项标题
export const SuggestAward = query => { 
  return http.get('/hky/api/v2/resources/award/suggestions', {q: query},{header:{
      'X-XSRF-TOKEN':getHKYToken()
  }}) 
}
//报告标题
export const SuggestReprot = query => { 
  return http.get('/hky/api/v1/resources/report/suggestions', {q: query},{header:{
      'X-XSRF-TOKEN':getHKYToken()
  }}) 
}
//专著标题
export const SuggestMonograph = query => { 
  return http.get('/hky/api/v2/resources/monograph/suggestions', {q: query},{header:{
      'X-XSRF-TOKEN':getHKYToken()
  }}) 
}

//翻译
export const TranslateV2 = params => { 
  return http.post('/hky/extend/api/v3/translate', params,{header:{
      'X-XSRF-TOKEN':getHKYToken()
  }}) 
}
export const GetLang = params => { 
  return http.post('/hky/extend/api/v3/translate/lang', params,{header:{
      'X-XSRF-TOKEN':getHKYToken()
  }}) 
}

export const FruitCount = (sid,isWhite,deleteCache) => http.get(`/hky/api/v5/scholars/fruits/${sid}/count`,{isWhite,deleteCache})