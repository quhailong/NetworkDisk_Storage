$(document).ready(
			function() {
				loadImg();
				//全选
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
					$("#cel").click(function(){
						$(".module-canvas").css("display","none");
						$("div[class='dialog dialog-share   dialog-gray']").css("display","none");
						$(".create-link").removeClass("private-link has-create");
						$(".create-link").removeClass("public-link has-create");
						 $("#createShare").css("display","block");
						 $("#cel").html("取消");
					});
					$("#newPassword").focus(function() {
						if (!$(this).hasClass("input-focus")) {
							$(this).addClass("input-focus");
							$.get("http://passport.727pan.cn/cgi/getPublickKey", function(data) {
								$("#publicKey").val(data.respMap.publicKey);
								$("#RSAKey").val(data.respMap.RSAKey);
							});
						}
					});
					$("#newPassword").blur(function() {
						$(this).removeClass("input-focus");
					});
			});