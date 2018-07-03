	var historyMap = new Map();
	var finishMap = new Map();
	var folderMap = new Map();
	
	function flashContent(){
		$(".vdAfKMb").empty();
		historyMap.clear();
		finishMap.clear();
		history.pushState(null, "", location.href);
		if(location.href.indexOf("search?key=")!=-1){
			loadContent2(decodeURI(location.href.split("search?key=")[1]));
		}else{
			loadContent();
		}
	}
	function exit() {
		$('#my-confirm').modal({
			closeViaDimmer : 0,
			onConfirm : function(options) {
				$.ajax({
					url : "http://passport.727pan.cn/v2/api/logout",
					type : "post",
					data : {
						"token" : $.cookie('token')
					},
					xhrFields : {
						withCredentials : true
					},
					crossDomain : true,
					dataType : "json", //指定服务器返回的数据类型
					success : function(data) {
						if (data.respCode == 1) {
							location.href = "http://727pan.cn/";
						} else {
							alert(data.respMsg);
						}
					}
				});
			},
			// closeOnConfirm: false,
			onCancel : function() {
			}
		});
	}
	function changePwd(){
		var $promt = $('#changePwd').modal({
			  closeViaDimmer : 0,
			  onConfirm : function(options) {
				  var newPassword = $("input[name='newPassword']").val();
				  var repeatPassword = $("input[name='repeatPassword']").val();
				  if(newPassword!="" && newPassword == repeatPassword){
					  var encrypt = new JSEncrypt();
						encrypt.setPublicKey($("#publicKey").val());
						var passwordEnc = encrypt.encrypt(newPassword);
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
									$(".am-modal-prompt-input").val("");
									alert(data.respMsg);
								}else{
									$.ajax({
										  url : "http://passport.727pan.cn/v2/api/changePwd",
										  type : "post",
										  data : {
											  "token" : $.cookie('token'),
											  "newPassword" : passwordEnc,
											  "uid" : $.cookie('uid'),
											  "RSAKey" : $("#RSAKey").val()
										  },
										  xhrFields : {
											  withCredentials : true
										  },
										  crossDomain : true,
										  dataType : "json", //指定服务器返回的数据类型
										  success : function(data) {
											  if(data.dataCode == 200){
												  alert("修改成功");
												  location.href = "http://727pan.cn/";
											  }
										  },
										  error:function(){
											  alert("服务器错误");
										  }
									  });
								}
							}
						});	
				  }
				  
			  },
			  onCancel : function() {
				  $(".am-modal-prompt-input").val("");
				  $('#changePwd').modal('close');
			  }
		  });
		$promt.find('[data-am-modal-cancel]').off('click.close.modal.amui');
		$promt.find('[data-am-modal-confirm]').off('click.close.modal.amui');
	}
	function getFileUrl(sourceId) {  
        var url;  
        if (navigator.userAgent.indexOf("MSIE")>=1) { // IE  
            url = document.getElementById(sourceId).value;  
        } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox  
            url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));  
        } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome  
            url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));  
        }  
        return url;  
    }  
	function preImg(sourceId, targetId) { 
		$("#photo").css('display','inline-block');
        var url = getFileUrl(sourceId);   
        var imgPre = document.getElementById(targetId);   
        imgPre.src = url;   
    }   
	function uploadPic(){
		$("#photo").css('display','none');
		var $promt = $('#uploadPic').modal({
			  closeViaDimmer : 0,
			  onConfirm : function(options) {
				  var file = $('#pic').get(0).files[0];
				  var fileSize = file.size;           //获取上传的文件大小  
				  var maxSize = 1048576;
				  var ext = file.name.substring(file.name.lastIndexOf('.')+1, file.name.length).toUpperCase();
				  if(ext !='PNG' && ext !='GIF' && ext !='JPG' && ext !='JPEG' && ext !='BMP'){
					  alert('文件类型错误,请上传图片类型');  
				        return false; 
				  }else if(parseInt(fileSize) >= parseInt(maxSize)){
					  alert('上传的文件不能超过1MB');  
				        return false;
				  }else{
					  var imgData = new FormData(); 
					  imgData.append('token',$.cookie('token'));
					  imgData.append('uid',$.cookie('uid'));
					  imgData.append('file', file);
					  $.ajax({
						  url : "http://passport.727pan.cn/v2/api/uploadPic",
						  type : "post",
						  contentType: false,
						  data : imgData,
						  cache: false,    
				            processData: false,
						  xhrFields : {
							  withCredentials : true
						  },
						  crossDomain : true,
						  dataType : "json", //指定服务器返回的数据类型
						  success : function(data) {
							  if(data.dataCode == 200){
								  alert("上传成功");
								  loadImg();
								  $('#uploadPic').modal('close');
							  }else{
								  alert("服务器错误");
							  }
						  },
						  error:function(){
							  alert("服务器错误");
						  }
					  }); 
				  }
			  },
			  onCancel : function() {
				  $(".am-modal-prompt-input").val("");
				  $('#uploadPic').modal('close');
			  }
		  });
		$promt.find('[data-am-modal-cancel]').off('click.close.modal.amui');
		$promt.find('[data-am-modal-confirm]').off('click.close.modal.amui');
	}
	function loadImg(){
		$.ajax({
			  url : "http://passport.727pan.cn/v2/api/loadImg",
			  type : "post",
			  data : {
				  "token" : $.cookie('token'),
				  "uid" : $.cookie('uid')
			  },
			  xhrFields : {
				  withCredentials : true
			  },
			  crossDomain : true,
			  dataType : "json", //指定服务器返回的数据类型
			  success : function(data) {
				  $(".user-photo").css("background-image","url(http://ss0.727pan.cn/" + data.respData + ")");
			  },
			  error:function(){
				 // alert("服务器错误");
			  }
		  }); 
	}
	function loadFolder(parentPath,obj){
		var folderContent = folderMap.get(parentPath);
		if(folderContent == null){
			$.ajax({
				url : "http://core.727pan.cn/api/folderList",
				type : "post",
				data : {
					"token" : $.cookie('token'),
					"parentPath" : parentPath,
				},
				xhrFields : {
					withCredentials : true
				},
				crossDomain : true,
				dataType : "json", //指定服务器返回的数据类型
				success : function(data) {
					var content = data.respMap;
					folderMap.set(parentPath,content);
					if(parentPath == "/"){
						showFolder(content,$(".treeview-root"));
					}else{
						showFolder(content,obj);
					}
				}
			});
		}else{
			if(parentPath == "/"){
				showFolder(folderContent,$(".treeview-root"));
			}else{
				showFolder(folderContent,obj);
			}
		}
	}
	function showFolder(content,obj){
		for(var key in content) {
			var contentVal = eval($.parseJSON(content[key]));
			if(contentVal.dir_empty == 0){
				obj.siblings('ul').append("<li><div class='treeview-node treenode-empty' data-padding-left='" + (parseInt(obj.attr('data-padding-left'))+15) + "' style='padding-left:" + (parseInt(obj.attr('data-padding-left'))+15) + "px'><span class='treeview-node-handler'><em class='b-in-blk plus icon-operate '></em><dfn class='b-in-blk treeview-ic treeview-dir'></dfn><span class='treeview-txt' data-file-path='" + contentVal.path + "'>" + contentVal.path.substring(contentVal.path.lastIndexOf("/")+1,contentVal.path.length) + "</span></span></div><ul class='treeview  treeview-content treeview-collapse' data-padding-left='30px'></ul></li>");
			}else{
				obj.siblings('ul').append("<li><div class='treeview-node' data-padding-left='" + (parseInt(obj.attr('data-padding-left'))+15) + "' style='padding-left:" + (parseInt(obj.attr('data-padding-left'))+15) + "px'><span class='treeview-node-handler'><em class='b-in-blk plus icon-operate '></em><dfn class='b-in-blk treeview-ic treeview-dir'></dfn><span class='treeview-txt' data-file-path='" + contentVal.path + "'>" + contentVal.path.substring(contentVal.path.lastIndexOf("/")+1,contentVal.path.length) + "</span></span></div><ul class='treeview  treeview-content treeview-collapse' data-padding-left='30px'></ul></li>");
			}
		}
		$(".treeview-node").unbind();
		$(".treeview-node").live('mouseenter',function(){
			$(this).addClass("treeview-node-hover");
		});
		$(".treeview-node").live('mouseleave',function(){
			$(this).removeClass("treeview-node-hover");
		});
		$(".treeview-node").bind('click',function(e){
			if(!$(this).hasClass("treeview-node-on") && !$(this).hasClass('treenode-empty')){
				$('.treeview-node').removeClass('treeview-node-on');
				$(this).addClass("treeview-node-on");
				if(!$(this).siblings('ul').hasClass('treeview-collapse')){
					
				}else{
					$(this).addClass('_minus');
					$(this).children('span').children('em').addClass('minus');
				}
				if($(this).siblings('ul').text()=="" && !$(this).hasClass('treenode-empty')){
					loadFolder($(this).children('span').children('span').attr('data-file-path'),$(this));
				}else{
					$(this).children('span').children('em').addClass('minus');
					$(this).siblings('ul').removeClass('treeview-collapse');
				}
				$(this).siblings('ul').removeClass('treeview-collapse');
				
			}else if(!$(this).hasClass('treenode-empty')){
				if($(this).siblings('ul').hasClass('treeview-collapse')){
					$(this).addClass('_minus');
					$(this).siblings('ul').removeClass('treeview-collapse')
					$(this).children('span').children('em').addClass('minus');
				}else{
					$(this).removeClass('_minus');
					$(this).siblings('ul').addClass('treeview-collapse')
					$(this).children('span').children('em').removeClass('minus');
				}
			}else{
				$('.treeview-node').removeClass('treeview-node-on');
				$(this).addClass("treeview-node-on");
			}
		});
	}
	function save(ShareId,dest){
		$.ajax({
			url : "http://core.727pan.cn/api/checkLock",
			type : "post",
			data : {
				"token" : $.cookie('token'),
				"shareId": ShareId,
			},
			xhrFields : {
				withCredentials : true
			},
			crossDomain : true,
			dataType : "json", //指定服务器返回的数据类型
			success : function(data) {
				if(data.respCode != 0){
					if(data.respData == "Lock"){
						$('#Lock').modal({
							closeViaDimmer : 0,
						      onConfirm: function(e) {
						    	  var lockPassword = $("input[name='LockPassword']").val();
						    	  $.ajax({
						  			url : "http://core.727pan.cn/api/verifykLock",
						  			type : "post",
						  			data : {
						  				"token" : $.cookie('token'),
						  				"shareId": ShareId,
						  				"lockPassword" : lockPassword
						  			},
						  			xhrFields : {
						  				withCredentials : true
						  			},
						  			crossDomain : true,
						  			dataType : "json", //指定服务器返回的数据类型
						  			success : function(data) {
						  				if(data.respData == "200"){
						  					saveShare(ShareId,dest,lockPassword);
						  				}else{
						  					alert("验证失败");
						  					$("input[name='LockPassword']").val("");
						  				}
						  			},
						  			error:function(){
						  				$("input[name='LockPassword']").val("");
						  				alert("服务器错误，操作失败");
						              }
						  		});
						      },
						      onCancel: function(e) {
						      }
						    });
					}else{
						saveShare(ShareId,dest,"");
					}
				}else{
					$("input[name='LockPassword']").val("");
					alert("参数不正确");
				}
			},
			error:function(){
				$("input[name='LockPassword']").val("");
				alert("服务器错误，操作失败");
            }
		});
		
		
	}
	function saveShare(ShareId,dest,lockPassword){
			$.ajax({
			url : "http://core.727pan.cn/api/saveShare",
			type : "post",
			data : {
				"token" : $.cookie('token'),
				"shareId": ShareId,
				"dest" : dest,
				"lockPassword" : lockPassword
			},
			xhrFields : {
				withCredentials : true
			},
			crossDomain : true,
			dataType : "json", //指定服务器返回的数据类型
			success : function(data) {
				if(data.respCode == 1){
					alert("保存成功");
					$("input[name='LockPassword']").val("");
					 $("#fileTreeDialog").css("display","none");
					 $(".module-canvas").css("display","none");
				}else{
					$("input[name='LockPassword']").val("");
					alert(data.respMsg);
				}
			},
			error:function(){
				$("input[name='LockPassword']").val("");
				alert("服务器错误，操作失败");
	        }
		});
	}