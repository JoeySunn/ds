
$(document).ready(function(){
    var id = GetQueryString('id');      //获取URL中的产品ID
    $.ajax({                //载入当前产品的详细情况
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
                $('.shopping_left_conter_img').attr('src',json.info&&json.info.image_url?json.info.image_url:'../images/ditu.png')
                $('.shopping_right_conter_title').html(json.info&&json.info.name?json.info.name:'待定')
                $('.shopping_right_conter_ins_limit').html('保险期限：'+(json.info&&json.info.ins_limit?json.info.ins_limit:'待定'))
                $('.shopping_right_conter_pire b').html(json.info&&json.info.price?json.info.price:'待定')
                if(json.info.desc!=''&&json.info.desc!=null){
                    var str1=json.info.desc;
                    $('.img_txt_details_conter').html(str1);
                }
                if($('.shopping_right_conter_title').width()>200){  //当标题长度超出时变为滚动显示
                    $('.shopping_right_conter_title').html('<marquee direction=left>'+$('.shopping_right_conter_title').html()+'</marquee>')
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

//微信分享
function wxOnSignJssdkOk(obj){
    //通过config接口注入权限验证配置
    if($('.shopping_right_conter_title').width()>200){  //当标题长度超出时变为滚动显示
            var title = $('.shopping_right_conter_title marquee').text();
    }else{
        var title = $('.shopping_right_conter_title').text();
    }
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: obj.appId, // 必填，公众号的唯一标识
        timestamp: obj.timestamp, // 必填，生成签名的时间戳 
        nonceStr: obj.nonceStr, // 必填，生成签名的随机串
        signature: obj.signature,// 必填，签名，见附录1
        jsApiList: ["onMenuShareTimeline",//分享到朋友圈
                    "onMenuShareAppMessage",//分享给朋友
                    "hideOptionMenu",//隐藏右上角菜单接口
                    "hideAllNonBaseMenuItem",//隐藏所有非基础按钮接口
                    "showMenuItems",//批量显示功能按钮接口
                    "chooseImage"//拍照或从手机相册中选图接口
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        
        
    });         
    //通过ready接口处理成功验证（经过测试，这个函数无论成功或者失败都会触发）
    wx.ready(function(){            
        wx.onMenuShareAppMessage({
            title : title,     //标题
            desc :  "袋鼠保服，连接一切保险可能",     //分享时的文字
            link : window.location.href,
            imgUrl : window.location.origin+"/Web/images/logo.png"   //分享时的小图片
        });

    // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareTimeline({
            title : title,     //标题
            desc :  "袋鼠保服，连接一切保险可能",     //分享时的文字
            link : window.location.href,
            imgUrl : window.location.origin+"/Web/images/logo.png"   //分享时的小图片
        });
        
    });
        
    
}


function wxSignJssdk() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://wx.buyubi.com/WXAdmin/callwx/jssdk/proxy_sign.wxa'+
        '?_dc='+Math.random()+
        '&__crossCallback=wxOnSignJssdkOk'+
        '&originId=gh_174e6c941c11'+
        '&url='+encodeURIComponent(window.location.href);//这里的url必须转码，否则http://xxx.xxx/?xxx=xxx&xxx=xxx之类的url会被识别为两个参数导致签名失败
    document.getElementsByTagName('head')[0].appendChild(script);
}   
     

wxSignJssdk();
/*

    图文详情展开与关闭
    dom:当前调用的元素

*/
function development(dom){
    var status=$(dom).attr('status')
    if(status==1){
        $(dom).attr('status','0')
        $(dom).removeClass('development_rotate')
        $(dom).addClass('development_norotate')
        $('.img_txt_details_conter').hide()
    }else if(status==0){
        $(dom).attr('status','1')
        $(dom).addClass('development_rotate')
        $(dom).removeClass('development_norotate')
        $('.img_txt_details_conter').show()
    }
}


//图文详情展开关闭
$('.development').click(function(){
    development(this)
})

//回退按钮
$('.fanhui').click(function(){
    history.go(-1)
})