
$(document).ready(function(){
  $('.NavigationBar .menu .menu_li i').hide()
  $('.NavigationBar .menu .menu_li').eq(2).find('i').show()
  if(typeof(getPostUrl) == "function"){
      $.ajax({    //行业定制场景分类列表
         type: "post",
         async: true,
         url: getPostUrl()+"/RelatClass/lists",
         data:{
          source:2
         },
         dataType: "json",
         success: function(json){
          var str='',
               str1='',
            data=json.info;
          if(json.status==1){
            if(data!=null&&data!=''){
              for(var i=0;i<data.length;){
                  str+='<tr>'
                    str+='<td links="'+(data[i]&&data[i].link?data[i].link:"")+'?id='+(data[i]&&data[i].id?data[i].id:"")+'">'+(data[i]&&data[i].name?data[i].name:"")+'</td>'
                    str+='<td links="'+(data[i+1]&&data[i+1].link?data[i+1].link:"")+'?id='+(data[i+1]&&data[i+1].id?data[i+1].id:"")+'">'+(data[i+1]&&data[i+1].name?data[i+1].name:"")+'</td>'
                    str+='<td links="'+(data[i+2]&&data[i+2].link?data[i+2].link:"")+'?id='+(data[i+2]&&data[i+2].id?data[i+2].id:"")+'">'+(data[i+2]&&data[i+2].name?data[i+2].name:"")+'</td>'
                    str+='<td links="'+(data[i+3]&&data[i+3].link?data[i+3].link:"")+'?id='+(data[i+3]&&data[i+3].id?data[i+3].id:"")+'">'+(data[i+3]&&data[i+3].name?data[i+3].name:"")+'</td>'
                  str+='</tr>'
                        str1+='<tr>'
                           str1+='<td class="b12" links="'+(data[i]&&data[i].link?data[i].link:"")+'?id='+(data[i]&&data[i].id?data[i].id:"")+'" logo_hover_url="'+(data[i]&&data[i].logo_hover_url?data[i].logo_hover_url:"")+'" logo_url="'+(data[i]&&data[i].logo_url?data[i].logo_url:"")+'" style="display:'+(data[i]?"":"none")+';"><span><b><img src="'+(data[i]&&data[i].logo_url?data[i].logo_url:"")+'" alt=""></b><strong>'+(data[i]&&data[i].name?data[i].name:"")+'</strong></span></td>'
                           str1+='<td class="b12" links="'+(data[i+1]&&data[i+1].link?data[i+1].link:"")+'?id='+(data[i+1]&&data[i+1].id?data[i+1].id:"")+'" logo_hover_url="'+(data[i+1]&&data[i+1].logo_hover_url?data[i+1].logo_hover_url:"")+'" logo_url="'+(data[i+1]&&data[i].logo_url?data[i+1].logo_url:"")+'" style="display:'+(data[i+1]?"":"none")+';"><span><b><img src="'+(data[i+1]&&data[i+1].logo_url?data[i+1].logo_url:"")+'" alt=""></b><strong>'+(data[i+1]&&data[i+1].name?data[i+1].name:"")+'</strong></span></td>'
                           str1+='<td class="b12" links="'+(data[i+2]&&data[i+2].link?data[i+2].link:"")+'?id='+(data[i+2]&&data[i+2].id?data[i+2].id:"")+'" logo_hover_url="'+(data[i+2]&&data[i+2].logo_hover_url?data[i+2].logo_hover_url:"")+'" logo_url="'+(data[i+2]&&data[i].logo_url?data[i+2].logo_url:"")+'" style="display:'+(data[i+2]?"":"none")+';"><span><b><img src="'+(data[i+2]&&data[i+2].logo_url?data[i+2].logo_url:"")+'" alt=""></b><strong>'+(data[i+2]&&data[i+2].name?data[i+2].name:"")+'</strong></span></td>'
                           str1+='<td class="b12" links="'+(data[i+3]&&data[i+3].link?data[i+3].link:"")+'?id='+(data[i+3]&&data[i+3].id?data[i+3].id:"")+'" logo_hover_url="'+(data[i+3]&&data[i+3].logo_hover_url?data[i+3].logo_hover_url:"")+'" logo_url="'+(data[i+3]&&data[i].logo_url?data[i+3].logo_url:"")+'" style="display:'+(data[i+3]?"":"none")+';"><span><b><img src="'+(data[i+3]&&data[i+3].logo_url?data[i+3].logo_url:"")+'" alt=""></b><strong>'+(data[i+3]&&data[i+3].name?data[i+3].name:"")+'</strong></span></td>'
                  
                        str1+='</tr>'
                  i+=4;
                }
                  $('.Industry_czt').find('tbody').html(str)
              $('.Product_conter').find('tbody').html(str1)

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
	
})




$(document).scroll(function() {  
  if($(document).scrollTop()<0){
    $('.zation_Customized .NavigationBar').css({
      "position": "absolute"
    })
  }else if($(document).scrollTop()>=0){
    $('.zation_Customized .NavigationBar').css({
      "position": "fixed"
    })
  }

})

