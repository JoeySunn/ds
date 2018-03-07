
/*
	此文件功能介绍：修改ajax URL地址，
	登录、注册、修改密码、弹出提示框、关闭提示框、修改密码，
	关闭登录框、关闭注册框以及修改框，获取地址栏参数
	方法：
		GetQueryString：获取地址栏参数
		load:加载公共HTML
		getPostUrl:ajax请求地址栏参数URL
		confirm:页面用于提示的弹窗,拥有两个按钮供给
		alert:页面用于提示的弹窗,拥有y一个按钮供给
		cancel:取消弹框提示
		setIn_cancel：两秒自动取消弹框提示
		signIn：立即注册和登录切换
		signIn_out：退出登录
		Sign_in：用户登录
		register：用户注册
		closeWindow：关闭登录注册页面按钮
		modifypassword：登陆框忘记密码按钮
		forgot_password：忘记密码验证模块
		slider:滑块验证
		Get_authentication_code：验证邮箱
	
*/
localStorage.removeItem("email")
localStorage.removeItem("oneday")
var isSliderSuc;
$(document).ready(function(){ 
	var footer1= $("#footer1");
	var footer2= $("#footer2");
	var sign_In1= $("#sign_In1");
	var sign_In2= $("#sign_In2");
	var header= $("#header");
	var header1= $("#header1");
	load(footer1,"/footer.html")
	load(footer2,"/html/footer.html")
	load(sign_In1,"/sign_In.html")
	load(sign_In2,"/html/sign_In.html")
	load(header,"/header.html",email_log)
	load(header1,"/html/header.html",email_log)
	
	if(typeof(GetQueryString) == "function"){
    	var email = $.cookie('email');
		var num = $.cookie('num');
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
})
if($.cookie('email')){
		var email = $.cookie('email');
	}

function origin(){
	if (typeof location.origin === 'undefined')
	{
	    winOrigin = location.protocol + '//' + location.host;
	}
	else
	{
	    winOrigin = window.location.origin;
	}
	return winOrigin
}
/*
	获取地址栏参数
	name：获取的参数名
*/
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
var flag = IsPC(); //true为PC端，false为手机端
var list_pc = ['/index.html','/productMall.html','/zation_Customized.html','/Merchant_platform.html','/general_Document.html','/html/airTravel.html','/html/automobileInsurance.html','/html/baby.html','/html/beauty.html','/html/customization.html','/html/digital.html','/html/medicalCare.html','/html/motion.html','/html/o2o.html','/html/onlineRetailers.html','/html/pet.html','/html/productDetails.html','/html/register.html','/html/restaurant.html','/html/traffic.html']
var list_nopc = ['/productMall.html','/html/productDetails.html']
var url_name = window.location.pathname;
var url_search=window.location.search;
if(!flag){
	
	if(list_nopc.indexOf(url_name)!=-1){
		// var baseUrl;
		// if (typeof location.origin === 'undefined')
		// {
		//     baseUrl = location.protocol + '//' + location.host;
		//     window.location.href=baseUrl+'/Web'+url_name+url_search;
		// }
		// else
		// {
		//     baseUrl = window.location.origin;
		//     window.location.href=baseUrl+'/Web'+url_name+url_search;
		// }
		
		window.location.href=origin()+'/Web'+url_name+url_search;

	}
    
}
/*

	加载公共HTML页面
	element：存放加载内柔的元素
	address：加载页面的名字，如在二级页面需加html("/html/header.html")

*/
function load(element,address,fun){
	if(element.length>0){
		element.load(address,function(response,status,xhr){
			if(status=='success'&&fun){
				fun()
			}
		});
	}
}


function email_log(){
	if(email!=''&&email!=null){
		closeWindow()
		$('.SignIn').hide();
		$('.SignIn').eq(1).show();
		$('.SignIn').eq(1).find('a').eq(0).html(email)
	}
}
	

$(document).scroll(function() {  
	if($(document).scrollTop()<=0){
		$('#index .NavigationBar').css({
			"position": "absolute"
		})
	}else if($(document).scrollTop()>0){
		$('#index .NavigationBar').css({
			"position": "fixed"
		})
	}

})
//ajax请求地址栏参数
//action：需要添加的参数名字
 function getPostUrl(action){
 	var origin1=origin();
 	return origin1+'/OpenDS/Member';
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

	立即注册和登录切换
	obj:当前调用的元素

*/
function signIn(obj){
	var sid = $(obj).attr('sid');
	$('.SignIn_register').removeClass('SignIn_a');
	$('#mork').find('.mork_conter').hide();
	$('.SignIn_register').eq(sid-1).addClass('SignIn_a');
	if(sid==1){
		
		$('#mork').show();
		$('#mork .mork_conter').eq(0).show();
	}
	if(sid==2){
		$('#mork').show();
		$('#mork .mork_conter').eq(1).show();
	}
	slider()
}

// type:当前页面退出登录后是否需要跳转首页
// type==1：用于一级页面跳转至首页
// type==2：用于二级页面跳转至首页
function signIn_out(type){		//退出登录
	
	$.ajax({				
		type: "post",
        async: true,
        url: getPostUrl()+'/Company/logout_do',
        dataType: "json",
        success: function(json){
        	if(json.status==1){
        		var title='退出登录！',
					name1='确定',
					Method1='';
				alert(title,name1,Method1,1)
				$.cookie('email', null);
        		$('.SignIn').hide();
	 			$('.SignIn1').show();
	 			if(type==1){
	 				window.location.href="./index.html"
	 				$.cookie('num','1');
	 			}else if(type==2){
	 				window.location.href="../index.html"
	 				$.cookie('num','1');
	 			}
        	}else{
        		if(json.info=="用户未登录!"){
         			$('.SignIn_register').eq(0).click();
					re_Logged_In()
         		}else{
         			var title=json.info,
						name1='确定',
						Method1='cancel()';
					alert(title,name1,Method1)
         		}
        	}
        }
    })
}


// obj:当前调用的元素
function Sign_in(obj,type){		//用户登录
	var email = $('.mork_conter_center_sign_In .mork_conter_center_email').val(),
		password = $('.mork_conter_center_sign_In .mork_conter_center_password').val(),
		input_Verification_slider = isSliderSuc;
		if(email==''||email==null){
			var title='登录邮箱不能为空！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			slider()
			return
		}
		if(password==''||password==null){
			var title='登录密码不能为空！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			slider()
			return
		}
		if(input_Verification_slider!=true){
			var title='请按住滑块，拖到最右边',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			slider()
			return

		}
		$.ajax({
	         type: "post",
	         async: true,
	         url: getPostUrl()+'/Company/login_do',
	         data: {
				"email": email,
				"password":password
			},
	         dataType: "json",
	         success: function(json){
	         	if(json.status==1){
	         		
						var title=json.info,
							name1='确定',
							Method1='';
						alert(title,name1,Method1,1)
	         			closeWindow()
	         			$('.SignIn').hide();
	         			$('.SignIn').eq(1).show();
	         			$('.SignIn').eq(1).find('a').eq(0).html(email)
						$.cookie('email',email);
	         			$('.mork_conter_center_sign_In .mork_conter_center_email').val('')
						$('.mork_conter_center_sign_In .mork_conter_center_password').val('')
						slider()
						if(type==1){
         					window.location.href=location.origin+'/Merchant_platform.html'
						}
	         	}else{
	         		
	         		$('.mork_conter_center_sign_In .mork_conter_center_email').val('')
					$('.mork_conter_center_sign_In .mork_conter_center_password').val('')
					slider()
					if(json.info=="用户未登录!"){
	         			$('.SignIn_register').eq(0).click();
						re_Logged_In()
	         		}else{
	         			var title=json.info,
							name1='确定',
							Method1='cancel()';
						alert(title,name1,Method1)
	         		}
	         	}
	         }
		 })
}


// obj:当前调用的元素
function register(obj){	//用户注册
	var email = $('.mork_conter_center_register .mork_conter_center_email').val(),
		that= $(obj),
		password = $('.mork_conter_center_register .mork_conter_center_password').val(),
		password1 = $('.mork_conter_center_register .mork_conter_center_confirmation_password').val(),
		code = $('.mork_conter_center_register .mork_conter_center_code').val();
		if(email==''||email==null){
			var title='邮箱不能为空！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}else{
			if(!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email)){
				var title='邮箱格式错误！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return
			}
		}
		
		if(/^[0-9]{6,20}$/g.test(password)||/^[a-z]{6,20}$/g.test(password)||/^[A-Z]{6,20}$/g.test(password)){
			var title='密码格式不正确！请输入6-20位字母和数字，不能为纯数字或者纯字母',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}else{
			if(!/^[a-zA-Z0-9]{6,20}$/g.test(password)){
				var title='密码格式不正确！请输入6-20位数字字母组合，不能为纯数字或者纯字母',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return
			}
		}
		if(password1!=password){
			var title='两次密码不一致！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}
	$.ajax({
         type: "post",
         async: true,
         url: getPostUrl()+'/Company/register_do',
         data: {
			"email": email,
			"password": password,
			"code": code
		},
         dataType: "json",
         success: function(json){
         	if(json.status==1){
         		var title='注册成功！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
         		that.parent('.mork_conter_center').find('label').find('input').val('')
         		$('.mork_conter_center_sign_In .mork_conter_center_email').val(email);
         		$('.mork_conter_center_sign_In .mork_conter_center_password').val(password);
         		$('.slide-to-unlock-progress').css('width','324px')
         		var obj=$('.mork_conter_center_btn_Sign_in');
         		Sign_in(obj,'1')
         	}else{
         		if(json.info=="用户未登录!"){
         			$('.SignIn_register').eq(0).click();
         			re_Logged_In()
         		}else{
         			var title=json.info,
						name1='确定',
						Method1='cancel()';
					alert(title,name1,Method1)
         		}
         	}
         }
	 })
}

/*

	关闭登录注册页面按钮
	type:当前弹框关闭后是否需要跳转首页
	type==1：用于一级页面跳转至首页
	type==2：用于二级页面跳转至首页

*/
function closeWindow(type){
	$('#mork').hide();
	schedule=0;
	slider()
	if(type==1){
		window.location.href="./index.html"
		$.cookie('num','1');
	}else if(type==2){
		window.location.href="../index.html"
		$.cookie('num','1');
	}
}

/*

	忘记密码按钮

*/
function modifypassword(){
	$('.mork_conter').hide();
	$('.Modify_password').show();
	$('.Modify_password').find('.mork_conter_center').hide();
	$('.Modify_password').find('.mork_conter_center_mdify_password_one').show();
	$('.Modify_password').find('.mork_conter_center').find('input').val('');
	// $('.Modify_password .Get_authentication_code').removeAttr('disabled')
}

/*

	忘记密码第一步
	obj:当前调用的元素
	type:当前修改密码进行到第几步

*/
function forgot_password(obj,type){
	var email=$('.mork_conter_center_mdify_password_one .mork_conter_center_email').val(),
		code=$('.mork_conter_center_mdify_password_one .mork_conter_center_code').val();
		if(type==1){
			$('.mork_conter_center_mdify_password_one .mork_conter_center_email_p').removeClass('p_green');
			$('.mork_conter_center_mdify_password_one .mork_conter_center_email_p').removeClass('p_gules');
			$('.mork_conter_center_mdify_password_one .mork_conter_center_email_p').hide();
			$('.mork_conter_center_mdify_password_one .mork_conter_center_email').removeClass('ipt');
			if(email==''){
				$('.mork_conter_center_mdify_password_one .mork_conter_center_email_p').html('请输入6～20位字符，只能输入数字、字母、符号，至少包含字母和数字（区分大小写）<b></b>')
				$('.mork_conter_center_mdify_password_one .mork_conter_center_email_p').show();
				$('.mork_conter_center_mdify_password_one .mork_conter_center_email_p').removeClass('p_green');
				$('.mork_conter_center_mdify_password_one .mork_conter_center_email_p').removeClass('p_gules');
				$('.mork_conter_center_mdify_password_one .mork_conter_center_email_p').addClass('p_green');
				return
			}else if(email!=''){
				if(!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email)){
					$('.mork_conter_center_mdify_password_one .mork_conter_center_email_p').html('邮箱格式错误！（区分大小写）<b></b>')
					$('.mork_conter_center_mdify_password_one .mork_conter_center_email_p').show();
					$('.mork_conter_center_mdify_password_one .mork_conter_center_email_p').removeClass('p_green');
					$('.mork_conter_center_mdify_password_one .mork_conter_center_email_p').removeClass('p_gules');
					$('.mork_conter_center_mdify_password_one .mork_conter_center_email_p').addClass('p_gules');
					$('.mork_conter_center_mdify_password_one .mork_conter_center_email').removeClass('ipt');
					$('.mork_conter_center_mdify_password_one .mork_conter_center_email').addClass('ipt');
					return
				}else{
					$.ajax({
				         type: "post",
				         async: true,
				         url: getPostUrl()+'/Company/chg_password_fst',
				         data: {
							"email": email,
							"code": code
						},
				         dataType: "json",
				         success: function(json){
				         	if(json.status==1){

				         		$(obj).parent('.mork_conter_center').siblings('.mork_conter_center').show();
								$(obj).parent('.mork_conter_center').hide();
				         	}else{
				         		if(json.info=="用户未登录!"){
				         			$('.SignIn_register').eq(0).click();
				         			re_Logged_In()
				         		}else{
				         			var title=json.info,
										name1='确定',
										Method1='cancel()';
									alert(title,name1,Method1)
				         		}
				         	}
				         }
				     })
					return
				}
			}
			
		}else if(type==2){
			var email1=$('.mork_conter_center_mdify_password_one .mork_conter_center_email').val();
			$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').removeClass('p_green');
			$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').removeClass('p_gules');
			$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one').removeClass('ipt');
			$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').hide();
			$('.mork_conter_center_mdify_password_two .mork_conter_center_password_two_p').removeClass('p_green');
			$('.mork_conter_center_mdify_password_two .mork_conter_center_password_two_p').removeClass('p_gules');
			$('.mork_conter_center_mdify_password_two .mork_conter_center_password_two').removeClass('ipt');
			$('.mork_conter_center_mdify_password_two .mork_conter_center_password_two_p').hide();
			if(email==''){
				$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').html('请输入6~16位以上字符，只能输入数字、字母、符号（区分大小写）<b></b>')
				$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').show();
				$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').removeClass('p_green');
				$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').removeClass('p_gules');
				$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').addClass('p_green');
				return
			}else if(email!=''){
				$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').removeClass('p_green');
				$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').removeClass('p_gules');
				$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').removeClass('ipt');
				$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').hide();
				if(!/^[a-zA-Z0-9_-]{6,16}$/.test(email)){
					$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').html('密码格式错误！（区分大小写）<b></b>')
					$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').show();
					$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').removeClass('p_green');
					$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').removeClass('p_gules');
					$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').addClass('p_gules');
					$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').removeClass('ipt');
					$('.mork_conter_center_mdify_password_two .mork_conter_center_password_one_p').addClass('ipt');
					return
				}
			}

			if(email!=code){
				$('.mork_conter_center_mdify_password_two .mork_conter_center_password_two_p').html('密码不一致！<b></b>')
				$('.mork_conter_center_mdify_password_two .mork_conter_center_password_two_p').show();
				$('.mork_conter_center_mdify_password_two .mork_conter_center_password_two_p').removeClass('p_green');
				$('.mork_conter_center_mdify_password_two .mork_conter_center_password_two_p').removeClass('p_gules');
				$('.mork_conter_center_mdify_password_two .mork_conter_center_password_two_p').addClass('p_gules');
				$('.mork_conter_center_mdify_password_two .mork_conter_center_password_two').removeClass('ipt');
				$('.mork_conter_center_mdify_password_two .mork_conter_center_password_two').addClass('ipt');
				return
			}
			$.ajax({
		         type: "post",
		         async: true,
		         url: getPostUrl()+'/Company/chg_password',
		         data: {
		         	"email":email1,
					"password": email,
					"rep_password": code
				},
		         dataType: "json",
		         success: function(json){
		         	if(json.status==1){
						var title=json.info,
							name1='确定',
							Method1='cancel()';
						alert(title,name1,Method1)
						$('.mork_conter').hide();
						$('.mork_conter').eq(0).show();
		         	}else{
		         		if(json.info=="用户未登录!"){
		         			$('.SignIn_register').eq(0).click();
		         			re_Logged_In()
		         		}else{
		         			var title=json.info,
								name1='确定',
								Method1='cancel()';
							alert(title,name1,Method1)
		         		}
		         	}
		         }
		     })
		
		}
}

/*
	验证邮箱
	obj:当前调用元素
	type:存在时表示方法所用场景不是在忘记密码处，请求邮箱方式不同
	Interval:
*/
var times;//定时器名字
var times1;//定时器名字
function Get_authentication_code(obj,type,Interval){
	if(type!=1){

		var email = $(obj).parent().parent('.Modify_mailbox_conter').find('.New_mailbox').eq(0).find('input').val();
	}else{
		var email = $(obj).parent().parent('.mork_conter_center').find('label').eq(0).find('input').val();
	}

	var num=60;
	var num1=60;
	if(email==''||email==null){
		var title='邮箱不能为空！',
			name1='确定',
			Method1='cancel()';
		alert(title,name1,Method1)
		return
	}else{
		if(!email_regx(email)){
			var title='邮箱格式错误！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}
	}
	$.ajax({
         type: "post",
         async: true,
         url: getPostUrl()+'/Mail/send_do',
         data: {
			"email": email
		},
         dataType: "json",
         success: function(json){
         	if(json.status==1){
         		// alert('发送成功！')
         		if(Interval&&Interval==1){
         			$(obj).html(num1+'秒');
	         		$(obj).attr('disabled','disabled')
	         		times1=setInterval(function(){
	         			num1--;
	         			$(obj).html(num1+'秒')
	         			if(num1<=0){
	         				clearInterval(times1)
	         				$(obj).html('获取邮箱验证码')
	         				$(obj).removeAttr('disabled')
	         			}
	         		},1000)
         		}else{
         			$(obj).html(num+'秒');
	         		$(obj).attr('disabled','disabled')
	         		times=setInterval(function(){
	         			num--;
	         			$(obj).html(num+'秒')
	         			if(num<=0){
	         				clearInterval(times)
	         				$(obj).html('获取邮箱验证码')
	         				$(obj).removeAttr('disabled')
	         			}
	         		},1000)
         		}
         		
         	}else{
         		
         		if(json.info=="用户未登录!"){
         			$('.SignIn_register').eq(0).click();
	         		re_Logged_In()
         		}else{
         			var title=json.info,
						name1='确定',
						Method1='cancel()';
					alert(title,name1,Method1)
         		}
         	}
         }
	 })
}


function slider(){		//滑块验证
	$('.bar1').slideToUnlock({
		height : 50,
		width : 370,
		text : '滑动解锁',
		succText : '解锁成功',
		bgColor : '#99bad4',
		textColor : '#787878',
		progressColor : '#7AC23C',
		succTextColor : '#fff',
		successFunc:function(){
			isSliderSuc=true;
		}
	});
}

function re_Logged_In(){		//未登录时请求接口后操作
	$.cookie('email', null);
	$('.SignIn').hide();
	$('.SignIn1').show();
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
		window.location.href=origin()+url+'?'+str
	}else{
		window.location.href=origin()+url

	}
}




/*

	邮箱正则验证
	email:需要验证的邮箱

*/

function email_regx(email){
	if(!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email)){
		return false
	}else{
		return true
	}
}


/*

	密码正则验证
	password:需要验证的密码

*/
function password_regx(password){
	if(/^[0-9]{6,20}$/g.test(password)||/^[a-z]{6,20}$/g.test(password)||/^[A-Z]{6,20}$/g.test(password)){
			return false
		}else{
			if(!/^[a-zA-Z0-9]{6,20}$/g.test(password)){
				return false
			}else{
				return true
			}
		}
}

/*

	手机号正则验证
	mobile:需要验证的手机号

*/
function mobile_regx(mobile){
	if(/^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile)){
		return true
	}else{
		return false
	}
}

/*

	日期正则验证
	date:需要验证的日期

*/
function date_regx(date){
	if(/\d{4}-\d{1,2}-\d{1,2}/.test(date)){
		return true
	}else{
		return false
	}
}

/*

	身份证正则验证
	date:需要验证的日期

*/
function idNumber_regx(date){
	if(/^(\d{18,18}|\d{15,15}|\d{17,17}(x|X))$/.test(date)){
		return true
	}else{
		return false
	}
}

/*

	社会统一引用代码正则验证
	date:需要验证的日期

*/
function enterpriseDocuments_regx(date){
	if(/[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}/g.test(date)){
		return true
	}else{
		return false
	}
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
 
function isIE() { //ie?
 if (!!window.ActiveXObject || "ActiveXObject" in window)
  return true;
  else
  return false;
 }
 
