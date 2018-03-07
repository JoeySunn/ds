
/*
	方法：
		jumpPosition：产品详情页的产品导航栏
		Industry_czt_li_over: 行业定制场景悬浮框出现
		Industry_czt_li_out: 行业定制场景悬浮框消失
		msover:首页场景推荐位移入显示
		msout：首页场景推荐位移除消失
		msover1：行业定制场景推荐位移入显示
		msout1：行业定制场景推荐位移除隐藏
		switch1：点击进入相应的导航页
		SwitchModule：点击进入相应的产品页
		SwitchModule1：行业定制页面产品模块点击进入相应的产品页
		switch2： 点击回到相应的导航页
		tab1: 点击切换场景方案
		productDetails: 打开产品商城页
		pageEvent: 生成页码
		reverseNumberPage: 点击数字页码
		reversePrevPage: 点击“上一页”
		reverseNextPage: 点击“下一页”
		Sclassification: 生成相应的场景下的产品
		Sclassification2: 生成相应的场景下的产品
		customization1:行业定制页面  去定制按钮
		Immediate_authentication: 点击去定制按钮  未认证时状态
		Apply_for_cooperation: 申请合作按钮
		Et_industry_customization：进入行业定制页面
		Generaldocument：点击进入文档中心相应的文档
		popupWindow：页面弹框
		insuranceAgreement：袋鼠购险协议
		Modify_password：发送验证码
		DeploymenMmenu：点击相应的一级菜单同时展开相应的二级菜单
		SwitchContent：文档中心侧边栏二级菜单打开
		want_To_Promote:"我要推广"按钮
		enterScene: 点击首页行业场景示例进入相应的行业场景定制页面
	
*/

var doc = GetQueryString('document');
$('document').ready(function(){			//获取banner图片最大宽  防止图片进行缩放或扩大
	/*

		根据获取到的URL参数打开相应的文档菜单

	*/		
	if(GetQueryString('document')&&(GetQueryString('document')==3||GetQueryString('document')==7)){
		$("#Merchant_platform_conter .menus").eq(0).find('.group .menu_conter').eq(2).addClass('active').siblings('.menu_conter').removeClass('active');
		$("#Merchant_platform_conter .platform_content_record").hide();
		$("#Merchant_platform_conter .platform_content_record").eq(2).show();
	
	}else if(GetQueryString('document')&&(GetQueryString('document')==1||GetQueryString('document')==5)){
		$("#Merchant_platform_conter .menus").eq(0).find('.group .menu_conter').eq(0).addClass('active').siblings('.menu_conter').removeClass('active');
		$("#Merchant_platform_conter .platform_content_record").hide();
		$("#Merchant_platform_conter .platform_content_record").eq(0).show();
	}else if(GetQueryString('document')&&(GetQueryString('document')==2||GetQueryString('document')==6)){
		$("#Merchant_platform_conter .menus").eq(0).find('.group .menu_conter').eq(1).addClass('active').siblings('.menu_conter').removeClass('active');
		$("#Merchant_platform_conter .platform_content_record").hide();
		$("#Merchant_platform_conter .platform_content_record").eq(1).show();
	}else if(GetQueryString('document')&&(GetQueryString('document')==4||GetQueryString('document')==8)){
		$("#Merchant_platform_conter .menus").eq(0).find('.group .menu_conter').eq(3).addClass('active').siblings('.menu_conter').removeClass('active');
		$("#Merchant_platform_conter .platform_content_record").hide();
		$("#Merchant_platform_conter .platform_content_record").eq(3).show();
	}
	var cleartime=null;
	var num=1;
	// 用于行业定制页展示动画
	cleartime=setInterval(function(){
		if(num==1){
			$('.productMall_img').attr('src','./images/banner14.png');
			num++;
		}else if(num==2){
			$('.productMall_img').attr('src','./images/banner15.png')
			num++;
		}else if(num==3){
			$('.productMall_img').attr('src','./images/banner13.png')
			num=1;
		}
		
	},200)
	slider()
})


// obj:当前调用的元素
function jumpPosition(obj){   //产品详情页的产品导航栏
	var index=$('.twonav_li').index($(obj)),
	specialAgreement=$('.specialAgreement')[0];
	$('.twonav_li').find('b').hide();
	if(index==0){
		$(document).scrollTop(547);
		$('.twonav_li').eq(index).find('b').show();
	}else if(index==1){
		$(document).scrollTop(specialAgreement.offsetTop-($('.twonav').height()));
		$('.twonav_li').eq(index).find('b').show();
	}
}
// function Remove(obj){
// 	console.log(1)

// }
// function Remove1(obj){
// 	console.log(2)

// }


/*

	行业定制场景悬浮框出现
	obj:当前调用的元素
*/
function Industry_czt_li_over(obj){
	$('.Industry_czt').show()
	$('.Industry_czt_li').find('b').show()
}
/*

	行业定制场景悬浮框消失
	obj:当前调用的元素
*/
function Industry_czt_li_out(obj){
	$('.Industry_czt').hide()
	$('.Industry_czt_li').find('b').hide()
}
/*

	首页场景推荐位显示
	obj:当前调用的元素
*/
function msover(obj){
	var index = $('.IndustryCustomization_mod').index($(obj));
	$(obj).stop().animate({
		"top":"-30px"
	},1)
	$(obj).css('box-shadow','0 10px 16px 0 rgba(14,40,91,0.08)')
}
/*

	首页场景推荐位消失
	obj:当前调用的元素
*/
function msout(obj){

	$(obj).stop().animate({
		"top":"0px"
	},1)
	$(obj).css('box-shadow','none')
	
}
/*

	行业定制场景推荐位显示
	obj:当前调用的元素
*/
function msover1(obj){
	var index=$('.Product_conter td').index($(obj)),
	logo_hover_url=$(obj).attr('logo_hover_url');
	$('.Product_conter td').eq(index).find('b img').attr('src',logo_hover_url);
}
/*

	行业定制场景推荐位隐藏
	obj:当前调用的元素
*/
function msout1(obj){
	var index=$('.Product_conter td').index($(obj)),
	logo_url=$(obj).attr('logo_url');
	$('.Product_conter td').eq(index).find('b img').attr('src',logo_url);
}
$('.IndustryCustomization_mod').click(function(){
	console.log('移入')
})
$('.IndustryCustomization_mod').eq(0).mouseout(function(){
	console.log('移出')
})
function switch1(obj){			//点击进入相应的导航页   obj:当前调用的元素
	var index=$('.menu_li').index($(obj));
	if(index==0||index==5){
		var url = '/index.html';
		url_location(url)
		$.cookie('num','1')
	}else if(index==1||index==6){
		var url = '/productMall.html';
		url_location(url)
		$.cookie('num','2')
	}else if(index==2||index==7){
		var url = '/zation_Customized.html';
		var shuju={
			name:['id'],
			title:['0']
		}
		url_location(url,shuju)
		$.cookie('num','3')
	}else if(index==3||index==8){
		// window.location.href='./Merchant_platform.html'
		$.ajax({				
			type: "post",
	        async: true,
	        url: getPostUrl()+'/Company/cert_info',
	        dataType: "json",
	        success: function(json){
	        	if(json.status==1){
	        		if(json.info.cert_status==1||json.info.cert_status==6){
	        			var url = '/Merchant_platform.html';
						url_location(url)
	        		}else if(json.info.cert_status==2){
	        			var url = '/html/register.html';
						var shuju={
							name:['stat'],
							title:['2']
						}
						url_location(url,shuju)
	        		}else if(json.info.cert_status==3){
	        			var url = '/html/register.html';
						var shuju={
							name:['stat'],
							title:['3']
						}
						url_location(url,shuju)
	        		}else if(json.info.cert_status==4){
	        			var url = '/Merchant_platform.html';
						var shuju={
							name:['stas'],
							title:['1']
						}
						url_location(url,shuju)
	        			
	        		}else if(json.info.cert_status==5){
	        			var url = '/html/register.html';
						var shuju={
							name:['stat'],
							title:['5']
						}
						url_location(url,shuju)
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
	}else if(index==4||index==9){
		var url = '/general_Document.html';
		var shuju={
			name:['document'],
			title:['1']
		}
		url_location(url,shuju)
	}
}
function SwitchModule(obj,type){  //点击进入相应的产品页  obj:当前调用的元素  type：用不不同的层级页面调用不同的事件
	if(type==1){
		var index=$('.Industry_czt').find('td').index($(obj));
	}else{
		var index=$('.Product_conter').find('td').index($(obj));
	}
	window.location.href= $(obj).attr('links')
	$.cookie('num','3')
	
}
function SwitchModule1(obj){  //点击进入相应的产品页  obj:当前调用的元素
	var index=$('.Industry_czt td').index($(obj));
	if(index==0){
		var url = '/customization.html'
		url_location(url)
		$.cookie('num','3')
	}else if(index==1){
		var url = '/onlineRetailers.html'
		url_location(url)
		$.cookie('num','3')
	}else if(index==2){
		var url = '/digital.html'
		url_location(url)
		$.cookie('num','3')
	}else if(index==3){
		var url = '/airTravel.html'
		url_location(url)
		$.cookie('num','3')
	}else if(index==4){
		var url = '/beauty.html'
		url_location(url)
		$.cookie('num','3')
	}else if(index==5){
		var url = '/baby.html'
		url_location(url)
		$.cookie('num','3')
	}else if(index==6){
		var url = '/o2o.html'
		url_location(url)
		$.cookie('num','3')
	}else if(index==7){
		var url = '/baby.html'
		url_location(url)
		$.cookie('num','3')
	}else if(index==8){
		var url = '/motion.html'
		url_location(url)
		$.cookie('num','3')
	}else if(index==9){
		var url = '/restaurant.html'
		url_location(url)
		$.cookie('num','3')
	}else if(index==10){
		var url = '/traffic.html'
		url_location(url)
		$.cookie('num','3')
	}else if(index==11){
		var url = '/pet.html'
		url_location(url)
		$.cookie('num','3')
	}
	// console.log(index)
}

function switch2(obj){				//点击回到相应的导航页  obj:当前调用的元素
	var index=$('.menu_li').index($(obj))
	if(index==0||index==5){
		var url = '/index.html';
		url_location(url)
		$.cookie('num','1')
	}else if(index==1||index==6){
		var url = '/productMall.html';
		url_location(url)
		$.cookie('num','2')
	}else if(index==2||index==7){
		var url = '/zation_Customized.html';
		var shuju={
			name:['id'],
			title:['0']
		}
		url_location(url,shuju)
		$.cookie('num','3')
	}else if(index==3||index==8){
		$.ajax({				
			type: "post",
	        async: true,
	        url: getPostUrl()+'/Company/cert_info',
	        dataType: "json",
	        success: function(json){
	        	if(json.status==1){
	        		if(json.info.cert_status==1||json.info.cert_status==6){
	        			var url = '/Merchant_platform.html';
						url_location(url)
	        		}else if(json.info.cert_status==2){
	        			var url = '/html/register.html';
						var shuju={
							name:['stat'],
							title:['2']
						}
						url_location(url,shuju)
	        		}else if(json.info.cert_status==3){
	        			var url = '/html/register.html';
						var shuju={
							name:['stat'],
							title:['3']
						}
						url_location(url,shuju)
	        		}else if(json.info.cert_status==4){
	        			var url = '/Merchant_platform.html';
						var shuju={
							name:['stas'],
							title:['1']
						}
						url_location(url,shuju)
	        		}else if(json.info.cert_status==5){
	        			var url = '/html/register.html';
						var shuju={
							name:['stat'],
							title:['5']
						}
						url_location(url,shuju)
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
	}else if(index==4||index==9){
		var url = '/general_Document.html';
		var shuju={
			name:['document'],
			title:['1']
		}
		url_location(url,shuju)
	}
}

function tab(obj){   //点击切换场景方案   obj:当前调用的元素
	var index=$('.Customized_btn').index($(obj))
	$('.Customized_btn').eq(index).addClass('a').siblings('.Customized_btn').removeClass('a')
	$('.Customized_pictxt').hide();
	$('.Customized_pictxt').eq(index).show();
}
function tab1(obj){		//点击切换场景方案  obj:当前调用的元素
	var index=$('.Customized_btn').index($(obj))
	$('.Customized_btn').eq(index).addClass('a').siblings('.Customized_btn').removeClass('a')
	$('.Customized_bck').hide();
	$('.Customized_bck').eq(index).show();
}

var schedule = null;


//点击商城首页展示展品进入相应的商品详情页
function productDetails(obj){
	var sid = $(obj).attr('sid');
	var url = '/html/productDetails.html';
	var shuju={
		name:['id'],
		title:[sid]
	}
	url_location(url,shuju)
    $.cookie('num','2')
}

/*
	dom：当前要生成数据的父级元素
	lfjNum：当前要生成的页数
	cls_id：产品商城中当前选择的场景cls_id
	index：产品商城中当前选择的场景位置
*/
function pageEvent(dom,lfjNum,cls_id,index){
// 生成页码
	var pageStr = '';//拼接页码字符串
	lfjPageNum = lfjNum;//获取页码总数
	if(!$(dom+' .paging .page').length){		//是否第一次生成页码
		if(lfjNum>0&&lfjNum<=1){   //当页码为1
			pageStr = '<a dom="'+dom+'" cls_id="'+cls_id+'" index="'+index+'" class="page active">1</a>';
			$(dom+' .prevPage').after(pageStr);
		}else{   //当页码打于1   
			if(lfjPageNum>5){
				for(var p = 0;p < 5;p++){
					pageStr += '<a dom="'+dom+'" cls_id="'+cls_id+'" index="'+index+'" class="page'+(p+1)+' page">'+(p+1)+'</a>';
				}
			}else{
				for(var p = 0;p < lfjPageNum;p++){
					pageStr += '<a dom="'+dom+'" cls_id="'+cls_id+'" index="'+index+'" class="page'+(p+1)+' page">'+(p+1)+'</a>';
				}
			}
			
			$(dom+' .prevPage').after(pageStr);
			$(dom+' .page1').addClass('active');
		}
	}else{
		if(lfjPageNum!=$(dom+' .paging .page').length){
			$(dom+' .paging').find('a').remove('.page');
			$(dom+' .paging').find('a').remove('.active');
			$(dom+' .paging').find('a').remove('a');
			if(lfjNum>0&&lfjNum<=1){
				pageStr = '<a dom="'+dom+'" cls_id="'+cls_id+'" index="'+index+'" class="active">1</a>';
				$(dom+'  .prevPage').after(pageStr);
			}else{
				if(lfjPageNum>5){
					for(var p = 0;p < 5;p++){
						pageStr += '<a dom="'+dom+'" cls_id="'+cls_id+'" index="'+index+'" class="page'+(p+1)+' page">'+(p+1)+'</a>';
					}
				}else{
					for(var p = 0;p < lfjPageNum;p++){
						pageStr += '<a dom="'+dom+'" cls_id="'+cls_id+'" index="'+index+'" class="page'+(p+1)+' page">'+(p+1)+'</a>';
					}
				}
				
				$(dom+'  .prevPage').after(pageStr);
				$(dom+'  .page1').addClass('active');
			}
		}
	}
	$(dom+'  .nextPage').show();		//生成页码时打开前一页
	$(dom+'  .prevPage').show();		//生成页码时打开后一页
	//添加点击事件
	$(dom+'  .prevPage').attr('dom',dom);
	$(dom+'  .prevPage').attr('cls_id',cls_id);
	$(dom+'  .prevPage').attr('index',index);
	//添加点击事件
	$(dom+'  .nextPage').attr('dom',dom);
	$(dom+'  .nextPage').attr('cls_id',cls_id);
	$(dom+'  .nextPage').attr('index',index);
	//end
}

/*
	dom：当前要生成数据的父级元素
	obj：当前点击的页数
	cls_id：产品商城中当前选择的场景cls_id
	index：产品商城中当前选择的场景位置
*/
//点击数字页码
function reverseNumberPage(dom,obj,cls_id,index){
	nowPage = $(obj).text();//当前页码
	$(obj).addClass('active').siblings().removeClass('active');//当前点击的页码添加class其他的页码删除相应的样式class
	var numPage=lfjPageNum-5;
	var pagingNum=1+(nowPage-3);
	var pagingNum1=2+(nowPage-3);
	var pagingNum2=3+(nowPage-3);
	var pagingNum3=4+(nowPage-3);
	var pagingNum4=5+(nowPage-3);
	if(lfjPageNum == 1){	//当页码数只有一时
		$(dom+' .nextPage').attr('disabled','disabled');//不改变现状
	}else if(lfjPageNum != 1 && nowPage == lfjPageNum){  //当页码数等于当前点击的页码数且总页码数不等于1时打开上一页按钮  关闭下一页按钮
		if(numPage>0){
			if(nowPage>=3&&nowPage!=lfjPageNum&&nowPage!=lfjPageNum-1){
				$(dom+' .paging').find('a').eq(0).html(pagingNum)
				$(dom+' .paging').find('a').eq(1).html(pagingNum1)
				$(dom+' .paging').find('a').eq(2).html(pagingNum2)
				$(dom+' .paging').find('a').eq(3).html(pagingNum3)
				$(dom+' .paging').find('a').eq(4).html(pagingNum4)
				$(dom+' .paging').find('a').eq(2).addClass('active').siblings('a').removeClass('active')
				$(dom+' .prevPage').removeAttr('disabled');
				$(dom+' .nextPage').removeAttr('disabled');
			}else if(nowPage>=3&&(nowPage==lfjPageNum||nowPage==lfjPageNum-1)){
				$(dom+' .nextPage').attr('disabled','disabled').siblings('.prevPage').removeAttr('disabled');
			}else if(nowPage<3){
				$(dom+' .nextPage').attr('disabled','disabled').siblings('.nextPage').removeAttr('disabled');
			}
		}else{
			$(dom+' .nextPage').attr('disabled','disabled').siblings('.prevPage').removeAttr('disabled');
		}
	}else if(lfjPageNum != 1 && nowPage == 1){//当页码数不等于当前点击的页码数且当前页码数等于1时打开下一页按钮  关闭上一页按钮
		$(dom+' .prevPage').attr('disabled','disabled').siblings('.nextPage').removeAttr('disabled');
	}else{			//点击页码数在中间页码时   打开上一页和下一页按钮
		if(numPage>0){
			if(nowPage>=3&&nowPage!=lfjPageNum&&nowPage!=lfjPageNum-1){
				$(dom+' .paging').find('a').eq(0).html(pagingNum)
				$(dom+' .paging').find('a').eq(1).html(pagingNum1)
				$(dom+' .paging').find('a').eq(2).html(pagingNum2)
				$(dom+' .paging').find('a').eq(3).html(pagingNum3)
				$(dom+' .paging').find('a').eq(4).html(pagingNum4)
				$(dom+' .paging').find('a').eq(2).addClass('active').siblings('a').removeClass('active')
				$(dom+' .prevPage').removeAttr('disabled');
				$(dom+' .nextPage').removeAttr('disabled');
			}else if(nowPage>=3&&(nowPage==lfjPageNum||nowPage==lfjPageNum-1)){
				$(dom+' .nextPage').attr('disabled','disabled').siblings('.prevPage').removeAttr('disabled');
			}else if(nowPage<3){
				$(dom+' .nextPage').attr('disabled','disabled').siblings('.nextPage').removeAttr('disabled');
			}
		}else{
			$(dom+' .prevPage').removeAttr('disabled');
			$(dom+' .nextPage').removeAttr('disabled');
		}
	}
	Sclassification2(nowPage,cls_id,index); //调用接口显示相应页面内容
}

/*
	dom：当前要生成数据的父级元素
	obj：当前点击的页数
	cls_id：产品商城中当前选择的场景cls_id
	index：产品商城中当前选择的场景位置
*/
//点击“上一页”
function reversePrevPage(dom,obj,cls_id,index){
	nowPage = $(dom+' .page.active').text();//当前页码
	var numPage=lfjPageNum-5;
	var pagingNum=1+(nowPage-4);
	var pagingNum1=2+(nowPage-4);
	var pagingNum2=3+(nowPage-4);
	var pagingNum3=4+(nowPage-4);
	var pagingNum4=5+(nowPage-4);
	if(nowPage-1 > 2){		//当前页码>2时向前一位添加相应样式class    请求相应接口
		if(numPage>0){
			if(nowPage-1>=3&&nowPage-1!=lfjPageNum&&nowPage-1!=lfjPageNum-1){
				$(dom+' .paging').find('a').eq(0).html(pagingNum)
				$(dom+' .paging').find('a').eq(1).html(pagingNum1)
				$(dom+' .paging').find('a').eq(2).html(pagingNum2)
				$(dom+' .paging').find('a').eq(3).html(pagingNum3)
				$(dom+' .paging').find('a').eq(4).html(pagingNum4)
				$(dom+' .paging').find('a').eq(2).addClass('active').siblings('a').removeClass('active')
				$(dom+' .prevPage').removeAttr('disabled');
				$(dom+' .nextPage').removeAttr('disabled');
			}else if(nowPage-1>=3&&(nowPage-1==lfjPageNum||nowPage-1==lfjPageNum-1)){
				$(dom+' .page.active').removeClass('active').prev().addClass('active');
			}else{
				$(dom+' .page.active').removeClass('active').prev().addClass('active');
			}
		}else{
			$(dom+' .page.active').removeClass('active').prev().addClass('active');
		}
		Sclassification2(nowPage-1,cls_id,index);
	}else if(nowPage-1==2){
		$(dom+' .page.active').removeClass('active').prev().addClass('active');
		Sclassification2(nowPage-1,cls_id,index);
	}else if(nowPage-1==1){
		$(dom+' .page.active').removeClass('active').prev().addClass('active');
		$(dom+' .prevPage').attr('disabled','disabled');
		Sclassification2(nowPage-1,cls_id,index);
	}else{
		$(dom+' .prevPage').attr('disabled','disabled');
	}
	$(dom+' .nextPage').removeAttr('disabled');//  打开下一页按钮    不请求接口
	
}

/*
	dom：当前要生成数据的父级元素
	obj：当前点击的页数
	cls_id：产品商城中当前选择的场景cls_id
	index：产品商城中当前选择的场景位置
*/
//点击“下一页”
function reverseNextPage(dom,obj,cls_id,index){
	nowPage = $(dom+' .page.active').text();//当前页码
	var nowPagenum=lfjPageNum;  //获取当前生成的总页码数
	var numPage=lfjPageNum-5;
	var pagingNum=1+(nowPage-3+1);
	var pagingNum1=2+(nowPage-3+1);
	var pagingNum2=3+(nowPage-3+1);
	var pagingNum3=4+(nowPage-3+1);
	var pagingNum4=5+(nowPage-3+1);
		if(Number(nowPage)+1 < nowPagenum){	//当前页码小于倒数第二页    

			if(numPage>0){
				if(Number(nowPage)+1>=3&&Number(nowPage)+1!=lfjPageNum&&Number(nowPage)+1!=lfjPageNum-1){
					$(dom+' .paging').find('a').eq(0).html(pagingNum)
					$(dom+' .paging').find('a').eq(1).html(pagingNum1)
					$(dom+' .paging').find('a').eq(2).html(pagingNum2)
					$(dom+' .paging').find('a').eq(3).html(pagingNum3)
					$(dom+' .paging').find('a').eq(4).html(pagingNum4)
					$(dom+' .paging').find('a').eq(2).addClass('active').siblings('a').removeClass('active')
					$(dom+' .prevPage').removeAttr('disabled');
					$(dom+' .nextPage').removeAttr('disabled');
				}else if(Number(nowPage)+1>=3&&(Number(nowPage)+1==lfjPageNum||Number(nowPage)+1==lfjPageNum-1)){
					$(dom+' .page.active').removeClass('active').next().addClass('active');
				}else{
					$(dom+' .page.active').removeClass('active').next().addClass('active');
				}
			}else{
				$(dom+' .page.active').removeClass('active').next().addClass('active');
			}

			$(dom+' .prevPage').removeAttr('disabled');
			Sclassification2(Number(nowPage)+1,cls_id,index);
			
		}else if(Number(nowPage)+1 == nowPagenum){
			$(dom+' .page.active').removeClass('active').next().addClass('active');
			$(dom+' .nextPage').attr('disabled','disabled');
			Sclassification2(Number(nowPage)+1,cls_id,index);
		}else{
			$(dom+' .nextPage').attr('disabled','disabled');
		}
		$(dom+' .prevPage').removeAttr('disabled');
		
	}

// 生成相应的场景下的产品   obj:当前调用的元素
function Sclassification(obj){
	var index = $('.Sclassification').index($(obj));
	$('.Sclassification').removeClass('li');
	$('.Sclassification').eq(index).addClass('li');
	var cls_id=$(obj).attr('cls_id');
	$.ajax({
         type: "post",
         async: true,
         url: getPostUrl()+"/Product/lists",
         data:{
			"cls_id": cls_id,
			"page": 1,
			"limit": 8
         },
         dataType: "json",
         success: function(json){
         	var str1='';
         	if(json.status==1){
         		if(json.info!=''&&json.info!=null){
         			for(var i=0;i<json.info.length;){
         				str1+='<div class="Customized_bck">'+
							'<div class="Customized_pictxt" style="display:'+(json.info[i]?'':'none')+';">'+
								'<img sid="'+(json.info[i]&&json.info[i].id?json.info[i].id:'')+'" src="'+(json.info[i]&&json.info[i].image_url&&json.info[i].image_url!=null?json.info[i].image_url:"./images/ditu.png")+'" alt="" class="productDetails">'+
								'<div class="Customized_pictxt_txt">'+
									'<p sid="'+(json.info[i]&&json.info[i].id?json.info[i].id:'')+'" class="productDetails">'+(json.info[i]&&json.info[i].name?json.info[i].name:'')+'</p>'+
									'<span><em>保险期限：'+(json.info[i]&&json.info[i].ins_limit?json.info[i].ins_limit:'')+'</em>'
									if(json.info[i].insrnt_age_start!=''&&json.info[i].insrnt_age_start!=null&&json.info[i].insrnt_age_end!=''&&json.info[i].insrnt_age_end!=null){
					         			if(json.info[i].insrnt_age_end==400&&json.info[i].insrnt_age_start>0){
					         				if(json.info[i]&&json.info[i].insrnt_age_start_type==1){
					         					if(json.info[i].insrnt_age_end_type==1){
					         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'周岁以上</em>'
					         					}else if(json.info[i].insrnt_age_end_type==3){
					         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'周岁以上</em>'
					         					}
					         				}else if(json.info[i]&&json.info[i].insrnt_age_start_type==3){
					         					if(json.info[i].insrnt_age_end_type==1){
					         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'天以上</em>'
					         					}else if(json.info[i].insrnt_age_end_type==3){
					         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'天以上</em>'
					         					}
					         				}
					         				
					         			}else if(json.info[i].insrnt_age_end==400&&json.info[i].insrnt_age_start==0){
					         				str1+='<em>保障年龄：不限</em>'
					         			}else if(json.info[i].insrnt_age_end<0){
					         				
					         				if(json.info[i]&&json.info[i].insrnt_age_start_type==1){
					         					if(json.info[i].insrnt_age_end_type==1){
					         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'周岁以下</em>'
					         					}else if(json.info[i].insrnt_age_end_type==3){
					         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'周岁以下</em>'
					         					}
					         				}else if(json.info[i]&&json.info[i].insrnt_age_start_type==3){
					         					if(json.info[i].insrnt_age_end_type==1){
					         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'天以下</em>'
					         					}else if(json.info[i].insrnt_age_end_type==3){
					         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'天以下</em>'
					         					}
					         				}
					         			}else{
					         				if(json.info[i].insrnt_age_start==json.info[i].insrnt_age_end){
					         					if(json.info[i]&&json.info[i].insrnt_age_start_type==1){
						         					if(json.info[i].insrnt_age_end_type==1){
						         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'周岁</em>'
						         					}else if(json.info[i].insrnt_age_end_type==3){
						         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'周岁</em>'
						         					}
						         				}else if(json.info[i]&&json.info[i].insrnt_age_start_type==3){
						         					if(json.info[i].insrnt_age_end_type==1){
						         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'天</em>'
						         					}else if(json.info[i].insrnt_age_end_type==3){
						         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'天</em>'
						         					}
						         				}
					         					
					         				}else{
					         					
					         					if(json.info[i]&&json.info[i].insrnt_age_start_type==1){
						         					if(json.info[i].insrnt_age_end_type==1){
						         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'-'+json.info[i].insrnt_age_end+'周岁</em>'
						         					}else if(json.info[i].insrnt_age_end_type==3){
						         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'周岁-'+json.info[i].insrnt_age_end+'天</em>'
						         					}
						         				}else if(json.info[i]&&json.info[i].insrnt_age_start_type==3){
						         					if(json.info[i].insrnt_age_end_type==1){
						         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'天-'+json.info[i].insrnt_age_end+'周岁</em>'
						         					}else if(json.info[i].insrnt_age_end_type==3){
						         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'-'+json.info[i].insrnt_age_end+'天</em>'
						         					}
						         				}
					         				}
					         			}
					         			
					         		}else{
					         			str1+='<em>保障年龄：待定</em>'
					         		}
									str1+='<em>承保区域：'+(json.info[i]&&json.info[i].insured_area?json.info[i].insured_area:'')+'</em></span>'+
									'<b><i style="color:#000;font-size:1.11rem;">价格：</i>￥'+(json.info[i]&&json.info[i].price?json.info[i].price:'')+'</b>'+
									'<div class="description_Details_titlink" style="position: absolute;bottom: 0;width:50%;"><button class="want_To_Promote" sid="'+(json.info[i]&&json.info[i].id?json.info[i].id:'')+'">我要推广</button></div>'+
								'</div>'+
							'</div>'+
							'<div class="Customized_pictxt" style="'+(json.info[i+1]?'':'height:0;')+';">'
							if(json.info[i+1]!=''&&json.info[i+1]!=null){
								str1+='<img sid="'+(json.info[i+1]&&json.info[i+1].id?json.info[i+1].id:'')+'" src="'+(json.info[i+1]&&json.info[i+1].image_url&&json.info[i+1].image_url!=null?json.info[i+1].image_url:"./images/ditu.png")+'" alt="" class="productDetails">'+
								'<div class="Customized_pictxt_txt">'+
									'<p sid="'+(json.info[i+1]&&json.info[i+1].id?json.info[i+1].id:'')+'" class="productDetails">'+(json.info[i+1]&&json.info[i+1].name?json.info[i+1].name:'')+'</p>'+
									'<span><em>保险期限：'+(json.info[i+1]&&json.info[i+1].ins_limit?json.info[i+1].ins_limit:'')+'</em>'
									if(json.info[i+1].insrnt_age_start!=''&&json.info[i+1].insrnt_age_start!=null&&json.info[i+1].insrnt_age_end!=''&&json.info[i+1].insrnt_age_end!=null){
					         			if(json.info[i+1].insrnt_age_end==400&&json.info[i+1].insrnt_age_start>0){
					         				if(json.info[i+1]&&json.info[i+1].insrnt_age_start_type==1){
					         					if(json.info[i+1].insrnt_age_end_type==1){
					         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁以上</em>'
					         					}else if(json.info[i+1].insrnt_age_end_type==3){
					         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁以上</em>'
					         					}
					         				}else if(json.info[i+1]&&json.info[i+1].insrnt_age_start_type==3){
					         					if(json.info[i+1].insrnt_age_end_type==1){
					         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'天以上</em>'
					         					}else if(json.info[i+1].insrnt_age_end_type==3){
					         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'天以上</em>'
					         					}
					         				}
					         				
					         			}else if(json.info[i+1].insrnt_age_end==400&&json.info[i+1].insrnt_age_start==0){
					         				str1+='<em>保障年龄：不限</em>'
					         			}else if(json.info[i+1].insrnt_age_end<0){
					         				
					         				if(json.info[i+1]&&json.info[i+1].insrnt_age_start_type==1){
					         					if(json.info[i+1].insrnt_age_end_type==1){
					         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁以下</em>'
					         					}else if(json.info[i+1].insrnt_age_end_type==3){
					         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁以下</em>'
					         					}
					         				}else if(json.info[i+1]&&json.info[i+1].insrnt_age_start_type==3){
					         					if(json.info[i+1].insrnt_age_end_type==1){
					         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'天以下</em>'
					         					}else if(json.info[i+1].insrnt_age_end_type==3){
					         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'天以下</em>'
					         					}
					         				}
					         			}else{
					         				if(json.info[i+1].insrnt_age_start==json.info[i+1].insrnt_age_end){
					         					if(json.info[i+1]&&json.info[i+1].insrnt_age_start_type==1){
						         					if(json.info[i+1].insrnt_age_end_type==1){
						         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁</em>'
						         					}else if(json.info[i+1].insrnt_age_end_type==3){
						         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁</em>'
						         					}
						         				}else if(json.info[i+1]&&json.info[i+1].insrnt_age_start_type==3){
						         					if(json.info[i+1].insrnt_age_end_type==1){
						         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'天</em>'
						         					}else if(json.info[i+1].insrnt_age_end_type==3){
						         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'天</em>'
						         					}
						         				}
					         					
					         				}else{
					         					
					         					if(json.info[i+1]&&json.info[i+1].insrnt_age_start_type==1){
						         					if(json.info[i+1].insrnt_age_end_type==1){
						         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'-'+json.info[i+1].insrnt_age_end+'周岁</em>'
						         					}else if(json.info[i+1].insrnt_age_end_type==3){
						         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁-'+json.info[i+1].insrnt_age_end+'天</em>'
						         					}
						         				}else if(json.info[i+1]&&json.info[i+1].insrnt_age_start_type==3){
						         					if(json.info[i+1].insrnt_age_end_type==1){
						         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'天-'+json.info[i+1].insrnt_age_end+'周岁</em>'
						         					}else if(json.info[i+1].insrnt_age_end_type==3){
						         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'-'+json.info[i+1].insrnt_age_end+'天</em>'
						         					}
						         				}
					         				}
					         			}
					         			
					         		}else{
					         			str1+='<em>保障年龄：待定</em>'
					         		}
									str1+='<em>承保区域：'+(json.info[i+1]&&json.info[i+1].insured_area?json.info[i+1].insured_area:'')+'</em></span>'+
									'<b><i style="color:#000;font-size:1.11rem;">价格：</i>￥'+(json.info[i+1]&&json.info[i+1].price?json.info[i+1].price:'')+'</b>'+
									'<div class="description_Details_titlink" style="position: absolute;bottom: 0;width:50%;"><button class="want_To_Promote" sid="'+(json.info[i+1]&&json.info[i+1].id?json.info[i+1].id:'')+'">我要推广</button></div>'+
								'</div>'
							}
								
							str1+='</div>'+	
						'</div>'
						i=i+2;
         			}
         			var num =Math.ceil(json.url/8);
         			$('#productMall_cted .Customized .Customized_bck').remove();
         			$('#productMall_cted .Customized .clear').remove();
         			$('#productMall_cted .Customized .paging').before(str1+'<div class="clear"></div>');
         			$('#productMall_cted .Customized .paging').show();
         			var platform_content_record3='#productMall_cted .Customized';
         			$(platform_content_record3+' .paging').find('a').remove('.page');
					$(platform_content_record3+' .paging').find('a').remove('.active');
					$(platform_content_record3+' .paging').find('a').remove('a');
					if(num!=0&&num!=''&&num!=null){
	    				pageEvent(platform_content_record3,num,cls_id,index);
	    			}else{

	    			}
      
         		}else{
         			$('#productMall_cted .Customized .Customized_bck').remove();
         			$('#productMall_cted .Customized .clear').remove();
         			str1+='<div class="Customized_bck" style="height:10rem;width:100%;line-height: 14rem;font-size: 30px;">产品正在设计中，敬请期待</div>';
         			$('#productMall_cted .Customized .paging').before(str1);
         			$('#productMall_cted .Customized .paging').hide();
         		}
         	}else{
         		if(json.info=="用户未登录!"){
         			$('.SignIn_register').eq(0).click();
	         		$.cookie('email', null);
	        		$('.SignIn').hide();
		 			$('.SignIn1').show();
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
	生成相应的场景下的产品
	page：相应的页数
	cls_id：产品商城中当前选择的场景cls_id
	index：产品商城中当前选择的场景位置
*/
function Sclassification2(page,cls_id,index){
	$('.Sclassification').removeClass('li');
	$('.Sclassification').eq(index).addClass('li');
	$.ajax({
         type: "post",
         async: true,
         url: getPostUrl()+"/Product/lists",
         data:{
			"cls_id": cls_id,
			"page": page,
			"limit": 8
         },
         dataType: "json",
         success: function(json){
         	var str1='';
         	if(json.status==1){
         		if(json.info!=''&&json.info!=null){
         			for(var i=0;i<json.info.length;){
         				str1+='<div class="Customized_bck">'+
							'<div class="Customized_pictxt" style="display:'+(json.info[i]?'':'none')+';">'+
								'<img sid="'+(json.info[i]&&json.info[i].id?json.info[i].id:'')+'" src="'+(json.info[i]&&json.info[i].image_url&&json.info[i].image_url!=null?json.info[i].image_url:"./images/ditu.png")+'" alt="" class="productDetails">'+
								'<div class="Customized_pictxt_txt">'+
									'<p sid="'+(json.info[i]&&json.info[i].id?json.info[i].id:'')+'" class="productDetails">'+(json.info[i]&&json.info[i].name?json.info[i].name:'')+'</p>'+
									'<span><em>保险期限：'+(json.info[i]&&json.info[i].ins_limit?json.info[i].ins_limit:'')+'</em>'
									if(json.info[i].insrnt_age_start!=''&&json.info[i].insrnt_age_start!=null&&json.info[i].insrnt_age_end!=''&&json.info[i].insrnt_age_end!=null){
					         			if(json.info[i].insrnt_age_end==400&&json.info[i].insrnt_age_start>0){
					         				if(json.info[i]&&json.info[i].insrnt_age_start_type==1){
					         					if(json.info[i].insrnt_age_end_type==1){
					         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'周岁以上</em>'
					         					}else if(json.info[i].insrnt_age_end_type==3){
					         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'周岁以上</em>'
					         					}
					         				}else if(json.info[i]&&json.info[i].insrnt_age_start_type==3){
					         					if(json.info[i].insrnt_age_end_type==1){
					         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'天以上</em>'
					         					}else if(json.info[i].insrnt_age_end_type==3){
					         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'天以上</em>'
					         					}
					         				}
					         				
					         			}else if(json.info[i].insrnt_age_end==400&&json.info[i].insrnt_age_start==0){
					         				str1+='<em>保障年龄：不限</em>'
					         			}else if(json.info[i].insrnt_age_end<0){
					         				
					         				if(json.info[i]&&json.info[i].insrnt_age_start_type==1){
					         					if(json.info[i].insrnt_age_end_type==1){
					         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'周岁以下</em>'
					         					}else if(json.info[i].insrnt_age_end_type==3){
					         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'周岁以下</em>'
					         					}
					         				}else if(json.info[i]&&json.info[i].insrnt_age_start_type==3){
					         					if(json.info[i].insrnt_age_end_type==1){
					         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'天以下</em>'
					         					}else if(json.info[i].insrnt_age_end_type==3){
					         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'天以下</em>'
					         					}
					         				}
					         			}else{
					         				if(json.info[i].insrnt_age_start==json.info[i].insrnt_age_end){
					         					if(json.info[i]&&json.info[i].insrnt_age_start_type==1){
						         					if(json.info[i].insrnt_age_end_type==1){
						         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'周岁</em>'
						         					}else if(json.info[i].insrnt_age_end_type==3){
						         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'周岁</em>'
						         					}
						         				}else if(json.info[i]&&json.info[i].insrnt_age_start_type==3){
						         					if(json.info[i].insrnt_age_end_type==1){
						         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'天</em>'
						         					}else if(json.info[i].insrnt_age_end_type==3){
						         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'天</em>'
						         					}
						         				}
					         					
					         				}else{
					         					
					         					if(json.info[i]&&json.info[i].insrnt_age_start_type==1){
						         					if(json.info[i].insrnt_age_end_type==1){
						         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'-'+json.info[i].insrnt_age_end+'周岁</em>'
						         					}else if(json.info[i].insrnt_age_end_type==3){
						         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'周岁-'+json.info[i].insrnt_age_end+'天</em>'
						         					}
						         				}else if(json.info[i]&&json.info[i].insrnt_age_start_type==3){
						         					if(json.info[i].insrnt_age_end_type==1){
						         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'天-'+json.info[i].insrnt_age_end+'周岁</em>'
						         					}else if(json.info[i].insrnt_age_end_type==3){
						         						str1+='<em>保障年龄：'+json.info[i].insrnt_age_start+'-'+json.info[i].insrnt_age_end+'天</em>'
						         					}
						         				}
					         				}
					         			}
					         			
					         		}else{
					         			str1+='<em>保障年龄：待定</em>'
					         		}
									str1+='<em>承保区域：'+(json.info[i]&&json.info[i].insured_area?json.info[i].insured_area:'')+'</em></span>'+
									
									'<b><i style="color:#000;font-size:1.11rem;">价格：</i>￥'+(json.info[i]&&json.info[i].price?json.info[i].price:'')+'</b>'+
									'<div class="description_Details_titlink" style="position: absolute;bottom: 0;width:50%;"><button class="want_To_Promote" sid="'+(json.info[i]&&json.info[i].id?json.info[i].id:'')+'">我要推广</button></div>'+
								'</div>'+
							'</div>'+
							'<div class="Customized_pictxt" style="'+(json.info[i+1]?'':'height:0;')+';">'
							if(json.info[i+1]!=''&&json.info[i+1]!=null){
								str1+='<img sid="'+(json.info[i+1]&&json.info[i+1].id?json.info[i+1].id:'')+'" src="'+(json.info[i+1]&&json.info[i+1].image_url&&json.info[i+1].image_url!=null?json.info[i+1].image_url:"./images/ditu.png")+'" alt="" class="productDetails">'+
								'<div class="Customized_pictxt_txt">'+
									'<p sid="'+(json.info[i+1]&&json.info[i+1].id?json.info[i+1].id:'')+'" class="productDetails">'+(json.info[i+1]&&json.info[i+1].name?json.info[i+1].name:'')+'</p>'+
									'<span><em>保险期限：'+(json.info[i+1]&&json.info[i+1].ins_limit?json.info[i+1].ins_limit:'')+'</em>'
									if(json.info[i+1].insrnt_age_start!=''&&json.info[i+1].insrnt_age_start!=null&&json.info[i+1].insrnt_age_end!=''&&json.info[i+1].insrnt_age_end!=null){
					         			if(json.info[i+1].insrnt_age_end==400&&json.info[i+1].insrnt_age_start>0){
					         				if(json.info[i+1]&&json.info[i+1].insrnt_age_start_type==1){
					         					if(json.info[i+1].insrnt_age_end_type==1){
					         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁以上</em>'
					         					}else if(json.info[i+1].insrnt_age_end_type==3){
					         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁以上</em>'
					         					}
					         				}else if(json.info[i+1]&&json.info[i+1].insrnt_age_start_type==3){
					         					if(json.info[i+1].insrnt_age_end_type==1){
					         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'天以上</em>'
					         					}else if(json.info[i+1].insrnt_age_end_type==3){
					         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'天以上</em>'
					         					}
					         				}
					         				
					         			}else if(json.info[i+1].insrnt_age_end==400&&json.info[i+1].insrnt_age_start==0){
					         				str1+='<em>保障年龄：不限</em>'
					         			}else if(json.info[i+1].insrnt_age_end<0){
					         				
					         				if(json.info[i+1]&&json.info[i+1].insrnt_age_start_type==1){
					         					if(json.info[i+1].insrnt_age_end_type==1){
					         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁以下</em>'
					         					}else if(json.info[i+1].insrnt_age_end_type==3){
					         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁以下</em>'
					         					}
					         				}else if(json.info[i+1]&&json.info[i+1].insrnt_age_start_type==3){
					         					if(json.info[i+1].insrnt_age_end_type==1){
					         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'天以下</em>'
					         					}else if(json.info[i+1].insrnt_age_end_type==3){
					         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'天以下</em>'
					         					}
					         				}
					         			}else{
					         				if(json.info[i+1].insrnt_age_start==json.info[i+1].insrnt_age_end){
					         					if(json.info[i+1]&&json.info[i+1].insrnt_age_start_type==1){
						         					if(json.info[i+1].insrnt_age_end_type==1){
						         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁</em>'
						         					}else if(json.info[i+1].insrnt_age_end_type==3){
						         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁</em>'
						         					}
						         				}else if(json.info[i+1]&&json.info[i+1].insrnt_age_start_type==3){
						         					if(json.info[i+1].insrnt_age_end_type==1){
						         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'天</em>'
						         					}else if(json.info[i+1].insrnt_age_end_type==3){
						         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'天</em>'
						         					}
						         				}
					         					
					         				}else{
					         					
					         					if(json.info[i+1]&&json.info[i+1].insrnt_age_start_type==1){
						         					if(json.info[i+1].insrnt_age_end_type==1){
						         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'-'+json.info[i+1].insrnt_age_end+'周岁</em>'
						         					}else if(json.info[i+1].insrnt_age_end_type==3){
						         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁-'+json.info[i+1].insrnt_age_end+'天</em>'
						         					}
						         				}else if(json.info[i+1]&&json.info[i+1].insrnt_age_start_type==3){
						         					if(json.info[i+1].insrnt_age_end_type==1){
						         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'天-'+json.info[i+1].insrnt_age_end+'周岁</em>'
						         					}else if(json.info[i+1].insrnt_age_end_type==3){
						         						str1+='<em>保障年龄：'+json.info[i+1].insrnt_age_start+'-'+json.info[i+1].insrnt_age_end+'天</em>'
						         					}
						         				}
					         				}
					         			}
					         			
					         		}else{
					         			str1+='<em>保障年龄：待定</em>'
					         		}
									str1+='<em>承保区域：'+(json.info[i+1]&&json.info[i+1].insured_area?json.info[i+1].insured_area:'')+'</em></span>'+
									
									'<b><i style="color:#000;font-size:1.11rem;">价格：</i>￥'+(json.info[i+1]&&json.info[i+1].price?json.info[i+1].price:'')+'</b>'+
									'<div class="description_Details_titlink" style="position: absolute;bottom: 0;width:50%;"><button class="want_To_Promote" sid="'+(json.info[i+1]&&json.info[i+1].id?json.info[i+1].id:'')+'">我要推广</button></div>'+
								'</div>'
							}
								
							str1+='</div>'+
						'</div>'
						i=i+2;
         			}
         			var num =Math.ceil(json.url/8);
         			$('#productMall_cted .Customized .Customized_bck').remove();
         			$('#productMall_cted .Customized .clear').remove();
         			$('#productMall_cted .Customized .paging').before(str1+'<div class="clear"></div>');
         			$('#productMall_cted .Customized .paging').show();
         		}else{
         			$('#productMall_cted .Customized .Customized_bck').remove();
         			$('#productMall_cted .Customized .clear').remove();
         			str1+='<div class="Customized_bck" style="height:10rem;width:100%;line-height: 14rem;font-size: 30px;">产品正在设计中，敬请期待</div>';
         			$('#productMall_cted .Customized .paging').before(str1+'<div class="clear"></div>');
         			$('#productMall_cted .Customized .paging').hide();
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
/*
	行业定制页面  去定制按钮
*/
function customization1(){
	var str='';
	$('#bomb_box').remove();
	$.ajax({				
		type: "post",
        async: true,
        url: getPostUrl()+'/Company/cert_info',
        dataType: "json",
        success: function(json){
        	if(json.status==1){
        		if(json.info.cert_status==1||json.info.cert_status==6){
        			var title='完成企业认证即可定制专属产品',
        				name1='取消',
        				Method1='cancel()',
        				name2='立即认证',
        				type='1',
        				Method2='Immediate_authentication('+json.info.cert_status+')';
        			confirm(title,name1,Method1,name2,Method2,type)
        		}else if(json.info.cert_status==2){
        			var title='完成企业认证即可定制专属产品',
        				name1='取消',
        				Method1='cancel()',
        				name2='立即认证',
        				type='1',
        				Method2='Immediate_authentication('+json.info.cert_status+')';
        			confirm(title,name1,Method1,name2,Method2,type)
        		}else if(json.info.cert_status==3){
        			var title='完成企业认证即可定制专属产品',
        				name1='取消',
        				Method1='cancel()',
        				name2='立即认证',
        				type='1',
        				Method2='Immediate_authentication('+json.info.cert_status+')';
        			confirm(title,name1,Method1,name2,Method2,type)
        		}else if(json.info.cert_status==4){
        			var scene_id = GetQueryString('id');
        			$.ajax({				
						type: "post",
				        async: true,
				        url: getPostUrl()+'/Company/apply_do',
				        data:{
				        	"scene_id":scene_id
				        },
				        dataType: "json",
				        success: function(json){
				        	if(json.status){
				        		var title='您的定制申请已提交，我们将尽快与您联系，您也可以拨打合作电话：400-068-8511，我们将竭诚为您服务!',
			        				name1='确定',
			        				Method1='cancel()';
			        			alert(title,name1,Method1)
				        	}else{
				        		if(json.info=="用户未登录!"){
				         			$('.SignIn_register').eq(0).click();
					         		$.cookie('email', null);
					        		$('.SignIn').hide();
						 			$('.SignIn1').show();
				         		}else{
				         			var title=json.info,
			        				name1='确定',
			        				Method1='cancel()';
			        				alert(title,name1,Method1)
				         		}
				        	}
				        }
				    })
        		}else if(json.info.cert_status==5){
        			
        			var title='企业认证失败，请重新认证',
        				name1='取消',
        				Method1='cancel()',
        				name2='重新认证',
        				type='1',
        				Method2='Immediate_authentication('+json.info.cert_status+')';
        			confirm(title,name1,Method1,name2,Method2,type)
        		}
        	}else{
        		
        		if(json.info=="用户未登录!"){
         			$('.SignIn_register').eq(0).click();
	         		$.cookie('email', null);
	        		$('.SignIn').hide();
		 			$('.SignIn1').show();
         		}else{
         			var title=json.info,
        				name1='确定',
        				Method1='cancel()';
        			alert(title,name1,Method1)
         		}
        	}
        }
    })
	// 
}




/*
	点击去定制按钮  未认证时状态
	type：不同层级的去定制按钮
*/
function Immediate_authentication(type){
	if(type==1||type==6){
		var url = '/Merchant_platform.html'
		url_location(url)
	}else if(type==2){
		var url = '/html/register.html'
		var shuju = {
			name:['stat'],
			title:['2']
		}
		url_location(url,shuju)
	}else if(type==3){
		var url = '/html/register.html?stat=3'
		var shuju = {
			name:['stat'],
			title:['3']
		}
		url_location(url,shuju)
	}else if(type==5){
		var url = '/html/register.html?stat=5'
		var shuju = {
			name:['stat'],
			title:['5']
		}
		url_location(url,shuju)
	}
}


function Apply_for_cooperation(){			//申请合作
	$.ajax({				
		type: "post",
        async: true,
        url: getPostUrl()+'/Company/cert_info',
        dataType: "json",
        success: function(json){
        	if(json.status==0){
        		$('.SignIn_register').removeClass('SignIn_a');
				$('#mork').find('.mork_conter').hide();
				$('.SignIn_register').eq(0).addClass('SignIn_a');
				$('#mork').show();
				$('#mork').find('.mork_conter').eq(0).show();
				if(json.info=="用户未登录!"){
         			$('.SignIn_register').eq(0).click();
	         		re_Logged_In()
         		}else{
         			var title=json.info,
        				name1='确定',
        				Method1='cancel()';
        			alert(title,name1,Method1)
         		}
        	}else{
        		var url = '/productMall.html'
				url_location(url)
        		$.cookie('num','2');
        	}
        }
    })
}

// 进入行业定制页面
function Et_industry_customization(){
	var url = '/zation_Customized.html?id=0'
	url_location(url)
	$.cookie('num','3');

}







/*
	点击进入文档中心相应的文档
*/
function Generaldocument(obj){
	var sid=$(obj).attr("sid");
	if(sid==2||sid==3){
		window.open('./general_Document.html?document='+sid)
	}else if(sid==6||sid==7){
		window.open('../general_Document.html?document='+sid)
	}else if(sid==1||sid==4){
		window.open('./general_Document.html?document='+sid)
	}else if(sid==5||sid==8){
		window.open('../general_Document.html?document='+sid)
	}
	
}
var popupWindow1,num=2;


/*
	页面弹框
*/
function popupWindow(){
	$('#popupWindow').show();
	popupWindow1=setInterval(function(){
		num--;
		if(num<=0){
			$('#popupWindow').hide();
			clearInterval(popupWindow1)
		}
	},1000);
}



//恒邦购险协议
function insuranceAgreement(){
	// body... 
	$('.insuranceAgreement').show()
}



function Modify_password(){
	clearInterval(times)
	$('.mork_conter').hide();
	$('.mork_conter').eq(0).show();
	$('.Modify_password .mork_conter_center input').val('')
	$('.Modify_password .mork_conter_center').eq(0).find('label').eq(1).find('button').html('发送验证码')
	$('.Modify_password .Get_authentication_code').removeAttr('disabled')
}


function DeploymenMmenu(obj){	//点击相应的一级菜单同时展开相应的二级菜单
	var index=$('.menus').index($(obj).parent('.menus'));
	// console.log($('.menus').eq(index).find('.group').class("width"))

	if($('.menus').eq(index).find('.group').attr("stop")==0){
		$('.menus').eq(index).find('.group').show();
		$('.menus').eq(index).find('b').find('img').addClass('actives')
		$('.menus').eq(index).find('.group').attr("stop","1")
	}else{
		$('.menus').eq(index).find('.group').hide()
		$('.menus').eq(index).find('b').find('img').removeClass('actives')
		$('.menus').eq(index).find('.group').attr("stop","0")
	}
	
}



function SwitchContent(obj){		//切换时重新渲染echarts折线图
	var index=$('.menu_conter').index(obj);
	$('.menu_conter').removeClass('active')
	$('.menu_conter').eq(index).addClass('active')
	$('.platform_content_record').hide();
	$('.History_bill').hide();
	$('.bill_details').hide();
	$('.platform_content_record').eq(index).show();
}

function enterScene(obj){			//点击首页行业场景示例进入相应的行业场景定制页面
	var scene_id=$(obj).parent().parent('.IndustryCustomization_mod').attr('sid');
	var url=$(obj).attr('link');
	window.location.href=url;
	$.cookie('num','3');
}


function want_To_Promote(obj){
  var id = $(obj).attr('sid');
  $.ajax({
     type: "post",
     async: true,
     url: getPostUrl()+'/CompanyApply/prom_adds_do',
     data: {
      "product_id": id
      
   },
     dataType: "json",
     success: function(json){
        if(json.status){
          var title='产品推广申请已提交，请到商户平台产品推广列表获取推广链接。',
	            name1='确定',
	            Method1='cancel()';
	          alert(title,name1,Method1)
        }else{
            if(json.info=="用户未登录!"){
                $('.SignIn_register').eq(0).click();
                $.cookie('email', null);
                $('.SignIn').hide();
                $('.SignIn1').show();
             }else if(json.info=="商户未认证!"){
               var title='完成企业认证才可进行产品推广',
                    name1='取消',
                    Method1='cancel()',
                    name2='立即认证',
                    Method2='Immediate_authentication(1)',
                    type='1';
                  confirm(title,name1,Method1,name2,Method2,type)
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


$(document).on('click','#Merchant_platform_conter .Merchant_platform_right .Catalog a',function(){
	$.ajax({				
			type: "post",
	        async: true,
	        url: getPostUrl()+'/Company/cert_info',
	        dataType: "json",
	        success: function(json){
	        	if(json.status==1){
	        		if(json.info.cert_status==1||json.info.cert_status==6){
	        			var url = '/Merchant_platform.html'
						url_location(url)
	        		}else if(json.info.cert_status==2){
	        			var url = '/html/register.html'
	        			var shuju = {
	        				name:['stat'],
	        				title:['2']
	        			}
						url_location(url,shuju)
	        		}else if(json.info.cert_status==3){
	        			var url = '/html/register.html'
	        			var shuju = {
	        				name:['stat'],
	        				title:['3']
	        			}
						url_location(url,shuju)
	        		}else if(json.info.cert_status==4){
	        			var url = '/Merchant_platform.html'
	        			var shuju = {
	        				name:['stas'],
	        				title:['1']
	        			}
						url_location(url,shuju)
	        		}else if(json.info.cert_status==5){
	        			window.location.href='./html/register.html?stat=5'
	        			var url = '/Merchant_platform.html'
	        			var shuju = {
	        				name:['stas'],
	        				title:['1']
	        			}
						url_location(url,shuju)
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
})


$(document).on('click','.NavigationBar1 .logo img',function(){
	var url = '/index.html'
	url_location(url)
	$.cookie('num','1')
})

$(document).on('click','.NavigationBar1 .menu .menu_li',function(){
	switch1(this)
})

$(document).on('click','.NavigationBar1 .SignIn1 .SignIn_register',function(){
	signIn(this)
})

$(document).on('click','.NavigationBar1 .SignIn2 .messageNum1',function(){
	signIn(this)
})

$(document).on('click','.NavigationBar1 .SignIn2 .messageNum2',function(){
	signIn_out(this)
})

$(document).on('click','.Customization_process_index .Go_customize',function(){
	Apply_for_cooperation()
})

$(document).on('click','#footer1 .footer .footer_menu .footer_menu_ul1 .menu_li',function(){
	switch1(this)
})

$(document).on('click','#footer1 .footer .footer_menu .footer_menu_ul2 li',function(){
	Generaldocument(this)
})

$(document).on('click','#mork .mork_conter .closeWindow',function(){
	closeWindow()
})

$(document).on('click','#mork .mork_conter .closeWindow2',function(){
	Modify_password()
	closeWindow()
})

$(document).on('click','#mork .mork_conter .closeWindow1',function(){
	closeWindow('1')
})

$(document).on('click','.modifypassword',function(){
	modifypassword()
})

$(document).on('click','.Modify_password .fanhui',function(){
	Modify_password()
})

$(document).on('click','.mork_conter_center_btn_Sign_in',function(){
	Sign_in(this)
})

$(document).on('click','.signIn',function(){
	signIn(this)
})

$(document).on('click','.register',function(){
	register(this,'1')
})

$(document).on('click','.insuranceAgreement_b',function(){
	insuranceAgreement()
})

$(document).on('click','.Nexs_a1',function(){
	forgot_password(this,1)
})

$(document).on('click','.Nexs_a2',function(){
	forgot_password(this,2)
})

$(document).on('click','.insuranceAgreement_x',function(){
	$('.insuranceAgreement').hide()
})

$(document).on('click','.Industry_czt td',function(){
	SwitchModule(this,1)
})

$(document).on('click','.Et_industry_customization',function(){
	Et_industry_customization()
})

$(document).on('click','.enterScene',function(){
	enterScene(this)
})

$(document).on('mouseover','.Industry_czt_li_over',function(){
	Industry_czt_li_over(this)
})

$(document).on('mouseout','.Industry_czt_li_over',function(){
	Industry_czt_li_out(this)
})


$(document).on('mouseover','.IndustryCustomization_mods .msover',function(){
	msover(this)
})

$(document).on('mouseout','.IndustryCustomization_mods .msover',function(){
	msout(this)
})

$(document).on('click','.Sclassification_li',function(){
	Sclassification(this)
})

$(document).on('click','.productDetails',function(){
	productDetails(this)
})

$(document).on('click','.want_To_Promote',function(){
	want_To_Promote(this)
})

$(document).on('click','.ProductModule .Product_conter table td',function(){
	SwitchModule(this,2)
})

$(document).on('mouseover','.ProductModule .Product_conter table td',function(){
	msover1(this)
})

$(document).on('mouseout','.ProductModule .Product_conter table td',function(){
	msout1(this)
})

$(document).on('click','.Industrycustomization_Customized .Customized_title a',function(){
	customization1()
})

$(document).on('click','.Get_authentication_code',function(){
	Get_authentication_code(this,1)
})

$(document).on('click','.Get_authentication_code1',function(){
	Get_authentication_code(this,1,1)
})


$(document).on('click','.NavigationBar2 .logo img',function(){
	var url = '/index.html'
	url_location(url)
	$.cookie('num','1')
})

$(document).on('click','.NavigationBar2 .menu .menu_li',function(){
	switch2(this)
})

$(document).on('click','.NavigationBar2 .SignIn1 .SignIn_register',function(){
	signIn(this)
})

$(document).on('click','.NavigationBar2 .SignIn2 .messageNum1',function(){
	signIn(this)
})

$(document).on('click','.NavigationBar2 .SignIn2 .messageNum2',function(){
	signIn_out(this)
})

$(document).on('click','.setting_a',function(){
	customization1()
})

$(document).on('click','.Customized .btn_p a',function(){
	tab1(this)
})

$(document).on('click','.Customization_process .Go_customize1',function(){
	customization1()
})

$(document).on('click','#footer2 .footer .footer_menu .footer_menu_ul1 .menu_li',function(){
	switch2(this)
})

$(document).on('click','#footer2 .footer .footer_menu .footer_menu_ul2 li',function(){
	Generaldocument(this)
})

$(document).on('click','.register1',function(){
	register(this,'1')
})

$(document).on('click','#productMall_cted .Customized .paging .page',function(){
	var dom = $(this).attr('dom'),
		cls_id=$(this).attr('cls_id'),
		index=$(this).attr('index'),
		that=this;
	reverseNumberPage(dom,that,cls_id,index)
})

$(document).on('click','#productMall_cted .Customized .paging .prevPage',function(){
	var dom = $(this).attr('dom'),
		cls_id=$(this).attr('cls_id'),
		index=$(this).attr('index'),
		that=this;
		reversePrevPage(dom,that,cls_id,index)
})

$(document).on('click','#productMall_cted .Customized .paging .nextPage',function(){
	var dom = $(this).attr('dom'),
		cls_id=$(this).attr('cls_id'),
		index=$(this).attr('index'),
		that=this;
		reverseNextPage(dom,that,cls_id,index)
})

$(document).on('click','#Merchant_platform_conter .logo img',function(){
	var url = '/index.html';
	url_location(url)
	$.cookie('num','1')
})

$(document).on('click','#Merchant_platform_conter .SignIn .SignIn_register',function(){
	signIn(this)
})

$(document).on('click','#Merchant_platform_conter .SignIn2 .messageNum2',function(){
	signIn_out('2')
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .platform_menu .platform_menu_group .menus em',function(){
	DeploymenMmenu(this)
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .platform_menu .platform_menu_group .menus span',function(){
	DeploymenMmenu(this)
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .platform_menu .platform_menu_group .menus b',function(){
	DeploymenMmenu(this)
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .platform_menu .platform_menu_group .menus .group .menu_conter',function(){
	SwitchContent(this)
})

$(document).on('click','.twonav .twonav_li',function(){
	jumpPosition(this)
})

$(document).on('click','#bomb_Box a',function(){
	$('#bomb_Box').hide()
})