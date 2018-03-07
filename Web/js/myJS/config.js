/*
	获取地址栏参数
	name：获取的参数名
*/
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

var v = "1.0.6";
$('html').attr('v',v)
var flag = IsPC(); //true为PC端，false为手机端
var list_pc = ['/index.html','/productMall.html','/zation_Customized.html','/Merchant_platform.html','/general_Document.html','/html/airTravel.html','/html/automobileInsurance.html','/html/baby.html','/html/beauty.html','/html/customization.html','/html/digital.html','/html/medicalCare.html','/html/motion.html','/html/o2o.html','/html/onlineRetailers.html','/html/pet.html','/html/productDetails.html','/html/register.html','/html/restaurant.html','/html/traffic.html']
var list_nopc = ['/productMall.html','/html/productDetails.html']
var url_name = window.location.pathname;
var url_search=window.location.search;
if(flag){
	window.location.href=window.location.origin+url_name.substr(4)+url_search
}

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

//ajax请求地址栏参数
//action：需要添加的参数名字
 function getPostUrl(action){
 	var origin=window.location.origin
 	return origin+'/OpenDS/Member';
 }

//页面用于提示的弹窗,拥有两个按钮供给
// title:页面提示语
// name1：左边按钮名字
// Method1：左边按钮事件
// name2：右边按钮名字
// Method2：右边按钮事件
// type:不等于一时2秒自动消失
function confirm (title,name1,Method1,name2,Method2,type) {
	// body... 

	$('#bomb_box_1').remove();
	var str='';
		str+='<div id="bomb_box_1">'+
			'<div class="bomb_box_bg"></div>'+
			'<div id="bomb_box">'+
				'<p>'+title+'</p>'+
				'<a class="left_a">'+name1+'</a>'+
				'<a class="right_a">'+name2+'</a>'+
			'</div>'+
		'</div>'	
	$('body').append(str)
	$(document).on('click','#bomb_box .left_a',function(){
		eval(Method1)
	})
	$(document).on('click','#bomb_box .right_a',function(){
		eval(Method2)
	})
	if(type!=1){
		setIn_cancel()
	}
	
}


//页面用于提示的弹窗,拥有y一个按钮供给
// title:页面提示语
// name1：按钮名字
// Method1：按钮事件
function alert (title,name1,Method1,type) {
	$('#bomb_box_1').remove();
	if(name1==''||name1==null||name1==undefined){
		name1='取消'
	}
	
	var str='';
	str+='<div id="bomb_box_1">'+
			'<div class="bomb_box_bg"></div>'+
			'<div id="bomb_box">'+
				'<p>'+title+'</p>'
				if(Method1!=''&&Method1!=null&&Method1!=undefined){
					str+='<a class="left_a">'+name1+'</a>'
				}
				
			str+='</div>'+
		'</div>'
	$('body').append(str)
	$(document).on('click','#bomb_box .left_a',function(){
		eval(Method1)
	})
	if(type==1){
		setIn_cancel(type)
	}
	
}


// 取消弹框提示
function cancel(type){
	$('#bomb_box_1').hide()
	if(type==1){
		location.reload();
	}
} 


// 2秒后自动取消弹框提示
function setIn_cancel(type){
	var timer;
	timer=setInterval(function(){
		$('#bomb_box_1').hide()
		clearInterval(timer)
		if(type==1){
			location.reload();
		}
	},2000)
}

/*

	url地址跳转
	url:

*/
function url_location(url,object){
	var str='';
	if(object){
		for(var i = 0;i<object.name.length;i++){
			if(i==0){
				str+=object.name[i]+'='+object.title[i]
			}else{
				str+='&'+object.name[i]+'='+object.title[i]
			}
			
		}
		window.location.href=window.location.origin+'/Web'+url+'?'+str
	}else{
		window.location.href=window.location.origin+'/Web'+url
	}
}