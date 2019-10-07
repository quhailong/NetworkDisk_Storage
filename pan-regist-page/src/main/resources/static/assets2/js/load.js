$(document).ready(
			function() {
				//添加链接的处理事件
				$(".module-aside li").click(ajax);
				$(".FuIxtL a").live("click",abced);
				$(window).on("popstate", function() {
					changeContent();
				});
				loadImg();
				changeContent();
				//全选
				$(".fydGNC").click(function(event) {
					event.stopPropagation();
					if ($(this).parent().hasClass('EzubGg')) {
						$(this).parent().removeClass('EzubGg');
						$(".vdAfKMb").find('dd').removeClass('anW01r');
						$(".QxJxtg").removeClass('cazEfA');
						$(".tcuLAu").css("display","inline-block");
						$(".QDDOQB").css("display","none");
					} else {
						$(this).parent().addClass('EzubGg');
						$(".vdAfKMb").find('dd').addClass('anW01r');
						$(".QxJxtg").addClass('cazEfA');
						$(".tcuLAu").css("display","none");
						$(".QDDOQB").css("display","inline-block");
					}
					count();
				});
				$('button').data("data-button-id", "b9").mouseenter(function() {
					$(this).parent().addClass("button-open");
				});
				$('button').data("data-button-id", "b9").mouseleave(function() {
					setTimeout(function() {
						if ($(".menu").hasClass('abdd')) {
						} else {
							$(".menu").parent().removeClass("button-open");
						}
					}, 200);
				});
				$(".menu").mouseover(function() {
					$(this).addClass('abdd');
				});
				$(".menu").mouseleave(function() {
					$(this).removeClass('abdd');
					$(this).parent().removeClass("button-open");
				});

				$(".DIcOFyb").mouseenter(function() {
					$(".DIcOFyb").addClass('mouseon');
				});
				$(".DIcOFyb").mouseleave(function() {
					setTimeout(function() {
						if ($(".PvsOgyb").hasClass('abd')) {
						} else {
							$(".DIcOFyb").removeClass('mouseon');
						}
					}, 200);
				});
				$(".PvsOgyb").mouseover(function() {
					$(".PvsOgyb").addClass('abd');
				});
				$(".PvsOgyb").mouseleave(function() {
					$(".PvsOgyb").removeClass('abd');
					$(".DIcOFyb").removeClass('mouseon'); // 添加当前元素的样式
				});
				$("[class='dialog-icon dialog-min icon icon-minimize']").click(
						function() {
							$(".dialog-body").css("display", "none");
							$(".dialog-header").css("display", "none");
							$(".dialog-min-header").css("display", "block");
						});
				$("[class='dialog-icon dialog-back icon icon-maximizing']")
						.click(function() {
							$(".dialog-body").css("display", "block");
							$(".dialog-header").css("display", "block");
							$(".dialog-min-header").css("display", "none");
						});
				$("[class='dialog-icon dialog-close icon icon-close']").click(
						function() {
							$('#uploaderList').children().remove();
							$("#web-uploader").css("display", "none");
						});
				$('#up').html5uploader({

					auto : true,

					multi : true,

					removeTimeout : 999999999,

					url : 'http://139.199.116.162:8083/rest/uploadFile',

					onUploadStart : function() {
						$("#web-uploader").css("display", "block");
					},

					onInit : function() {
					},
					onUploadComplete : function() {
					}

				});
				// 创建文件夹按钮
				$("#createDirButton").click(function(){
					$("#changeBd1").empty();
					$("#changeBd1").prepend("请输入文件夹名称<input id='GHJDI1' type='text' class='am-modal-prompt-input'>");
					$('#my-prompt1').modal({
						closeViaDimmer : 0,
					      onConfirm: function(e) {
					    	 var inputText =  $("#GHJDI1").val();
					    if(inputText.length < 20 && inputText.match(/^[a-zA-Z0-9\u4e00-\u9fa5_]+$/) != null){
					    	  $.ajax({
									url : "http://localhost:9006/api/createDir",
									type : "post",
									data : {
										"token" : $.cookie('token'),
										"dirName" : inputText,
										"parentPath" : location.href.split("path=")[1]
									},
									xhrFields : {
										withCredentials : true
									},
									crossDomain : true,
									dataType : "json", //指定服务器返回的数据类型
									success : function(data) {
										if(data.respData == "200"){
											flashContent();
											$(".QxJxtg").removeClass('cazEfA');
										}else{
											alert("创建文件夹出现问题，创建失败");
										}
										$(".am-modal-prompt-input").val("");
									},
									error:function(){
					                    alert("服务器错误，创建文件夹失败");
					                    $(".am-modal-prompt-input").val("");
					                }
								});
							    }else{
							    	alert("文件夹长度必须小于20，并且不能包含特殊字符，只能为数字、字母、中文、下划线");
							    	$(".am-modal-prompt-input").val("");
							    }
					      },
					      onCancel: function(e) {
					    	  $(".am-modal-prompt-input").val("");
					      }
					    });
				});
				// 重命名按钮
				$("#rename").click(function(){
					var chooseNum = $(".anW01r").attr('_position');
					$("#changeBd").empty();
					$("#changeBd").prepend("请输入文件名称<input id='GHJDI' type='text' class='am-modal-prompt-input'>");
					var content = historyMap.get(location.href);
					var vid = eval($.parseJSON(content[chooseNum])).vid;
					var fileType = eval($.parseJSON(content[chooseNum])).addrtype;
					if(fileType!=0){
						$("#renameInput").val(eval($.parseJSON(content[chooseNum])).filename.substring(0,eval($.parseJSON(content[chooseNum])).filename.lastIndexOf(".")));
					}else{
						$("#renameInput").val(eval($.parseJSON(content[chooseNum])).filename);
					}
					$('#my-prompt').modal({
						closeViaDimmer : 0,
					      onConfirm: function(e) {
					    	  var chooseNum = $(".anW01r").attr('_position');
					    	  var inputText =  $("#GHJDI").val();
					    	  var content = historyMap.get(location.href);
							  var vid = eval($.parseJSON(content[chooseNum])).vid;
							  var fileType = eval($.parseJSON(content[chooseNum])).addrtype;
					    	  if(inputText == eval($.parseJSON(content[chooseNum])).filename.substring(0,eval($.parseJSON(content[chooseNum])).filename.lastIndexOf(".")) && fileType!=0 || inputText == eval($.parseJSON(content[chooseNum])).filename && fileType==0){
					    	  }else{
					    		  if(inputText.length < 50 && inputText.match(/^[a-zA-Z0-9\u4e00-\u9fa5_()]+$/) != null){
					    			  $.ajax({
					    				  url : "http://localhost:9006/api/rename",
					    				  type : "post",
					    				  data : {
					    					  "token" : $.cookie('token'),
					    					  "newName" : inputText,
					    					  "parentPath" : location.href.split("path=")[1],
					    					  "vid" : vid
					    				  },
					    				  xhrFields : {
					    					  withCredentials : true
					    				  },
					    				  crossDomain : true,
					    				  dataType : "json", //指定服务器返回的数据类型
					    				  success : function(data) {
					    					  if(data.respCode == 203){
					    						  $('#my-confirm1').modal({
					    							  closeViaDimmer : 0,
					    							  onConfirm : function(options) {
					    								  $.ajax({
					    									  url : "http://localhost:9006/api/rename",
					    									  type : "post",
					    									  data : {
					    										  "token" : $.cookie('token'),
					    										  "newName" : inputText,
					    										  "vid" : vid,
					    										  "flag" : "force"
					    									  },
					    									  xhrFields : {
					    										  withCredentials : true
					    									  },
					    									  crossDomain : true,
					    									  dataType : "json", //指定服务器返回的数据类型
					    									  success : function(data) {
					    										  if(data.respCode == 200){
					    											  alert("修改成功");
					    											  flashContent();
					    											  $(".QxJxtg").removeClass('cazEfA');
					    											  $(".tcuLAu").css("display","inline-block");
					    											  $(".QDDOQB").css("display","none");
					    										  }
					    									  },
					    									  error:function(){
					    										  alert("服务器错误，重命名失败");
					    										  $(".am-modal-prompt-input").val("");
					    									  }
					    								  });
					    							  },
					    							  onCancel : function() {
					    							  }
					    						  });
					    					  }else if(data.respCode == 200){
					    						  alert("修改成功");
					    						  flashContent();
					    						  $(".QxJxtg").removeClass('cazEfA');
					    						  $(".tcuLAu").css("display","inline-block");
    											  $(".QDDOQB").css("display","none");
					    					  }else{
					    						  alert("修改文件名出现问题，操作失败");
					    					  }
					    					  $(".am-modal-prompt-input").val("");
					    				  },
					    				  error:function(){
					    					  alert("服务器错误，重命名失败");
					    					  $(".am-modal-prompt-input").val("");
					    				  }
					    			  });
					    		  }else{
					    			  alert("文件名长度必须小于50，并且不能包含特殊字符，只能为数字、字母、中文、下划线、括号");
					    			  $(".am-modal-prompt-input").val("");
					    		  }
					    	  }
					      },
					      onCancel: function(e) {
					    	  $(".am-modal-prompt-input").val("");
					      }
					    });
				});
			        var range = 900;             //距下边界长度/单位px  
			        $(".NHcGw").scroll(function(){
			            var srollPos = $(".NHcGw").scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)  
			            var srollLow = $(".vdAfKMb").height()-srollPos-$(".NHcGw").height();
			            var symbol = $(".FcucHsb").text();
			            if(srollLow <= range && symbol.indexOf("已加载")>=0) {
			            	$(".FcucHsb").html("获取更多数据...");
			            	if(location.href.indexOf("search?key=")!=-1){
			            		loadContent3(decodeURI(location.href.split("search?key=")[1]),symbol.replace(/[^0-9]/ig,"")/100 +1);
			            	}else{
			            		loadContent1(symbol.replace(/[^0-9]/ig,"")/100 +1);
			            	}
			            }  
			        });
			        $("#copy").click(function(){
						$("#HEEWq").html("复制到");
						$(".treeview-root").siblings('ul').empty();
						$("a[data-button-id='b79']").attr('id',"copyOK");
						if($(".treeview-root").siblings('ul').text()==""){
							loadFolder("/");
						}
						$(".module-canvas").css("display","inline-block");
						$("#fileTreeDialog").css("display","inline-block");
					});
					$("#move").click(function(){
						$("#HEEWq").html("移动到");
						$(".treeview-root").siblings('ul').empty();
						$("a[data-button-id='b79']").attr('id',"moveOK");
						if($(".treeview-root").siblings('ul').text()==""){
							loadFolder("/");
						}
						$(".module-canvas").css("display","inline-block");
						$("#fileTreeDialog").css("display","inline-block");
					});
					$(".dialog-control").click(function(){
						$(".module-canvas").css("display","none");
						$("#fileTreeDialog").css("display","none");
						$("div[class='dialog dialog-share   dialog-gray']").css("display","none");
						$(".create-link").removeClass("private-link has-create");
						$(".create-link").removeClass("public-link has-create");
						 $("#createShare").css("display","block");
						 $("#cel").children("span").children("span").html("取消");
					});
					$("#cel").click(function(){
						$(".module-canvas").css("display","none");
						$("div[class='dialog dialog-share   dialog-gray']").css("display","none");
						$(".create-link").removeClass("private-link has-create");
						$(".create-link").removeClass("public-link has-create");
						 $("#createShare").css("display","block");
						 $("#cel").children("span").children("span").html("取消");
					});
					$("a[data-button-id='b77']").click(function(){
						$(".module-canvas").css("display","none");
						$("#fileTreeDialog").css("display","none");
					});
					$("a[data-button-id='b79']").click(function(){
						var chooseNum = new Array();
						$(".anW01r").each(function(){
							chooseNum.push($(this).attr('_position'));
						});
						copyAndMove($(this).attr('id'),chooseNum,$(".treeview-node-on").children("span").children("span").attr("data-file-path"));
					});
					$("#copyShare").click(function(){
						if($("#flaga").hasClass("public-link")){
							var Url2=document.getElementById("share-url");
							Url2.select(); // 选择对象
							document.execCommand("Copy"); // 执行浏览器复制命令
							alert("已复制好，可贴粘。");
						}else{
							var Url1=document.getElementById("copyPrivate");
							Url1.select(); // 选择对象
							document.execCommand("Copy"); // 执行浏览器复制命令
							alert("已复制好，可贴粘。");
						}
					});
					$("#del").click(function(){
						$('#my-confirm2').modal({
							  closeViaDimmer : 0,
							  onConfirm : function(options) {
								  var chooseNum = new Array();
									$(".anW01r").each(function(){
										chooseNum.push($(this).attr('_position'));
									});
									var content = historyMap.get(location.href);
									var vids = new Array();
									for(var index in chooseNum) {
										var contentVal = eval($.parseJSON(content[chooseNum[index]]));
										vids.push(contentVal.vid);
									}
								  $.ajax({
									  url : "http://localhost:9006/api/del",
									  type : "post",
									  data : {
										  "token" : $.cookie('token'),
										  "vids" : JSON.stringify(vids)
									  },
									  xhrFields : {
										  withCredentials : true
									  },
									  crossDomain : true,
									  dataType : "json", //指定服务器返回的数据类型
									  success : function(data) {
										  if(data.dataCode == 200){
											  alert("删除成功");
											  flashContent();
											  $(".QxJxtg").removeClass('cazEfA');
											  $(".tcuLAu").css("display","inline-block");
												$(".QDDOQB").css("display","none");
										  }
									  },
									  error:function(){
										  alert("服务器错误，删除失败");
									  }
								  });
							  },
							  onCancel : function() {
							  }
						  });
					});
					// 搜索
					$(".am-icon-search").click(function(){
						var key =  $.trim($(".xdeE2Ga").val());
						if(key!=""){
							var query = location.href.split("#/")[0];
							history.pushState(null, "", query + "#/search?key=" + key);
							ajax2(key);
						}
					});
					// 下载
					$("#download").click(function(){
						var chooseNum = new Array();
						$(".anW01r").each(function(){
							chooseNum.push($(this).attr('_position'));
						});
						download(chooseNum);
					});
					$("#newPassword").focus(function() {
						if (!$(this).hasClass("input-focus")) {
							$(this).addClass("input-focus");
							$.get("http://localhost:9005/cgi/getPublickKey", function(data) {
								$("#publicKey").val(data.respMap.publicKey);
								$("#RSAKey").val(data.respMap.RSAKey);
							});
						}
					});
					$("#newPassword").blur(function() {
						$(this).removeClass("input-focus");
					});
					$("#share").click(function(){
						var fileName = eval($.parseJSON(historyMap.get(location.href)[$(".anW01r").attr('_position')])).filename;
						if($(".anW01r").length>1){
							$("#shareTxt").html("分享文件：" + fileName + "等");
						}else{
							$("#shareTxt").html("分享文件：" + fileName);
						}
						$("div[class='dialog dialog-share   dialog-gray']").css("display","block");
						$(".module-canvas").css("display","inline-block");
					});
					$("#createShare").click(function(){
						var chooseNum = new Array();
						$(".anW01r").each(function(){
							chooseNum.push($(this).attr('_position'));
						});
						createShare(chooseNum);
					});
					$("#sharePage").click(function(){
						location.href = "http://localhost:8082/share/manage";
					});
			});