var historyMap = new Map();
var finishMap = new Map();
var folderMap = new Map();

function abced() {
    if (location.href.indexOf("search?") == -1) {
        var d = decodeURI(location.href.split("path=")[1]);
        if ($(this).attr("data-deep") == "-1") {
            if (((d.split("/")).length - 1) == 1) {
                history.pushState(null, "", location.href.substring(0, location.href.lastIndexOf("/") + 1))
            } else {
                history.pushState(null, "", location.href.substring(0, location.href.lastIndexOf("/")))
            }
            changeContent()
        } else {
            if ($(this).attr("data-deep") == "0") {
                history.pushState(null, "", location.href.substring(0, location.href.lastIndexOf("path=/") + 6));
                changeContent()
            } else {
                var b = location.href;
                for (var c = 0; c < $(this).attr("data-deep"); c++) {
                    b = location.href.substring(0, location.href.lastIndexOf("/"))
                }
                history.pushState(null, "", decodeURI(b));
                changeContent()
            }
        }
    } else {
        var d = location.href.split("#/")[0];
        history.pushState(null, "", d + "#/all?path=/");
        $("[class='QAfdwP tvPMvPb'] li").removeClass("BEPxaPb");
        if ($("#new").length != 0) {
            $("[class='QAfdwP tvPMvPb'] li").last().remove()
        }
        $("[class='QAfdwP tvPMvPb'] li").last().css("width", "23%");
        $("[class='QAfdwP tvPMvPb'] li").last().addClass("MCGAxG");
        $("[class='QAfdwP tvPMvPb'] li").unbind("click");
        $("#filename").bind("click", function () {
            $(this).siblings("li").removeClass("MCGAxG JFaAINb");
            if ($(this).hasClass("MCGAxG")) {
                $(this).removeClass("MCGAxG");
                $(this).addClass("JFaAINb");
                loadContent()
            } else {
                $(this).removeClass("JFaAINb");
                $(this).addClass("MCGAxG");
                loadContent()
            }
        });
        $("#filesize").bind("click", function () {
            $(this).siblings("li").removeClass("MCGAxG JFaAINb");
            if ($(this).hasClass("MCGAxG")) {
                $(this).removeClass("MCGAxG");
                $(this).addClass("JFaAINb");
                loadContent()
            } else {
                $(this).removeClass("JFaAINb");
                $(this).addClass("MCGAxG");
                loadContent()
            }
        });
        $("#updatetime").bind("click", function () {
            $(this).siblings("li").removeClass("MCGAxG JFaAINb");
            if ($(this).hasClass("MCGAxG")) {
                $(this).removeClass("MCGAxG");
                $(this).addClass("JFaAINb");
                loadContent()
            } else {
                $(this).removeClass("JFaAINb");
                $(this).addClass("MCGAxG");
                loadContent()
            }
        });
        changeContent()
    }
}

function loadCapacity() {
    $.ajax({
        url: CORE_GATEWAY_URL + "/api/core/usecapacity?uid=" + $.cookie("uid"),
        type: "get",
        xhrFields: {withCredentials: true},
        crossDomain: true,
        success: function (data) {
            if (data.respCode === 1) {
                var useJson = eval($.parseJSON(data.respData));
                var percent = ((useJson.usedCapacity / useJson.totalCapacity) * 100).toFixed(4) + "%";
                $(".remainingSpaceUi_span").css("width", percent);
                var size = bytesToSize(useJson.usedCapacity);
                $(".bold").html(size);
                $("#used").val(useJson.usedCapacity)
            } else {
                alert(data.respMsg)
            }
        },
        error: function (data) {
            alert(data.respMsg)
        }
    })
}

function a() {
    var b = location.href.split("?")[0];
    var d = b.split("#/")[1];
    if (!d) {
    } else {
        $('[data-key="' + d + '"]').siblings("li").removeClass("bHzsaPb");
        $(".QxJxtg").removeClass("cazEfA");
        $(".EzubGg").removeClass("EzubGg");
        $('[data-key="' + d + '"]').addClass("bHzsaPb");
        var c = $('[data-key="' + d + '"]').data("key");
        if (c != "all") {
            $("#createDirButton").css("display", "none")
        } else {
            $("#createDirButton").css("display", "inline-block")
        }
    }
}

function a2() {
    $('[data-key="all"]').siblings("li").removeClass("bHzsaPb");
    $(".QxJxtg").removeClass("cazEfA");
    $(".EzubGg").removeClass("EzubGg");
    $('[data-key="all"]').addClass("bHzsaPb");
    $("#createDirButton").css("display", "none")
}

function changeContent() {
    if (location.href.indexOf("search") != -1) {
        var d = decodeURI(location.href.split("?key=")[1]);
        ajax2(d)
    } else {
        var b = location.href.split("?")[0];
        var d = b.split("#/")[1];
        if (!d) {
            history.pushState("all", "", location.href + "#/all?path=/");
            $(".module-aside li:first").addClass("bHzsaPb");
            changeContent()
        } else {
            $('[data-key="' + d + '"]').trigger("click", false)
        }
        if (location.href.split("path=")[1] != "/" && d == "all") {
            var f = decodeURI(location.href.split("path=")[1]);
            $(".FuIxtL").css("display", "block");
            $("#tbAudfb").empty();
            var e = ((f.split("/")).length - 1);
            if (e < 4) {
                for (var c = 0; c < e + 1; c++) {
                    if (c == e) {
                        $("#tbAudfb").prepend("<a href='javascript:;' title='全部文件' data-deep='" + (e - c) + "'>全部文件</a><span class='KLxwHFb'>&gt;</span>")
                    } else {
                        if (c == 0) {
                            $("#tbAudfb").prepend("<span title='全部文件" + f + "'>" + f.substring(f.lastIndexOf("/") + 1, f.length) + "</span>");
                            f = f.substring(0, f.lastIndexOf(f.substring(f.lastIndexOf("/"), f.length)))
                        } else {
                            $("#tbAudfb").prepend("<a href='javascript:;' title='全部文件" + f + "' data-deep='" + (e - c) + "'>" + f.substring(f.lastIndexOf("/") + 1, f.length) + "</a><span class='KLxwHFb'>&gt;</span>");
                            f = f.substring(0, f.lastIndexOf(f.substring(f.lastIndexOf("/"), f.length)))
                        }
                    }
                }
            } else {
                for (var c = 0; c < e + 1; c++) {
                    if (c == e) {
                        $("#tbAudfb").prepend("<span title='全部文件" + f + "'>...</span><span class='KLxwHFb'>&gt;</span>")
                    } else {
                        if (c == 0) {
                            $("#tbAudfb").prepend("<span title='全部文件" + f + "'>" + f.substring(f.lastIndexOf("/") + 1, f.length) + "</span>");
                            f = f.substring(0, f.lastIndexOf(f.substring(f.lastIndexOf("/"), f.length)))
                        } else {
                            if (c == 1) {
                                $("#tbAudfb").prepend("<a href='javascript:;' title='全部文件" + f + "' data-deep='" + (e - c) + "'>" + f.substring(f.lastIndexOf("/") + 1, f.length) + "</a><span class='KLxwHFb'>&gt;</span>");
                                f = f.substring(0, f.lastIndexOf(f.substring(f.lastIndexOf("/"), f.length)))
                            } else {
                                if (c == 2) {
                                    $("#tbAudfb").prepend("<a href='javascript:;' title='全部文件" + f + "' data-deep='" + (e - c) + "'>" + f.substring(f.lastIndexOf("/") + 1, f.length) + "</a><span class='KLxwHFb'>&gt;</span>");
                                    f = f.substring(0, f.lastIndexOf(f.substring(f.lastIndexOf("/"), f.length)))
                                } else {
                                    if (c == 3) {
                                        $("#tbAudfb").prepend("<a href='javascript:;' title='全部文件" + f + "' data-deep='" + (e - c) + "'>" + f.substring(f.lastIndexOf("/") + 1, f.length) + "</a><span class='KLxwHFb'>&gt;</span>");
                                        f = f.substring(0, f.lastIndexOf(f.substring(f.lastIndexOf("/"), f.length)))
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            $(".FuIxtL").css("display", "none")
        }
    }
}

function ajax(e, b) {
    $("[class='QAfdwP tvPMvPb'] li").removeClass("BEPxaPb");
    if ($("#new").length != 0) {
        $("[class='QAfdwP tvPMvPb'] li").last().remove()
    }
    $("[class='QAfdwP tvPMvPb'] li").last().css("width", "23%");
    if ($("[class='QAfdwP tvPMvPb'] li").hasClass("MCGAxG") || $("[class='QAfdwP tvPMvPb'] li").hasClass("JFaAINb")) {
    } else {
        $("[class='QAfdwP tvPMvPb'] li").last().addClass("MCGAxG")
    }
    $("[class='QAfdwP tvPMvPb'] li").unbind("click");
    $("#filename").bind("click", function () {
        $(this).siblings("li").removeClass("MCGAxG JFaAINb");
        if ($(this).hasClass("MCGAxG")) {
            $(this).removeClass("MCGAxG");
            $(this).addClass("JFaAINb");
            loadContent()
        } else {
            $(this).removeClass("JFaAINb");
            $(this).addClass("MCGAxG");
            loadContent()
        }
    });
    $("#filesize").bind("click", function () {
        $(this).siblings("li").removeClass("MCGAxG JFaAINb");
        if ($(this).hasClass("MCGAxG")) {
            $(this).removeClass("MCGAxG");
            $(this).addClass("JFaAINb");
            loadContent()
        } else {
            $(this).removeClass("JFaAINb");
            $(this).addClass("MCGAxG");
            loadContent()
        }
    });
    $("#updatetime").bind("click", function () {
        $(this).siblings("li").removeClass("MCGAxG JFaAINb");
        if ($(this).hasClass("MCGAxG")) {
            $(this).removeClass("MCGAxG");
            $(this).addClass("JFaAINb");
            loadContent()
        } else {
            $(this).removeClass("JFaAINb");
            $(this).addClass("MCGAxG");
            loadContent()
        }
    });
    $(".tcuLAu").css("display", "inline-block");
    $(".QDDOQB").css("display", "none");
    var g = $(this).data("key");
    if (b == null) {
        if (g == "all") {
            history.pushState(null, "", location.href.split("#/")[0] + "#/" + g + "?path=/")
        } else {
            history.pushState(null, "", location.href.split("#/")[0] + "#/" + g)
        }
        changeContent()
    } else {
        if (!b) {
            var c = location.href.split("?")[0];
            var f = c.split("#/")[1];
            if (f == "all") {
                $(".EgMMec").html("全部文件")
            } else {
                if (f == "pic") {
                    $(".EgMMec").html("全部图片")
                } else {
                    if (f == "doc") {
                        $(".EgMMec").html("全部文档")
                    } else {
                        if (f == "video") {
                            $(".EgMMec").html("全部视频")
                        } else {
                            if (f == "mbt") {
                                $(".EgMMec").html("全部种子")
                            } else {
                                if (f == "music") {
                                    $(".EgMMec").html("全部音乐")
                                } else {
                                    $(".EgMMec").html("其他文件")
                                }
                            }
                        }
                    }
                }
            }
            var d = historyMap.get(location.href);
            if (d != null) {
                $(".vdAfKMb").empty();
                showContent(d)
            } else {
                loadContent()
            }
        }
    }
    a()
}

function ajax2(b) {
    $(".tcuLAu").css("display", "inline-block");
    $(".QDDOQB").css("display", "none");
    var c = historyMap.get(location.href);
    if (c != null) {
        if ($("[class='QAfdwP tvPMvPb'] li").length == 3) {
            $("[class='QAfdwP tvPMvPb']").append("<li id='new' class='fufHyA gObdAzb ' style='width:10%;'><span class='text'>所在目录</span><span class='xEuDywb'></span><span class='icon aHEytd icon-up'></span><span class='icon sFxCFbb icon-downtitle'></span></li>");
            $("[class='fufHyA gObdAzb MCGAxG']").css("width", "13%");
            $("[class='QAfdwP tvPMvPb'] li").addClass("BEPxaPb");
            $("[class='QAfdwP tvPMvPb'] li").removeClass("MCGAxG JFaAINb");
            $("[class='QAfdwP tvPMvPb'] li").unbind("click")
        }
        $(".vdAfKMb").empty();
        showContent2(c)
    } else {
        loadContent2(b)
    }
    a2()
}

function showContent2(content) {
    for (var key in content) {
        var contentVal = eval($.parseJSON(content[key]));
        if (contentVal.updateTime != null) {
            var mm = new Date(contentVal.updateTime);
            var date = mm.getFullYear() + "-" + ((mm.getMonth() + 1) >= 10 ? (mm.getMonth() + 1) : "0" + (mm.getMonth() + 1)) + "-" + (mm.getDate() < 10 ? "0" + mm.getDate() : mm.getDate()) + " " + (mm.getHours() < 10 ? "0" + mm.getHours() : mm.getHours()) + ":" + (mm.getMinutes() < 10 ? "0" + mm.getMinutes() : mm.getMinutes())
        } else {
            var date = "-"
        }
        if (contentVal.filesize != 0) {
            var size = bytesToSize(contentVal.filesize)
        } else {
            var size = "-"
        }
        var ext = contentVal.fileName.substring(contentVal.fileName.lastIndexOf(".") + 1, contentVal.fileName.length);
        var parentPath = contentVal.parentPath.substring(contentVal.parentPath.lastIndexOf("/") + 1, contentVal.parentPath.length);
        if (parentPath == "") {
            parentPath = "全部文件"
        }
        if (contentVal.addrtype == 0) {
            $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz open-enable' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM dir-small'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' onclick='openUrl1(this);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
        } else {
            if (ext == "zip" || ext == "rar") {
                $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-zip'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
            } else {
                if (ext == "torrent") {
                    $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-bt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
                } else {
                    if (ext == "mp4" || ext == "avi" || ext == "rmvb" || ext == "mpeg" || ext == "wmv") {
                        $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-video'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
                    } else {
                        if (ext == "mp3") {
                            $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-mp3'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
                        } else {
                            if (ext == "jpg" || ext == "jpeg" || ext == "gif") {
                                $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-pic'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
                            } else {
                                if (ext == "txt") {
                                    $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-txt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
                                } else {
                                    if (ext == "doc" || ext == "docx") {
                                        $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-doc'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
                                    } else {
                                        if (ext == "ppt" || ext == "pptx") {
                                            $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-ppt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
                                        } else {
                                            if (ext == "pdf") {
                                                $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-pdf'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
                                            } else {
                                                $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM default-small'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    $(".FuIxtL").css("display", "block");
    var query = decodeURI(location.href.split("search?key=")[1]);
    $("#tbAudfb").empty();
    $("#tbAudfb").append("<a href='javascript:;' title='全部文件' data-deep='0'>全部文件</a><span class='KLxwHFb'>&gt;</span><span title='全部文件/搜索：&quot;" + query + "&quot;'>搜索：" + '"' + query + '"' + "</span>");
    if (eval($.parseJSON(content[key])) != null) {
        if ((parseInt(key) + 1) % 100 != 0) {
            $(".FcucHsb").html("已全部加载，共" + (parseInt(key) + 1) + "个")
        } else {
            if (finishMap.get(location.href) != null) {
                $(".FcucHsb").html(finishMap.get(location.href))
            } else {
                $(".FcucHsb").html("已加载" + (parseInt(key) + 1) + "个")
            }
        }
    } else {
        $(".FcucHsb").html("已全部加载，共0个")
    }
}

function showContent3(content, page) {
    var oldContent = historyMap.get(location.href);
    var start = (page - 1) * 100;
    var position = (page - 1) * 100;
    for (var key in content) {
        oldContent[start++] = content[key]
    }
    historyMap.set(location.href, oldContent);
    for (var key in content) {
        var contentVal = eval($.parseJSON(content[key]));
        if (contentVal.updateTime != null) {
            var mm = new Date(contentVal.updateTime);
            var date = mm.getFullYear() + "-" + ((mm.getMonth() + 1) >= 10 ? (mm.getMonth() + 1) : "0" + (mm.getMonth() + 1)) + "-" + (mm.getDate() < 10 ? "0" + mm.getDate() : mm.getDate()) + " " + (mm.getHours() < 10 ? "0" + mm.getHours() : mm.getHours()) + ":" + (mm.getMinutes() < 10 ? "0" + mm.getMinutes() : mm.getMinutes())
        } else {
            var date = "-"
        }
        if (contentVal.filesize != 0) {
            var size = bytesToSize(cNontentVal.filesize)
        } else {
            var size = "-"
        }
        var ext = contentVal.fileName.substring(contentVal.fileName.lastIndexOf(".") + 1, contentVal.fileName.length);
        var parentPath = contentVal.parentPath.substring(contentVal.parentPath.lastIndexOf("/") + 1, contentVal.parentPath.length);
        if (parentPath == "") {
            parentPath = "全部文件"
        }
        if (contentVal.addrtype == 0) {
            $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz open-enable' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM dir-small'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' onclick='openUrl1(this);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
        } else {
            if (ext == "zip" || ext == "rar") {
                $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-zip'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
            } else {
                if (ext == "torrent") {
                    $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-bt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
                } else {
                    if (ext == "mp4" || ext == "avi" || ext == "rmvb" || ext == "mpeg" || ext == "wmv") {
                        $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-video'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
                    } else {
                        if (ext == "mp3") {
                            $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-mp3'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
                        } else {
                            if (ext == "jpg" || ext == "jpeg" || ext == "gif") {
                                $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-pic'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
                            } else {
                                if (ext == "txt") {
                                    $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-txt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
                                } else {
                                    if (ext == "doc" || ext == "docx") {
                                        $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-doc'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
                                    } else {
                                        if (ext == "ppt" || ext == "pptx") {
                                            $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-ppt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
                                        } else {
                                            if (ext == "pdf") {
                                                $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-pdf'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
                                            } else {
                                                $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM default-small'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:13%'>" + date + "</div><div class='wr7BYg' style='width:9%'><span onclick='openUrl1(this);' class='pq71X8' node-type='wour6d6' title='" + parentPath + "'>" + parentPath + "</span></div></dd>")
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    $(".FuIxtL").css("display", "block");
    var query = decodeURI(location.href.split("search?key=")[1]);
    $("#tbAudfb").empty();
    $("#tbAudfb").append("<a href='javascript:;' title='全部文件' data-deep='0'>全部文件</a><span class='KLxwHFb'>&gt;</span><span title='全部文件/搜索：&quot;" + query + "&quot;'>搜索：" + '"' + query + '"' + "</span>");
    if (eval($.parseJSON(content[key])) != null) {
        if ((parseInt(key) + 1) % 100 != 0) {
            $(".FcucHsb").html("已全部加载，共" + (parseInt(key) + 1 + (page - 1) * 100) + "个")
        } else {
            if (finishMap.get(location.href) != null) {
                $(".FcucHsb").html(finishMap.get(location.href))
            } else {
                $(".FcucHsb").html("已加载" + (parseInt(key) + 1 + (page - 1) * 100) + "个")
            }
        }
    } else {
        $(".FcucHsb").html("已全部加载，共" + (page - 1) * 100 + "个");
        finishMap.set(location.href, "已全部加载，共" + (page - 1) * 100 + "个")
    }
}

function loadContent3(b, c) {
    $.ajax({
        url: CORE_GATEWAY_URL + "/api/core/searchfile?uid=" + $.cookie("uid") + "&key=" + b + "&page=" + c + "&order=update_time",
        type: "get",
        xhrFields: {withCredentials: true},
        crossDomain: true,
        success: function (data) {
            if (data.respCode === 1) {
                $("[class='QAfdwP tvPMvPb']").append("<li id='new' class='fufHyA gObdAzb ' style='width:10%;'><span class='text'>所在目录</span><span class='xEuDywb'></span><span class='icon aHEytd icon-up'></span><span class='icon sFxCFbb icon-downtitle'></span></li>");
                $("[class='fufHyA gObdAzb MCGAxG']").css("width", "13%");
                $("[class='QAfdwP tvPMvPb'] li").addClass("BEPxaPb");
                $("[class='QAfdwP tvPMvPb'] li").removeClass("MCGAxG JFaAINb");
                $("[class='QAfdwP tvPMvPb'] li").unbind("click");
                showContent3(data.respData, c)
            } else {
                alert(data.respMsg);
            }
        },
        error: function (data) {
            alert(data.respMsg)
        }
    })
}

function loadContent2(b) {
    $(".vdAfKMb").empty();
    $.ajax({
        url: CORE_GATEWAY_URL + "/api/core/searchfile?uid=" + $.cookie("uid") + "&key=" + b + "&page=" + 1 + "&order=update_time",
        type: "get",
        xhrFields: {withCredentials: true},
        crossDomain: true,
        success: function (data) {
            if (data.respCode === 1) {
                $("[class='QAfdwP tvPMvPb']").append("<li id='new' class='fufHyA gObdAzb ' style='width:10%;'><span class='text'>所在目录</span><span class='xEuDywb'></span><span class='icon aHEytd icon-up'></span><span class='icon sFxCFbb icon-downtitle'></span></li>");
                $("[class='fufHyA gObdAzb MCGAxG']").css("width", "13%");
                $("[class='QAfdwP tvPMvPb'] li").addClass("BEPxaPb");
                $("[class='QAfdwP tvPMvPb'] li").removeClass("MCGAxG JFaAINb");
                $("[class='QAfdwP tvPMvPb'] li").unbind("click");
                var c = location.href.split("#/")[0];
                history.pushState(null, "", c + "#/search?key=" + b);
                historyMap.set(location.href, data.respData);
                showContent2(data.respData)
            } else {
                alert(data.respMsg)
            }
        },
        error: function (data) {
            alert(data.respMsg)
        }
    })
}

function loadContent() {
    var j = location.href.split("?")[0];
    var h = j.split("#/")[1];
    $(".vdAfKMb").empty();
    var d = "";
    var g = 1;
    var c = $("[class='fufHyA yfHIsP MCGAxG']");
    var b = $("[class='fufHyA yfHIsP JFaAINb']");
    var l = $("[class='fufHyA MCGAxG']");
    var e = $("[class='fufHyA JFaAINb']");
    var k = $("[class='fufHyA gObdAzb MCGAxG']");
    var f = $("[class='fufHyA gObdAzb JFaAINb']");
    if (c.length != 0) {
        d = "file_name";
        g = 1
    }
    if (b.length != 0) {
        d = "file_name";
        g = 0
    }
    if (l.length != 0) {
        d = "file_size";
        g = 1
    }
    if (e.length != 0) {
        d = "file_size";
        g = 0
    }
    if (k.length != 0) {
        d = "update_time";
        g = 1
    }
    if (f.length != 0) {
        d = "update_time";
        g = 0
    }
    $.ajax({
        url: CORE_GATEWAY_URL + "/api/core/listfile",
        type: "get",
        data: {
            "uid": $.cookie("uid"),
            "type": h,
            "path": location.href.split("path=")[1],
            "page": 1,
            "order": d,
            "desc": g
        },
        xhrFields: {withCredentials: true},
        crossDomain: true,
        success: function (data) {
            if (data.respCode === 1) {
                historyMap.set(location.href, data.respData);
                showContent(data.respData)
            } else {
                alert(data.respMsg);
            }
        },
        error: function (data) {
            alert(data.respMsg)
        }
    })
}

function loadContent1(h) {
    var k = location.href.split("?")[0];
    var j = k.split("#/")[1];
    var d = "";
    var g = 1;
    var c = $("[class='fufHyA yfHIsP MCGAxG']");
    var b = $("[class='fufHyA yfHIsP JFaAINb']");
    var m = $("[class='fufHyA MCGAxG']");
    var e = $("[class='fufHyA JFaAINb']");
    var l = $("[class='fufHyA gObdAzb MCGAxG']");
    var f = $("[class='fufHyA gObdAzb JFaAINb']");
    if (c.length != 0) {
        d = "file_name";
        g = 1
    }
    if (b.length != 0) {
        d = "file_name";
        g = 0
    }
    if (m.length != 0) {
        d = "file_size";
        g = 1
    }
    if (e.length != 0) {
        d = "file_size";
        g = 0
    }
    if (l.length != 0) {
        d = "update_time";
        g = 1
    }
    if (f.length != 0) {
        d = "update_time";
        g = 0
    }
    $.ajax({
        url: CORE_GATEWAY_URL + "/api/core/listfile",
        type: "get",
        data: {
            "uid": $.cookie("uid"),
            "type": j,
            "path": location.href.split("path=")[1],
            "page": h,
            "order": d,
            "desc": g
        },
        xhrFields: {withCredentials: true},
        crossDomain: true,
        success: function (data) {
            if (data.respCode === 1) {
                showContent1(data.respData, h)
            } else {
                alert(data.respMsg)
            }
        },
        error: function (data) {
            alert(data.respMsg);
        }
    })
}

function showContent1(content, page) {
    var oldContent = historyMap.get(location.href);
    var start = (page - 1) * 100;
    var position = (page - 1) * 100;
    for (var key in content) {
        oldContent[start++] = content[key]
    }
    historyMap.set(location.href, oldContent);
    for (var key in content) {
        var contentVal = eval($.parseJSON(content[key]));
        if (contentVal.updateTime != null) {
            var mm = new Date(contentVal.updateTime);
            var date = mm.getFullYear() + "-" + ((mm.getMonth() + 1) >= 10 ? (mm.getMonth() + 1) : "0" + (mm.getMonth() + 1)) + "-" + (mm.getDate() < 10 ? "0" + mm.getDate() : mm.getDate()) + " " + (mm.getHours() < 10 ? "0" + mm.getHours() : mm.getHours()) + ":" + (mm.getMinutes() < 10 ? "0" + mm.getMinutes() : mm.getMinutes())
        } else {
            var date = "-"
        }
        if (contentVal.filesize != 0) {
            var size = bytesToSize(contentVal.fileSize)
        } else {
            var size = "-"
        }
        var ext = contentVal.fileName.substring(contentVal.fileName.lastIndexOf(".") + 1, contentVal.fileName.length);
        if (contentVal.addrtype == 0) {
            $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz open-enable' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM dir-small'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' onclick='openUrl(this);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
        } else {
            if (ext == "zip" || ext == "rar") {
                $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-zip'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
            } else {
                if (ext == "torrent") {
                    $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-bt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
                } else {
                    if (ext == "mp4" || ext == "avi" || ext == "rmvb" || ext == "mpeg" || ext == "wmv") {
                        $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-video'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
                    } else {
                        if (ext == "mp3") {
                            $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-mp3'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
                        } else {
                            if (ext == "jpg" || ext == "jpeg" || ext == "gif") {
                                $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-pic'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
                            } else {
                                if (ext == "txt") {
                                    $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-txt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
                                } else {
                                    if (ext == "doc" || ext == "docx") {
                                        $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-doc'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
                                    } else {
                                        if (ext == "ppt" || ext == "pptx") {
                                            $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-ppt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
                                        } else {
                                            if (ext == "pdf") {
                                                $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-pdf'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
                                            } else {
                                                $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + parseInt(position + parseInt(key)) + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM default-small'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (eval($.parseJSON(content[key])) != null) {
        if ((parseInt(key) + 1) % 100 != 0) {
            $(".FcucHsb").html("已全部加载，共" + (parseInt(key) + 1 + (page - 1) * 100) + "个")
        } else {
            $(".FcucHsb").html("已加载" + (parseInt(key) + 1 + (page - 1) * 100) + "个")
        }
    } else {
        $(".FcucHsb").html("已全部加载，共" + (page - 1) * 100 + "个");
        finishMap.set(location.href, "已全部加载，共" + (page - 1) * 100 + "个")
    }
}

function showContent(content) {
    $(".vdAfKMb").empty();
    for (var key in content) {
        var contentVal = eval($.parseJSON(content[key]));
        if (contentVal.updateTime != null) {
            var mm = new Date(contentVal.updateTime);
            var date = mm.getFullYear() + "-" + ((mm.getMonth() + 1) >= 10 ? (mm.getMonth() + 1) : "0" + (mm.getMonth() + 1)) + "-" + (mm.getDate() < 10 ? "0" + mm.getDate() : mm.getDate()) + " " + (mm.getHours() < 10 ? "0" + mm.getHours() : mm.getHours()) + ":" + (mm.getMinutes() < 10 ? "0" + mm.getMinutes() : mm.getMinutes())
        } else {
            var date = "-"
        }
        if (contentVal.filesize != 0) {
            var size = bytesToSize(contentVal.fileSize)
        } else {
            var size = "-"
        }
        var ext = contentVal.fileName.substring(contentVal.fileName.lastIndexOf(".") + 1, contentVal.fileName.length);
        if (contentVal.addrType == 0) {
            $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz open-enable' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM dir-small'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' onclick='openUrl(this);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
        } else {
            if (ext == "zip" || ext == "rar") {
                $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-zip'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
            } else {
                if (ext == "torrent") {
                    $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-bt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
                } else {
                    if (ext == "mp4" || ext == "avi" || ext == "rmvb" || ext == "mpeg" || ext == "wmv") {
                        $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-video'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
                    } else {
                        if (ext == "mp3") {
                            $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-mp3'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
                        } else {
                            if (ext == "jpg" || ext == "jpeg" || ext == "gif") {
                                $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-pic'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
                            } else {
                                if (ext == "txt") {
                                    $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-txt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
                                } else {
                                    if (ext == "doc" || ext == "docx") {
                                        $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-doc'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
                                    } else {
                                        if (ext == "ppt" || ext == "pptx") {
                                            $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-ppt'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
                                        } else {
                                            if (ext == "pdf") {
                                                $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM fileicon-small-pdf'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
                                            } else {
                                                $(".vdAfKMb").append("<dd class='g-clearfix AuPKyz' _position='" + key + "'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div class='tvbMzNM default-small'></div><div class='file-name' style='width:60%'><div class='text'><a href='javascript:void(0);' class='uzhnGEaz' title='" + contentVal.fileName + "'>" + contentVal.fileName + "</a></div></div><div class='wsuoMXZ8' style='width:16%'>" + size + "</div><div class='omMnrW' style='width:23%'>" + date + "</div></dd>")
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (eval($.parseJSON(content[key])) != null) {
        if ((parseInt(key) + 1) % 100 != 0) {
            $(".FcucHsb").html("已全部加载，共" + (parseInt(key) + 1) + "个")
        } else {
            if (finishMap.get(location.href) != null) {
                $(".FcucHsb").html(finishMap.get(location.href))
            } else {
                $(".FcucHsb").html("已加载" + (parseInt(key) + 1) + "个")
            }
        }
    } else {
        $(".FcucHsb").html("已全部加载，共0个")
    }
}

function bytesToSize(b) {
    if (b != null) {
        if (b === 0) {
            return "0 B"
        }
        var c = 1024;
        sizes = ["B", "KB", "MB", "GB"];
        i = Math.floor(Math.log(b) / Math.log(c));
        return (b / Math.pow(c, i)).toPrecision(3) + " " + sizes[i]
    } else {
        return "-"
    }
}

function choose(c) {
    var b = c.parentElement;
    if (b.className.indexOf("anW01r") > -1) {
        b.className = b.className.replace(new RegExp("(\\s|^)anW01r(\\s|$)"), "")
    } else {
        b.className += " anW01r"
    }
    if (!$(".QxJxtg").hasClass("cazEfA")) {
        $(".QxJxtg").addClass("cazEfA");
        $(".tcuLAu").css("display", "none");
        $(".QDDOQB").css("display", "inline-block")
    }
    if (!$("dd").hasClass("anW01r")) {
        $(".QxJxtg").removeClass("cazEfA");
        $(".tcuLAu").css("display", "inline-block");
        $(".QDDOQB").css("display", "none")
    }
    count()
}

function count() {
    var b = $("[class='g-clearfix AuPKyz open-enable anW01r']").length;
    if ($("dd.anW01r").length >= 2) {
        $("#rename").css("display", "none")
    }
    if ($("dd.anW01r").length < 2) {
        $("#rename").css("display", "inline-block")
    }
    if ($("[class='g-clearfix AuPKyz open-enable anW01r']").length > 0) {
        $("#download").css("display", "none");
        $("#share").css("display", "none")
    }
    if ($("[class='g-clearfix AuPKyz open-enable anW01r']").length == 0) {
        $("#download").css("display", "inline-block");
        $("#share").css("display", "inline-block")
    }
    var c = $("dd.anW01r").length;
    $(".MdLxwM").html("已选中" + c + "个文件/文件夹")
}

function openUrl(c) {
    if (location.href.split("path=")[1] == "/") {
        history.pushState(null, "", location.href + c.title)
    } else {
        history.pushState(null, "", location.href + "/" + c.title)
    }
    $(".FuIxtL").css("display", "block");
    var b = historyMap.get(location.href);
    if (b != null) {
        $(".vdAfKMb").empty();
        changeContent()
    } else {
        $(".vdAfKMb").empty();
        changeContent()
    }
}

function openUrl1(obj) {
    var dd = $(obj).parents("dd");
    var index = dd.attr("_position");
    var content = historyMap.get(location.href);
    var contentVal = eval($.parseJSON(content[index]));
    if ($(obj).hasClass("pq71X8")) {
        history.pushState(null, "", location.href.split("#/search?key")[0] + "#/all?path=" + contentVal.parentpath)
    } else {
        if (contentVal.parentpath == "/") {
            history.pushState(null, "", location.href.split("#/search?key")[0] + "#/all?path=" + contentVal.parentpath + contentVal.filename)
        } else {
            history.pushState(null, "", location.href.split("#/search?key")[0] + "#/all?path=" + contentVal.parentpath + "/" + contentVal.filename)
        }
    }
    $("[class='QAfdwP tvPMvPb'] li").removeClass("BEPxaPb");
    if ($("#new").length != 0) {
        $("[class='QAfdwP tvPMvPb'] li").last().remove()
    }
    $("[class='QAfdwP tvPMvPb'] li").last().css("width", "23%");
    $("[class='QAfdwP tvPMvPb'] li").last().addClass("MCGAxG");
    $("[class='QAfdwP tvPMvPb'] li").unbind("click");
    $("#filename").bind("click", function () {
        $(this).siblings("li").removeClass("MCGAxG JFaAINb");
        if ($(this).hasClass("MCGAxG")) {
            $(this).removeClass("MCGAxG");
            $(this).addClass("JFaAINb");
            loadContent()
        } else {
            $(this).removeClass("JFaAINb");
            $(this).addClass("MCGAxG");
            loadContent()
        }
    });
    $("#filesize").bind("click", function () {
        $(this).siblings("li").removeClass("MCGAxG JFaAINb");
        if ($(this).hasClass("MCGAxG")) {
            $(this).removeClass("MCGAxG");
            $(this).addClass("JFaAINb");
            loadContent()
        } else {
            $(this).removeClass("JFaAINb");
            $(this).addClass("MCGAxG");
            loadContent()
        }
    });
    $("#updatetime").bind("click", function () {
        $(this).siblings("li").removeClass("MCGAxG JFaAINb");
        if ($(this).hasClass("MCGAxG")) {
            $(this).removeClass("MCGAxG");
            $(this).addClass("JFaAINb");
            loadContent()
        } else {
            $(this).removeClass("JFaAINb");
            $(this).addClass("MCGAxG");
            loadContent()
        }
    });
    $(".FuIxtL").css("display", "block");
    var content = historyMap.get(location.href);
    if (content != null) {
        $(".vdAfKMb").empty();
        changeContent()
    } else {
        $(".vdAfKMb").empty();
        changeContent()
    }
}

function flashContent() {
    setTimeout(function () {
        $(".vdAfKMb").empty();
        historyMap.clear();
        finishMap.clear();
        folderMap.clear();
        history.pushState(null, "", location.href);
        if (location.href.indexOf("search?key=") != -1) {
            loadContent2(decodeURI(location.href.split("search?key=")[1]))
        } else {
            loadContent()
        }
        loadCapacity()
    }, 800)
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

function loadFolder(c, d) {
    var b = folderMap.get(c);
    if (b == null) {
        $.ajax({
            url: CORE_GATEWAY_URL + "/api/core/listfolder",
            type: "get",
            data: {"uid": $.cookie("uid"), "parentPath": c,},
            xhrFields: {withCredentials: true},
            crossDomain: true,
            dataType: "json",
            success: function (data) {
                if (data.respCode === 1) {
                    var e = data.respData;
                    folderMap.set(c, e);
                    if (c == "/") {
                        showFolder(e, $(".treeview-root"))
                    } else {
                        showFolder(e, d)
                    }
                } else {
                    alert(data.respMsg);
                }
            },
            error: function (data) {
                alert(data.respMsg)
            }
        })
    } else {
        if (c == "/") {
            showFolder(b, $(".treeview-root"))
        } else {
            showFolder(b, d)
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

function copyAndMove(id, chooseNum, dest) {
    var content = historyMap.get(location.href);
    var vids = new Array();
    for (var index in chooseNum) {
        var contentVal = eval($.parseJSON(content[chooseNum[index]]));
        vids.push(contentVal.uuid)
    }
    $.ajax({
        url: CORE_GATEWAY_URL + "/api/core/copyormovefile",
        type: "put",
        data: JSON.stringify({"uid": $.cookie("uid"), "vids": JSON.stringify(vids), "opera": id, "dest": dest}),
        xhrFields: {withCredentials: true},
        contentType: 'application/json;charset=UTF-8',
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            if (data.respCode === 1) {
                $(".module-canvas").css("display", "none");
                $("#fileTreeDialog").css("display", "none");
                flashContent();
                $(".QxJxtg").removeClass("cazEfA");
                $(".EzubGg").removeClass("EzubGg");
                alert(data.respMsg)
            } else {
                $(".QxJxtg").removeClass("cazEfA");
                $(".EzubGg").removeClass("EzubGg");
                $(".module-canvas").css("display", "none");
                $("#fileTreeDialog").css("display", "none");
                alert(data.respMsg)
            }
            $(".tcuLAu").css("display", "inline-block");
            $(".QDDOQB").css("display", "none")
        },
        error: function (data) {
            $(".module-canvas").css("display", "none");
            $("#fileTreeDialog").css("display", "none");
            alert(data.respMsg)
        }
    })
}

function download(chooseNum) {
    var content = historyMap.get(location.href);
    var vids = new Array();
    for (var index in chooseNum) {
        var contentVal = eval($.parseJSON(content[chooseNum[index]]));
        vids.push(contentVal.uuid)
    }
    var form = $("<form id=" + index + ">");
    form.attr("style", "display:none");
    form.attr("method", "get");
    form.attr("action", CORE_FILE_GATEWAY_URL + "/api/file/download");
    var input1 = $("<input>");
    input1.attr("type", "hidden");
    input1.attr("name", "vids");
    input1.attr("value", JSON.stringify(vids));
    var input2 = $("<input>");
    input2.attr("type", "hidden");
    input2.attr("name", "token");
    input2.attr("value", $.cookie("token"));
    var input3 = $("<input>");
    input3.attr("type", "hidden");
    input3.attr("name", "uid");
    input3.attr("value", $.cookie("uid"));
    $("body").append(form);
    form.append(input1);
    form.append(input2);
    form.append(input3);
    form.submit();
    form.empty()
}

function changePwd() {
    var b = $("#changePwd").modal({
        closeViaDimmer: 0, onConfirm: function (c) {
            var g = $("input[name='newPassword']").val();
            var e = $("input[name='repeatPassword']").val();
            if (g != "" && g == e) {
                var f = new JSEncrypt();
                f.setPublicKey($("#publicKey").val());
                var d = f.encrypt(g);
                $.ajax({
                    url: CORE_GATEWAY_URL + "/api/edge/regcheckpwd",
                    type: "post",
                    data: {"password": d, "publicKey": $("#publicKey").val()},
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
                                    "newPassword": d,
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
                })
            } else if (g != e) {
                $(".am-modal-prompt-input").val("");
                alert("新密码和确认密码必须相同");
            }
        }, onCancel: function () {
            $(".am-modal-prompt-input").val("");
            $("#changePwd").modal("close")
        }
    });
    b.find("[data-am-modal-cancel]").off("click.close.modal.amui");
    b.find("[data-am-modal-confirm]").off("click.close.modal.amui")
}

function getFileUrl(c) {
    var b;
    if (navigator.userAgent.indexOf("MSIE") >= 1) {
        b = document.getElementById(c).value
    } else {
        if (navigator.userAgent.indexOf("Firefox") > 0) {
            b = window.URL.createObjectURL(document.getElementById(c).files.item(0))
        } else {
            if (navigator.userAgent.indexOf("Chrome") > 0) {
                b = window.URL.createObjectURL(document.getElementById(c).files.item(0))
            }
        }
    }
    return b
}

function preImg(e, c) {
    $("#photo").css("display", "inline-block");
    var b = getFileUrl(e);
    var d = document.getElementById(c);
    d.src = b
}

function uploadPic() {
    $("#photo").css("display", "none");
    var b = $("#uploadPic").modal({
        closeViaDimmer: 0, onConfirm: function (d) {
            var e = $("#pic").get(0).files[0];
            var c = e.size;
            var h = 1048576;
            var f = e.name.substring(e.name.lastIndexOf(".") + 1, e.name.length).toUpperCase();
            if (f != "PNG" && f != "GIF" && f != "JPG" && f != "JPEG" && f != "BMP") {
                alert("文件类型错误,请上传图片类型");
                return false
            } else {
                if (parseInt(c) >= parseInt(h)) {
                    alert("上传的文件不能超过1MB");
                    return false
                } else {
                    var g = new FormData();
                    g.append("uid", $.cookie("uid"));
                    g.append("file", e);
                    $.ajax({
                        url: CORE_GATEWAY_URL + "/api/user/uploadpic",
                        type: "post",
                        contentType: false,
                        data: g,
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
    b.find("[data-am-modal-cancel]").off("click.close.modal.amui");
    b.find("[data-am-modal-confirm]").off("click.close.modal.amui")
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
                alert(data.respMsg)
            }
        },
        error: function (data) {
            alert(data.respMsg)
        }
    })
}

function createShare(chooseNum) {
    var content = historyMap.get(location.href);
    var vids = new Array();
    for (var index in chooseNum) {
        var contentVal = eval($.parseJSON(content[chooseNum[index]]));
        vids.push(contentVal.uuid)
    }
    var flag = $("input[name='share-method']:checked").val();
    $.ajax({
        url: CORE_GATEWAY_URL + "/api/share/share",
        type: "post",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({
            "uid": $.cookie("uid"),
            "vids": JSON.stringify(vids),
            "flag": flag,
            "expiration": $("#expiration").val()
        }),
        xhrFields: {withCredentials: true},
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            if (data.respCode === 1) {
                if (data.respData.indexOf(",") > -1) {
                    $(".share-validity-tip").css("right", "150px");
                    $(".create-link").addClass("private-link has-create");
                    $("#createShare").css("display", "none");
                    $("#cel").children("span").children("span").html("关闭");
                    $(".share-url").val(CORE_PAGE_URL + "/s/" + data.respData.substring(0, data.respData.lastIndexOf(",")));
                    $(".share-password").val(data.respData.substring(data.respData.lastIndexOf(",") + 1, data.respData.length));
                    $(".copyPrivate").val(CORE_PAGE_URL + "/s/" + (data.respData.substring(0, data.respData.lastIndexOf(","))) + " 提取密码:" + data.respData.substring(data.respData.lastIndexOf(",") + 1, data.respData.length))
                } else {
                    $(".share-validity-tip").css("right", "115px");
                    $(".create-link").addClass("public-link has-create");
                    $("#createShare").css("display", "none");
                    $("#cel").children("span").children("span").html("关闭");
                    $(".share-url").val(CORE_PAGE_URL + "/s/" + data.respData)
                }
            } else {
                alert(data.respMsg);
            }
        },
        error: function (data) {
            alert(data.respMsg)
        }
    })
};