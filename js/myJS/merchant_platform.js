

/*

获取地址栏参数

*/
// function GetQueryString(name){	
//      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
//      var r = window.location.search.substr(1).match(reg);
//      if(r!=null)return  unescape(r[2]); return null;
// }
	var names = GetQueryString('stas');
$(document).ready(function(){

/*

	当获取的参数为1时，就代表当前登录用户已经通过认证，
	当其为不为1时代表登录用户没有认证过

*/
	if(names==1){
		$('.authentication').show()
		$('.authentication_conter').hide();
		$('.platform').show();
		$('body').scrollTop(0)
/*

	账户管理->基本信息模块数据填充

*/
		$.ajax({
	        type: "post",
	        async: true,
	        url: getPostUrl()+'/Policy/stat_info',
	        data: {
				"exten": '',
				"ins_id": '',
				"product_name": '',
				"start_date": '',
				"end_date": ''
			},
	        dataType: "json",
	        success: function(json){
	         	if(json.status==1){
	         		$('.KeyIndex_zr .tgf').text(json.info.tgf)
	         		$('.KeyIndex_zr .policy_num').text(json.info.policy_num)
	         		$('.KeyIndex_zr .premium_amt').text(json.info.premium_amt)
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
		statistical_Overview_latest_Time('1')
		
	}else{
		$('.authentication').show()
		$('.authentication_conter').show();
		$('.platform').hide();
		$('body').scrollTop(0)
	}

/*

	判断用户是否登录

*/	
	var email = $.cookie('email');
	if(email!=''&&email!=null){
		closeWindow()
		$('.SignIn').hide();
		$('.SignIn2').show();
		$('.SignIn2 .email').html(email)
	}
/*

	基本资料填充

*/
	$.ajax({				
		type: "post",
        async: true,
        url: getPostUrl()+'/Company/info',
        dataType: "json",
        success: function(json){
        	if(json.status==1){
        		$('.platform_content_record1 .enterprise_name').find('input').val(json.info.name)
        		$('.platform_content_record1  .enterprise_addr').find('input').val(json.info.addr)
        		$('.platform_content_record1  .enterprise_admin_name').find('input').val(json.info.admin_name)
        		$('.platform_content_record1  .enterprise_mobile').find('input').val(json.info.admin_mobile)
        		$('.platform_content_record1  .enterprise_ident_no').find('input').val(json.info.admin_ident_no)

        		$('.Enterprise_certification .enterprise_name').find('input').val(json.info.name)
        		$('.Enterprise_certification .enterprise_credit_code').find('input').val(json.info.credit_code)
        		$('.Enterprise_certification .enterprise_legal_name').find('input').val(json.info.legal_name)
        		$('.Enterprise_certification .enterprise_legal_ident_no').find('input').val(json.info.legal_ident_no)

        		$('.Enterprise_certification .enterprise_account_name').find('input').val(json.info.bank_card_info.account_name)
        		$('.Enterprise_certification .enterprise_card_number').find('input').val(json.info.bank_card_info.card_number)
        		$('.Enterprise_certification .enterprise_bank_addr').find('input').val(json.info.bank_card_info.bank_addr)
        		$('.Enterprise_certification .enterprise_bank_name').find('input').val(json.info.bank_card_info.bank_name)
        		$('.Enterprise_certification .enterprise_card_issuers').find('input').val(json.info.bank_card_info.card_issuers)

        		$('.security_setting .security_setting_email').html(json.info.email)
        		if(json.info.mobile!=''){
        			$('.security_setting .security_setting_mobile').html(json.info.mobile)
        		}
        		$('.key_management .enterprise .enterprise_name').eq(0).find('.title b').html(json.info.name)

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


    //统计概览  产品推荐
		$.ajax({
	        type: "post",
	        async: true,
	        url: getPostUrl()+'/Product/recomd_lists',
	        data: {
				"type": 3,
				"scene_id": '',
				"limit":2
			},
	        dataType: "json",
	        success: function(json){
	        	if(json.status==1){
	        		var str='';
	        		if(json.info==null||json.info==''){
	        			$('.my_earnings .recommend').hide()
	        		}else{
	        			for(var i=0;i<json.info.length;i++){
	        				str+='<div class="product">'+
									'<img src="'+json.info[i].image_url+'" alt="">'+
									'<div class="product_conter">'+
										'<h3>'+json.info[i].name+'</h3>'+
										'<p><span></span>'+json.info[i].title+'</p>'+
										'<button class="xqtz" sid="'+json.info[i].id+'">查看详情</button>'+
									'</div>'+
								'</div>'
	        			}
	        			
	        			$('.my_earnings .recommendation').html('')
	        			$('.my_earnings .recommendation').html(str)
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

function xqtz(id){
	var url = '/html/productDetails.html'
	var shuju = {
		name:['id'],
		title:[id]
	}
	url_location(url,shuju)
	$.cookie('num','2');
}		
/*

	二级菜单切换

*/							
function SwitchContent(obj){		//切换时重新渲染echarts折线图
	var index=$('.menu_conter').index(obj);
	$('.menu_conter').removeClass('active')
	$('.menu_conter').eq(index).addClass('active')
	$('.platform_content_record').hide();
	$('.History_bill').hide();
	$('.bill_details').hide();
	$('.platform_content_record').eq(index).show();
	
	if(index==3){
		$('#Product_promotion_query').click();
	}else if(index==4){
		$('#Product_promotion_query1').click();
	}else if(index==5){
		$('#Product_promotion_query2').click();
	}else if(index==7){
		$('#Product_promotion_query3').click();
	}else if(index==6){
		var exten='',
			ins_id='',
			product_name='',
			start_date='',
			end_date='',
			date_type='';
		$.ajax({
	        type: "post",
	        async: true,
	        url: getPostUrl()+'/Policy/stat_info',
	        data: {
				"exten": exten,
				"ins_id": ins_id,
				"product_name": product_name,
				"start_date": start_date,
				"end_date": end_date
			},
	        dataType: "json",
	        success: function(json){
	         	if(json.status==1){
	         		$('.KeyIndex_zr .tgf').text(json.info.tgf)
	         		$('.KeyIndex_zr .policy_num').text(json.info.policy_num)
	         		$('.KeyIndex_zr .premium_amt').text(json.info.premium_amt)
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

		$('.my_earnings .Product_promotion_query_btn').click();

		//统计概览  产品推荐
		$.ajax({
	        type: "post",
	        async: true,
	        url: getPostUrl()+'/Product/recomd_lists',
	        data: {
				"type": 3,
				"scene_id": '',
				"limit":2
			},
	        dataType: "json",
	        success: function(json){
	        	if(json.status==1){
	        		var str='';
	        		if(json.info==null||json.info==''){
	        			$('.my_earnings .recommend').hide()
	        		}else{
	        			for(var i=0;i<json.info.length;i++){
	        				str+='<div class="product">'+
									'<img src="'+json.info[i].image_url+'" alt="">'+
									'<div class="product_conter">'+
										'<h3>'+json.info[i].name+'</h3>'+
										'<p><span></span>'+json.info[i].title+'</p>'+
										'<button class="xqtz" sid="'+json.info[i].id+'">查看详情</button>'+
									'</div>'+
								'</div>'
	        			}
	        			
	        			$('.my_earnings .recommendation').html('')
	        			$('.my_earnings .recommendation').html(str)
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
	}else if(index==7){
		$.ajax({
	        type: "post",
	        async: true,
	        url: getPostUrl()+'/Product/recomd_lists',
	        data: {
				"type": 3,
				"scene_id": '',
				"limit":2
			},
	        dataType: "json",
	        success: function(json){
	      		if(json.status){

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




function DeploymenMmenu(obj){	//点击相应的一级菜单同时展开相应的二级菜单
	var index=$('.menus').index($(obj).parent('.menus'));

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
function BombBox(obj){			//账户管理>安全设置 模块中点击修改按钮  触发修改权限
	var index=$('.lookover').index($(obj))
	// console.log(index)
	$('#Modify_mailbox').show();
	$('.Modify_mailbox_conter').hide();
	$('.modify').eq(index).show();
}
function PlatformSwitching(obj){		//商户平台和开发者中心切换
	var index = $('.Catalog_Modular').index($(obj));
	$('.platform_menu_group').hide();
	$('.Catalog_Modular').removeClass('active');
	$('.platform_menu_group').eq(index).show();
	$('.Catalog_Modular').eq(index).addClass('active');
	$('.menu_conter').removeClass('active')
	if(index==0){
		$('.platform_content_record').hide();
		$('.my_earnings').show();
		$('.StatisticalOverview').addClass('active')
		$('.StatisticalOverview').click();
	}
	if(index==1){
		$('.platform_content_record').hide();
		$('.key_management').show();
		$('.Developer_Center li').eq(0).addClass('active')

	}
}
function closeButton(){			//关闭邮箱验证
	$('#Modify_mailbox').hide();
}
function DeploymenMmenu1(obj){		//点击相应的二级产品菜单同时展开相应的三级菜单
 	var index=$('.products').index($(obj))
 	$('.products').find('img').removeClass('img')
 	if($('.detailss').eq(index).attr("switch")==0){
		$('.detailss').eq(index).show();
		$('.detailss').eq(index).attr("switch",'1')
		$('.products').eq(index).find('img').addClass('img')
		
	}else{
		$('.detailss').eq(index).hide()
		$('.detailss').eq(index).attr("switch",'0')
		$('.products').eq(index).find('img').removeClass('img')
	}
 	
}
function see(obj){ 		//财务管理>结算管理中  查看明细  按钮
	  // ul li img
	  $('.Settlement').find('.product ul li img').show();
	  $('.Settlement').find('.Product_promotion_tiem1').hide();
	  $('.Settlement').find('.Product_promotion_tiem2').show();
	  $('.Settlement').find('.operation').show();
	  $('.Settlement').find('.a').show();
}
function details(){  	//点击订单编号进入订单详情
	if($('.Settlement #platform_content_record7 ul').eq(1).find('li span').html()!=undefined&&$('.Settlement #platform_content_record7 ul').eq(1).find('li span').html()!=''&&$('.Settlement #platform_content_record7 ul').eq(1).find('li span').html()!=null){
		$('.platform_content_record').hide();
		$('.History_bill').show();
		$('.History_bill .enterprise h2 b').html($('.Settlement #platform_content_record7 ul').eq(1).find('li span').html()+'&nbsp;&nbsp;月度账单')
		if(!date_regx($('.Settlement #platform_content_record7 ul').eq(1).find('li span').html())){
			var year2=new Date().getFullYear();
			var month2=new Date().getMonth()+1;
			var month=year2+"-"+month2;
			var riqi=month;
		}else{
			var month=$('.Settlement #platform_content_record7 ul').eq(1).find('li span').html()
			var riqi=month;
		}
		$('.History_bill .enterprise h2 b').html(riqi.slice(0,7)+'&nbsp;&nbsp;月度账单')
		$.ajax({
	        type: "post",
	        async: true,
	        url: getPostUrl()+'/Bill/his_stat_lists',
	        data: {
				"month": month,
			},
	        dataType: "json",
	        success: function(json){
	      		if(json.status){
	      			$('#main4').remove()
	      			$('#main5').remove()
	      			$('#main6').remove()
	      			$('#main7').remove()
	      			$('.RevenueAndExpenditureTrend_title').remove()
	      			var str='',
	      				ymax=json.info.all_stat.stat_max,
	      				xdata=[],
	      				data=[];
	      				for(var i=0;i<json.info.all_stat.stat_lists.length;i++){
	      					xdata.push(json.info.all_stat.stat_lists[i].title);
		      				data.push(json.info.all_stat.stat_lists[i].in_num);
	      				}
	      				
						str+='<p class="RevenueAndExpenditureTrend_title">'+
								'<b></b>'+
								'<span>收入走势</span>'+
							'</p>';
						var main1='<div id="main4" style="width: 140% ;height:600px; margin:0 auto;"></div>';
						$('.RevenueAndExpenditureTrend_zx').html(str+main1);
						$('.RevenueAndExpenditureTrend_zx').css('border-bottom','1px solid #E1E1E1;')
						var myChart1 = echarts.init(document.getElementById('main4'));
						option1 = {
						    backgroundColor: "#fff",
						    color: ['#463BB1'],

						    title: [{
						        text: '城市宝周新增用户报表',
						        left: '1%',
						        top: '6%',
						        textStyle: {
						            color: '#fff'
						        }
						    }],
						    tooltip: {
						        trigger: 'item',
						        position: function (p) {
						                           // 位置回调
						                           // console.log && console.log(p);
						                           return [p[0] - 25, p[1] - 60];
						                       },
						    },
						     "legend": {
							        x: '30%',
							        //top: '2%',
							        textStyle: {
							            color: '#90979c',
							        },
							        "data": ['收入（推广费）']
							    },
						    grid: {
						        left: '1%',
						        right: '35%',
						        top: '16%',
						        bottom: '6%',
						        containLabel: true
						    },
						    toolbox: {
						        "show": false,
						        feature: {
						            saveAsImage: {}
						        }
						    },
						    xAxis: {
						        type: 'category',
						        name: '月份',
						        boundaryGap: true,
						        nameTextStyle: {
					                color: '#000'
					            },
						        "axisLine": {
						            lineStyle: {
						                color: 'rgba(231,235,239,.6)'
						            }
						        },
						        "axisTick": {
						            "show": false
						        },
						        axisLabel: {
						            textStyle: {
						                color: '#000'
						            }
						        },
						        data: xdata
						    },
						    yAxis: {
						    	name: '费用（元）',
						    	max:ymax,
						    	minInterval: 1,
						        "axisLine": {
						            lineStyle: {
						                color: '#fff'
						            }
						        },
						        nameTextStyle: {
					                color: '#000'
					            },
						        splitLine: {
						            show: true,
						            lineStyle: {
						                color: 'rgba(231,235,239,.6)'
						            }
						        },
						        "axisTick": {
						            "show": false
						        },
						        axisLabel: {
						            textStyle: {
						                color: '#000'
						            }
						        },
						        type: 'value'
						    },
						    series: [{
					            "name": "收入（推广费）",
					            "type": "line",
					            "stack": "总量",
					            symbolSize:10,
					            symbol:'circle',
					            "itemStyle": {
					                "normal": {
					                    "color": "rgba(70,59,177,0.6)",
					                    "barBorderRadius": 0,
					                    "label": {
					                        "show": true,
					                        "position": "top",
					                        formatter: function(p) {
					                            return p.value > 0 ? (p.value) : '';
					                        }
					                    }
					                }
					            },
					            "data": data
					        }]
						}
						myChart1.setOption(option1);

						if(json.info.exten_stat!=null&&json.info.exten_stat!=''){
							// 历史账单收益分析饼状图
							var str1='';
							if(json.info.exten_stat&&json.info.exten_stat.qrcode_num){
								var str1_data=json.info.exten_stat.qrcode_num;
							}
							if(json.info.exten_stat&&json.info.exten_stat.link_num){
								var str1_data1=json.info.exten_stat.qrcode_num;
							}
							if(json.info.exten_stat&&json.info.exten_stat.api_num){
								var str1_data2=json.info.exten_stat.api_num;
							}
							str1+='<p class="RevenueAndExpenditureTrend_title">'+
										'<b></b>'+
										'<span>收益分析 ：分析不同推广方式产生的收益</span>'+
									'</p>'
							var main2='<div id="main5" style="width: 100% ;height:600px; margin:0 auto;"></div>';
							$('.RevenueAndExpenditureTrend_bz').html(str1+main2);
							$('.RevenueAndExpenditureTrend_bz').css('border-bottom','1px solid #E1E1E1;')
							var myChart2 = echarts.init(document.getElementById('main5'));
							option2 = {
							    
							     series : [
							        {
							            type: 'pie',
							            //roseType:'radius',
							            radius : '75%',
							            center: ['40%', '60%'],
							            color:['#F8E81C','#6F6DEE','#5ACD3A'],
							            data:[
							               
							                {value:str1_data, name:'二维码'},
							                 {value:str1_data1, name:'API接口'},
							                {value:str1_data2, name:'推广链接'},
							                /*{value:335, name:'3'},
							                {value:1548, name:'4'},
							                {value:1548, name:'5'}*/
							            ],
							            label: {
							            normal: {
							                position: 'outside',
							                formatter: '{b}： {c}.00元',
							                 textStyle: {
							                    color: '#000',
							                    fontSize: 14
							                }
							            }
							        },
							            itemStyle: {
							                emphasis: {
							                    shadowBlur: 10,
							                    shadowOffsetX: 0,
							                    shadowColor: 'rgba(0, 0, 0, 0.5)'
							                }
							            }
							        }
							    ]
							};
							myChart2.setOption(option2);
						}
						if(json.info.tgf_stat.stat_lists!=null&&json.info.tgf_stat.stat_lists!=''){
							// 历史账单收入柱状图
							var str2='',
			      				str2_ymax=json.info.tgf_stat.stat_max,
			      				str2_xdata=[],
			      				str2_data=[];
			      				for(var i=0;i<json.info.tgf_stat.stat_lists.length;i++){
			      					str2_xdata.push(json.info.tgf_stat.stat_lists[i].title);
				      				str2_data.push(json.info.tgf_stat.stat_lists[i].num);
			      				}
							str2+='<p class="RevenueAndExpenditureTrend_title">'+
										'<b></b>'+
										'<span>收入（推广费）：'+str2_ymax+'元</span>'+
									'</p>'
							var main3='<div id="main6" style="width: 95% ;height:600px; margin:0 auto;"></div>';
							$('.RevenueAndExpenditureTrend_zz').html(str2+main3);
							$('.RevenueAndExpenditureTrend_zz').css('border-bottom','1px solid #E1E1E1;')
							var myChart3 = echarts.init(document.getElementById('main6'));
							var color=['rgba(70,59,177,0.6)'];
							var name='产品名称';
							var xdata=str2_xdata;
							var ymax=str2_ymax;
							var series_name='收入（推广费）';
							var data=str2_data;
							bar_Graph(color,name,xdata,ymax,series_name,data,myChart3)
						}
						if(json.info.premium_stat.stat_lists!=null&&json.info.premium_stat.stat_lists!=''){
							var str3='';
								str3_ymax=json.info.premium_stat.stat_max,
			      				str3_xdata=[],
			      				str3_data=[];
			      				for(var i=0;i<json.info.premium_stat.stat_lists.length;i++){
			      					str3_xdata.push(json.info.premium_stat.stat_lists[i].title);
				      				str3_data.push(json.info.premium_stat.stat_lists[i].num);
			      				}
								str3+='<p class="RevenueAndExpenditureTrend_title">'+
											'<b></b>'+
											'<span>支出（保费）：'+str3_ymax+'元</span>'+
										'</p>'
								var main4='<div id="main7" style="width: 95% ;height:600px; margin:0 auto;"></div>';
								$('.RevenueAndExpenditureTrend_zc').html(str3+main4);
								$('.RevenueAndExpenditureTrend_zc').css('border-bottom','1px solid #E1E1E1;')
								var myChart4 = echarts.init(document.getElementById('main7'));
								var color=['rgba(255,25,111,0.6)'];
								var name="保险产品";
								var xdata=str3_xdata;
								var ymax=str3_ymax;
								var series_name='支出（保费）';
								var data=str3_data;
								bar_Graph(color,name,xdata,ymax,series_name,data,myChart4)
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
	}else{
		$('.Settlement .enterprise .Product_promotion_tiem1').eq(0).find('.historyBill').css("color","graytext")
	}
	
}



/*

	表格勾选

*/
function Expand_Detail(obj){
	var index=$('.Expand_Detail').index($(obj));
	$('.expandInDetail').hide();
	$('.Expand_Detail').removeClass('img1');
	
	
	if($('.Expand_Detail').eq(index).attr('sid')==1){
		$('.Expand_Detail').eq(index).attr('sid','2')
		$('.Expand_Detail').eq(index).addClass('img1');
		$('.expandInDetail').eq(index).show();
		return
	}
	if($('.Expand_Detail').eq(index).attr('sid')==2){
		$('.Expand_Detail').eq(index).attr('sid','1')
		$('.Expand_Detail').eq(index).removeClass('img1');
		$('.expandInDetail').eq(index).hide();
		return
	}

}


/*

	LOGO回首页

*/
function logo_click(){
	var url = '/index.html'
	url_location(url)
	$.cookie('num','1');
}


function Modify_information(obj){		//修改企业基本信息
	$(obj).parent('h2').siblings('.enterprise_record').find('.enterprise_record_mark').hide();
	$(obj).parent('h2').siblings('.btn').css('display','block');
}
function Save_information(obj){		//修改商户信息
	var name=$('.platform_content_record1  .enterprise_name').find('input').val(),
		addr=$('.platform_content_record1  .enterprise_addr').find('input').val(),
		admin_name=$('.platform_content_record1  .enterprise_admin_name').find('input').val(),
		admin_mobile=$('.platform_content_record1  .enterprise_mobile').find('input').val(),
		admin_ident_no=$('.platform_content_record1  .enterprise_ident_no').find('input').val();
	if(name==''||name==null){
		var title='企业名称不能为空！',
			name1='确定',
			Method1='cancel()';
		alert(title,name1,Method1)
		return
	}
	if(addr==''||addr==null){
		var title='公司地址不能为空！',
			name1='确定',
			Method1='cancel()';
		alert(title,name1,Method1)
		return
	}
	if(admin_name==''||admin_name==null){
		var title='管理员姓名不能为空！',
			name1='确定',
			Method1='cancel()';
		alert(title,name1,Method1)
		return
	}
	if(admin_mobile==''||admin_mobile==null){
		var title='联系电话不能为空！',
			name1='确定',
			Method1='cancel()';
		alert(title,name1,Method1)
		return
	}
	if(admin_ident_no==''||admin_ident_no==null){
		var title='身份证号不能为空！',
			name1='确定',
			Method1='cancel()';
		alert(title,name1,Method1)
		return
	}
	$.ajax({				
		type: "post",
        async: true,
        url: getPostUrl()+'/Company/update_do',
        data: {
			'name': name,
			'addr': addr,
			'admin_name': admin_name,
			'admin_mobile': admin_mobile,
			'admin_ident_no': admin_ident_no
		},
        dataType: "json",
        success: function(json){
        	if(json.status==1){
        		var title='保存成功',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
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
	$(obj).siblings('.enterprise_record').find('.enterprise_record_mark').show();
	$(obj).css('display','none');
}



/*

	type==1:修改登陆邮箱第一步
	type==2:修改登陆邮箱第二步
	type==3:绑定修改手机号码
	type==4:修改登录密码第一步
	type==5:修改登录密码第二步

*/
function Modify_login_mailbox(obj,type){
	
	if(type==1){
		var password = $(obj).siblings('.ipt').val();
		if(password!=''){
			$.ajax({				//首页行业场景示例
				type: "post",
		        async: true,
		        url: getPostUrl()+'/Company/chg_email_fst',
		        data: {
					password: password
				},
		        dataType: "json",
		        success: function(json){
		        	if(json.status==1){
		        		$('#Modify_mailbox').find('.Modify_mailbox_conter').hide();
		        		$('#Modify_mailbox').find('.Modify_mailbox_conter').eq(1).show();
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
		}else{
			var title='密码不能为空!',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
		}
	}
	if(type==2){
		var email=$(obj).siblings('.New_mailbox').eq(0).find('input').val();
		var code=$(obj).siblings('.New_mailbox').eq(1).find('input').val();
		if(email==''){
			var title='邮箱地址不能为空！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}
		if(code==''){
			var title='验证码不能为空！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
		}
		$.ajax({				//首页行业场景示例
			type: "post",
	        async: true,
	        url: getPostUrl()+'/Company/chg_email',
	        data: {
				email: email,
				code:code
			},
	        dataType: "json",
	        success: function(json){
	        	if(json.status==1){
	        		$('#Modify_mailbox').hide();
	        		$('.security_setting .security_setting_email').html(email)
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

	if(type==3){
		var mobile=$(obj).siblings('.New_mailbox').eq(0).find('input').val();
		var code=$(obj).siblings('.New_mailbox').eq(1).find('input').val();
		if(mobile==''){
			var title='手机号码不能为空！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}
		if(code==''){
			var title='验证码不能为空！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
		}
		$.ajax({				//首页行业场景示例
			type: "post",
	        async: true,
	        url: getPostUrl()+'/Company/chg_mobile',
	        data: {
				mobile: mobile,
				code:code
			},
	        dataType: "json",
	        success: function(json){
	        	if(json.status==1){
	        		$('#Modify_mailbox').hide();
	        		$('.security_setting .security_setting_mobile').html(mobile)
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

	if(type==4){
		var email=$(obj).siblings('.New_mailbox').eq(0).find('input').val();
		var code=$(obj).siblings('.New_mailbox').eq(1).find('input').val();
		if(email==''){
			var title='邮箱地址不能为空！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}                  
		if(code==''){
			var title='验证码不能为空！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}
		$.ajax({				
			type: "post",
	        async: true,
	        url: getPostUrl()+'/Company/chg_password_fst',
	        data: {
				email: email,
				code:code
			},
	        dataType: "json",
	        success: function(json){
	        	if(json.status==1){
	        		$('#Modify_mailbox').find('.Modify_mailbox_conter').hide();
		        	$('#Modify_mailbox').find('.Modify_mailbox_conter').eq(4).show();
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

	if(type==5){
		var password=$(obj).siblings('.New_mailbox').eq(0).find('input').val();
		var rep_password=$(obj).siblings('.New_mailbox').eq(1).find('input').val();
		var email = $(obj).parent('.Modify_mailbox_conter').prev().find('input').val();
		if(password==''){
			var title='密码不能为空！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}
		if(!password_regx(password)){
			var title='密码格式不正确！请输入6-20位字母和数字，不能为纯数字或者纯字母',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}
		if(rep_password!=password){
			var title='两次密码不一致！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}
		$.ajax({				//首页行业场景示例
			type: "post",
	        async: true,
	        url: getPostUrl()+'/Company/chg_password',
	        data: {
	        	email: email,
				password: password,
				rep_password:rep_password
			},
	        dataType: "json",
	        success: function(json){
	        	if(json.status==1){
	        		$('#Modify_mailbox').hide();
	        		var title='修改成功',
						name1='确定',
						Method1='cancel()';
					alert(title,name1,Method1)
	        		$(obj).siblings('.New_mailbox').eq(0).find('input').val('')
	        		$(obj).siblings('.New_mailbox').eq(1).find('input').val('')
	        		$(obj).parent('.Modify_mailbox_conter').prev().find('input').val('')
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

	时间日期插件

*/
function Select_date(obj){
	$('#laydate_box').remove();
	laydate({

        elem: obj

    });
}





/*

	获取手机验证码

*/
function Mobile_phone_verification_code(obj){
	var mobile=$('.modify_mobile').val();
	var num=60;
	if(mobile==''||mobile==null){
		var title='手机不能为空！',
			name1='确定',
			Method1='cancel()';
		alert(title,name1,Method1)
		return
	}else{
		if(!mobile_regx(mobile)){
			var title='手机格式错误！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}
	}
	$.ajax({
         type: "post",
         async: true,
         url: getPostUrl()+'/Mail/sms_send_do',
         data: {
			"mobile": mobile
		},
         dataType: "json",
         success: function(json){
         	if(json.status==1){
         		var title='发送成功！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
         		$(obj).html(num+'秒');
         		var times=setInterval(function(){
         			num--;
         			$(obj).html(num+'秒')
         			if(num==0){
         				clearInterval(times)
         				$(obj).html('获取手机验证码')
         			}
         		},1000)
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

// 产品推广的查询
var lfjPageNum,nowPage;


/*

	产品合作->产品推广查询

*/
$(document).on('click','#Product_promotion_query',function(){
	var start_date=$('#Product_promotion_span').text();
	var end_date=$('#Product_promotion_span1').text();
	var search_val=$('.Extension .search').val();
	var status=null;
	if(!date_regx(start_date)){
		start_date=null;
	}
	if(!date_regx(end_date)){
		end_date=null;
	}
	if(search_val==''||search_val==null||search_val==undefined){
		search_val=null
	}
	Product_promotion('1',start_date,end_date,'#platform_content_record3',status,search_val);
})

/*

	产品合作->产品定制查询

*/
$(document).on('click','#Product_promotion_query1',function(){
	var start_date=$('#customization_span').text();
	var end_date=$('#customization_span1').text();
	var status=$('.customization .customization_state').attr('sid');
	var search_val=$('.customization .search').val();
	if($('#platform_content_record4').find('.product_header').find('li').eq(0).find('img').attr('status')=="shut"){
		$('#platform_content_record4').find('.product_header').find('li').eq(0).find('img').click()
	}
	if(status==''||status==null||status==undefined){
		status=null
	}
	if(search_val==''||search_val==null||search_val==undefined){
		search_val=null
	}
	if(!date_regx(start_date)){
		start_date=null;
	}
	if(!date_regx(end_date)){
		end_date=null;
	}
	Product_promotion('2',start_date,end_date,'#platform_content_record4',status,search_val);
})


/*

	用户订单查询

*/
$(document).on('click','#Product_promotion_query2',function(){
	var start_date=$('#user_order_span').text();
	var end_date=$('#user_order_span1').text();
	var product_name=$('.user_order .search').eq(0).val();
	if($('#platform_content_record5').find('.product_header').find('li').eq(0).find('img').attr('status')=="shut"){
		$('#platform_content_record5').find('.product_header').find('li').eq(0).find('img').click()
	}
	// if(status==''||status==null||status==undefined){
	// 	status=null
	// }
	if(!date_regx(start_date)){
		start_date=null;
	}
	if(!date_regx(end_date)){
		end_date=null;
	}
	user_Order('#platform_content_record5','',product_name,start_date,end_date,1);
})

/*

	财务结算查询

*/
$(document).on('click','#Product_promotion_query3',function(){
	var type=$('.Settlement .Product_promotion_tiem1').attr('sid');
	var create_start=$('#Settlement_span').text();
	var create_end=$('#Settlement_span1').text();
	var status=$('.Settlement .Settlement_status').find('span').attr('sid');
	var product_name=$('.Settlement .search').val();
	if($('#platform_content_record7').find('.product_header li').eq(0).find('img').attr('status')=="shut"){
		$('#platform_content_record7').find('.product_header li').eq(0).find('img').click()
	}
	if(status==''||status==null||status==undefined){
		status=null
	}
	if(!date_regx(create_start)){
		create_start=null;
	}
	if(!date_regx(create_end)){
		create_end=null;
	}
	if(type==1){
		$('.tui_guang_fei').html('推广费（元）')
		$('.slly1').html('收入来源')
		financial_Settlement('#platform_content_record7',type,product_name,create_start,create_end,status,1);
	}else{
		$('.tui_guang_fei').html('结算类型')
		$('.slly1').html('保险公司')
		financial_Settlement('#platform_content_record7',type,product_name,create_start,create_end,status,1);
	}
	
})

/*

	账单明细查询

*/
$(document).on('click','#Product_promotion_query4',function(){
	var id=$('#Product_promotion_query4').attr('sid');
	var type=$('#Product_promotion_query4').attr('type');
	var source_type=$('#Product_promotion_query4').attr('source_type');
	var create_start=$('#bill_details_span').text();
	var create_end=$('#bill_details_span1').text();
	var time_type=$('.bill_details .Settlement_status').find('span').attr('sid');
	var order_val=$('.bill_details .search').eq(0).val();
	var app_val=$('.bill_details .search').eq(1).val();
	
	if($('#platform_content_record8').find('.product_header li').eq(0).find('img').attr('status')=="shut"){
		$('#platform_content_record8').find('.product_header li').eq(0).find('img').click()
	}
	if(time_type==''||time_type==null||time_type==undefined){
		time_type=null
	}
	if(status==''||status==null||status==undefined){
		status=null
	}
	if(!date_regx(create_start)){
		create_start=null;
	}
	if(!date_regx(create_end)){
		create_end=null;
	}
	if(type==1){
		$('#platform_content_record8').find('.product_header li').eq(9).html("推广费（元）")
		$('.policyNumber').html('推广费')
		Billdetails('#platform_content_record8',id,type,1,create_start,create_end,order_val,time_type,app_val,source_type);
	}else if(type==2){
		$('#platform_content_record8').find('.product_header li').eq(9).html("技术服务费（元）")
		$('.policyNumber').html('保单号')
		Billdetails('#platform_content_record8',id,type,1,create_start,create_end,order_val,time_type,app_val,source_type);
	}
	
})
//end


function pageEvent(dom,lfjNum,type,start_date,end_date,platform_content_record3,status,search_val){
// 生成页码
	var pageStr = '';//拼接页码字符串
	lfjPageNum = lfjNum;//获取页码总数
	if(!$(dom+' .paging .page').length){		//是否第一次生成页码
		if(lfjNum>0&&lfjNum<=1){   //当页码为1
			pageStr = '<a dom="'+dom+'" type="'+type+'" start_date="'+start_date+'" end_date="'+end_date+'" platform_content_record3="'+platform_content_record3+'" status="'+status+'" search_val="'+search_val+'" class="reverseNumberPage page active">1</a>';
			$(dom+' .prevPage').after(pageStr);
		}else{   //当页码打于1   
			if(lfjPageNum>5){
				for(var p = 0;p < 5;p++){
					pageStr += '<a dom="'+dom+'" type="'+type+'" start_date="'+start_date+'" end_date="'+end_date+'" platform_content_record3="'+platform_content_record3+'" status="'+status+'" search_val="'+search_val+'" class="reverseNumberPage page'+(p+1)+' page">'+(p+1)+'</a>';
				}
			}else{
				for(var p = 0;p < lfjPageNum;p++){
					pageStr += '<a dom="'+dom+'" type="'+type+'" start_date="'+start_date+'" end_date="'+end_date+'" platform_content_record3="'+platform_content_record3+'" status="'+status+'" search_val="'+search_val+'" class="reverseNumberPage page'+(p+1)+' page">'+(p+1)+'</a>';
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
				pageStr = '<a dom="'+dom+'" type="'+type+'" start_date="'+start_date+'" end_date="'+end_date+'" platform_content_record3="'+platform_content_record3+'" status="'+status+'" search_val="'+search_val+'" class="reverseNumberPage active">1</a>';
				$(dom+'  .prevPage').after(pageStr);
			}else{
				if(lfjPageNum>5){
					for(var p = 0;p < 5;p++){
						pageStr += '<a dom="'+dom+'" type="'+type+'" start_date="'+start_date+'" end_date="'+end_date+'" platform_content_record3="'+platform_content_record3+'" status="'+status+'" search_val="'+search_val+'" class="reverseNumberPage page'+(p+1)+' page">'+(p+1)+'</a>';
					}
				}else{
					for(var p = 0;p < lfjPageNum;p++){
						pageStr += '<a dom="'+dom+'" type="'+type+'" start_date="'+start_date+'" end_date="'+end_date+'" platform_content_record3="'+platform_content_record3+'" status="'+status+'" search_val="'+search_val+'" class="reverseNumberPage page'+(p+1)+' page">'+(p+1)+'</a>';
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
	$(dom+'  .prevPage').addClass('reversePrevPage')
	$(dom+'  .prevPage').attr('dom',dom)
	$(dom+'  .prevPage').attr('type',type)
	$(dom+'  .prevPage').attr('start_date',start_date)
	$(dom+'  .prevPage').attr('end_date',end_date)
	$(dom+'  .prevPage').attr('platform_content_record3',platform_content_record3)
	$(dom+'  .prevPage').attr('status',status)
	$(dom+'  .prevPage').attr('search_val',search_val)
	$(dom+'  .nextPage').addClass('reverseNextPage')
	$(dom+'  .nextPage').attr('dom',dom)
	$(dom+'  .nextPage').attr('type',type)
	$(dom+'  .nextPage').attr('start_date',start_date)
	$(dom+'  .nextPage').attr('end_date',end_date)
	$(dom+'  .nextPage').attr('platform_content_record3',platform_content_record3)
	$(dom+'  .nextPage').attr('status',status)
	$(dom+'  .nextPage').attr('search_val',search_val)
	
	//end
}


















function pageEvent_user_Order(dom,lfjNum,platform_content_record3,status,search_val,start_date,end_date,page){
// 生成用户订单页码
	var pageStr = '';
	lfjPageNum = lfjNum;
	if(!$(dom+' .paging .page').length){
		if(lfjNum>0&&lfjNum<=1){
			pageStr = '<a dom="'+dom+'" platform_content_record3="'+platform_content_record3+'" status="'+status+'" search_val="'+search_val+'" start_date="'+start_date+'" end_date="'+end_date+'" page="'+page+'" class="reverseNumberPage_user_Order page active">1</a>';
			$(dom+' .prevPage').after(pageStr);
		}else{
			if(lfjPageNum>5){
				for(var p = 0;p < 5;p++){
					pageStr += '<a dom="'+dom+'" platform_content_record3="'+platform_content_record3+'" status="'+status+'" search_val="'+search_val+'" start_date="'+start_date+'" end_date="'+end_date+'" page="'+page+'" class="reverseNumberPage_user_Order page'+(p+1)+' page">'+(p+1)+'</a>';
				}
			}else{
				for(var p = 0;p < lfjPageNum;p++){
					pageStr += '<a dom="'+dom+'" platform_content_record3="'+platform_content_record3+'" status="'+status+'" search_val="'+search_val+'" start_date="'+start_date+'" end_date="'+end_date+'" page="'+page+'" class="reverseNumberPage_user_Order page'+(p+1)+' page">'+(p+1)+'</a>';
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
				pageStr = '<a dom="'+dom+'" platform_content_record3="'+platform_content_record3+'" status="'+status+'" search_val="'+search_val+'" start_date="'+start_date+'" end_date="'+end_date+'" page="'+page+'" class="reverseNumberPage_user_Order active">1</a>';
				$(dom+'  .prevPage').after(pageStr);
			}else{
				if(lfjPageNum>5){
					for(var p = 0;p < 5;p++){
						pageStr += '<a dom="'+dom+'" platform_content_record3="'+platform_content_record3+'" status="'+status+'" search_val="'+search_val+'" start_date="'+start_date+'" end_date="'+end_date+'" page="'+page+'" class="reverseNumberPage_user_Order page'+(p+1)+' page">'+(p+1)+'</a>';
					}
				}else{
					for(var p = 0;p < lfjPageNum;p++){
						pageStr += '<a dom="'+dom+'" platform_content_record3="'+platform_content_record3+'" status="'+status+'" search_val="'+search_val+'" start_date="'+start_date+'" end_date="'+end_date+'" page="'+page+'" class="reverseNumberPage_user_Order page'+(p+1)+' page">'+(p+1)+'</a>';
					}
				}
				$(dom+'  .prevPage').after(pageStr);
				$(dom+'  .page1').addClass('active');
			}
		}
	}
	$(dom+'  .nextPage').show();
	$(dom+'  .prevPage').show();

	$(dom+'  .prevPage').addClass('reversePrevPage_user_Order')
	$(dom+'  .prevPage').attr('dom',dom)
	$(dom+'  .prevPage').attr('page',page)
	$(dom+'  .prevPage').attr('start_date',start_date)
	$(dom+'  .prevPage').attr('end_date',end_date)
	$(dom+'  .prevPage').attr('platform_content_record3',platform_content_record3)
	$(dom+'  .prevPage').attr('status',status)
	$(dom+'  .prevPage').attr('search_val',search_val)
	$(dom+'  .nextPage').addClass('reverseNextPage_user_Order')
	$(dom+'  .nextPage').attr('dom',dom)
	$(dom+'  .nextPage').attr('page',page)
	$(dom+'  .nextPage').attr('start_date',start_date)
	$(dom+'  .nextPage').attr('end_date',end_date)
	$(dom+'  .nextPage').attr('platform_content_record3',platform_content_record3)
	$(dom+'  .nextPage').attr('status',status)
	$(dom+'  .nextPage').attr('search_val',search_val)

	//end
}


















function pageEvent_financial_Settlement(dom,lfjNum,type,product_name,create_start,create_end,status){
// 生成财务结算页码
	var pageStr = '';
	lfjPageNum = lfjNum;
	if(!$(dom+' .paging .page').length){
		if(lfjNum>0&&lfjNum<=1){
			pageStr = '<a dom="'+dom+'" type="'+type+'" product_name="'+product_name+'" create_start="'+create_start+'" create_end="'+create_end+'" status="'+status+'" class="reverseNumberPage_financial_Settlement page active">1</a>';
			$(dom+' .prevPage').after(pageStr);
		}else{
			if(lfjPageNum>5){
				for(var p = 0;p < 5;p++){
					pageStr += '<a dom="'+dom+'" type="'+type+'" product_name="'+product_name+'" create_start="'+create_start+'" create_end="'+create_end+'" status="'+status+'" class="reverseNumberPage_financial_Settlement page'+(p+1)+' page">'+(p+1)+'</a>';
				}
			}else{
				for(var p = 0;p < lfjPageNum;p++){
					pageStr += '<a dom="'+dom+'" type="'+type+'" product_name="'+product_name+'" create_start="'+create_start+'" create_end="'+create_end+'" status="'+status+'" class="reverseNumberPage_financial_Settlement page'+(p+1)+' page">'+(p+1)+'</a>';
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
				pageStr = '<a dom="'+dom+'" type="'+type+'" product_name="'+product_name+'" create_start="'+create_start+'" create_end="'+create_end+'" status="'+status+'" class="reverseNumberPage_financial_Settlement active">1</a>';
				$(dom+'  .prevPage').after(pageStr);
			}else{
				if(lfjPageNum>5){
					for(var p = 0;p < 5;p++){
						pageStr += '<a dom="'+dom+'" type="'+type+'" product_name="'+product_name+'" create_start="'+create_start+'" create_end="'+create_end+'" status="'+status+'" class="reverseNumberPage_financial_Settlement page'+(p+1)+' page">'+(p+1)+'</a>';
					}
				}else{
					for(var p = 0;p < lfjPageNum;p++){
						pageStr += '<a dom="'+dom+'" type="'+type+'" product_name="'+product_name+'" create_start="'+create_start+'" create_end="'+create_end+'" status="'+status+'" class="reverseNumberPage_financial_Settlement page'+(p+1)+' page">'+(p+1)+'</a>';
					}
				}
				
				$(dom+'  .prevPage').after(pageStr);
				$(dom+'  .page1').addClass('active');
			}
		}
	}
	$(dom+'  .nextPage').show();
	$(dom+'  .prevPage').show();

	$(dom+'  .prevPage').addClass('reversePrevPage_financial_Settlement')
	$(dom+'  .prevPage').attr('dom',dom)
	$(dom+'  .prevPage').attr('type',type)
	$(dom+'  .prevPage').attr('product_name',product_name)
	$(dom+'  .prevPage').attr('create_start',create_start)
	$(dom+'  .prevPage').attr('create_end',create_end)
	$(dom+'  .prevPage').attr('status',status)
	$(dom+'  .nextPage').addClass('reverseNextPage_financial_Settlement')
	$(dom+'  .nextPage').attr('dom',dom)
	$(dom+'  .nextPage').attr('type',type)
	$(dom+'  .nextPage').attr('product_name',product_name)
	$(dom+'  .nextPage').attr('create_start',create_start)
	$(dom+'  .nextPage').attr('create_end',create_end)
	$(dom+'  .nextPage').attr('status',status)
	//end
}

function pageEvent_Billdetails(dom,lfjNum,id,type,page,create_start,create_end,order_val,time_type,app_val,source_type){
// 生成账单明细页码
	var pageStr = '';
	lfjPageNum = lfjNum;
	if(!$(dom+' .paging .page').length){
		if(lfjNum>0&&lfjNum<=1){
			pageStr = '<a dom="'+dom+'" sid="'+id+'" type="'+type+'" page="'+page+'" create_start="'+create_start+'" create_end="'+create_end+'" order_val="'+order_val+'" time_type="'+time_type+'" app_val="'+app_val+'" source_type="'+source_type+'" class="reverseNumberPage_Billdetails page active">1</a>';
			$(dom+' .prevPage').after(pageStr);
		}else{
			if(lfjPageNum>5){
				for(var p = 0;p < 5;p++){
					pageStr += '<a dom="'+dom+'" sid="'+id+'" type="'+type+'" page="'+page+'" create_start="'+create_start+'" create_end="'+create_end+'" order_val="'+order_val+'" time_type="'+time_type+'" app_val="'+app_val+'" source_type="'+source_type+'" class="reverseNumberPage_Billdetails page'+(p+1)+' page">'+(p+1)+'</a>';
				}
			}else{
				for(var p = 0;p < lfjPageNum;p++){
					pageStr += '<a dom="'+dom+'" sid="'+id+'" type="'+type+'" page="'+page+'" create_start="'+create_start+'" create_end="'+create_end+'" order_val="'+order_val+'" time_type="'+time_type+'" app_val="'+app_val+'" source_type="'+source_type+'" class="reverseNumberPage_Billdetails page'+(p+1)+' page">'+(p+1)+'</a>';
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
				pageStr = '<a dom="'+dom+'" sid="'+id+'" type="'+type+'" page="'+page+'" create_start="'+create_start+'" create_end="'+create_end+'" order_val="'+order_val+'" time_type="'+time_type+'" app_val="'+app_val+'" source_type="'+source_type+'" class="reverseNumberPage_Billdetails active">1</a>';
				$(dom+'  .prevPage').after(pageStr);
			}else{
				if(lfjPageNum>5){
					for(var p = 0;p < 5;p++){
						pageStr += '<a dom="'+dom+'" sid="'+id+'" type="'+type+'" page="'+page+'" create_start="'+create_start+'" create_end="'+create_end+'" order_val="'+order_val+'" time_type="'+time_type+'" app_val="'+app_val+'" source_type="'+source_type+'" class="reverseNumberPage_Billdetails page'+(p+1)+' page">'+(p+1)+'</a>';
					}
				}else{
					for(var p = 0;p < lfjPageNum;p++){
						pageStr += '<a dom="'+dom+'" sid="'+id+'" type="'+type+'" page="'+page+'" create_start="'+create_start+'" create_end="'+create_end+'" order_val="'+order_val+'" time_type="'+time_type+'" app_val="'+app_val+'" source_type="'+source_type+'" class="reverseNumberPage_Billdetails page'+(p+1)+' page">'+(p+1)+'</a>';
					}
				}
				
				$(dom+'  .prevPage').after(pageStr);
				$(dom+'  .page1').addClass('active');
			}
		}
	}
	$(dom+'  .nextPage').show();
	$(dom+'  .prevPage').show();
	$(dom+'  .prevPage').addClass('reversePrevPage_Billdetails')
	$(dom+'  .prevPage').attr('dom',dom)
	$(dom+'  .prevPage').attr('sid',id)
	$(dom+'  .prevPage').attr('type',type)
	$(dom+'  .prevPage').attr('page',page)
	$(dom+'  .prevPage').attr('create_start',create_start)
	$(dom+'  .prevPage').attr('create_end',create_end)
	$(dom+'  .prevPage').attr('order_val',order_val)
	$(dom+'  .prevPage').attr('time_type',time_type)
	$(dom+'  .prevPage').attr('app_val',app_val)
	$(dom+'  .prevPage').attr('source_type',source_type)
	$(dom+'  .nextPage').addClass('reverseNextPage_Billdetails')
	$(dom+'  .nextPage').attr('dom',dom)
	$(dom+'  .nextPage').attr('sid',id)
	$(dom+'  .nextPage').attr('type',type)
	$(dom+'  .nextPage').attr('page',page)
	$(dom+'  .nextPage').attr('create_start',create_start)
	$(dom+'  .nextPage').attr('create_end',create_end)
	$(dom+'  .nextPage').attr('order_val',order_val)
	$(dom+'  .nextPage').attr('time_type',time_type)
	$(dom+'  .nextPage').attr('app_val',app_val)
	$(dom+'  .nextPage').attr('source_type',source_type)
	
	//end
}


//点击数字页码
function reverseNumberPage(dom,obj,type,start_date,end_date,platform_content_record3,status,search_val){
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
			if(nowPage>=3&&nowPage<lfjPageNum-1){
				$(dom+' .paging').find('a').eq(0).html(pagingNum)
				$(dom+' .paging').find('a').eq(1).html(pagingNum1)
				$(dom+' .paging').find('a').eq(2).html(pagingNum2)
				$(dom+' .paging').find('a').eq(3).html(pagingNum3)
				$(dom+' .paging').find('a').eq(4).html(pagingNum4)
				$(dom+' .paging').find('a').eq(2).addClass('active').siblings('a').removeClass('active')
				$(dom+' .prevPage').removeAttr('disabled');
				$(dom+' .nextPage').removeAttr('disabled');
			}else if(nowPage>=3&&nowPage==lfjPageNum-1){
				$(dom+' .paging').find('a').eq(0).html(lfjPageNum-4)
				$(dom+' .paging').find('a').eq(1).html(lfjPageNum-3)
				$(dom+' .paging').find('a').eq(2).html(lfjPageNum-2)
				$(dom+' .paging').find('a').eq(3).html(lfjPageNum-1)
				$(dom+' .paging').find('a').eq(4).html(lfjPageNum)
				$(dom+' .nextPage').removeAttr('disabled').siblings('.prevPage').removeAttr('disabled');
			}else if(nowPage>=3&&(nowPage==lfjPageNum)){
				$(dom+' .nextPage').attr('disabled','disabled').siblings('.prevPage').removeAttr('disabled');
			}else if(nowPage<3&&nowPage==1){
				$(dom+' .prevPage').attr('disabled','disabled').siblings('.nextPage').removeAttr('disabled');
			}else if(nowPage<3&&nowPage==2){
				if($(dom+' .paging').find('a').eq(0).html()!=1){
					$(dom+' .paging').find('a').eq(0).html(1)
					$(dom+' .paging').find('a').eq(1).html(2)
					$(dom+' .paging').find('a').eq(2).html(3)
					$(dom+' .paging').find('a').eq(3).html(4)
					$(dom+' .paging').find('a').eq(4).html(5)
					$(dom+' .paging').find('a').eq(1).addClass('active').siblings('a').removeClass('active')
				}
				$(dom+' .nextPage').removeAttr('disabled').siblings('.prevPage').removeAttr('disabled');
			}
		}else{
			$(dom+' .prevPage').removeAttr('disabled');
			$(dom+' .nextPage').removeAttr('disabled');
		}
	}
	Product_promotion_nofirst(nowPage,type,start_date,end_date,platform_content_record3,status,search_val); //调用接口显示相应页面内容
}

function reverseNumberPage_user_Order(dom,obj,platform_content_record3,status,search_val,start_date,end_date,page){
	nowPage = $(obj).text();//当前页码
	$(obj).addClass('active').siblings().removeClass('active');
	var numPage=lfjPageNum-5;
	var pagingNum=1+(nowPage-3);
	var pagingNum1=2+(nowPage-3);
	var pagingNum2=3+(nowPage-3);
	var pagingNum3=4+(nowPage-3);
	var pagingNum4=5+(nowPage-3);
	if(lfjPageNum == 1){
		$(dom+' .nextPage').attr('disabled','disabled');
	}else if(lfjPageNum != 1 && nowPage == lfjPageNum){
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
	}else if(lfjPageNum != 1 && nowPage == 1){
		$(dom+' .prevPage').attr('disabled','disabled').siblings('.nextPage').removeAttr('disabled');
	}else{
		if(numPage>0){
			if(nowPage>=3&&nowPage<lfjPageNum-1){
				$(dom+' .paging').find('a').eq(0).html(pagingNum)
				$(dom+' .paging').find('a').eq(1).html(pagingNum1)
				$(dom+' .paging').find('a').eq(2).html(pagingNum2)
				$(dom+' .paging').find('a').eq(3).html(pagingNum3)
				$(dom+' .paging').find('a').eq(4).html(pagingNum4)
				$(dom+' .paging').find('a').eq(2).addClass('active').siblings('a').removeClass('active')
				$(dom+' .prevPage').removeAttr('disabled');
				$(dom+' .nextPage').removeAttr('disabled');
			}else if(nowPage>=3&&nowPage==lfjPageNum-1){
				$(dom+' .paging').find('a').eq(0).html(lfjPageNum-4)
				$(dom+' .paging').find('a').eq(1).html(lfjPageNum-3)
				$(dom+' .paging').find('a').eq(2).html(lfjPageNum-2)
				$(dom+' .paging').find('a').eq(3).html(lfjPageNum-1)
				$(dom+' .paging').find('a').eq(4).html(lfjPageNum)
				$(dom+' .nextPage').removeAttr('disabled').siblings('.prevPage').removeAttr('disabled');
			}else if(nowPage>=3&&(nowPage==lfjPageNum)){
				$(dom+' .nextPage').attr('disabled','disabled').siblings('.prevPage').removeAttr('disabled');
			}else if(nowPage<3&&nowPage==1){
				$(dom+' .prevPage').attr('disabled','disabled').siblings('.nextPage').removeAttr('disabled');
			}else if(nowPage<3&&nowPage==2){
				if($(dom+' .paging').find('a').eq(0).html()!=1){
					$(dom+' .paging').find('a').eq(0).html(1)
					$(dom+' .paging').find('a').eq(1).html(2)
					$(dom+' .paging').find('a').eq(2).html(3)
					$(dom+' .paging').find('a').eq(3).html(4)
					$(dom+' .paging').find('a').eq(4).html(5)
					$(dom+' .paging').find('a').eq(1).addClass('active').siblings('a').removeClass('active')
				}
				$(dom+' .nextPage').removeAttr('disabled').siblings('.prevPage').removeAttr('disabled');
			}
		}else{
			$(dom+' .prevPage').removeAttr('disabled');
			$(dom+' .nextPage').removeAttr('disabled');
		}
	}
	user_Order_nofirst(platform_content_record3,status,search_val,start_date,end_date,nowPage);
	$('#platform_content_record5').find('.switch_imgs1').attr('status','open')
	$('#platform_content_record5').find('.switch_imgs1').attr('src','./images/checkoff.png')
	$('#platform_content_record5').find('.checkon').attr('status','open')
	$('#platform_content_record5').find('.checkon').attr('src','./images/checkoffShape.png')
}

function reverseNumberPage_financial_Settlement(dom,obj,type,product_name,ins_id,create_start,create_end,status){
	nowPage = $(obj).text();//当前页码
	$(obj).addClass('active').siblings().removeClass('active');
	if(lfjPageNum == 1){
		$(dom+' .nextPage').attr('disabled','disabled');
	}else if(lfjPageNum != 1 && nowPage == lfjPageNum){
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
	}else if(lfjPageNum != 1 && nowPage == 1){
		$(dom+' .prevPage').attr('disabled','disabled').siblings('.nextPage').removeAttr('disabled');
	}else{
		if(numPage>0){
			if(nowPage>=3&&nowPage<lfjPageNum-1){
				$(dom+' .paging').find('a').eq(0).html(pagingNum)
				$(dom+' .paging').find('a').eq(1).html(pagingNum1)
				$(dom+' .paging').find('a').eq(2).html(pagingNum2)
				$(dom+' .paging').find('a').eq(3).html(pagingNum3)
				$(dom+' .paging').find('a').eq(4).html(pagingNum4)
				$(dom+' .paging').find('a').eq(2).addClass('active').siblings('a').removeClass('active')
				$(dom+' .prevPage').removeAttr('disabled');
				$(dom+' .nextPage').removeAttr('disabled');
			}else if(nowPage>=3&&nowPage==lfjPageNum-1){
				$(dom+' .paging').find('a').eq(0).html(lfjPageNum-4)
				$(dom+' .paging').find('a').eq(1).html(lfjPageNum-3)
				$(dom+' .paging').find('a').eq(2).html(lfjPageNum-2)
				$(dom+' .paging').find('a').eq(3).html(lfjPageNum-1)
				$(dom+' .paging').find('a').eq(4).html(lfjPageNum)
				$(dom+' .nextPage').removeAttr('disabled').siblings('.prevPage').removeAttr('disabled');
			}else if(nowPage>=3&&(nowPage==lfjPageNum)){
				$(dom+' .nextPage').attr('disabled','disabled').siblings('.prevPage').removeAttr('disabled');
			}else if(nowPage<3&&nowPage==1){
				$(dom+' .prevPage').attr('disabled','disabled').siblings('.nextPage').removeAttr('disabled');
			}else if(nowPage<3&&nowPage==2){
				if($(dom+' .paging').find('a').eq(0).html()!=1){
					$(dom+' .paging').find('a').eq(0).html(1)
					$(dom+' .paging').find('a').eq(1).html(2)
					$(dom+' .paging').find('a').eq(2).html(3)
					$(dom+' .paging').find('a').eq(3).html(4)
					$(dom+' .paging').find('a').eq(4).html(5)
					$(dom+' .paging').find('a').eq(1).addClass('active').siblings('a').removeClass('active')
				}
				$(dom+' .nextPage').removeAttr('disabled').siblings('.prevPage').removeAttr('disabled');
			}
		}else{
			$(dom+' .prevPage').removeAttr('disabled');
			$(dom+' .nextPage').removeAttr('disabled');
		}
	}
	financial_Settlement_nofirst(platform_content_record3,type,product_name,create_start,create_end,status,nowPage);
	$('#platform_content_record7').find('.switch_imgs2').attr('status','open')
	$('#platform_content_record7').find('.switch_imgs2').attr('src','./images/checkoff.png')
	$('#platform_content_record7').find('.checkon').attr('status','open')
	$('#platform_content_record7').find('.checkon').attr('src','./images/checkoffShape.png')
}

function reverseNumberPage_Billdetails(dom,obj,id,type,page,create_start,create_end,order_val,time_type,app_val,source_type){
	nowPage = $(obj).text();//当前页码
	$(obj).addClass('active').siblings().removeClass('active');
	var numPage=lfjPageNum-5;
	var pagingNum=1+(nowPage-3);
	var pagingNum1=2+(nowPage-3);
	var pagingNum2=3+(nowPage-3);
	var pagingNum3=4+(nowPage-3);
	var pagingNum4=5+(nowPage-3);
	if(lfjPageNum == 1){
		$(dom+' .nextPage').attr('disabled','disabled');
	}else if(lfjPageNum != 1 && nowPage == lfjPageNum){
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
	}else if(lfjPageNum != 1 && nowPage == 1){
		$(dom+' .prevPage').attr('disabled','disabled').siblings('.nextPage').removeAttr('disabled');
	}else{
		if(numPage>0){
			if(nowPage>=3&&nowPage<lfjPageNum-1){
				$(dom+' .paging').find('a').eq(0).html(pagingNum)
				$(dom+' .paging').find('a').eq(1).html(pagingNum1)
				$(dom+' .paging').find('a').eq(2).html(pagingNum2)
				$(dom+' .paging').find('a').eq(3).html(pagingNum3)
				$(dom+' .paging').find('a').eq(4).html(pagingNum4)
				$(dom+' .paging').find('a').eq(2).addClass('active').siblings('a').removeClass('active')
				$(dom+' .prevPage').removeAttr('disabled');
				$(dom+' .nextPage').removeAttr('disabled');
			}else if(nowPage>=3&&nowPage==lfjPageNum-1){
				$(dom+' .paging').find('a').eq(0).html(lfjPageNum-4)
				$(dom+' .paging').find('a').eq(1).html(lfjPageNum-3)
				$(dom+' .paging').find('a').eq(2).html(lfjPageNum-2)
				$(dom+' .paging').find('a').eq(3).html(lfjPageNum-1)
				$(dom+' .paging').find('a').eq(4).html(lfjPageNum)
				$(dom+' .nextPage').removeAttr('disabled').siblings('.prevPage').removeAttr('disabled');
			}else if(nowPage>=3&&(nowPage==lfjPageNum)){
				$(dom+' .nextPage').attr('disabled','disabled').siblings('.prevPage').removeAttr('disabled');
			}else if(nowPage<3&&nowPage==1){
				$(dom+' .prevPage').attr('disabled','disabled').siblings('.nextPage').removeAttr('disabled');
			}else if(nowPage<3&&nowPage==2){
				if($(dom+' .paging').find('a').eq(0).html()!=1){
					$(dom+' .paging').find('a').eq(0).html(1)
					$(dom+' .paging').find('a').eq(1).html(2)
					$(dom+' .paging').find('a').eq(2).html(3)
					$(dom+' .paging').find('a').eq(3).html(4)
					$(dom+' .paging').find('a').eq(4).html(5)
					$(dom+' .paging').find('a').eq(1).addClass('active').siblings('a').removeClass('active')
				}
				$(dom+' .nextPage').removeAttr('disabled').siblings('.prevPage').removeAttr('disabled');
			}
		}else{
			$(dom+' .prevPage').removeAttr('disabled');
			$(dom+' .nextPage').removeAttr('disabled');
		}
	}
	Billdetails_nofirst(dom,id,type,nowPage,create_start,create_end,order_val,time_type,app_val,source_type);
	$('#platform_content_record8').find('.switch_imgs3').attr('status','open')
	$('#platform_content_record8').find('.switch_imgs3').attr('src','./images/checkoff.png')
	$('#platform_content_record8').find('.checkon').attr('status','open')
	$('#platform_content_record8').find('.checkon').attr('src','./images/checkoffShape.png')
}
//end
//点击“上一页”
function reversePrevPage(dom,obj,type,start_date,end_date,platform_content_record3,status,search_val){
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
		Product_promotion_nofirst(nowPage-1,type,start_date,end_date,platform_content_record3,status,search_val);
	}else if(nowPage-1==2){
		$(dom+' .page.active').removeClass('active').prev().addClass('active');
		Product_promotion_nofirst(nowPage-1,type,start_date,end_date,platform_content_record3,status,search_val);
	}else if(nowPage-1==1){
		$(dom+' .page.active').removeClass('active').prev().addClass('active');
		$(dom+' .prevPage').attr('disabled','disabled');
		Product_promotion_nofirst(nowPage-1,type,start_date,end_date,platform_content_record3,status,search_val);
	}else{
		$(dom+' .prevPage').attr('disabled','disabled');
	}
	$(dom+' .nextPage').removeAttr('disabled');//  打开下一页按钮    不请求接口
	
}

function reversePrevPage_user_Order(dom,obj,platform_content_record3,status,search_val,start_date,end_date,page){
	nowPage = $(dom+' .page.active').text();//当前页码
	var numPage=lfjPageNum-5;
	var pagingNum=1+(nowPage-3-1);
	var pagingNum1=2+(nowPage-3-1);
	var pagingNum2=3+(nowPage-3-1);
	var pagingNum3=4+(nowPage-3-1);
	var pagingNum4=5+(nowPage-3-1);
	if(nowPage-1 > 2){
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
		
		user_Order_nofirst(platform_content_record3,status,search_val,start_date,end_date,nowPage-1);
		
	}else if(nowPage-1==2){
		$(dom+' .page.active').removeClass('active').prev().addClass('active');
		user_Order_nofirst(platform_content_record3,status,search_val,start_date,end_date,nowPage-1);
	}else if(nowPage-1==1){
		$(dom+' .page.active').removeClass('active').prev().addClass('active');
		$(dom+' .prevPage').attr('disabled','disabled');
		user_Order_nofirst(platform_content_record3,status,search_val,start_date,end_date,nowPage-1);
	}else{
		$(dom+' .prevPage').attr('disabled','disabled');
	}
	$(dom+' .nextPage').removeAttr('disabled');
	$('#platform_content_record5').find('.switch_imgs1').attr('status','open')
	$('#platform_content_record5').find('.switch_imgs1').attr('src','./images/checkoff.png')
	$('#platform_content_record5').find('.checkon').attr('status','open')
	$('#platform_content_record5').find('.checkon').attr('src','./images/checkoffShape.png')
	
}

function reversePrevPage_financial_Settlement(dom,obj,type,product_name,create_start,create_end,status){
	nowPage = $(dom+' .page.active').text();//当前页码
	var numPage=lfjPageNum-5;
	var pagingNum=1+(nowPage-3-1);
	var pagingNum1=2+(nowPage-3-1);
	var pagingNum2=3+(nowPage-3-1);
	var pagingNum3=4+(nowPage-3-1);
	var pagingNum4=5+(nowPage-3-1);
	if(nowPage-1 > 2){
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
		financial_Settlement_nofirst(platform_content_record3,type,product_name,create_start,create_end,status,nowPage-1);
		
	}else if(nowPage-1==2){
		$(dom+' .page.active').removeClass('active').prev().addClass('active');
		financial_Settlement_nofirst(platform_content_record3,type,product_name,create_start,create_end,status,nowPage-1);
	}else if(nowPage-1==1){
		$(dom+' .page.active').removeClass('active').prev().addClass('active');
		$(dom+' .prevPage').attr('disabled','disabled');
		financial_Settlement_nofirst(platform_content_record3,type,product_name,create_start,create_end,status,nowPage-1);
	}else{
		$(dom+' .prevPage').attr('disabled','disabled');
	}
	$(dom+' .nextPage').removeAttr('disabled');
	$('#platform_content_record7').find('.switch_imgs2').attr('status','open')
	$('#platform_content_record7').find('.switch_imgs2').attr('src','./images/checkoff.png')
	$('#platform_content_record7').find('.checkon').attr('status','open')
	$('#platform_content_record7').find('.checkon').attr('src','./images/checkoffShape.png')
	
}

function reversePrevPage_Billdetails(dom,obj,id,type,page,create_start,create_end,order_val,time_type,app_val,source_type){
	nowPage = $(dom+' .page.active').text();//当前页码
	var numPage=lfjPageNum-5;
	var pagingNum=1+(nowPage-3-1);
	var pagingNum1=2+(nowPage-3-1);
	var pagingNum2=3+(nowPage-3-1);
	var pagingNum3=4+(nowPage-3-1);
	var pagingNum4=5+(nowPage-3-1);
	if(nowPage-1 > 2){
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
		Billdetails_nofirst(dom,id,type,nowPage-1,create_start,create_end,order_val,time_type,app_val,source_type);
		
	}else if(nowPage-1==2){
		$(dom+' .page.active').removeClass('active').prev().addClass('active');
		Billdetails_nofirst(dom,id,type,nowPage-1,create_start,create_end,order_val,time_type,app_val,source_type);
	}else if(nowPage-1==1){
		$(dom+' .page.active').removeClass('active').prev().addClass('active');
		$(dom+' .prevPage').attr('disabled','disabled');
		Billdetails_nofirst(dom,id,type,nowPage-1,create_start,create_end,order_val,time_type,app_val,source_type);
	}else{
		$(dom+' .prevPage').attr('disabled','disabled');
	}
	$(dom+' .nextPage').removeAttr('disabled');
	$('#platform_content_record8').find('.switch_imgs3').attr('status','open')
	$('#platform_content_record8').find('.switch_imgs3').attr('src','./images/checkoff.png')
	$('#platform_content_record8').find('.checkon').attr('status','open')
	$('#platform_content_record8').find('.checkon').attr('src','./images/checkoffShape.png')
	
}
//end

//点击“下一页”
function reverseNextPage(dom,obj,type,start_date,end_date,platform_content_record3,status,search_val){
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
			Product_promotion_nofirst(Number(nowPage)+1,type,start_date,end_date,platform_content_record3,status,search_val);
			
		}else if(Number(nowPage)+1 == nowPagenum){
			$(dom+' .page.active').removeClass('active').next().addClass('active');
			$(dom+' .nextPage').attr('disabled','disabled');
			Product_promotion_nofirst(Number(nowPage)+1,type,start_date,end_date,platform_content_record3,status,search_val);
		}else{
			$(dom+' .nextPage').attr('disabled','disabled');
		}
		$(dom+' .prevPage').removeAttr('disabled');
		
	}
function reverseNextPage_user_Order(dom,obj,platform_content_record3,status,search_val,start_date,end_date,page){
	nowPage = $(dom+' .page.active').text();//当前页码
	var nowPagenum=lfjPageNum;
		var numPage=lfjPageNum-5;
	var pagingNum=1+(nowPage-2);
	var pagingNum1=2+(nowPage-2);
	var pagingNum2=3+(nowPage-2);
	var pagingNum3=4+(nowPage-2);
	var pagingNum4=5+(nowPage-2);
		if(Number(nowPage)+1 < nowPagenum){   

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
			user_Order_nofirst(platform_content_record3,status,search_val,start_date,end_date,Number(nowPage)+1);
			
		}else if(Number(nowPage)+1 == nowPagenum){
			$(dom+' .page.active').removeClass('active').next().addClass('active');
			$(dom+' .nextPage').attr('disabled','disabled');
			user_Order_nofirst(platform_content_record3,status,search_val,start_date,end_date,Number(nowPage)+1);
		}else{
			$(dom+' .nextPage').attr('disabled','disabled');
		}
		$(dom+' .prevPage').removeAttr('disabled');
		$('#platform_content_record5').find('.switch_imgs1').attr('status','open')
		$('#platform_content_record5').find('.switch_imgs1').attr('src','./images/checkoff.png')
		$('#platform_content_record5').find('.checkon').attr('status','open')
		$('#platform_content_record5').find('.checkon').attr('src','./images/checkoffShape.png')
	}
function reverseNextPage_financial_Settlement(dom,obj,type,product_name,create_start,create_end,status){
	nowPage = $(dom+' .page.active').text();//当前页码
	var nowPagenum=lfjPageNum;
	var numPage=lfjPageNum-5;
	var pagingNum=1+(nowPage-2);
	var pagingNum1=2+(nowPage-2);
	var pagingNum2=3+(nowPage-2);
	var pagingNum3=4+(nowPage-2);
	var pagingNum4=5+(nowPage-2);
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
		financial_Settlement_nofirst(platform_content_record3,type,product_name,create_start,create_end,status,Number(nowPage)+1);
		
	}else if(Number(nowPage)+1 == nowPagenum){
		$(dom+' .page.active').removeClass('active').next().addClass('active');
		$(dom+' .nextPage').attr('disabled','disabled');
		financial_Settlement_nofirst(platform_content_record3,type,product_name,create_start,create_end,status,Number(nowPage)+1);
	}else{
		$(dom+' .nextPage').attr('disabled','disabled');
	}
	$(dom+' .prevPage').removeAttr('disabled');
	$('#platform_content_record7').find('.switch_imgs2').attr('status','open')
	$('#platform_content_record7').find('.switch_imgs2').attr('src','./images/checkoff.png')
	$('#platform_content_record7').find('.checkon').attr('status','open')
	$('#platform_content_record7').find('.checkon').attr('src','./images/checkoffShape.png')
}

function reverseNextPage_Billdetails(dom,obj,id,type,page,create_start,create_end,order_val,time_type,app_val,source_type){
	nowPage = $(dom+' .page.active').text();//当前页码
	var nowPagenum=lfjPageNum;
	var numPage=lfjPageNum-5;
	var pagingNum=1+(nowPage-2);
	var pagingNum1=2+(nowPage-2);
	var pagingNum2=3+(nowPage-2);
	var pagingNum3=4+(nowPage-2);
	var pagingNum4=5+(nowPage-2);
		if(Number(nowPage)+1 < nowPagenum-1){	//当前页码小于倒数第二页    

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
		Billdetails_nofirst(dom,id,type,Number(nowPage)+1,create_start,create_end,order_val,time_type,app_val,source_type);
		
	}else if(Number(nowPage)+1 == nowPagenum){
		$(dom+' .page.active').removeClass('active').next().addClass('active');
		$(dom+' .nextPage').attr('disabled','disabled');
		Billdetails_nofirst(dom,id,type,Number(nowPage)+1,create_start,create_end,order_val,time_type,app_val,source_type);
	}else{
		$(dom+' .nextPage').attr('disabled','disabled');
	}
	$(dom+' .prevPage').removeAttr('disabled');
	$('#platform_content_record8').find('.switch_imgs3').attr('status','open')
	$('#platform_content_record8').find('.switch_imgs3').attr('src','./images/checkoff.png')
	$('#platform_content_record8').find('.checkon').attr('status','open')
	$('#platform_content_record8').find('.checkon').attr('src','./images/checkoffShape.png')
}
//end

/*

	产品合作数据请求

*/
function Product_promotion(type,start_date,end_date,platform_content_record3,status,search_val){
	
	$.ajax({				
		type: "post",
        async: true,
        url: getPostUrl()+'/CompanyApply/lists',
        data:{
        	'type':type,
        	'status':status,
        	"search_val":search_val,
        	"start_date": start_date,
			"end_date": end_date,
			"limit": 8
        },
        dataType: "json",
        success: function(json){
        	var str='';
        	if(json.status==1){
        		var num =Math.ceil(json.url/8);
        		if(type==1){
        			for(var i=0;i<json.info.length;){
	    				str+='<ul class="product_conter" style="display:'+(json.info[i]?"":"none")+'">'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].code?json.info[i].code:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].create_time?json.info[i].create_time:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].product.name?json.info[i].product.name:"-")+'</li>'
							if(json.info[i]&&json.info[i].product&&json.info[i].product.tgf_plat!=''&&json.info[i].product.tgf_plat!=null){
			         			if(json.info[i].product.tgf_plat.type!=''&&json.info[i].product.tgf_plat.type!=null&&json.info[i].product.tgf_plat.type==1){
				         			str+='<li class="l" style="overflow:hidden;">'+json.info[i].product.tgf_plat.val+'元</li>'
				         		}else if(json.info[i].product.tgf_plat.type!=''&&json.info[i].product.tgf_plat.type!=null&&json.info[i].product.tgf_plat.type==2){
				         			str+='<li class="l" style="overflow:hidden;">'+json.info[i].product.tgf_plat.val+'%</li>'
				         		}else{
				         			str+='<li class="l">-</li>'
				         		}
			         		}else{
			         			str+='<li class="l">-</li>'
			         		}
			         		if(json.info[i]&&json.info[i].product.is_api&&json.info[i].product.is_api==1){
			         			if(json.info[i]&&json.info[i].product.exten&&json.info[i].product.exten.length==1){
									if(json.info[i].product.exten[0].type==1){
										str+='<li class="l"><img sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" class="left Get_promotion_methods_over" type="1" src="./images/QRcode.png" alt="" ><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
									}else if(json.info[i].product.exten[0].type==2){
										str+='<li class="l"><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
									}
								}else if(json.info[i]&&json.info[i].product.exten&&json.info[i].product.exten.length==2){
									if(json.info[i].product.exten[0].type==1){
										str+='<li class="l"><img type="1"  sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
									}else if(json.info[i].product.exten[0].type==2){
										str+='<li class="l"><img type="1"  sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img clas="Get_promotion_methods_over" type="2" sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
									}
								}else if(json.info[i]&&json.info[i].product.exten&&json.info[i].product.exten.length==3){
									str+='<li class="l"><img type="1"  sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}else{
									str+='<li class="l">-</li>'
								}
			         		}else if(json.info[i]&&json.info[i].product.is_api&&json.info[i].product.is_api==0){
			         			str+='<li class="l"><a class="contactService" href="javascript:;">联系客服</a></li>'
			         		}
							
						str+='</ul>'
						str+='<ul class="product_conter1" style="display:'+(json.info[i+1]?"":"none")+'">'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].code?json.info[i+1].code:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].create_time?json.info[i+1].create_time:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].product.name?json.info[i+1].product.name:"-")+'</li>'
							if(json.info[i+1]&&json.info[i+1].product&&json.info[i+1].product.tgf_plat!=''&&json.info[i+1].product.tgf_plat!=null){
			         			if(json.info[i+1].product.tgf_plat.type!=''&&json.info[i+1].product.tgf_plat.type!=null&&json.info[i+1].product.tgf_plat.type==1){
				         			str+='<li class="l" style="overflow:hidden;">'+json.info[i+1].product.tgf_plat.val+'元</li>'
				         		}else if(json.info[i+1].product.tgf_plat.type!=''&&json.info[i+1].product.tgf_plat.type!=null&&json.info[i+1].product.tgf_plat.type==2){
				         			str+='<li class="l" style="overflow:hidden;">'+json.info[i+1].product.tgf_plat.val+'%</li>'
				         		}else{
				         			str+='<li class="l">-</li>'
				         		}
			         		}else{
			         			str+='<li class="l">-</li>'
			         		}
			         		
							if(json.info[i+1]&&json.info[i+1].product.is_api&&json.info[i+1].product.is_api==1){
								if(json.info[i+1]&&json.info[i+1].product.exten&&json.info[i+1].product.exten.length==1){
									if(json.info[i+1].product.exten[0].type==1){
										str+='<li class="l"><img sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" class="left Get_promotion_methods_over" type="1" src="./images/QRcode.png" alt=""/><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
									}else if(json.info[i+1].product.exten[0].type==2){
										str+='<li class="l"><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
									}
								}else if(json.info[i+1]&&json.info[i+1].product.exten&&json.info[i+1].product.exten.length==2){
									if(json.info[i+1].product.exten[0].type==1){
										str+='<li class="l"><img type="1"  sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
									}else if(json.info[i+1].product.exten[0].type==2){
										str+='<li class="l"><img type="1" sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
									}
								}else if(json.info[i+1]&&json.info[i+1].product.exten&&json.info[i+1].product.exten.length==3){
									str+='<li class="l"><img type="1"  sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'"  sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'"  class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'"  sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'"  src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}else{
									str+='<li class="l">-</li>'
								}
							}else if(json.info[i+1]&&json.info[i+1].product.is_api&&json.info[i+1].product.is_api==0){
								str+='<li class="l"><a class="contactService" href="javascript:;">联系客服</a></li>'
							}
							
							
						str+='</ul>'
						i=i+2;
	    			}
	    			
        		}else if(type==2){
        			for(var i=0;i<json.info.length;){
        				str+='<ul class="product_conter" style="display:'+(json.info[i]?"":"none")+'">'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].code?json.info[i].code:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].create_time?json.info[i].create_time:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].scene_name?json.info[i].scene_name:"-")+'</li>'
							if(json.info[i]&&json.info[i].status==1){
								str+='<li class="l">待签约</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'
							}else if(json.info[i]&&json.info[i].status==2){
								str+='<li class="l">已签约</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'
							}else if(json.info[i]&&json.info[i].status==3){
								str+='<li class="l">驳回</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'
							}else if(json.info[i]&&json.info[i].status==4){
								str+='<li class="l">已定制</li>'+
									'<li class="l">'+(json.info[i]&&json.info[i].product&&json.info[i].product.name?json.info[i].product.name:"-")+'</li>'+
									'<li class="l">'+(json.info[i]&&json.info[i].product&&json.info[i].product.start_date?json.info[i].product.start_date:"-")+'</li>'+
									'<li class="l">'+(json.info[i]&&json.info[i].product&&json.info[i].product.end_date?json.info[i].product.end_date:"-")+'</li>'
									if(json.info[i]&&json.info[i].product&&json.info[i].product.tgf_plat!=''&&json.info[i].product.tgf_plat!=null){
					         			if(json.info[i].product.tgf_plat.type!=''&&json.info[i].product.tgf_plat.type!=null&&json.info[i].product.tgf_plat.type==1){
						         			str+='<li class="l" style="overflow:hidden;">'+json.info[i].product.tgf_plat.val+'元</li>'
						         		}else if(json.info[i].product.tgf_plat.type!=''&&json.info[i].product.tgf_plat.type!=null&&json.info[i].product.tgf_plat.type==2){
						         			str+='<li class="l" style="overflow:hidden;">'+json.info[i].product.tgf_plat.val+'%</li>'
						         		}else{
						         			str+='<li class="l">-</li>'
						         		}
					         		}else{
					         			str+='<li class="l">-</li>'
					         		}
							}
							
							if(json.info[i]&&json.info[i].product.exten&&json.info[i].product.exten.length==1){
								if(json.info[i].product.exten[0].type==1){
									str+='<li class="l"><img sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt="" type="1" ><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}else if(json.info[i].product.exten[0].type==2){
									str+='<li class="l"><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}
							}else if(json.info[i]&&json.info[i].product.exten&&json.info[i].product.exten.length==2){
								if(json.info[i].product.exten[0].type==1){
									str+='<li class="l"><img type="1"  sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over"type="2" sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}else if(json.info[i].product.exten[0].type==2){
									str+='<li class="l"><img type="1"  sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}
							}else if(json.info[i]&&json.info[i].product.exten&&json.info[i].product.exten.length==3){
								str+='<li class="l"><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" src="./images/link.png" alt=""><img type="1"  sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
							}else{
								str+='<li class="l">-</li>'
							}
						str+='</ul>'
						str+='<ul class="product_conter1" style="display:'+(json.info[i+1]?"":"none")+'">'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].code?json.info[i+1].code:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].create_time?json.info[i+1].create_time:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].scene_name?json.info[i+1].scene_name:"-")+'</li>'
							if(json.info[i+1]&&json.info[i+1].status==1){
								str+='<li class="l">待签约</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'
							}else if(json.info[i+1]&&json.info[i+1].status==2){
								str+='<li class="l">已签约</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'
							}else if(json.info[i+1]&&json.info[i+1].status==3){
								str+='<li class="l">驳回</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'
							}else if(json.info[i+1]&&json.info[i+1].status==4){
								str+='<li class="l">已定制</li>'+
									'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].product&&json.info[i+1].product.name?json.info[i+1].product.name:"-")+'</li>'+
									'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].product&&json.info[i+1].product.start_date?json.info[i+1].product.start_date:"-")+'</li>'+
									'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].product&&json.info[i+1].product.end_date?json.info[i+1].product.end_date:"-")+'</li>'
									if(json.info[i+1]&&json.info[i+1].product&&json.info[i+1].product.tgf_plat!=''&&json.info[i+1].product.tgf_plat!=null){
					         			if(json.info[i+1].product.tgf_plat.type!=''&&json.info[i+1].product.tgf_plat.type!=null&&json.info[i+1].product.tgf_plat.type==1){
						         			str+='<li class="l" style="overflow:hidden;">'+json.info[i+1].product.tgf_plat.val+'元</li>'
						         		}else if(json.info[i+1].product.tgf_plat.type!=''&&json.info[i+1].product.tgf_plat.type!=null&&json.info[i+1].product.tgf_plat.type==2){
						         			str+='<li class="l" style="overflow:hidden;">'+json.info[i+1].product.tgf_plat.val+'%</li>'
						         		}else{
						         			str+='<li class="l">-</li>'
						         		}
					         		}else{
					         			str+='<li class="l">-</li>'
					         		}
					         		
							}
							
							
							if(json.info[i+1]&&json.info[i+1].product.exten&&json.info[i+1].product.exten.length==1){
								if(json.info[i+1].product.exten[0].type==1){
									str+='<li class="l"><img sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt="" type="1" ><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}else if(json.info[i+1].product.exten[0].type==2){
									str+='<li class="l"><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}
							}else if(json.info[i+1]&&json.info[i+1].product.exten&&json.info[i+1].product.exten.length==2){
								if(json.info[i+1].product.exten[0].type==1){
									str+='<li class="l"><img type="1"  sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}else if(json.info[i+1].product.exten[0].type==2){
									str+='<li class="l"><img type="1"  sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}
							}else if(json.info[i+1]&&json.info[i+1].product.exten&&json.info[i+1].product.exten.length==3){
								str+='<li class="l"><img type="1"  sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'"  sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'"  class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'"  sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'"  src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
							}else{
								str+='<li class="l">-</li>'
							}
						str+='</ul>'
						i=i+2;
        			}

        		}
        		$(platform_content_record3+' .paging').find('a').remove('.page');
				$(platform_content_record3+' .paging').find('a').remove('.active');
				$(platform_content_record3+' .paging').find('a').remove('a');
				$(platform_content_record3).find('.product_conter').remove();
        		$(platform_content_record3).find('.product_conter1').remove();
        		$(platform_content_record3).find('.product_header').after(str);
    			if(num!=0&&num!=''&&num!=null){
    				pageEvent(platform_content_record3,num,type,start_date,end_date,platform_content_record3,status,search_val);
    			}else{
    				$(platform_content_record3+' .paging').find('.page').remove()
    				$(platform_content_record3+'  .nextPage').hide();
					$(platform_content_record3+'  .prevPage').hide();
					if(type==1){
						for(var i=0;i<3;i++){
							str+='<ul class="product_conter">'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
							'</ul>'
							str+='<ul class="product_conter1">'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
							'</ul>'

						}
					}else if(type==2){
						for(var i=0;i<3;i++){
							str+='<ul class="product_conter">'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
							'</ul>'
							str+='<ul class="product_conter1">'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
								'<li class="l"></li>'+
							'</ul>'

						}
					}
					$(platform_content_record3).find('.product_header').after(str);
					
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

	产品合作数据请求

*/
function Product_promotion_nofirst(page,type,start_date,end_date,platform_content_record3,status,search_val){
	if(page==null||page=="null"){
		page='';
	}
	if(type==null||type=="null"){
		type='';
	}
	if(start_date==null||start_date=="null"){
		start_date='';
	}
	if(end_date==null||end_date=="null"){
		end_date='';
	}
	if(platform_content_record3==null||platform_content_record3=="null"){
		platform_content_record3='';
	}
	if(status==null||status=="null"){
		status='';
	}
	if(search_val==null||search_val=="null"){
		search_val='';
	}
	$.ajax({				
		type: "post",
        async: true,
        url: getPostUrl()+'/CompanyApply/lists',
        data:{
        	'type':type,
        	'status':status,
        	"search_val":search_val,
        	"start_date": start_date,
			"end_date": end_date,
			"limit": 8,
			"page":page
        },
        dataType: "json",
        success: function(json){
        	var str='';
        	if(json.status==1){
        		var num =Math.ceil(json.url/8);
        		if(type==1){
        			for(var i=0;i<json.info.length;){
	    				str+='<ul class="product_conter" style="display:'+(json.info[i]?"":"none")+'">'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].code?json.info[i].code:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].create_time?json.info[i].create_time:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].product.name?json.info[i].product.name:"-")+'</li>'
							if(json.info[i]&&json.info[i].product&&json.info[i].product.tgf_plat!=''&&json.info[i].product.tgf_plat!=null){
			         			if(json.info[i].product.tgf_plat.type!=''&&json.info[i].product.tgf_plat.type!=null&&json.info[i].product.tgf_plat.type==1){
				         			str+='<li class="l" style="overflow:hidden;">'+json.info[i].product.tgf_plat.val+'元</li>'
				         		}else if(json.info[i].product.tgf_plat.type!=''&&json.info[i].product.tgf_plat.type!=null&&json.info[i].product.tgf_plat.type==2){
				         			str+='<li class="l" style="overflow:hidden;">'+json.info[i].product.tgf_plat.val+'%</li>'
				         		}else{
				         			str+='<li class="l">-</li>'
				         		}
			         		}else{
			         			str+='<li class="l">-</li>'
			         		}
			         		if(json.info[i]&&json.info[i].product.is_api&&json.info[i].product.is_api==1){
								if(json.info[i]&&json.info[i].product.exten&&json.info[i].product.exten.length==1){
									if(json.info[i].product.exten[0].type==1){
										str+='<li class="l"><img sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt="" type="1" ><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
									}else if(json.info[i].product.exten[0].type==2){
										str+='<li class="l"><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
									}
								}else if(json.info[i]&&json.info[i].product.exten&&json.info[i].product.exten.length==2){
									if(json.info[i].product.exten[0].type==1){
										str+='<li class="l"><img type="1"  sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
									}else if(json.info[i].product.exten[0].type==2){
										str+='<li class="l"><img type="1"  sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
									}
								}else if(json.info[i]&&json.info[i].product.exten&&json.info[i].product.exten.length==3){
									str+='<li class="l"><img sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" class="left" src="./images/QRcode.png" alt=""><img sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}else{
									str+='<li class="l">-</li>'
								}
			         		}else if(json.info[i]&&json.info[i].product.is_api&&json.info[i].product.is_api==0){
								str+='<li class="l"><a class="contactService" href="javascript:;">联系客服</a></li>'
			         		}
							
							
						str+='</ul>'
						str+='<ul class="product_conter1" style="display:'+(json.info[i+1]?"":"none")+'">'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].code?json.info[i+1].code:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].create_time?json.info[i+1].create_time:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].product.name?json.info[i+1].product.name:"-")+'</li>'
							if(json.info[i+1]&&json.info[i+1].product&&json.info[i+1].product.tgf_plat!=''&&json.info[i+1].product.tgf_plat!=null){
			         			if(json.info[i+1].product.tgf_plat.type!=''&&json.info[i+1].product.tgf_plat.type!=null&&json.info[i+1].product.tgf_plat.type==1){
				         			str+='<li class="l" style="overflow:hidden;">'+json.info[i+1].product.tgf_plat.val+'元</li>'
				         		}else if(json.info[i+1].product.tgf_plat.type!=''&&json.info[i+1].product.tgf_plat.type!=null&&json.info[i+1].product.tgf_plat.type==2){
				         			str+='<li class="l" style="overflow:hidden;">'+json.info[i+1].product.tgf_plat.val+'%</li>'
				         		}else{
				         			str+='<li class="l">-</li>'
				         		}
			         		}else{
			         			str+='<li class="l">-</li>'
			         		}
			         		if(json.info[i+1]&&json.info[i+1].product.is_api&&json.info[i+1].product.is_api==1){
			         			if(json.info[i+1]&&json.info[i+1].product.exten&&json.info[i+1].product.exten.length==1){
									if(json.info[i+1].product.exten[0].type==1){
										str+='<li class="l"><img sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" class="left Get_promotion_methods_over" type="1" src="./images/QRcode.png" alt="" ><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
									}else if(json.info[i+1].product.exten[0].type==2){
										str+='<li class="l"><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
									}
								}else if(json.info[i+1]&&json.info[i+1].product.exten&&json.info[i+1].product.exten.length==2){
									if(json.info[i+1].product.exten[0].type==1){
										str+='<li class="l"><img type="1"  sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
									}else if(json.info[i+1].product.exten[0].type==2){
										str+='<li class="l"><img type="1"  sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
									}
								}else if(json.info[i+1]&&json.info[i+1].product.exten&&json.info[i+1].product.exten.length==3){
									str+='<li class="l"><img sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'"  sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'"  class="left" src="./images/QRcode.png" alt=""><img sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'"  sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'"  src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}else{
									str+='<li class="l">-</li>'
								}
			         		}else if(json.info[i+1]&&json.info[i+1].product.is_api&&json.info[i+1].product.is_api==0){
			         			str+='<li class="l"><a class="contactService" href="javascript:;">联系客服</a></li>'
			         		}
							
							
						str+='</ul>'
						i=i+2;
	    			}
	    			
        		}else if(type==2){
        			for(var i=0;i<json.info.length;){
        				str+='<ul class="product_conter" style="display:'+(json.info[i]?"":"none")+'">'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].code?json.info[i].code:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].create_time?json.info[i].create_time:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].scene_name?json.info[i].scene_name:"-")+'</li>'
							if(json.info[i]&&json.info[i].status==1){
								str+='<li class="l">待签约</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'
							}else if(json.info[i]&&json.info[i].status==2){
								str+='<li class="l">已签约</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'
							}else if(json.info[i]&&json.info[i].status==3){
								str+='<li class="l">驳回</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'
							}else if(json.info[i]&&json.info[i].status==4){
								str+='<li class="l">已定制</li>'+
									'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].product&&json.info[i].product.name?json.info[i].product.name:"-")+'</li>'+
									'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].product&&json.info[i].product.start_date?json.info[i].product.start_date:"-")+'</li>'+
									'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].product&&json.info[i].product.end_date?json.info[i].product.end_date:"-")+'</li>'
									if(json.info[i]&&json.info[i].product&&json.info[i].product.tgf_plat!=''&&json.info[i].product.tgf_plat!=null){
					         			if(json.info[i].product.tgf_plat.type!=''&&json.info[i].product.tgf_plat.type!=null&&json.info[i].product.tgf_plat.type==1){
						         			str+='<li class="l" style="overflow:hidden;">'+json.info[i].product.tgf_plat.val+'元</li>'
						         		}else if(json.info[i].product.tgf_plat.type!=''&&json.info[i].product.tgf_plat.type!=null&&json.info[i].product.tgf_plat.type==2){
						         			str+='<li class="l" style="overflow:hidden;">'+json.info[i].product.tgf_plat.val+'%</li>'
						         		}else{
						         			str+='<li class="l">-</li>'
						         		}
					         		}else{
					         			str+='<li class="l">-</li>'
					         		}
					         		
							}
							
							if(json.info[i]&&json.info[i].product.exten&&json.info[i].product.exten.length==1){
								if(json.info[i].product.exten[0].type==1){
									str+='<li class="l"><img sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" class="left Get_promotion_methods_over" type="1" src="./images/QRcode.png" alt="" ><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}else if(json.info[i].product.exten[0].type==2){
									str+='<li class="l"><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}
							}else if(json.info[i]&&json.info[i].product.exten&&json.info[i].product.exten.length==2){
								if(json.info[i].product.exten[0].type==1){
									str+='<li class="l"><img type="1"  sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}else if(json.info[i].product.exten[0].type==2){
									str+='<li class="l"><img type="1"  sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}
							}else if(json.info[i]&&json.info[i].product.exten&&json.info[i].product.exten.length==3){
								str+='<li class="l"><img type="1"  sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i]?json.info[i].product.id:"-")+'" sid1="'+(json.info[i]?json.info[i].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i]?json.info[i].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
							}else{
								str+='<li class="l">-</li>'
							}
						str+='</ul>'
						str+='<ul class="product_conter1" style="display:'+(json.info[i+1]?"":"none")+'">'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].code?json.info[i+1].code:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].create_time?json.info[i+1].create_time:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].scene_name?json.info[i+1].scene_name:"-")+'</li>'
							if(json.info[i+1]&&json.info[i+1].status==1){
								str+='<li class="l">待签约</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'
							}else if(json.info[i+1]&&json.info[i+1].status==2){
								str+='<li class="l">已签约</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'
							}else if(json.info[i+1]&&json.info[i+1].status==3){
								str+='<li class="l">驳回</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'+
									'<li class="l">-</li>'
							}else if(json.info[i+1]&&json.info[i+1].status==4){
								str+='<li class="l">已定制</li>'+
									'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].product&&json.info[i+1].product.name?json.info[i+1].product.name:"-")+'</li>'+
									'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].product&&json.info[i+1].product.start_date?json.info[i+1].product.start_date:"-")+'</li>'+
									'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].product&&json.info[i+1].product.end_date?json.info[i+1].product.end_date:"-")+'</li>'
									if(json.info[i+1]&&json.info[i+1].product&&json.info[i+1].product.tgf_plat!=''&&json.info[i+1].product.tgf_plat!=null){
					         			if(json.info[i+1].product.tgf_plat.type!=''&&json.info[i+1].product.tgf_plat.type!=null&&json.info[i+1].product.tgf_plat.type==1){
						         			str+='<li class="l" style="overflow:hidden;">'+json.info[i+1].product.tgf_plat.val+'元</li>'
						         		}else if(json.info[i+1].product.tgf_plat.type!=''&&json.info[i+1].product.tgf_plat.type!=null&&json.info[i+1].product.tgf_plat.type==2){
						         			str+='<li class="l" style="overflow:hidden;">'+json.info[i+1].product.tgf_plat.val+'%</li>'
						         		}else{
						         			str+='<li class="l">-</li>'
						         		}
					         		}else{
					         			str+='<li class="l">-</li>'
					         		}
					         		
							}
							
							
							if(json.info[i+1]&&json.info[i+1].product.exten&&json.info[i+1].product.exten.length==1){
								if(json.info[i+1].product.exten[0].type==1){
									str+='<li class="l"><img sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" class="left Get_promotion_methods_over" type="1" src="./images/QRcode.png" alt="" ><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}else if(json.info[i+1].product.exten[0].type==2){
									str+='<li class="l"><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}
							}else if(json.info[i+1]&&json.info[i+1].product.exten&&json.info[i+1].product.exten.length==2){
								if(json.info[i+1].product.exten[0].type==1){
									str+='<li class="l"><img type="1" sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}else if(json.info[i+1].product.exten[0].type==2){
									str+='<li class="l"><img type="1"  sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'" sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'" src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
								}
							}else if(json.info[i+1]&&json.info[i+1].product.exten&&json.info[i+1].product.exten.length==3){
								str+='<li class="l"><img type="1" sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'"  sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'"  class="left Get_promotion_methods_over" src="./images/QRcode.png" alt=""><img class="Get_promotion_methods_over" type="2" sid="'+(json.info[i+1]?json.info[i+1].product.id:"-")+'"  sid1="'+(json.info[i+1]?json.info[i+1].id:"-")+'"  src="./images/link.png" alt=""><div  class="Get_promotion_methods"><img class="img" src=""/><input type="text" class="p2" style="width:100%;margin-top:3rem;" /><p class="p1">获取二维码</p><p class="p Dow_QR_code_link" link_title="'+("\'"+(json.info[i+1]?json.info[i+1].product.name:"")+"\'")+'">获取二维码</p><b class="b"></b></div></li>'
							}else{
								str+='<li class="l">-</li>'
							}
						str+='</ul>'
						i=i+2;
        			}

        		}
        		$(platform_content_record3).find('.product_conter').remove();
        		$(platform_content_record3).find('.product_conter1').remove();
        		$(platform_content_record3).find('.product_header').after(str);
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

	用户订单数据请求

*/
function user_Order(platform_content_record3,status,search_val,start_date,end_date,page){
	
	$.ajax({				
		type: "post",
        async: true,
        url: getPostUrl()+'/Policy/lists',
        data:{
        	'status':status,
        	"product_name":search_val,
        	"create_start": start_date,
			"create_end": end_date,
			"limit": 8,
			"page":page
        },
        dataType: "json",
        success: function(json){
        	var str='';
        	if(json.status==1){
        		var num =Math.ceil(json.url/8);
        		
    			for(var i=0;i<json.info.length;){
    				str+='<ul class="product_conter" style="display:'+(json.info[i]?"":"none")+'">'+
    					'<li class="l" style="width: 20.65%;"><img src="./images/checkoffShape.png" status="open" class="checkon switch_img" sid="'+(json.info[i]&&json.info[i].id?json.info[i].id:"-")+'" alt="" style="display: inline;"><img sid="1" class="Expand_Detail img" src="./images/open.png" alt=""><span style="width:60%;">'+(json.info[i]?json.info[i].order_no:"-")+'</span></li>'+
						'<li class="l" style="overflow:hidden;">'+(json.info[i]?json.info[i].product.name:"-")+'</li>'+
						'<li class="l" style="overflow:hidden;">'+(json.info[i]?json.info[i].create_time:"-")+'</li>'+
						'<li class="l" style="width: 14.65%;">'+(json.info[i]?json.info[i].premium:"-")+'</li>'+
						'<li class="l" style="width: 14.65%;">'+(json.info[i]?json.info[i].tgf_plat:"-")+'</li>'
						if(json.info[i]&&json.info[i].status==1){
							str+='<li class="l" style="width: 14.65%;">核保中</li>'
						}else if(json.info[i]&&json.info[i].status==2){
							str+='<li class="l" style="width: 14.65%;">核保失败</li>'
						}else if(json.info[i]&&json.info[i].status==3){
							str+='<li class="l" style="width: 14.65%;">待支付</li>'
						}else if(json.info[i]&&json.info[i].status==4){
							str+='<li class="l" style="width: 14.65%;">已支付</li>'
						}
					str+='</ul>'+
					'<div class="expandInDetail">'+
						'<p>'+
							'<a href="javascript:;">投保人：'+(json.info[i]&&json.info[i].app_name?json.info[i].app_name:"-")+'</a>'
							if(json.info[i]&&json.info[i].exten==0){
								str+='<a href="javascript:;">推广方式：暂无</a>'
							}else if(json.info[i]&&json.info[i].exten==1){
								str+='<a href="javascript:;">推广方式：二维码</a>'
							}else if(json.info[i]&&json.info[i].exten==2){
								str+='<a href="javascript:;">推广方式：链接</a>'
							}else if(json.info[i]&&json.info[i].exten==3){
								str+='<a href="javascript:;">推广方式：API接口</a>'
							}
							
							
							if(json.info[i]&&json.info[i].under_status==0){
								str+='<a href="javascript:;">承保结果：未承保</a>'
							}else if(json.info[i]&&json.info[i].under_status==1){
								str+='<a href="javascript:;">承保结果：成功</a>'
							} if(json.info[i]&&json.info[i].under_status==2){
								str+='<a href="javascript:;">承保结果：失败</a>'
							}
						str+='</p>'+
						'<p>'+
							'<a href="javascript:;">保单号： '+(json.info[i]&&json.info[i].policy_no?json.info[i].policy_no:"-")+'</a>'+
							'<a href="javascript:;">保险起期： '+(json.info[i]&&json.info[i].bgn_tm?json.info[i].bgn_tm:"-")+'</a>'+
							'<a href="javascript:;">保险止期： '+(json.info[i]&&json.info[i].end_tm?json.info[i].end_tm:"-")+'</a>'+
						'</p>'+
						
					'</div>'
					str+='<ul class="product_conter1" style="display:'+(json.info[i+1]?"":"none")+'">'+
						'<li class="l" style="width: 20.65%;"><img src="./images/checkoffShape.png" status="open" class="checkon switch_img" sid="'+(json.info[i]&&json.info[i+1].id?json.info[i+1].id:"-")+'" alt="" style="display: inline;"><img sid="1" class="Expand_Detail img" src="./images/open.png" alt=""><span style="width:60%;">'+(json.info[i+1]?json.info[i+1].order_no:"-")+'</span></li>'+
						'<li class="l" style="overflow:hidden;">'+(json.info[i+1]?json.info[i+1].product.name:"-")+'</li>'+
						'<li class="l" style="overflow:hidden;">'+(json.info[i+1]?json.info[i+1].create_time:"-")+'</li>'+
						'<li class="l" style="width: 14.65%;">'+(json.info[i+1]?json.info[i+1].premium:"-")+'</li>'+
						'<li class="l" style="width: 14.65%;">'+(json.info[i+1]?json.info[i+1].tgf_plat:"-")+'</li>'
						if(json.info[i+1]&&json.info[i+1].status==1){
							str+='<li class="l" style="width: 14.65%;">核保中</li>'
						}else if(json.info[i+1]&&json.info[i+1].status==2){
							str+='<li class="l" style="width: 14.65%;">核保失败</li>'
						}else if(json.info[i+1]&&json.info[i+1].status==3){
							str+='<li class="l" style="width: 14.65%;">待支付</li>'
						}else if(json.info[i+1]&&json.info[i+1].status==4){
							str+='<li class="l" style="width: 14.65%;">已支付</li>'
						}
					str+='</ul>'+
					'<div class="expandInDetail">'+
						'<p>'+
							'<a href="javascript:;">投保人：'+(json.info[i+1]&&json.info[i+1].app_name?json.info[i+1].app_name:"-")+'</a>'
							if(json.info[i+1]&&json.info[i+1].exten==0){
								str+='<a href="javascript:;">推广方式：暂无</a>'
							}else if(json.info[i+1]&&json.info[i+1].exten==1){
								str+='<a href="javascript:;">推广方式：二维码</a>'
							}else if(json.info[i+1]&&json.info[i+1].exten==2){
								str+='<a href="javascript:;">推广方式：链接</a>'
							}else if(json.info[i+1]&&json.info[i+1].exten==3){
								str+='<a href="javascript:;">推广方式：API接口</a>'
							}
							
							
							if(json.info[i+1]&&json.info[i+1].under_status==0){
								str+='<a href="javascript:;">承保结果：未承保</a>'
							}else if(json.info[i+1]&&json.info[i+1].under_status==1){
								str+='<a href="javascript:;">承保结果：成功</a>'
							} if(json.info[i+1]&&json.info[i+1].under_status==2){
								str+='<a href="javascript:;">承保结果：失败</a>'
							}
						str+='</p>'+
						'<p>'+
							'<a href="javascript:;">保单号： '+(json.info[i+1]&&json.info[i+1].policy_no?json.info[i+1].policy_no:"-")+'</a>'+
							'<a href="javascript:;">保险起期： '+(json.info[i+1]&&json.info[i+1].bgn_tm?json.info[i+1].bgn_tm:"-")+'</a>'+
							'<a href="javascript:;">保险止期： '+(json.info[i+1]&&json.info[i+1].end_tm?json.info[i+1].end_tm:"-")+'</a>'+
						'</p>'+
						
					'</div>'
					i=i+2;
    			}
    			$(platform_content_record3+' .paging').find('a').remove('.page');
				$(platform_content_record3+' .paging').find('a').remove('.active');
				$(platform_content_record3+' .paging').find('a').remove('a');
    			$(platform_content_record3).find('.product_conter').remove();
    			$(platform_content_record3).find('.product_conter1').remove();
    			$(platform_content_record3).find('.expandInDetail').remove();
    			$(platform_content_record3).find('.product_header').after(str);
    			if(num!=0&&num!=''&&num!=null){
	    			pageEvent_user_Order(platform_content_record3,num,platform_content_record3,status,search_val,start_date,end_date,page);
    			}else{
    				$(platform_content_record3+' .paging').find('.page').remove()
    				$(platform_content_record3+'  .nextPage').hide();
					$(platform_content_record3+'  .prevPage').hide();
					for(var i=0;i<3;i++){
						str+='<ul class="product_conter">'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
						'</ul>'
						str+='<ul class="product_conter1">'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
						'</ul>'

					}
					$(platform_content_record3).find('.product_header').after(str);
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

	用户订单数据请求

*/
function user_Order_nofirst(platform_content_record3,status,search_val,start_date,end_date,page){
	if(status==null||status=="null"){
		status='';
	}
	if(search_val==null||search_val=="null"){
		search_val='';
	}
	if(start_date==null||start_date=="null"){
		start_date='';
	}
	if(end_date==null||end_date=="null"){
		end_date='';
	}
	if(page==null||page=="null"){
		page='';
	}
	$.ajax({				
		type: "post",
        async: true,
        url: getPostUrl()+'/Policy/lists',
        data:{
        	'status':status,
        	"product_name":search_val,
        	"create_start": start_date,
			"create_end": end_date,
			"limit": 8,
			"page":page
        },
        dataType: "json",
        success: function(json){
        	var str='';
        	if(json.status==1){
        		var num =Math.ceil(json.url/8);
        		
    			for(var i=0;i<json.info.length;){
    				str+='<ul class="product_conter" style="display:'+(json.info[i]?"":"none")+'">'+
    					'<li class="l" style="width: 20.65%;"><img src="./images/checkoffShape.png" status="open" class="checkon switch_img" sid="'+(json.info[i]&&json.info[i].id?json.info[i].id:"-")+'" alt="" style="display: inline;"><img sid="1" class="Expand_Detail img" src="./images/open.png" alt=""><span style="width:60%;">'+(json.info[i]?json.info[i].order_no:"-")+'</span></li>'+
						'<li class="l" style="overflow:hidden;">'+(json.info[i]?json.info[i].product.name:"-")+'</li>'+
						'<li class="l" style="overflow:hidden;">'+(json.info[i]?json.info[i].create_time:"-")+'</li>'+
						'<li class="l" style="width: 14.65%;">'+(json.info[i]?json.info[i].premium:"-")+'</li>'+
						'<li class="l" style="width: 14.65%;">'+(json.info[i]?json.info[i].tgf_plat:"-")+'</li>'
						if(json.info[i]&&json.info[i].status==1){
							str+='<li class="l" style="width: 14.65%;">核保中</li>'
						}else if(json.info[i]&&json.info[i].status==2){
							str+='<li class="l" style="width: 14.65%;">核保失败</li>'
						}else if(json.info[i]&&json.info[i].status==3){
							str+='<li class="l" style="width: 14.65%;">待支付</li>'
						}else if(json.info[i]&&json.info[i].status==4){
							str+='<li class="l" style="width: 14.65%;">已支付</li>'
						}
					str+='</ul>'+
					'<div class="expandInDetail">'+
						'<p>'+
							'<a href="javascript:;">投保人：'+(json.info[i]&&json.info[i].app_name?json.info[i].app_name:"-")+'</a>'
							if(json.info[i]&&json.info[i].exten==0){
								str+='<a href="javascript:;">推广方式：暂无</a>'
							}else if(json.info[i]&&json.info[i].exten==1){
								str+='<a href="javascript:;">推广方式：二维码</a>'
							}else if(json.info[i]&&json.info[i].exten==2){
								str+='<a href="javascript:;">推广方式：链接</a>'
							}else if(json.info[i]&&json.info[i].exten==3){
								str+='<a href="javascript:;">推广方式：API接口</a>'
							}
							
							
							if(json.info[i]&&json.info[i].under_status==0){
								str+='<a href="javascript:;">承保结果：未承保</a>'
							}else if(json.info[i]&&json.info[i].under_status==1){
								str+='<a href="javascript:;">承保结果：成功</a>'
							} if(json.info[i]&&json.info[i].under_status==2){
								str+='<a href="javascript:;">承保结果：失败</a>'
							}
						str+='</p>'+
						'<p>'+
							'<a href="javascript:;">保单号： '+(json.info[i]&&json.info[i].policy_no?json.info[i].policy_no:"-")+'</a>'+
							'<a href="javascript:;">保险起期： '+(json.info[i]&&json.info[i].bgn_tm?json.info[i].bgn_tm:"-")+'</a>'+
							'<a href="javascript:;">保险止期： '+(json.info[i]&&json.info[i].end_tm?json.info[i].end_tm:"-")+'</a>'+
						'</p>'+
						
					'</div>'
					str+='<ul class="product_conter1" style="display:'+(json.info[i+1]?"":"none")+'">'+
						'<li class="l" style="width: 20.65%;"><img src="./images/checkoffShape.png" status="open" class="checkon switch_img" sid="'+(json.info[i]&&json.info[i+1].id?json.info[i+1].id:"-")+'" alt="" style="display: inline;"><img sid="1" class="Expand_Detail img" src="./images/open.png" alt=""><span style="width:60%;">'+(json.info[i+1]?json.info[i+1].order_no:"-")+'</span></li>'+
						'<li class="l" style="overflow:hidden;">'+(json.info[i+1]?json.info[i+1].product.name:"-")+'</li>'+
						'<li class="l" style="overflow:hidden;">'+(json.info[i+1]?json.info[i+1].create_time:"-")+'</li>'+
						'<li class="l" style="width: 14.65%;">'+(json.info[i+1]?json.info[i+1].premium:"-")+'</li>'+
						'<li class="l" style="width: 14.65%;">'+(json.info[i+1]?json.info[i+1].tgf_plat:"-")+'</li>'
						if(json.info[i+1]&&json.info[i+1].status==1){
							str+='<li class="l" style="width: 14.65%;">核保中</li>'
						}else if(json.info[i+1]&&json.info[i+1].status==2){
							str+='<li class="l" style="width: 14.65%;">核保失败</li>'
						}else if(json.info[i+1]&&json.info[i+1].status==3){
							str+='<li class="l" style="width: 14.65%;">待支付</li>'
						}else if(json.info[i+1]&&json.info[i+1].status==4){
							str+='<li class="l" style="width: 14.65%;">已支付</li>'
						}
					str+='</ul>'+
					'<div class="expandInDetail">'+
						'<p>'+
							'<a href="javascript:;">投保人：'+(json.info[i+1]&&json.info[i+1].app_name?json.info[i+1].app_name:"-")+'</a>'
							if(json.info[i+1]&&json.info[i+1].exten==0){
								str+='<a href="javascript:;">推广方式：暂无</a>'
							}else if(json.info[i+1]&&json.info[i+1].exten==1){
								str+='<a href="javascript:;">推广方式：二维码</a>'
							}else if(json.info[i+1]&&json.info[i+1].exten==2){
								str+='<a href="javascript:;">推广方式：链接</a>'
							}else if(json.info[i+1]&&json.info[i+1].exten==3){
								str+='<a href="javascript:;">推广方式：API接口</a>'
							}
							
							
							if(json.info[i+1]&&json.info[i+1].under_status==0){
								str+='<a href="javascript:;">承保结果：未承保</a>'
							}else if(json.info[i+1]&&json.info[i+1].under_status==1){
								str+='<a href="javascript:;">承保结果：成功</a>'
							} if(json.info[i+1]&&json.info[i+1].under_status==2){
								str+='<a href="javascript:;">承保结果：失败</a>'
							}
						str+='</p>'+
						'<p>'+
							'<a href="javascript:;">保单号： '+(json.info[i+1]&&json.info[i+1].policy_no?json.info[i+1].policy_no:"-")+'</a>'+
							'<a href="javascript:;">保险起期： '+(json.info[i+1]&&json.info[i+1].bgn_tm?json.info[i+1].bgn_tm:"-")+'</a>'+
							'<a href="javascript:;">保险止期： '+(json.info[i+1]&&json.info[i+1].end_tm?json.info[i+1].end_tm:"-")+'</a>'+
						'</p>'+
						
					'</div>'
					i=i+2;
    			}
    			
    			$(platform_content_record3).find('.product_conter').remove();
    			$(platform_content_record3).find('.product_conter1').remove();
    			$(platform_content_record3).find('.expandInDetail').remove();
    			$(platform_content_record3).find('.product_header').after(str);
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

	财务结算数据请求

*/
function financial_Settlement(platform_content_record3,type,product_name,create_start,create_end,status,page){
	
	$.ajax({				
		type: "post",
        async: true,
        url: getPostUrl()+'/Bill/lists',
        data:{
        	'type':type,
        	"product_name":product_name,
        	// "ins_id": ins_id,
			"create_start": create_start,
			"create_end":create_end,
			"status":status,
			"limit": 8,
			"page":page
        },
        dataType: "json",
        success: function(json){
        	var str='';
        	if(json.status==1){
        		var num =Math.ceil(json.url/8);
        		
    			for(var i=0;i<json.info.length;){
    				str+='<ul class="product_conter product_ul" style="display:'+(json.info[i]?"":"none")+'">'+
							'<li class="l"><img src="./images/checkoffShape.png" status="open" class="checkon switch_img" sid="'+(json.info[i]&&json.info[i].id?json.info[i].id:"-")+'" alt=""><span>'+(json.info[i]&&json.info[i].date?json.info[i].date:"-")+'</span></li>'
							str+='<li class="l" style="overflow:hidden;" source_type="'+(json.info[i]&&json.info[i].source_name?json.info[i].source_name:"")+'">'+(json.info[i]&&json.info[i].source_name?json.info[i].source_name:"-")+'</li>';
							str+='<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].code?json.info[i].code:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].product_name?json.info[i].product_name:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].policy_num?json.info[i].policy_num:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].premium_amt?json.info[i].premium_amt:"-")+'</li>'
							

							if(type==1){
								str+='<li class="l">'+(json.info[i]&&json.info[i].amt?json.info[i].amt:"-")+'</li>';
								if(json.info[i]&&json.info[i].status&&json.info[i].status==1){
									str+='<li class="l">待对账</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i].source_type?json.info[i].source_type:'')+'" sid="'+(json.info[i].id?json.info[i].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:'')+"'")+'" date="'+("'"+(json.info[i].date?json.info[i].date:'')+"'")+'" code="'+("'"+(json.info[i].code?json.info[i].code:'')+"'")+'" source_name="'+("'"+(json.info[i].source_name?json.info[i].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i].premium_amt?json.info[i].premium_amt:'')+"'")+'">确认对账</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==2){
									str+='<li class="l">待开发票</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i].source_type?json.info[i].source_type:'')+'" sid="'+(json.info[i].id?json.info[i].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:'')+"'")+'" date="'+("'"+(json.info[i].date?json.info[i].date:'')+"'")+'" code="'+("'"+(json.info[i].code?json.info[i].code:'')+"'")+'" source_name="'+("'"+(json.info[i].source_name?json.info[i].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i].amt?json.info[i].amt:'')+"'")+'">确认开票</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==3){
									str+='<li class="l">发票待确认</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==4){
									str+='<li class="l">等待对方打款</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==5){
									str+='<li class="l">待收款</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i].source_type?json.info[i].source_type:'')+'" sid="'+(json.info[i].id?json.info[i].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:'')+"'")+'" date="'+("'"+(json.info[i].date?json.info[i].date:'')+"'")+'" code="'+("'"+(json.info[i].code?json.info[i].code:'')+"'")+'" source_name="'+("'"+(json.info[i].source_name?json.info[i].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i].premium_amt?json.info[i].premium_amt:'')+"'")+'">确认收款</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==6){
									str+='<li class="l">已完成</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}
							}else if(type==2){
								if(json.info[i]&&json.info[i].settle_type&&json.info[i].settle_type==1){
									str+='<li class="l">实时</li>'
								}else if(json.info[i]&&json.info[i].settle_type&&json.info[i].settle_type==2){
									str+='<li class="l">月结</li>'
								}else if(json.info[i]&&json.info[i].settle_type&&json.info[i].settle_type==3){
									str+='<li class="l">自定义</li>'
								}else{
									str+='<li class="l">-</li>'
								}
								if(json.info[i]&&json.info[i].status&&json.info[i].status==1){
									str+='<li class="l">待对账</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i].source_type?json.info[i].source_type:'')+'" sid="'+(json.info[i].id?json.info[i].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:'')+"'")+'" date="'+("'"+(json.info[i].date?json.info[i].date:'')+"'")+'" code="'+("'"+(json.info[i].code?json.info[i].code:'')+"'")+'" source_name="'+("'"+(json.info[i].source_name?json.info[i].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i].premium_amt?json.info[i].premium_amt:'')+"'")+'">确认对账</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==2){
									str+='<li class="l">待收发票</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==3){
									str+='<li class="l">确认发票</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i].source_type?json.info[i].source_type:'')+'" sid="'+(json.info[i].id?json.info[i].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:'')+"'")+'" date="'+("'"+(json.info[i].date?json.info[i].date:'')+"'")+'" code="'+("'"+(json.info[i].code?json.info[i].code:'')+"'")+'" source_name="'+("'"+(json.info[i].source_name?json.info[i].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i].amt?json.info[i].amt:'')+"'")+'">确认收票</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==4){
									str+='<li class="l">待打款</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i].source_type?json.info[i].source_type:'')+'" sid="'+(json.info[i].id?json.info[i].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:'')+"'")+'" date="'+("'"+(json.info[i].date?json.info[i].date:'')+"'")+'" code="'+("'"+(json.info[i].code?json.info[i].code:'')+"'")+'" source_name="'+("'"+(json.info[i].source_name?json.info[i].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i].amt?json.info[i].amt:'')+"'")+'">确认付款</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==5){
									str+='<li class="l">等待对方收款</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==6){
									str+='<li class="l">已完成</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}
							}
							
							
							str+='</ul>'
						str+='<ul class="product_conter1 product_ul" style="display:'+(json.info[i+1]?"":"none")+'">'+
							'<li class="l"><img src="./images/checkoffShape.png" status="open" class="checkon switch_img" sid="'+(json.info[i+1]&&json.info[i+1].id?json.info[i+1].id:"-")+'" alt=""><span>'+(json.info[i+1]&&json.info[i+1].date?json.info[i+1].date:"-")+'</span></li>'
							str+='<li class="l" style="overflow:hidden;" source_type="'+(json.info[i+1]&&json.info[i+1].source_name?json.info[i+1].source_name:"")+'">'+(json.info[i+1]&&json.info[i+1].source_name?json.info[i+1].source_name:"-")+'</li>';
							str+='<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].code?json.info[i+1].code:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].product_name?json.info[i+1].product_name:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].policy_num?json.info[i+1].policy_num:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].premium_amt?json.info[i+1].premium_amt:"-")+'</li>'
							if(type==1){
								str+='<li class="l">'+(json.info[i+1]&&json.info[i+1].amt?json.info[i+1].amt:"-")+'</li>';
								if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==1){
									str+='<li class="l">待对账</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:'')+'" sid="'+(json.info[i+1].id?json.info[i+1].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:'')+"'")+'" date="'+("'"+(json.info[i+1].date?json.info[i+1].date:'')+"'")+'" code="'+("'"+(json.info[i+1].code?json.info[i+1].code:'')+"'")+'" source_name="'+("'"+(json.info[i+1].source_name?json.info[i+1].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i+1].premium_amt?json.info[i+1].premium_amt:'')+"'")+'">确认对账</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==2){
									str+='<li class="l">待开发票</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:'')+'" sid="'+(json.info[i+1].id?json.info[i+1].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:'')+"'")+'" date="'+("'"+(json.info[i+1].date?json.info[i+1].date:'')+"'")+'" code="'+("'"+(json.info[i+1].code?json.info[i+1].code:'')+"'")+'" source_name="'+("'"+(json.info[i+1].source_name?json.info[i+1].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i+1].amt?json.info[i+1].amt:'')+"'")+'">确认开票</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==3){
									str+='<li class="l">发票待确认</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==4){
									str+='<li class="l">等待对方打款</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==5){
									str+='<li class="l">待收款</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:'')+'" sid="'+(json.info[i+1].id?json.info[i+1].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:'')+"'")+'" date="'+("'"+(json.info[i+1].date?json.info[i+1].date:'')+"'")+'" code="'+("'"+(json.info[i+1].code?json.info[i+1].code:'')+"'")+'" source_name="'+("'"+(json.info[i+1].source_name?json.info[i+1].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i+1].premium_amt?json.info[i+1].premium_amt:'')+"'")+'">确认收款</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==6){
									str+='<li class="l">已完成</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}
							}else if(type==2){
								if(json.info[i+1]&&json.info[i+1].settle_type&&json.info[i+1].settle_type==1){
									str+='<li class="l">实时</li>'
								}else if(json.info[i+1]&&json.info[i+1].settle_type&&json.info[i+1].settle_type==2){
									str+='<li class="l">月结</li>'
								}else if(json.info[i+1]&&json.info[i+1].settle_type&&json.info[i+1].settle_type==3){
									str+='<li class="l">自定义</li>'
								}else{
									str+='<li class="l">-</li>'
								}
								if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==1){
									str+='<li class="l">待对账</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:'')+'" sid="'+(json.info[i+1].id?json.info[i+1].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:'')+"'")+'" date="'+("'"+(json.info[i+1].date?json.info[i+1].date:'')+"'")+'" code="'+("'"+(json.info[i+1].code?json.info[i+1].code:'')+"'")+'" source_name="'+("'"+(json.info[i+1].source_name?json.info[i+1].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i+1].premium_amt?json.info[i+1].premium_amt:'')+"'")+'">确认对账</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==2){
									str+='<li class="l">待收发票</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==3){
									str+='<li class="l">确认发票</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:'')+'" sid="'+(json.info[i+1].id?json.info[i+1].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:'')+"'")+'" date="'+("'"+(json.info[i+1].date?json.info[i+1].date:'')+"'")+'" code="'+("'"+(json.info[i+1].code?json.info[i+1].code:'')+"'")+'" source_name="'+("'"+(json.info[i+1].source_name?json.info[i+1].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i+1].amt?json.info[i+1].amt:'')+"'")+'">确认收票</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==4){
									str+='<li class="l">待打款</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:'')+'" sid="'+(json.info[i+1].id?json.info[i+1].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:'')+"'")+'" date="'+("'"+(json.info[i+1].date?json.info[i+1].date:'')+"'")+'" code="'+("'"+(json.info[i+1].code?json.info[i+1].code:'')+"'")+'" source_name="'+("'"+(json.info[i+1].source_name?json.info[i+1].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i+1].amt?json.info[i+1].amt:'')+"'")+'">确认付款</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==5){
									str+='<li class="l">等待对方收款</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==6){
									str+='<li class="l">已完成</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}
							}
							
							str+='</ul>'
					i=i+2;
    			}
    			$(platform_content_record3+' .paging').find('a').remove('.page');
				$(platform_content_record3+' .paging').find('a').remove('.active');
				$(platform_content_record3+' .paging').find('a').remove('a');
    			$(platform_content_record3).find('.product_conter').remove();
    			$(platform_content_record3).find('.product_conter1').remove();
    			$(platform_content_record3).find('.product_header').after(str);
    			if(num!=0&&num!=''&&num!=null){
	    			pageEvent_financial_Settlement(platform_content_record3,num,type,product_name,create_start,create_end,status,page);
    				$('.historyBill').css('color','#463BB1')
    			}else{
    				$('.historyBill').css('color','graytext')
    				$(platform_content_record3+' .paging').find('.page').remove()
    				$(platform_content_record3+'  .nextPage').hide();
					$(platform_content_record3+'  .prevPage').hide();
					for(var i=0;i<3;i++){
						str+='<ul class="product_conter product_ul">'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
						'</ul>'
						str+='<ul class="product_conter1 product_ul">'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
						'</ul>'

					}
					$(platform_content_record3).find('.product_header').after(str);
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

	财务结算数据请求

*/
function financial_Settlement_nofirst(platform_content_record3,type,product_name,create_start,create_end,status,page){
	if(product_name==null||product_name=="null"){
		product_name='';
	}
	if(create_start==null||create_start=="null"){
		create_start='';
	}
	if(create_end==null||create_end=="null"){
		create_end='';
	}
	if(status==null||status=="null"){
		status='';
	}
	$.ajax({				
		type: "post",
        async: true,
        url: getPostUrl()+'/Bill/lists',
        data:{
        	'type':type,
        	"product_name":product_name,
			"create_start": create_start,
			"create_end":create_end,
			"status":status,
			"limit": 8,
			"page":page
        },
        dataType: "json",
        success: function(json){
        	var str='';
        	if(json.status==1){
        		var num =Math.ceil(json.url/8);
        		
    			for(var i=0;i<json.info.length;){
    				str+='<ul class="product_conter product_ul" style="display:'+(json.info[i]?"":"none")+'">'+
							'<li class="l"><img src="./images/checkoffShape.png" status="open" class="checkon switch_img" sid="'+(json.info[i]&&json.info[i].id?json.info[i].id:"-")+'" alt=""><span>'+(json.info[i]&&json.info[i].date?json.info[i].date:"-")+'</span></li>'
							str+='<li class="l" style="overflow:hidden;" source_type="'+(json.info[i]&&json.info[i].source_name?json.info[i].source_name:"")+'">'+(json.info[i]&&json.info[i].source_name?json.info[i].source_name:"-")+'</li>';
							str+='<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].code?json.info[i].code:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].product_name?json.info[i].product_name:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].policy_num?json.info[i].policy_num:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].premium_amt?json.info[i].premium_amt:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i]&&json.info[i].amt?json.info[i].amt:"-")+'</li>'
							if(type==1){
								str+='<li class="l">'+(json.info[i]&&json.info[i].amt?json.info[i].amt:"-")+'</li>';
								if(json.info[i]&&json.info[i].status&&json.info[i].status==1){
									str+='<li class="l">待对账</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i].source_type?json.info[i].source_type:'')+'" sid="'+(json.info[i].id?json.info[i].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:'')+"'")+'" date="'+("'"+(json.info[i].date?json.info[i].date:'')+"'")+'" code="'+("'"+(json.info[i].code?json.info[i].code:'')+"'")+'" source_name="'+("'"+(json.info[i].source_name?json.info[i].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i].premium_amt?json.info[i].premium_amt:'')+"'")+'">确认对账</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==2){
									str+='<li class="l">待开发票</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i].source_type?json.info[i].source_type:'')+'" sid="'+(json.info[i].id?json.info[i].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:'')+"'")+'" date="'+("'"+(json.info[i].date?json.info[i].date:'')+"'")+'" code="'+("'"+(json.info[i].code?json.info[i].code:'')+"'")+'" source_name="'+("'"+(json.info[i].source_name?json.info[i].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i].amt?json.info[i].amt:'')+"'")+'">确认开票</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==3){
									str+='<li class="l">发票待确认</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==4){
									str+='<li class="l">等待对方打款</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==5){
									str+='<li class="l">待收款</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i].source_type?json.info[i].source_type:'')+'" sid="'+(json.info[i].id?json.info[i].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:'')+"'")+'" date="'+("'"+(json.info[i].date?json.info[i].date:'')+"'")+'" code="'+("'"+(json.info[i].code?json.info[i].code:'')+"'")+'" source_name="'+("'"+(json.info[i].source_name?json.info[i].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i].premium_amt?json.info[i].premium_amt:'')+"'")+'">确认收款</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==6){
									str+='<li class="l">已完成</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}
							}else if(type==2){
								if(json.info[i]&&json.info[i].settle_type&&json.info[i].settle_type==1){
									str+='<li class="l">实时</li>'
								}else if(json.info[i]&&json.info[i].settle_type&&json.info[i].settle_type==2){
									str+='<li class="l">月结</li>'
								}else if(json.info[i]&&json.info[i].settle_type&&json.info[i].settle_type==3){
									str+='<li class="l">自定义</li>'
								}else{
									str+='<li class="l">-</li>'
								}
								if(json.info[i]&&json.info[i].status&&json.info[i].status==1){
									str+='<li class="l">待对账</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i].source_type?json.info[i].source_type:'')+'" sid="'+(json.info[i].id?json.info[i].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:'')+"'")+'" date="'+("'"+(json.info[i].date?json.info[i].date:'')+"'")+'" code="'+("'"+(json.info[i].code?json.info[i].code:'')+"'")+'" source_name="'+("'"+(json.info[i].source_name?json.info[i].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i].premium_amt?json.info[i].premium_amt:'')+"'")+'">确认对账</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==2){
									str+='<li class="l">待收发票</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==3){
									str+='<li class="l">确认发票</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i].source_type?json.info[i].source_type:'')+'" sid="'+(json.info[i].id?json.info[i].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:'')+"'")+'" date="'+("'"+(json.info[i].date?json.info[i].date:'')+"'")+'" code="'+("'"+(json.info[i].code?json.info[i].code:'')+"'")+'" source_name="'+("'"+(json.info[i].source_name?json.info[i].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i].amt?json.info[i].amt:'')+"'")+'">确认收票</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==4){
									str+='<li class="l">待打款</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i].source_type?json.info[i].source_type:'')+'" sid="'+(json.info[i].id?json.info[i].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:'')+"'")+'" date="'+("'"+(json.info[i].date?json.info[i].date:'')+"'")+'" code="'+("'"+(json.info[i].code?json.info[i].code:'')+"'")+'" source_name="'+("'"+(json.info[i].source_name?json.info[i].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i].amt?json.info[i].amt:'')+"'")+'">确认付款</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==5){
									str+='<li class="l">等待对方收款</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i]&&json.info[i].status&&json.info[i].status==6){
									str+='<li class="l">已完成</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i].source_type?json.info[i].source_type:"")+'" sid="'+(json.info[i].id?json.info[i].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i].status?json.info[i].status:"")+"'")+'" start_date="'+("'"+(json.info[i].start_date?json.info[i].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i].end_date?json.info[i].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i].product_name?json.info[i].product_name:"")+"'")+'">查看明细</a></li>'
								}
							}
							
							
							str+='</ul>'
						str+='<ul class="product_conter1 product_ul" style="display:'+(json.info[i+1]?"":"none")+'">'+
							'<li class="l"><img src="./images/checkoffShape.png" status="open" class="checkon switch_img" sid="'+(json.info[i+1]&&json.info[i+1].id?json.info[i+1].id:"-")+'" alt=""><span>'+(json.info[i+1]&&json.info[i+1].date?json.info[i+1].date:"-")+'</span></li>'
							str+='<li class="l" style="overflow:hidden;" source_type="'+(json.info[i+1]&&json.info[i+1].source_name?json.info[i+1].source_name:"")+'">'+(json.info[i+1]&&json.info[i+1].source_name?json.info[i+1].source_name:"-")+'</li>';
							str+='<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].code?json.info[i+1].code:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].product_name?json.info[i+1].product_name:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].policy_num?json.info[i+1].policy_num:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].premium_amt?json.info[i+1].premium_amt:"-")+'</li>'+
							'<li class="l" style="overflow:hidden;">'+(json.info[i+1]&&json.info[i+1].amt?json.info[i+1].amt:"-")+'</li>'
							if(type==1){
								str+='<li class="l">'+(json.info[i+1]&&json.info[i+1].amt?json.info[i+1].amt:"-")+'</li>';
								if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==1){
									str+='<li class="l">待对账</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:'')+'" sid="'+(json.info[i+1].id?json.info[i+1].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:'')+"'")+'" date="'+("'"+(json.info[i+1].date?json.info[i+1].date:'')+"'")+'" code="'+("'"+(json.info[i+1].code?json.info[i+1].code:'')+"'")+'" source_name="'+("'"+(json.info[i+1].source_name?json.info[i+1].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i+1].premium_amt?json.info[i+1].premium_amt:'')+"'")+'">确认对账</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==2){
									str+='<li class="l">待开发票</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:'')+'" sid="'+(json.info[i+1].id?json.info[i+1].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:'')+"'")+'" date="'+("'"+(json.info[i+1].date?json.info[i+1].date:'')+"'")+'" code="'+("'"+(json.info[i+1].code?json.info[i+1].code:'')+"'")+'" source_name="'+("'"+(json.info[i+1].source_name?json.info[i+1].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i+1].amt?json.info[i+1].amt:'')+"'")+'">确认开票</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==3){
									str+='<li class="l">发票待确认</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==4){
									str+='<li class="l">等待对方打款</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==5){
									str+='<li class="l">待收款</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:'')+'" sid="'+(json.info[i+1].id?json.info[i+1].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:'')+"'")+'" date="'+("'"+(json.info[i+1].date?json.info[i+1].date:'')+"'")+'" code="'+("'"+(json.info[i+1].code?json.info[i+1].code:'')+"'")+'" source_name="'+("'"+(json.info[i+1].source_name?json.info[i+1].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i+1].premium_amt?json.info[i+1].premium_amt:'')+"'")+'">确认收款</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==6){
									str+='<li class="l">已完成</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}
							}else if(type==2){
								if(json.info[i+1]&&json.info[i+1].settle_type&&json.info[i+1].settle_type==1){
									str+='<li class="l">实时</li>'
								}else if(json.info[i+1]&&json.info[i+1].settle_type&&json.info[i+1].settle_type==2){
									str+='<li class="l">月结</li>'
								}else if(json.info[i+1]&&json.info[i+1].settle_type&&json.info[i+1].settle_type==3){
									str+='<li class="l">自定义</li>'
								}else{
									str+='<li class="l">-</li>'
								}
								if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==1){
									str+='<li class="l">待对账</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:'')+'" sid="'+(json.info[i+1].id?json.info[i+1].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:'')+"'")+'" date="'+("'"+(json.info[i+1].date?json.info[i+1].date:'')+"'")+'" code="'+("'"+(json.info[i+1].code?json.info[i+1].code:'')+"'")+'" source_name="'+("'"+(json.info[i+1].source_name?json.info[i+1].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i+1].premium_amt?json.info[i+1].premium_amt:'')+"'")+'">确认对账</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==2){
									str+='<li class="l">待收发票</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==3){
									str+='<li class="l">确认发票</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:'')+'" sid="'+(json.info[i+1].id?json.info[i+1].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:'')+"'")+'" date="'+("'"+(json.info[i+1].date?json.info[i+1].date:'')+"'")+'" code="'+("'"+(json.info[i+1].code?json.info[i+1].code:'')+"'")+'" source_name="'+("'"+(json.info[i+1].source_name?json.info[i+1].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i+1].amt?json.info[i+1].amt:'')+"'")+'">确认收票</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==4){
									str+='<li class="l">待打款</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:'')+'" sid="'+(json.info[i+1].id?json.info[i+1].id:'')+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:'')+"'")+'" date="'+("'"+(json.info[i+1].date?json.info[i+1].date:'')+"'")+'" code="'+("'"+(json.info[i+1].code?json.info[i+1].code:'')+"'")+'" source_name="'+("'"+(json.info[i+1].source_name?json.info[i+1].source_name:'')+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:'')+"'")+'" premium_amt="'+("'"+(json.info[i+1].amt?json.info[i+1].amt:'')+"'")+'">确认付款</a>  <a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==5){
									str+='<li class="l">等待对方收款</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}else if(json.info[i+1]&&json.info[i+1].status&&json.info[i+1].status==6){
									str+='<li class="l">已完成</li>'+
									'<li class="l"><a href="javascript:;" class="view_Details1" source_type="'+(json.info[i+1].source_type?json.info[i+1].source_type:"")+'" sid="'+(json.info[i+1].id?json.info[i+1].id:"")+'" type="'+type+'" status="'+("'"+(json.info[i+1].status?json.info[i+1].status:"")+"'")+'" start_date="'+("'"+(json.info[i+1].start_date?json.info[i+1].start_date:"")+"'")+'" end_date="'+("'"+(json.info[i+1].end_date?json.info[i+1].end_date:"")+"'")+'" product_name="'+("'"+(json.info[i+1].product_name?json.info[i+1].product_name:"")+"'")+'">查看明细</a></li>'
								}
							}
							
							str+='</ul>'
					i=i+2;
    			}
    			$(platform_content_record3).find('.product_conter').remove();
    			$(platform_content_record3).find('.product_conter1').remove();
    			$(platform_content_record3).find('.product_header').after(str);
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



//获取当前年份
function get_Year(obj){
	var year = 2017,
		myDate = new Date(),
		newyear = myDate.getFullYear(),
		num = newyear-year,
		str='';
		for(var i = 0;i<=num;){
			str+='<li class="time_list_li">'+(2017+Number(i))+'</li>';
			i++;
		}
		$(obj).find('.time_list').html(str)
		if($(obj).attr('status')=='open'){
			$(obj).find('.time_list').show()
			$(obj).attr('status','shut')
			$(obj).find('img').addClass('img')
		}else{
			$(obj).find('.time_list').hide();
			$(obj).attr('status','open')
			$(obj).find('img').removeClass('img')
		}
}

/*

	下拉框传值

*/
function time_list_li(obj){
	$(obj).parent('.time_list').siblings('span').html($(obj).html());
}

/*

	下拉框传值以及sid

*/
function time_list_li1(obj){
	$(obj).parent('.time_list').siblings('span').html($(obj).html());
	$(obj).parent('.time_list').siblings('span').attr('sid',$(obj).attr('sid'));
}
//获取当前月份
function get_month(obj){
	var year = $('.my_earnings .get_Year').find('span').html(),
		str='';
		$.ajax({
	         type: "post",
	         async: true,
	         url: getPostUrl()+'/Company/months',
	         data: {
	         	"year":year,
			},
	         dataType: "json",
	         success: function(json){
	         	if(json.status==1){
	         		str+='<li class="time_list_li">全部</li>'
	         		for(var i=0;i<json.info.length;i++){
	         			str+='<li class="time_list_li">'+json.info[i].month.slice(-2)+'</li>'
	         		}
	         		$(obj).find('.time_list').html(str)
	         		$('.my_earnings .get_week').find('span').html('全部')
					$('.my_earnings .get_week').find('.time_list').find('li').remove()
					$('.my_earnings .get_week').attr('status','open')
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
		
		if($(obj).attr('status')=='open'){
			$(obj).find('.time_list').show()
			$(obj).attr('status','shut')
			$(obj).find('img').addClass('img')
		}else{
			$(obj).find('.time_list').hide();
			$(obj).attr('status','open')
			$(obj).find('img').removeClass('img')
				
		}

}
//获取当前周
function get_week(obj){
	var year = $('.my_earnings .get_Year').find('span').html(),
		month = $('.my_earnings .get_month').find('span').html(),
		str='';
		if(month!='全部'){
			$.ajax({
		         type: "post",
		         async: true,
		         url: getPostUrl()+'/Company/weeks',
		         data: {
		         	"month":year+'-'+month,
				},
		         dataType: "json",
		         success: function(json){
		         	if(json.status==1){
		         		str+='<li class="time_list_li">全部</li>'
		         		for(var i=0;i<json.info.length;i++){
		         			str+='<li class="time_list_li">'+json.info[i].week+'</li>'
		         		}
		         		$(obj).find('.time_list').html(str)
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
		
		
		if($(obj).attr('status')=='open'){
			$(obj).find('.time_list').show()
			$(obj).attr('status','shut')
			$(obj).find('img').addClass('img')
		}else{
			$(obj).find('.time_list').hide();
			$(obj).attr('status','open')
			$(obj).find('img').removeClass('img')

		}
}

//经纪公司
function brokerage_Agency(obj){
	$.ajax({
         type: "post",
         async: true,
         url: getPostUrl()+'/Insurance/lists',
         dataType: "json",
         success: function(json){
         	var str='';
         	if(json.status==1){
         		str+='<li class="time_list_li" sid="">全部</li>'
         		for(var i=0;i<json.info.length;i++){
         			str+='<li class="time_list_li" sid="'+json.info[i].id+'">'+json.info[i].name+'</li>'
         		}
         		$(obj).find('.time_list').html(str)
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
	if($(obj).attr('status')=='open'){
			$(obj).find('.time_list').show()
			$(obj).attr('status','shut')
			$(obj).find('img').addClass('img')
		}else{
			$(obj).find('.time_list').hide();
			$(obj).attr('status','open')
			$(obj).find('img').removeClass('img')
		}
}


/*

	推广方式下拉框

*/
function promotion_Mode(obj){


	if($(obj).attr('status')=='open'){
		$(obj).find('.time_list').show()
		$(obj).attr('status','shut')
		$(obj).find('img').addClass('img')
	}else{
		$(obj).find('.time_list').hide();
		$(obj).attr('status','open')
		$(obj).find('img').removeClass('img')
	}
}

/*

	结算状态下拉框

*/
function Settlement_status(obj){


	if($(obj).attr('status')=='open'){
		$(obj).find('.time_list').show()
		$(obj).attr('status','shut')
		$(obj).find('img').addClass('img')
	}else{
		$(obj).find('.time_list').hide();
		$(obj).attr('status','open')
		$(obj).find('img').removeClass('img')
	}
}


/*

	统计概览查询按钮

*/
function statistical_Overview(){
	var exten = $('.my_earnings .promotion_Mode').find('span').html(),
		product_name=$('.my_earnings .search').val(),
		year=$('.my_earnings .get_Year').find('span').html(),
		month=$('.my_earnings .get_month').find('span').html(),
		week=$('.my_earnings .get_week').find('span').html(),
		start_date='',
		end_date='',
		date_type='',
		Income_graph_condition_sid=$('.my_earnings .Income_graph_condition').attr('sid');

		if(exten=='全部'){
			exten='';
		}else if(exten=='二维码'){
			exten='1'
		}else if(exten=='链接'){
			exten='2'
		}else if(exten=='API接口'){
			exten='3'
		}
		if(month=='全部'){
			start_date=year+'-1-1';
			end_date='';
			date_type='1';
		}else if(month!='全部'){
			if(week=='全部'){
				start_date=year+'-'+month+'-1';
				end_date='';
				date_type='2';
			}else{
				start_date=year+'-'+month+'-'+week.slice(-5).slice(0,2);
				end_date=year+'-'+month+'-'+week.slice(-5).slice(-2);
				date_type='3';
			}
		}
	$.ajax({
	        type: "post",
	        async: true,
	        url: getPostUrl()+'/Policy/stat_lists',
	        data: {
				"exten": exten,
				// "ins_id": ins_id,
				"product_name": product_name,
				"start_date": start_date,
				"end_date": end_date,
				"date_type":date_type,
			},
	        dataType: "json",
	        success: function(json){
	        	if(json.status==1){
	        		$('.my_earnings .KeyIndex_con_tgf em').text(json.info.tgf)
	         		$('.my_earnings .KeyIndex_con_dl em').text(json.info.policy_num)
	         		$('.my_earnings .KeyIndex_con_bfze em').text(json.info.premium_amt)
	         		
	        		
	         			if(json.info.profit.stat_max==0){
		         			var y_max1=1000
		         		}else{
		         			var y_max1= json.info.profit.stat_max;
		         		}
		        		
		        		var y_name1= '推广费（元）';
		        		if(date_type==1){
		        			var x_name1= '月';
		        		}else if(date_type==2){
		        			var x_name1= '周';
		        		}else if(date_type==3){
		        			var x_name1= '天';
		        		}
		        		
		        		var x_title1= [];
		        		var x_data1= [];
		        		for(var i=0;i<json.info.profit.stat_lists.length;i++){
		        			x_title1.push(json.info.profit.stat_lists[i].title)
		        			x_data1.push(json.info.profit.stat_lists[i].num)
		        		}
	         			//订单量
	         			if(json.info.policy.stat_max==0){
		         			var y_max2=1000
		         		}else{
		         			var y_max2= json.info.policy.stat_max;
		         		}
		        		
		        		var y_name2= '订单量（单）';
		        		if(date_type==1){
		        			var x_name2= '月';
		        		}else if(date_type==2){
		        			var x_name2= '周';
		        		}else if(date_type==3){
		        			var x_name2= '天';
		        		}
		        		
		        		var x_title2= [];
		        		var x_data2= [];
		        		for(var i=0;i<json.info.policy.stat_lists.length;i++){
		        			x_title2.push(json.info.policy.stat_lists[i].title)
		        			x_data2.push(json.info.policy.stat_lists[i].num)
		        		}

		        		//保费
	         			if(json.info.premium.stat_max==0){
		         			var y_max3=1000
		         		}else{
		         			var y_max3= json.info.premium.stat_max;
		         		}
		        		
		        		var y_name3= '保费总额（元）';
		        		if(date_type==1){
		        			var x_name3= '月';
		        		}else if(date_type==2){
		        			var x_name3= '周';
		        		}else if(date_type==3){
		        			var x_name3= '天';
		        		}
		        		
		        		var x_title3= [];
		        		var x_data3= [];
		        		for(var i=0;i<json.info.premium.stat_lists.length;i++){
		        			x_title3.push(json.info.premium.stat_lists[i].title)
		        			x_data3.push(json.info.premium.stat_lists[i].num)
		        		}


					$('.Income_graph').find('#main1').remove();
					$('.Income_graph').find('#main2').remove();
					$('.Income_graph').find('#main3').remove();
	        		var main='<div id="main1" style="width: 140% ;height:600px; margin:0 auto;"></div><div id="main2" style="width: 140% ;height:600px; margin:0 auto;"></div><div id="main3" style="width: 140% ;height:600px; margin:0 auto;"></div>';
					$('.Income_graph_condition').after(main);
					var myChart1 = echarts.init(document.getElementById('main1'));
					option1 = {
					    backgroundColor: "#fff",
					    color: ['#463BB1'],
					    title: [{
					        text: '',
					        left: '1%',
					        top: '6%',
					        textStyle: {
					            color: '#fff'
					        }
					    }],
					    tooltip: {
					        trigger: 'item',
					        position: function (p) {
					                           // 位置回调
					                           // console.log && console.log(p);
					                           return [p[0] - 25, p[1] - 60];
					                       },
					    },
					    legend: {
					        x: 300,
					        top: '7%',
					        textStyle: {
					            color: '#ffd285',
					        },
					        data: ['在大理']
					    },
					    grid: {
					        left: '1%',
					        right: '35%',
					        top: '16%',
					        bottom: '6%',
					        containLabel: true
					    },
					    toolbox: {
					        "show": false,
					        feature: {
					            saveAsImage: {}
					        }
					    },
					    xAxis: {
					        type: 'category',
					        name: x_name1,
					        boundaryGap: true,
					        nameTextStyle: {
				                color: '#000'
				            },
					        "axisLine": {
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					        	// interval:0,
					        	// rotate:-30,
					            textStyle: {
					                color: '#000'
					            }
					        },
					        data: x_title1
					    },
					    yAxis: {
					    	name: y_name1,
					    	max: y_max1,
					    	minInterval: 1,
					        "axisLine": {
					            lineStyle: {
					                color: '#fff'
					            }
					        },
					        nameTextStyle: {
				                color: '#000'
				            },
					        splitLine: {
					            show: true,
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					            textStyle: {
					                color: '#000'
					            }
					        },
					        type: 'value'
					    },
					    series: [
					    {
				            "name": "总数",
				            "type": "line",
				            "stack": "总量",
				            symbolSize:10,
				            symbol:'circle',
				            "itemStyle": {
				                "normal": {
				                    "color": "#463BB1",
				                    "barBorderRadius": 0,
				                    "label": {
				                        "show": true,
				                        "position": "top",
				                        formatter: function(p) {
				                            // return p.value > 0 ? (p.value) : '';
				                            return '';
				                        }
				                    }
				                }
				            },
				            areaStyle: { //区域填充样式
					            normal: {
					                color: new echarts.graphic.LinearGradient(81, 115, 253, .1, [{ //填充的颜色。
					                    offset: 0, // 0% 处的颜色
					                    color: 'rgba(81,115,253,0.10)'
					                }, {
					                    offset: 0.8, // 80% 处的颜色
					                    color: 'rgba(81, 115, 253, .1)'
					                }], false),
					                shadowColor: 'rgba(81, 115, 253, .1)', //阴影颜色。支持的格式同color
					                shadowBlur: 10 //图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
					            }
					        },
				            "data": x_data1
				        }]
					}
					myChart1.setOption(option1);

					var myChart2 = echarts.init(document.getElementById('main2'));
					option2 = {
					    backgroundColor: "#fff",
					    color: ['#463BB1'],
					    title: [{
					        text: '',
					        left: '1%',
					        top: '6%',
					        textStyle: {
					            color: '#fff'
					        }
					    }],
					    tooltip: {
					        trigger: 'item',
					        position: function (p) {
					                           // 位置回调
					                           // console.log && console.log(p);
					                           return [p[0] - 25, p[1] - 60];
					                       },
					    },
					    legend: {
					        x: 300,
					        top: '7%',
					        textStyle: {
					            color: '#ffd285',
					        },
					        data: ['在大理']
					    },
					    grid: {
					        left: '1%',
					        right: '35%',
					        top: '16%',
					        bottom: '6%',
					        containLabel: true
					    },
					    toolbox: {
					        "show": false,
					        feature: {
					            saveAsImage: {}
					        }
					    },
					    xAxis: {
					        type: 'category',
					        name: x_name2,
					        boundaryGap: true,
					        nameTextStyle: {
				                color: '#000'
				            },
					        "axisLine": {
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					        	// interval:0,
					        	// rotate:-30,
					            textStyle: {
					                color: '#000'
					            }
					        },
					        data: x_title2
					    },
					    yAxis: {
					    	name: y_name2,
					    	max: y_max2,
					    	minInterval: 1,
					        "axisLine": {
					            lineStyle: {
					                color: '#fff'
					            }
					        },
					        nameTextStyle: {
				                color: '#000'
				            },
					        splitLine: {
					            show: true,
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					            textStyle: {
					                color: '#000'
					            }
					        },
					        type: 'value'
					    },
					    series: [
					    {
				            "name": "总数",
				            "type": "line",
				            "stack": "总量",
				            symbolSize:10,
				            symbol:'circle',
				            "itemStyle": {
				                "normal": {
				                    "color": "#463BB1",
				                    "barBorderRadius": 0,
				                    "label": {
				                        "show": true,
				                        "position": "top",
				                        formatter: function(p) {
				                            // return p.value > 0 ? (p.value) : '';
				                            return '';
				                        }
				                    }
				                }
				            },
				            areaStyle: { //区域填充样式
					            normal: {
					                color: new echarts.graphic.LinearGradient(81, 115, 253, .1, [{ //填充的颜色。
					                    offset: 0, // 0% 处的颜色
					                    color: 'rgba(81,115,253,0.10)'
					                }, {
					                    offset: 0.8, // 80% 处的颜色
					                    color: 'rgba(81, 115, 253, .1)'
					                }], false),
					                shadowColor: 'rgba(81, 115, 253, .1)', //阴影颜色。支持的格式同color
					                shadowBlur: 10 //图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
					            }
					        },
				            "data": x_data2
				        }]
					}
					myChart2.setOption(option2);

					var myChart3 = echarts.init(document.getElementById('main3'));
					option3 = {
					    backgroundColor: "#fff",
					    color: ['#463BB1'],
					    title: [{
					        text: '',
					        left: '1%',
					        top: '6%',
					        textStyle: {
					            color: '#fff'
					        }
					    }],
					    tooltip: {
					        trigger: 'item',
					        position: function (p) {
					                           // 位置回调
					                           // console.log && console.log(p);
					                           return [p[0] - 25, p[1] - 60];
					                       },
					    },
					    legend: {
					        x: 300,
					        top: '7%',
					        textStyle: {
					            color: '#ffd285',
					        },
					        data: ['在大理']
					    },
					    grid: {
					        left: '1%',
					        right: '35%',
					        top: '16%',
					        bottom: '6%',
					        containLabel: true
					    },
					    toolbox: {
					        "show": false,
					        feature: {
					            saveAsImage: {}
					        }
					    },
					    xAxis: {
					        type: 'category',
					        name: x_name3,
					        boundaryGap: true,
					        nameTextStyle: {
				                color: '#000'
				            },
					        "axisLine": {
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					        	// interval:0,
					        	// rotate:-30,
					            textStyle: {
					                color: '#000'
					            }
					        },
					        data: x_title3
					    },
					    yAxis: {
					    	name: y_name3,
					    	max: y_max3,
					    	minInterval: 1,
					        "axisLine": {
					            lineStyle: {
					                color: '#fff'
					            }
					        },
					        nameTextStyle: {
				                color: '#000'
				            },
					        splitLine: {
					            show: true,
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					            textStyle: {
					                color: '#000'
					            }
					        },
					        type: 'value'
					    },
					    series: [
					    {
				            "name": "总数",
				            "type": "line",
				            "stack": "总量",
				            symbolSize:10,
				            symbol:'circle',
				            "itemStyle": {
				                "normal": {
				                    "color": "#463BB1",
				                    "barBorderRadius": 0,
				                    "label": {
				                        "show": true,
				                        "position": "top",
				                        formatter: function(p) {
				                            // return p.value > 0 ? (p.value) : '';
				                            return '';
				                        }
				                    }
				                }
				            },
				            areaStyle: { //区域填充样式
					            normal: {
					                color: new echarts.graphic.LinearGradient(81, 115, 253, .1, [{ //填充的颜色。
					                    offset: 0, // 0% 处的颜色
					                    color: 'rgba(81,115,253,0.10)'
					                }, {
					                    offset: 0.8, // 80% 处的颜色
					                    color: 'rgba(81, 115, 253, .1)'
					                }], false),
					                shadowColor: 'rgba(81, 115, 253, .1)', //阴影颜色。支持的格式同color
					                shadowBlur: 10 //图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
					            }
					        },
				            "data": x_data3
				        }]
					}
					myChart3.setOption(option3);
					if($('.Income_graph_condition').eq(0).attr('sid')==1){
						$('#main1').show()
						$('#main2').hide()
						$('#main3').hide()
					}else if($('.Income_graph_condition').eq(0).attr('sid')==2){
						$('#main2').show()
						$('#main1').hide()
						$('#main3').hide()
					}else if($('.Income_graph_condition').eq(0).attr('sid')==3){
						$('#main3').show()
						$('#main1').hide()
						$('#main2').hide()
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

	统计概览重置按钮

*/
function statistical_Overview_Reset(){
	$('.my_earnings .promotion_Mode').find('span').html('全部'),
	$('.my_earnings .promotion_Mode').find('span').attr('sid',''),
	$('.my_earnings .search').val(''),
	$('.my_earnings .get_Year').find('span').html('2017'),
	$('.my_earnings .get_month').find('span').html('全部'),
	$('.my_earnings .get_week').find('span').html('全部'),
	$('.my_earnings .promotion_Mode').attr('status','open')
	$('.my_earnings .get_Year').attr('status','open')
	$('.my_earnings .get_month').attr('status','open')
	$('.my_earnings .get_week').attr('status','open')
	$('.time_list').hide()
}

/*

	统计概览最近七天，最近三十天按钮
	type==1是七天
	type==2是三十天
*/
function statistical_Overview_latest_Time(type){
	var exten = $('.my_earnings .promotion_Mode').find('span').html(),
		ins_id = $('.my_earnings .get_Year').find('span').attr('sid'),
		product_name=$('.my_earnings .search').val(),
		start_date='',
		end_date='',
		date_type='4',
		Income_graph_condition_sid=$('.my_earnings .Income_graph_condition').attr('sid');
		if(exten=='全部'){
			exten='';
		}else if(exten=='二维码'){
			exten='1'
		}else if(exten=='链接'){
			exten='2'
		}else if(exten=='API接口'){
			exten='3'
		}

	if(type==1){
		$.ajax({
	        type: "post",
	        async: true,
	        url: getPostUrl()+'/Policy/stat_lists',
	        data: {
				"exten": exten,
				"ins_id": ins_id,
				"product_name": product_name,
				"start_date": start_date,
				"end_date": end_date,
				"date_type":date_type,
			},
	        dataType: "json",
	        success: function(json){
	        	if(json.status==1){
	        		$('.my_earnings .KeyIndex_con_tgf').find('em').text(json.info.tgf)
	         		$('.my_earnings .KeyIndex_con_dl').find('em').text(json.info.policy_num)
	         		$('.my_earnings .KeyIndex_con_bfze').find('em').text(json.info.premium_amt)
	         			//推广费
	         			if(json.info.profit.stat_max==0){
		         			var y_max1=1000
		         		}else{
		         			var y_max1= json.info.profit.stat_max;
		         		}
		        		var y_name1= '推广费（元）';
		        		var x_name1= '天';
		        		var x_title1= [];
		        		var x_data1= [];
		        		for(var i=0;i<json.info.profit.stat_lists.length;i++){
		        			x_title1.push(json.info.profit.stat_lists[i].title)
		        			x_data1.push(json.info.profit.stat_lists[i].num)
		        		}
		        		//订单量
	         			if(json.info.policy.stat_max==0){
		         			var y_max2=1000
		         		}else{
		         			var y_max2= json.info.policy.stat_max;
		         		}
		        		
		        		var y_name2= '订单量（单）';
		        		var x_name2= '天';
		        		var x_title2= [];
		        		var x_data2= [];
		        		for(var i=0;i<json.info.policy.stat_lists.length;i++){
		        			x_title2.push(json.info.policy.stat_lists[i].title)
		        			x_data2.push(json.info.policy.stat_lists[i].num)
		        		}
	         		//保费总额
	         			if(json.info.premium.stat_max==0){
		         			var y_max3=1000
		         		}else{
		         			var y_max3= json.info.premium.stat_max;
		         		}
		        		
		        		var y_name3= '保费总额（元）';
		        		var x_name3= '天';
		        		var x_title3= [];
		        		var x_data3= [];
		        		for(var i=0;i<json.info.premium.stat_lists.length;i++){
		        			x_title3.push(json.info.premium.stat_lists[i].title)
		        			x_data3.push(json.info.premium.stat_lists[i].num)
		        		}
	         		

					$('.Income_graph').find('#main1').remove();
					$('.Income_graph').find('#main2').remove();
					$('.Income_graph').find('#main3').remove();
	        		var main='<div id="main1" style="width: 140% ;height:600px; margin:0 auto;"></div><div id="main2" style="width: 140% ;height:600px; margin:0 auto;"></div><div id="main3" style="width: 140% ;height:600px; margin:0 auto;"></div>';
					$('.Income_graph_condition').after(main);
					var myChart1 = echarts.init(document.getElementById('main1'));
					option1 = {
					    backgroundColor: "#fff",
					    color: ['#463BB1'],
					    title: [{
					        text: '',
					        left: '1%',
					        top: '6%',
					        textStyle: {
					            color: '#fff'
					        }
					    }],
					    tooltip: {
					        trigger: 'item',
					        position: function (p) {
					                           // 位置回调
					                           // console.log && console.log(p);
					                           return [p[0] - 25, p[1] - 60];
					                       },
					    },
					    legend: {
					        x: 300,
					        top: '7%',
					        textStyle: {
					            color: '#ffd285',
					        },
					        data: ['在大理']
					    },
					    grid: {
					        left: '1%',
					        right: '35%',
					        top: '16%',
					        bottom: '6%',
					        containLabel: true
					    },
					    toolbox: {
					        "show": false,
					        feature: {
					            saveAsImage: {}
					        }
					    },
					    xAxis: {
					        type: 'category',
					        name: x_name1,
					        boundaryGap: true,
					        nameTextStyle: {
				                color: '#000'
				            },
					        "axisLine": {
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					        	// interval:0,
					        	// rotate:-30,
					            textStyle: {
					                color: '#000'
					            }
					        },
					        data: x_title1
					    },
					    yAxis: {
					    	name: y_name1,
					    	max: y_max1,
					    	minInterval: 1,
					        "axisLine": {
					            lineStyle: {
					                color: '#fff'
					            }
					        },
					        nameTextStyle: {
				                color: '#000'
				            },
					        splitLine: {
					            show: true,
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					            textStyle: {
					                color: '#000'
					            }
					        },
					        type: 'value'
					    },
					    series: [
					    {
				            "name": "总数",
				            "type": "line",
				            "stack": "总量",
				            symbolSize:10,
				            symbol:'circle',
				            "itemStyle": {
				                "normal": {
				                    "color": "#463BB1",
				                    "barBorderRadius": 0,
				                    "label": {
				                        "show": true,
				                        "position": "top",
				                        formatter: function(p) {
				                            // return p.value > 0 ? (p.value) : '';
				                            return '';
				                        }
				                    }
				                }
				            },
				            areaStyle: { //区域填充样式
					            normal: {
					                color: new echarts.graphic.LinearGradient(81, 115, 253, .1, [{ //填充的颜色。
					                    offset: 0, // 0% 处的颜色
					                    color: 'rgba(81,115,253,0.10)'
					                }, {
					                    offset: 0.8, // 80% 处的颜色
					                    color: 'rgba(81, 115, 253, .1)'
					                }], false),
					                shadowColor: 'rgba(81, 115, 253, .1)', //阴影颜色。支持的格式同color
					                shadowBlur: 10 //图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
					            }
					        },
				            "data": x_data1
				        }]
					}
					myChart1.setOption(option1);

					var myChart2 = echarts.init(document.getElementById('main2'));
					option2 = {
					    backgroundColor: "#fff",
					    color: ['#463BB1'],
					    title: [{
					        text: '',
					        left: '1%',
					        top: '6%',
					        textStyle: {
					            color: '#fff'
					        }
					    }],
					    tooltip: {
					        trigger: 'item',
					        position: function (p) {
					                           // 位置回调
					                           // console.log && console.log(p);
					                           return [p[0] - 25, p[1] - 60];
					                       },
					    },
					    legend: {
					        x: 300,
					        top: '7%',
					        textStyle: {
					            color: '#ffd285',
					        },
					        data: ['在大理']
					    },
					    grid: {
					        left: '1%',
					        right: '35%',
					        top: '16%',
					        bottom: '6%',
					        containLabel: true
					    },
					    toolbox: {
					        "show": false,
					        feature: {
					            saveAsImage: {}
					        }
					    },
					    xAxis: {
					        type: 'category',
					        name: x_name2,
					        boundaryGap: true,
					        nameTextStyle: {
				                color: '#000'
				            },
					        "axisLine": {
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					        	// interval:0,
					        	// rotate:-30,
					            textStyle: {
					                color: '#000'
					            }
					        },
					        data: x_title2
					    },
					    yAxis: {
					    	name: y_name2,
					    	max: y_max2,
					    	minInterval: 1,
					        "axisLine": {
					            lineStyle: {
					                color: '#fff'
					            }
					        },
					        nameTextStyle: {
				                color: '#000'
				            },
					        splitLine: {
					            show: true,
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					            textStyle: {
					                color: '#000'
					            }
					        },
					        type: 'value'
					    },
					    series: [
					    {
				            "name": "总数",
				            "type": "line",
				            "stack": "总量",
				            symbolSize:10,
				            symbol:'circle',
				            "itemStyle": {
				                "normal": {
				                    "color": "#463BB1",
				                    "barBorderRadius": 0,
				                    "label": {
				                        "show": true,
				                        "position": "top",
				                        formatter: function(p) {
				                            // return p.value > 0 ? (p.value) : '';
				                            return '';
				                        }
				                    }
				                }
				            },
				            areaStyle: { //区域填充样式
					            normal: {
					                color: new echarts.graphic.LinearGradient(81, 115, 253, .1, [{ //填充的颜色。
					                    offset: 0, // 0% 处的颜色
					                    color: 'rgba(81,115,253,0.10)'
					                }, {
					                    offset: 0.8, // 80% 处的颜色
					                    color: 'rgba(81, 115, 253, .1)'
					                }], false),
					                shadowColor: 'rgba(81, 115, 253, .1)', //阴影颜色。支持的格式同color
					                shadowBlur: 10 //图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
					            }
					        },
				            "data": x_data2
				        }]
					}
					myChart2.setOption(option2);


					var myChart3 = echarts.init(document.getElementById('main3'));
					option3 = {
					    backgroundColor: "#fff",
					    color: ['#463BB1'],
					    title: [{
					        text: '',
					        left: '1%',
					        top: '6%',
					        textStyle: {
					            color: '#fff'
					        }
					    }],
					    tooltip: {
					        trigger: 'item',
					        position: function (p) {
					                           // 位置回调
					                           // console.log && console.log(p);
					                           return '';
					                       },
					    },
					    legend: {
					        x: 300,
					        top: '7%',
					        textStyle: {
					            color: '#ffd285',
					        },
					        data: ['在大理']
					    },
					    grid: {
					        left: '1%',
					        right: '35%',
					        top: '16%',
					        bottom: '6%',
					        containLabel: true
					    },
					    toolbox: {
					        "show": false,
					        feature: {
					            saveAsImage: {}
					        }
					    },
					    xAxis: {
					        type: 'category',
					        name: x_name3,
					        boundaryGap: true,
					        nameTextStyle: {
				                color: '#000'
				            },
					        "axisLine": {
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					        	// interval:0,
					        	// rotate:-30,
					            textStyle: {
					                color: '#000'
					            }
					        },
					        data: x_title3 
					    },
					    yAxis: {
					    	name: y_name3,
					    	max: y_max3,
					    	minInterval: 1,
					        "axisLine": {
					            lineStyle: {
					                color: '#fff'
					            }
					        },
					        nameTextStyle: {
				                color: '#000'
				            },
					        splitLine: {
					            show: true,
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					            textStyle: {
					                color: '#000'
					            }
					        },
					        type: 'value'
					    },
					    series: [
					    {
				            "name": "总数",
				            "type": "line",
				            "stack": "总量",
				            symbolSize:10,
				            symbol:'circle',
				            "itemStyle": {
				                "normal": {
				                    "color": "#463BB1",
				                    "barBorderRadius": 0,
				                    "label": {
				                        "show": true,
				                        "position": "top",
				                        formatter: function(p) {
				                            // return p.value > 0 ? (p.value) : '';
				                            return '';
				                        }
				                    }
				                }
				            },
				            areaStyle: { //区域填充样式
					            normal: {
					                color: new echarts.graphic.LinearGradient(81, 115, 253, .1, [{ //填充的颜色。
					                    offset: 0, // 0% 处的颜色
					                    color: 'rgba(81,115,253,0.10)'
					                }, {
					                    offset: 0.8, // 80% 处的颜色
					                    color: 'rgba(81, 115, 253, .1)'
					                }], false),
					                shadowColor: 'rgba(81, 115, 253, .1)', //阴影颜色。支持的格式同color
					                shadowBlur: 10 //图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
					            }
					        },
				            "data": x_data3
				        }]
					}
					myChart3.setOption(option3);
					if($('.Income_graph_condition').eq(0).attr('sid')==1){
						$('#main1').show()
						$('#main2').hide()
						$('#main3').hide()
					}else if($('.Income_graph_condition').eq(0).attr('sid')==2){
						$('#main2').show()
						$('#main1').hide()
						$('#main3').hide()
					}else if($('.Income_graph_condition').eq(0).attr('sid')==3){
						$('#main3').show()
						$('#main1').hide()
						$('#main2').hide()
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
	}else{
		date_type='5';
		$.ajax({
	        type: "post",
	        async: true,
	        url: getPostUrl()+'/Policy/stat_lists',
	        data: {
				"exten": exten,
				"ins_id": ins_id,
				"product_name": product_name,
				"start_date": start_date,
				"end_date": end_date,
				"date_type":date_type,
			},
	        dataType: "json",
	        success: function(json){
	        	if(json.status==1){
	         		$('.my_earnings .KeyIndex_con_tgf').find('em').text(json.info.tgf)
	         		$('.my_earnings .KeyIndex_con_dl').find('em').text(json.info.policy_num)
	         		$('.my_earnings .KeyIndex_con_bfze').find('em').text(json.info.premium_amt)
	         			//推广费
	         			if(json.info.profit.stat_max==0){
		         			var y_max1=1000
		         		}else{
		         			var y_max1= json.info.profit.stat_max;
		         		}
		        		var y_name1= '推广费（元）';
		        		var x_name1= '天';
		        		var x_title1= [];
		        		var x_data1= [];
		        		for(var i=0;i<json.info.profit.stat_lists.length;i++){
		        			x_title1.push(json.info.profit.stat_lists[i].title)
		        			x_data1.push(json.info.profit.stat_lists[i].num)
		        		}
		        		//订单量
	         			if(json.info.policy.stat_max==0){
		         			var y_max2=1000
		         		}else{
		         			var y_max2= json.info.policy.stat_max;
		         		}
		        		
		        		var y_name2= '订单量（单）';
		        		var x_name2= '天';
		        		var x_title2= [];
		        		var x_data2= [];
		        		for(var i=0;i<json.info.policy.stat_lists.length;i++){
		        			x_title2.push(json.info.policy.stat_lists[i].title)
		        			x_data2.push(json.info.policy.stat_lists[i].num)
		        		}
	         		//保费总额
	         			if(json.info.premium.stat_max==0){
		         			var y_max3=1000
		         		}else{
		         			var y_max3= json.info.premium.stat_max;
		         		}
		        		
		        		var y_name3= '保费总额（元）';
		        		var x_name3= '天';
		        		var x_title3= [];
		        		var x_data3= [];
		        		for(var i=0;i<json.info.premium.stat_lists.length;i++){
		        			x_title3.push(json.info.premium.stat_lists[i].title)
		        			x_data3.push(json.info.premium.stat_lists[i].num)
		        		}
	         		
	         		

					$('.Income_graph').find('#main1').remove();
					$('.Income_graph').find('#main2').remove();
					$('.Income_graph').find('#main3').remove();
	        		var main='<div id="main1" style="width: 140% ;height:600px; margin:0 auto;"></div><div id="main2" style="width: 140% ;height:600px; margin:0 auto;"></div><div id="main3" style="width: 140% ;height:600px; margin:0 auto;"></div>';
					$('.Income_graph_condition').after(main);
					var myChart1 = echarts.init(document.getElementById('main1'));
					option1 = {
					    backgroundColor: "#fff",
					    color: ['#463BB1'],
					    title: [{
					        text: '',
					        left: '1%',
					        top: '6%',
					        textStyle: {
					            color: '#fff'
					        }
					    }],
					    tooltip: {
					        trigger: 'item',
					        position: function (p) {
					                           // 位置回调
					                           // console.log && console.log(p);
					                           return [p[0] - 25, p[1] - 60];
					                       },
					    },
					    legend: {
					        x: 300,
					        top: '7%',
					        textStyle: {
					            color: '#ffd285',
					        },
					        data: ['在大理']
					    },
					    grid: {
					        left: '1%',
					        right: '35%',
					        top: '16%',
					        bottom: '6%',
					        containLabel: true
					    },
					    toolbox: {
					        "show": false,
					        feature: {
					            saveAsImage: {}
					        }
					    },
					    xAxis: {
					        type: 'category',
					        name: x_name1,
					        boundaryGap: true,
					        nameTextStyle: {
				                color: '#000'
				            },
					        "axisLine": {
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					        	// interval:0,
					        	// rotate:-30,
					            textStyle: {
					                color: '#000'
					            }
					        },
					        data: x_title1
					    },
					    yAxis: {
					    	name: y_name1,
					    	max: y_max1,
					    	minInterval: 1,
					        "axisLine": {
					            lineStyle: {
					                color: '#fff'
					            }
					        },
					        nameTextStyle: {
				                color: '#000'
				            },
					        splitLine: {
					            show: true,
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					            textStyle: {
					                color: '#000'
					            }
					        },
					        type: 'value'
					    },
					    series: [
					    {
				            "name": "总数",
				            "type": "line",
				            "stack": "总量",
				            symbolSize:10,
				            symbol:'circle',
				            "itemStyle": {
				                "normal": {
				                    "color": "#463BB1",
				                    "barBorderRadius": 0,
				                    "label": {
				                        "show": true,
				                        "position": "top",
				                        formatter: function(p) {
				                            // return p.value > 0 ? (p.value) : '';
				                            return '';
				                        }
				                    }
				                }
				            },
				            areaStyle: { //区域填充样式
					            normal: {
					                color: new echarts.graphic.LinearGradient(81, 115, 253, .1, [{ //填充的颜色。
					                    offset: 0, // 0% 处的颜色
					                    color: 'rgba(81,115,253,0.10)'
					                }, {
					                    offset: 0.8, // 80% 处的颜色
					                    color: 'rgba(81, 115, 253, .1)'
					                }], false),
					                shadowColor: 'rgba(81, 115, 253, .1)', //阴影颜色。支持的格式同color
					                shadowBlur: 10 //图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
					            }
					        },
				            "data": x_data1
				        }]
					}
					myChart1.setOption(option1);

					var myChart2 = echarts.init(document.getElementById('main2'));
					option2 = {
					    backgroundColor: "#fff",
					    color: ['#463BB1'],
					    title: [{
					        text: '',
					        left: '1%',
					        top: '6%',
					        textStyle: {
					            color: '#fff'
					        }
					    }],
					    tooltip: {
					        trigger: 'item',
					        position: function (p) {
					                           // 位置回调
					                           // console.log && console.log(p);
					                           return [p[0] - 25, p[1] - 60];
					                       },
					    },
					    legend: {
					        x: 300,
					        top: '7%',
					        textStyle: {
					            color: '#ffd285',
					        },
					        data: ['在大理']
					    },
					    grid: {
					        left: '1%',
					        right: '35%',
					        top: '16%',
					        bottom: '6%',
					        containLabel: true
					    },
					    toolbox: {
					        "show": false,
					        feature: {
					            saveAsImage: {}
					        }
					    },
					    xAxis: {
					        type: 'category',
					        name: x_name2,
					        boundaryGap: true,
					        nameTextStyle: {
				                color: '#000'
				            },
					        "axisLine": {
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					        	// interval:0,
					        	// rotate:-30,
					            textStyle: {
					                color: '#000'
					            }
					        },
					        data: x_title2
					    },
					    yAxis: {
					    	name: y_name2,
					    	max: y_max2,
					    	minInterval: 1,
					        "axisLine": {
					            lineStyle: {
					                color: '#fff'
					            }
					        },
					        nameTextStyle: {
				                color: '#000'
				            },
					        splitLine: {
					            show: true,
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					            textStyle: {
					                color: '#000'
					            }
					        },
					        type: 'value'
					    },
					    series: [
					    {
				            "name": "总数",
				            "type": "line",
				            "stack": "总量",
				            symbolSize:10,
				            symbol:'circle',
				            "itemStyle": {
				                "normal": {
				                    "color": "#463BB1",
				                    "barBorderRadius": 0,
				                    "label": {
				                        "show": true,
				                        "position": "top",
				                        formatter: function(p) {
				                            // return p.value > 0 ? (p.value) : '';
				                            return '';
				                        }
				                    }
				                }
				            },
				            areaStyle: { //区域填充样式
					            normal: {
					                color: new echarts.graphic.LinearGradient(81, 115, 253, .1, [{ //填充的颜色。
					                    offset: 0, // 0% 处的颜色
					                    color: 'rgba(81,115,253,0.10)'
					                }, {
					                    offset: 0.8, // 80% 处的颜色
					                    color: 'rgba(81, 115, 253, .1)'
					                }], false),
					                shadowColor: 'rgba(81, 115, 253, .1)', //阴影颜色。支持的格式同color
					                shadowBlur: 10 //图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
					            }
					        },
				            "data": x_data2
				        }]
					}
					myChart2.setOption(option2);


					var myChart3 = echarts.init(document.getElementById('main3'));
					option3 = {
					    backgroundColor: "#fff",
					    color: ['#463BB1'],
					    title: [{
					        text: '',
					        left: '1%',
					        top: '6%',
					        textStyle: {
					            color: '#fff'
					        }
					    }],
					    tooltip: {
					        trigger: 'item',
					        position: function (p) {
					                           // 位置回调
					                           // console.log && console.log(p);
					                           return [p[0] - 25, p[1] - 60];
					                       },
					    },
					    legend: {
					        x: 300,
					        top: '7%',
					        textStyle: {
					            color: '#ffd285',
					        },
					        data: ['在大理']
					    },
					    grid: {
					        left: '1%',
					        right: '35%',
					        top: '16%',
					        bottom: '6%',
					        containLabel: true
					    },
					    toolbox: {
					        "show": false,
					        feature: {
					            saveAsImage: {}
					        }
					    },
					    xAxis: {
					        type: 'category',
					        name: x_name3,
					        boundaryGap: true,
					        nameTextStyle: {
				                color: '#000'
				            },
					        "axisLine": {
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					        	// interval:0,
					        	// rotate:-30,
					            textStyle: {
					                color: '#000'
					            }
					        },
					        data: x_title3 
					    },
					    yAxis: {
					    	name: y_name3,
					    	max: y_max3,
					    	minInterval: 1,
					        "axisLine": {
					            lineStyle: {
					                color: '#fff'
					            }
					        },
					        nameTextStyle: {
				                color: '#000'
				            },
					        splitLine: {
					            show: true,
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					            textStyle: {
					                color: '#000'
					            }
					        },
					        type: 'value'
					    },
					    series: [
					    {
				            "name": "总数",
				            "type": "line",
				            "stack": "总量",
				            symbolSize:10,
				            symbol:'circle',
				            "itemStyle": {
				                "normal": {
				                    "color": "#463BB1",
				                    "barBorderRadius": 0,
				                    "label": {
				                        "show": true,
				                        "position": "top",
				                        formatter: function(p) {
				                            // return p.value > 0 ? (p.value) : '';
				                            return '';
				                        }
				                    }
				                }
				            },
				            areaStyle: { //区域填充样式
					            normal: {
					                color: new echarts.graphic.LinearGradient(81, 115, 253, .1, [{ //填充的颜色。
					                    offset: 0, // 0% 处的颜色
					                    color: 'rgba(81,115,253,0.10)'
					                }, {
					                    offset: 0.8, // 80% 处的颜色
					                    color: 'rgba(81, 115, 253, .1)'
					                }], false),
					                shadowColor: 'rgba(81, 115, 253, .1)', //阴影颜色。支持的格式同color
					                shadowBlur: 10 //图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
					            }
					        },
				            "data": x_data3
				        }]
					}
					myChart3.setOption(option3);
					if($('.Income_graph_condition').eq(0).attr('sid')==1){
						$('#main1').show()
						$('#main2').hide()
						$('#main3').hide()
					}else if($('.Income_graph_condition').eq(0).attr('sid')==2){
						$('#main2').show()
						$('#main1').hide()
						$('#main3').hide()
					}else if($('.Income_graph_condition').eq(0).attr('sid')==3){
						$('#main3').show()
						$('#main1').hide()
						$('#main2').hide()
					}
					
				}
	        }
	    })

	}

	
}

/*

	统计概览重置按钮

*/
function Income_graph_condition(obj){
	var index = $('.my_earnings .Income_graph_condition a').index($(obj));
	$(obj).addClass('active').siblings('a').removeClass('active');
	$(obj).parent('.Income_graph_condition').attr('sid',$(obj).attr('sid'));
	var exten = $('.my_earnings .promotion_Mode').find('span').html(),
		product_name=$('.my_earnings .search').val(),
		year=$('.my_earnings .get_Year').find('span').html(),
		month=$('.my_earnings .get_month').find('span').html(),
		week=$('.my_earnings .get_week').find('span').html(),
		start_date='',
		end_date='',
		date_type='';
		if(exten=='全部'){
			exten='';
		}else if(exten=='二维码'){
			exten='1'
		}else if(exten=='链接'){
			exten='2'
		}else if(exten=='API接口'){
			exten='3'
		}
		if(month=='全部'){
			start_date=year+'-1-1';
			end_date='';
			date_type='1';
		}else if(month!='全部'){
			if(week=='全部'){
				start_date=year+'-'+month+'-1';
				end_date='';
				date_type='2';
			}else{
				start_date=year+'-'+month+'-'+week.slice(-5).slice(0,2);
				end_date=year+'-'+month+'-'+week.slice(-5).slice(-2);
				date_type='3';
			}
		}
	if(index==0){
		$('#main1').show();
		$('#main2').hide();
		$('#main3').hide();
	}else if(index==1){
		$('#main2').show();
		$('#main1').hide();
		$('#main3').hide();
	}else if(index==2){
		$('#main3').show();
		$('#main1').hide();
		$('#main2').hide();
	}
}


/*

	产品合作>产品定制状态

*/

function custom_Status(obj){
	if($(obj).attr('status')=='open'){
		$(obj).find('.time_list').show()
		$(obj).attr('status','shut')
		$(obj).find('img').addClass('img')
	}else{
		$(obj).find('.time_list').hide();
		$(obj).attr('status','open')
		$(obj).find('img').removeClass('img')
	}
}



/*

	二维码，链接，API显示

*/
function Get_promotion_methods_over(obj,type){
	// clearInterval(timer)
	var sid=$(obj).attr('sid');
	var sid1=$(obj).attr('sid1');
	var dom = $(obj).parent().parent().parent().attr('id');
	var index=$('#'+dom+' .product_conter').index($(obj).parent().parent('ul'))
	var index1=$('#'+dom+' .product_conter1').index($(obj).parent().parent('ul'))
	
	$(obj).siblings('.Get_promotion_methods').removeClass('Get_promotion_methods1 Get_promotion_methods2 Get_promotion_methods3 Get_promotion_methods1_1 Get_promotion_methods2_1 Get_promotion_methods3_1')
	
	if(type==1){
		
		if(index==0||index1==0||index==1||index1==1){
	    	$(obj).siblings('.Get_promotion_methods').addClass('Get_promotion_methods3_1')
	    }else{
	    	$(obj).siblings('.Get_promotion_methods').addClass('Get_promotion_methods3')
	    }
		
		$.ajax({
	        type: "post",
	        async: true,
	        url: getPostUrl()+'/CompanyApply/show_qrcode',
	        data: {
				"apply_id": sid1,
				"product_id": sid,
				
			},
	        dataType: "json",
	        success: function(json){
	      		if(json.status){
	      			$(obj).siblings('.Get_promotion_methods').find('.img').show()
	      			$(obj).siblings('.Get_promotion_methods').find('.p1').hide()
	      			$(obj).siblings('.Get_promotion_methods').find('.p2').hide()
	      			$(obj).siblings('.Get_promotion_methods').find('.img').attr('src',json.info.qrcode_img_url)
	      			$(obj).siblings('.Get_promotion_methods').find('.p').show()
	      			$(obj).siblings('.Get_promotion_methods').find('.p').html("下载专属二维码")
	      			
	      			$(obj).siblings('.Get_promotion_methods').toggle(); 
    				stopPropagation(event);
	      		}else{
	      			if(json.info='该产品已下架'){
	      				$(obj).siblings('.Get_promotion_methods').find('.img').hide()
	      				$(obj).siblings('.Get_promotion_methods').find('.p1').show()
	      				$(obj).siblings('.Get_promotion_methods').find('.p1').html(json.info)
	      				$(obj).siblings('.Get_promotion_methods').find('.p').hide()
	      				var title=json.info,
							name1='确定',
							Method1='cancel()';
						alert(title,name1,Method1)
	      			}
	      		}
	        }
	    })
	    
	}else if(type==2){
		if(index==0||index1==0){
	    	$(obj).siblings('.Get_promotion_methods').addClass('Get_promotion_methods1_1')
	    }else{
	    	$(obj).siblings('.Get_promotion_methods').addClass('Get_promotion_methods1')
	    }
		$.ajax({
	        type: "post",
	        async: true,
	        url: getPostUrl()+'/CompanyApply/show_link',
	        data: {
				"apply_id": sid1,
				"product_id": sid,
			},
	        dataType: "json",
	        success: function(json){
	      		if(json.status){
	      			$(obj).siblings('.Get_promotion_methods').find('.img').hide()
	      			$(obj).siblings('.Get_promotion_methods').find('.p1').hide()
	      			$(obj).siblings('.Get_promotion_methods').find('.p2').show()
	      			$(obj).siblings('.Get_promotion_methods').find('.p2').val(json.info.link)
	      			$(obj).siblings('.Get_promotion_methods').find('.p').html("复制专属链接")
	      			$(obj).siblings('.Get_promotion_methods').find('.p').show()
	      			$(obj).siblings('.Get_promotion_methods').toggle(); 
	      			stopPropagation(event)
    				$(obj).siblings('.Get_promotion_methods').find('.p').attr('data-clipboard-text',json.info.link)
    				var btn = $(obj).siblings('.Get_promotion_methods').find('.p')[0];
    				clipboard_src(btn)
	      		}else{
	      			if(json.info='该产品已下架'){
	      				$(obj).siblings('.Get_promotion_methods').find('.img').hide()
	      				$(obj).siblings('.Get_promotion_methods').find('.p2').hide()
	      				$(obj).siblings('.Get_promotion_methods').find('.p1').show()
	      				$(obj).siblings('.Get_promotion_methods').find('.p1').html(json.info)
	      				$(obj).siblings('.Get_promotion_methods').find('.p').hide()
	      				var title=json.info,
							name1='确定',
							Method1='cancel()';
						alert(title,name1,Method1)
	      			}
	      		}	
	        }
	    })
	    
	}else if(type==3){
		if(index==0||index1==0){
	    	$(obj).siblings('.Get_promotion_methods').addClass('Get_promotion_methods2_1')
	    }else{
	    	$(obj).siblings('.Get_promotion_methods').addClass('Get_promotion_methods2')
	    }
		$(obj).siblings('.Get_promotion_methods').find('.img').hide()
		$(obj).siblings('.Get_promotion_methods').find('.p2').hide()
		$(obj).siblings('.Get_promotion_methods').find('.p1').show()
		$(obj).siblings('.Get_promotion_methods').find('.p1').html("API文档")
		$(obj).siblings('.Get_promotion_methods').find('.p').html("查看详情")
		$(obj).siblings('.Get_promotion_methods').find('.p').show()
		$(obj).siblings('.Get_promotion_methods').toggle(); 
    	stopPropagation(event);
	     		
	}
	
}
function stopPropagation(e){

    e=window.event||e;

    if(document.all){  //只有ie识别

        e.cancelBubble=true;

    }else{

        e.stopPropagation();

    }

}

/*

	二维码、链接、API隐藏

*/
$(document).click(function(){ 
    $(".Get_promotion_methods").hide(); 
  }) 

/*

	二维码、链接、API指定区域显示

*/
function Get_promotion_met(obj){
	if(navigator.userAgent.indexOf("MSIE 8.0")>0){  //只有ie识别

        var title='复制失败！请手动复制',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
		    return false;

    }
	stopPropagation()
}


/*

	财务结算查看明细按钮

*/
function view_Details1(source_type,id,type,status,start_date,end_date,product_name){
	$('.platform_content_record').hide();
	$('.bill_details').show();
	$('.bill_details .enterprise h2 .h2_title').html('“'+product_name+'”账单明细')
	$('.bill_details .enterprise h2 .h2_time').html('——账单时间：'+start_date+'-'+end_date)
	$('#Product_promotion_query4').attr({
		"sid": id,
		"type": type,
		"status": status,
		"source_type": source_type
	});
	$('#Product_promotion_query4').click();

}

// 财务结算对账、收款、付款、开发票、收发票
function view_Details(source_type,id,type,status,month,code,source_name,product_name,amt){
	if(status==1){
		if(type==2){
			$('#bill .bill_Validation_dz p').eq(2).hide()
			$('#bill .bill_Validation_dz p').eq(4).find('b').html('保费')
		}else if(type==1){

			$('#bill .bill_Validation_dz p').eq(4).find('b').html("推广费：")
		}
		$('#bill').show()
		$('#bill .bill_Validation_dz').show()
		$('#bill .bill_Validation_fp').hide()
		$('#bill .bill_Validation_dz p').eq(0).show()
		$('#bill .bill_Validation_dz p').eq(1).show()
		$('#bill .bill_Validation_dz p').eq(2).show()
		$('#bill .bill_Validation_dz p').eq(3).show()
		$('#bill .bill_Validation_dz p').eq(4).show()
		$('#bill .bill_Validation_dz h2').html('确认对账')
		$('#bill .bill_Validation_dz p').eq(0).find('span').html(month?month:"其他")
		$('#bill .bill_Validation_dz p').eq(1).find('span').html(code?code:"其他")
		$('#bill .bill_Validation_dz p').eq(2).find('span').html(source_name?source_name:"其他")
		$('#bill .bill_Validation_dz p').eq(3).find('span').html(product_name?product_name:"其他")
		$('#bill .bill_Validation_dz p').eq(4).find('span').html(amt?amt:'0.00'+'元')
		$('#bill .bill_Validation_dz p').eq(0).find('b').html("账单周期：")
		$('#bill .bill_Validation_dz p').eq(1).find('b').html("账单编号：")
		if(source_type&&source_type==1){
			$('#bill .bill_Validation_dz p').eq(2).find('b').html("保险公司：")
		}else if(source_type&&source_type==2){
			$('#bill .bill_Validation_dz p').eq(2).find('b').html("经纪公司：")
		}else if(source_type&&source_type==3){
			$('#bill .bill_Validation_dz p').eq(2).find('b').html("运营平台：")
		}
		$('#bill .bill_Validation_dz p').eq(3).find('b').html("产品名称：")
		$('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('sid',id)
		$('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('type',type)
		$('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('status',status)
		$('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('source_type',source_type)
	}else if(status==2){
		$('#bill').show()
		$('#bill .bill_Validation_fp').show()
		$('#bill .bill_Validation_dz').hide()
		$('#bill .bill_Validation_fp .bill_Validation_btn_qr').attr('sid',id)
		$('#bill .bill_Validation_fp .bill_Validation_btn_qr').attr('type',type)
		$('#bill .bill_Validation_fp .bill_Validation_btn_qr').attr('status',status)
		$('#bill .bill_Validation_fp .bill_Validation_btn_qr').attr('source_type',source_type)
	}else if(status==5){
		$('#bill').show()
		$('#bill .bill_Validation_dz').show()
		$('#bill .bill_Validation_fp').hide()
		$('#bill .bill_Validation_dz p').eq(0).show()
		$('#bill .bill_Validation_dz p').eq(1).show()
		$('#bill .bill_Validation_dz p').eq(2).show()
		$('#bill .bill_Validation_dz p').eq(3).show()
		$('#bill .bill_Validation_dz p').eq(4).show()
		$('#bill .bill_Validation_dz h2').html('确认收款')
		$('#bill .bill_Validation_dz p').eq(0).find('span').html(month?month:"其他")
		$('#bill .bill_Validation_dz p').eq(1).find('span').html(code?code:"其他")
		$('#bill .bill_Validation_dz p').eq(2).find('span').html(source_name?source_name:"其他")
		$('#bill .bill_Validation_dz p').eq(3).find('span').html(product_name?product_name:"其他")
		$('#bill .bill_Validation_dz p').eq(4).find('span').html(amt?amt:'0.00'+'元')
		if(source_type&&source_type==1){
			$('#bill .bill_Validation_dz p').eq(2).find('b').html("保险公司：")
		}else if(source_type&&source_type==2){
			$('#bill .bill_Validation_dz p').eq(2).find('b').html("经纪公司：")
		}else if(source_type&&source_type==3){
			$('#bill .bill_Validation_dz p').eq(2).find('b').html("运营平台：")
		}
		$('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('sid',id)
		$('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('type',type)
		$('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('status',status)
		$('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('source_type',source_type)
		// if(type==2){
		// 	$('#bill .bill_Validation_dz p').eq(2).hide()
		// }
	}else if(status==4&&type==2){
		$('#bill').show()
		$('#bill .bill_Validation_dz').show()
		$('#bill .bill_Validation_fp').hide()
		$('#bill .bill_Validation_dz h2').html('确认付款')
		$('#bill .bill_Validation_dz p').eq(0).find('span').html(month?month:"其他")
		$('#bill .bill_Validation_dz p').eq(1).find('span').html(code?code:"其他")
		$('#bill .bill_Validation_dz p').eq(2).find('span').html(source_name?source_name:"其他")
		$('#bill .bill_Validation_dz p').eq(3).find('span').html(product_name?product_name:"其他")
		$('#bill .bill_Validation_dz p').eq(4).find('span').html(amt?amt:'0.00'+'元')
		$('#bill .bill_Validation_dz p').eq(4).find('b').html('保费')
		if(source_type&&source_type==1){
			$('#bill .bill_Validation_dz p').eq(2).find('b').html("保险公司：")
		}else if(source_type&&source_type==2){
			$('#bill .bill_Validation_dz p').eq(2).find('b').html("经纪公司：")
		}else if(source_type&&source_type==3){
			$('#bill .bill_Validation_dz p').eq(2).find('b').html("运营平台：")
		}
		$('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('sid',id)
		$('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('type',type)
		$('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('status',status)
		$('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('source_type',source_type)
		$('#bill .bill_Validation_dz p').eq(0).show()
		$('#bill .bill_Validation_dz p').eq(1).show()
		$('#bill .bill_Validation_dz p').eq(3).show()
		$('#bill .bill_Validation_dz p').eq(4).show()
		$('#bill .bill_Validation_dz p').eq(2).show()
	}else if(status==3&&type==2){
		$.ajax({
		        type: "post",
		        async: true,
		        url: getPostUrl()+'/Bill/invo_info',
		        data: {
					"bill_id": id,
					"type": type,
					"source_type":source_type
				},
		        dataType: "json",
		        success: function(json){
		        	if(json.status){
		        		$('#bill').show()
		        		$('#bill .bill_Validation_dz').show()
						$('#bill .bill_Validation_fp').hide()
						$('#bill .bill_Validation_dz p').eq(2).show()
						$('#bill .bill_Validation_dz h2').html('确认收票')
		        		$('#bill .bill_Validation_dz p').eq(0).find('b').html("发票编号：")
						$('#bill .bill_Validation_dz p').eq(1).find('b').html("物流公司名称：")
						$('#bill .bill_Validation_dz p').eq(2).find('b').html("物流编号：")		
						$('#bill .bill_Validation_dz p').eq(0).find('span').html(json.info.invo_number?json.info.invo_number:"其他")
						$('#bill .bill_Validation_dz p').eq(1).find('span').html(json.info.exp_name?json.info.exp_name:"其他")
						$('#bill .bill_Validation_dz p').eq(2).find('span').html(json.info.exp_number?json.info.exp_number:"其他")		
		        		$('#bill .bill_Validation_dz p').eq(3).hide()
		        		$('#bill .bill_Validation_dz p').eq(4).hide()
		        		$('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('sid',id)
						$('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('type',type)
						$('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('status',status)
						$('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('source_type',source_type)
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
//财务结算电子发票、纸质发票切换
// function card(obj){
// 	$(obj).parent('.identity_type').attr('sid',$(obj).attr('sid'))
// 	$(obj).find('img').attr('src','../images/Selected.png')
// 	$(obj).siblings('label').find('img').attr('src','../images/Unchecked.png')
// 	$('#bill').find('.bill_Validation').eq(1).find('.Invoice').hide()
// 	if($(obj).attr('sid')==1){
// 		$('#bill').find('.bill_Validation').eq(1).find('.paper_Invoice').show()
// 	}else if($(obj).attr('sid')==2){
// 		$('#bill').find('.bill_Validation').eq(1).find('.electronic_Invoice').show()
// 	}
// }

/*

	确认对账

*/
function invoice(type){
	
	if(type==1){
		var bill_id = $('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('sid');
		var type = $('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('type');
		var oper_type = $('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('status');
		var source_type = $('#bill .bill_Validation_dz .bill_Validation_btn_qr').attr('source_type');
		if(oper_type==1){
			$.ajax({
		        type: "post",
		        async: true,
		        url: getPostUrl()+'/Bill/status_do',
		        data: {
					"bill_id": bill_id,
					"type": type,
					"oper_type":1,
					"source_type":source_type
				},
		        dataType: "json",
		        success: function(json){
		        	if(json.status){
		        		$('#bill').hide()
		        		$('#bill .bill_clear').html()
		        		$('#bill .bill_clear1').val('')
		        		$('#Product_promotion_query3').click()
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
		}else if(oper_type==5){
			$.ajax({
		        type: "post",
		        async: true,
		        url: getPostUrl()+'/Bill/status_do',
		        data: {
					"bill_id": bill_id,
					"type": type,
					"oper_type":3,
					"source_type":source_type
				},
		        dataType: "json",
		        success: function(json){
		        	if(json.status){
		        		$('#bill').hide()
		        		$('#bill .bill_clear').html()
		        		$('#bill .bill_clear1').val('')
		        		$('#Product_promotion_query3').click()
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
		}else if(oper_type==4){
			$.ajax({
		        type: "post",
		        async: true,
		        url: getPostUrl()+'/Bill/status_do',
		        data: {
					"bill_id": bill_id,
					"type": type,
					"oper_type":3,
					"source_type":source_type
				},
		        dataType: "json",
		        success: function(json){
		        	if(json.status){
		        		$('#bill').hide()
		        		$('#bill .bill_clear').html()
		        		$('#bill .bill_clear1').val('')
		        		$('#Product_promotion_query3').click()
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
		}else if(oper_type==3){
			$.ajax({
		        type: "post",
		        async: true,
		        url: getPostUrl()+'/Bill/status_do',
		        data: {
					"bill_id": bill_id,
					"type": type,
					"oper_type":2,
					"source_type":source_type
				},
		        dataType: "json",
		        success: function(json){
		        	if(json.status){
		        		$('#bill').hide()
		        		$('#bill .bill_clear').html()
		        		$('#bill .bill_clear1').val('')
		        		$('#Product_promotion_query3').click()
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

		
	}else if(type==2){
		var invo_number = $('#bill .paper_Invoice label').eq(0).find('input').val();
		var exp_id = $('#bill .paper_Invoice .paper_Invoice_div').find('span').attr('sid');
		var exp_number = $('#bill .paper_Invoice label').eq(2).find('input').val();
		var bill_id = $('#bill .bill_Validation_fp .bill_Validation_btn_qr').attr('sid');
		var type = $('#bill .bill_Validation_fp .bill_Validation_btn_qr').attr('type');
		var oper_type = $('#bill .bill_Validation_fp .bill_Validation_btn_qr').attr('status');
		var source_type = $('#bill .bill_Validation_fp .bill_Validation_btn_qr').attr('source_type');
		if(invo_number==''){
			var title='发票编号不能为空！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}
		if(exp_id==''){
			var title='请选择物流公司！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}
		if(exp_number==''){
			var title='物流单号不能为空！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}
		$.ajax({
	        type: "post",
	        async: true,
	        url: getPostUrl()+'/Bill/status_do',
	        data: {
				"bill_id": bill_id,
				"type": type,
				"oper_type":2,
				"invo_type":1,
				"invo_number":invo_number,
				"exp_id":exp_id,
				"exp_number":exp_number,
				"source_type":source_type
			},
	        dataType: "json",
	        success: function(json){
	        	if(json.status){
	        		$('#bill').hide()
	        		$('#bill .bill_clear').html()
		        	$('#bill .bill_clear1').val('')
	        		$('#Product_promotion_query3').click()
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

	账单明细页查询

*/
function Billdetails(platform_content_record3,id,type,page,create_start,create_end,order_val,time_type,app_val,source_type){
	if(id==null||id=="null"){
		id=""
	}
	if(type==null||type=="null"){
		type=""
	}
	if(page==null||page=="null"){
		page=""
	}
	if(order_val==null||order_val=="null"){
		order_val=""
	}
	if(app_val==null||app_val=="null"){
		app_val=""
	}
	if(create_start==null||create_start=="null"){
		create_start=""
	}
	if(create_end==null||create_end=="null"){
		create_end=""
	}
	$.ajax({
        type: "post",
        async: true,
        url: getPostUrl()+'/Bill/policy_lists',
        data: {
			"bill_id": id,
			"type": type,
			"page":page,
			"limit":8,
			"order_val":order_val,
			"time_type":time_type,
			"app_val":app_val,
			"create_start":create_start,
			"create_end":create_end,
			"source_type":source_type
		},
        dataType: "json",
        success: function(json){
        	if(json.status){
        		var num =Math.ceil(json.url/8);
        		var str='';
        		if(json.info.policy_lists!=null&&json.info.policy_lists!=''){
        			for(var i=0;i<json.info.policy_lists.length;){
	        			str+='<ul class="product_conter product_ul" style="display:'+(json.info.policy_lists[i]?"":"none")+'">'+
								'<li class="l" style="width: 20%;"><img src="./images/checkoffShape.png" status="open" class="checkon switch_img" sid="'+(json.info.policy_lists[i]&&json.info.policy_lists[i].id?json.info.policy_lists[i].id:"-")+'" alt=""><span style="width:70%;">'+(json.info.policy_lists[i]&&json.info.policy_lists[i].order_no?json.info.policy_lists[i].order_no:"-")+'</span></li>'
								str+='<li class="l" style="width: 5%;">'+(json.info.policy_lists[i]&&json.info.policy_lists[i].app_name?json.info.policy_lists[i].app_name:"-")+'</li>'+
								'<li class="l" style="overflow:hidden;">'+(json.info.policy_lists[i]&&json.info.policy_lists[i].create_time?json.info.policy_lists[i].create_time:"-")+'</li>'+
								'<li class="l" style="overflow:hidden;">'+(json.info.policy_lists[i]&&json.info.policy_lists[i].issue_time?json.info.policy_lists[i].issue_time:"-")+'</li>'+
								'<li class="l" style="overflow:hidden;">'+(json.info.policy_lists[i]&&json.info.policy_lists[i].bgn_tm?json.info.policy_lists[i].bgn_tm:"-")+'</li>'+
								'<li class="l" style="overflow:hidden;">'+(json.info.policy_lists[i]&&json.info.policy_lists[i].premium?json.info.policy_lists[i].premium:"-")+'元</li>'
								if(type!=2){
									str+='<li class="l li" style="width: 19%;">'+(json.info.policy_lists[i]&&json.info.policy_lists[i].amt?json.info.policy_lists[i].amt:"-")+'</li>'
								}else{
									str+='<li class="l li" style="width: 19%;">'+(json.info.policy_lists[i]&&json.info.policy_lists[i].policy_no?json.info.policy_lists[i].policy_no:"-")+'</li>'
								}
								
							str+='</ul>'
						str+='<ul class="product_conter product_ul" style="display:'+(json.info.policy_lists[i+1]?"":"none")+'">'+
								'<li class="l" style="width: 20%;"><img src="./images/checkoffShape.png" status="open" class="checkon switch_img" sid="'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].id?json.info.policy_lists[i+1].id:"-")+'" alt=""><span style="width:70%;">'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].order_no?json.info.policy_lists[i+1].order_no:"-")+'</span></li>'
								
								str+='<li class="l" style="width: 5%;">'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].app_name?json.info.policy_lists[i+1].app_name:"-")+'</li>'+
								'<li class="l" style="overflow:hidden;">'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].create_time?json.info.policy_lists[i+1].create_time:"-")+'</li>'+
								'<li class="l" style="overflow:hidden;">'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].issue_time?json.info.policy_lists[i+1].issue_time:"-")+'</li>'+
								'<li class="l" style="overflow:hidden;">'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].bgn_tm?json.info.policy_lists[i+1].bgn_tm:"-")+'</li>'+
								'<li class="l" style="overflow:hidden;">'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].premium?json.info.policy_lists[i+1].premium:"-")+'元</li>'
								if(type!=2){
									str+='<li class="l li" style="width: 19%;">'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].amt?json.info.policy_lists[i+1].amt:"-")+'</li>'
								}else{
									str+='<li class="l li" style="width: 19%;">'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].policy_no?json.info.policy_lists[i+1].policy_no:"-")+'</li>'
								}
							str+='</ul>'
						i=i+2;
	        		}
        		}else{
        			str=''
        		}
        		$(platform_content_record3+' .paging').find('a').remove('.page');
				$(platform_content_record3+' .paging').find('a').remove('.active');
				$(platform_content_record3+' .paging').find('a').remove('a');
        		$(platform_content_record3).find('.product_conter').remove();
    			$(platform_content_record3).find('.product_conter1').remove();
    			$(platform_content_record3).find('.product_header').after(str);
    			if(num!=0&&num!=''&&num!=null){
	    			pageEvent_Billdetails(platform_content_record3,num,id,type,page,create_start,create_end,order_val,time_type,app_val,source_type);
    			}else{
    				$(platform_content_record3+' .paging').find('.page').remove()
    				$(platform_content_record3+'  .nextPage').hide();
					$(platform_content_record3+'  .prevPage').hide();
					for(var i=0;i<3;i++){
						str+='<ul class="product_conter product_ul">'+
							'<li class="l" style="width: 20%;"></li>'+
							'<li class="l" style="width: 5%;"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l" style="width: 19%;"></li>'+
						'</ul>'
						str+='<ul class="product_conter1 product_ul">'+
							'<li class="l" style="width: 20%;"></li>'+
							'<li class="l" style="width: 5%;"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l"></li>'+
							'<li class="l" style="width: 19%;"></li>'+
						'</ul>'

					}
					$(platform_content_record3).find('.product_header').after(str);
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

	账单明细页查询

*/
function Billdetails_nofirst(platform_content_record3,id,type,page,create_start,create_end,order_val,time_type,app_val,source_type){
	if(id==null||id=="null"){
		id=""
	}
	if(type==null||type=="null"){
		type=""
	}
	if(page==null||page=="null"){
		page=""
	}
	if(order_val==null||order_val=="null"){
		order_val=""
	}
	if(app_val==null||app_val=="null"){
		app_val=""
	}
	if(create_start==null||create_start=="null"){
		create_start=""
	}
	if(create_end==null||create_end=="null"){
		create_end=""
	}
	$.ajax({
        type: "post",
        async: true,
        url: getPostUrl()+'/Bill/policy_lists',
        data: {
			"bill_id": id,
			"type": type,
			"page":page,
			"limit":8,
			// "product_name":product_name,
			// "ins_id":ins_id,
			"order_val":order_val,
			"time_type":time_type,
			"app_val":app_val,
			"create_start":create_start,
			"create_end":create_end,
			"source_type":source_type
		},
        dataType: "json",
        success: function(json){
        	if(json.status){
        		var num =Math.ceil(json.url/8);
        		var str='';
        		if(json.info.policy_lists!=null&&json.info.policy_lists!=''){
        			for(var i=0;i<json.info.policy_lists.length;){
	        			str+='<ul class="product_conter product_ul" style="display:'+(json.info.policy_lists[i]?"":"none")+'">'+
								'<li class="l" style="width: 20%;"><img src="./images/checkoffShape.png" status="open" class="checkon switch_img" sid="'+(json.info.policy_lists[i]&&json.info.policy_lists[i].id?json.info.policy_lists[i].id:"-")+'" alt=""><span style="width:70%;">'+(json.info.policy_lists[i]&&json.info.policy_lists[i].order_no?json.info.policy_lists[i].order_no:"-")+'</span></li>'
								
								str+='<li class="l" style="width: 5%;">'+(json.info.policy_lists[i]&&json.info.policy_lists[i].app_name?json.info.policy_lists[i].app_name:"-")+'</li>'+
								'<li class="l" style="overflow:hidden;">'+(json.info.policy_lists[i]&&json.info.policy_lists[i].create_time?json.info.policy_lists[i].create_time:"-")+'</li>'+
								'<li class="l" style="overflow:hidden;">'+(json.info.policy_lists[i]&&json.info.policy_lists[i].issue_time?json.info.policy_lists[i].issue_time:"-")+'</li>'+
								'<li class="l" style="overflow:hidden;">'+(json.info.policy_lists[i]&&json.info.policy_lists[i].bgn_tm?json.info.policy_lists[i].bgn_tm:"-")+'</li>'+
								'<li class="l" style="overflow:hidden;">'+(json.info.policy_lists[i]&&json.info.policy_lists[i].premium?json.info.policy_lists[i].premium:"-")+'元</li>'
								'<li class="l li" style="width: 19%;">'+(json.info.policy_lists[i]&&json.info.policy_lists[i].policy_no?json.info.policy_lists[i].policy_no:"-")+'</li>'
								if(type!=2){
									str+='<li class="l li" style="width: 19%;">'+(json.info.policy_lists[i]&&json.info.policy_lists[i].amt?json.info.policy_lists[i].amt:"-")+'</li>'
								}else{
									str+='<li class="l li" style="width: 19%;">'+(json.info.policy_lists[i]&&json.info.policy_lists[i].policy_no?json.info.policy_lists[i].policy_no:"-")+'</li>'
								}
								// '<li class="l">'+(json.info.policy_lists[i]&&json.info.policy_lists[i].amt?json.info.policy_lists[i].amt:"-")+'</li>'+
							str+='</ul>'
						str+='<ul class="product_conter product_ul" style="display:'+(json.info.policy_lists[i+1]?"":"none")+'">'+
								'<li class="l" style="width: 20%;"><img src="./images/checkoffShape.png" status="open" class="checkon switch_img" sid="'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].id?json.info.policy_lists[i+1].id:"-")+'" alt=""><span style="width:70%;">'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].order_no?json.info.policy_lists[i+1].order_no:"-")+'</span></li>'
								
								str+='<li class="l" style="width: 5%;">'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].app_name?json.info.policy_lists[i+1].app_name:"-")+'</li>'+
								'<li class="l" style="overflow:hidden;">'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].create_time?json.info.policy_lists[i+1].create_time:"-")+'</li>'+
								'<li class="l" style="overflow:hidden;">'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].issue_time?json.info.policy_lists[i+1].issue_time:"-")+'</li>'+
								'<li class="l" style="overflow:hidden;">'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].bgn_tm?json.info.policy_lists[i+1].bgn_tm:"-")+'</li>'+
								'<li class="l" style="overflow:hidden;">'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].premium?json.info.policy_lists[i+1].premium:"-")+'元</li>'
								// '<li class="l li" style="width: 19%;">'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].policy_no?json.info.policy_lists[i+1].policy_no:"-")+'</li>'+
								if(type!=2){
									str+='<li class="l li" style="width: 19%;">'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].amt?json.info.policy_lists[i+1].amt:"-")+'</li>'
								}else{
									str+='<li class="l li" style="width: 19%;">'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].policy_no?json.info.policy_lists[i+1].policy_no:"-")+'</li>'
								}
								// '<li class="l">'+(json.info.policy_lists[i+1]&&json.info.policy_lists[i+1].amt?json.info.policy_lists[i+1].amt:"-")+'</li>'+
							str+='</ul>'
						i=i+2;
	        		}
        		}else{
        			str=''
        		}
        		$(platform_content_record3).find('.product_conter').remove();
    			$(platform_content_record3).find('.product_conter1').remove();
    			$(platform_content_record3).find('.product_header').after(str);
    			
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

	账单明细页重置按钮

*/
function billdetails_Reset(){
	$('.bill_details #bill_details_span').html('&nbsp;&nbsp;'+'全部'+'&nbsp;&nbsp;');
	$('.bill_details #bill_details_span1').html('&nbsp;&nbsp;'+'全部'+'&nbsp;&nbsp;');
	$('.bill_details .Settlement_status').find('span').attr('sid','3');
	$('.bill_details .Settlement_status').find('span').html('下单时间&nbsp;&nbsp;');
	$('.bill_details .order_Search').val('');
	$('.bill_details .product_Search').val('');
}



/*

	财务结算页  收入和支出切换

*/
function Settlement_type(obj){
	var index=$('.Settlement_type').index($(obj));
	var sid = $('.Settlement_type').eq(index).attr('sid')
	$('.Settlement_type').removeClass('active');
	$(obj).addClass('active');
	$(obj).parent('.Product_promotion_tiem1').attr('sid',sid)
	$('#platform_content_record7 .product_conter li').html()
	$('#platform_content_record7 .product_conter1 li').html()
	$('#platform_content_record7 .paging button').hide()
	$('#platform_content_record7 .paging a').remove()
	if(sid==1){
		$('.tui_guang_fei').html('推广费（元）')
        $('.slly1').html('收入来源（元）')
        $('.settlementStatement').show()
        $('#Product_promotion_query3').click()
        $('.Settlement .Settlement_status ul li').eq(2).html('待开发票&nbsp;&nbsp;')
        $('.Settlement .Settlement_status ul li').eq(3).html('发票待确认&nbsp;&nbsp;')
        $('.Settlement .Settlement_status ul li').eq(4).html('等待对方打款&nbsp;&nbsp;')
        $('.Settlement .Settlement_status ul li').eq(5).html('待收款&nbsp;&nbsp;')
	}else if(sid==2){
        $('.slly1').html('保险公司（元）')
        $('.tui_guang_fei').html('结算类型（元）')
         $('.settlementStatement').hide()
         $('.Settlement .Settlement_status ul li').eq(2).html('待收发票&nbsp;&nbsp;')
        $('.Settlement .Settlement_status ul li').eq(3).html('确认发票&nbsp;&nbsp;')
        $('.Settlement .Settlement_status ul li').eq(4).html('待打款&nbsp;&nbsp;')
        $('.Settlement .Settlement_status ul li').eq(5).html('等待对方收款&nbsp;&nbsp;')
        $('#Product_promotion_query3').click()
	}

}

/*

	财务结算页重置按钮

*/
function settlement_Reset(){
	$('.Settlement #Settlement_span').html('&nbsp;&nbsp;全部&nbsp;&nbsp;');
	$('.Settlement #Settlement_span1').html('&nbsp;&nbsp;全部&nbsp;&nbsp;');
	$('.Settlement .Settlement_status').find('span').attr('sid','');
	$('.Settlement .Settlement_status').find('span').html('全部&nbsp;&nbsp;');
	$('.Settlement .search').val('');
}

/*
	数据勾选
*/
function switch_img(obj){
	if($(obj).attr('status')=='open'){
		$(obj).attr('status','shut')
		$(obj).attr('src','./images/checkon.png')
	}else{
		$(obj).attr('status','open')
		$(obj).attr('src','./images/checkoffShape.png')
	}
}

/*
	数据勾选
*/
function switch_imgs(obj,type){
	if(type==1){
		if($(obj).attr('status')=='open'){
			$(obj).attr('status','shut')
			$(obj).attr('src','./images/checkon.png')
			$('#platform_content_record5').find('.product_conter .checkon').attr('status','shut')
			$('#platform_content_record5').find('.product_conter .checkon').attr('src','./images/checkon.png')
			$('#platform_content_record5').find('.product_conter1 .checkon').attr('status','shut')
			$('#platform_content_record5').find('.product_conter1 .checkon').attr('src','./images/checkon.png')
		}else{
			$(obj).attr('status','open')
			$(obj).attr('src','./images/checkoff.png')
			$('#platform_content_record5').find('.product_conter .checkon').attr('status','open')
			$('#platform_content_record5').find('.product_conter .checkon').attr('src','./images/checkoffShape.png')
			$('#platform_content_record5').find('.product_conter1 .checkon').attr('status','open')
			$('#platform_content_record5').find('.product_conter1 .checkon').attr('src','./images/checkoffShape.png')
		}
		

	}else if(type==2){
		if($(obj).attr('status')=='open'){
			$(obj).attr('status','shut')
			$(obj).attr('src','./images/checkon.png')
			$('#platform_content_record7').find('.product_conter .checkon').attr('status','shut')
			$('#platform_content_record7').find('.product_conter .checkon').attr('src','./images/checkon.png')
			$('#platform_content_record7').find('.product_conter1 .checkon').attr('status','shut')
			$('#platform_content_record7').find('.product_conter1 .checkon').attr('src','./images/checkon.png')
		}else{
			$(obj).attr('status','open')
			$(obj).attr('src','./images/checkoff.png')
			$('#platform_content_record7').find('.product_conter .checkon').attr('status','open')
			$('#platform_content_record7').find('.product_conter .checkon').attr('src','./images/checkoffShape.png')
			$('#platform_content_record7').find('.product_conter1 .checkon').attr('status','open')
			$('#platform_content_record7').find('.product_conter1 .checkon').attr('src','./images/checkoffShape.png')
		}
	}else if(type==3){
		if($(obj).attr('status')=='open'){
			$(obj).attr('status','shut')
			$(obj).attr('src','./images/checkon.png')
			$('#platform_content_record8').find('.product_conter .checkon').attr('status','shut')
			$('#platform_content_record8').find('.product_conter .checkon').attr('src','./images/checkon.png')
			$('#platform_content_record8').find('.product_conter1 .checkon').attr('status','shut')
			$('#platform_content_record8').find('.product_conter1 .checkon').attr('src','./images/checkon.png')
		}else{
			$(obj).attr('status','open')
			$(obj).attr('src','./images/checkoff.png')
			$('#platform_content_record8').find('.product_conter .checkon').attr('status','open')
			$('#platform_content_record8').find('.product_conter .checkon').attr('src','./images/checkoffShape.png')
			$('#platform_content_record8').find('.product_conter1 .checkon').attr('status','open')
			$('#platform_content_record8').find('.product_conter1 .checkon').attr('src','./images/checkoffShape.png')
		}
	}
}


/*

	物流公司选择

*/
function logistics_Company(obj){
	$.ajax({
        type: "post",
        async: true,
        url: getPostUrl()+'/RelatClass/exp_lists',
        dataType: "json",
        success: function(json){
        	if(json.status){
        		var str="";
        		for(var i=0;i<json.info.length;i++){
        			str+='<li sid="'+json.info[i].id+'" class="time_list_li1">'+json.info[i].name+'</li>'
        		}
        		$('.paper_Invoice_div').eq(0).find('.time_list').html(str)
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
	if($(obj).attr('status')=='open'){
		$(obj).find('.time_list').show()
		$(obj).attr('status','shut')
		$(obj).find('img').addClass('img1')
	}else{
		$(obj).find('.time_list').hide();
		$(obj).attr('status','open')
		$(obj).find('img').removeClass('img1')
	}
}


//计入下期账单
function billdetails_next_Bill(){
	var bill = $('#Product_promotion_query4').attr('sid');
	var type = $('#Product_promotion_query4').attr('type');
	var source_type = $('#Product_promotion_query4').attr('source_type');
	var policy_ids1 = [];
	for(var i = 0;i<$('#platform_content_record8').find('img').length-1;i++){
		if($('#platform_content_record8').find('img').eq(i).attr('status')=="shut"&&$('#platform_content_record8').find('img').eq(i).attr('class')=="checkon"&&($('#platform_content_record8').find('img').eq(i).siblings("span").text()!=''||$('#platform_content_record8').find('img').eq(i).siblings("span").text()!=null)){
			

				policy_ids1.push($('#platform_content_record8').find('img').eq(i).attr('sid'))
			
			
		}
	}
	$.ajax({
        type: "post",
        async: true,
        url: getPostUrl()+'/Bill/next_bill_do',
        data:{
        	bill_id: bill,
        	type: type,
        	policy_ids: policy_ids1.join(','),
        	source_type:source_type
        },
        dataType: "json",
        success: function(json){
        	if(json.status){
        		// alert("存入成功！")
        		var str='';
        		$('#platform_content_record8').find('.product_conter').remove();
    			$('#platform_content_record8').find('.product_conter1').remove();
				for(var i=0;i<3;i++){
					str+='<ul class="product_conter product_ul">'+
						'<li class="l"></li>'+
						'<li class="l"></li>'+
						'<li class="l"></li>'+
						'<li class="l"></li>'+
						'<li class="l"></li>'+
						'<li class="l"></li>'+
						'<li class="l"></li>'+
						'<li class="l"></li>'+
						'<li class="l"></li>'+
						'<li class="l"></li>'+
					'</ul>'
					str+='<ul class="product_conter1 product_ul">'+
						'<li class="l"></li>'+
						'<li class="l"></li>'+
						'<li class="l"></li>'+
						'<li class="l"></li>'+
						'<li class="l"></li>'+
						'<li class="l"></li>'+
						'<li class="l"></li>'+
						'<li class="l"></li>'+
						'<li class="l"></li>'+
						'<li class="l"></li>'+
					'</ul>'

				}
				$('#platform_content_record8').find('.product_header').after(str);
        		$('#Product_promotion_query4').click();
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

//财务结算->历史账单
function monthlyBills(){
	if(!date_regx($('#History_bill').text())){
		var year2=new Date().getFullYear();
		var month2=new Date().getMonth()+1;
		var month=year2+"-"+month2;
		var riqi=month;
	}else{
		var month=$('#History_bill').text()
		var riqi=$('.History_bill #History_bill').html();
	}
	
	$('.History_bill .enterprise h2 b').html(riqi.slice(0,7)+'&nbsp;&nbsp;月度账单')
	$.ajax({
        type: "post",
        async: true,
        url: getPostUrl()+'/Bill/his_stat_lists',
        data: {
			"month": month,
		},
        dataType: "json",
        success: function(json){
      		if(json.status){
      			$('#main4').remove()
      			$('#main5').remove()
      			$('#main6').remove()
      			$('#main7').remove()
      			$('.RevenueAndExpenditureTrend_title').remove()
      			var str='',
      				ymax=json.info.all_stat.stat_max,
      				xdata=[],
      				data=[];
      				for(var i=0;i<json.info.all_stat.stat_lists.length;i++){
      					xdata.push(json.info.all_stat.stat_lists[i].title);
	      				data.push(json.info.all_stat.stat_lists[i].in_num);
      				}
      				
					str+='<p class="RevenueAndExpenditureTrend_title">'+
							'<b></b>'+
							'<span>收入走势</span>'+
						'</p>';
					var main1='<div id="main4" style="width: 140% ;height:600px; margin:0 auto;"></div>';
					$('.RevenueAndExpenditureTrend_zx').html(str+main1);
					$('.RevenueAndExpenditureTrend_zx').css('border-bottom','1px solid #E1E1E1;')
					var myChart1 = echarts.init(document.getElementById('main4'));
					option1 = {
					    backgroundColor: "#fff",
					    color: ['#463BB1'],

					    title: [{
					        text: '城市宝周新增用户报表',
					        left: '1%',
					        top: '6%',
					        textStyle: {
					            color: '#fff'
					        }
					    }],
					    tooltip: {
					        trigger: 'item',
					        position: function (p) {
					                           // 位置回调
					                           // console.log && console.log(p);
					                           return [p[0] - 25, p[1] - 60];
					                       },
					    },
					     "legend": {
						        x: '30%',
						        //top: '2%',
						        textStyle: {
						            color: '#90979c',
						        },
						        "data": ['收入（推广费）','支出（技术服务费）']
						    },
					    grid: {
					        left: '1%',
					        right: '35%',
					        top: '16%',
					        bottom: '6%',
					        containLabel: true
					    },
					    toolbox: {
					        "show": false,
					        feature: {
					            saveAsImage: {}
					        }
					    },
					    xAxis: {
					        type: 'category',
					        name: '月份',
					        boundaryGap: true,
					        nameTextStyle: {
				                color: '#000'
				            },
					        "axisLine": {
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					            textStyle: {
					                color: '#000'
					            }
					        },
					        data: xdata
					    },
					    yAxis: {
					    	name: '费用（元）',
					    	max:ymax,
					    	minInterval: 1,
					        "axisLine": {
					            lineStyle: {
					                color: '#fff'
					            }
					        },
					        nameTextStyle: {
				                color: '#000'
				            },
					        splitLine: {
					            show: true,
					            lineStyle: {
					                color: 'rgba(231,235,239,.6)'
					            }
					        },
					        "axisTick": {
					            "show": false
					        },
					        axisLabel: {
					            textStyle: {
					                color: '#000'
					            }
					        },
					        type: 'value'
					    },
					    series: [{
				            "name": "收入（推广费）",
				            "type": "line",
				            "stack": "总量",
				            symbolSize:10,
				            symbol:'circle',
				            "itemStyle": {
				                "normal": {
				                    "color": "rgba(70,59,177,0.6)",
				                    "barBorderRadius": 0,
				                    "label": {
				                        "show": true,
				                        "position": "top",
				                        formatter: function(p) {
				                            return p.value > 0 ? (p.value) : '';
				                        }
				                    }
				                }
				            },
				            "data": data
				        }]
					}
					myChart1.setOption(option1);

					if(json.info.exten_stat!=null&&json.info.exten_stat!=''){
						// 历史账单收益分析饼状图
						var str1='';
						if(json.info.exten_stat&&json.info.exten_stat.qrcode_num){
							var str1_data=json.info.exten_stat.qrcode_num;
						}
						if(json.info.exten_stat&&json.info.exten_stat.link_num){
							var str1_data1=json.info.exten_stat.qrcode_num;
						}
						if(json.info.exten_stat&&json.info.exten_stat.api_num){
							var str1_data2=json.info.exten_stat.api_num;
						}
						str1+='<p class="RevenueAndExpenditureTrend_title">'+
									'<b></b>'+
									'<span>收益分析 ：分析不同推广方式产生的收益</span>'+
								'</p>'
						var main2='<div id="main5" style="width: 100% ;height:600px; margin:0 auto;"></div>';
						$('.RevenueAndExpenditureTrend_bz').html(str1+main2);
						$('.RevenueAndExpenditureTrend_bz').css('border-bottom','1px solid #E1E1E1;')
						var myChart2 = echarts.init(document.getElementById('main5'));
						option2 = {
						    
						     series : [
						        {
						            type: 'pie',
						            //roseType:'radius',
						            radius : '75%',
						            center: ['40%', '60%'],
						            color:['#F8E81C','#6F6DEE','#5ACD3A'],
						            data:[
						               
						                {value:str1_data, name:'二维码'},
						                 {value:str1_data1, name:'API接口'},
						                {value:str1_data2, name:'推广链接'},
						                /*{value:335, name:'3'},
						                {value:1548, name:'4'},
						                {value:1548, name:'5'}*/
						            ],
						            label: {
						            normal: {
						                position: 'outside',
						                formatter: '{b}： {c}.00元',
						                 textStyle: {
						                    color: '#000',
						                    fontSize: 14
						                }
						            }
						        },
						            itemStyle: {
						                emphasis: {
						                    shadowBlur: 10,
						                    shadowOffsetX: 0,
						                    shadowColor: 'rgba(0, 0, 0, 0.5)'
						                }
						            }
						        }
						    ]
						};
						myChart2.setOption(option2);
					}
					if(json.info.tgf_stat.stat_lists!=null&&json.info.tgf_stat.stat_lists!=''){
						// 历史账单收入柱状图
						var str2='',
		      				str2_ymax=json.info.tgf_stat.stat_max,
		      				str2_xdata=[],
		      				str2_data=[];
		      				for(var i=0;i<json.info.tgf_stat.stat_lists.length;i++){
		      					str2_xdata.push(json.info.tgf_stat.stat_lists[i].title);
			      				str2_data.push(json.info.tgf_stat.stat_lists[i].num);
		      				}
						str2+='<p class="RevenueAndExpenditureTrend_title">'+
									'<b></b>'+
									'<span>收入（推广费）：'+str2_ymax+'元</span>'+
								'</p>'
						var main3='<div id="main6" style="width: 95% ;height:600px; margin:0 auto;"></div>';
						$('.RevenueAndExpenditureTrend_zz').html(str2+main3);
						$('.RevenueAndExpenditureTrend_zz').css('border-bottom','1px solid #E1E1E1;')
						var myChart3 = echarts.init(document.getElementById('main6'));
						option3 = {
						   color: ['rgba(70,59,177,0.6)'],
						    tooltip: {
						        position:'top'
						    },
						    
						    grid: {
						        left: '3%',
						        right: '8%',
						        bottom: '3%',
						        containLabel: true
						    },
						    xAxis: [{
						        type: 'category',
						        name:'产品名称',
						        data: str2_xdata
						    }],
						    yAxis: [{
						        type: 'value',
						        name: '总价(元)',
						        max:str2_ymax,
					    		minInterval: 1,
						        boundaryGap:true,
						        axisLabel: {
						            formatter: '{value}'
						        },
						        axisLine:{
						        	show:false,
						            lineStyle:{
						                width:0
						            }
						        },
						        axisTick:{
						            alignWithLabel:true
						        }
						    }],
						    series: [{
						        name: '收入（推广费）',
						        type: 'bar',
						        barWidth: 20,
						        opacity: 0.6,
								background: '#FF196F',
						        data: str2_data
						    }]
						};
						myChart3.setOption(option3);
					}
					if(json.info.premium_stat.stat_lists!=null&&json.info.premium_stat.stat_lists!=''){
						var str3='';
							str3_ymax=json.info.premium_stat.stat_max,
		      				str3_xdata=[],
		      				str3_data=[];
		      				for(var i=0;i<json.info.premium_stat.stat_lists.length;i++){
		      					str3_xdata.push(json.info.premium_stat.stat_lists[i].title);
			      				str3_data.push(json.info.premium_stat.stat_lists[i].num);
		      				}
							str3+='<p class="RevenueAndExpenditureTrend_title">'+
										'<b></b>'+
										'<span>支出（保费）：'+str3_ymax+'元</span>'+
									'</p>'
							var main4='<div id="main7" style="width: 95% ;height:600px; margin:0 auto;"></div>';
							$('.RevenueAndExpenditureTrend_zc').html(str3+main4);
							$('.RevenueAndExpenditureTrend_zc').css('border-bottom','1px solid #E1E1E1;')
							var myChart4 = echarts.init(document.getElementById('main7'));
							option4 = {
							   color: ['rgba(255,25,111,0.6)'],
							    tooltip: {
							        position:'top'
							    },
							    
							    grid: {
							        left: '3%',
							        right: '8%',
							        bottom: '3%',
							        containLabel: true
							    },
							    xAxis: [{
							        type: 'category',
							        name:"保险产品",
							        data: str3_xdata
							    }],
							    yAxis: [{
							        type: 'value',
							        name: '总价(元)',
							        max:str3_ymax,
					    			minInterval: 1,
							        boundaryGap:true,
							        axisLabel: {
							            formatter: '{value}'
							        },
							        axisLine:{
							        	show:false,
							            lineStyle:{
							                width:0
							            }
							        },
							        axisTick:{
							            alignWithLabel:true
							        }
							    }],
							    series: [{
							        name: '支出（保费）',
							        type: 'bar',
							        barWidth: 20,
							        opacity: 0.6,
									background: '#FF196F',
							        data: str3_data
							    }]
							};
							myChart4.setOption(option4);
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

//导出Excel按钮
function order_Export(type){
	var ids = [];
	var time_start= time_start;
	var time_end= time_end;
	if(type==1){
			
			for(var i = 1;i<$('#platform_content_record5').find('img').length-1;i++){
				if($('#platform_content_record5').find('img').eq(i).attr('status')=="shut"&&($('#platform_content_record5').find('img').eq(i).siblings("span").text()!=''&&$('#platform_content_record5').find('img').eq(i).siblings("span").text()!=null&&$('#platform_content_record5').find('img').eq(i).siblings("span").text()!='_')){
						ids.push($('#platform_content_record5').find('img').eq(i).attr('sid'))
				}
			}
			if(ids.length<1){
				$('#export').show();
				$('#export .export_center_sj').show();
				$('#export .export_center_sj .title').text('下单时间');
				$('#export .export_center_sj .export_center_btn_a').attr('sid','1')
				
			}else{
				$.ajax({
			        type: "post",
			        async: true,
			        url: getPostUrl()+'/Policy/check_export',
			        data:{
			        	type: 1,
			        	ids: ids.join(','),
			        	time_start:time_start,
			        	time_end:time_end
			        },
			        dataType: "json",
			        success: function(json){
			        	if(json.status){
			        		if(json.info.count>10000){
			        			$('#export').show()
			        			$('#export .export_center_sj').hide()
			        			$('#export .export_center_ts').show()
			        		}else{
			        			window.location.href=json.info.export_url;
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
	}else if(type==2){
		var bill_type=$('.Settlement').find('.Product_promotion_tiem1').eq(0).attr('sid');
		for(var i = 1;i<$('#platform_content_record7').find('img').length-1;i++){
			if($('#platform_content_record7').find('img').eq(i).attr('status')=="shut"&&($('#platform_content_record7').find('img').eq(i).siblings("span").text()!=''&&$('#platform_content_record7').find('img').eq(i).siblings("span").text()!=null&&$('#platform_content_record7').find('img').eq(i).siblings("span").text()!='_')){
					ids.push($('#platform_content_record7').find('img').eq(i).attr('sid'))
			}
		}
		if(ids.length<1){
				$('#export').show();
				$('#export .export_center_sj').show();
				$('#export .export_center_sj .title').text('投保时间');
				$('#export .export_center_sj .export_center_btn_a').attr('sid',2)
				$('#export .export_center_sj .export_center_btn_a').attr('bill_type',bill_type)
			}else{
				$.ajax({
			        type: "post",
			        async: true,
			        url: getPostUrl()+'/Bill/check_export',
			        data:{
			        	type: 1,
			        	ids: ids.join(','),
			        	time_start:time_start,
			        	time_end:time_end,
			        	bill_type:bill_type
			        },
			        dataType: "json",
			        success: function(json){
			        	if(json.status){
			        		if(json.info.count>10000){
			        			$('#export').show()
			        			$('#export .export_center_sj').hide()
			        			$('#export .export_center_ts').show()
			        		}else{
			        			window.location.href=json.info.export_url;
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
	}else if(type==3){
		var bill_id=$('#Product_promotion_query4').attr('sid');
		var bill_type=$('#Product_promotion_query4').attr('type');
		var source_type=$('#Product_promotion_query4').attr('source_type');
		var time_type=$('.bill_details .enterprise .Product_promotion_tiem').eq(0).find('.time').eq(0).find('span').attr('sid');
		for(var i = 1;i<$('#platform_content_record8').find('img').length-1;i++){
			if($('#platform_content_record8').find('img').eq(i).attr('status')=="shut"&&($('#platform_content_record8').find('img').eq(i).siblings("span").text()!=''&&$('#platform_content_record8').find('img').eq(i).siblings("span").text()!=null&&$('#platform_content_record8').find('img').eq(i).siblings("span").text()!='_')){
					ids.push($('#platform_content_record8').find('img').eq(i).attr('sid'))
			}
		}
		if(ids.length<1){
			$('#export').show();
			$('#export').find('.export_center_sj').show();
			$('#export .export_center_sj .title').text('投保时间');
			$('#export .export_center_sj .export_center_btn_a').attr('sid',3)
			$('#export .export_center_sj .export_center_btn_a').attr('bill_id',bill_id)
			$('#export .export_center_sj .export_center_btn_a').attr('bill_type',bill_type)
		}else{
			$.ajax({
		        type: "post",
		        async: true,
		        url: getPostUrl()+'/Bill/policy_check_export',
		        data:{
		        	type: 1,
		        	ids: ids.join(','),
		        	time_type:time_type,
		        	time_start:time_start,
		        	time_end:time_end,
		        	bill_id:bill_id,
		        	bill_type:bill_type,
		        	source_type:source_type
		        },
		        dataType: "json",
		        success: function(json){
		        	if(json.status){
		        		if(json.info.count>10000){
		        			$('#export').show()
		        			$('#export .export_center_sj').hide()
			        		$('#export .export_center_ts').show()
		        		}else{
		        			window.location.href=json.info.export_url;
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
	}
	
}


//按时间导出按钮
function orderExport(obj){
	var sid = $(obj).attr('sid');
	var mydate = new Date();
	var time_start = $('#export_span').text();
	var time_end = $('#export_span1').text();
	var date1=new Date(time_start);  //开始时间
	var date2=new Date(time_end);    //结束时间
	if(time_start=="全部"||time_start==""||time_start==null){
		// time_start=mydate.getFullYear()+'-'+(mydate.getMonth()+1)+'-'+mydate.getDate()
		var title='请输入正确的日期时间！',
			name1='确定',
			Method1='cancel()';
		alert(title,name1,Method1)
		return
	}
	if(time_end=='全部'||time_start==""||time_start==null){
		// time_end=mydate.getFullYear()+'-'+(mydate.getMonth()+1)+'-'+mydate.getDate()
		var title='请输入正确的日期时间！',
			name1='确定',
			Method1='cancel()';
		alert(title,name1,Method1)
		return
	}
	if(date2.getTime()-date1.getTime()<0){
		var title='请输入正确的日期时间！',
			name1='确定',
			Method1='cancel()';
		alert(title,name1,Method1)
		return
	}
	if(sid==1){
		$.ajax({
	        type: "post",
	        async: true,
	        url: getPostUrl()+'/Policy/check_export',
	        data:{
	        	type: 2,
	        	ids: '',
	        	time_start:time_start,
	        	time_end:time_end,
	        	source_type:source_type
	        },
	        dataType: "json",
	        success: function(json){
	        	if(json.status){
	        		if(json.info.count>10000){
	        			$('#export').show()
	        			$('#export .export_center_sj').hide()
			        	$('#export .export_center_ts').show()
	        		}else{
	        			window.location.href=json.info.export_url;
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
	}else if(sid==2){
		var bill_type=$(obj).attr('bill_type');
		$.ajax({
	        type: "post",
	        async: true,
	        url: getPostUrl()+'/Bill/check_export',
	        data:{
	        	type: 2,
	        	ids: '',
	        	time_start:time_start,
	        	time_end:time_end,
	        	bill_type:bill_type
	        },
	        dataType: "json",
	        success: function(json){
	        	if(json.status){
	        		if(json.info.count>10000){
	        			$('#export').show()
	        			$('#export .export_center_sj').hide()
			        	$('#export .export_center_ts').show()
	        		}else{
	        			window.location.href=json.info.export_url;
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
	}else if(sid==3){
		var bill_id=$(obj).attr('bill_id');
		var bill_type=$(obj).attr('bill_type');
		var source_type=$('#Product_promotion_query4').attr('source_type');
		$.ajax({
	        type: "post",
	        async: true,
	        url: getPostUrl()+'/Bill/policy_check_export',
	        data:{
	        	type: 2,
	        	ids: '',
	        	time_start:time_start,
	        	time_end:time_end,
	        	bill_id:bill_id,
	        	bill_type:bill_type,
	        	source_type:source_type
	        },
	        dataType: "json",
	        success: function(json){
	        	if(json.status){
		        	if(json.info.count>10000){
		        		$('#export .export_center_sj').hide()
				        $('#export .export_center_ts').show()
	        		}else{
	        			window.location.href=json.info.export_url;
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
	
}

//下载专属二维码，以及相应复制链接
function Dow_QR_code_link(obj,name){
	if($(obj).text()=="下载专属二维码"){
		var src = $(obj).siblings('img').attr('src')
		if($(obj).attr('data-clipboard-text')!=''&&$(obj).attr('data-clipboard-text')!=null){
			$(obj).removeAttr('data-clipboard-text')
		}
		downloadImage(src,name)
	}else if($(obj).text()=="复制专属链接"){
		
			if(navigator.userAgent.indexOf("MSIE 8.0")>0){  //只有ie识别

		        var title='复制失败！请手动复制',
						name1='确定',
						Method1='cancel()';
					alert(title,name1,Method1)
				    return false;

		    }else{
		    	var src = $(obj).siblings('.p2').val()
				$(obj).attr('data-clipboard-text',src)
		    }
	}

}


//下载二维码
function downloadImage(src,img) {
	if(isIE()){
		var title='下载失败！请手动下载二维码',
			name1='确定',
			Method1='cancel()';
		alert(title,name1,Method1)
	    return false;
	}else{
		var $a = $("<a></a>").attr("href", src).attr("download", img+".png");
		    $a[0].click();
		    return;
	}
    
}

//复制链接
function clipboard_src(src){
		var clipboard = new Clipboard(src);
		clipboard.on('success', function() {
		    var title='复制成功！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
		    return false;
		});

		clipboard.on('error', function(e) {
		    var title='复制失败！请手动复制',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
		    return false;

		});
	
}

//产品合作->产品推广重置按钮
function Extension_Reset(){
	$('.Extension #Product_promotion_span').html('全部&nbsp;&nbsp;');
	$('.Extension #Product_promotion_span1').html('全部&nbsp;&nbsp;');
	$('.Extension .search').val('');
}	
 
//产品合作->产品定制重置按钮
function customization_Reset(){
	$('.customization #customization_span').html('全部&nbsp;&nbsp;');
	$('.customization #customization_span1').html('全部&nbsp;&nbsp;');
	$('.customization .custom_Status').find('span').attr('sid','');
	$('.customization .custom_Status').find('span').html('全部');
	$('.customization .search').val('');
}

//用户订单重置按钮
function userOrder_Reset(){
	$('.user_order #user_order_span').html('全部&nbsp;&nbsp;');
	$('.user_order #user_order_span1').html('全部&nbsp;&nbsp;');
	$('.user_order .search').val('');
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
	$('.mork_conter_center_mdify_password_one .Get_authentication_code').html('发送验证码')
}

function riqicj(dom){				//日期插件判断
	if(navigator.userAgent.indexOf("MSIE 8.0")>0){  //只有ie识别

		$(dom).dcalendarpicker({
			format:'yyyy-mm-dd'
		});
		$(dom).click();
	}else{
		Select_date(dom)
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
		if(num==0){
			$('#popupWindow').hide();
			clearInterval(popupWindow1)
		}
	},1000);
}


function bar_Graph(color,name,xdata,ymax,series_name,data,myChart3){
	option3 = {
		   color: color,
		    tooltip: {
		        position:'top'
		    },
		    
		    grid: {
		        left: '3%',
		        right: '8%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: [{
		        type: 'category',
		        name:name,
		        data: xdata
		    }],
		    yAxis: [{
		        type: 'value',
		        name: '总价(元)',
		        max:ymax,
	    		minInterval: 1,
		        boundaryGap:true,
		        axisLabel: {
		            formatter: '{value}'
		        },
		        axisLine:{
		        	show:false,
		            lineStyle:{
		                width:0
		            }
		        },
		        axisTick:{
		            alignWithLabel:true
		        }
		    }],
		    series: [{
		        name: series_name,
		        type: 'bar',
		        barWidth: 20,
		        opacity: 0.6,
				background: '#FF196F',
		        data: data
		    }]
		};
		myChart3.setOption(option3);
}

function contactService(){
	var title='推广申请已受理,我们将尽快与您联系您也可以拨打客服电话了解详情：400-068-8511（周一至周五9:00-17:30）',
		name1='我知道了',
		Method1='cancel()';
	alert(title,name1,Method1)
}
$(document).on('click','.contactService',function(){
	contactService()
})
//点击LODO返回首页
$(document).on('click','#Merchant_platform_conter .logo',function(){
	logo_click()
})

// 商户平台和开发者中心切换
$(document).on('click','#Merchant_platform_conter .Catalog_Modular',function(){
	PlatformSwitching(this)
})

// 登录注册切换
$(document).on('click','#Merchant_platform_conter .SignIn_register',function(){
	signIn(this)
})

// 退出登录
$(document).on('click','#Merchant_platform_conter .messageNum2',function(){
	signIn_out('2')
})

$(document).on('click','#mork .mork_conter .closeWindow',function(){
	closeWindow()
})

$(document).on('click','#mork .mork_conter .mork_conter_head .closeWindow',function(){
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
	Nexs(this,1)
})

$(document).on('click','.Nexs_a2',function(){
	Nexs(this,2)
})

$(document).on('click','.insuranceAgreement_x',function(){
	$('.insuranceAgreement').hide()
})

$(document).on('click','#mork .Get_authentication_code',function(){
	Get_authentication_code(this,'1')
})

// 侧边栏一级菜单展开和关闭
$(document).on('click','#Merchant_platform_conter .DeploymenMmenu',function(){
	DeploymenMmenu(this)
})

// 侧边栏二级菜单打开
$(document).on('click','#Merchant_platform_conter .menu_conter',function(){
	SwitchContent(this)
})

//  账户管理>基本信息修改按钮
$(document).on('click','.Modify_information',function(){
	Modify_information(this)
})

// 账户管理>基本信息修改之后保存按钮
$(document).on('click','.Save_information',function(){
	Save_information(this)
})

// 账户管理>安全设置修改按钮
$(document).on('click','.lookover',function(){
	BombBox(this)
})


// 产品合作>产品定制修改按钮
$(document).on('click','.custom_Status',function(){
	custom_Status(this)
})

// 签约状态按钮
$(document).on('click','.time_list_li1',function(){
	time_list_li1(this)
})

// 推广方式展开按钮
$(document).on('click','.promotion_Mode',function(){
	promotion_Mode(this)
})

// 推广方式选择按钮
$(document).on('click','.time_list_li',function(){
	time_list_li(this)
})

// 经纪公司展开按钮
$(document).on('click','.brokerage_Agency',function(){
	brokerage_Agency(this)
})

// 选择年按钮
$(document).on('click','.get_Year',function(){
	get_Year(this)
})

// 选择月按钮
$(document).on('click','.get_month',function(){
	get_month(this)
})

// 选择周按钮
$(document).on('click','.get_week',function(){
	get_week(this)
})

// 财务管理>我的收益查询按钮
$(document).on('click','.Product_promotion_query_btn',function(){
	statistical_Overview()
})

// 财务管理>我的收益 最近七天按钮
$(document).on('click','.statistical_Overview_latest_Time1',function(){
	statistical_Overview_latest_Time("1")
})

// 财务管理>我的收益 最近三十天按钮
$(document).on('click','.statistical_Overview_latest_Time2',function(){
	statistical_Overview_latest_Time("2")
})

// 财务管理>我的收益 折线图类型选择按钮
$(document).on('click','.Income_graph_condition a',function(){
	Income_graph_condition(this)
})

// 财务管理>结算管理 收入支出选择按钮
$(document).on('click','.Settlement_type',function(){
	Settlement_type(this)
})

// 财务管理>结算管理 历史账单按钮
$(document).on('click','.historyBill',function(){
	details()
})

// 财务管理>结算管理 结算状态展开按钮
$(document).on('click','.Settlement_status',function(){
	Settlement_status(this)
})

// 账单明细计入下期账单按钮
$(document).on('click','.billdetails_next_Bill',function(){
	billdetails_next_Bill()
})

// 弹出框关闭按钮
$(document).on('click','#Modify_mailbox .closeButton',function(){
	closeButton()
})

// 邮箱验证弹出框下一步按钮
$(document).on('click','#Modify_mailbox .Modify_login_mailbox1',function(){
	Modify_login_mailbox(this,'1')
})

// 邮箱验证弹出框完成按钮
$(document).on('click','#Modify_mailbox .Modify_login_mailbox2',function(){
	Modify_login_mailbox(this,'2')
})

// 手机验证弹出框完成按钮
$(document).on('click','#Modify_mailbox .Modify_login_mailbox3',function(){
	Modify_login_mailbox(this,'3')
})

// 修改密码验证弹出框下一步按钮
$(document).on('click','#Modify_mailbox .Modify_login_mailbox4',function(){
	Modify_login_mailbox(this,'4')
})

// 修改密码验证弹出框完成按钮
$(document).on('click','#Modify_mailbox .Modify_login_mailbox5',function(){
	Modify_login_mailbox(this,'5')
})

// 发送邮箱验证码
$(document).on('click','#Modify_mailbox .Get_authentication_code',function(){
	Get_authentication_code(this)
})

// 发送手机验证码
$(document).on('click','#Modify_mailbox .Mobile_phone_verification_code',function(){
	Mobile_phone_verification_code(this)
})

// 历史账单时间选择选择
$(document).on('click','.monthlyBills',function(){
	monthlyBills()
})
// 导出Excel按钮
$(document).on('click','#Merchant_platform_conter .authentication .platform .order_Export1',function(){
	order_Export('1')
})
$(document).on('click','#Merchant_platform_conter .authentication .platform .order_Export2',function(){
	order_Export('2')
})
$(document).on('click','#Merchant_platform_conter .authentication .platform .order_Export3',function(){
	order_Export('3')
})

// 勾选
$(document).on('click','#Merchant_platform_conter .authentication .platform .switch_imgs1',function(){
	switch_imgs(this,1)
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .switch_imgs2',function(){
	switch_imgs(this,2)
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .switch_imgs3',function(){
	switch_imgs(this,3)
})

// 日期插件
$(document).on('click','#Merchant_platform_conter .authentication .platform .Select_date1',function(){
	
	riqicj('#Product_promotion_span')
	
})
$(document).on('click','#Merchant_platform_conter .authentication .platform .Select_date2',function(){
	riqicj('#Product_promotion_span1')
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .Select_date3',function(){
	riqicj('#customization_span')
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .Select_date4',function(){
	riqicj('#customization_span1')
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .Select_date5',function(){
	riqicj('#user_order_span')
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .Select_date6',function(){
	riqicj('#user_order_span1')
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .Select_date7',function(){
	riqicj('#Settlement_span')
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .Select_date8',function(){
	riqicj('#Settlement_span1')
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .Select_date9',function(){
	riqicj('#History_bill')
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .Select_date10',function(){
	riqicj('#bill_details_span')
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .Select_date11',function(){
	riqicj('#bill_details_span1')
})
// 重置按钮
$(document).on('click','#Merchant_platform_conter .authentication .platform .Extension_Reset',function(){
	Extension_Reset()
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .userOrder_Reset',function(){
	userOrder_Reset()
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .customization_Reset',function(){
	customization_Reset()
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .statistical_Overview_Reset',function(){
	statistical_Overview_Reset()
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .settlement_Reset',function(){
	settlement_Reset()
})

$(document).on('click','#Merchant_platform_conter .authentication .platform .billdetails_Reset',function(){
	billdetails_Reset()
})

$(document).on('click','.xqtz',function(){
	var sid= $(this).attr('sid');
	xqtz(sid)
})

$(document).on('click','.reverseNumberPage',function(){
	var dom= $(this).attr('dom'),
		type= $(this).attr('type'),
		start_date= $(this).attr('start_date'),
		end_date= $(this).attr('end_date'),
		platform_content_record3= $(this).attr('platform_content_record3'),
		status= $(this).attr('status'),
		search_val= $(this).attr('search_val');
	reverseNumberPage(dom,this,type,start_date,end_date,platform_content_record3,status,search_val)
})

$(document).on('click','.reversePrevPage',function(){
	var dom= $(this).attr('dom'),
		type= $(this).attr('type'),
		start_date= $(this).attr('start_date'),
		end_date= $(this).attr('end_date'),
		platform_content_record3= $(this).attr('platform_content_record3'),
		status= $(this).attr('status'),
		search_val= $(this).attr('search_val');
	reversePrevPage(dom,this,type,start_date,end_date,platform_content_record3,status,search_val)
})

$(document).on('click','.reverseNextPage',function(){
	var dom= $(this).attr('dom'),
		type= $(this).attr('type'),
		start_date= $(this).attr('start_date'),
		end_date= $(this).attr('end_date'),
		platform_content_record3= $(this).attr('platform_content_record3'),
		status= $(this).attr('status'),
		search_val= $(this).attr('search_val');
	reverseNextPage(dom,this,type,start_date,end_date,platform_content_record3,status,search_val)
})

$(document).on('click','.reverseNumberPage_user_Order',function(){
	var dom= $(this).attr('dom'),
		platform_content_record3= $(this).attr('platform_content_record3'),
		status= $(this).attr('status'),
		search_val= $(this).attr('search_val'),
		start_date= $(this).attr('start_date'),
		end_date= $(this).attr('end_date'),
		page= $(this).attr('page');
	reverseNumberPage_user_Order(dom,this,platform_content_record3,status,search_val,start_date,end_date,page)
})

$(document).on('click','.reversePrevPage_user_Order',function(){
	var dom= $(this).attr('dom'),
		platform_content_record3= $(this).attr('platform_content_record3'),
		status= $(this).attr('status'),
		search_val= $(this).attr('search_val'),
		start_date= $(this).attr('start_date'),
		end_date= $(this).attr('end_date'),
		page= $(this).attr('page');
	reversePrevPage_user_Order(dom,this,platform_content_record3,status,search_val,start_date,end_date,page)
})

$(document).on('click','.reverseNextPage_user_Order',function(){
	var dom= $(this).attr('dom'),
		platform_content_record3= $(this).attr('platform_content_record3'),
		status= $(this).attr('status'),
		search_val= $(this).attr('search_val'),
		start_date= $(this).attr('start_date'),
		end_date= $(this).attr('end_date'),
		page= $(this).attr('page');
	reverseNextPage_user_Order(dom,this,platform_content_record3,status,search_val,start_date,end_date,page)
})

$(document).on('click','.reverseNumberPage_financial_Settlement',function(){
	var dom= $(this).attr('dom'),
		type= $(this).attr('type'),
		product_name= $(this).attr('product_name'),
		create_start= $(this).attr('create_start'),
		create_end= $(this).attr('create_end'),
		status= $(this).attr('status');
	reverseNumberPage_financial_Settlement(dom,this,type,product_name,create_start,create_end,status)
})

$(document).on('click','.reversePrevPage_financial_Settlement',function(){
	var dom= $(this).attr('dom'),
		type= $(this).attr('type'),
		product_name= $(this).attr('product_name'),
		create_start= $(this).attr('create_start'),
		create_end= $(this).attr('create_end'),
		status= $(this).attr('status');
	reversePrevPage_financial_Settlement(dom,this,type,product_name,create_start,create_end,status)
})

$(document).on('click','.reverseNextPage_financial_Settlement',function(){
	var dom= $(this).attr('dom'),
		type= $(this).attr('type'),
		product_name= $(this).attr('product_name'),
		create_start= $(this).attr('create_start'),
		create_end= $(this).attr('create_end'),
		status= $(this).attr('status');
	reverseNextPage_financial_Settlement(dom,this,type,product_name,create_start,create_end,status)
})

$(document).on('click','.reverseNumberPage_Billdetails',function(){
	var dom= $(this).attr('dom'),
		id= $(this).attr('sid'),
		type= $(this).attr('type'),
		page= $(this).attr('page'),
		create_start= $(this).attr('create_start'),
		create_end= $(this).attr('create_end'),
		order_val= $(this).attr('order_val'),
		time_type= $(this).attr('time_type'),
		app_val= $(this).attr('app_val'),
		source_type= $(this).attr('source_type');
	reverseNumberPage_Billdetails(dom,this,id,type,page,create_start,create_end,order_val,time_type,app_val,source_type)
})

$(document).on('click','.reversePrevPage_Billdetails',function(){
	var dom= $(this).attr('dom'),
		id= $(this).attr('sid'),
		type= $(this).attr('type'),
		page= $(this).attr('page'),
		create_start= $(this).attr('create_start'),
		create_end= $(this).attr('create_end'),
		order_val= $(this).attr('order_val'),
		time_type= $(this).attr('time_type'),
		app_val= $(this).attr('app_val'),
		source_type= $(this).attr('source_type');
	reversePrevPage_Billdetails(dom,this,id,type,page,create_start,create_end,order_val,time_type,app_val,source_type)
})

$(document).on('click','.reverseNextPage_Billdetails',function(){
	var dom= $(this).attr('dom'),
		id= $(this).attr('sid'),
		type= $(this).attr('type'),
		page= $(this).attr('page'),
		create_start= $(this).attr('create_start'),
		create_end= $(this).attr('create_end'),
		order_val= $(this).attr('order_val'),
		time_type= $(this).attr('time_type'),
		app_val= $(this).attr('app_val'),
		source_type= $(this).attr('source_type');
	reverseNextPage_Billdetails(dom,this,id,type,page,create_start,create_end,order_val,time_type,app_val,source_type)
})
 
 $(document).on('click','.Get_promotion_methods_over',function(){
	var type= $(this).attr('type');
	Get_promotion_methods_over(this,type)
})
 
 $(document).on('click','.Get_promotion_methods',function(){
	Get_promotion_met(this)
})

 $(document).on('click','.Dow_QR_code_link',function(){
 	var link_title=$(this).attr('link_title');
	Dow_QR_code_link(this,link_title)
})

 $(document).on('click','.switch_img',function(){
	switch_img(this)
})

 $(document).on('click','.Expand_Detail',function(){
	Expand_Detail(this)
})

 $(document).on('click','.view_Details',function(){
 	var source_type=$(this).attr("source_type"),
 	id=$(this).attr("sid"),
 	type=$(this).attr("type"),
 	status=$(this).attr("status"),
 	date=$(this).attr("date"),
 	code=$(this).attr("code"),
 	source_name=$(this).attr("source_name"),
 	product_name=$(this).attr("product_name"),
 	premium_amt=$(this).attr("premium_amt");
	view_Details(source_type,id,type,status,date,code,source_name,product_name,premium_amt)
})
 
 $(document).on('click','.view_Details1',function(){
 	var source_type=$(this).attr("source_type"),
 	id=$(this).attr("sid"),
 	type=$(this).attr("type"),
 	status=$(this).attr("status"),
 	start_date=$(this).attr("start_date"),
 	end_date=$(this).attr("end_date"),
 	product_name=$(this).attr("product_name");
	view_Details1(source_type,id,type,status,start_date,end_date,product_name)
})
 
 $(document).on('click','.time_list_li',function(){
	time_list_li(this)
})
  
 $(document).on('click','.time_list_li1',function(){
	time_list_li1(this)
})

$(document).on('click','.contactService',function(){
	contactService()
})






