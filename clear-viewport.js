var ClearViewport=(function(exports){
	exports.setOption=function(options){
		if(!window){
			console.warn('ClearViewport startup time is incorrect.')
			return
		}
		var {document}=window
		var {width=375,mobile=true,fontSize=mobile?"0.16rem":"16rem",scalable=false}=options
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
		/* 根据页面改变计算rem */
		var resizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize'
		function recalc(){
			var docEl = document.documentElement
			var {clientWidth} = docEl
			if (!clientWidth) return
			var pro = clientWidth / width
			docEl.style.fontSize = Number(mobile?pro*100:pro).toFixed(4) + "px"
		}
		window.addEventListener(resizeEvt,recalc)
		/* 还原系统默认字体大小 */
		function resetSize(){
			document.body.style.fontSize = fontSize
			document.removeEventListener('DOMContentLoaded', resetSize)
		}
		document.addEventListener('DOMContentLoaded', recalc)
		document.addEventListener('DOMContentLoaded', resetSize)
	}
	return exports
})({})
module?(module.exports=ClearViewport):(window.ClearViewport=ClearViewport)