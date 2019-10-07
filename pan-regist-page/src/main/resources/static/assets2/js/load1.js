$(document).ready(
			function() {
				//添加链接的处理事件
				$(".module-aside li").click(ajax);
				loadImg();
				loadContent();
				init();
				//全选
				var range = 900;             //距下边界长度/单位px  
		        $(".NHcGw").scroll(function(){
		            var srollPos = $(".NHcGw").scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)  
		            var srollLow = $("div[class='list bEMOyf']").height()-srollPos-$(".NHcGw").height();
		            var symbol = $(".loaded").text();
		            if(srollLow <= range && symbol.indexOf("已加载")>=0) {
		            	$(".loaded").html("获取更多数据...");
		            		loadContent1(symbol.replace(/[^0-9]/ig,"")/100 +1);
		            }  
		        });
				$(".fydGNC").click(function(event) {
					event.stopPropagation();
					if ($(this).parent().hasClass('EzubGg')) {
						$(this).parent().removeClass('EzubGg');
						$(".QxJxtg").removeClass('cazEfA');
						$("div[class='item global-clearfix anW01r']").removeClass("anW01r");
					} else {
						$(this).parent().addClass('EzubGg');
						$(".QxJxtg").addClass('cazEfA');
						$("div.item").addClass("anW01r");
					}
					$("div.copy-bar").css("display","none");
					count();
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
					$(".dialog-control").click(function(){
						$(".module-canvas").css("display","none");
						$("#fileTreeDialog").css("display","none");
						$("div[class='dialog dialog-share   dialog-gray']").css("display","none");
						$(".create-link").removeClass("private-link has-create");
						$(".create-link").removeClass("public-link has-create");
						 $("#createShare").css("display","block");
						 $("#cel").html("取消");
					});
					$("#cel").click(function(){
						$(".module-canvas").css("display","none");
						$("div[class='dialog dialog-share   dialog-gray']").css("display","none");
						$(".create-link").removeClass("private-link has-create");
						$(".create-link").removeClass("public-link has-create");
						 $("#createShare").css("display","block");
						 $("#cel").html("取消");
					});
					$("a[data-button-id='b77']").click(function(){
						$(".module-canvas").css("display","none");
						$("#fileTreeDialog").css("display","none");
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
					$("#unShare").click(function(){
						var chooseNum = new Array();
						$(".anW01r").each(function(){
							chooseNum.push($(this).attr('data-id'));
						});
						unShare(chooseNum);
					});
			});