var historyMap = new Map();
var finishMap = new Map();
var folderMap = new Map();

function flashContent() {
    $(".vdAfKMb").empty();
    historyMap.clear();
    finishMap.clear();
    history.pushState(null, "", location.href);
    if (location.href.indexOf("search?key=") != -1) {
        loadContent2(decodeURI(location.href.split("search?key=")[1]))
    } else {
        loadContent()
    }
}

function exit() {
    $("#my-confirm").modal({
        closeViaDimmer: 0, onConfirm: function (b) {
            $.ajax({
                url: CORE_GATEWAY_URL + "/api/user/logout?token=" + $.cookie("token"),
                type: "GET",
                xhrFields: {withCredentials: true},
                crossDomain: true,
                success: function (data) {
                    if (data.respCode === 1) {
                        location.href = CORE_PAGE_URL
                    } else {
                        alert(data.respMsg)
                    }
                }
            })
        }, onCancel: function () {
        }
    })
}

function changePwd() {
    var a = $("#changePwd").modal({
        closeViaDimmer: 0, onConfirm: function (b) {
            var f = $("input[name='newPassword']").val();
            var d = $("input[name='repeatPassword']").val();
            if (f != "" && f == d) {
                var e = new JSEncrypt();
                e.setPublicKey($("#publicKey").val());
                var c = e.encrypt(f);
                $.ajax({
                    url: CORE_GATEWAY_URL + "/api/edge/regcheckpwd",
                    type: "post",
                    data: {"password": c, "publicKey": $("#publicKey").val()},
                    xhrFields: {withCredentials: true},
                    crossDomain: true,
                    dataType: "json",
                    success: function (data) {
                        if (data.respCode === 0) {
                            $(".am-modal-prompt-input").val("");
                            alert(data.respMsg)
                        } else {
                            $.ajax({
                                url: CORE_GATEWAY_URL + "/api/user/changepwd",
                                type: "post",
                                data: JSON.stringify({
                                    "token": $.cookie("token"),
                                    "newPassword": c,
                                    "uid": $.cookie("uid"),
                                    "publicKey": $("#publicKey").val()
                                }),
                                xhrFields: {withCredentials: true},
                                crossDomain: true,
                                contentType: 'application/json;charset=UTF-8',
                                dataType: "json",
                                success: function (data) {
                                    if (data.respCode === 1) {
                                        alert(data.respMsg);
                                        location.href = CORE_PAGE_URL
                                    }
                                },
                                error: function (data) {
                                    alert(data.respMsg)
                                }
                            })
                        }
                    }
                })
            }
        }, onCancel: function () {
            $(".am-modal-prompt-input").val("");
            $("#changePwd").modal("close")
        }
    });
    a.find("[data-am-modal-cancel]").off("click.close.modal.amui");
    a.find("[data-am-modal-confirm]").off("click.close.modal.amui")
}

function getFileUrl(b) {
    var a;
    if (navigator.userAgent.indexOf("MSIE") >= 1) {
        a = document.getElementById(b).value
    } else {
        if (navigator.userAgent.indexOf("Firefox") > 0) {
            a = window.URL.createObjectURL(document.getElementById(b).files.item(0))
        } else {
            if (navigator.userAgent.indexOf("Chrome") > 0) {
                a = window.URL.createObjectURL(document.getElementById(b).files.item(0))
            }
        }
    }
    return a
}

function preImg(d, b) {
    $("#photo").css("display", "inline-block");
    var a = getFileUrl(d);
    var c = document.getElementById(b);
    c.src = a
}

function uploadPic() {
    $("#photo").css("display", "none");
    var a = $("#uploadPic").modal({
        closeViaDimmer: 0, onConfirm: function (c) {
            var d = $("#pic").get(0).files[0];
            var b = d.size;
            var g = 1048576;
            var e = d.name.substring(d.name.lastIndexOf(".") + 1, d.name.length).toUpperCase();
            if (e != "PNG" && e != "GIF" && e != "JPG" && e != "JPEG" && e != "BMP") {
                alert("文件类型错误,请上传图片类型");
                return false
            } else {
                if (parseInt(b) >= parseInt(g)) {
                    alert("上传的文件不能超过1MB");
                    return false
                } else {
                    var f = new FormData();
                    f.append("uid", $.cookie("uid"));
                    f.append("file", d);
                    $.ajax({
                        url: CORE_GATEWAY_URL + "/api/user/uploadpic",
                        type: "post",
                        contentType: false,
                        data: f,
                        cache: false,
                        processData: false,
                        xhrFields: {withCredentials: true},
                        crossDomain: true,
                        dataType: "json",
                        success: function (data) {
                            if (data.respCode === 1) {
                                alert(data.respMsg);
                                loadImg();
                                $("#uploadPic").modal("close")
                            } else {
                                alert(data.respMsg)
                            }
                        },
                        error: function (data) {
                            alert(data.respMsg)
                        }
                    })
                }
            }
        }, onCancel: function () {
            $(".am-modal-prompt-input").val("");
            $("#uploadPic").modal("close")
        }
    });
    a.find("[data-am-modal-cancel]").off("click.close.modal.amui");
    a.find("[data-am-modal-confirm]").off("click.close.modal.amui")
}

function loadImg() {
    $.ajax({
        url: CORE_GATEWAY_URL + "/api/user/loadimg?uid=" + $.cookie("uid"),
        type: "GET",
        xhrFields: {withCredentials: true},
        crossDomain: true,
        success: function (data) {
            if (data.respCode === 1) {
                $(".user-photo").css("background-image", "url(" + FILE_URL + "/" + data.respData + ")")
            } else {
                alert(data.respMsg);
            }
        },
        error: function (data) {
            alert(data.respMsg);
        }
    })
}

function loadFolder(b, c) {
    var a = folderMap.get(b);
    if (a == null) {
        $.ajax({
            url: CORE_GATEWAY_URL + "/api/core/listfolder",
            type: "get",
            data: {"uid": $.cookie("uid"), "parentPath": b,},
            xhrFields: {withCredentials: true},
            crossDomain: true,
            dataType: "json",
            success: function (data) {
                if (data.respCode === 1) {
                    var d = data.respData;
                    folderMap.set(b, d);
                    if (b == "/") {
                        showFolder(d, $(".treeview-root"))
                    } else {
                        showFolder(d, c)
                    }
                } else {
                    alert(data.respMsg)
                }
            }
        })
    } else {
        if (b == "/") {
            showFolder(a, $(".treeview-root"))
        } else {
            showFolder(a, c)
        }
    }
}

function showFolder(content, obj) {
    for (var key in content) {
        var contentVal = eval($.parseJSON(content[key]));
        if (contentVal.dir_empty == 0) {
            obj.siblings("ul").append("<li><div class='treeview-node treenode-empty' data-padding-left='" + (parseInt(obj.attr("data-padding-left")) + 15) + "' style='padding-left:" + (parseInt(obj.attr("data-padding-left")) + 15) + "px'><span class='treeview-node-handler'><em class='b-in-blk plus icon-operate '></em><dfn class='b-in-blk treeview-ic treeview-dir'></dfn><span class='treeview-txt' data-file-path='" + contentVal.path + "'>" + contentVal.path.substring(contentVal.path.lastIndexOf("/") + 1, contentVal.path.length) + "</span></span></div><ul class='treeview  treeview-content treeview-collapse' data-padding-left='30px'></ul></li>")
        } else {
            obj.siblings("ul").append("<li><div class='treeview-node' data-padding-left='" + (parseInt(obj.attr("data-padding-left")) + 15) + "' style='padding-left:" + (parseInt(obj.attr("data-padding-left")) + 15) + "px'><span class='treeview-node-handler'><em class='b-in-blk plus icon-operate '></em><dfn class='b-in-blk treeview-ic treeview-dir'></dfn><span class='treeview-txt' data-file-path='" + contentVal.path + "'>" + contentVal.path.substring(contentVal.path.lastIndexOf("/") + 1, contentVal.path.length) + "</span></span></div><ul class='treeview  treeview-content treeview-collapse' data-padding-left='30px'></ul></li>")
        }
    }
    $(".treeview-node").unbind();
    $(".treeview-node").live("mouseenter", function () {
        $(this).addClass("treeview-node-hover")
    });
    $(".treeview-node").live("mouseleave", function () {
        $(this).removeClass("treeview-node-hover")
    });
    $(".treeview-node").bind("click", function (e) {
        if (!$(this).hasClass("treeview-node-on") && !$(this).hasClass("treenode-empty")) {
            $(".treeview-node").removeClass("treeview-node-on");
            $(this).addClass("treeview-node-on");
            if (!$(this).siblings("ul").hasClass("treeview-collapse")) {
            } else {
                $(this).addClass("_minus");
                $(this).children("span").children("em").addClass("minus")
            }
            if ($(this).siblings("ul").text() == "" && !$(this).hasClass("treenode-empty")) {
                loadFolder($(this).children("span").children("span").attr("data-file-path"), $(this))
            } else {
                $(this).children("span").children("em").addClass("minus");
                $(this).siblings("ul").removeClass("treeview-collapse")
            }
            $(this).siblings("ul").removeClass("treeview-collapse")
        } else {
            if (!$(this).hasClass("treenode-empty")) {
                if ($(this).siblings("ul").hasClass("treeview-collapse")) {
                    $(this).addClass("_minus");
                    $(this).siblings("ul").removeClass("treeview-collapse");
                    $(this).children("span").children("em").addClass("minus")
                } else {
                    $(this).removeClass("_minus");
                    $(this).siblings("ul").addClass("treeview-collapse");
                    $(this).children("span").children("em").removeClass("minus")
                }
            } else {
                $(".treeview-node").removeClass("treeview-node-on");
                $(this).addClass("treeview-node-on")
            }
        }
    })
}

function save(a, b) {
    $.ajax({
        url: CORE_GATEWAY_URL + "/api/share/checklock",
        type: "get",
        data: {"shareId": a},
        xhrFields: {withCredentials: true},
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            if (data.respCode === 1) {
                if (data.respData === "Lock") {
                    $("#Lock1").modal({
                        closeViaDimmer: 0, onConfirm: function (f) {
                            var d = $("input[name='LockPassword1']").val();
                            $.ajax({
                                url: CORE_GATEWAY_URL + "/api/share/verifyklock",
                                type: "get",
                                data: {"shareId": a, "lockPassword": d},
                                xhrFields: {withCredentials: true},
                                crossDomain: true,
                                dataType: "json",
                                success: function (data) {
                                    if (data.respCode === 1) {
                                        saveShare(a, b, d)
                                    } else {
                                        alert("验证失败");
                                        $("input[name='LockPassword1']").val("")
                                    }
                                },
                                error: function (data) {
                                    $("input[name='LockPassword1']").val("");
                                    alert(data.respMsg)
                                }
                            })
                        }, onCancel: function (d) {
                        }
                    })
                } else {
                    saveShare(a, b, "")
                }
            } else {
                $("input[name='LockPassword1']").val("");
                alert(data.respMsg)
            }
        },
        error: function (data) {
            $("input[name='LockPassword1']").val("");
            alert(data.respMsg)
        }
    })
}

function saveShare(b, c, a) {
    $.ajax({
        url: CORE_GATEWAY_URL + "/api/share/saveshare",
        type: "post",
        data: JSON.stringify({"uid": $.cookie("uid"), "shareId": b, "dest": c, "lockPassword": a}),
        xhrFields: {withCredentials: true},
        contentType: 'application/json;charset=UTF-8',
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            if (data.respCode === 1) {
                alert(data.respMsg);
                $("input[name='LockPassword1']").val("");
                $("#fileTreeDialog").css("display", "none");
                $(".module-canvas").css("display", "none")
            } else {
                $("input[name='LockPassword1']").val("");
                alert(data.respMsg)
            }
        },
        error: function (data) {
            $("input[name='LockPassword1']").val("");
            alert(data.respMsg)
        }
    })
}

function downloadShare(a) {
    $.ajax({
        url: CORE_GATEWAY_URL + "/api/share/checklock",
        type: "get",
        data: {"shareId": a},
        xhrFields: {withCredentials: true},
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            if (data.respCode === 1) {
                if (data.respData === "Lock") {
                    $("#Lock").modal({
                        closeViaDimmer: 0, onConfirm: function (d) {
                            var c = $("input[name='LockPassword']").val();
                            $.ajax({
                                url: CORE_GATEWAY_URL + "/api/share/verifyklock",
                                type: "get",
                                data: {"shareId": a, "lockPassword": c},
                                xhrFields: {withCredentials: true},
                                crossDomain: true,
                                dataType: "json",
                                success: function (data) {
                                    if (data.respCode === 1) {
                                        download(a, c)
                                    } else {
                                        alert(data.respMsg);
                                        $("input[name='LockPassword']").val("")
                                    }
                                },
                                error: function (data) {
                                    $("input[name='LockPassword']").val("");
                                    alert(data.respMsg)
                                }
                            })
                        }, onCancel: function (c) {
                        }
                    })
                } else {
                    download(a, "")
                }
            } else {
                $("input[name='LockPassword']").val("");
                alert(data.respMsg)
            }
        },
        error: function (data) {
            $("input[name='LockPassword']").val("");
            alert(data.respMsg)
        }
    })
}

function download(d, c) {
    var e = $("<form id='abc'>");
    e.attr("style", "display:none");
    e.attr("method", "get");
    e.attr("action", CORE_FILE_GATEWAY_URL + "/api/file/downloadshare");
    var b = $("<input>");
    b.attr("type", "hidden");
    b.attr("name", "shareId");
    b.attr("value", d);
    var a = $("<input>");
    a.attr("type", "hidden");
    a.attr("name", "token");
    a.attr("value", $.cookie("token"));
    var f = $("<input>");
    f.attr("type", "hidden");
    f.attr("name", "lockPassword");
    f.attr("value", c);
    $("body").append(e);
    e.append(b);
    e.append(a);
    e.append(f);
    e.submit();
    e.empty()
};