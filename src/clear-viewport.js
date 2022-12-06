(function(root,factory){
	if(typeof(module)==='object'&&typeof(module.exports)==='object'){
		module.exports=factory()
	}else if(typeof(exports)==='object'){
		exports=factory()
	}else if(typeof(root)==='object'){
		root.tools=factory()
	}else if(typeof(window)==='object'){
		window.tools=factory()
	}else{
		console.warn('webtools startup failure.')
	}
})(this,function(){
	return {
		filterObject:function(obj,str,bol){
			var res={}
			if(str==undefined)return Object.assign(res,obj)
			var arr=str.split(",")
			if(bol===undefined)bol=true
			if(bol){
				for(let item of arr){
					obj[item]&&(res[item]=obj[item])
				}
			}else{
				Object.assign(res,obj)
				for(let item of arr){
					Reflect.deleteProperty(res,item)
				}
			}
			return res
		},
		deepCopy:function(obj){
			let res=(obj.constructor.name==="Array")?[]:{}
			for(let prop in obj){
				if(typeof obj[prop]==='object'&&obj[prop]!==null){
						res[prop]=(obj[prop].constructor.name==="Array")?[]:{}
						res[prop]=deepCopy(obj[prop])
				}else{
						res[prop]=obj[prop]
				}
			}
			return res
		},
		getQuery:function(){
			var qobj={}
			var {href}=window.location
			var start=href.indexOf("?")
			if(start===-1)return qobj
			var search=href.slice(start+1)
			if(search==="")return qobj
			var qarr=search.split("&")
			qarr.map(item=>{
				let itemarr=item.split("=")
				qobj[decodeURIComponent(itemarr[0])]=decodeURIComponent(itemarr[1])
			})
			return qobj
		},
		toFixed(num,s){ // 保留几位小数
			if(num===undefined){ // 第一个参数为undefined
				return undefined
			}
			let numn=Number(num)
			if(isNaN(numn)){ // 第一个参数不是数字
				throw "argument for toFixed error"
			}
			if(numn>Math.pow(10,21)){ // 第一个参数太大
				return String(numn)
			}
			let sn=Number(s)
			if(s===undefined||sn==0){ // 没有第二个参数或者第一个数可以被Number()转化成0
				return String(Math.round(numn))
			}
			if(isNaN(sn)){ // 第二个参数不是个数字
				throw "The argument of C.toFixed must be a number"
			}
			if(sn>20||sn<0){ // 第二个参数超出范围
				throw "The second argument of C.toFixed must be between 0 and 20"
			}
			let nums=String(numn)
			let numarr=nums.split(".")
			if(numarr.length<2){
				nums+="."
				for(let i=0;i<sn;i++){
					nums+="0"
				}
				return nums
			}
			let int=numarr[0]
			let dec=numarr[1]
			if(dec.length==sn){
				return nums
			}
			if(dec.length<sn){
				for(let i=0;i<sn-dec.length;i++){
					nums+="0"
				}
				return nums
			}
			nums=int+"."+dec.slice(0,sn)
			let last=dec.slice(sn,sn+1)
			if(parseInt(last,10)>=5){
				let x=Math.pow(10,sn)
				nums=((parseFloat(nums)*x)+1)/x
				nums=nums.toFixed(sn)
			}
			return nums
		},
	}
})