(function (doc, win) {
	// 插入viewport标签
	var contdom = doc.createElement('div')
	contdom.innerHTML = `<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">`
	var newvp = Array.from(contdom.children)[0]
	var oldvp = doc.getElementsByName("viewport")[0]
	var title = doc.getElementsByTagName("title")[0]
	var parentdom = title.parentNode
	if (oldvp) {
		parentdom.insertBefore(newvp, oldvp)
		parentdom.removeChild(oldvp)
	} else {
		parentdom.insertBefore(newvp, title)
	}
	// 计算rem
	var docEl = doc.documentElement
	var resizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize'
	var recalc = function () {
		var clientWidth = docEl.clientWidth
		if (!clientWidth) return
		if (clientWidth < 750)
			docEl.style.fontSize = Number(clientWidth / 375).toFixed(4) + "px"
		else if (clientWidth >= 750)
			docEl.style.fontSize = Number(clientWidth / 750).toFixed(4) + "px"
	}
	var resetSize = function () {
		doc.body.style.fontSize = win.clearViewport.fontSize ? win.clearViewport.fontSize : "16rem"
		doc.removeEventListener('DOMContentLoaded', resetSize, false)
	}
	win.addEventListener(resizeEvt, recalc, false)
	doc.addEventListener('DOMContentLoaded', recalc, false)
	// 还原正常字体大小
	doc.addEventListener('DOMContentLoaded', resetSize, false)
	// 绑定设置入口
	win.clearViewport = {
		fontSize: ""
	}
})(document, window)