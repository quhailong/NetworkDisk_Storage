$(document).ready(function () {
    $(".module-aside li").click(ajax);
    loadImg();
    loadCapacity();
    loadContent();
    init();
    var a = 900;
    $(".NHcGw").scroll(function () {
        var b = $(".NHcGw").scrollTop();
        var c = $("div[class='list bEMOyf']").height() - b - $(".NHcGw").height();
        var d = $(".loaded").text();
        if (c <= a && d.indexOf("已加载") >= 0) {
            $(".loaded").html("获取更多数据...");
            loadContent1(d.replace(/[^0-9]/ig, "") / 100 + 1)
        }
    });
    $(".fydGNC").click(function (b) {
        b.stopPropagation();
        if ($(this).parent().hasClass("EzubGg")) {
            $(this).parent().removeClass("EzubGg");
            $(".QxJxtg").removeClass("cazEfA");
            $("div[class='item global-clearfix anW01r']").removeClass("anW01r")
        } else {
            $(this).parent().addClass("EzubGg");
            $(".QxJxtg").addClass("cazEfA");
            $("div.item").addClass("anW01r")
        }
        $("div.copy-bar").css("display", "none");
        count()
    });
    $(".DIcOFyb").mouseenter(function () {
        $(".DIcOFyb").addClass("mouseon")
    });
    $(".DIcOFyb").mouseleave(function () {
        setTimeout(function () {
            if ($(".PvsOgyb").hasClass("abd")) {
            } else {
                $(".DIcOFyb").removeClass("mouseon")
            }
        }, 200)
    });
    $(".PvsOgyb").mouseover(function () {
        $(".PvsOgyb").addClass("abd")
    });
    $(".PvsOgyb").mouseleave(function () {
        $(".PvsOgyb").removeClass("abd");
        $(".DIcOFyb").removeClass("mouseon")
    });
    $(".dialog-control").click(function () {
        $(".module-canvas").css("display", "none");
        $("#fileTreeDialog").css("display", "none");
        $("div[class='dialog dialog-share   dialog-gray']").css("display", "none");
        $(".create-link").removeClass("private-link has-create");
        $(".create-link").removeClass("public-link has-create");
        $("#createShare").css("display", "block");
        $("#cel").html("取消")
    });
    $("#cel").click(function () {
        $(".module-canvas").css("display", "none");
        $("div[class='dialog dialog-share   dialog-gray']").css("display", "none");
        $(".create-link").removeClass("private-link has-create");
        $(".create-link").removeClass("public-link has-create");
        $("#createShare").css("display", "block");
        $("#cel").html("取消")
    });
    $("a[data-button-id='b77']").click(function () {
        $(".module-canvas").css("display", "none");
        $("#fileTreeDialog").css("display", "none")
    });
    $("#newPassword").focus(function () {
        if (!$(this).hasClass("input-focus")) {
            $(this).addClass("input-focus");
            $.get(CORE_GATEWAY_URL + "/api/edge/getpublickey", function (data) {
                if (data.respCode === 1) {
                    $("#publicKey").val(data.respData);
                } else {
                    alert(data.respMsg);
                }
            });
        }
    });
    $("#newPassword").blur(function () {
        $(this).removeClass("input-focus")
    });
    $("#unShare").click(function () {
        var b = new Array();
        $(".anW01r").each(function () {
            b.push($(this).attr("data-id"))
        });
        unShare(b)
    })
});