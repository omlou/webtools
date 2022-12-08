(function(root,factory){
	if(typeof(module)==='object'&&typeof(module.exports)==='object'){
		module.exports=factory()
	}else if(typeof(exports)==='object'){
		exports=factory()
	}else if(typeof(root)==='object'){
		root["tools"]=factory()
		root["Base64"]=factory().Base64
	}else if(typeof(window)==='object'){
		window["tools"]=factory()
		window["Base64"]=factory().Base64
	}else{
		console.warn('webtools startup failure.')
	}
})(this,function(){
	function Base64() {
		var key="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		this.encode=function(input){
			var output="";
			var chr1,chr2,chr3,enc1,enc2,enc3,enc4;
			var i=0;
			input=utf8_encode(input);
			while(i<input.length){
				chr1=input.charCodeAt(i++);
				chr2=input.charCodeAt(i++);
				chr3=input.charCodeAt(i++);
				enc1=chr1>>2;
				enc2=((chr1&3)<<4)|(chr2>>4);
				enc3=((chr2&15)<<2)|(chr3>>6);
				enc4=chr3&63;
				if(isNaN(chr2)){
					enc3=enc4=64;
				}else if(isNaN(chr3)){
					enc4=64;
				}
				output=output+key.charAt(enc1)+key.charAt(enc2)+key.charAt(enc3)+key.charAt(enc4);
			}
			return output
		}
		this.decode=function(input){
			var output="";
			var chr1,chr2,chr3;
			var enc1,enc2,enc3,enc4;
			var i=0;
			input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");
			while(i<input.length){
				enc1=key.indexOf(input.charAt(i++));
				enc2=key.indexOf(input.charAt(i++));
				enc3=key.indexOf(input.charAt(i++));
				enc4=key.indexOf(input.charAt(i++));
				chr1=(enc1<<2)|(enc2>>4);
				chr2=((enc2&15)<<4)|(enc3>>2);
				chr3=((enc3&3)<<6)|enc4;
				output=output+String.fromCharCode(chr1);
				if(enc3!=64){
					output=output+String.fromCharCode(chr2);
				}
				if(enc4!=64){
					output=output+String.fromCharCode(chr3);
				}
			}
			output=utf8_decode(output);
			return output
		}
		var utf8_encode=function(string){
			string=string.replace(/\r\n/g,"\n");
			var utftext="";
			for(var n=0;n<string.length;n++){
				var c=string.charCodeAt(n);
				if(c<128){
					utftext+=String.fromCharCode(c);
				}else if((c>127)&&(c<2048)){
					utftext+=String.fromCharCode((c>>6)|192);
					utftext+=String.fromCharCode((c&63)|128);
				}else{
					utftext+=String.fromCharCode((c>>12)|224);
					utftext+=String.fromCharCode(((c>>6)&63)|128);
					utftext+=String.fromCharCode((c&63)|128);
				}
			}
			return utftext
		}
		var utf8_decode=function(utftext){
			var string="";
			var i=0;
			var c=0,c1=0,c2=0;
			while(i<utftext.length){
				c=utftext.charCodeAt(i);
				if(c<128){
					string+=String.fromCharCode(c);
					i++;
				}else if((c>191)&&(c<224)){
					c1=utftext.charCodeAt(i+1);
					string+=String.fromCharCode(((c&31)<<6)|(c1&63));
					i+=2;
				}else{
					c1=utftext.charCodeAt(i+1);
					c2=utftext.charCodeAt(i+2);
					string+=String.fromCharCode(((c&15)<<12)|((c1&63)<<6)|(c2&63));
					i+=3;
				}
			}
			return string;
		}
	}
	function deepCopy(obj){
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
	}
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
		deepCopy,
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
		queryString:function(obj,bol=true){
			var arr=[]
			for(let i in obj){
				if(obj[i]===null||obj[i]===undefined)obj[i]=""
				arr.push(encodeURIComponent(i)+'='+encodeURIComponent(obj[i]))
			}
			var str=arr.join('&')
			return (str&&bol)?'?'+str:str
		},
		toFixed:function(num,s){ // 保留几位小数
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
			if(s===undefined||sn==0){ // 没有第二个参数或者第二个数可以被Number()转化成0
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
				let x=10**sn
				nums=((parseFloat(nums)*x)+1)/x
				nums=nums.toFixed(sn)
			}
			return nums
		},
		formSubmit:function(obj){ // 模拟 form 表单提交，常用于 post 下载文件
			var {document}=window
			var form=document.createElement("form")
			var {data}=obj
			Reflect.deleteProperty(obj,"data")
			for(let i in obj){
				obj[i]&&(form[i]=obj[i])
			}
			form.style.display="none"
			for(let i in data){
				let input=document.createElement("input")
				input.setAttribute("type","hidden")
				input.setAttribute("name",i)
				input.value=data[i]
				form.appendChild(input)
			}
			document.body.appendChild(form)
			form.submit()
		},
		readText:function(url,callback){ // 读取文本文件
			let xhr=new XMLHttpRequest()
			xhr.onload=e=>{
				callback(xhr.response)
			}
			xhr.open('GET',url,true)
			xhr.send()
		},
		readJSON:function(url,callback){ // 读取json文件
			let xhr=new XMLHttpRequest()
			xhr.onload=e=>{
				callback(JSON.parse(xhr.response))
			}
			xhr.open('GET',url,true)
			xhr.send()
		},
		getStore:function(str){
			var storage=localStorage.getItem(str)
			if(typeof(storage)==="string"){
				try{
					storage=JSON.parse(storage)
				}catch(e){}
			}
			return storage
		},
		setStore:function(str,data){
			if(typeof(data)==='object'&&data!==null){
				try{
					data=JSON.stringify(data)
				}catch(err){}
			}
			localStorage.setItem(str,data)
		},
		unid:function(){
			return parseInt(Math.random()*10e13).toString(36)+Date.now().toString(36)
		},
		Base64:new Base64()
	}
})