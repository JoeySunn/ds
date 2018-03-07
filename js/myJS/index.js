$('document').ready(function(){
	$('.NavigationBar .menu .menu_li i').hide()
	$('.NavigationBar .menu .menu_li').eq(0).find('i').show()
	$.ajax({				//首页行业场景示例
		type: "post",
        async: true,
        url: getPostUrl()+'/RelatClass/lists',
        data: {
			source: 2
		},
         dataType: "json",
         success: function(json){
			var str='',
				str1_1='',
				Industry_czt='Industry_czt',
				data=json.info;
			if(json.status==1){
				for(var i = 0;i<3;i++){
					str+='<div class="IndustryCustomization_mods_cj enterScene msover" link="'+(data[i].link?data[i].link:"")+'?id='+(data[i].id?data[i].id:"")+'">'+
						'<h2>0'+(Number(i)+1)+'</h2>'+
						'<h4>'+data[i].name+'场景</h4>'
						if(data[i]&&data[i].title&&data[i].title!=''&&data[i].title!=null){
							str+='<p>'+data[i].title+'</p>'
						}else{
							str+='<p style="display:none;">'+data[i].title+'</p>'
						}
						
						str+='<img src="'+(data[i].image_url!=null?data[i].image_url:"./images/ditu.png")+'" alt="">'+
						'<button class="enterScene" link="'+(data[i].link?data[i].link:"")+'?id='+(data[i].id?data[i].id:"")+'">查看详情</button>'+
					'</div>'
				}
				
				$('.IndustryCustomization_mods').html(str)

				for(var i=0;i<data.length;){
         				str1_1+='<tr>'
	         				str1_1+='<td links="'+(data[i]&&data[i].link?data[i].link:"")+'?id='+(data[i].id?data[i].id:"")+'">'+(data[i]&&data[i].name?data[i].name:"")+'</td>'
	         				str1_1+='<td links="'+(data[i+1]&&data[i+1].link?data[i+1].link:"")+'?id='+(data[i+1]&&data[i+1].id?data[i+1].id:"")+'">'+(data[i+1]&&data[i+1].name?data[i+1].name:"")+'</td>'
	         				str1_1+='<td links="'+(data[i+2]&&data[i+2].link?data[i+2].link:"")+'?id='+(data[i+2]&&data[i+2].id?data[i+2].id:"")+'">'+(data[i+2]&&data[i+2].name?data[i+2].name:"")+'</td>'
	         				str1_1+='<td links="'+(data[i+3]&&data[i+3].link?data[i+3].link:"")+'?id='+(data[i+3]&&data[i+3].id?data[i+3].id:"")+'">'+(data[i+3]&&data[i+3].name?data[i+3].name:"")+'</td>'
         				str1_1+='</tr>'
         				i+=4;
         			}
         		$('.Industry_czt').find('tbody').html(str1_1)
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

})









