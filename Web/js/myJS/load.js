	/*
	图片转码base64
*/
var index=0;
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}

// 页面loding 
function loding(){
	var div = document.createElement('div');
	var image = document.createElement('img'); 
		image.src = window.location.origin+'/images/loding.png';
    var base64 = getBase64Image(image);
    div.setAttribute('class','loadings');
	div.style.cssText='position: fixed;top:0;left:0;width:100%;height:100%;background:#fff;'
	var loding = '';
		loding += '<div class="loding_bg" style="position: absolute;top:0;left:0;width:100%;height:100%;"></div>'
		loding += '<img src="'+base64+'" alt="" style="position:absolute;top:50%;left:50%;width:50px;height:50px;margin-left: -25px;margin-top: -25px;"/>'
		div.innerHTML=loding
	var body = document.getElementsByTagName('body')[0];
	body.append(div)
}
	
function styleOnload(node, callback) {
	    // for IE6-9 and Opera
	    if (node&&node.attachEvent) {
	      node.attachEvent('onload', callback);
	      // NOTICE:
	      // 1. "onload" will be fired in IE6-9 when the file is 404, but in
	      // this situation, Opera does nothing, so fallback to timeout.
	      // 2. "onerror" doesn't fire in any browsers!
	    }
	    // polling for Firefox, Chrome, Safari
	    else {
	      setTimeout(function() {
	        poll(node, callback);
	      }, 0); // for cache
	    }
  	}

  	function poll(node, callback) {
	    if (callback.isCalled) {
	      return;
	    }
	    var isLoaded = false;
	    if (/webkit/i.test(navigator.userAgent)) {//webkit
	      if (node['sheet']) {
	        isLoaded = true;
	      }else if(node['src']){
	      	isLoaded = true;
	      }
	    }
	    // for Firefox
	    else if (node['sheet']) {
	      try {
	        if (node['sheet'].cssRules) {
	          isLoaded = true;
	        }
	      } catch (ex) {
	        // NS_ERROR_DOM_SECURITY_ERR
	        if (ex.code === 1000) {
	          isLoaded = true;
	        }
	      }
	    }else if(node['src']){
	    	isLoaded = true;
	    }
	    if (isLoaded) {
	      // give time to render.
	      setTimeout(function() {
	        callback();
	      }, 1);
	    }
	    else {
	      setTimeout(function() {
	        poll(node, callback);
	      }, 1);
	    }
  	}


  	// js loding 是否完成判断
function dynamicLoad(jsNode,callback){  
	jsNode.onload=jsNode.onreadystatechange=function(){  
	   if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){  
		   callback();  
		}  
		jsNode.onload=jsNode.onreadystatechange=null;  
	}  
}  
	// 我的动态创建LINK函数
	function createLink(attribute){ 
	    var head = document.getElementsByTagName('head')[0],
	    	body = document.getElementsByTagName('body')[0],
		    Tag = null;

		 if(!attribute.url){
		     return false;
		 }
		 if(/\.css/.test(attribute.url)){
		 	Tag = document.createElement('link');
			Tag.setAttribute('rel','stylesheet');
			Tag.setAttribute('charset',(attribute.charset || 'utf-8'));
			Tag.setAttribute('media',(attribute.media||'all'));
			Tag.setAttribute('type','text/css');
			Tag.href = attribute.url+'?v=1.0.6?'; 
			head.appendChild(Tag); 
		 }else if(/\.js/.test(attribute.url)){
		 	Tag = document.createElement('script');
			Tag.setAttribute('charset',(attribute.charset || 'utf-8'));
			Tag.setAttribute('type','text/javascript');
			Tag.src = attribute.url+'?v=1.0.6?'; 
			body.appendChild(Tag);
		 }
		 return Tag;
		 // <script src="./js/myJS/productMall.js?" type="text/javascript" charset="utf-8"></script>
		
	}

	function loadcss(url_list){
		var attribute={
			"url":url_list[index]
		}
		var styleNode = createLink(attribute);
		if(/\.css/.test(url_list[index])){
			styleOnload(styleNode,function(){
		        	index++;
		        	Load(url_list)
		    });
		}else if(/\.js/.test(url_list[index])){
			dynamicLoad(styleNode,function(){
		        	index++;
		        	Load(url_list)
			})
		}
	   
	}

	
	function Load(url_list){
		if(url_list[index]){
			loadcss(url_list)
		}else{
			var body = document.getElementsByTagName('body')[0];
			var loadings = getElementsByClassName(document, 'loadings');
			body.removeChild(loadings[0])
	       	if(typeof(GetQueryString) == "function"){
	        	var email = Cookies.get('email');
				var num = Cookies.get('num');
				var sid = GetQueryString('id');
				if(email!=''&&email!=null){
	                $('.SignIn').hide();
					$('.SignIn').eq(1).show();
					$('.SignIn').eq(1).find('a').eq(0).html(email)
				}
				if(num!=''&&num!=null){
					$('.menu_li').find('i').hide()
					$('.menu_li').eq(num-1).find('i').css('display','block')
				}
	        }
		}
		
	}

function getElementsByClassName(node, className) {
    if (node.getElementsByClassName) {
        // 使用现有方法
        return node.getElementsByClassName(className);
    } else {
        // 循环遍历所有标签，返回带有相应类名的元素
        var results = [],
            elems = node.getElementsByTagName("*");
        for (var i = 0, len = elems.length; i < len; i++) {
            if (elems[i].className.indexOf(className) != -1) {
                results[results.length] = elems[i];
            }
        }
        return results;
    }
}
	
