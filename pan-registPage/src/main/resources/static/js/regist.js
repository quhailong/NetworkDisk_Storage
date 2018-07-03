var REGIST = {
		checkInput : function() {
			checkPhone("a");
			if($("#TANGRAM__PSP_3__phoneError").text() == ""){
				checkUsername("a");
				if($("#TANGRAM__PSP_3__userNameError").text() == ""){
					checkPassword("a");
					if($("#TANGRAM__PSP_3__passwordError").text() == ""){
						return true;
					}
				}
			}
		},
		doRegist : function() {
			var encrypt = new JSEncrypt();
			encrypt.setPublicKey($("#publicKey").val());
			var password = $("#registForm input[name='password']").val();
			var passwordEnc = encrypt.encrypt(password);
			 var user = {
				"username" : $("#registForm input[name='username']").val(),
				"password" : passwordEnc,
				"RSAKey" : $("#RSAKey").val(),
				"verifyCode" : $("#inputverifyCode").val(),
				"phoneNum" : $("#inputPhone").val(),
				"pid" : $("#pid").val()
			} 
			$.ajax({
				url : "http://passport.727pan.cn/v2/api/regphone",
				type : "post",
				data : user,
				xhrFields : {
					withCredentials : true
				},
				crossDomain : true,
				dataType : "json", //指定服务器返回的数据类型
				success : function(data) {
					if (data.respCode==1) {
						//location.href = "http://727pan.cn/disk/home";
						//window.location.reload();
					} else {
						alert(data.respMsg);
					}
				}
			});
		},
		regist : function() {
			if (this.checkInput()) {
				this.doRegist();
			}else{
				return;
			}
		}

	};
	$(function() {
		
		$("#TANGRAM__PSP_3__submit").click(function() {
			REGIST.regist();
		});
		$("#dialog").dialog({
			autoOpen : false
		});
		//打开安全认证窗口
		$("#TANGRAM__PSP_3__verifyCodeSend").click(
				function () {
					checkPhone("b");
					if (!$("#TANGRAM__PSP_3__phoneError").text() == "" || $("#inputPhone").val() == "") {
						if($("#inputPhone").val() == ""){
							$("#TANGRAM__PSP_3__phoneError").text("请输入手机号");
						}
					} else {
						$.ajax({
							url : "http://passport.727pan.cn/v2/regphonesend",
							type : "post",
							data : { "phoneNum" : $("#inputPhone").val()},
							xhrFields : {
								withCredentials : true
							},
							crossDomain : true,
							dataType : "json", //指定服务器返回的数据类型
							success : function(data) {
								if (data.respCode==1) {
									$("#vcodestr").val(data.respData);
									$("#checkImg").attr('src',getImg(data.respData));
									$("#verfiCode").val("");
									$("#TANGRAM__PSP_3__verifyCodeSEError").html("");
									$("#dialog").dialog("open");
								} else {
						$("#TANGRAM__PSP_3__verifyCodeSEError").html("验证码错误");
								}
							}
						});
						$("#dialog").dialog({
							modal : true, //遮罩效果默认是false不遮住  
							minWidth : 500
						});
					}

				});
		//校验安全验证码
		$("#regVerfiCode").click(function(){
						var VerfyCode = $("#verfiCode").val();
						var phoneNum = $("#inputPhone").val();
						var vcodestr = $("#vcodestr").val();
						$.ajax({
							url : "http://passport.727pan.cn/v2/regphonesend",
							type : "post",
							data : { "phoneNum" : phoneNum , "VerfyCode" : VerfyCode ,"vcodestr" : vcodestr},
							xhrFields : {
								withCredentials : true
							},
							crossDomain : true,
							dataType : "json", //指定服务器返回的数据类型
							success : function(data) {
								if (data.respCode==1) {
						$("#dialog").dialog("close");
									new invokeSettime("#TANGRAM__PSP_3__verifyCodeSend");
								} else {
						$("#TANGRAM__PSP_3__verifyCodeSEError").html(data.respMsg);
								}
							}
						});
		});
		//密码处理
		$("#TANGRAM__PSP_4__password").focus(function() {
			if (!$(this).hasClass("input-focus")) {
				$(this).addClass("input-focus");
				$.get("http://passport.727pan.cn/cgi/getPublickKey", function(data) {
					$("#publicKey").val(data.respMap.publicKey);
					$("#RSAKey").val(data.respMap.RSAKey);
				});
			}
		});
		$("#TANGRAM__PSP_4__password").blur(function() {
			$(this).removeClass("input-focus");
		});
		//校验表格
		$("#inputUsername").bind("blur",function(){
			checkUsername("b");
		});
		$("#inputPhone").bind("blur", function() {
			checkPhone("b");
		});
		$("#TANGRAM__PSP_4__password").bind("blur", function() {
			checkPassword("b");
		});
	});
	
	//发送验证码倒计时
	function invokeSettime(obj) {
		var countdown = 60;
		settime(obj);
		function settime(obj) {
			if (countdown == 0) {
				$(obj).attr("disabled", false);
				$(obj).val("获取验证码");
				countdown = 60;
				return;
			} else {
				$(obj).attr("disabled", true);
				$(obj).val("(" + countdown + ") s 重新发送");
				countdown--;
			}
			setTimeout(function() {
				settime(obj)
			}, 1000)
		}
	}
	function checkUsername(flag){
		if($("#registForm input[name='username']").val() != ""){
		$.ajax({
			url : "http://passport.727pan.cn/v2/regcheckusername",
			type : "post",
			data : { "username" : $("#registForm input[name='username']").val()},
			xhrFields : {
				withCredentials : true
			},
			crossDomain : true,
			dataType : "json", //指定服务器返回的数据类型
			success : function(data) {
				if (data.respCode==0) {
					$("#TANGRAM__PSP_3__userNameError").html(
							data.respMsg);
					return false;
				}else{
					$("#TANGRAM__PSP_3__userNameError").html("");
					return true;
				}
			}
		});
		}else{
			if(flag == "a"){
				$("#TANGRAM__PSP_3__userNameError").html("请输入用户名");
				return false;
			}else{
			$("#TANGRAM__PSP_3__userNameError").html("");
			return false;
			}
		}
	}
	function checkPhone(flag){
		if($("#inputPhone").val() != ""){
			$.ajax({
				url : "http://passport.727pan.cn/v2/regcheckphone",
				type : "post",
				data : { "phoneNum" : $("#inputPhone").val()},
				xhrFields : {
					withCredentials : true
				},
				crossDomain : true,
				dataType : "json", //指定服务器返回的数据类型
				success : function(data) {
					if (data.respCode==0) {
						$("#TANGRAM__PSP_3__phoneError").html(
								data.respMsg);
						return false;
					}else if(data.respCode==144){
						$("#inputPhone").val("");
						alert("该手机号已被注册，请更换");
					}
						else{
						$("#TANGRAM__PSP_3__phoneError").html("");
						return true;
					}
				}
			});	
		}else{
			if(flag == "a"){
			$("#TANGRAM__PSP_3__phoneError").html("请输入手机号");
			return false;
			}
			$("#TANGRAM__PSP_3__phoneError").html("");
			return false;
		}
		
	}
	function checkPassword(flag){
			var password = $("#registForm input[name='password']").val();
		if(password != ""){
			var encrypt = new JSEncrypt();
			encrypt.setPublicKey($("#publicKey").val());
			var passwordEnc = encrypt.encrypt(password);
			$.ajax({
				url : "http://passport.727pan.cn/cgi/regcheckpwd",
				type : "post",
				data : { "password" : passwordEnc,
					"RSAKey" : $("#RSAKey").val()},
				xhrFields : {
					withCredentials : true
				},
				crossDomain : true,
				dataType : "json", //指定服务器返回的数据类型
				success : function(data) {
					if (data.respCode==0) {
						$("#TANGRAM__PSP_3__passwordError").html(
								data.respMsg);
						return false;
					}else{
						$("#TANGRAM__PSP_3__passwordError").html("");
						return true;
					}
				}
			});	
		}else{
			if(flag == "a"){
			$("#TANGRAM__PSP_3__passwordError").html("请输入密码");
			return false;
			}
			$("#TANGRAM__PSP_3__passwordError").html("");
			return false;
		}
	}
	// 更换验证码
	function getImg(a){
		$("#checkImg").attr('src',"http://passport.727pan.cn/cgi/getVerfyImg/" + a);
	}
	function change(){
		$.ajax({
			url : "http://passport.727pan.cn/cgi/regsmscodestr",
			type : "post",
			xhrFields : {
				withCredentials : true
			},
			crossDomain : true,
			dataType : "json", //指定服务器返回的数据类型
			success : function(data) {
				if (data.respCode==1) {
					$("#vcodestr").val(data.respData);
					$("#checkImg").attr('src',getImg(data.respData));
				} else {
		alert("服务器错误");
				}
			}
		});
	}