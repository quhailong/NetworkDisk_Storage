$(document).ready(function () {
    loadImg();
    $("button").data("data-button-id", "b9").mouseenter(function () {
        $(this).parent().addClass("button-open")
    });
    $("button").data("data-button-id", "b9").mouseleave(function () {
        setTimeout(function () {
            if ($(".menu").hasClass("abdd")) {
            } else {
                $(".menu").parent().removeClass("button-open")
            }
        }, 200)
    });
    $(".menu").mouseover(function () {
        $(this).addClass("abdd")
    });
    $(".menu").mouseleave(function () {
        $(this).removeClass("abdd");
        $(this).parent().removeClass("button-open")
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
    $("[class='dialog-icon dialog-min icon icon-minimize']").click(function () {
        $(".dialog-body").css("display", "none");
        $(".dialog-header").css("display", "none");
        $(".dialog-min-header").css("display", "block")
    });
    $("[class='dialog-icon dialog-back icon icon-maximizing']").click(function () {
        $(".dialog-body").css("display", "block");
        $(".dialog-header").css("display", "block");
        $(".dialog-min-header").css("display", "none")
    });
    $("[class='dialog-icon dialog-close icon icon-close']").click(function () {
        $("#uploaderList").children().remove();
        $("#web-uploader").css("display", "none")
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
            $.get(CORE_GATEWAY_URL + "/api/edge/getpublickey", function(data){
                $("#publicKey").val(data.respData);
            });
        }
    });
    $("#newPassword").blur(function () {
        $(this).removeClass("input-focus")
    });
    $("#copy").click(function () {
        $("#HEEWq").html("复制到");
        $(".treeview-root").siblings("ul").empty();
        $("a[data-button-id='b79']").attr("id", "copyOK");
        if ($(".treeview-root").siblings("ul").text() == "") {
            loadFolder("/")
        }
        $(".module-canvas").css("display", "inline-block");
        $("#fileTreeDialog").css("display", "inline-block")
    });
    $("a[data-button-id='b79']").click(function () {
        var a = $("#shareInfo").val();
        save(a, $(".treeview-node-on").children("span").children("span").attr("data-file-path"))
    });
    $("#downloadShare").click(function () {
        var a = $("#shareInfo").val();
        downloadShare(a)
    })
});