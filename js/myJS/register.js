

var timer=null;	
var timer3=null;	
var timer2=null;


$(document).ready(function(){
	var stat = GetQueryString('stat');		//stat参数：用户获取登录用户是否认证通过
	var email = $.cookie('email');	//用于获取用户是否登陆，登录邮箱
	
	if(email!=''&&email!=null){    
		closeWindow()
		$('.SignIn').hide();
		$('.SignIn2').show();
		$('.SignIn2 .email').html(email)
	}
	if(stat==2){    //当stat==2时表示登录用户正处于资料填写阶段
		$.ajax({				
			type: "post",
	        async: true,
	        url: getPostUrl()+'/Company/info',
	        dataType: "json",
	        success: function(json){
	        	if(json.status==1){
	        		if(json.info.save_type==1){
	        			$('.enterpriseName').find('input').val(json.info.name);
						$('.companyAddress').find('input').val(json.info.addr);
						$('.fullName').find('input').val(json.info.admin_name);
						$('.contactNumber').find('input').val(json.info.admin_mobile);
						$('.idNumber').find('input').val(json.info.admin_ident_no);
							picsid = $('.picsid').attr('sid');

						if(json.info.admin_ident_img!=''&&json.info.admin_ident_img!=null){
							$('.picsid').attr('sid',1);
							$('.picsid').attr('img_url',json.info.admin_ident_img);
							$('.picsid').attr('src',json.info.admin_ident_img_url);
						}
						if(json.info.agent_img!=''&&json.info.agent_img!=null){
							$('.Certificatesid').attr('sid',1);
							$('.Certificatesid').attr('img_url',json.info.agent_img);
							$('.Certificatesid').attr('src',json.info.agent_img_url);
						}
						if(json.info.admin_type==1){
							$('.identity_type').find('.card').eq(0).click();
						}else{
							$('.identity_type').find('.card').eq(1).click();
						}
						
	        		}else if(json.info.save_type==2){
	        			$('.enterpriseName').find('input').val(json.info.name);
	        			$('.company_information .essential_information h2').html(json.info.name);
						$('.companyAddress').find('input').val(json.info.addr);
						$('.fullName').find('input').val(json.info.admin_name);
						$('.contactNumber').find('input').val(json.info.admin_mobile);
						$('.idNumber').find('input').val(json.info.admin_ident_no);
							picsid = $('.picsid').attr('sid');
						if(json.info.admin_ident_img!=''&&json.info.admin_ident_img!=null){
							$('.picsid').attr('sid',1);
							$('.picsid').attr('img_url',json.info.admin_ident_img);
							$('.picsid').attr('src',json.info.admin_ident_img_url);
						}
						if(json.info.agent_img!=''&&json.info.agent_img!=null){
							$('.Certificatesid').attr('sid',1);
							$('.Certificatesid').attr('img_url',json.info.agent_img);
							$('.Certificatesid').attr('src',json.info.agent_img_url);
						}
						if(json.info.admin_type==1){
							$('.identity_type').find('.card').eq(0).click();
							if(json.info.legal_name!=''&&json.info.legal_name!=null){
								$('.legalRepresentative').val(json.info.legal_name);
							}else{
								$('.legalRepresentative').val(json.info.admin_name);
							}
							if(json.info.legal_ident_no!=''&&json.info.legal_ident_no!=null){
								$('.corporateIdentityCard').val(json.info.legal_ident_no);
							}else{
								$('.corporateIdentityCard').val(json.info.admin_ident_no);
							}
							
						}else{
							$('.legalRepresentative').val(json.info.legal_name);
							$('.corporateIdentityCard').val(json.info.legal_ident_no);
							$('.identity_type').find('.card').eq(1).click();
						}
						
						
						if(json.info.legal_ident_img!=''&&json.info.legal_ident_img!=null){
							$('.BusinessLicense').attr('sid',1);
							$('.BusinessLicense').attr('img_url',json.info.legal_ident_img);
							$('.BusinessLicense').attr('src',json.info.legal_ident_img_url);
						}
						if(json.info.credit_type==1){
							$('.DocumentSelection').attr('sid',json.info.credit_type);
							$('.enterpriseNumber').find('em').html('社会统一信用代码');
							$('.enterpriseDocuments').val(json.info.credit_code);
						}else{
							$('.DocumentSelection').attr('sid',json.info.credit_type);
							$('.enterpriseNumber').find('em').html('组织机构代码');
							$('.enterpriseDocuments').val(json.info.credit_code);
							$('.businessRegistrationNumber').parent('.lab').show();
							$('.businessRegistrationNumber').val(json.info.bus_code);
						}	
						$('.information').hide();
						$('.company_information').show();
						$('body').scrollTop(0);
						$('.register_conter_step li').eq(1).find('span').addClass('active');
	        		}else if(json.info.save_type==3){
	        			$('.enterpriseName').find('input').val(json.info.name);
	        			$('.company_information .essential_information h2').html(json.info.name);
						$('.companyAddress').find('input').val(json.info.addr);
						$('.fullName').find('input').val(json.info.admin_name);
						$('.contactNumber').find('input').val(json.info.admin_mobile);
						$('.idNumber').find('input').val(json.info.admin_ident_no);
							picsid = $('.picsid').attr('sid');
						if(json.info.admin_ident_img!=''&&json.info.admin_ident_img!=null){
							$('.picsid').attr('sid',1);
							$('.picsid').attr('img_url',json.info.admin_ident_img);
							$('.picsid').attr('src',json.info.admin_ident_img_url);
						}
						if(json.info.agent_img!=''&&json.info.agent_img!=null){
							$('.Certificatesid').attr('sid',1);
							$('.Certificatesid').attr('img_url',json.info.agent_img);
							$('.Certificatesid').attr('src',json.info.agent_img_url);
						}
						if(json.info.admin_type==1){
							$('.identity_type').find('.card').eq(0).click();
							if(json.info.legal_name!=''&&json.info.legal_name!=null){
								$('.legalRepresentative').val(json.info.legal_name);
							}else{
								$('.legalRepresentative').val(json.info.admin_name);
							}
							if(json.info.legal_ident_no!=''&&json.info.legal_ident_no!=null){
								$('.corporateIdentityCard').val(json.info.legal_ident_no);
							}else{
								$('.corporateIdentityCard').val(json.info.admin_ident_no);
							}
						}else{
							$('.legalRepresentative').val(json.info.legal_name);
							$('.corporateIdentityCard').val(json.info.legal_ident_no);
							$('.identity_type').find('.card').eq(1).click();
						}
						
						if(json.info.legal_ident_img!=''&&json.info.legal_ident_img!=null){
							$('.BusinessLicense').attr('sid',1);
							$('.BusinessLicense').attr('img_url',json.info.legal_ident_img);
							$('.BusinessLicense').attr('src',json.info.legal_ident_img_url);
						}
						if(json.info.credit_type==1){
							$('.DocumentSelection').attr('sid',json.info.credit_type);
							$('.enterpriseNumber').find('em').html('社会统一信用代码');
							$('.enterpriseDocuments').val(json.info.credit_code);
						}else{
							$('.DocumentSelection').attr('sid',json.info.credit_type);
							$('.enterpriseNumber').find('em').html('组织机构代码');
							$('.enterpriseDocuments').val(json.info.credit_code);
							$('.businessRegistrationNumber').parent('.lab').show();
							$('.businessRegistrationNumber').val(json.info.bus_code);
						}
						$('.accountName').val(json.info.bank_card_info.account_name);
						$('.BankAccount').val(json.info.bank_card_info.card_number);
						$('.OpeningBank').val(json.info.bank_card_info.bank_name);
						$('.LocationOfTheBank').val(json.info.bank_card_info.bank_addr);
						$('.OpeningBranch').val(json.info.bank_card_info.card_issuers);
						$('.information').hide();
						$('.companyBank_information').show();
						$('body').scrollTop(0);
						$('.register_conter_step li').eq(1).find('span').addClass('active');
						$('.register_conter_step li').eq(2).find('span').addClass('active');
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
	}else if(stat==3){			 //当stat==2时表示登录用户正处于审核阶段
		$('.information').hide();
		$('.companyBank_information1').show();
		$('body').scrollTop(0);
		$('.register_conter_step li').find('span').addClass('active');
		$('.register_conter_step li').eq(4).find('span').removeClass('active');
		$('.register_conter_step li').eq(5).find('span').removeClass('active');
		var num=9;
		timer2=setInterval(function(){
			$('.companyBank_information1').find('.essential_information p span').html('（'+num+'s  后自动跳转至首页）')
			num--;
			if(num<=0){
				clearInterval(timer2);
				var url = '/index.html'
				url_location(url)
				$.cookie('num','1');
			}

		},1000)
	}else if(stat==4){			 //当stat==2时表示登录用户正处于审核通过
		$('.information').hide();
		$('.companyBank_information2').show();
		$('body').scrollTop(0);
		$('.register_conter_step li').find('span').addClass('active');
		$('.register_conter_step li').eq(5).find('span').removeClass('active');
		
		var num=4;
		timer=setInterval(function(){
			$('.companyBank_information2').find('.essential_information p span').html('（'+num+'s  后自动进入商户平台）')
			num--;
			if(num==0){
				clearInterval(timer);
				var stat1 = GetQueryString('stat');
				if(stat1==4){
					var url = '/Merchant_platform.html'
					var shuju = {
						name:['stas'],
						title:['1']
					}
					url_location(url,shuju)
				}
			}

		},1000)
	}else if(stat==5){			 //当stat==2时表示登录用户认证失败
		$.ajax({				
			type: "post",
	        async: true,
	        url: getPostUrl()+'/Company/cert_info',
	        dataType: "json",
	        success: function(json){
	        	var str='';
	        	if(json.status){
	        		if(json.info.rebut_info!=null||json.info.rebut_info!=''){
					
	        			str+='<img src="../images/error.png" alt=""><p>企业认证失败</p>'
	        			for(var i=0;i<json.info.rebut_info.length;i++){
	        				str+='<p style="font-size:16px;">'+json.info.rebut_info[i].reason+'</p>'
	        			}
	        			str+='<div class="Next_step">'+
								'<a href="javascript:;" class="active Modify_data">修改资料</a>'+
							'</div>'
	        			$('.companyBank_information3').find('.essential_information').html(str)
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
		$('.information').hide();
		$('.companyBank_information3').show();

		$('body').scrollTop(0);
		$('.register_conter_step li').find('span').addClass('active');
	}
})
function stop_Timer(){		//关闭定时器（审核通过时的倒计时）
	clearInterval(timer);
}


/*
	用户认证失败后的重新认证
*/

function Modify_data(){    
	$.ajax({				
			type: "post",
	        async: true,
	        url: getPostUrl()+'/Company/info',
	        dataType: "json",
	        success: function(json){
	        	if(json.status==1){
	        		$('.enterpriseName').find('input').val(json.info.name);
					$('.companyAddress').find('input').val(json.info.addr);
					$('.fullName').find('input').val(json.info.admin_name);
					$('.contactNumber').find('input').val(json.info.admin_mobile);
					$('.idNumber').find('input').val(json.info.admin_ident_no);
						picsid = $('.picsid').attr('sid');
					if(json.info.admin_ident_img!=''&&json.info.admin_ident_img!=null){
						$('.picsid').attr('sid',1);
						$('.picsid').attr('img_url',json.info.admin_ident_img);
						$('.picsid').attr('src',json.info.admin_ident_img_url);
					}
					if(json.info.agent_img!=''&&json.info.agent_img!=null){
						$('.Certificatesid').attr('sid',1);
						$('.Certificatesid').attr('img_url',json.info.agent_img);
						$('.Certificatesid').attr('src',json.info.agent_img_url);
					}
					if(json.info.admin_type==0){
						$('.identity_type').find('.card').eq(0).click();
					}else{
						$('.identity_type').find('.card').eq(1).click();
					}
					sid=$('.DocumentSelection').attr('sid');
					enterpriseDocuments=$('.enterpriseDocuments').val();
					businessRegistrationNumber=$('.businessRegistrationNumber').val();
					$('.legalRepresentative').val(json.info.legal_name);
					corporateIdentityCard=$('.corporateIdentityCard').val(json.info.legal_ident_no);
					if(json.info.legal_ident_img!=''&&json.info.legal_ident_img!=null){
						$('.BusinessLicense').attr('sid',1);
						$('.BusinessLicense').attr('img_url',json.info.legal_ident_img);
						$('.BusinessLicense').attr('src',json.info.legal_ident_img_url);
					}
					if(json.info.credit_type==1){
						$('.DocumentSelection').attr('sid',json.info.credit_type);
						$('.enterpriseNumber').find('em').html('社会统一信用代码');
						$('.enterpriseDocuments').val(json.info.credit_code);
					}else{
						$('.DocumentSelection').attr('sid',json.info.credit_type);
						$('.enterpriseNumber').find('em').html('组织机构代码');
						$('.enterpriseDocuments').val(json.info.credit_code);
						$('.businessRegistrationNumber').parent('.lab').show();
						$('.businessRegistrationNumber').val(json.info.bus_code);
					}
					$('.accountName').val(json.info.bank_card_info.account_name);
					$('.BankAccount').val(json.info.bank_card_info.card_number);
					$('.OpeningBank').val(json.info.bank_card_info.bank_name);
					$('.LocationOfTheBank').val(json.info.bank_card_info.bank_addr);
					$('.OpeningBranch').val(json.info.bank_card_info.card_issuers);
					$('.information').hide();
					$('.information1').show();
					$('body').scrollTop(0);
					$('.register_conter_step li').find('span').removeClass('active');
					$('.register_conter_step li').eq(0).find('span').addClass('active');
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

function a(obj,e){
	if (obj=='fileElem') {
	    fileElem.click();
	  }else if(obj=='fileElem1'){
	  	fileElem1.click();
	  }else if(obj=='fileElem2'){
	  	fileElem2.click();
	  }
  // e.preventDefault(); // prevent navigation to "#"
}

/*
	上传图片
*/
function ShowFileName(obj) {
    var files = document.getElementById(obj).files;
	MegaPixImage(files[0],obj)
     
}
/*
      html5图片压缩

    */
function MegaPixImage(srcImage,obj1) {
    var URL = window.URL && window.URL.createObjectURL ? window.URL :
    window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL :
    null;
    if (window.Blob && srcImage instanceof Blob) {
        if (!URL) { throw Error("No createObjectURL function found to create blob url"); }
        var img = new Image();
        img.src = URL.createObjectURL(srcImage);
        this.blob = srcImage;
        srcImage = img;
       
    }
    if (!srcImage.naturalWidth && !srcImage.naturalHeight) {
        var _this = this;
        srcImage.onload = srcImage.onerror = function() {
            // _this.imageLoadListeners = true;
            var base64 = getBase64Image(img);
			    // console.log(base64);
			    $.ajax({
					url: getPostUrl()+'/FileUpload/img_upload',
					type: "post",
		         	async: true,
					dataType: "json",
					data: {
						file: base64
					},
					success: function(json){
						// picsid_base64=json.info.img
						if(json.status){
							$("#"+obj1).siblings('.pic').attr('img_url',json.info.img);
							$("#"+obj1).siblings('.pic').attr('src',json.info.img_url)
					     	$("#"+obj1).siblings('.addto').attr('src','../images/Success.png')
						     $("#"+obj1).siblings('.pic').attr('sid','1')
						     $("#"+obj1).siblings('.mark').show()
						}else{
			         		// alert(json.info)
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
        };
    }
    this.srcImage = srcImage;
}

/*
	管理员信息中，身份类型切换
*/
function card(obj){
	var index=$('.card').index($(obj));
	var pic1="../images/Unchecked.png";
	var pic2="../images/Selected.png";
	if($('.card').eq(index).attr('sid')==1){
		$('.card').eq(index).attr('sid','2')
		$('.card').eq(index).find('img').attr('src',pic2)
		$('.card').eq(index).siblings('.card').attr('sid','1');
		$('.card').eq(index).siblings('.card').find('img').attr('src',pic1);
	}else{
		$('.card').eq(index).attr('sid','1')
		$('.card').eq(index).find('img').attr('src',pic2)
		$('.card').eq(index).siblings('.card').attr('sid','2');
		$('.card').eq(index).siblings('.card').find('img').attr('src',pic1);
	}
	$('.identity_type').attr('sid',Number(index)+1)
	// console.log(index)
}


/*
	查看上传照片处的示例图
*/
function InstanceDiagram(obj){
	var index = $('.pic_identity_Sample').index($(obj))
	$('#Sample_drawing').show();
	$('#Sample_drawing').find('img').hide();
	if(index==1){
		$('#Sample_drawing').find('.authorization').show();
	}else{
		$('#Sample_drawing').find('.identity').show();
	}
}

/*
	关闭打开的示例图
*/
function Close(){
	$('#Sample_drawing').hide();
}


/*
	认证资料填写判断格式
*/
function MerchantPlatform(obj,card){
	$(obj).siblings('b').hide();
	if($(obj).val()==null||$(obj).val()==''){
		// console.log(1)
		$(obj).siblings('b').show();
		$(obj).siblings('b').html("<img src='../images/error.png' alt=''>内容不能为空");
	}else{
		// console.log(2)
		if(card&&card==1){
			if(/^1[3|4|5|7|8][0-9]\d{8}$/.test($(obj).val())){
				$(obj).siblings('b').hide();
			}else{
				$(obj).siblings('b').show();
				$(obj).siblings('b').html("<img src='../images/error.png' alt=''>请输入正确的联系电话");
			}
		}
		if(card&&card==2){
			if(/^(\d{18,18}|\d{15,15}|\d{17,17}(x|X))$/.test($(obj).val())){
				$(obj).siblings('b').hide();
			}else{
				$(obj).siblings('b').show();
				$(obj).siblings('b').html("<img src='../images/error.png' alt=''>请输入正确的身份证号");
			}
		}
	}
}


/*
	图片转码base64
*/
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
            var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}


/*
	企业认证第一步
*/
function NextStep(){
	var enterpriseName = $('.enterpriseName').find('input').val(),
		companyAddress = $('.companyAddress').find('input').val(),
		fullName = $('.fullName').find('input').val(),
		contactNumber = $('.contactNumber').find('input').val(),
		idNumber = $('.idNumber').find('input').val(),
		identity_type=$('.identity_type').attr('sid'),
		picsid = $('.picsid').attr('sid'),
		Certificatesid = $('.Certificatesid').attr('sid');
		var admin_ident_img=$('.picsid').attr('img_url');
		var agent_img=$('.Certificatesid').attr('img_url');
		if(enterpriseName==''||enterpriseName==null){
			$('.enterpriseName').find('b').show();
			$('.enterpriseName').find('b').html("<img src='../images/error.png' alt=''>内容不能为空")
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}
		if(companyAddress==''||companyAddress==null){
			$('.companyAddress').find('b').show();
			$('.companyAddress').find('b').html("<img src='../images/error.png' alt=''>内容不能为空")
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}
		if(fullName==''||fullName==null){
			$('.fullName').find('b').show();
			$('.fullName').find('b').html("<img src='../images/error.png' alt=''>内容不能为空")
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}else if(fullName!=''&&fullName!=null){
			if(/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/.test(fullName)){
				$('.fullName').find('b').hide();
			}else{
				$('.fullName').find('b').show();
				$('.fullName').find('b').html("<img src='../images/error.png' alt=''>请输入正确的姓名")
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return
			}
		}
		if(contactNumber==''||contactNumber==null){
			$('.contactNumber').find('b').show();
			$('.contactNumber').find('b').html("<img src='../images/error.png' alt=''>内容不能为空")
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}else if(contactNumber!=''&&contactNumber!=null){
			if(mobile_regx(contactNumber)){
				$('.contactNumber').find('b').hide();
			}else{
				$('.contactNumber').find('b').show();
				$('.contactNumber').find('b').html("<img src='../images/error.png' alt=''>请输入正确的联系电话")
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return
			}
		}
		if(idNumber==''||idNumber==null){
			$('.idNumber').find('b').show();
			$('.idNumber').find('b').html("<img src='../images/error.png' alt=''>内容不能为空")
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}else if(idNumber!=''&&idNumber!=null){
			if(idNumber_regx(idNumber)){
				$('.idNumber').find('b').hide();
			}else{
				$('.idNumber').find('b').show();
				$('.idNumber').find('b').html("<img src='../images/error.png' alt=''>请输入正确的身份证号")
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return
			}
		}


		if(!admin_ident_img){
			var title='请选择身份证照片',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}
		if(!agent_img){
			var title='请选择授权书照片',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return;
		}
		$.ajax({
				url: getPostUrl()+'/Company/cert_do',
				type: "post",
	         	async: true,
				dataType: "json",
				data: {
					save_type:'1',
					name: enterpriseName,
					addr: companyAddress,
					admin_type: identity_type,
					admin_name: fullName,
					admin_mobile: contactNumber,
					admin_ident_no: idNumber,
					admin_ident_img: admin_ident_img,
					agent_img: agent_img
				},
				success: function(json){
					if(json.status==0){
		         		if(json.info=="用户未登录!"){
		         			$('.SignIn_register').eq(0).click();
			         		re_Logged_In()
		         		}else{
		         			var title=json.info,
								name1='确定',
								Method1='cancel()';
							alert(title,name1,Method1)
		         		}
						return;
					}else{
						$('.information').hide();
						$('.company_information').show();
						$('.company_information .essential_information h2').html(enterpriseName);
						if(identity_type=='1'){
							$('.company_information .essential_information .legalRepresentative').val(fullName);
							$('.company_information .essential_information .corporateIdentityCard').val(idNumber);
						}
						$('body').scrollTop(0);
						$('.register_conter_step li').eq(1).find('span').addClass('active');
					}
				}
			})
		
}

/*
	企业认证第一步保存
*/
function NextTime(){
	var enterpriseName = $('.enterpriseName').find('input').val(),
		companyAddress = $('.companyAddress').find('input').val(),
		fullName = $('.fullName').find('input').val(),
		contactNumber = $('.contactNumber').find('input').val(),
		idNumber = $('.idNumber').find('input').val(),
		identity_type=$('.identity_type').attr('sid'),
		picsid = $('.picsid').attr('sid'),
		Certificatesid = $('.Certificatesid').attr('sid');
		var admin_ident_img=$('.picsid').attr('img_url');
		var agent_img=$('.Certificatesid').attr('img_url');
		if(enterpriseName==''||enterpriseName==null){
			$('.enterpriseName').find('b').show();
			$('.enterpriseName').find('b').html("<img src='../images/error.png' alt=''>内容不能为空")
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}
		if(companyAddress==''||companyAddress==null){
			$('.companyAddress').find('b').show();
			$('.companyAddress').find('b').html("<img src='../images/error.png' alt=''>内容不能为空")
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}
		if(fullName==''||fullName==null){
			$('.fullName').find('b').show();
			$('.fullName').find('b').html("<img src='../images/error.png' alt=''>内容不能为空")
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}else if(fullName!=''&&fullName!=null){
			if(/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/.test(fullName)){
				$('.fullName').find('b').hide();
			}else{
				$('.fullName').find('b').show();
				$('.fullName').find('b').html("<img src='../images/error.png' alt=''>请输入正确的姓名")
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return
			}
		}
		if(contactNumber==''||contactNumber==null){
			$('.contactNumber').find('b').show();
			$('.contactNumber').find('b').html("<img src='../images/error.png' alt=''>内容不能为空")
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}else if(contactNumber!=''&&contactNumber!=null){
			if(mobile_regx(contactNumber)){
				$('.contactNumber').find('b').hide();
			}else{
				$('.contactNumber').find('b').show();
				$('.contactNumber').find('b').html("<img src='../images/error.png' alt=''>请输入正确的联系电话")
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return
			}
		}
		if(idNumber==''||idNumber==null){
			$('.idNumber').find('b').show();
			$('.idNumber').find('b').html("<img src='../images/error.png' alt=''>内容不能为空")
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}else if(idNumber!=''&&idNumber!=null){
			if(idNumber_regx(idNumber)){
				$('.idNumber').find('b').hide();
			}else{
				$('.idNumber').find('b').show();
				$('.idNumber').find('b').html("<img src='../images/error.png' alt=''>请输入正确的身份证号")
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return
			}
		}


		if(!admin_ident_img){
			var title='请选择身份证照片',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return;
		}
		if(!agent_img){
			var title='请选择授权书照片',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return;
		}
	
			$.ajax({
				url: getPostUrl()+'/Company/cert_do',
				type: "post",
	         	async: true,
				dataType: "json",
				data: {
					save_type:'1',
					name: enterpriseName,
					addr: companyAddress,
					admin_type: identity_type,
					admin_name: fullName,
					admin_mobile: contactNumber,
					admin_ident_no: idNumber,
					admin_ident_img: admin_ident_img,
					agent_img: agent_img
				},
				success: function(json){
					if(json.status==0){
		         		if(json.info=="用户未登录!"){
		         			$('.SignIn_register').eq(0).click();
							re_Logged_In()
		         		}else{
		         			var title=json.info,
								name1='确定',
								Method1='cancel()';
							alert(title,name1,Method1)
		         		}
						return;
					}else{
						var title='保存成功！',
							name1='确定',
							Method1='cancel()';
						alert(title,name1,Method1)
						var url = '/index.html'
						url_location(url)
						$.cookie('num','1');
					}
				}
			})
		
		
}
/*
	企业认证第二步
*/
function NextStep1(){
	var sid=$('.DocumentSelection').attr('sid'),
		enterpriseDocuments=$('.enterpriseDocuments').val(),
		businessRegistrationNumber=$('.businessRegistrationNumber').val(),
		legalRepresentative=$('.legalRepresentative').val(),
		corporateIdentityCard=$('.corporateIdentityCard').val(),
		BusinessLicense=$('.BusinessLicense').attr('sid'),
		legal_ident_img=$('.BusinessLicense').attr('img_url'),
		picsid = $('.picsid').attr('sid'),
		Certificatesid = $('.Certificatesid').attr('sid');
		var admin_ident_img=$('.picsid').attr('img_url');
		var agent_img=$('.Certificatesid').attr('img_url');
	if($('.DocumentSelection').attr('sid')==1){
		if(enterpriseDocuments==''||enterpriseDocuments==null){
			$('.enterpriseDocuments').siblings('.numberPrompt').show();
			$('.enterpriseDocuments').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}else if(enterpriseDocuments!=''&&enterpriseDocuments!=null){
			if(enterpriseDocuments_regx(enterpriseDocuments)){
				$('.enterpriseDocuments').parent('.number').siblings('.numberPrompt').hide();
			}else{
				$('.enterpriseDocuments').parent('.number').siblings('.numberPrompt').show();
				$('.enterpriseDocuments').parent('.number').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>请输入正确的社会统一信用代码");
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return
			}
		}
		if(legalRepresentative==''||legalRepresentative==null){
			$('.legalRepresentative').siblings('.numberPrompt').show();
			$('.legalRepresentative').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}

		if(corporateIdentityCard==''||corporateIdentityCard==null){
			$('.corporateIdentityCard').siblings('.numberPrompt').show();
			$('.corporateIdentityCard').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}else if(corporateIdentityCard!=''&&corporateIdentityCard!=null){
			if(idNumber_regx(corporateIdentityCard)){
				$('.corporateIdentityCard').siblings('b').hide();
			}else{
				$('.corporateIdentityCard').siblings('b').show();
				$('.corporateIdentityCard').siblings('b').html("<img src='../images/error.png' alt=''>请输入正确的身份证号");
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return
			}
		}
		if(!legal_ident_img){
			var title='请上传营业执照',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return;
		}
		$.ajax({
			url: getPostUrl()+'/Company/cert_do',
			type: "post",
         	async: true,
			dataType: "json",
			data: {
				save_type:'2',

				legal_name: legalRepresentative,
				legal_ident_no: corporateIdentityCard,
				legal_ident_img: legal_ident_img,
				bus_code: businessRegistrationNumber,
				credit_type: 1,
				credit_code: enterpriseDocuments
			},
			success: function(json){
				if(json.status==0){
	         		if(json.info=="用户未登录!"){
	         			$('.SignIn_register').eq(0).click();
		     			re_Logged_In()
	         		}else {
	         			var title=json.info,
							name1='确定',
							Method1='cancel()';
						alert(title,name1,Method1)
	         		}
					return;
				}else{
					$('.information').hide();
					$('.companyBank_information').show();
					$('body').scrollTop(0);
					$('.register_conter_step li').eq(2).find('span').addClass('active')
				}
			}
		})
	}else{
		if(enterpriseDocuments==''||enterpriseDocuments==null){
			$('.enterpriseDocuments').siblings('.numberPrompt').show();
			$('.enterpriseDocuments').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return;
		}else if(enterpriseDocuments!=''&&enterpriseDocuments!=null){
			if (/^[a-zA-Z0-9*]*$/.test(enterpriseDocuments) && enterpriseDocuments.length>=9) {  
                $('.enterpriseDocuments').parent('.number').siblings('.numberPrompt').hide();
            }else{	
				$('.enterpriseDocuments').parent('.number').siblings('.numberPrompt').show();
				$('.enterpriseDocuments').parent('.number').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>请输入正确的组织机构代码证");
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return;
			} 
		}

		if(businessRegistrationNumber==''||businessRegistrationNumber==null){
			$('.businessRegistrationNumber').siblings('.numberPrompt').show();
			$('.businessRegistrationNumber').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return;
		}else if(businessRegistrationNumber!=''&&businessRegistrationNumber!=null){
			if(/\d{15}/.test(businessRegistrationNumber)){
				$('.businessRegistrationNumber').siblings('b').hide();
			}else{
				$('.businessRegistrationNumber').siblings('b').show();
				$('.businessRegistrationNumber').siblings('b').html("<img src='../images/error.png' alt=''>请输入正确的企业工商注册号");
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return;
			}
		}

		if(legalRepresentative==''||legalRepresentative==null){
			$('.legalRepresentative').siblings('.numberPrompt').show();
			$('.legalRepresentative').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return;
		}

		if(corporateIdentityCard==''||corporateIdentityCard==null){
			$('.corporateIdentityCard').siblings('.numberPrompt').show();
			$('.corporateIdentityCard').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return;
		}else if(corporateIdentityCard!=''&&corporateIdentityCard!=null){
			if(idNumber_regx(corporateIdentityCard)){
				$('.corporateIdentityCard').siblings('b').hide();
			}else{
				$('.corporateIdentityCard').siblings('b').show();
				$('.corporateIdentityCard').siblings('b').html("<img src='../images/error.png' alt=''>请输入正确的身份证号");
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return;
			}
		}
		if(!legal_ident_img){
			var title='请上传营业执照',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return;
		}
		$.ajax({
			url: getPostUrl()+'/Company/cert_do',
			type: "post",
         	async: true,
			dataType: "json",
			data: {
				save_type:'2',

				legal_name: legalRepresentative,
				legal_ident_no: corporateIdentityCard,
				legal_ident_img: legal_ident_img,
				bus_code: businessRegistrationNumber,
				credit_type: 2,
				credit_code: enterpriseDocuments
			},
			success: function(json){
				if(json.status==0){
	         		if(json.info=="用户未登录!"){
	         			$('.SignIn_register').eq(0).click();
		         		re_Logged_In()
	         		}else{
	         			var title=json.info,
							name1='确定',
							Method1='cancel()';
						alert(title,name1,Method1)
	         		}
					return;
				}else{
					$('.information').hide();
					$('.companyBank_information').show();
					$('body').scrollTop(0);
					$('.register_conter_step li').eq(2).find('span').addClass('active')
				}
			}
		})
	}	
}


/*
	企业认证第二步保存
*/
function NextTime1(){
	var sid=$('.DocumentSelection').attr('sid'),
		enterpriseDocuments=$('.enterpriseDocuments').val(),
		businessRegistrationNumber=$('.businessRegistrationNumber').val(),
		legalRepresentative=$('.legalRepresentative').val(),
		corporateIdentityCard=$('.corporateIdentityCard').val(),
		BusinessLicense=$('.BusinessLicense').attr('sid'),
		legal_ident_img=$('.BusinessLicense').attr('img_url');
	var enterpriseName = $('.enterpriseName').find('input').val(),
		companyAddress = $('.companyAddress').find('input').val(),
		fullName = $('.fullName').find('input').val(),
		contactNumber = $('.contactNumber').find('input').val(),
		idNumber = $('.idNumber').find('input').val(),
		identity_type=$('.identity_type').attr('sid'),
		picsid = $('.picsid').attr('sid'),
		Certificatesid = $('.Certificatesid').attr('sid');
		var admin_ident_img=$('.picsid').attr('img_url');
		var agent_img=$('.Certificatesid').attr('img_url');
		if($('.DocumentSelection').attr('sid')==1){
			if(enterpriseDocuments==''||enterpriseDocuments==null){
				$('.enterpriseDocuments').siblings('.numberPrompt').show();
				$('.enterpriseDocuments').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return;
			}else if(enterpriseDocuments!=''&&enterpriseDocuments!=null){
				if(enterpriseDocuments_regx(enterpriseDocuments)){
					$('.enterpriseDocuments').parent('.number').siblings('.numberPrompt').hide();
				}else{
					$('.enterpriseDocuments').parent('.number').siblings('.numberPrompt').show();
					$('.enterpriseDocuments').parent('.number').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>请输入正确的社会统一信用代码");
					var title='请完善资料！',
						name1='确定',
						Method1='cancel()';
					alert(title,name1,Method1)
					return;
				}
			}
			if(legalRepresentative==''||legalRepresentative==null){
				$('.legalRepresentative').siblings('.numberPrompt').show();
				$('.legalRepresentative').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return;
			}

			if(corporateIdentityCard==''||corporateIdentityCard==null){
				$('.corporateIdentityCard').siblings('.numberPrompt').show();
				$('.corporateIdentityCard').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return;
			}else if(corporateIdentityCard!=''&&corporateIdentityCard!=null){
				if(idNumber_regx(corporateIdentityCard)){
					$('.corporateIdentityCard').siblings('b').hide();
				}else{
					$('.corporateIdentityCard').siblings('b').show();
					$('.corporateIdentityCard').siblings('b').html("<img src='../images/error.png' alt=''>请输入正确的身份证号");
					var title='请完善资料！',
						name1='确定',
						Method1='cancel()';
					alert(title,name1,Method1)
					return;
				}
			}
			if(!admin_ident_img){
				var title='请选择身份证照片',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return;
			}
			if(!agent_img){
				var title='请选择授权书照片',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return;
			}
			if(!legal_ident_img){
				var title='请上传营业执照',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return;
			}
			$.ajax({
				url: getPostUrl()+'/Company/cert_do',
				type: "post",
	         	async: true,
				dataType: "json",
				data: {
					save_type:'2',
					

					legal_name: legalRepresentative,
					legal_ident_no: corporateIdentityCard,
					legal_ident_img: legal_ident_img,
					bus_code: businessRegistrationNumber,
					credit_type: 1,
					credit_code: enterpriseDocuments
				},
				success: function(json){
					if(json.status==0){
		         		if(json.info=="用户未登录!"){
		         			$('.SignIn_register').eq(0).click();
			         		re_Logged_In()
		         		}else{
		         			var title=json.info,
								name1='确定',
								Method1='cancel()';
							alert(title,name1,Method1)
		         		}
						return;
					}else{
						var title='保存成功！',
							name1='确定',
							Method1='cancel()';
						alert(title,name1,Method1)
						var url = 'index.html'
						url_location(url)
						$.cookie('num','1');
					}
				}
			})
			  
		}else{
			if(enterpriseDocuments==''||enterpriseDocuments==null){
				$('.enterpriseDocuments').siblings('.numberPrompt').show();
				$('.enterpriseDocuments').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return;
			}else if(enterpriseDocuments!=''&&enterpriseDocuments!=null){
				if (/^[a-zA-Z0-9*]*$/.test(enterpriseDocuments) && enterpriseDocuments.length>=9) {  
	                $('.enterpriseDocuments').parent('.number').siblings('.numberPrompt').hide();
	            }else{	
					$('.enterpriseDocuments').parent('.number').siblings('.numberPrompt').show();
					$('.enterpriseDocuments').parent('.number').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>请输入正确的组织机构代码证");
					var title='请完善资料！',
						name1='确定',
						Method1='cancel()';
					alert(title,name1,Method1)
					return;
				} 
			}

			if(businessRegistrationNumber==''||businessRegistrationNumber==null){
				$('.businessRegistrationNumber').siblings('.numberPrompt').show();
				$('.businessRegistrationNumber').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return;
			}else if(businessRegistrationNumber!=''&&businessRegistrationNumber!=null){
				if(/\d{15}/.test(businessRegistrationNumber)){
					$('.businessRegistrationNumber').siblings('b').hide();
				}else{
					$('.businessRegistrationNumber').siblings('b').show();
					$('.businessRegistrationNumber').siblings('b').html("<img src='../images/error.png' alt=''>请输入正确的企业工商注册号");
					var title='请完善资料！',
						name1='确定',
						Method1='cancel()';
					alert(title,name1,Method1)
					return;
				}
			}

			if(legalRepresentative==''||legalRepresentative==null){
				$('.legalRepresentative').siblings('.numberPrompt').show();
				$('.legalRepresentative').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return;
			}

			if(corporateIdentityCard==''||corporateIdentityCard==null){
				$('.corporateIdentityCard').siblings('.numberPrompt').show();
				$('.corporateIdentityCard').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return;
			}else if(corporateIdentityCard!=''&&corporateIdentityCard!=null){
				if(idNumber_regx(corporateIdentityCard)){
					$('.corporateIdentityCard').siblings('b').hide();
				}else{
					$('.corporateIdentityCard').siblings('b').show();
					$('.corporateIdentityCard').siblings('b').html("<img src='../images/error.png' alt=''>请输入正确的身份证号");
					var title='请完善资料！',
						name1='确定',
						Method1='cancel()';
					alert(title,name1,Method1)
					return;
				}
			}
			if(!legal_ident_img){
				var title='请上传营业执照',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return;
			}
			$.ajax({
				url: getPostUrl()+'/Company/cert_do',
				type: "post",
	         	async: true,
				dataType: "json",
				data: {
					save_type:'2',

					legal_name: legalRepresentative,
					legal_ident_no: corporateIdentityCard,
					legal_ident_img: legal_ident_img,
					bus_code: businessRegistrationNumber,
					credit_type: 2,
					credit_code: enterpriseDocuments
				},
				success: function(json){
					if(json.status==0){
		         		if(json.info=="用户未登录!"){
		         			$('.SignIn_register').eq(0).click();
			         		re_Logged_In()
		         		}else{
		         			var title=json.info,
								name1='确定',
								Method1='cancel()';
							alert(title,name1,Method1)
		         		}
						return;
					}else{
						var title='保存成功！',
							name1='确定',
							Method1='cancel()';
						alert(title,name1,Method1)
						var url = 'index.html'
						url_location(url)
						$.cookie('num','1');
					}
				}
			})
		}
}

/*
  银行卡号校验
  bankno:银行卡号 
*/
function luhmCheck(bankno){
    var num = /^[1-9][0-9]{8,24}$/; //全数字
    if (num.test(bankno)) {
    	return true; 
    }else{
    	return false;
    	
    }
    
}

/*
	企业认证第三步银行认证
*/
function bankInformation(obj,card){
	$(obj).siblings('b').hide();
	if($(obj).val()==null||$(obj).val()==''){
		$(obj).siblings('b').show();
		$(obj).siblings('b').html("<img src='../images/error.png' alt=''>内容不能为空");
	}else{
		if(card&&card==1){
			if(!luhmCheck($('.BankAccount').val())){
				$(obj).siblings('b').show();
				$(obj).siblings('b').html("<img src='../images/error.png' alt=''>请输入正确的银行账号");
				
			}else{
				$(obj).siblings('b').hide();
			}
		}
	}
}
/*
	企业认证第二步
*/
function NextStep2(){
	var accountName=$('.accountName').val(),
		BankAccount=$('.BankAccount').val(),
		OpeningBank=$('.OpeningBank').val(),
		LocationOfTheBank=$('.LocationOfTheBank').val(),
		OpeningBranch=$('.OpeningBranch').val(),

		enterpriseName = $('.enterpriseName').find('input').val(),
		companyAddress = $('.companyAddress').find('input').val(),
		fullName = $('.fullName').find('input').val(),
		contactNumber = $('.contactNumber').find('input').val(),
		idNumber = $('.idNumber').find('input').val(),
		identity_type=$('.identity_type').attr('sid'),
		picsid = $('.picsid').attr('sid'),
		Certificatesid = $('.Certificatesid').attr('sid'),

		sid=$('.DocumentSelection').attr('sid'),
		enterpriseDocuments=$('.enterpriseDocuments').val(),
		businessRegistrationNumber=$('.businessRegistrationNumber').val(),
		legalRepresentative=$('.legalRepresentative').val(),
		corporateIdentityCard=$('.corporateIdentityCard').val(),
		BusinessLicense=$('.BusinessLicense').attr('sid'),
		legal_ident_img=$('.BusinessLicense').attr('img_url');
		
		var admin_ident_img=$('.picsid').attr('img_url');
		var agent_img=$('.Certificatesid').attr('img_url');
		if(accountName==''||accountName==null){
			$('.accountName').siblings('.numberPrompt').show();
			$('.accountName').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}

		if(BankAccount==''||BankAccount==null){
			$('.BankAccount').siblings('.numberPrompt').show();
			$('.BankAccount').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}else if(BankAccount!=''&&BankAccount!=null){
			if(!luhmCheck(BankAccount)){
				$('.BankAccount').siblings('.numberPrompt').show();
				$('.BankAccount').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>请输入正确的银行账号");
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return
			}else{
				$('.BankAccount').siblings('.numberPrompt').hide();
			}
		}

		if(OpeningBank==''||OpeningBank==null){
			$('.OpeningBank').siblings('.numberPrompt').show();
			$('.OpeningBank').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}

		if(LocationOfTheBank==''||LocationOfTheBank==null){
			$('.LocationOfTheBank').siblings('.numberPrompt').show();
			$('.LocationOfTheBank').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}

		if(OpeningBranch==''||OpeningBranch==null){
			$('.OpeningBranch').siblings('.numberPrompt').show();
			$('.OpeningBranch').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return
		}
		
			$.ajax({
				url: getPostUrl()+'/Company/cert_do',
				type: "post",
				async: true,
				dataType: "json",
				data: {
					save_type:'5',
					name: enterpriseName,
					addr: companyAddress,
					admin_type: identity_type,
					admin_name: fullName,
					admin_mobile: contactNumber,
					admin_ident_no: idNumber,
					admin_ident_img: admin_ident_img,
					agent_img: agent_img,

					legal_name: legalRepresentative,
					legal_ident_no: corporateIdentityCard,
					legal_ident_img: legal_ident_img,
					bus_code: businessRegistrationNumber,
					credit_type: sid,
					credit_code: enterpriseDocuments,

					account_name:accountName,
					card_number:BankAccount,
					bank_name:OpeningBank,
					bank_addr:LocationOfTheBank,
					card_issuers:OpeningBranch,
				},
				success: function(json){
					if(json.status==0){
		         		if(json.info=="用户未登录!"){
		         			$('.SignIn_register').eq(0).click();
		         			re_Logged_In()
		         		}else{
		         			var title=json.info,
								name1='确定',
								Method1='cancel()';
							alert(title,name1,Method1)
		         		}
						return;
					}else{
						$('.information').hide();
						$('.companyBank_information1').show();
						$('body').scrollTop(0);
						$('.register_conter_step li').find('span').addClass('active');
						$('.register_conter_step li').eq(4).find('span').removeClass('active');
						$('.register_conter_step li').eq(5).find('span').removeClass('active');
						var num=9;
							timer3=setInterval(function(){
								$('.companyBank_information1').find('.essential_information p span').html('（'+num+'s  后自动跳转至首页）')
								num--;
								if(num<=0){
									clearInterval(timer3);
									var url = 'index.html'
									url_location(url)
									$.cookie('num','1');
								}

							},1000)
					}
				}
			})
}
/*
	企业认证第三步保存
*/
function NextTime2(){
	var accountName=$('.accountName').val(),
		BankAccount=$('.BankAccount').val(),
		OpeningBank=$('.OpeningBank').val(),
		LocationOfTheBank=$('.LocationOfTheBank').val(),
		OpeningBranch=$('.OpeningBranch').val(),

		enterpriseName = $('.enterpriseName').find('input').val(),
		companyAddress = $('.companyAddress').find('input').val(),
		fullName = $('.fullName').find('input').val(),
		contactNumber = $('.contactNumber').find('input').val(),
		idNumber = $('.idNumber').find('input').val(),
		identity_type=$('.identity_type').attr('sid'),
		picsid = $('.picsid').attr('sid'),
		Certificatesid = $('.Certificatesid').attr('sid'),

		sid=$('.DocumentSelection').attr('sid'),
		enterpriseDocuments=$('.enterpriseDocuments').val(),
		businessRegistrationNumber=$('.businessRegistrationNumber').val(),
		legalRepresentative=$('.legalRepresentative').val(),
		corporateIdentityCard=$('.corporateIdentityCard').val(),
		BusinessLicense=$('.BusinessLicense').attr('sid'),
		legal_ident_img=$('.BusinessLicense').attr('img_url');
		
		var admin_ident_img=$('.picsid').attr('img_url');
		var agent_img=$('.Certificatesid').attr('img_url');
		if(accountName==''||accountName==null){
			$('.accountName').siblings('.numberPrompt').show();
			$('.accountName').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return 
		}

		if(BankAccount==''||BankAccount==null){
			$('.BankAccount').siblings('.numberPrompt').show();
			$('.BankAccount').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return 
		}else if(BankAccount!=''&&BankAccount!=null){
			if(!luhmCheck(BankAccount)){
				$('.BankAccount').siblings('.numberPrompt').show();
				$('.BankAccount').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>请输入正确的银行账号");
				var title='请完善资料！',
					name1='确定',
					Method1='cancel()';
				alert(title,name1,Method1)
				return 
			}else{
				$('.BankAccount').siblings('.numberPrompt').hide();
			}
		}

		if(OpeningBank==''||OpeningBank==null){
			$('.OpeningBank').siblings('.numberPrompt').show();
			$('.OpeningBank').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return 
		}

		if(LocationOfTheBank==''||LocationOfTheBank==null){
			$('.LocationOfTheBank').siblings('.numberPrompt').show();
			$('.LocationOfTheBank').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return 
		}

		if(OpeningBranch==''||OpeningBranch==null){
			$('.OpeningBranch').siblings('.numberPrompt').show();
			$('.OpeningBranch').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
			var title='请完善资料！',
				name1='确定',
				Method1='cancel()';
			alert(title,name1,Method1)
			return 
		}
		
		$.ajax({
			url: getPostUrl()+'/Company/cert_do',
			type: "post",
			async: true,
			dataType: "json",
			data: {
				save_type:'3',
				account_name:accountName,
				card_number:BankAccount,
				bank_name:OpeningBank,
				bank_addr:LocationOfTheBank,
				card_issuers:OpeningBranch,
			},
			success: function(json){
				if(json.status==0){
					
	         		if(json.info=="用户未登录!"){
	         			$('.SignIn_register').eq(0).click();
		         		re_Logged_In()
	         		}else{
	         			var title=json.info,
							name1='确定',
							Method1='cancel()';
						alert(title,name1,Method1)
	         		}
					return;
				}else{
					var title='保存成功！',
						name1='确定',
						Method1='cancel()';
					alert(title,name1,Method1)
					var url = 'index.html'
					url_location(url)
					$.cookie('num','1');
				}
			}
		})

}

/*
	社会统一信用代码选择关闭
*/
function launch(){
	$('.DocumentSelection').show()
}

/*
	社会统一信用代码切换
*/
function IDNumberSelection(obj){
	$('.DocumentSelection').hide()
	$('.company_information').find('a em').html($(obj).text())
	$('.DocumentSelection').attr('sid',$(obj).attr('sid'))
	if($(obj).attr('sid')==2){
		$('.businessRegistrationNumber').parent('.lab').show();
	}else{
		$('.businessRegistrationNumber').parent('.lab').hide();
	}
}
/*
	企业认证第二步（blur）
*/
function determineEnterpriseInformation(obj,card){
	var value = $(obj).val();
	$(obj).siblings('.numberPrompt').hide();
	if(card==0){
		$(obj).parent('.number').siblings('.numberPrompt').hide();
	}
	if(value==null||value==''){
		if(card==0){
			$(obj).parent('.number').siblings('.numberPrompt').show();
			$(obj).parent('.number').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
		}else{
			$(obj).siblings('.numberPrompt').show();
			$(obj).siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>内容不能为空");
		}
	}else{
		if(card&&card==0){
			
			if($('.DocumentSelection').attr('sid')==1){
				if(enterpriseDocuments_regx(value)){
					$(obj).parent('.number').siblings('.numberPrompt').hide();
				}else{
					$(obj).parent('.number').siblings('.numberPrompt').show();
					$(obj).parent('.number').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>请输入正确的社会统一信用代码");
				}
			}else if($('.DocumentSelection').attr('sid')==2){
				if (/^[a-zA-Z0-9*]*$/.test(value) && value.length>=9) {  
	                $(obj).parent('.number').siblings('.numberPrompt').hide();
	            }else{	
					$(obj).parent('.number').siblings('.numberPrompt').show();
					$(obj).parent('.number').siblings('.numberPrompt').html("<img src='../images/error.png' alt=''>请输入正确的组织机构代码证");
				}  
			}
			
		}
		if(card&&card==1){
			if(/\d{15}/.test(value)){
				$(obj).siblings('b').hide();
			}else{
				$(obj).siblings('b').show();
				$(obj).siblings('b').html("<img src='../images/error.png' alt=''>请输入正确的企业工商注册号");
			}
		}
		if(card&&card==3){
			if(idNumber_regx(value)){
				$(obj).siblings('b').hide();
			}else{
				$(obj).siblings('b').show();
				$(obj).siblings('b').html("<img src='../images/error.png' alt=''>请输入正确的身份证号");
			}
		}
	}
}

/*
	点击图标进入首页
*/
function enterHomePage(){
	var url = 'index.html'
	url_location(url)
	$.cookie('num','1');
}










function productDetails(obj){
	var url = '/html/productDetails.html'
	url_location(url)
	$.cookie('num','2');
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



//logo点击事件
$(document).on('click','#register .register_header_nav .logo',function(){
	enterHomePage();
	stop_Timer();
})

$(document).on('click','#register .register_header_nav .Merchant_platform_right .SignIn_register',function(){
	signIn(this)
})

$(document).on('click','#register .register_header_nav .Merchant_platform_right .messageNum2',function(){
	signIn_out('2')
})

$(document).on('click','.information1 .essential_information .identity_type .card',function(){
	card(this)
})

$(document).on('blur','.MerchantPlatform',function(){
	MerchantPlatform(this)
})

$(document).on('blur','.MerchantPlatform1',function(){
	MerchantPlatform(this,'1')
})

$(document).on('blur','.MerchantPlatform2',function(){
	MerchantPlatform(this,'2')
})

$(document).on('click','#fileSelect',function(){
	a('fileElem')
})

$(document).on('click','#fileSelect1',function(){
	a('fileElem1')
})

$(document).on('click','#fileSelect2',function(){
	a('fileElem2')
})

$(document).on('change','#fileElem',function(){
	ShowFileName('fileElem')
})

$(document).on('change','#fileElem1',function(){
	ShowFileName('fileElem1')
})

$(document).on('change','#fileElem2',function(){
	ShowFileName('fileElem2')
})

$(document).on('click','.pic_identity_Sample',function(){
	InstanceDiagram(this)
})

$(document).on('click','.pic_identity_Template',function(){
	var url = '/downloadFile/letterTemplate.rar'
	url_location(url)
})

$(document).on('click','.information1 .Next_step .NextStep',function(){
	NextStep()
})

$(document).on('click','.information1 .Next_step .NextTime',function(){
	NextTime()
})

$(document).on('click','.information2 .launch',function(){
	launch()
})

$(document).on('blur','.information2 .determineEnterpriseInformation1',function(){
	determineEnterpriseInformation(this,'0')
})

$(document).on('blur','.information2 .determineEnterpriseInformation2',function(){
	determineEnterpriseInformation(this,'1')
})

$(document).on('blur','.information2 .determineEnterpriseInformation3',function(){
	determineEnterpriseInformation(this,'2')
})

$(document).on('blur','.information2 .determineEnterpriseInformation4',function(){
	determineEnterpriseInformation(this,'3')
})

$(document).on('click','.information2 .IDNumberSelection',function(){
	IDNumberSelection(this)
})

$(document).on('click','.information2 .Next_step .NextStep1',function(){
	NextStep1()
})

$(document).on('click','.information2 .Next_step .NextTime1',function(){
	NextTime1()
})

$(document).on('blur','.information3 .bankInformation',function(){
	bankInformation(this)
})

$(document).on('blur','.information3 .bankInformation1',function(){
	bankInformation(this,'1')
})

$(document).on('click','.information3 .Next_step .NextStep2',function(){
	NextStep2()
})

$(document).on('click','.information3 .Next_step .NextTime2',function(){
	NextTime2()
})

$(document).on('click','.companyBank_information1 .NextStep3',function(){
	NextStep3()
})

$(document).on('click','.companyBank_information2 .stop_Timer',function(){
	stop_Timer()
})

$(document).on('click','#Sample_drawing .Close',function(){
	Close()
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

$(document).on('click','.Modify_data',function(){
	Modify_data()
})

 

