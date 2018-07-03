	var historyMap = new Map();
	var finishMap = new Map();
	function ajax() {
		var barValue = $(this).data("key");
			if (barValue == "all") {
				location.href = "http://localhost:8082/"+ "#/" + barValue + "?path=/";
			} else if(barValue == "myShare"){
				location.href = "http://localhost:8082/share/manage";
			}else{
				location.href = "http://localhost:8082/"+ "#/" + barValue;
			}
	}
	function init(){
		$("#shareName").bind("click",function() {
			$(this).siblings('li').removeClass('MCGAxG JFaAINb');
			if ($(this).hasClass('MCGAxG')) {
				$(this).removeClass('MCGAxG');
				$(this).addClass('JFaAINb');
				loadContent();
			} else {
				$(this).removeClass('JFaAINb');
				$(this).addClass('MCGAxG');
				loadContent();
			}
		});
		$("#vTime").bind("click",function() {
			$(this).siblings('li').removeClass('MCGAxG JFaAINb');
			if ($(this).hasClass('MCGAxG')) {
				$(this).removeClass('MCGAxG');
				$(this).addClass('JFaAINb');
				loadContent();
			} else {
				$(this).removeClass('JFaAINb');
				$(this).addClass('MCGAxG');
				loadContent();
			}
		});
		$("#sTime").bind("click",function() {
			$(this).siblings('li').removeClass('MCGAxG JFaAINb');
			if ($(this).hasClass('MCGAxG')) {
				$(this).removeClass('MCGAxG');
				$(this).addClass('JFaAINb');
				loadContent();
			} else {
				$(this).removeClass('JFaAINb');
				$(this).addClass('MCGAxG');
				loadContent();
			}
		});
		$("#dTime").bind("click",function() {
			$(this).siblings('li').removeClass('MCGAxG JFaAINb');
			if ($(this).hasClass('MCGAxG')) {
				$(this).removeClass('MCGAxG');
				$(this).addClass('JFaAINb');
				loadContent();
			} else {
				$(this).removeClass('JFaAINb');
				$(this).addClass('MCGAxG');
				loadContent();
			}
		});
		$("#shareTime").bind("click",function() {
			$(this).siblings('li').removeClass('MCGAxG JFaAINb');
			if ($(this).hasClass('MCGAxG')) {
				$(this).removeClass('MCGAxG');
				$(this).addClass('JFaAINb');
				loadContent();
			} else {
				$(this).removeClass('JFaAINb');
				$(this).addClass('MCGAxG');
				loadContent();
			}
		});
		$("#expiration").bind("click",function() {
			$(this).siblings('li').removeClass('MCGAxG JFaAINb');
			if ($(this).hasClass('MCGAxG')) {
				$(this).removeClass('MCGAxG');
				$(this).addClass('JFaAINb');
				loadContent();
			} else {
				$(this).removeClass('JFaAINb');
				$(this).addClass('MCGAxG');
				loadContent();
			}
		});
	}
	function loadContent(){
		$("div[class='list bEMOyf']").empty();
		var order = "";
		var desc = 1 ;
		if($("#shareName").hasClass("MCGAxG")){
			order = "theme";
			desc = 1 ;
		}
		if($("#shareName").hasClass("JFaAINb")){
			order = "theme";
			desc = 0 ;
		}
		if($("#vTime").hasClass("MCGAxG")){
			order = "visitTime";
			desc = 1 ;
		}
		if($("#vTime").hasClass("JFaAINb")){
			order = "visitTime";
			desc = 0 ;
		}
		if($("#sTime").hasClass("MCGAxG")){
			order = "saveTime";
			desc = 1 ;
		}
		if($("#sTime").hasClass("JFaAINb")){
			order = "saveTime";
			desc = 0 ;
		}
		if($("#dTime").hasClass("MCGAxG")){
			order = "downloadTime";
			desc = 1 ;
		}
		if($("#dTime").hasClass("JFaAINb")){
			order = "downloadTime";
			desc = 0 ;
		}
		if($("#shareTime").hasClass("MCGAxG")){
			order = "createtime";
			desc = 1 ;
		}
		if($("#shareTime").hasClass("JFaAINb")){
			order = "createtime";
			desc = 0 ;
		}
		if($("#expiration").hasClass("MCGAxG")){
			order = "expiration";
			desc = 1 ;
		}
		if($("#expiration").hasClass("JFaAINb")){
			order = "expiration";
			desc = 0 ;
		}
		$.ajax({
			url : "http://localhost:9006/api/shareList",
			type : "post",
			data : {
				"token" : $.cookie('token'),
				"page" : 1,
				"order" : order,
				"desc" : desc
			},
			xhrFields : {
				withCredentials : true
			},
			crossDomain : true,
			dataType : "json", //指定服务器返回的数据类型
			success : function(data) {
				historyMap.set(location.href, data.respMap);
				showContent(data.respMap);
			}
		});
	}
	function loadContent1(page){
		var order = "";
		var desc = 1 ;
		if($("#shareName").hasClass("MCGAxG")){
			order = "theme";
			desc = 1 ;
		}
		if($("#shareName").hasClass("JFaAINb")){
			order = "theme";
			desc = 0 ;
		}
		if($("#vTime").hasClass("MCGAxG")){
			order = "visitTime";
			desc = 1 ;
		}
		if($("#vTime").hasClass("JFaAINb")){
			order = "visitTime";
			desc = 0 ;
		}
		if($("#sTime").hasClass("MCGAxG")){
			order = "saveTime";
			desc = 1 ;
		}
		if($("#sTime").hasClass("JFaAINb")){
			order = "saveTime";
			desc = 0 ;
		}
		if($("#dTime").hasClass("MCGAxG")){
			order = "downloadTime";
			desc = 1 ;
		}
		if($("#dTime").hasClass("JFaAINb")){
			order = "downloadTime";
			desc = 0 ;
		}
		if($("#shareTime").hasClass("MCGAxG")){
			order = "createtime";
			desc = 1 ;
		}
		if($("#shareTime").hasClass("JFaAINb")){
			order = "createtime";
			desc = 0 ;
		}
		if($("#expiration").hasClass("MCGAxG")){
			order = "expiration";
			desc = 1 ;
		}
		if($("#expiration").hasClass("JFaAINb")){
			order = "expiration";
			desc = 0 ;
		}
		$.ajax({
			url : "http://localhost:9006/api/shareList",
			type : "post",
			data : {
				"token" : $.cookie('token'),
				"page" : page,
				"order" : order,
				"desc" : desc
			},
			xhrFields : {
				withCredentials : true
			},
			crossDomain : true,
			dataType : "json", //指定服务器返回的数据类型
			success : function(data) {
				showContent1(data.respMap,page);
			}
		});
	}
	function showContent(content){
		for(var key in content) {
			var contentVal = eval($.parseJSON(content[key]));
				if(contentVal.createtime!=null){
				var mm = new Date(contentVal.createtime);
				var date = mm.getFullYear()
                + "-"// "年"
                + ((mm.getMonth() + 1) > 10 ? (mm.getMonth() + 1) : "0"
                        + (mm.getMonth() + 1))
                + "-"// "月"
                + (mm.getDate() < 10 ? "0" + mm.getDate() : mm
                        .getDate()) + " " +  (mm.getHours() < 10 ? "0" + mm.getHours() : mm
                                .getHours())
                                + ":"
                                + (mm.getMinutes() < 10 ? "0" + mm.getMinutes() : mm
                                        .getMinutes());
				}else{
					var date = "-"
				}
				var ext = contentVal.theme.substring(contentVal.theme.lastIndexOf(".") + 1,contentVal.theme.length);
				if(contentVal.expiration > 4682671273999){
					var expiration = "永久有效";
				}else {
					var startTime = new Date().getTime();
					var chazhi = contentVal.expiration - startTime;
					if(chazhi>0){
						var chazhiSS =Math.floor(parseInt(chazhi) / 1000 );
						var chazhiMM =Math.floor(parseInt(chazhi) / 1000 / 60);
						var chazhiHour =Math.floor(parseInt(chazhi) / 1000 / 60 /60);
						var chazhiDay = Math.floor(parseInt(chazhi) / 1000 / 60/ 60 / 24);
						if(chazhiDay > 1){
							var expiration =chazhiDay + "天后";
						}else if(chazhiHour > 1){
							var expiration =chazhiHour + "小时后";
						}else if(chazhiMM>1 ){
							var expiration =chazhiMM + "分钟后";
						}else{
							var expiration =chazhiSS + "秒后";
						}
					}else{
						var expiration ="已失效";
					}
				}
				if(contentVal.islock == 1 && contentVal.multi == 0){
					if(ext == "zip" || ext == "rar"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-zip'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "torrent"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-bt'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "mp4" || ext == "avi" || ext == "rmvb" || ext == "mpeg" || ext == "wmv"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-video'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "mp3"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-mp3'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "jpg" || ext == "jpeg" || ext == "gif"){
						$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-pic'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "txt"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-txt'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "doc" || ext == "docx"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-doc'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "ppt" || ext == "pptx"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-ppt'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "pdf"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-pdf'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else{
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM default-small'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}
				}else if(contentVal.islock == 0 && contentVal.multi == 0){
					if(ext == "zip" || ext == "rar"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-zip'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "torrent"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-bt'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "mp4" || ext == "avi" || ext == "rmvb" || ext == "mpeg" || ext == "wmv"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-video'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "mp3"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-mp3'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "jpg" || ext == "jpeg" || ext == "gif"){
						$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-pic'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "txt"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-txt'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "doc" || ext == "docx"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-doc'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "ppt" || ext == "pptx"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-ppt'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "pdf"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-pdf'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else{
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM default-small'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text' value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}
				}else if(contentVal.islock == 1 && contentVal.multi == 1){
					$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='aaa mulit-icon'></div><div node-type='name' class='name' title='" + contentVal.theme + "等'><span class='name-text-wrapper'><span title='" + contentVal.theme + "等' data-name='" + contentVal.theme + "等' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "等</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
				}else if(contentVal.islock == 0 && contentVal.multi == 1){
					$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='aaa mulit-icon'></div><div node-type='name' class='name' title='" + contentVal.theme + "等'><span class='name-text-wrapper'><span title='" + contentVal.theme + "等' data-name='" + contentVal.theme + "等' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "等</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
				}
            }
		if(eval($.parseJSON(content[key])) != null){
			if((parseInt(key)+1)%100 != 0){
					$(".loaded").html("已全部加载，共" + (parseInt(key)+1) + "个");
			}else{
				if(finishMap.get(location.href)!=null){
					$(".loaded").html(finishMap.get(location.href));
				}else{
					$(".loaded").html("已加载" + (parseInt(key)+1) + "个");
				}
			}
		}else{
				$(".loaded").html("已全部加载，共0个");
		}
		$(".item").on({  
             mouseover : function(){  
            	 if(!$(this).hasClass("foc")){
            		 $(this).addClass("foc"); 
            	 }
             } ,  
             mouseout : function(){  
            	 //$(this).css("background","#FFF");  
            	 $(this).removeClass("foc"); 
             }   
         }) ; 
		$(".item").bind("click",function(event){
			$(this).siblings().removeClass('anW01r');
			$(this).siblings("div.copy-bar").css("display","none");
				if($(this).hasClass('anW01r')){
					$(this).removeClass('anW01r');
				}else{
					$(this).addClass('anW01r');
					$(this).next("div.copy-bar").css("display","block");
				}
				if(!$(this).hasClass('cazEfA')){
					$(".QxJxtg").addClass('cazEfA');
				}else{
					$(".QxJxtg").removeClass('cazEfA');
				}
				if(!$("div.item").hasClass('anW01r')){
					$(".QxJxtg").removeClass('cazEfA');
					$(this).next("div.copy-bar").css("display","none");
				}
				count();
		});
	}
	function showContent1(content,page){
		var oldContent = historyMap.get(location.href);
		var start = (page-1)*100;
		var position = (page-1)*100;
		for(var key in content) {
			oldContent[start++] = content[key];
		}
		historyMap.set(location.href,oldContent);
		for(var key in content) {
			var contentVal = eval($.parseJSON(content[key]));
				if(contentVal.createtime!=null){
				var mm = new Date(contentVal.createtime);
				var date = mm.getFullYear()
                + "-"// "年"
                + ((mm.getMonth() + 1) > 10 ? (mm.getMonth() + 1) : "0"
                        + (mm.getMonth() + 1))
                + "-"// "月"
                + (mm.getDate() < 10 ? "0" + mm.getDate() : mm
                        .getDate()) + " " +  (mm.getHours() < 10 ? "0" + mm.getHours() : mm
                                .getHours())
                                + ":"
                                + (mm.getMinutes() < 10 ? "0" + mm.getMinutes() : mm
                                        .getMinutes());
				}else{
					var date = "-"
				}
				var ext = contentVal.theme.substring(contentVal.theme.lastIndexOf(".") + 1,contentVal.theme.length);
				if(contentVal.expiration > 4682671273999){
					var expiration = "永久有效";
				}else {
					var startTime = new Date().getTime();
					var chazhi = contentVal.expiration - startTime;
					if(chazhi>0){
						var chazhiSS =Math.floor(parseInt(chazhi) / 1000 );
						var chazhiMM =Math.floor(parseInt(chazhi) / 1000 / 60);
						var chazhiHour =Math.floor(parseInt(chazhi) / 1000 / 60 /60);
						var chazhiDay = Math.floor(parseInt(chazhi) / 1000 / 60/ 60 / 24);
						if(chazhiDay > 1){
							var expiration =chazhiDay + "天后";
						}else if(chazhiHour > 1){
							var expiration =chazhiHour + "小时后";
						}else if(chazhiMM>1 ){
							var expiration =chazhiMM + "分钟后";
						}else{
							var expiration =chazhiSS + "秒后";
						}
					}else{
						var expiration ="已失效";
					}
				}
				if(contentVal.islock == 1 && contentVal.multi == 0){
					if(ext == "zip" || ext == "rar"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-zip'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "torrent"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-bt'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "mp4" || ext == "avi" || ext == "rmvb" || ext == "mpeg" || ext == "wmv"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-video'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "mp3"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-mp3'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "jpg" || ext == "jpeg" || ext == "gif"){
						$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-pic'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "txt"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-txt'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "doc" || ext == "docx"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-doc'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "ppt" || ext == "pptx"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-ppt'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "pdf"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-pdf'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else{
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM default-small'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}
				}else if(contentVal.islock == 0 && contentVal.multi == 0){
					if(ext == "zip" || ext == "rar"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-zip'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "torrent"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-bt'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "mp4" || ext == "avi" || ext == "rmvb" || ext == "mpeg" || ext == "wmv"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-video'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "mp3"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-mp3'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "jpg" || ext == "jpeg" || ext == "gif"){
						$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-pic'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "txt"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-txt'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "doc" || ext == "docx"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-doc'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "ppt" || ext == "pptx"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-ppt'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else if(ext == "pdf"){
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-pdf'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}else{
					 	$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM default-small'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text' id='copyPriv" +
					 			"alue='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
					}
				}else if(contentVal.islock == 1 && contentVal.multi == 1){
					$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='aaa mulit-icon'></div><div node-type='name' class='name' title='" + contentVal.theme + "等'><span class='name-text-wrapper'><span title='" + contentVal.theme + "等' data-name='" + contentVal.theme + "等' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "等</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
				}else if(contentVal.islock == 0 && contentVal.multi == 1){
					$("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareid + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='aaa mulit-icon'></div><div node-type='name' class='name' title='" + contentVal.theme + "等'><span class='name-text-wrapper'><span title='" + contentVal.theme + "等' data-name='" + contentVal.theme + "等' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "等</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date +"</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='https://localhost:8082/s/" + contentVal.shareid + "' target='_blank'>https://localhost:8082/s/" + contentVal.shareid + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='https://localhost:8082/s/" + contentVal.shareid + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>");
				}
            }
		if(eval($.parseJSON(content[key])) != null){
			if((parseInt(key)+1)%100 != 0){
				$(".loaded").html("已全部加载，共" + (parseInt(key)+1+(page-1)*100) + "个");
			}else{
				$(".loaded").html("已加载" + (parseInt(key)+1+(page-1)*100) + "个");
			}
		}else{
			$(".loaded").html("已全部加载，共" + (page-1)*100 + "个");
			finishMap.set(location.href,"已全部加载，共" + (page-1)*100 + "个");
		}
		$(".item").on({  
             mouseover : function(){  
            	 if(!$(this).hasClass("foc")){
            		 $(this).addClass("foc"); 
            	 }
             } ,  
             mouseout : function(){  
            	 //$(this).css("background","#FFF");  
            	 $(this).removeClass("foc"); 
             }   
         }) ; 
		$(".item").bind("click",function(event){
			$(this).siblings().removeClass('anW01r');
			$(this).siblings("div.copy-bar").css("display","none");
				if($(this).hasClass('anW01r')){
					$(this).removeClass('anW01r');
				}else{
					$(this).addClass('anW01r');
					$(this).next("div.copy-bar").css("display","block");
				}
				if(!$(this).hasClass('cazEfA')){
					$(".QxJxtg").addClass('cazEfA');
				}else{
					$(".QxJxtg").removeClass('cazEfA');
				}
				if(!$("div.item").hasClass('anW01r')){
					$(".QxJxtg").removeClass('cazEfA');
					$(this).next("div.copy-bar").css("display","none");
				}
				count();
		});
	}
	/*function loadContent1(page){
		//$(".vdAfKMb").empty();
		var query1 = location.href.split("?")[0];
		var barValue = query1.split("#/")[1];
		var order = "";
		var desc = 1 ;
		var fileNameDesc = $("[class='fufHyA yfHIsP MCGAxG']");
		var fileNameAsc = $("[class='fufHyA yfHIsP JFaAINb']");
		var sizeDesc = $("[class='fufHyA MCGAxG']");
		var sizeAsc = $("[class='fufHyA JFaAINb']");
		var updateTimeDesc = $("[class='fufHyA gObdAzb MCGAxG']");
		var updateTimeAsc = $("[class='fufHyA gObdAzb JFaAINb']");
		if(fileNameDesc.length != 0){
			order = "fileName";
			desc = 1 ;
		}
		if(fileNameAsc.length != 0){
			order = "fileName";
			desc = 0 ;
		}
		if(sizeDesc.length != 0){
			order = "fileSize";
			desc = 1 ;
		}
		if(sizeAsc.length != 0){
			order = "fileSize";
			desc = 0 ;
		}
		if(updateTimeDesc.length != 0){
			order = "updatetime";
			desc = 1 ;
		}
		if(updateTimeAsc.length != 0){
			order = "updatetime";
			desc = 0 ;
		}
		$.ajax({
			url : "http://localhost:9006/api/list",
			type : "post",
			data : {
				"token" : $.cookie('token'),
				"type" : barValue,
				"path" : location.href.split("path=")[1],
				"page" : page,
				"order" : order,
				"desc" : desc
			},
			xhrFields : {
				withCredentials : true
			},
			crossDomain : true,
			dataType : "json", //指定服务器返回的数据类型
			success : function(data) {
				//historyMap.set(location.href, data.respMap);
				showContent1(data.respMap,page);
			}
		});
	}*/
	/*function showContent1(content,page){
		var oldContent = historyMap.get(location.href);
		var start = (page-1)*100;
		var position = (page-1)*100;
		for(var key in content) {
			oldContent[start++] = content[key];
		}
		historyMap.set(location.href,oldContent);
		for(var key in content) {
			var contentVal = eval($.parseJSON(content[key]));
				if(contentVal.updatetime!=null){
				var mm = new Date(contentVal.updatetime);
				var date = mm.getFullYear()
                + "-"// "年"
                + ((mm.getMonth() + 1) > 10 ? (mm.getMonth() + 1) : "0"
                        + (mm.getMonth() + 1))
                + "-"// "月"
                + (mm.getDate() < 10 ? "0" + mm.getDate() : mm
                        .getDate()) + " " +  (mm.getHours() < 10 ? "0" + mm.getHours() : mm
                                .getHours())
                                + ":"
                                + (mm.getMinutes() < 10 ? "0" + mm.getMinutes() : mm
                                        .getMinutes());
				}else{
					var date = "-"
				}
				if(contentVal.filesize!=0){
					var size = bytesToSize(contentVal.filesize);
				}else{
					var size = "-";
				}
				var ext = contentVal.filename.substring(contentVal.filename.lastIndexOf(".") + 1,contentVal.filename.length);
				if(contentVal.addrtype == 0){
					$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz open-enable' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM dir-small'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' onclick='openUrl(this);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
				}else{
					if(ext == "zip" || ext == "rar"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-zip'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}else if(ext == "torrent"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-bt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}else if(ext == "mp4" || ext == "avi" || ext == "rmvb" || ext == "mpeg" || ext == "wmv"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-video'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}else if(ext == "mp3"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-mp3'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}else if(ext == "jpg" || ext == "jpeg" || ext == "gif"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-pic'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}else if(ext == "txt"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-txt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}else if(ext == "doc" || ext == "docx"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-doc'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}else if(ext == "ppt" || ext == "pptx"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-ppt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}else if(ext == "pdf"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-pdf'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}else{
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM default-small'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}
				}
            }
		if(eval($.parseJSON(content[key])) != null){
			if((parseInt(key)+1)%100 != 0){
				$(".FcucHsb").html("已全部加载，共" + (parseInt(key)+1+(page-1)*100) + "个");
			}else{
				$(".FcucHsb").html("已加载" + (parseInt(key)+1+(page-1)*100) + "个");
			}
		}else{
			$(".FcucHsb").html("已全部加载，共" + (page-1)*100 + "个");
			finishMap.set(location.href,"已全部加载，共" + (page-1)*100 + "个");
		}
	}*/
	
	function choose(obj){
		event.stopPropagation();
		var dd = obj.parentElement.parentElement;
		if(dd.className.indexOf('anW01r') > -1){
			$(dd).removeClass('anW01r');
		}else{
			$(dd).addClass('anW01r');
			$("div.copy-bar").css("display","none");
		}
		if(!$(dd).hasClass('cazEfA')){
			$(".QxJxtg").addClass('cazEfA');
		}else{
			$(".QxJxtg").removeClass('cazEfA');
		}
		if(!$("div.item").hasClass('anW01r')){
			$(".QxJxtg").removeClass('cazEfA');
		}
		$(dd).next("div.copy-bar").css("display","none");
		count();
	}
	function count(){
		var ddd = $("div.anW01r").length;
		$(".MdLxwM").html("已选中" + ddd + "个文件")
	}
	function flashContent(){
		$("div[class='list bEMOyf']").empty();
		historyMap.clear();
		finishMap.clear();
		loadContent();
	}
	function exit() {
		$('#my-confirm').modal({
			closeViaDimmer : 0,
			onConfirm : function(options) {
				$.ajax({
					url : "http://localhost:9005/v2/api/logout",
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
							location.href = "http://localhost:8082/";
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
							url : "http://localhost:9005/cgi/regcheckpwd",
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
										  url : "http://localhost:9005/v2/api/changePwd",
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
												  location.href = "http://localhost:8082/";
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
						  url : "http://localhost:9005/v2/api/uploadPic",
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
			  url : "http://localhost:9005/v2/api/loadImg",
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
				  $(".user-photo").css("background-image","url(http://139.199.131.85:8888/" + data.respData + ")");
			  },
			  error:function(){
				 // alert("服务器错误");
			  }
		  }); 
	}
	function copyUrl(obj){
		var input = $(obj).prev();
		input.select(); // 选择对象
		document.execCommand("Copy"); // 执行浏览器复制命令
		alert("已复制好，可贴粘。");
	}
	function unShare(chooseNum){
		$.ajax({
			  url : "http://localhost:9006/api/unShare",
			  type : "post",
			  data : {
				  "token" : $.cookie('token'),
				  "vids" : JSON.stringify(chooseNum)
			  },
			  xhrFields : {
				  withCredentials : true
			  },
			  crossDomain : true,
			  dataType : "json", //指定服务器返回的数据类型
			  success : function(data) {
				  if(!data.respCode == 1){
					  alert("操作失败");
				  }else{
					  $(".anW01r").each(function(){
						  $(this).next("div.copy-bar").remove();
						$(this).remove();
					});
					  $(".QxJxtg").removeClass("cazEfA");
					  flashContent();
				  }
			  },
			  error:function(){
				  alert("服务器错误");
			  }
		  });
	}
