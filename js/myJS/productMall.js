
$(document).ready(function(){
	$('.NavigationBar .menu .menu_li i').hide()
	$('.NavigationBar .menu .menu_li').eq(1).find('i').show()
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
         	var str1_1='',
         		Industry_czt='Industry_czt',
         		data=json.info;
         	if(json.status==1){
         		if(data!=null&&data!=''){
         			for(var i=0;i<data.length;i++){
	         			str+='<li class="Sclassification l Sclassification_li" cls_id="'+data[i].id+'">'+data[i].name+'</li>'		
	         		}
	         		$('#productMall_pdM .Product_conter').find('ul').html('<li class="Sclassification li l Sclassification_li" cls_id="">全部</li>'+str);	
	         		$('#productMall_pdM .ProductModule .Product_conter ul .Sclassification_li').eq(0).click();
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
    $.ajax({		//商城首页导航栏行业定制行业场景
         type: "post",
         async: true,
         url: getPostUrl()+"/RelatClass/lists",
         data:{
         	source:2
         },
         dataType: "json",
         success: function(json){
         	var str1_1='',
         		Industry_czt='Industry_czt',
         		data=json.info;
         	if(json.status==1){
         		if(data!=null&&data!=''){

         			for(var i=0;i<data.length;){
         				str1_1+='<tr>'
	         				str1_1+='<td links="'+(data[i]&&data[i].link?data[i].link:"")+'?id='+(data[i]&&data[i].id?data[i].id:"")+'">'+(data[i]&&data[i].name?data[i].name:"")+'</td>'
	         				str1_1+='<td links="'+(data[i+1]&&data[i+1].link?data[i+1].link:"")+'?id='+(data[i+1]&&data[i+1].id?data[i+1].id:"")+'">'+(data[i+1]&&data[i+1].name?data[i+1].name:"")+'</td>'
	         				str1_1+='<td links="'+(data[i+2]&&data[i+2].link?data[i+2].link:"")+'?id='+(data[i+2]&&data[i+2].id?data[i+2].id:"")+'">'+(data[i+2]&&data[i+2].name?data[i+2].name:"")+'</td>'
	         				str1_1+='<td links="'+(data[i+3]&&data[i+3].link?data[i+3].link:"")+'?id='+(data[i+3]&&data[i+3].id?data[i+3].id:"")+'">'+(data[i+3]&&data[i+3].name?data[i+3].name:"")+'</td>'
         				str1_1+='</tr>'
         				i+=4;
         			}
	         		$('.Industry_czt').find('tbody').html(str1_1)
						
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
    
 $('.NavigationBar2 .menu .menu_li').find('i').hide()
	$('.NavigationBar2 .menu .menu_li').eq(1).find('i').show()
	
});
$(document).scroll(function() {  
	if($(document).scrollTop()<0){
		$('#productMall .NavigationBar').css({
			"position": "absolute"
		})
	}else if($(document).scrollTop()>=0){
		$('#productMall .NavigationBar').css({
			"position": "fixed"
		})
	}
})







