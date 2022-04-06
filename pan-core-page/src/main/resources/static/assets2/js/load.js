$(document).ready(function () {
    $(".module-aside li").click(ajax);
    $(".FuIxtL a").live("click", abced);
    $(window).on("popstate", function () {
        changeContent()
    });
    loadImg();
    loadCapacity();
    changeContent();
    $(".fydGNC").click(function (event) {
        event.stopPropagation();
        if ($(this).parent().hasClass("EzubGg")) {
            $(this).parent().removeClass("EzubGg");
            $(".vdAfKMb").find("dd").removeClass("anW01r");
            $(".QxJxtg").removeClass("cazEfA");
            $(".tcuLAu").css("display", "inline-block");
            $(".QDDOQB").css("display", "none")
        } else {
            $(this).parent().addClass("EzubGg");
            $(".vdAfKMb").find("dd").addClass("anW01r");
            $(".QxJxtg").addClass("cazEfA");
            $(".tcuLAu").css("display", "none");
            $(".QDDOQB").css("display", "inline-block")
        }
        count()
    });
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
    $("#up").html5uploader({
        auto: true,
        multi: true,
        removeTimeout: 999999999,
        url: CORE_FILE_GATEWAY_URL + "/api/file/uploadfile",
        onUploadStart: function () {
            $("#web-uploader").css("display", "block")
        },
        onInit: function () {
        },
        onUploadComplete: function () {
        }
    });
    $("#createDirButton").click(function () {
        $("#changeBd1").empty();
        $("#changeBd1").prepend("请输入文件夹名称<input id='GHJDI1' type='text' class='am-modal-prompt-input'>");
        $("#my-prompt1").modal({
            closeViaDimmer: 0, onConfirm: function (e) {
                var inputText = $("#GHJDI1").val();
                if (inputText.length < 20 && inputText.match(/^[a-zA-Z0-9\u4e00-\u9fa5_]+$/) != null) {
                    $.ajax({
                        url: CORE_GATEWAY_URL + "/api/core/createdir",
                        type: "post",
                        data: JSON.stringify({
                            "uid": $.cookie("uid"),
                            "dirName": inputText,
                            "parentPath": decodeURIComponent(location.href.split("path=")[1])
                        }),
                        contentType: 'application/json;charset=UTF-8',
                        xhrFields: {withCredentials: true},
                        crossDomain: true,
                        dataType: "json",
                        success: function (data) {
                            if (data.respCode === 1) {
                                $(".QxJxtg").removeClass("cazEfA");
                                flashContent()
                            } else {
                                alert(data.respMsg)
                            }
                            $(".am-modal-prompt-input").val("")
                        },
                        error: function (data) {
                            alert(data.respMsg);
                            $(".am-modal-prompt-input").val("")
                        }
                    })
                } else {
                    alert("文件夹长度必须小于20，并且不能包含特殊字符，只能为数字、字母、中文、下划线");
                    $(".am-modal-prompt-input").val("")
                }
            }, onCancel: function (e) {
                $(".am-modal-prompt-input").val("")
            }
        })
    });
    $("#rename").click(function () {
        var chooseNum = $(".anW01r").attr("_position");
        $("#changeBd").empty();
        $("#changeBd").prepend("请输入文件名称<input id='GHJDI' type='text' class='am-modal-prompt-input'>");
        var content = historyMap.get(location.href);
        var vid = eval($.parseJSON(content[chooseNum])).uuid;
        var fileType = eval($.parseJSON(content[chooseNum])).addrType;
        if (fileType != 0) {
            $("#renameInput").val(eval($.parseJSON(content[chooseNum])).fileName.substring(0, eval($.parseJSON(content[chooseNum])).fileName.lastIndexOf(".")))
        } else {
            $("#renameInput").val(eval($.parseJSON(content[chooseNum])).fileName)
        }
        $("#my-prompt").modal({
            closeViaDimmer: 0, onConfirm: function (e) {
                var chooseNum = $(".anW01r").attr("_position");
                var inputText = $("#GHJDI").val();
                var content = historyMap.get(location.href);
                var vid = eval($.parseJSON(content[chooseNum])).uuid;
                var fileType = eval($.parseJSON(content[chooseNum])).addrType;
                if (inputText == eval($.parseJSON(content[chooseNum])).fileName.substring(0, eval($.parseJSON(content[chooseNum])).fileName.lastIndexOf(".")) && fileType != 0 || inputText == eval($.parseJSON(content[chooseNum])).fileName && fileType == 0) {
                } else {
                    if (inputText.length < 50 && inputText.match(/^[a-zA-Z0-9\u4e00-\u9fa5_()]+$/) != null) {
                        $.ajax({
                            url: CORE_GATEWAY_URL + "/api/core/renamefileordir",
                            type: "put",
                            data: JSON.stringify({
                                "uid": $.cookie("uid"),
                                "newName": inputText,
                                "parentPath": location.href.split("path=")[1],
                                "vid": vid
                            }),
                            contentType: 'application/json;charset=UTF-8',
                            xhrFields: {withCredentials: true},
                            crossDomain: true,
                            dataType: "json",
                            success: function (data) {
                                if (data.respCode === 50000) {
                                    $("#my-confirm1").modal({
                                        closeViaDimmer: 0, onConfirm: function (options) {
                                            $.ajax({
                                                url: CORE_GATEWAY_URL + "/api/core/renamefileordir",
                                                type: "put",
                                                data: JSON.stringify({
                                                    "uid": $.cookie("uid"),
                                                    "newName": inputText,
                                                    "vid": eval($.parseJSON(content[chooseNum])).uuid,
                                                    "flag": "force"
                                                }),
                                                contentType: 'application/json;charset=UTF-8',
                                                xhrFields: {withCredentials: true},
                                                crossDomain: true,
                                                dataType: "json",
                                                success: function (data) {
                                                    if (data.respCode === 1) {
                                                        alert(data.respMsg);
                                                        flashContent();
                                                        $(".QxJxtg").removeClass("cazEfA");
                                                        $(".tcuLAu").css("display", "inline-block");
                                                        $(".QDDOQB").css("display", "none")
                                                    }
                                                },
                                                error: function (data) {
                                                    alert(data.respMsg);
                                                    $(".am-modal-prompt-input").val("")
                                                }
                                            })
                                        }, onCancel: function () {
                                        }
                                    })
                                } else {
                                    if (data.respCode === 1) {
                                        alert(data.respMsg);
                                        flashContent();
                                        $(".QxJxtg").removeClass("cazEfA");
                                        $(".tcuLAu").css("display", "inline-block");
                                        $(".QDDOQB").css("display", "none")
                                    } else {
                                        alert(data.respMsg)
                                    }
                                }
                                $(".am-modal-prompt-input").val("")
                            },
                            error: function () {
                                alert("服务器错误，重命名失败");
                                $(".am-modal-prompt-input").val("")
                            }
                        })
                    } else {
                        alert("文件名长度必须小于50，并且不能包含特殊字符，只能为数字、字母、中文、下划线、括号");
                        $(".am-modal-prompt-input").val("")
                    }
                }
            }, onCancel: function (e) {
                $(".am-modal-prompt-input").val("")
            }
        })
    });
    var range = 900;
    $(".NHcGw").scroll(function () {
        var srollPos = $(".NHcGw").scrollTop();
        var srollLow = $(".vdAfKMb").height() - srollPos - $(".NHcGw").height();
        var symbol = $(".FcucHsb").text();
        if (srollLow <= range && symbol.indexOf("已加载") >= 0) {
            $(".FcucHsb").html("获取更多数据...");
            if (location.href.indexOf("search?key=") != -1) {
                loadContent3(decodeURI(location.href.split("search?key=")[1]), symbol.replace(/[^0-9]/ig, "") / 100 + 1)
            } else {
                loadContent1(symbol.replace(/[^0-9]/ig, "") / 100 + 1)
            }
        }
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
    $("#move").click(function () {
        $("#HEEWq").html("移动到");
        $(".treeview-root").siblings("ul").empty();
        $("a[data-button-id='b79']").attr("id", "moveOK");
        if ($(".treeview-root").siblings("ul").text() == "") {
            loadFolder("/")
        }
        $(".module-canvas").css("display", "inline-block");
        $("#fileTreeDialog").css("display", "inline-block")
    });
    $(".dialog-control").click(function () {
        $(".module-canvas").css("display", "none");
        $("#fileTreeDialog").css("display", "none");
        $("div[class='dialog dialog-share   dialog-gray']").css("display", "none");
        $(".create-link").removeClass("private-link has-create");
        $(".create-link").removeClass("public-link has-create");
        $("#createShare").css("display", "block");
        $("#cel").children("span").children("span").html("取消")
    });
    $("#cel").click(function () {
        $(".module-canvas").css("display", "none");
        $("div[class='dialog dialog-share   dialog-gray']").css("display", "none");
        $(".create-link").removeClass("private-link has-create");
        $(".create-link").removeClass("public-link has-create");
        $("#createShare").css("display", "block");
        $("#cel").children("span").children("span").html("取消")
    });
    $("a[data-button-id='b77']").click(function () {
        $(".module-canvas").css("display", "none");
        $("#fileTreeDialog").css("display", "none")
    });
    $("a[data-button-id='b79']").click(function () {
        var chooseNum = new Array();
        $(".anW01r").each(function () {
            chooseNum.push($(this).attr("_position"))
        });
        copyAndMove($(this).attr("id"), chooseNum, $(".treeview-node-on").children("span").children("span").attr("data-file-path"))
    });
    $("#copyShare").click(function () {
        if ($("#flaga").hasClass("public-link")) {
            var Url2 = document.getElementById("share-url");
            Url2.select();
            document.execCommand("Copy");
            alert("已复制好，可贴粘。")
        } else {
            var Url1 = document.getElementById("copyPrivate");
            Url1.select();
            document.execCommand("Copy");
            alert("已复制好，可贴粘。")
        }
    });
    $("#del").click(function () {
        $("#my-confirm2").modal({
            closeViaDimmer: 0, onConfirm: function (options) {
                var chooseNum = new Array();
                $(".anW01r").each(function () {
                    chooseNum.push($(this).attr("_position"))
                });
                var content = historyMap.get(location.href);
                var vids = new Array();
                for (var index in chooseNum) {
                    var contentVal = eval($.parseJSON(content[chooseNum[index]]));
                    vids.push(contentVal.uuid)
                }
                $.ajax({
                    url: CORE_GATEWAY_URL + "/api/core/deletefile",
                    type: "delete",
                    data: {"uid": $.cookie("uid"), "vids": JSON.stringify(vids)},
                    xhrFields: {withCredentials: true},
                    crossDomain: true,
                    dataType: "json",
                    success: function (data) {
                        if (data.respCode === 1) {
                            alert(data.respMsg);
                            flashContent();
                            $(".QxJxtg").removeClass("cazEfA");
                            $(".tcuLAu").css("display", "inline-block");
                            $(".QDDOQB").css("display", "none");
                            $("#filename").removeClass("EzubGg")
                        }
                    },
                    error: function (data) {
                        alert(data.respMsg)
                    }
                })
            }, onCancel: function () {
            }
        })
    });
    $(".am-icon-search").click(function () {
        var key = $.trim($(".xdeE2Ga").val());
        if (key != "") {
            var query = location.href.split("#/")[0];
            history.pushState(null, "", query + "#/search?key=" + key);
            ajax2(key)
        }
    });
    $("#download").click(function () {
        var chooseNum = new Array();
        $(".anW01r").each(function () {
            chooseNum.push($(this).attr("_position"))
        });
        download(chooseNum)
    });
    $("#newPassword").focus(function () {
        if (!$(this).hasClass("input-focus")) {
            $(this).addClass("input-focus");
            $.get(CORE_GATEWAY_URL + "/api/edge/getpublickey", function (data) {
                if (data.respCode === 1) {
                    $("#publicKey").val(data.respData);
                } else {
                    alert(data.respMsg)
                }
            });
        }
    });
    $("#newPassword").blur(function () {
        $(this).removeClass("input-focus")
    });
    $("#share").click(function () {
        var fileName = eval($.parseJSON(historyMap.get(location.href)[$(".anW01r").attr("_position")])).fileName;
        if ($(".anW01r").length > 1) {
            $("#shareTxt").html("分享文件：" + fileName + "等")
        } else {
            $("#shareTxt").html("分享文件：" + fileName)
        }
        $("div[class='dialog dialog-share   dialog-gray']").css("display", "block");
        $(".module-canvas").css("display", "inline-block")
    });
    $("#createShare").click(function () {
        var chooseNum = new Array();
        $(".anW01r").each(function () {
            chooseNum.push($(this).attr("_position"))
        });
        createShare(chooseNum)
    });
    $("#sharePage").click(function () {
        location.href = CORE_PAGE_URL + "/share/manage"
    })
});