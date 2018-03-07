


$(document).ready(function(){
	var str='',
	str2='';
 	$.ajax({		//商城首页场景分类列表
         type: "post",
         async: true,
         url: getPostUrl()+"/RelatClass/lists",
         data:{
         	source:1
         },
         dataType: "json",
         success: function(json){
         	var str_1='',
         		Industry_czt='Industry_czt',
         		data=json.info;
         	if(json.status==1){
         		if(data!=null&&data!=''){
         			for(var i=0;i<data.length;i++){		
	         			str+='<a href="javascript:;" class="btn left" cls_id="'+data[i].id+'">'+data[i].name+'</a>'
	         		}
	         		$('.menu_bar').html('<a href="javascript:;" class="btn left btn_selected" cls_id="">全部</a>'+str+'<div class="clear"></div>');	
	         		$('.menu_bar .btn').eq(0).click();
         		}
         	}else{
         			var title=json.info,
						name1='确定',
						Method1='cancel()';
					alert(title,name1,Method1)
         	}
         }
    })
});
var page=1;	//用于表示页数
//上啦刷新下拉加载
$('body').dropload({
    domUp : {		//下拉刷新提示
        domClass   : 'dropload-up',
        domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
        domUpdate  : '<div class="dropload-update">↑释放更新</div>',
        domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
    },
    domDown : {		//上拉加载提示
        domClass   : 'dropload-down',
        domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
        domUpdate  : '<div class="dropload-update">↓释放加载</div>',
        domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
    },
    loadUpFn : function(me){		//下拉刷新
        page=1;
        var index = $('.menu_bar').attr('index');
    	Sclassification($('.btn')[index],page,me)
    },
    loadDownFn : function(me){		//上拉加载
        page=page+1;
    	var index = $('.menu_bar').attr('index');
        Sclassification($('.btn')[index],page,me)
    }
});

 
/*

	生成相应的场景下的产品
	obj:当前调用的元素
	page:当page==1时用于判断是否为第一次加载否则用于判断上拉加载下拉刷新
	me:用于判断是否运用上拉加载下拉刷新的插件并且使其解除自带锁定状态


*/
function Sclassification(obj,page,me){
	var index = $('.btn').index($(obj));
	if(page){
		var page=page;
	}else{
		var page = 1;
	}
	$('.btn').removeClass('btn_selected');
	$('.btn').eq(index).addClass('btn_selected');
	$('.menu_bar').attr('index',index)
	var cls_id=$(obj).attr('cls_id');
	$.ajax({
         type: "post",
         async: true,
         url: getPostUrl()+"/Product/lists",
         data:{
			"cls_id": cls_id,
			"page": page,
			"limit": 2
         },
         dataType: "json",
         success: function(json){
         	var str='';
         	if(json.status==1){
         		if(json.info!=''&&json.info!=null){
         			for(var i=0;i<json.info.length;){
         				str+='<div class="shopping_conter" sid="'+(json.info[i]&&json.info[i].id?json.info[i].id:'')+'">'+
							'<div class="shopping_left_conter left">'+
								'<img src="'+(json.info[i]&&json.info[i].image_url&&json.info[i].image_url!=null?json.info[i].image_url:"./images/ditu.png")+'" alt="">'+
							'</div>'+
							'<div class="shopping_right_conter right relative">'+
								'<h2 class="shopping_right_conter_title left" sid="'+(json.info[i]&&json.info[i].id?json.info[i].id:'')+'">'+(json.info[i]&&json.info[i].name?json.info[i].name:'')+'</h2>'+

								'<p>保险期限：'+(json.info[i]&&json.info[i].ins_limit?json.info[i].ins_limit:'')+'</p>'
								if(json.info[i].insrnt_age_start!=''&&json.info[i].insrnt_age_start!=null&&json.info[i].insrnt_age_end!=''&&json.info[i].insrnt_age_end!=null){
					         			if(json.info[i].insrnt_age_end==400&&json.info[i].insrnt_age_start>0){
					         				if(json.info[i]&&json.info[i].insrnt_age_start_type==1){
					         					if(json.info[i].insrnt_age_end_type==1){
					         						str+='<p>保障年龄：'+json.info[i].insrnt_age_start+'周岁以上</p>'
					         					}else if(json.info[i].insrnt_age_end_type==3){
					         						str+='<p>保障年龄：'+json.info[i].insrnt_age_start+'周岁以上</p>'
					         					}
					         				}else if(json.info[i]&&json.info[i].insrnt_age_start_type==3){
					         					if(json.info[i].insrnt_age_end_type==1){
					         						str+='<p>保障年龄：'+json.info[i].insrnt_age_start+'天以上</p>'
					         					}else if(json.info[i].insrnt_age_end_type==3){
					         						str+='<p>保障年龄：'+json.info[i].insrnt_age_start+'天以上</p>'
					         					}
					         				}
					         				
					         			}else if(json.info[i].insrnt_age_end==400&&json.info[i].insrnt_age_start==0){
					         				str+='<p>保障年龄：不限</p>'
					         			}else if(json.info[i].insrnt_age_end<0){
					         				
					         				if(json.info[i]&&json.info[i].insrnt_age_start_type==1){
					         					if(json.info[i].insrnt_age_end_type==1){
					         						str+='<p>保障年龄：'+json.info[i].insrnt_age_start+'周岁以下</p>'
					         					}else if(json.info[i].insrnt_age_end_type==3){
					         						str+='<p>保障年龄：'+json.info[i].insrnt_age_start+'周岁以下</p>'
					         					}
					         				}else if(json.info[i]&&json.info[i].insrnt_age_start_type==3){
					         					if(json.info[i].insrnt_age_end_type==1){
					         						str+='<p>保障年龄：'+json.info[i].insrnt_age_start+'天以下</p>'
					         					}else if(json.info[i].insrnt_age_end_type==3){
					         						str+='<p>保障年龄：'+json.info[i].insrnt_age_start+'天以下</p>'
					         					}
					         				}
					         			}else{
					         				if(json.info[i].insrnt_age_start==json.info[i].insrnt_age_end){
					         					if(json.info[i]&&json.info[i].insrnt_age_start_type==1){
						         					if(json.info[i].insrnt_age_end_type==1){
						         						str+='<p>保障年龄：'+json.info[i].insrnt_age_start+'周岁</p>'
						         					}else if(json.info[i].insrnt_age_end_type==3){
						         						str+='<p>保障年龄：'+json.info[i].insrnt_age_start+'周岁</p>'
						         					}
						         				}else if(json.info[i]&&json.info[i].insrnt_age_start_type==3){
						         					if(json.info[i].insrnt_age_end_type==1){
						         						str+='<p>保障年龄：'+json.info[i].insrnt_age_start+'天</p>'
						         					}else if(json.info[i].insrnt_age_end_type==3){
						         						str+='<p>保障年龄：'+json.info[i].insrnt_age_start+'天</p>'
						         					}
						         				}
					         					
					         				}else{
					         					
					         					if(json.info[i]&&json.info[i].insrnt_age_start_type==1){
						         					if(json.info[i].insrnt_age_end_type==1){
						         						str+='<p>保障年龄：'+json.info[i].insrnt_age_start+'-'+json.info[i].insrnt_age_end+'周岁</p>'
						         					}else if(json.info[i].insrnt_age_end_type==3){
						         						str+='<p>保障年龄：'+json.info[i].insrnt_age_start+'周岁-'+json.info[i].insrnt_age_end+'天</p>'
						         					}
						         				}else if(json.info[i]&&json.info[i].insrnt_age_start_type==3){
						         					if(json.info[i].insrnt_age_end_type==1){
						         						str+='<p>保障年龄：'+json.info[i].insrnt_age_start+'天-'+json.info[i].insrnt_age_end+'周岁</p>'
						         					}else if(json.info[i].insrnt_age_end_type==3){
						         						str+='<p>保障年龄：'+json.info[i].insrnt_age_start+'-'+json.info[i].insrnt_age_end+'天</p>'
						         					}
						         				}
					         				}
					         			}
					         			
					         		}else{
					         			str+='<p>保障年龄：待定</p>'
					         		}
								str+='<h2 class="shopping_right_conter_pire absolute">￥'+(json.info[i]&&json.info[i].price?json.info[i].price:'')+'</h2>'+
							'</div>'+
							'<div class="clear"></div>'+
						'</div>'
						if(json.info[i+1]!=''&&json.info[i+1]!=null){
							str+='<div class="shopping_conter" sid="'+(json.info[i+1]&&json.info[i+1].id?json.info[i+1].id:'')+'">'+
								'<div class="shopping_left_conter left">'+
								'<img sid="'+(json.info[i+1]&&json.info[i+1].id?json.info[i+1].id:'')+'" src="'+(json.info[i+1]&&json.info[i+1].image_url&&json.info[i+1].image_url!=null?json.info[i+1].image_url:"./images/ditu.png")+'" alt="">'+
							'</div>'+
							'<div class="shopping_right_conter right relative">'+
								'<h2 class="shopping_right_conter_title left" sid="'+(json.info[i+1]&&json.info[i+1].id?json.info[i+1].id:'')+'">'+(json.info[i+1]&&json.info[i+1].name?json.info[i+1].name:'')+'</h2>'+

								'<p>保险期限：'+(json.info[i+1]&&json.info[i+1].ins_limit?json.info[i+1].ins_limit:'')+'</p>'
								if(json.info[i+1].insrnt_age_start!=''&&json.info[i+1].insrnt_age_start!=null&&json.info[i+1].insrnt_age_end!=''&&json.info[i+1].insrnt_age_end!=null){
					         			if(json.info[i+1].insrnt_age_end==400&&json.info[i+1].insrnt_age_start>0){
					         				if(json.info[i+1].insrnt_age_start_type==1){
					         					if(json.info[i+1].insrnt_age_end_type==1){
					         						str+='<p>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁以上</p>'
					         					}else if(json.info[i+1].insrnt_age_end_type==3){
					         						str+='<p>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁以上</p>'
					         					}
					         				}else if(json.info[i+1].insrnt_age_start_type==3){
					         					if(json.info[i+1].insrnt_age_end_type==1){
					         						str+='<p>保障年龄：'+json.info[i+1].insrnt_age_start+'天以上</p>'
					         					}else if(json.info[i+1].insrnt_age_end_type==3){
					         						str+='<p>保障年龄：'+json.info[i+1].insrnt_age_start+'天以上</p>'
					         					}
					         				}
					         				
					         			}else if(json.info[i+1].insrnt_age_end==400&&json.info[i+1].insrnt_age_start==0){
					         				str+='<p>保障年龄：不限</p>'
					         			}else if(json.info[i+1].insrnt_age_end<0){
					         				
					         				if(json.info[i+1].insrnt_age_start_type==1){
					         					if(json.info[i+1].insrnt_age_end_type==1){
					         						str+='<p>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁以下</p>'
					         					}else if(json.info[i+1].insrnt_age_end_type==3){
					         						str+='<p>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁以下</p>'
					         					}
					         				}else if(json.info[i+1].insrnt_age_start_type==3){
					         					if(json.info[i+1].insrnt_age_end_type==1){
					         						str+='<p>保障年龄：'+json.info[i+1].insrnt_age_start+'天以下</p>'
					         					}else if(json.info[i+1].insrnt_age_end_type==3){
					         						str+='<p>保障年龄：'+json.info[i+1].insrnt_age_start+'天以下</p>'
					         					}
					         				}
					         			}else{
					         				if(json.info[i+1].insrnt_age_start==json.info[i+1].insrnt_age_end){
					         					if(json.info[i+1].insrnt_age_start_type==1){
						         					if(json.info[i+1].insrnt_age_end_type==1){
						         						str+='<p>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁</p>'
						         					}else if(json.info[i+1].insrnt_age_end_type==3){
						         						str+='<p>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁</p>'
						         					}
						         				}else if(json.info[i+1].insrnt_age_start_type==3){
						         					if(json.info[i+1].insrnt_age_end_type==1){
						         						str+='<p>保障年龄：'+json.info[i+1].insrnt_age_start+'天</p>'
						         					}else if(json.info[i+1].insrnt_age_end_type==3){
						         						str+='<p>保障年龄：'+json.info[i+1].insrnt_age_start+'天</p>'
						         					}
						         				}
					         					
					         				}else{
					         					
					         					if(json.info[i+1].insrnt_age_start_type==1){
						         					if(json.info[i+1].insrnt_age_end_type==1){
						         						str+='<p>保障年龄：'+json.info[i+1].insrnt_age_start+'-'+json.info[i+1].insrnt_age_end+'周岁</p>'
						         					}else if(json.info[i+1].insrnt_age_end_type==3){
						         						str+='<p>保障年龄：'+json.info[i+1].insrnt_age_start+'周岁-'+json.info[i+1].insrnt_age_end+'天</p>'
						         					}
						         				}else if(json.info[i+1].insrnt_age_start_type==3){
						         					if(json.info[i+1].insrnt_age_end_type==1){
						         						str+='<p>保障年龄：'+json.info[i+1].insrnt_age_start+'天-'+json.info[i+1].insrnt_age_end+'周岁</p>'
						         					}else if(json.info[i+1].insrnt_age_end_type==3){
						         						str+='<p>保障年龄：'+json.info[i+1].insrnt_age_start+'-'+json.info[i+1].insrnt_age_end+'天</p>'
						         					}
						         				}
					         				}
					         			}
					         			
					         		}else{
					         			str+='<p>保障年龄：待定</p>'
					         		}
								str+='<h2 class="shopping_right_conter_pire absolute">￥'+(json.info[i+1]&&json.info[i+1].price?json.info[i+1].price:'')+'</h2>'+
							'</div>'+
							'<div class="clear"></div>'+
						'</div>'
						}
						i=i+2;
         			}
         			if(page==1){			//用于判断是否上拉加载下拉刷新   1表示不是
         				$('.shopping_menu').html(str)
         			}else{
         				$('.shopping_no_conter').remove()
         				$('.shopping_menu').append(str)
         			}
         			if(me){			
                        me.resetload();
         			}
         			
         		}else{
         			if(me){
                        me.resetload();
         			}else{
         				$('.shopping_menu').html('<div id="shopping_no_conter" style="height:5rem;width:100%;line-height: 5rem;font-size: 14px;text-align: center;">产品正在设计中，敬请期待</div>')
         			}
         		}

         	}else{
         			var title=json.info,
						name1='确定',
						Method1='cancel()';
					alert(title,name1,Method1)
                   if(me){
                        me.resetload();
         			}
         			
         	}
     	}
	})
	
		
}

// 点击切换场景
$(document).on('click','.btn',function(){
	page=1;
	Sclassification(this)
})

// 点击展示商品进入相应商品详情
$(document).on('click','.shopping_conter',function(){
	var sid = $(this).attr('sid')
	var url = '/html/productDetails.html?id='+sid;
		url_location(url)
})