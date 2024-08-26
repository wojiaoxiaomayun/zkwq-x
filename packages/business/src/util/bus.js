var listener = new Map();
var fire_event = {
	on:function(type,callBack){
    if(!type || !callBack){
      return fire_event
    }
		if(!listener.has(type)){
      listener.set(type,[])
		}
    listener.get(type).push(callBack)
		return fire_event;
	},	
	trigger:function(type,options){
      listener.get(type)?.forEach(event => {
        var ret = event.call(this,options)
        if(options.success){ret?options.success(ret):options.success()}		
      });
	},
	remove:function(type,callBack){
		if(type){
      if(callBack){
        listener.set(type,listener.get(type)?.filter(e => e != callBack) || [])
      }else{
        listener.delete(type)
      }
    }
	}
};
export default fire_event;