var historyMap = new Map();
var finishMap = new Map();

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
                alert(data.respMsg);
            }
        },
        error: function (data) {
            alert(data.respMsg)
        }
    })
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

function ajax() {
    var a = $(this).data("key");
    if (a == "all") {
        location.href = CORE_PAGE_URL + "/disk/home" + "#/" + a + "?path=/"
    } else {
        if (a == "myShare") {
            location.href = CORE_PAGE_URL + "/share/manage"
        } else {
            location.href = CORE_PAGE_URL + "/disk/home" + "#/" + a
        }
    }
}

function init() {
    $("#shareName").bind("click", function () {
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
    $("#vTime").bind("click", function () {
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
    $("#sTime").bind("click", function () {
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
    $("#dTime").bind("click", function () {
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
    $("#shareTime").bind("click", function () {
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
    $("#expiration").bind("click", function () {
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
    })
}

function loadContent() {
    $("div[class='list bEMOyf']").empty();
    var a = "";
    var b = 1;
    if ($("#shareName").hasClass("MCGAxG")) {
        a = "theme";
        b = 1
    }
    if ($("#shareName").hasClass("JFaAINb")) {
        a = "theme";
        b = 0
    }
    if ($("#vTime").hasClass("MCGAxG")) {
        a = "visit_count";
        b = 1
    }
    if ($("#vTime").hasClass("JFaAINb")) {
        a = "visit_count";
        b = 0
    }
    if ($("#sTime").hasClass("MCGAxG")) {
        a = "save_count";
        b = 1
    }
    if ($("#sTime").hasClass("JFaAINb")) {
        a = "save_count";
        b = 0
    }
    if ($("#dTime").hasClass("MCGAxG")) {
        a = "download_count";
        b = 1
    }
    if ($("#dTime").hasClass("JFaAINb")) {
        a = "download_count";
        b = 0
    }
    if ($("#shareTime").hasClass("MCGAxG")) {
        a = "create_time";
        b = 1
    }
    if ($("#shareTime").hasClass("JFaAINb")) {
        a = "create_time";
        b = 0
    }
    if ($("#expiration").hasClass("MCGAxG")) {
        a = "expiration";
        b = 1
    }
    if ($("#expiration").hasClass("JFaAINb")) {
        a = "expiration";
        b = 0
    }
    $.ajax({
        url: CORE_GATEWAY_URL + "/api/share/sharelist",
        type: "get",
        data: {"uid": $.cookie("uid"), "page": 1, "order": a, "desc": b},
        xhrFields: {withCredentials: true},
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            if (data.respCode === 1) {
                historyMap.set(location.href, data.respData);
                showContent(data.respData)
            } else {
                alert(data.respMsg)
            }
        },
        error: function (data) {
            alert(data.respMsg)
        }
    })
}

function loadContent1(b) {
    var a = "";
    var c = 1;
    if ($("#shareName").hasClass("MCGAxG")) {
        a = "theme";
        c = 1
    }
    if ($("#shareName").hasClass("JFaAINb")) {
        a = "theme";
        c = 0
    }
    if ($("#vTime").hasClass("MCGAxG")) {
        a = "visit_count";
        c = 1
    }
    if ($("#vTime").hasClass("JFaAINb")) {
        a = "visit_count";
        c = 0
    }
    if ($("#sTime").hasClass("MCGAxG")) {
        a = "save_count";
        c = 1
    }
    if ($("#sTime").hasClass("JFaAINb")) {
        a = "save_count";
        c = 0
    }
    if ($("#dTime").hasClass("MCGAxG")) {
        a = "download_count";
        c = 1
    }
    if ($("#dTime").hasClass("JFaAINb")) {
        a = "download_count";
        c = 0
    }
    if ($("#shareTime").hasClass("MCGAxG")) {
        a = "create_time";
        c = 1
    }
    if ($("#shareTime").hasClass("JFaAINb")) {
        a = "create_time";
        c = 0
    }
    if ($("#expiration").hasClass("MCGAxG")) {
        a = "expiration";
        c = 1
    }
    if ($("#expiration").hasClass("JFaAINb")) {
        a = "expiration";
        c = 0
    }
    $.ajax({
        url: CORE_GATEWAY_URL + "/api/share/sharelist",
        type: "get",
        data: {"uid": $.cookie("uid"), "page": b, "order": a, "desc": c},
        xhrFields: {withCredentials: true},
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            if (data.respCode === 1) {
                showContent1(data.respData, b)
            } else {
                alert(data.respMsg);
            }
        },
        error: function (data) {
            alert(data.respMsg);
        }
    })
}

function showContent(content) {
    for (var key in content) {
        var contentVal = eval($.parseJSON(content[key]));
        if (contentVal.createTime != null) {
            var mm = new Date(contentVal.createTime);
            var date = mm.getFullYear() + "-" + ((mm.getMonth() + 1) >= 10 ? (mm.getMonth() + 1) : "0" + (mm.getMonth() + 1)) + "-" + (mm.getDate() < 10 ? "0" + mm.getDate() : mm.getDate()) + " " + (mm.getHours() < 10 ? "0" + mm.getHours() : mm.getHours()) + ":" + (mm.getMinutes() < 10 ? "0" + mm.getMinutes() : mm.getMinutes())
        } else {
            var date = "-"
        }
        var ext = contentVal.theme.substring(contentVal.theme.lastIndexOf(".") + 1, contentVal.theme.length);
        if (contentVal.expiration > 4682671273999) {
            var expiration = "永久有效"
        } else {
            var startTime = new Date().getTime();
            var chazhi = contentVal.expiration - startTime;
            if (chazhi > 0) {
                var chazhiSS = Math.floor(parseInt(chazhi) / 1000);
                var chazhiMM = Math.floor(parseInt(chazhi) / 1000 / 60);
                var chazhiHour = Math.floor(parseInt(chazhi) / 1000 / 60 / 60);
                var chazhiDay = Math.floor(parseInt(chazhi) / 1000 / 60 / 60 / 24);
                if (chazhiDay > 1) {
                    var expiration = chazhiDay + "天后"
                } else {
                    if (chazhiHour > 1) {
                        var expiration = chazhiHour + "小时后"
                    } else {
                        if (chazhiMM > 1) {
                            var expiration = chazhiMM + "分钟后"
                        } else {
                            var expiration = chazhiSS + "秒后"
                        }
                    }
                }
            } else {
                var expiration = "已失效"
            }
        }
        if (contentVal.lockWhether == 1 && contentVal.multiWhether == 0) {
            if (ext == "zip" || ext == "rar") {
                $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-zip'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareid + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
            } else {
                if (ext == "torrent") {
                    $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-bt'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareid + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                } else {
                    if (ext == "mp4" || ext == "avi" || ext == "rmvb" || ext == "mpeg" || ext == "wmv") {
                        $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-video'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.savetime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadtime + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareid + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareid + "</a> 提取密码：" + contentVal.spassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareid + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                    } else {
                        if (ext == "mp3") {
                            $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-mp3'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.sharePassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                        } else {
                            if (ext == "jpg" || ext == "jpeg" || ext == "gif") {
                                $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-pic'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.sharePassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                            } else {
                                if (ext == "txt") {
                                    $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-txt'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.sharePassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                } else {
                                    if (ext == "doc" || ext == "docx") {
                                        $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-doc'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.sharePassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                    } else {
                                        if (ext == "ppt" || ext == "pptx") {
                                            $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-ppt'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.sharePassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                        } else {
                                            if (ext == "pdf") {
                                                $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-pdf'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.sharePassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                            } else {
                                                $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM default-small'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.sharePassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (contentVal.lockWhether == 0 && contentVal.multiWhether == 0) {
                if (ext == "zip" || ext == "rar") {
                    $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-zip'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                } else {
                    if (ext == "torrent") {
                        $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-bt'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visittime + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                    } else {
                        if (ext == "mp4" || ext == "avi" || ext == "rmvb" || ext == "mpeg" || ext == "wmv") {
                            $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-video'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                        } else {
                            if (ext == "mp3") {
                                $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-mp3'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                            } else {
                                if (ext == "jpg" || ext == "jpeg" || ext == "gif") {
                                    $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-pic'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                } else {
                                    if (ext == "txt") {
                                        $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-txt'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                    } else {
                                        if (ext == "doc" || ext == "docx") {
                                            $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-doc'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                        } else {
                                            if (ext == "ppt" || ext == "pptx") {
                                                $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-ppt'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                            } else {
                                                if (ext == "pdf") {
                                                    $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-pdf'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                                } else {
                                                    $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM default-small'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text' value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (contentVal.lockWhether == 1 && contentVal.multiWhether == 1) {
                    $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='aaa mulit-icon'></div><div node-type='name' class='name' title='" + contentVal.theme + "等'><span class='name-text-wrapper'><span title='" + contentVal.theme + "等' data-name='" + contentVal.theme + "等' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "等</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.spassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                } else {
                    if (contentVal.lockWhether == 0 && contentVal.multiWhether == 1) {
                        $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='aaa mulit-icon'></div><div node-type='name' class='name' title='" + contentVal.theme + "等'><span class='name-text-wrapper'><span title='" + contentVal.theme + "等' data-name='" + contentVal.theme + "等' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "等</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                    }
                }
            }
        }
    }
    if (eval($.parseJSON(content[key])) != null) {
        if ((parseInt(key) + 1) % 100 != 0) {
            $(".loaded").html("已全部加载，共" + (parseInt(key) + 1) + "个")
        } else {
            if (finishMap.get(location.href) != null) {
                $(".loaded").html(finishMap.get(location.href))
            } else {
                $(".loaded").html("已加载" + (parseInt(key) + 1) + "个")
            }
        }
    } else {
        $(".loaded").html("已全部加载，共0个")
    }
    $(".item").on({
        mouseover: function () {
            if (!$(this).hasClass("foc")) {
                $(this).addClass("foc")
            }
        }, mouseout: function () {
            $(this).removeClass("foc")
        }
    });
    $(".item").bind("click", function (event) {
        $(this).siblings().removeClass("anW01r");
        $(this).siblings("div.copy-bar").css("display", "none");
        if ($(this).hasClass("anW01r")) {
            $(this).removeClass("anW01r")
        } else {
            $(this).addClass("anW01r");
            $(this).next("div.copy-bar").css("display", "block")
        }
        if (!$(this).hasClass("cazEfA")) {
            $(".QxJxtg").addClass("cazEfA")
        } else {
            $(".QxJxtg").removeClass("cazEfA")
        }
        if (!$("div.item").hasClass("anW01r")) {
            $(".QxJxtg").removeClass("cazEfA");
            $(this).next("div.copy-bar").css("display", "none")
        }
        count()
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
        if (contentVal.createTime != null) {
            var mm = new Date(contentVal.createTime);
            var date = mm.getFullYear() + "-" + ((mm.getMonth() + 1) >= 10 ? (mm.getMonth() + 1) : "0" + (mm.getMonth() + 1)) + "-" + (mm.getDate() < 10 ? "0" + mm.getDate() : mm.getDate()) + " " + (mm.getHours() < 10 ? "0" + mm.getHours() : mm.getHours()) + ":" + (mm.getMinutes() < 10 ? "0" + mm.getMinutes() : mm.getMinutes())
        } else {
            var date = "-"
        }
        var ext = contentVal.theme.substring(contentVal.theme.lastIndexOf(".") + 1, contentVal.theme.length);
        if (contentVal.expiration > 4682671273999) {
            var expiration = "永久有效"
        } else {
            var startTime = new Date().getTime();
            var chazhi = contentVal.expiration - startTime;
            if (chazhi > 0) {
                var chazhiSS = Math.floor(parseInt(chazhi) / 1000);
                var chazhiMM = Math.floor(parseInt(chazhi) / 1000 / 60);
                var chazhiHour = Math.floor(parseInt(chazhi) / 1000 / 60 / 60);
                var chazhiDay = Math.floor(parseInt(chazhi) / 1000 / 60 / 60 / 24);
                if (chazhiDay > 1) {
                    var expiration = chazhiDay + "天后"
                } else {
                    if (chazhiHour > 1) {
                        var expiration = chazhiHour + "小时后"
                    } else {
                        if (chazhiMM > 1) {
                            var expiration = chazhiMM + "分钟后"
                        } else {
                            var expiration = chazhiSS + "秒后"
                        }
                    }
                }
            } else {
                var expiration = "已失效"
            }
        }
        if (contentVal.lockWhether == 1 && contentVal.multiWhether == 0) {
            if (ext == "zip" || ext == "rar") {
                $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-zip'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.sharePassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
            } else {
                if (ext == "torrent") {
                    $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-bt'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.sharePassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                } else {
                    if (ext == "mp4" || ext == "avi" || ext == "rmvb" || ext == "mpeg" || ext == "wmv") {
                        $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-video'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.sharePassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                    } else {
                        if (ext == "mp3") {
                            $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-mp3'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.sharePassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                        } else {
                            if (ext == "jpg" || ext == "jpeg" || ext == "gif") {
                                $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-pic'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.sharePassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                            } else {
                                if (ext == "txt") {
                                    $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-txt'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.sharePassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                } else {
                                    if (ext == "doc" || ext == "docx") {
                                        $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-doc'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.sharePassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                    } else {
                                        if (ext == "ppt" || ext == "pptx") {
                                            $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-ppt'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.sharePassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                        } else {
                                            if (ext == "pdf") {
                                                $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-pdf'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.sharePassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                            } else {
                                                $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='tvbMzNM default-small'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.sharePassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (contentVal.lockWhether == 0 && contentVal.multiWhether == 0) {
                if (ext == "zip" || ext == "rar") {
                    $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-zip'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                } else {
                    if (ext == "torrent") {
                        $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-bt'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                    } else {
                        if (ext == "mp4" || ext == "avi" || ext == "rmvb" || ext == "mpeg" || ext == "wmv") {
                            $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-video'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                        } else {
                            if (ext == "mp3") {
                                $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-mp3'></div></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                            } else {
                                if (ext == "jpg" || ext == "jpeg" || ext == "gif") {
                                    $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-pic'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                } else {
                                    if (ext == "txt") {
                                        $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-txt'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                    } else {
                                        if (ext == "doc" || ext == "docx") {
                                            $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-doc'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                        } else {
                                            if (ext == "ppt" || ext == "pptx") {
                                                $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-ppt'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                            } else {
                                                if (ext == "pdf") {
                                                    $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM fileicon-small-pdf'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                                } else {
                                                    $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='tvbMzNM default-small'></div><div node-type='name' class='name' title='" + contentVal.theme + "'><span class='name-text-wrapper'><span title='" + contentVal.theme + "' data-name='" + contentVal.theme + "' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text' value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (contentVal.lockWhether == 1 && contentVal.multiWhether == 1) {
                    $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><span class='icon icon-small-lock' title='私密分享'></span><div style='margin-left: 10px;' class='aaa mulit-icon'></div><div node-type='name' class='name' title='" + contentVal.theme + "等'><span class='name-text-wrapper'><span title='" + contentVal.theme + "等' data-name='" + contentVal.theme + "等' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "等</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a> 提取密码：" + contentVal.sharePassword + "<input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + " 提取密码: " + contentVal.sharePassword + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                } else {
                    if (contentVal.lockWhether == 0 && contentVal.multiWhether == 1) {
                        $("div[class='list bEMOyf']").append("<div style='height:45px;' node-type='item' data-id='" + contentVal.shareId + "' data-category='' class='item global-clearfix'><div class='fufHyA c1' style='width: 40%;'><span class='EOGexf' onclick='choose(this)'><span class='icon NbKJexb'></span></span><div style='margin-left: 10px;' class='aaa mulit-icon'></div><div node-type='name' class='name' title='" + contentVal.theme + "等'><span class='name-text-wrapper'><span title='" + contentVal.theme + "等' data-name='" + contentVal.theme + "等' node-type='name-text' class='name-text enabled'>" + contentVal.theme + "等</span></span></div><div node-type='edit-name' class='edit-name'><input node-type='edit-name-box' class='GadHyA' type='text' value=''> <span node-type='edit-name-sure' class='sure'></span> <span node-type='edit-name-cancel' class='cancel'></span></div><div class='NIaNvPb'><a node-type='btn-item' data-key='unshare' title='取消分享' class='btn unshare icon icon-share-cancel' href='javascript:void(0);'></a></div></div><div class='fufHyA' style='width: 10%'>" + contentVal.visitCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.saveCount + "</div><div class='fufHyA' style='width: 10%'>" + contentVal.downloadCount + "</div><div class='fufHyA' style='width: 20%'>" + date + "</div><div class='fufHyA' style='width: 9%'>" + expiration + "</div></div><div node-type='copy-bar' class='copy-bar' style='display: none;' id='copyBar'>链接：<a href='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "' target='_blank'>" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "</a><input style='position: absolute; z-index: -110' class='copyPrivate' spellingcheck='false' readonly='readonly' type='text'  value='" + CORE_PAGE_URL + "/s/" + contentVal.shareId + "'><button onclick='copyUrl(this);' id='copyUrl' style='display: inline-block;' type='button' class='am-btn am-radius am-btn-sm am-btn-warning'>复制</button></div>")
                    }
                }
            }
        }
    }
    if (eval($.parseJSON(content[key])) != null) {
        if ((parseInt(key) + 1) % 100 != 0) {
            $(".loaded").html("已全部加载，共" + (parseInt(key) + 1 + (page - 1) * 100) + "个")
        } else {
            $(".loaded").html("已加载" + (parseInt(key) + 1 + (page - 1) * 100) + "个")
        }
    } else {
        $(".loaded").html("已全部加载，共" + (page - 1) * 100 + "个");
        finishMap.set(location.href, "已全部加载，共" + (page - 1) * 100 + "个")
    }
    $(".item").on({
        mouseover: function () {
            if (!$(this).hasClass("foc")) {
                $(this).addClass("foc")
            }
        }, mouseout: function () {
            $(this).removeClass("foc")
        }
    });
    $(".item").bind("click", function (event) {
        $(this).siblings().removeClass("anW01r");
        $(this).siblings("div.copy-bar").css("display", "none");
        if ($(this).hasClass("anW01r")) {
            $(this).removeClass("anW01r")
        } else {
            $(this).addClass("anW01r");
            $(this).next("div.copy-bar").css("display", "block")
        }
        if (!$(this).hasClass("cazEfA")) {
            $(".QxJxtg").addClass("cazEfA")
        } else {
            $(".QxJxtg").removeClass("cazEfA")
        }
        if (!$("div.item").hasClass("anW01r")) {
            $(".QxJxtg").removeClass("cazEfA");
            $(this).next("div.copy-bar").css("display", "none")
        }
        count()
    })
}

function choose(b) {
    event.stopPropagation();
    var a = b.parentElement.parentElement;
    if (a.className.indexOf("anW01r") > -1) {
        $(a).removeClass("anW01r")
    } else {
        $(a).addClass("anW01r");
        $("div.copy-bar").css("display", "none")
    }
    if (!$(a).hasClass("cazEfA")) {
        $(".QxJxtg").addClass("cazEfA")
    } else {
        $(".QxJxtg").removeClass("cazEfA")
    }
    if (!$("div.item").hasClass("anW01r")) {
        $(".QxJxtg").removeClass("cazEfA")
    }
    $(a).next("div.copy-bar").css("display", "none");
    count()
}

function count() {
    var a = $("div.anW01r").length;
    $(".MdLxwM").html("已选中" + a + "个文件")
}

function flashContent() {
    $("div[class='list bEMOyf']").empty();
    historyMap.clear();
    finishMap.clear();
    loadContent()
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

function copyUrl(b) {
    var a = $(b).prev();
    a.select();
    document.execCommand("Copy");
    alert("已复制好，可贴粘。")
}

function unShare(a) {
    $.ajax({
        url: CORE_GATEWAY_URL + "/api/share/unshare",
        type: "get",
        data: {"uid": $.cookie("uid"), "vids": JSON.stringify(a)},
        xhrFields: {withCredentials: true},
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            if (!data.respCode === 1) {
                alert(data.respMsg)
            } else {
                $(".anW01r").each(function () {
                    $(this).next("div.copy-bar").remove();
                    $(this).remove()
                });
                $(".QxJxtg").removeClass("cazEfA");
                $("#shareName").removeClass("EzubGg");
                flashContent()
            }
        },
        error: function (data) {
            alert(data.respMsg)
        }
    })
};