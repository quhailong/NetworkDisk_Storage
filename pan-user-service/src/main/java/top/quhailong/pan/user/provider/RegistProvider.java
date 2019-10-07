package top.quhailong.pan.user.provider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import top.quhailong.pan.request.ChangePwdRequest;
import top.quhailong.pan.request.RegPhoneSendRequest;
import top.quhailong.pan.request.SendSmsRequest;
import top.quhailong.pan.request.UserRegistRequest;
import top.quhailong.pan.user.entity.UserInfoDO;
import top.quhailong.pan.user.remote.CoreRemote;
import top.quhailong.pan.user.remote.EdgeRemote;
import top.quhailong.pan.user.remote.FileRemote;
import top.quhailong.pan.user.service.UserInfoService;
import top.quhailong.pan.utils.*;

import java.io.IOException;
import java.util.Date;
import java.util.Random;
import java.util.UUID;
import java.util.regex.Pattern;

/**
 * 注册数据处理
 *
 * @author: quhailong
 * @date: 2019/9/25
 */
@Component
public class RegistProvider {
    @Autowired
    private UserInfoService userInfoService;
    @Autowired
    private JedisClusterUtil jedisClusterUtil;
    @Autowired
    private CoreRemote coreRemote;
    @Autowired
    private EdgeRemote edgeRemote;
    @Autowired
    private FileRemote fileRemote;

    /**
     * 用户名查重数据处理
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    public RestAPIResult<String> checkUserNameHandle(String username) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        if (Pattern.compile("^[a-zA-Z0-9\u4E00-\u9FA5_]+$").matcher(username).matches() && !Pattern.compile("^[0-9]+$").matcher(username).matches()) {
            UserInfoDO userInfoDO = userInfoService.getUserInfoByUserNameOrPhone(username, null);
            if (userInfoDO != null) {
                panResult.error("用户名已经被使用了，请更换");
                return panResult;
            }
            panResult.success(null);
            return panResult;
        } else {
            panResult.error("用户名仅支持中英文、数字和下划线,且不能为纯数字");
            return panResult;
        }
    }

    /**
     * 手机号查重数据处理
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    public RestAPIResult<String> checkPhoneHandle(String phoneNum) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        if (Pattern.compile("^[1][3,4,5,7,8][0-9]{9}$").matcher(phoneNum).matches()) {
            UserInfoDO userInfoDO = userInfoService.getUserInfoByUserNameOrPhone(null, phoneNum);
            if (userInfoDO != null) {
                panResult.setRespCode(144);
                panResult.setRespData(null);
                return panResult;
            }
            panResult.success(null);
            return panResult;
        } else {
            panResult.error("手机号码格式不正确");
            return panResult;
        }
    }

    /**
     * 用户注册数据处理
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    public RestAPIResult<String> userRegistHandle(UserRegistRequest request) throws Exception {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        if (jedisClusterUtil.isExistKey("regist:" + request.getPid())) {
            if (jedisClusterUtil.isExistKey("SMS:" + request.getPhoneNum()) && jedisClusterUtil.getValue("SMS:" + request.getPhoneNum()).equals(request.getVerifyCode())) {
                UserInfoDO userInfoDO = new UserInfoDO();
                String salt = IDUtils.showNextId(new Random().nextInt(30)).toString().substring(0, 16);
                userInfoDO.setPassword(MD5Utils.generate(RSAUtils.decryptDataOnJava(request.getPassword(), request.getRsaKey()), salt));
                userInfoDO.setSalt(salt);
                userInfoDO.setPhone(request.getPhoneNum());
                userInfoDO.setUserName(request.getUsername());
                String userId = IDUtils.showNextId(new Random().nextInt(30)).toString();
                userInfoDO.setUserId(userId);
                userInfoDO.setCreateTime(new Date());
                userInfoDO.setUpdateTime(new Date());
                userInfoDO.setPicLocation("/");
                userInfoService.saveUserInfo(userInfoDO);
                coreRemote.initCapacity(userId);
                userInfoDO.setPassword("");
                String accessToken = JWTUtils.createJWT(IDUtils.showNextId(new Random().nextInt(30)).toString(),
                        JSONUtils.toJSONString(userInfoDO), 12 * 60 * 60 * 1000);
                CookieUtils.addCookie("token", accessToken);
                CookieUtils.addCookie("uid", userInfoDO.getUserId());
                panResult.success(null);
                return panResult;
            } else {
                panResult.error("验证码错误");
                return panResult;
            }
        } else {
            panResult.error("页面失效，请刷新页面");
            return panResult;
        }
    }

    /**
     * 注册发送短信数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    public RestAPIResult<String> regPhoneSendHandle(RegPhoneSendRequest request) {
        RestAPIResult<String> panResult = new RestAPIResult<String>();
        if (request.getVcodestr() == null && request.getVcodestr() == null) {
            UserInfoDO userInfoDO = userInfoService.getUserInfoByUserNameOrPhone(null, request.getPhoneNum());
            if (userInfoDO != null) {
                panResult.error("手机号码已注册");
                return panResult;
            } else {
                panResult.setRespCode(1);
                panResult.setRespData(UUID.randomUUID().toString().replaceAll("-", ""));
                return panResult;
            }
        } else if (request.getVcodestr() != null && request.getVerfyCode() != null && request.getPhoneNum() != null) {
            if (jedisClusterUtil.isExistKey("verfiyCode:" + request.getVcodestr())) {
                if (request.getVerfyCode().equalsIgnoreCase(jedisClusterUtil.getValue("verfiyCode:" + request.getVcodestr()))) {
                    String sid = "";
                    String token = "";
                    String appid = "";
                    String templateid = "";
                    Integer sixNum = (int) ((Math.random() * 9 + 1) * 100000);
                    String param = sixNum.toString();
                    String mobile = request.getPhoneNum();
                    String uid = "";
                    SendSmsRequest sendSmsRequest = new SendSmsRequest();
                    sendSmsRequest.setSid(sid);
                    sendSmsRequest.setAppid(appid);
                    sendSmsRequest.setMobile(mobile);
                    sendSmsRequest.setParam(param);
                    sendSmsRequest.setTemplateid(templateid);
                    sendSmsRequest.setToken(token);
                    sendSmsRequest.setUid(uid);
                    RestAPIResult<String> result = edgeRemote.sendSms(sendSmsRequest);
                    jedisClusterUtil.setValue("SMS:" + request.getPhoneNum(), param, 120);
                    jedisClusterUtil.delKey("verfiyCode:" + request.getVcodestr());
                    if (result.getRespMsg().equals("0")) {
                        panResult.error("发送短信失败");
                        return panResult;
                    }
                    panResult.success(null);
                    return panResult;
                } else {
                    panResult.error("验证码错误");
                    return panResult;
                }
            } else {
                panResult.error("验证码错误");
                return panResult;
            }
        } else {
            panResult.error("别瞎捷豹改参数");
            return panResult;
        }
    }

    /**
     * 修改密码数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    public RestAPIResult<String> changePwdHandle(ChangePwdRequest request) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        String newPassword = RSAUtils.decryptDataOnJava(request.getNewPassword(), request.getRsaKey());
        UserInfoDO userInfoDO = userInfoService.getUserInfoByUserId(request.getUid());
        String salt = IDUtils.showNextId(new Random().nextInt(30)).toString().substring(0, 16);
        userInfoDO.setPassword(MD5Utils.generate(newPassword, salt));
        userInfoDO.setSalt(salt);
        userInfoDO.setUpdateTime(new Date());
        userInfoService.updateUserInfo(userInfoDO);
        CookieUtils.removeCookie("token");
        CookieUtils.removeCookie("uid");
        jedisClusterUtil.setValue("LOGOUT:token", request.getToken(), 60 * 60 * 24 * 365);
        panResult.success(null);
        panResult.setDataCode("200");
        return panResult;
    }

    /**
     * 加载用户头像数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    public RestAPIResult<String> loadImgHandle(String uid) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        UserInfoDO userInfoDO = userInfoService.getUserInfoByUserId(uid);
        String picLocation = userInfoDO.getPicLocation();
        if (picLocation.contains("group")) {
            panResult.success("null");
            panResult.setRespData(picLocation);
        } else {
            panResult.success("null");
            panResult.setRespData("group1/M00/00/00/wKhdgF2RromAYwaYAAAJL2wXkdY418_big.jpg");
        }
        return panResult;
    }

    /**
     * 上传用户头像数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    public RestAPIResult<String> uploadPicHandle(String uid, MultipartFile file) throws IOException {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        String picLocation = fileRemote.upload(file).getRespData();
        UserInfoDO userInfoDO = userInfoService.getUserInfoByUserId(uid);
        userInfoDO.setPicLocation(picLocation);
        userInfoDO.setUpdateTime(new Date());
        userInfoService.updateUserInfo(userInfoDO);
        panResult.success(null);
        panResult.setDataCode("200");
        return panResult;
    }

    public static void main(String[] args) {
        System.out.println(MD5Utils.generate("quhailong123", IDUtils.showNextId(new Random().nextInt(30)).toString().substring(0, 16)));
    }
}
