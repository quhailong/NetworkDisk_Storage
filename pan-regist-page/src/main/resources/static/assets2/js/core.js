	var historyMap = new Map();
	var finishMap = new Map();
	var folderMap = new Map();
function abced(){
		if(location.href.indexOf("search?") == -1){
			 var query = decodeURI(location.href.split("path=")[1]);
				if($(this).attr("data-deep") == "-1"){
					if(((query.split('/')).length-1) == 1){
						history.pushState(null, "", location.href.substring(0,location.href.lastIndexOf("/")+1));
					}else{
						history.pushState(null, "", location.href.substring(0,location.href.lastIndexOf("/")));
					}
					changeContent();
				}else if($(this).attr("data-deep") == "0"){
					history.pushState(null, "", location.href.substring(0,location.href.lastIndexOf("path=/")+6));
					changeContent();
				}else{
					var url = location.href;
					for(var i = 0; i< $(this).attr("data-deep") ;i++){
					url = location.href.substring(0,location.href.lastIndexOf("/"))
					}
					history.pushState(null, "", decodeURI(url));
					changeContent();
				}
		}else{
			var query = location.href.split("#/")[0];
			history.pushState(null, "", query + "#/all?path=/");
			$("[class='QAfdwP tvPMvPb'] li").removeClass("BEPxaPb");
			if($("#new").length!=0){
			$("[class='QAfdwP tvPMvPb'] li").last().remove();
			}
			$("[class='QAfdwP tvPMvPb'] li").last().css("width","23%");
			$("[class='QAfdwP tvPMvPb'] li").last().addClass("MCGAxG");
			$("[class='QAfdwP tvPMvPb'] li").unbind("click");
			$("#filename").bind("click",function() {
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
			$("#filesize").bind("click",function() {
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
			$("#updatetime").bind("click",function() {
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
			changeContent();
		}
		
	};
	function a() {
		var query1 = location.href.split("?")[0];
		var query = query1.split("#/")[1];
		if (!query) {
		} else {
			$('[data-key="' + query + '"]').siblings('li').removeClass(
					'bHzsaPb'); // 删除其他兄弟元素的样式
			$(".QxJxtg").removeClass('cazEfA');
			$(".EzubGg").removeClass('EzubGg');
			$('[data-key="' + query + '"]').addClass('bHzsaPb'); // 添加当前元素的样式
			var barValue = $('[data-key="' + query + '"]').data("key");
			if (barValue != "all") {
				$("#createDirButton").css("display", "none");
			} else {
				$("#createDirButton").css("display", "inline-block");
			}
		}
	};
	function a2() {
			$('[data-key="all"]').siblings('li').removeClass(
					'bHzsaPb'); // 删除其他兄弟元素的样式
			$(".QxJxtg").removeClass('cazEfA');
			$(".EzubGg").removeClass('EzubGg');
			$('[data-key="all"]').addClass('bHzsaPb'); // 添加当前元素的样式
			$("#createDirButton").css("display", "none");
	};
	function changeContent() {
		if(location.href.indexOf("search")!= -1 ){
			var query = decodeURI(location.href.split("?key=")[1]);
			ajax2(query);
		}else{
			var query1 = location.href.split("?")[0];
			var query = query1.split("#/")[1];
			if (!query) {
				// 如果没有查询条件，则显示默认第1个章节
				history.pushState("all", "", location.href + "#/all?path=/");
				$(".module-aside li:first").addClass('bHzsaPb');
				changeContent();
			} else {
				//注意不要漏了true参数，这样可以和用户直接点击触发的页面变化区别开来
				$('[data-key="' + query + '"]').trigger("click", false);
			}
			if(location.href.split("path=")[1] != "/" && query == "all"){
				var asdvcb = decodeURI(location.href.split("path=")[1]);
					$(".FuIxtL").css("display","block");
					$("#tbAudfb").empty();
					var dkf = ((asdvcb.split('/')).length-1);
				if(dkf < 4){
					for(var i = 0;i<dkf + 1;i++){
						if(i == dkf){
							$("#tbAudfb").prepend("<a href='javascript:;' title='全部文件' data-deep='" + (dkf - i) +"'>全部文件</a><span class='KLxwHFb'>&gt;</span>");
						}else if(i == 0){
							$("#tbAudfb").prepend("<span title='全部文件" + asdvcb +"'>"+ asdvcb.substring(asdvcb.lastIndexOf("/") + 1,asdvcb.length) +"</span>");
							asdvcb = asdvcb.substring(0,asdvcb.lastIndexOf(asdvcb.substring(asdvcb.lastIndexOf("/"),asdvcb.length))) ;   
						}else{
							$("#tbAudfb").prepend("<a href='javascript:;' title='全部文件" + asdvcb + "' data-deep='" + (dkf - i) +"'>"+ asdvcb.substring(asdvcb.lastIndexOf("/") + 1,asdvcb.length)+"</a><span class='KLxwHFb'>&gt;</span>");
							asdvcb = asdvcb.substring(0,asdvcb.lastIndexOf(asdvcb.substring(asdvcb.lastIndexOf("/"),asdvcb.length))) ;   
						}
					}
				}else{
					for(var i = 0;i<dkf + 1;i++){
						if(i == dkf){
							$("#tbAudfb").prepend("<span title='全部文件" + asdvcb + "'>...</span><span class='KLxwHFb'>&gt;</span>");
						}else if(i == 0){
							$("#tbAudfb").prepend("<span title='全部文件" + asdvcb +"'>"+ asdvcb.substring(asdvcb.lastIndexOf("/") + 1,asdvcb.length) +"</span>");
							asdvcb = asdvcb.substring(0,asdvcb.lastIndexOf(asdvcb.substring(asdvcb.lastIndexOf("/"),asdvcb.length))) ;   
						}else if(i == 1){
							$("#tbAudfb").prepend("<a href='javascript:;' title='全部文件" + asdvcb + "' data-deep='" + (dkf - i) +"'>"+ asdvcb.substring(asdvcb.lastIndexOf("/") + 1,asdvcb.length)+"</a><span class='KLxwHFb'>&gt;</span>");
							asdvcb = asdvcb.substring(0,asdvcb.lastIndexOf(asdvcb.substring(asdvcb.lastIndexOf("/"),asdvcb.length))) ;   
						}else if(i == 2){
							$("#tbAudfb").prepend("<a href='javascript:;' title='全部文件" + asdvcb + "' data-deep='" + (dkf - i) +"'>"+ asdvcb.substring(asdvcb.lastIndexOf("/") + 1,asdvcb.length)+"</a><span class='KLxwHFb'>&gt;</span>");
							asdvcb = asdvcb.substring(0,asdvcb.lastIndexOf(asdvcb.substring(asdvcb.lastIndexOf("/"),asdvcb.length))) ;   
						}else if(i == 3){
							$("#tbAudfb").prepend("<a href='javascript:;' title='全部文件" + asdvcb + "' data-deep='" + (dkf - i) +"'>"+ asdvcb.substring(asdvcb.lastIndexOf("/") + 1,asdvcb.length)+"</a><span class='KLxwHFb'>&gt;</span>");
							asdvcb = asdvcb.substring(0,asdvcb.lastIndexOf(asdvcb.substring(asdvcb.lastIndexOf("/"),asdvcb.length))) ;   
						}
					}
				}
			}else{
				$(".FuIxtL").css("display","none");
			}
		}
		
	}
	function ajax(event, isPopstate) {
		$("[class='QAfdwP tvPMvPb'] li").removeClass("BEPxaPb");
		if($("#new").length!=0){
		$("[class='QAfdwP tvPMvPb'] li").last().remove();
		}
		$("[class='QAfdwP tvPMvPb'] li").last().css("width","23%");
		if($("[class='QAfdwP tvPMvPb'] li").hasClass('MCGAxG')||$("[class='QAfdwP tvPMvPb'] li").hasClass('JFaAINb')){
			
		}else{
			$("[class='QAfdwP tvPMvPb'] li").last().addClass("MCGAxG");
		}
		$("[class='QAfdwP tvPMvPb'] li").unbind("click");
		$("#filename").bind("click",function() {
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
		$("#filesize").bind("click",function() {
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
		$("#updatetime").bind("click",function() {
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
		$(".tcuLAu").css("display","inline-block");
		$(".QDDOQB").css("display","none");
		var barValue = $(this).data("key");
		if (isPopstate == null) {
			if (barValue == "all") {
				history.pushState(null, "", location.href.split("#/")[0] + "#/"
						+ barValue + "?path=/");
			} else {
				history.pushState(null, "", location.href.split("#/")[0] + "#/"
						+ barValue);
			}
			changeContent();
		} else {
			if (!isPopstate) {
				var query1 = location.href.split("?")[0];
				var query = query1.split("#/")[1];
				if(query == "all"){
					$(".EgMMec").html("全部文件");
				}else if(query == "pic"){
					$(".EgMMec").html("全部图片");
				}else if(query == "doc"){
					$(".EgMMec").html("全部文档");
				}else if(query == "video"){
					$(".EgMMec").html("全部视频");
				}else if(query == "mbt"){
					$(".EgMMec").html("全部种子");
				}else if(query == "music"){
					$(".EgMMec").html("全部音乐");
				}else{
					$(".EgMMec").html("其他文件");
				}
				var content = historyMap.get(location.href);
				if(content!=null){
							$(".vdAfKMb").empty();
							showContent(content);
				}else{
					loadContent();
				}
			}
		}
		a();
	}
	
	function ajax2(key) {
		$(".tcuLAu").css("display","inline-block");
		$(".QDDOQB").css("display","none");
				var content = historyMap.get(location.href);
				if(content!=null){
					if($("[class='QAfdwP tvPMvPb'] li").length == 3){
						$("[class='QAfdwP tvPMvPb']").append("<li id='new' class='fufHyA gObdAzb ' style='width:10%;'><span class='text'>所在目录</span><span class='xEuDywb'></span><span class='icon aHEytd icon-up'></span><span class='icon sFxCFbb icon-downtitle'></span></li>");
						$("[class='fufHyA gObdAzb MCGAxG']").css("width","13%");
						$("[class='QAfdwP tvPMvPb'] li").addClass("BEPxaPb");
						$("[class='QAfdwP tvPMvPb'] li").removeClass("MCGAxG JFaAINb");
						$("[class='QAfdwP tvPMvPb'] li").unbind("click");
					}
							$(".vdAfKMb").empty();
							showContent2(content);
				}else{
					loadContent2(key);
				}
		a2();
	}
	function showContent2(content){
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
				var parentPath = contentVal.parentpath.substring(contentVal.parentpath.lastIndexOf("/") + 1,contentVal.parentpath.length);
				if(parentPath == ""){
					parentPath = "全部文件"
				}
				if(contentVal.addrtype == 0){
					$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz open-enable' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM dir-small'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' onclick='openUrl1(this);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
				}else{
					if(ext == "zip" || ext == "rar"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-zip'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}else if(ext == "torrent"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-bt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}else if(ext == "mp4" || ext == "avi" || ext == "rmvb" || ext == "mpeg" || ext == "wmv"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-video'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}else if(ext == "mp3"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-mp3'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}else if(ext == "jpg" || ext == "jpeg" || ext == "gif"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-pic'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}else if(ext == "txt"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-txt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}else if(ext == "doc" || ext == "docx"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-doc'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}else if(ext == "ppt" || ext == "pptx"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-ppt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}else if(ext == "pdf"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-pdf'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}else{
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM default-small'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}
				}
            }
		$(".FuIxtL").css("display","block");
		var query = decodeURI(location.href.split("search?key=")[1]);
		$("#tbAudfb").empty();
		$("#tbAudfb").append("<a href='javascript:;' title='全部文件' data-deep='0'>全部文件</a><span class='KLxwHFb'>&gt;</span><span title='全部文件/搜索：&quot;" + query  + "&quot;'>搜索："+ '"' + query + '"' +"</span>");
		if(eval($.parseJSON(content[key])) != null){
			if((parseInt(key)+1)%100 != 0){
					$(".FcucHsb").html("已全部加载，共" + (parseInt(key)+1) + "个");
			}else{
				if(finishMap.get(location.href)!=null){
					$(".FcucHsb").html(finishMap.get(location.href));
				}else{
					$(".FcucHsb").html("已加载" + (parseInt(key)+1) + "个");
				}
			}
		}else{
				$(".FcucHsb").html("已全部加载，共0个");
		}
	}
	function showContent3(content,page){
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
				var parentPath = contentVal.parentpath.substring(contentVal.parentpath.lastIndexOf("/") + 1,contentVal.parentpath.length);
				if(parentPath == ""){
					parentPath = "全部文件"
				}
				if(contentVal.addrtype == 0){
					$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz open-enable' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM dir-small'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' onclick='openUrl1(this);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
				}else{
					if(ext == "zip" || ext == "rar"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-zip'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}else if(ext == "torrent"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-bt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}else if(ext == "mp4" || ext == "avi" || ext == "rmvb" || ext == "mpeg" || ext == "wmv"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-video'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}else if(ext == "mp3"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-mp3'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}else if(ext == "jpg" || ext == "jpeg" || ext == "gif"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-pic'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}else if(ext == "txt"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-txt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}else if(ext == "doc" || ext == "docx"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-doc'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}else if(ext == "ppt" || ext == "pptx"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-ppt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}else if(ext == "pdf"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-pdf'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}else{
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM default-small'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>");
					}
				}
            }
		$(".FuIxtL").css("display","block");
		var query = decodeURI(location.href.split("search?key=")[1]);
		$("#tbAudfb").empty();
		$("#tbAudfb").append("<a href='javascript:;' title='全部文件' data-deep='0'>全部文件</a><span class='KLxwHFb'>&gt;</span><span title='全部文件/搜索：&quot;" + query  + "&quot;'>搜索："+ '"' + query + '"' +"</span>");
		if(eval($.parseJSON(content[key])) != null){
			if((parseInt(key)+1)%100 != 0){
					$(".FcucHsb").html("已全部加载，共" + (parseInt(key)+1+(page-1)*100) + "个");
			}else{
				if(finishMap.get(location.href)!=null){
					$(".FcucHsb").html(finishMap.get(location.href));
				}else{
					$(".FcucHsb").html("已加载" + (parseInt(key)+1+(page-1)*100) + "个");
				}
			}
		}else{
			$(".FcucHsb").html("已全部加载，共" + (page-1)*100 + "个");
			finishMap.set(location.href,"已全部加载，共" + (page-1)*100 + "个");
		}
	}
	function loadContent3(key,page){
		$.ajax({
			  url : "http://localhost:9006/api/search",
			  type : "post",
			  data : {
				  "token" : $.cookie('token'),
				  "key" : key,
				  "page" : page,
				  "order" : "updatetime"
			  },
			  xhrFields : {
				  withCredentials : true
			  },
			  crossDomain : true,
			  dataType : "json", //指定服务器返回的数据类型
			  success : function(data) {
				  if(data.respData == "200"){
					 $("[class='QAfdwP tvPMvPb']").append("<li id='new' class='fufHyA gObdAzb ' style='width:10%;'><span class='text'>所在目录</span><span class='xEuDywb'></span><span class='icon aHEytd icon-up'></span><span class='icon sFxCFbb icon-downtitle'></span></li>");
					 $("[class='fufHyA gObdAzb MCGAxG']").css("width","13%");
					 $("[class='QAfdwP tvPMvPb'] li").addClass("BEPxaPb");
					 $("[class='QAfdwP tvPMvPb'] li").removeClass("MCGAxG JFaAINb");
					 $("[class='QAfdwP tvPMvPb'] li").unbind("click");
					 showContent3(data.respMap,page);
				  }
			  },
			  error:function(){
				  alert("服务器错误，搜索失败");
			  }
		  });
	}
	function loadContent2(key){
		$(".vdAfKMb").empty();
		$.ajax({
			  url : "http://localhost:9006/api/search",
			  type : "post",
			  data : {
				  "token" : $.cookie('token'),
				  "key" : key,
				  "page" : 1,
				  "order" : "updatetime"
			  },
			  xhrFields : {
				  withCredentials : true
			  },
			  crossDomain : true,
			  dataType : "json", //指定服务器返回的数据类型
			  success : function(data) {
				  if(data.respData == "200"){
					 $("[class='QAfdwP tvPMvPb']").append("<li id='new' class='fufHyA gObdAzb ' style='width:10%;'><span class='text'>所在目录</span><span class='xEuDywb'></span><span class='icon aHEytd icon-up'></span><span class='icon sFxCFbb icon-downtitle'></span></li>");
					 $("[class='fufHyA gObdAzb MCGAxG']").css("width","13%");
					 $("[class='QAfdwP tvPMvPb'] li").addClass("BEPxaPb");
					 $("[class='QAfdwP tvPMvPb'] li").removeClass("MCGAxG JFaAINb");
					 $("[class='QAfdwP tvPMvPb'] li").unbind("click");
					 var query = location.href.split("#/")[0];
					 history.pushState(null, "", query + "#/search?key=" + key);
					 historyMap.set(location.href,data.respMap);
					 showContent2(data.respMap);
				  }
			  },
			  error:function(){
				  alert("服务器错误，搜索失败");
			  }
		  });
	}
	function loadContent(){
		var query1 = location.href.split("?")[0];
		var barValue = query1.split("#/")[1];
		$(".vdAfKMb").empty();
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
	}
	function showContent(content){
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
					$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz open-enable' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM dir-small'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' onclick='openUrl(this);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
				}else{
					if(ext == "zip" || ext == "rar"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-zip'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}else if(ext == "torrent"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-bt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}else if(ext == "mp4" || ext == "avi" || ext == "rmvb" || ext == "mpeg" || ext == "wmv"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-video'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}else if(ext == "mp3"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-mp3'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}else if(ext == "jpg" || ext == "jpeg" || ext == "gif"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-pic'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}else if(ext == "txt"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-txt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}else if(ext == "doc" || ext == "docx"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-doc'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}else if(ext == "ppt" || ext == "pptx"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-ppt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}else if(ext == "pdf"){
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-pdf'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}else{
						$(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM default-small'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.filename + "'>" + contentVal.filename + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>");
					}
				}
            }
		if(eval($.parseJSON(content[key])) != null){
			if((parseInt(key)+1)%100 != 0){
					$(".FcucHsb").html("已全部加载，共" + (parseInt(key)+1) + "个");
			}else{
				if(finishMap.get(location.href)!=null){
					$(".FcucHsb").html(finishMap.get(location.href));
				}else{
					$(".FcucHsb").html("已加载" + (parseInt(key)+1) + "个");
				}
			}
		}else{
				$(".FcucHsb").html("已全部加载，共0个");
		}
	}
	function bytesToSize(bytes) {
		if(bytes != null){
	       if (bytes === 0) return '0 B';  
	  
	        var k = 1024;  
	  
	        sizes = ['B','KB', 'MB', 'GB'];  
	  
	        i = Math.floor(Math.log(bytes) / Math.log(k));  
	  
	    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];   
		}else{
			return "-";
		}
	} 
	function choose(obj){
		var dd = obj.parentElement;
		if(dd.className.indexOf('anW01r') > -1){
			dd.className = dd.className.replace(new RegExp("(\\s|^)" + "anW01r" + "(\\s|$)"), ""); ;
		}else{
			dd.className+=" anW01r";
		}
		if(!$(".QxJxtg").hasClass('cazEfA')){
			$(".QxJxtg").addClass('cazEfA');
			$(".tcuLAu").css("display","none");
			$(".QDDOQB").css("display","inline-block");
		}
		if(!$("dd").hasClass('anW01r')){
			$(".QxJxtg").removeClass('cazEfA');
			$(".tcuLAu").css("display","inline-block");
			$(".QDDOQB").css("display","none");
		}
		
		count();
	}
	function count(){
		var fii = $("[class='g-clearfix AuPKyz open-enable anW01r']").length; 
		if($("dd.anW01r").length>=2){
			$("#rename").css("display","none");
		}
		if($("dd.anW01r").length<2){
			$("#rename").css("display","inline-block");
		}
		if($("[class='g-clearfix AuPKyz open-enable anW01r']").length>0){
			$("#download").css("display","none");
			$("#share").css("display","none");
		}
		if($("[class='g-clearfix AuPKyz open-enable anW01r']").length==0){
			$("#download").css("display","inline-block");
			$("#share").css("display","inline-block");
		}
		var ddd = $("dd.anW01r").length;
		$(".MdLxwM").html("已选中" + ddd + "个文件/文件夹")
	}
	function openUrl(obj){
		if(location.href.split("path=")[1] == "/"){
			history.pushState(null, "", location.href + obj.title);
		}else{
			history.pushState(null, "", location.href + "/" + obj.title);
		}
		$(".FuIxtL").css("display","block");
		var content = historyMap.get(location.href);
		if(content!=null){
			$(".vdAfKMb").empty();
			changeContent();
		}else{
			$(".vdAfKMb").empty();
		changeContent();
		}
	}
	function openUrl1(obj){
		var dd = $(obj).parents("dd");
		var index = dd.attr("_position");
		var content = historyMap.get(location.href);
		var contentVal = eval($.parseJSON(content[index]));
		if($(obj).hasClass("pq71X8")){
				history.pushState(null, "", location.href.split("#/search?key")[0] + "#/all?path=" + contentVal.parentpath);
		}else{
			if(contentVal.parentpath == "/"){
				history.pushState(null, "", location.href.split("#/search?key")[0] + "#/all?path=" + contentVal.parentpath + contentVal.filename);
			}else{
				history.pushState(null, "", location.href.split("#/search?key")[0] + "#/all?path=" + contentVal.parentpath + "/" + contentVal.filename);
			}	
		}
		$("[class='QAfdwP tvPMvPb'] li").removeClass("BEPxaPb");
		if($("#new").length!=0){
		$("[class='QAfdwP tvPMvPb'] li").last().remove();
		}
		$("[class='QAfdwP tvPMvPb'] li").last().css("width","23%");
		$("[class='QAfdwP tvPMvPb'] li").last().addClass("MCGAxG");
		$("[class='QAfdwP tvPMvPb'] li").unbind("click");
		$("#filename").bind("click",function() {
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
		$("#filesize").bind("click",function() {
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
		$("#updatetime").bind("click",function() {
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
		$(".FuIxtL").css("display","block");
		var content = historyMap.get(location.href);
		if(content!=null){
			$(".vdAfKMb").empty();
			changeContent();
		}else{
			$(".vdAfKMb").empty();
		changeContent();
		}
	}
	function flashContent(){
		$(".vdAfKMb").empty();
		historyMap.clear();
		finishMap.clear();
		folderMap.clear();
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
	function loadFolder(parentPath,obj){
		var folderContent = folderMap.get(parentPath);
		if(folderContent == null){
			$.ajax({
				url : "http://localhost:9006/api/folderList",
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
	function copyAndMove(id,chooseNum,dest){
		var content = historyMap.get(location.href);
		var vids = new Array();
		for(var index in chooseNum) {
			var contentVal = eval($.parseJSON(content[chooseNum[index]]));
			vids.push(contentVal.vid);
		}
		$.ajax({
			url : "http://localhost:9006/api/filemanager",
			type : "post",
			data : {
				"token" : $.cookie('token'),
				"vids" : JSON.stringify(vids),
				"opera": id,
				"dest" : dest
			},
			xhrFields : {
				withCredentials : true
			},
			crossDomain : true,
			dataType : "json", //指定服务器返回的数据类型
			success : function(data) {
				if(data.dataCode == 200){
					$(".module-canvas").css("display","none");
					$("#fileTreeDialog").css("display","none");
					flashContent();
					$(".QxJxtg").removeClass('cazEfA');
					$(".EzubGg").removeClass('EzubGg');
					alert("操作成功");
				}else{
					$(".module-canvas").css("display","none");
					$("#fileTreeDialog").css("display","none");
					alert(data.respMsg);
				}
				$(".tcuLAu").css("display","inline-block");
				$(".QDDOQB").css("display","none");
			},
			error:function(){
                $(".module-canvas").css("display","none");
				$("#fileTreeDialog").css("display","none");
				alert("服务器错误，操作失败");
            }
		});
		
	}
	function download(chooseNum){
		var content = historyMap.get(location.href);
		var vids = new Array();
		for(var index in chooseNum) {
				var contentVal = eval($.parseJSON(content[chooseNum[index]]));
				vids.push(contentVal.vid);
		}
				var form=$("<form id="+ index +">");//定义一个form表单  
				form.attr("style","display:none");  
				form.attr("method","post");  
				form.attr("action","http://139.199.116.162:8083/rest/download");  
				var input1=$("<input>");  
				input1.attr("type","hidden");
				input1.attr("name","vids");  
				input1.attr("value",JSON.stringify(vids));
				var input2=$("<input>");  
				input2.attr("type","hidden");  
				input2.attr("name","token");  
				input2.attr("value",$.cookie('token'));
				var input3=$("<input>");  
				input3.attr("type","hidden");  
				input3.attr("name","uid");  
				input3.attr("value",$.cookie('uid'));
				$("body").append(form);//将表单放置在web中  
				form.append(input1);  
				form.append(input2);  
				form.append(input3);  
				form.submit();//表单提交
				form.empty();
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
	function createShare(chooseNum){
		var content = historyMap.get(location.href);
		var vids = new Array();
		for(var index in chooseNum) {
				var contentVal = eval($.parseJSON(content[chooseNum[index]]));
				vids.push(contentVal.fid);
		}
		var flag = $("input[name='share-method']:checked").val();
		$.ajax({
			  url : "http://localhost:9006/api/share",
			  type : "post",
			  data : {
				  "token" : $.cookie('token'),
				  "vids" : JSON.stringify(vids),
				  "flag" : flag,
				  "expiration" : $("#expiration").val()
			  },
			  xhrFields : {
				  withCredentials : true
			  },
			  crossDomain : true,
			  dataType : "json", //指定服务器返回的数据类型
			  success : function(data) {
				 if(data.respData.indexOf(",")>-1){
					 $(".share-validity-tip").css("right","150px");
					 $(".create-link").addClass("private-link has-create");
					 $("#createShare").css("display","none");
					 $("#cel").children("span").children("span").html("关闭");
					 $(".share-url").val("http://localhost:8082/s/" + data.respData.substring(0,data.respData.lastIndexOf(",")));
					 $(".share-password").val(data.respData.substring(data.respData.lastIndexOf(",")+1,data.respData.length));
					 $(".copyPrivate").val("http://localhost:8082/s/" + (data.respData.substring(0,data.respData.lastIndexOf(","))) + " 提取密码:" + data.respData.substring(data.respData.lastIndexOf(",")+1,data.respData.length));
				 }else{
					 $(".share-validity-tip").css("right","115px");
					 $(".create-link").addClass("public-link has-create");
					 $("#createShare").css("display","none");
					 $("#cel").children("span").children("span").html("关闭");
					 $(".share-url").val("http://localhost:8082/s/" + data.respData);
				 }
			  },
			  error:function(){
				  alert("服务器错误");
			  }
		  });
	}
