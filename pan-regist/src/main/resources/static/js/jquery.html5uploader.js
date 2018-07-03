/*
html5uploader V1.0
author:吕大豹
date:2013.2.21
*/
(function($){
$.fn.html5uploader = function(opts){
	
	var defaults = {
		fileTypeExts:'',//允许上传的文件类型，填写mime类型
		url:'',//文件提交的地址
		auto:false,//自动上传
		multi:true,//默认允许选择多个文件
		buttonText:'选择文件',//上传按钮上的文字
		removeTimeout: 1000,//上传完成后进度条的消失时间
		//itemTemplate:'<li id="${fileID}file"><div class="progress"><div class="progressbar"></div></div><span class="filename">${fileName}</span><span class="progressnum">0/${fileSize}</span><a class="uploadbtn">上传</a><a class="delfilebtn">删除</a></li>',//上传队列显示的模板,最外层标签使用<li>
		itemTemplate:'<li id="${fileID}file" class="file-list status-prepare"><div class="process" style="width: 0%;"></div><div class="info"><div class="file-name" title="${fileName}"><div class="file-icon fileicon-small-pid"></div><span class="name-text">${fileName}</span></div><div class="file-size">${fileSize}</div><div class="file-path"><a title="我的文件" class="server_path" href="#/all?path=%2F">我的文件</a></div><div class="file-status"><span class="waiting">排队中…</span><span class="prepare">准备上传…</span><span class="uploading"><em class="precent"></em><em class="speed"></em></span><span class="error"><em></em><i>服务器错误</i><b></b></span><span class="caution"><em></em><i>服务器错误</i><b></b></span><span class="pause"><em></em><i>已暂停</i></span><span class="cancel"><em></em><i>已取消</i></span><span class="success"><em></em><i></i></span></div></div></li>',
		itemTemplate1:'<li id="${fileID}Dirfile" class="file-list status-prepare"><div class="process" style="width: 0%;"></div><div class="info"><div class="file-name" title="${fileName}"><div class="file-icon fileicon-small-pid"></div><span class="name-text">${fileName}</span></div><div class="file-size">${fileSize}</div><div class="file-path"><a title="我的文件" class="server_path" href="#/all?path=%2F">我的文件</a></div><div class="file-status"><span class="waiting">排队中…</span><span class="prepare">准备上传…</span><span class="uploading"><em class="precent"></em><em class="speed"></em></span><span class="error"><em></em><i>服务器错误</i><b></b></span><span class="caution"><em></em><i>服务器错误</i><b></b></span><span class="pause"><em></em><i>已暂停</i></span><span class="cancel"><em></em><i>已取消</i></span><span class="success"><em></em><i></i></span></div></div></li>',
		onUploadStart:function(){},//上传开始时的动作
		onUploadSuccess:function(){},//上传成功的动作
		onUploadComplete:function(){},//上传完成的动作
		onUploadError:function(){}, //上传失败的动作
		onInit:function(){},//初始化时的动作
		}
		
	var option = $.extend(defaults,opts);
	
	//将文件的单位由bytes转换为KB或MB
	var formatFileSize = function(size){
		if (size> 1024 * 1024){
			size = (Math.round(size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
			}
		else{
			size = (Math.round(size * 100 / 1024) / 100).toString() + 'KB';
			}
		return size;
		}
	//根据文件序号获取文件
	var getFile = function(index,files){
		for(var i=0;i<files.length;i++){	   
		  if(files[i].index == index){
			  return files[i];
			  }
		}
		return false;
	}
	//将文件类型格式化为数组
	var formatFileType = function(str){
		if(str){
			return str.split(",");	
			}
		return false;
		}
	
	this.each(function(){
		var _this = $(this);
		//先添加上file按钮和上传列表
		var inputstr = '<input class="uploadfile" style="visibility:hidden;" type="file" name="file" multiple="multiple" />';
		inputstr += '<input webkitdirectory class="uploadfile1" style="visibility:hidden;" type="file" name="file" multiple="multiple" />';
		inputstr += '<a id="uploadfilebtn" class="g-button-menu upload-wrapper" href="javascript:void(0);">上传文件 </a>';
		inputstr += '<a id="uploadfilebtn1" class="g-button-menu upload-wrapper" href="javascript:void(0);">上传文件夹 </a>';
		var fileInputButton = $(inputstr);
		var uploadFileList = $('#uploaderList');
		_this.append(fileInputButton);
		//创建文件对象
			  var ZXXFILE = {
			  fileInput: fileInputButton.get(0),				//html file控件
			  upButton: null,					//提交按钮
			  url: option.url,						//ajax地址
			  fileFilter: [],					//过滤后的文件数组
			  filter: function(files) {		//选择文件组的过滤方法
				  var arr = [];
				  var typeArray = formatFileType(option.fileTypeExts);
				  if(!typeArray){
					  for(var i in files){
							  if(files[i].constructor==File){
								arr.push(files[i]);
							  }
						  }
					  }
				  else{
					  for(var i in files){
						  if(files[i].constructor==File){
							if($.inArray(files[i].type,typeArray)>=0){
								arr.push(files[i]);	
								}
							else{
								alert('文件类型不允许！');
								fileInputButton.val('');
								}  	
							} 
						}	
					  }
				  return arr;  	
			  },
			  //文件选择后
			  onSelect: option.onSelect||function(files){
				  $(".uploadfile").val("");
				 for(var i=0;i<files.length;i++){
					
					var file = files[i];
					
					var html = option.itemTemplate;
					//处理模板中使用的变量
					html = html.replace(/\${fileID}/g,file.index).replace(/\${fileName}/g,file.name).replace(/\${fileSize}/g,formatFileSize(file.size));
					uploadFileList.append(html);
					//判断是否是自动上传
					xhr = new XMLHttpRequest();
						 ZXXFILE.funUploadFile(file,xhr);
				 }
				 
				 //为删除文件按钮绑定删除文件事件
				 _this.find('.delfilebtn').live('click',function(){
					 var index = parseInt($(this).parents('li').attr('id'));
					 ZXXFILE.funDeleteFile(index);
					 });
				 
				},		
			  //文件删除后
			  onDelete: function(index) {
				  _this.find('#'+index+'file').fadeOut();
				  },	
			  // 上传进度
			  onProgress: function(file, loaded, total) {
			  var eleProgress = $('#'+file.index+'file'), percent = (loaded / total * 100).toFixed(2) + '%';
			  eleProgress.find('.process').css('width',percent);
			  if(total-loaded<500000){loaded = total;}//解决四舍五入误差
			  eleProgress.find('.precent').html(percent);
		  		},		//文件上传进度
			  onUploadSuccess: option.onUploadSuccess,		//文件上传成功时
			  onUploadError: option.onUploadError,		//文件上传失败时,
			  onUploadComplete: option.onUploadComplete,		//文件全部上传完毕时
			  
			  /* 开发参数和内置方法分界线 */
			  
			  //获取选择文件，file控件或拖放
			  funGetFiles: function(e) {
						  
				  // 获取文件列表对象
				  var files = e.target.files || e.dataTransfer.files;
				  //继续添加文件
				  files = this.filter(files)
				  this.fileFilter.push(files);
				  this.funDealFiles(files);
				  return this;
			  },
			  
			  //选中文件的处理与回调
			  funDealFiles: function(files) {
				  var fileCount = _this.find('.filelist li').length;//队列中已经有的文件个数
				  for (var i = 0; i<this.fileFilter.length; i++) {
					  for(var j=0;j<this.fileFilter[i].length;j++){	
						 var file = this.fileFilter[i][j];	  
						 //增加唯一索引值
					  	 file.index = ++fileCount;
					  }
				  }
				  //执行选择回调
				  this.onSelect(files);
				  
				  return this;
			  },
			  
			  //删除对应的文件
			  funDeleteFile: function(index) {

				  for (var i = 0; i<this.fileFilter.length; i++) {
					  for(var j=0; j<this.fileFilter[i].length; j++){
						  var file = this.fileFilter[i][j];
						  if (file.index == index) {
							  this.fileFilter[i].splice(j,1);
							  this.onDelete(index);	
						  }
					  }
				  }
				  return this;
			  },
			  
			  //文件上传
			  funUploadFile: function(file,xhr1) {
				  var self = this;	  
				  //xhr = xhr1;
				  (function(file) {
					  $('#'+file.index+'file').removeClass('status-prepare').addClass('status-uploading');
					  if (xhr1.upload) {
						  
						  // 上传中
						  xhr1.upload.addEventListener("progress", function(e) {
							  self.onProgress(file, e.loaded, e.total);
						  }, false);
			  
						  // 文件上传成功或是失败
						  xhr1.onreadystatechange = function(e) {
							  if (xhr1.readyState == 4) {
								  if(xhr1.responseText != ""){
									  var json = eval("(" + xhr1.responseText + ")");
									  if (json.respCode == "1") {
										  //self.onUploadSuccess(file, xhr.responseText);
										  $('#'+file.index+'file').removeClass('status-uploading').addClass('status-success');
										  flashContent();
										  $(".QxJxtg").removeClass('cazEfA');
										  //setTimeout(function(){ZXXFILE.onDelete(file.index);},option.removeTimeout);
										  //self.onUploadComplete();	
									  } else if(json.respCode == "0"){
										  $('#'+file.index+'file').removeClass('status-uploading').addClass('status-error');
										  //self.onUploadError(file, xhr.responseText);		
									  }
								  }else{
									  $('#'+file.index+'file').removeClass('status-uploading').addClass('status-error');
								  }
							  }
						  };
						  
			  			  option.onUploadStart();	
						  // 开始上传
			  			var fid = new Date().getTime();
						  var formData = new FormData();
						  var parentPath = "";
						  formData.append('file', file);
						  formData.append('token',$.cookie('token'));
						  formData.append('uid',$.cookie('uid'));
						  formData.append('fid',fid);
						  if(location.href.indexOf("path=")>=0){
							  parentPath = location.href.split("path=")[1];
						  }else{
							  parentPath = "/"
						  }
						  formData.append('parentPath',parentPath)
						  function get_filemd5sum(ofile,ofid,xhr1) {
							  var xhr = xhr1;
							  var file = ofile;
							  var fid = ofid;
							  var tmp_md5;
							  var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
							  // file = this.files[0],
							  chunkSize = 80971520, // Read in chunks of 20MB
							  chunks = Math.ceil(file.size / chunkSize),
							  currentChunk = 0,
							  spark = new SparkMD5.ArrayBuffer(),
							  fileReader = new FileReader();
							  loadNext();
							  if(file.size<809715200){
								  fileReader.onload = function(e) {
									  // console.log('read chunk nr', currentChunk + 1, 'of', chunks);
									  spark.append(e.target.result); // Append array buffer
									  currentChunk++;
									  var md5_progress = Math.floor((currentChunk / chunks) * 100);
									  
									  console.log(file.name + "  正在处理，请稍等," + "已完成" + md5_progress + "%");
									  // if (currentChunk < chunks) {
									  // } else {
									  tmp_md5 = spark.end();
									  console.log(tmp_md5)
									  fileReader.abort();
									  $.ajax({
										  url : "http://139.199.116.162:8083/rest/md5check",
										  type : "post",
										  data : {"md5":tmp_md5,"fid":fid,"token":$.cookie('token')},
										  xhrFields : {
											  withCredentials : true
										  },
										  crossDomain : true,
										  dataType : "json", //指定服务器返回的数据类型
										  success : function(data) {
											 // alert(data)
											  if (data.respCode==1) {
												  $.ajax({
													  url : "http://139.199.116.162:8083/rest/uploadFileSpe",
													  type : "post",
													  data : {"uid":$.cookie('uid'),"md5":tmp_md5,"token":$.cookie('token'),"fileName":file.name,"fid":fid,"parentPath":parentPath},
													  xhrFields : {
														  withCredentials : true
													  },
													  crossDomain : true,
													  dataType : "json", //指定服务器返回的数据类型
													  success : function(data) {
														  if (data.respCode==1) {
															  $('#'+file.index+'file').removeClass('status-uploading').addClass('status-success'); 
															  flashContent();
															  $(".QxJxtg").removeClass('cazEfA');
														  } else {
															  $('#'+file.index+'file').removeClass('status-uploading').addClass('status-error');
														  }
													  },error:function(){
														  $('#'+file.index+'file').removeClass('status-uploading').addClass('status-error');
													  }
												  });
											  } else {
												  xhr.open("POST", self.url, true);
												  xhr.setRequestHeader("withCredentials", true);
												  xhr.setRequestHeader("crossDomain", true);
												  xhr.send(formData);
											  }
										  },error:function(){
											  $('#'+file.index+'file').removeClass('status-uploading').addClass('status-error');
										  }
									  });
								  };
							  }else{
								  xhr.open("POST", self.url, true);
								  xhr.setRequestHeader("withCredentials", true);
								  xhr.setRequestHeader("crossDomain", true);
								  xhr.send(formData);
								  fileReader.onload = function(e) {
									  // console.log('read chunk nr', currentChunk + 1, 'of', chunks);
									  spark.append(e.target.result); // Append array buffer
									  currentChunk++;
									  var md5_progress = Math.floor((currentChunk / chunks) * 100);
									  
									  console.log(file.name + "  正在处理，请稍等," + "已完成" + md5_progress + "%");
									  // if (currentChunk < chunks) {
									  loadNext();
									  // } else {
									  tmp_md5 = spark.end();
									  console.log(tmp_md5)
									  fileReader.abort();
									  $.ajax({
										  url : "http://139.199.116.162:8083/rest/md5check",
										  type : "post",
										  data : {"md5":tmp_md5,"fid":fid,"token":$.cookie('token')},
										  xhrFields : {
											  withCredentials : true
										  },
										  crossDomain : true,
										  dataType : "json", //指定服务器返回的数据类型
										  success : function(data) {
											  alert(data)
											  if (data.respCode==1) {
												  xhr.above();
												  $.ajax({
													  url : "http://139.199.116.162:8083/rest/uploadFileSpe",
													  type : "post",
													  data : {"uid":$.cookie('uid'),"md5":tmp_md5,"token":$.cookie('token'),"fileName":file.name,"fid":fid,"parentPath":parentPath},
													  xhrFields : {
														  withCredentials : true
													  },
													  crossDomain : true,
													  dataType : "json", //指定服务器返回的数据类型
													  success : function(data) {
														  if (data.respCode==1) {
															   $('#'+file.index+'file').removeClass('status-uploading').addClass('status-success');
															   flashContent();
															   $(".QxJxtg").removeClass('cazEfA');
														  } else {
															   $('#'+file.index+'file').removeClass('status-uploading').addClass('status-error');
														  }
													  },error:function(){
														  $('#'+file.index+'file').removeClass('status-uploading').addClass('status-error');
													  }
												  });
											  } else {
												  $('#'+file.index+'file').removeClass('status-uploading').addClass('status-error');
											  }
										  },error:function(){
											  $('#'+file.index+'file').removeClass('status-uploading').addClass('status-error');
										  } 
									  });
								  };
							  }
							  
							  fileReader.onerror = function() {
								  console.warn('oops, something went wrong.');
							  };
							  
							  function loadNext() {
								  //var start = currentChunk * chunkSize,
								  //end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
								  fileReader.readAsArrayBuffer(blobSlice.call(file, 0, chunkSize));
							  }
							  //loadNext();
						  }
						  get_filemd5sum(file,fid,xhr1);
					  }	
				  })(file);	
					  
			  },
			  
			  init: function() {
				  var self = this;
				  //文件选择控件选择
				  if (this.fileInput) {
					  this.fileInput.addEventListener("change", function(e) { self.funGetFiles(e); }, false);	
				  }
				  
				  //点击上传按钮时触发file的click事件
				  _this.find('#uploadfilebtn').live('click',function(){
					  _this.find('.uploadfile').trigger('click');
					  });
				  option.onInit();
			  }
		  };
			  var ZXXFILE1 = {
					  fileInput: fileInputButton.get(1),				//html file控件
					  upButton: null,					//提交按钮
					  url: option.url,						//ajax地址
					  fileFilter: [],					//过滤后的文件数组
					  filter: function(files) {		//选择文件组的过滤方法
						  var arr = [];
						  var typeArray = formatFileType(option.fileTypeExts);
						  if(!typeArray){
							  for(var i in files){
									  if(files[i].constructor==File){
										arr.push(files[i]);
									  }
								  }
							  }
						  else{
							  for(var i in files){
								  if(files[i].constructor==File){
									if($.inArray(files[i].type,typeArray)>=0){
										arr.push(files[i]);	
										}
									else{
										alert('文件类型不允许！');
										fileInputButton.val('');
										}  	
									} 
								}	
							  }
						  return arr;  	
					  },
					  //文件选择后
					  onSelect: option.onSelect||function(files){
						  $(".uploadfile1").val("");
						 for(var i=0;i<files.length;i++){
							
							var file = files[i];
							
							var html = option.itemTemplate1;
							//处理模板中使用的变量
							html = html.replace(/\${fileID}/g,file.index).replace(/\${fileName}/g,file.name).replace(/\${fileSize}/g,formatFileSize(file.size));
							uploadFileList.append(html);
							//判断是否是自动上传
							xhr = new XMLHttpRequest();
								 ZXXFILE1.funUploadFile(file,xhr);
								
						 }
						 
						 //为删除文件按钮绑定删除文件事件
						 _this.find('.delfilebtn').live('click',function(){
							 var index = parseInt($(this).parents('li').attr('id'));
							 ZXXFILE1.funDeleteFile(index);
							 });
						 
						},		
					  //文件删除后
					  onDelete: function(index) {
						  _this.find('#'+index+'Dirfile').fadeOut();
						  },	
					  // 上传进度
					  onProgress: function(file, loaded, total) {
					  var eleProgress = $('#'+file.index+'Dirfile'), percent = (loaded / total * 100).toFixed(2) + '%';
					  eleProgress.find('.process').css('width',percent);
					  if(total-loaded<500000){loaded = total;}//解决四舍五入误差
					  eleProgress.find('.precent').html(percent);
				  		},		//文件上传进度
					  onUploadSuccess: option.onUploadSuccess,		//文件上传成功时
					  onUploadError: option.onUploadError,		//文件上传失败时,
					  onUploadComplete: option.onUploadComplete,		//文件全部上传完毕时
					  
					  /* 开发参数和内置方法分界线 */
					  
					  //获取选择文件，file控件或拖放
					  funGetFiles: function(e) {
								  
						  // 获取文件列表对象
						  var files = e.target.files || e.dataTransfer.files;
						  //继续添加文件
						  files = this.filter(files)
						  this.fileFilter.push(files);
						  this.funDealFiles(files);
						  return this;
					  },
					  
					  //选中文件的处理与回调
					  funDealFiles: function(files) {
						  var fileCount = _this.find('.filelist li').length;//队列中已经有的文件个数
						  for (var i = 0; i<this.fileFilter.length; i++) {
							  for(var j=0;j<this.fileFilter[i].length;j++){	
								 var file = this.fileFilter[i][j];	  
								 //增加唯一索引值
							  	 file.index = ++fileCount;
							  }
						  }
						  //执行选择回调
						  this.onSelect(files);
						  
						  return this;
					  },
					  
					  //删除对应的文件
					  funDeleteFile: function(index) {

						  for (var i = 0; i<this.fileFilter.length; i++) {
							  for(var j=0; j<this.fileFilter[i].length; j++){
								  var file = this.fileFilter[i][j];
								  if (file.index == index) {
									  this.fileFilter[i].splice(j,1);
									  this.onDelete(index);	
								  }
							  }
						  }
						  return this;
					  },
					  
					  //文件上传
					  funUploadFile: function(file,xhr1) {
						  var self = this;	  
						  //xhr = xhr1;
						  (function(file) {
							  $('#'+file.index+'Dirfile').removeClass('status-prepare').addClass('status-uploading');
							  if (xhr1.upload) {
								  
								  // 上传中
								  xhr1.upload.addEventListener("progress", function(e) {
									  self.onProgress(file, e.loaded, e.total);
								  }, false);
					  
								  // 文件上传成功或是失败
								  xhr1.onreadystatechange = function(e) {
									  if (xhr1.readyState == 4) {
										  var json = eval("(" + xhr1.responseText + ")");
										  if (json.respCode == "1") {
											  //self.onUploadSuccess(file, xhr.responseText);
											  $('#'+file.index+'Dirfile').removeClass('status-uploading').addClass('status-success');
											  //setTimeout(function(){ZXXFILE.onDelete(file.index);},option.removeTimeout);
											  flashContent();
											  $(".QxJxtg").removeClass('cazEfA');
											  //self.onUploadComplete();	
											  
										  } else if(json.respCode == "0"){
											  $('#'+file.index+'Dirfile').removeClass('status-uploading').addClass('status-error');
											  //self.onUploadError(file, xhr.responseText);		
										  }
									  }
								  };
								  
					  			  option.onUploadStart();	
								  // 开始上传
					  			var fid = new Date().getTime();
								  var formData = new FormData();
								  var parentPath = ""
								  formData.append('file', file);
								  formData.append('token',$.cookie('token'));
								  formData.append('uid',$.cookie('uid'));
								  formData.append('fid',fid);
								  if(location.href.indexOf("path=")>=0){
									  parentPath = location.href.split("path=")[1];
								  }else{
									  parentPath = "/"
								  }
								  formData.append('parentPath',parentPath)
								  function get_filemd5sum(ofile,ofid,xhr1) {
									  var xhr = xhr1;
									  var file = ofile;
									  var fid = ofid;
									  var tmp_md5;
									  var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
									  // file = this.files[0],
									  chunkSize = 80971520, // Read in chunks of 20MB
									  chunks = Math.ceil(file.size / chunkSize),
									  currentChunk = 0,
									  spark = new SparkMD5.ArrayBuffer(),
									  fileReader = new FileReader();
									  loadNext();
									  if(file.size<809715200){
										  fileReader.onload = function(e) {
											  // console.log('read chunk nr', currentChunk + 1, 'of', chunks);
											  spark.append(e.target.result); // Append array buffer
											  currentChunk++;
											  var md5_progress = Math.floor((currentChunk / chunks) * 100);
											  
											  console.log(file.name + "  正在处理，请稍等," + "已完成" + md5_progress + "%");
											  // if (currentChunk < chunks) {
											  // } else {
											  tmp_md5 = spark.end();
											  console.log(tmp_md5)
											  fileReader.abort();
											  $.ajax({
												  url : "http://139.199.116.162:8083/rest/md5check",
												  type : "post",
												  data : {"md5":tmp_md5,"fid":fid,"token":$.cookie('token')},
												  xhrFields : {
													  withCredentials : true
												  },
												  crossDomain : true,
												  dataType : "json", //指定服务器返回的数据类型
												  success : function(data) {
													  //alert(data)
													  if (data.respCode==1) {
														  $.ajax({
															  url : "http://139.199.116.162:8083/rest/uploadFileSpe",
															  type : "post",
															  data : {"uid":$.cookie('uid'),"md5":tmp_md5,"token":$.cookie('token'),"fileName":file.webkitRelativePath,"fid":fid,"parentPath":parentPath},
															  xhrFields : {
																  withCredentials : true
															  },
															  crossDomain : true,
															  dataType : "json", //指定服务器返回的数据类型
															  success : function(data) {
																  if (data.respCode==1) {
																	  $('#'+file.index+'Dirfile').removeClass('status-uploading').addClass('status-success'); 
																	  flashContent();
																	  $(".QxJxtg").removeClass('cazEfA');
																  } else {
																	  $('#'+file.index+'Dirfile').removeClass('status-uploading').addClass('status-error');
																  }
															  },error:function(){
																  $('#'+file.index+'Dirfile').removeClass('status-uploading').addClass('status-error'); 
															  }
														  });
													  } else {
														  xhr.open("POST", self.url, true);
														  xhr.setRequestHeader("withCredentials", true);
														  xhr.setRequestHeader("crossDomain", true);
														  xhr.send(formData);
													  }
												  },error:function(){
													  $('#'+file.index+'Dirfile').removeClass('status-uploading').addClass('status-error'); 
												  }
											  });
										  };
									  }else{
										  xhr.open("POST", self.url, true);
										  xhr.setRequestHeader("withCredentials", true);
										  xhr.setRequestHeader("crossDomain", true);
										  xhr.send(formData);
										  fileReader.onload = function(e) {
											  // console.log('read chunk nr', currentChunk + 1, 'of', chunks);
											  spark.append(e.target.result); // Append array buffer
											  currentChunk++;
											  var md5_progress = Math.floor((currentChunk / chunks) * 100);
											  
											  console.log(file.name + "  正在处理，请稍等," + "已完成" + md5_progress + "%");
											  // if (currentChunk < chunks) {
											  loadNext();
											  // } else {
											  tmp_md5 = spark.end();
											  console.log(tmp_md5)
											  fileReader.abort();
											  $.ajax({
												  url : "http://139.199.116.162:8083/rest/md5check",
												  type : "post",
												  data : {"md5":tmp_md5,"fid":fid,"token":$.cookie('token')},
												  xhrFields : {
													  withCredentials : true
												  },
												  crossDomain : true,
												  dataType : "json", //指定服务器返回的数据类型
												  success : function(data) {
													  alert(data);
													  if (data.respCode==1) {
														  xhr.above();
														  $.ajax({
															  url : "http://139.199.116.162:8083/rest/uploadFileSpe",
															  type : "post",
															  data : {"uid":$.cookie('uid'),"md5":tmp_md5,"token":$.cookie('token'),"fileName":file.webkitRelativePath,"fid":fid,"parentPath":parentPath},
															  xhrFields : {
																  withCredentials : true
															  },
															  crossDomain : true,
															  dataType : "json", //指定服务器返回的数据类型
															  success : function(data) {
																  if (data.respCode==1) {
																	   $('#'+file.index+'Dirfile').removeClass('status-uploading').addClass('status-success');
																	   flashContent();
																	   $(".QxJxtg").removeClass('cazEfA');
																  } else {
																	   $('#'+file.index+'Dirfile').removeClass('status-uploading').addClass('status-error');
																  }
															  },error:function(){
																  $('#'+file.index+'Dirfile').removeClass('status-uploading').addClass('status-error'); 
															  }
														  });
													  } else {
														  $('#'+file.index+'Dirfile').removeClass('status-uploading').addClass('status-error');
													  }
												  },error:function(){
													  $('#'+file.index+'Dirfile').removeClass('status-uploading').addClass('status-error'); 
												  }
											  });
										  };
									  }
									  
									  fileReader.onerror = function() {
										  console.warn('oops, something went wrong.');
									  };
									  
									  function loadNext() {
										  //var start = currentChunk * chunkSize,
										  //end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
										  fileReader.readAsArrayBuffer(blobSlice.call(file, 0, chunkSize));
									  }
									  //loadNext();
								  }
								  get_filemd5sum(file,fid,xhr1);
							  }	
						  })(file);	
							  
					  },
					  
					  init: function() {
						  var self = this;
						  //文件选择控件选择
						  if (this.fileInput) {
							  this.fileInput.addEventListener("change", function(e) { self.funGetFiles(e); }, false);	
						  }
						  
						  _this.find('#uploadfilebtn1').live('click',function(){
							  _this.find('.uploadfile1').trigger('click');
							  });
						  
						  option.onInit();
					  }
				  };
		  //初始化文件对象
		  ZXXFILE.init();
		  ZXXFILE1.init();
		
		
		}); 
	}	
	
})(jQuery)