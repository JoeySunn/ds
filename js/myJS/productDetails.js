	$('.NavigationBar2 .menu .menu_li').find('i').hide()
	$('.NavigationBar2 .menu .menu_li').eq(1).find('i').show()
	var email = $.cookie('email');
	$('document').ready(function(){	
		$(document).scrollTop(0);
	var id = GetQueryString('id');
		$.ajax({
	         type: "post",
	         async: false,
	         url: getPostUrl()+'/Product/info',
	         data: {
				"id": id
			},
	         dataType: "json",
	         success: function(json){
	         	var str='';
	         	
	         	if(json.status==1){
	         		if(json.info.image_url!=''&&json.info.image_url!=null){
	         			$('.description_Details_pic').html('<img src="'+json.info.image_url+'" alt="">')
	         		}
	         		if(json.info.name!=''&&json.info.name!=null){
	         			str+='<h2>'+json.info.name+'</h2>'
	         		}else{
	         			str+='<h2>待定</h2>'
	         		}
	         		if(json.info.title!=''&&json.info.title!=null){
	         			str+='<p>'+json.info.title+'</p>'
	         		}else{
	         			str+='<p>待定</p>'
	         		}
	         		if(json.info.ins_limit!=''&&json.info.ins_limit!=null){
						str+='<p>保险期限：'+json.info.ins_limit+'</p>'
	         		}else{
	         			str+='<p>保险期限：待定</p>'
	         		}
	         		// if(json.info.insrnt_age_start!=''&&json.info.insrnt_age_start!=null&&json.info.insrnt_age_end!=''&&json.info.insrnt_age_end!=null){
	         		// 	if(json.info.insrnt_age_end==200&&json.info.insrnt_age_start>0){
	         		// 		str+='<p>保障年龄：'+json.info.insrnt_age_start+'周岁以上</p>'
	         		// 	}else if(json.info.insrnt_age_end==200&&json.info.insrnt_age_start==0){
	         		// 		str+='<p>保障年龄：不限</p>'
	         		// 	}else{
	         		// 		if(json.info.insrnt_age_start==json.info.insrnt_age_end){
	         		// 			str+='<p>保障年龄：'+json.info.insrnt_age_start+'周岁</p>'
	         		// 		}else{
	         		// 			str+='<p>保障年龄：'+json.info.insrnt_age_start+'-'+json.info.insrnt_age_end+'周岁</p>'
	         		// 		}
	         		// 	}
	         			
	         		// }else{
	         		// 	str+='<p>保障年龄：待定</p>'
	         		// }

	         		
	         		if(json.info.insrnt_age_start!=''&&json.info.insrnt_age_start!=null&&json.info.insrnt_age_end!=''&&json.info.insrnt_age_end!=null){
	         			if(json.info.insrnt_age_end==400&&json.info.insrnt_age_start>0){
	         				if(json.info.insrnt_age_start_type==1){
	         					str+='<p>保障年龄：'+json.info.insrnt_age_start+'周岁以上</p>'
	         				}else if(json.info.insrnt_age_start_type==2){
	         					str+='<p>保障年龄：'+json.info.insrnt_age_start+'月以上</p>'
	         				}else if(json.info.insrnt_age_start_type==3){
	         					str+='<p>保障年龄：'+json.info.insrnt_age_start+'天以上</p>'
	         				}
	         				
	         			}else if(json.info.insrnt_age_end==400&&json.info.insrnt_age_start==0){
	         				str+='<p>保障年龄：不限</p>'
	         			}else if(json.info.insrnt_age_end<0){
					         				
	         				if(json.info&&json.info.insrnt_age_start_type==1){
	         					if(json.info.insrnt_age_end_type==1){
	         						str+='<p>保障年龄：'+json.info.insrnt_age_start+'周岁以下</p>'
	         					}else if(json.info.insrnt_age_end_type==3){
	         						str+='<p>保障年龄：'+json.info.insrnt_age_start+'周岁以下</p>'
	         					}
	         				}else if(json.info&&json.info.insrnt_age_start_type==3){
	         					if(json.info.insrnt_age_end_type==1){
	         						str+='<p>保障年龄：'+json.info.insrnt_age_start+'天以下</p>'
	         					}else if(json.info.insrnt_age_end_type==3){
	         						str+='<p>保障年龄：'+json.info.insrnt_age_start+'天以下</p>'
	         					}
	         				}
	         			}else{
	         				if(json.info.insrnt_age_start==json.info.insrnt_age_end){
	         					if(json.info.insrnt_age_end_type==1){
		         					str+='<p>保障年龄：'+json.info.insrnt_age_start+'周岁</p>'
		         				}else if(json.info.insrnt_age_end_type==2){
		         					str+='<p>保障年龄：'+json.info.insrnt_age_start+'月</p>'
		         				}else if(json.info.insrnt_age_end_type==3){
		         					str+='<p>保障年龄：'+json.info.insrnt_age_start+'天</p>'
		         				}
	         				}else{
	         					if(json.info.insrnt_age_end_type==json.info.insrnt_age_start_type){
	         						if(json.info.insrnt_age_end_type==1){
			         					str+='<p>保障年龄：'+json.info.insrnt_age_start+'-'+json.info.insrnt_age_end+'周岁</p>'
			         				}else if(json.info.insrnt_age_end_type==2){
			         					str+='<p>保障年龄：'+json.info.insrnt_age_start+'-'+json.info.insrnt_age_end+'月</p>'
			         				}else if(json.info.insrnt_age_end_type==3){
			         					str+='<p>保障年龄：'+json.info.insrnt_age_start+'-'+json.info.insrnt_age_end+'天</p>'
			         				}
		         				}else{
		         					if(json.info.insrnt_age_start_type==1&&json.info.insrnt_age_end_type==2){
			         					str+='<p>保障年龄：'+json.info.insrnt_age_start+'周岁-'+json.info.insrnt_age_end+'月</p>'
			         				}else if(json.info.insrnt_age_start_type==1&&json.info.insrnt_age_end_type==3){
			         					str+='<p>保障年龄：'+json.info.insrnt_age_start+'周岁-'+json.info.insrnt_age_end+'天</p>'
			         				}else if(json.info.insrnt_age_start_type==2&&json.info.insrnt_age_end_type==1){
			         					str+='<p>保障年龄：'+json.info.insrnt_age_start+'月-'+json.info.insrnt_age_end+'周岁</p>'
			         				}else if(json.info.insrnt_age_start_type==2&&json.info.insrnt_age_end_type==3){
			         					str+='<p>保障年龄：'+json.info.insrnt_age_start+'月-'+json.info.insrnt_age_end+'天</p>'
			         				}else if(json.info.insrnt_age_start_type==3&&json.info.insrnt_age_end_type==1){
			         					str+='<p>保障年龄：'+json.info.insrnt_age_start+'天-'+json.info.insrnt_age_end+'周岁</p>'
			         				}else if(json.info.insrnt_age_start_type==3&&json.info.insrnt_age_end_type==2){
			         					str+='<p>保障年龄：'+json.info.insrnt_age_start+'天-'+json.info.insrnt_age_end+'月</p>'
			         				}
		         				}
	         					
	         				}
	         			}
	         			
	         		}else{
	         			str+='<p>保障年龄：待定</p>'
	         		}
	         		

	         		if(json.info.insured_area!=''&&json.info.insured_area!=null){
	         			str+='<p>承保区域：'+json.info.insured_area+'</p>'
	         		}else{
	         			str+='<p>承保区域：待定</p>'
	         		}

	         		if(json.info.price!=''&&json.info.price!=null){
	         			str+='<p class="money">价格：<b>￥'+json.info.price+'</b></p>'
	         		}else{
	         			str+='<p class="money">价格：<b>待定</b></p>'
	         		}
	         		if(email!=''&&email!=null){
	         			if(json.info.tgf_amt!=''&&json.info.tgf_amt!=null){
			         		str+='<p class="tgf">推广费：'+json.info.tgf_amt+'</p>'
		         		}else{
		         			str+='<p class="tgf">推广费：待定</p>'
		         		}
	         		}else{
	         			str+='<p class="tgf">推广费：登录后可见</p>'
	         		}
	         		
	         		str+='<div class="description_Details_titlink"><button class="want_To_Promote"  sid="'+id+'">我要推广</button></div>'
	         		
					if(json.info.risk_lists!=''&&json.info.risk_lists!=null){
						
						var str1='';
						str1+='<table id="process-demo-1" class="tb tb-b c-100">'+
							'<thead>'+
								'<tr>'+
									'<th>保险方案</th>'+
									'<th>保障项目</th>'+
									'<th>保障金额</th>'+
									'<th>项目说明</th>'+
								'</tr>'+
							'</thead>'+
							'<tbody>'
								
								for(var i = 0;i<json.info.risk_lists.length;i++){
									str1+='<tr>'+
									'<td>'+(json.info.risk_lists[i].risk_name?json.info.risk_lists[i].risk_name:'')+'</td>'+
									'<td>'+(json.info.risk_lists[i].kind_lists.kind_name?json.info.risk_lists[i].kind_lists.kind_name:'')+'</td>'+
									'<td style="white-space:nowrap;text-align:right;">'+(json.info.risk_lists[i].kind_lists.n_amt?json.info.risk_lists[i].kind_lists.n_amt:'')+'</td>'+
									'<td>'+(json.info.risk_lists[i].kind_lists.kind_desc?json.info.risk_lists[i].kind_lists.kind_desc:'')+'</td>'+
									'</tr>'
								}
								
							str1+='</tbody></table>'
						
						$('.safeguardRules').find('.safeguardRules_p').html(str1);
						$('#process-demo-1').tablesMergeCell({
					        cols: [0]
					    });
					}
					
	         		$('.description_Details_tit').html(str);

	         		if(json.info.desc!=''&&json.info.desc!=null){
	         			var str1=json.info.desc;
	         			$('.productBrief').find('p').html(str1);
	         		}
	         		if(json.info.explain!=''&&json.info.explain!=null){
	         			$('.specialAgreement2').find('p').html(json.info.explain);
	         		}
	         		
	         		
	         	}else{
	         		var title=json.info,
						name1='确定',
						Method1='url_location('+url+')';
					alert(title,name1,Method1)
	         		
	         	}
	         }
	     })
	})

	$(document).scroll(function() {    //产品详情页的产品滚动到相应介绍位
	  	var top = $(document).scrollTop(),
	  		productBrief=$('.productBrief')[0],
	  		specialAgreement=$('.specialAgreement')[0],
	  		top1 = productBrief.offsetTop-($('.twonav').height()),
	  		top2 = specialAgreement.offsetTop-($('.twonav').height());
	  	if(top>547){
	  		$('.twonav').css({
	  			position: 'fixed',
	  			top: '0'
	  		});
	  		$('.productBrief').css({
	  			"margin-top":'8.17rem'
	  		})
	  		if(top<top2){
	  			$('.twonav_li').find('b').hide();
	  			$('.twonav_li').eq(0).find('b').show();
	  		}else if(top>=top2){
	  			$('.twonav_li').find('b').hide();
	  			$('.twonav_li').eq(1).find('b').show();
	  		}
	  		// console.log(top+'******'+top3+'*******'+top1+'*******'+top2)
	  	}else{
	  		$('.twonav').css({
	  			position: 'relative',
	  			top: ''
	  		});
	  		$('.productBrief').css({
	  			"margin-top":'0'
	  		})
	  	}


	});