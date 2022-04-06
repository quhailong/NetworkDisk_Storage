var REGIST = {
    checkInput: function () {
        checkPassword();
        if ($("#TANGRAM__PSP_3__passwordError").text() === "") {
            return true;
        }
    },
    doRegist: function () {
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey($("#publicKey").val());
        var password = $("#registForm input[name='password']").val();
        var passwordEnc = encrypt.encrypt(password);
        var user = {
            "username": $("#registForm input[name='username']").val(),
            "password": passwordEnc,
            "publicKey": $("#publicKey").val(),
            "verifyCode": $("#inputverifyCode").val(),
        }
        $.ajax({
            url: "http://localhost:8095/api/user/modifypass",
            type: "post",
            data: JSON.stringify(user),
            xhrFields: {
                withCredentials: true
            },
            contentType: 'application/json;charset=UTF-8',
            crossDomain: true,
            dataType: "json", //指定服务器返回的数据类型
            success: function (data) {
                if (data.respCode === 1) {
                    alert("修改成功");
                    location.href = "http://localhost:8097/disk/home";
                } else {
                    alert(data.respMsg);
                }
            }
        });
    },
    regist: function () {
        if (this.checkInput()) {
            this.doRegist();
        } else {
            return;
        }
    }

};
$(function () {

    $("#TANGRAM__PSP_3__submit").click(function () {
        REGIST.regist();
    });
    $("#dialog").dialog({
        autoOpen: false
    });
    //打开安全认证窗口
    $("#TANGRAM__PSP_3__verifyCodeSend").click(
        function () {
            if (!$("#TANGRAM__PSP_3__userNameError").text() === "" || $("#inputUsername").val() === "") {
                if ($("#inputUsername").val() === "") {
                    $("#TANGRAM__PSP_3__userNameError").text("请输入用户名或手机号");
                }
            } else {
                $.ajax({
                    url: "http://localhost:8095/api/user/checkphonesend",
                    type: "get",
                    data: {"username": $("#inputUsername").val()},
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    dataType: "json", //指定服务器返回的数据类型
                    success: function (data) {
                        if (data.respCode == 1) {
                            $("#vcodestr").val(data.respData);
                            $("#checkImg").attr('src', getImg(data.respData));
                            $("#verfiCode").val("");
                            $("#TANGRAM__PSP_3__verifyCodeSEError").html("");
                            $("#dialog").dialog("open");
                        } else {
                            alert("不存在手机号");
                        }
                    }
                });
                $("#dialog").dialog({
                    modal: true, //遮罩效果默认是false不遮住
                    minWidth: 500
                });
            }

        });
    //校验安全验证码
    $("#regVerfiCode").click(function () {
        var VerfyCode = $("#verfiCode").val();
        var username = $("#inputUsername").val();
        var vcodestr = $("#vcodestr").val();
        $.ajax({
            url: "http://localhost:8095/api/user/forgetphonesend",
            type: "post",
            data: JSON.stringify({"username": username, "verfyCode": VerfyCode, "vcodestr": vcodestr}),
            xhrFields: {
                withCredentials: true
            },
            contentType: 'application/json;charset=UTF-8',
            crossDomain: true,
            dataType: "json", //指定服务器返回的数据类型
            success: function (data) {
                if (data.respCode === 1) {
                    $("#dialog").dialog("close");
                    new invokeSettime("#TANGRAM__PSP_3__verifyCodeSend");
                } else {
                    $("#TANGRAM__PSP_3__verifyCodeSEError").html(data.respMsg);
                    change();
                }
            },
        });
    });
    //密码处理
    $("#TANGRAM__PSP_4__password").focus(function () {
        if (!$(this).hasClass("input-focus")) {
            $(this).addClass("input-focus");
            $.get("http://localhost:8095/api/edge/getpublickey", function (data) {
                $("#publicKey").val(data.respData);
            });
        }
    });
    $("#TANGRAM__PSP_4__password").blur(function () {
        $(this).removeClass("input-focus");
    });
    //校验表格
    $("#TANGRAM__PSP_4__password").bind("blur", function () {
        checkPassword();
    });
});

//发送验证码倒计时
function invokeSettime(obj) {
    var countdown = 60;
    settime(obj);

    function settime(obj) {
        if (countdown == 0) {
            $(obj).attr("disabled", false);
            $(obj).val("获取验证码");
            countdown = 60;
            return;
        } else {
            $(obj).attr("disabled", true);
            $(obj).val("(" + countdown + ") s 重新发送");
            countdown--;
        }
        setTimeout(function () {
            settime(obj)
        }, 1000)
    }
}

function checkPassword() {
    var password = $("#registForm input[name='password']").val();
    if (password != "") {
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey($("#publicKey").val());
        var passwordEnc = encrypt.encrypt(password);
        $.ajax({
            url: "http://localhost:8095/api/edge/regcheckpwd",
            type: "post",
            data: {
                "password": passwordEnc,
                "publicKey": $("#publicKey").val()
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "json", //指定服务器返回的数据类型
            success: function (data) {
                if (data.respCode == 0) {
                    $("#TANGRAM__PSP_3__passwordError").html(
                        data.respMsg);
                    return false;
                } else {
                    $("#TANGRAM__PSP_3__passwordError").html("");
                    return true;
                }
            }
        });
    } else {
        $("#TANGRAM__PSP_3__passwordError").html("请输入密码");
        return false;
    }
}

// 更换验证码
function getImg(a) {
    $("#checkImg").attr('src', "http://localhost:8095/api/edge/getverfyimg/" + a);
}

function change() {
    $.get("http://localhost:8095/api/edge/regsmscodestr", function (data) {
        if (data.respCode == 1) {
            $("#vcodestr").val(data.respData);
            $("#checkImg").attr('src', getImg(data.respData));
        } else {
            alert(data.respMsg);
        }
    });
}