(function(root,factory){
  if(typeof(module)==='object'&&typeof(module.exports)==='object'){
    module.exports.cvp=factory()
  }else if(typeof(exports)==='object'){
    exports.cvp=factory()
  }else if(typeof(root)==='object'){
    root.cvp=factory()
  }else if(typeof(window)==='object'){
    window.cvp=factory()
  }else{
    console.warn('clear-viewport startup failure.')
  }
})(this,function(){
  if(!window){
		console.warn('clear-viewport startup time is incorrect.')
		return
	}
	var {document}=window
  var store={
    docInfo:{}
  }
  return {
    init:function(options={}){
      var {width=375,mobile=true,fontSize=mobile?"0.16rem":"16rem",scalable=false}=options
      store.options={width,mobile,fontSize,scalable}
      /* 插入viewport标签 */
			var meta=document.createElement("meta")
			meta.setAttribute("name","viewport")
			scalable?(
				meta.setAttribute("content","width=device-width,initial-scale=1.0,user-scalable=yes")
			):(
				meta.setAttribute("content","width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no")
			);
			var head=document.getElementsByTagName("head")[0]
			var oldvp=document.querySelector(`meta[name="viewport"]`)
			if(oldvp){
				head.insertBefore(meta,oldvp)
				head.removeChild(oldvp)
			}else{
				var first=head.firstChild
				head.insertBefore(meta,first)
			}
			store.docInfo.meta=meta
			/* 根据页面改变计算rem */
			var resizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize'
			function recalc(){
				var docEl = document.documentElement
				var {clientWidth} = docEl
				if (!clientWidth) return
				var pro = clientWidth / width
				var rootSize = Number(mobile?pro*100:pro).toFixed(4)
				docEl.style.fontSize = rootSize + "px"
				store.docInfo.rootSize = rootSize
			}
			window.addEventListener(resizeEvt,recalc)
			/* 还原系统默认字体大小 */
			function resetSize(){
				document.body.style.fontSize = fontSize
				document.removeEventListener('DOMContentLoaded', resetSize)
			}
			document.addEventListener('DOMContentLoaded', recalc)
			document.addEventListener('DOMContentLoaded', resetSize)
    },
		get info(){
			return store
		}
  }
})