package top.quhailong.pan.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import top.quhailong.pan.request.ChangePwdRequest;
import top.quhailong.pan.request.RegPhoneSendRequest;
import top.quhailong.pan.request.SendSmsRequest;
import top.quhailong.pan.request.UserRegistRequest;
import top.quhailong.pan.user.dao.UserInfoDao;
import top.quhailong.pan.user.entity.UserInfoDO;
import top.quhailong.pan.user.remote.CoreRemote;
import top.quhailong.pan.user.remote.EdgeRemote;
import top.quhailong.pan.user.remote.FileRemote;
import top.quhailong.pan.user.service.RegisterService;
import top.quhailong.pan.utils.*;

import java.io.IOException;
import java.util.Date;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;

@RefreshScope
@Service
public class RegisterServiceImpl implements RegisterService {
    @Value("${sms-accountSid}")
    private String accountSid;
    @Value("${sms-appId}")
    private String appId;
    @Value("${sms-authToken}")
    private String authToken;
    @Autowired
    private UserInfoDao userInfoDao;
    @Autowired
    private CoreRemote coreRemote;
    @Autowired
    private EdgeRemote edgeRemote;
    @Autowired
    private FileRemote fileRemote;
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Override
    public RestAPIResult<String> checkUserNameHandle(String username) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        if (Pattern.compile("^[a-zA-Z0-9\u4E00-\u9FA5_]+$").matcher(username).matches() && !Pattern.compile("^[0-9]+$").matcher(username).matches()) {
            UserInfoDO userInfoDO = userInfoDao.getUserInfoByUserNameOrPhone(username, null);
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

    @Override
    public RestAPIResult<String> checkPhoneHandle(String phoneNum) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        if (Pattern.compile("^[1][3,4,5,7,8][0-9]{9}$").matcher(phoneNum).matches()) {
            UserInfoDO userInfoDO = userInfoDao.getUserInfoByUserNameOrPhone(null, phoneNum);
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

    @Override
    public RestAPIResult<String> userRegistHandle(UserRegistRequest request) throws Exception {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        if (redisTemplate.hasKey("regist:" + request.getPid())) {
            if (redisTemplate.hasKey("SMS:" + request.getPhoneNum()) && redisTemplate.opsForValue().get("SMS:" + request.getPhoneNum()).equals(request.getVerifyCode())) {
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
                userInfoDao.saveUserInfo(userInfoDO);
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

    @Override
    public RestAPIResult<String> regPhoneSendHandle(RegPhoneSendRequest request) {
        RestAPIResult<String> panResult = new RestAPIResult<String>();
        if (request.getVcodestr() == null && request.getVcodestr() == null) {
            UserInfoDO userInfoDO = userInfoDao.getUserInfoByUserNameOrPhone(null, request.getPhoneNum());
            if (userInfoDO != null) {
                panResult.error("手机号码已注册");
                return panResult;
            } else {
                panResult.setRespCode(1);
                panResult.setRespData(UUID.randomUUID().toString().replaceAll("-", ""));
                return panResult;
            }
        } else if (request.getVcodestr() != null && request.getVerfyCode() != null && request.getPhoneNum() != null) {
            if (redisTemplate.hasKey("verfiyCode:" + request.getVcodestr())) {
                if (request.getVerfyCode().equalsIgnoreCase(redisTemplate.opsForValue().get("verfiyCode:" + request.getVcodestr()))) {
                    Integer sixNum = (int) ((Math.random() * 9 + 1) * 100000);
                    String param = sixNum.toString();
                    String mobile = request.getPhoneNum();
                    String uid = "";
                    SendSmsRequest sendSmsRequest = new SendSmsRequest();
                    sendSmsRequest.setSid(accountSid);
                    sendSmsRequest.setAppid(appId);
                    sendSmsRequest.setMobile(mobile);
                    sendSmsRequest.setParam(param);
                    sendSmsRequest.setTemplateid("294195");
                    sendSmsRequest.setToken(authToken);
                    sendSmsRequest.setUid(uid);
                    RestAPIResult<String> result = edgeRemote.sendSms(sendSmsRequest);
                    redisTemplate.opsForValue().set("SMS:" + request.getPhoneNum(), param, 120, TimeUnit.SECONDS);
                    redisTemplate.delete("verfiyCode:" + request.getVcodestr());
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

    @Override
    public RestAPIResult<String> changePwdHandle(ChangePwdRequest request) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        String newPassword = RSAUtils.decryptDataOnJava(request.getNewPassword(), request.getRsaKey());
        UserInfoDO userInfoDO = userInfoDao.getUserInfoByUserId(request.getUid());
        String salt = IDUtils.showNextId(new Random().nextInt(30)).toString().substring(0, 16);
        userInfoDO.setPassword(MD5Utils.generate(newPassword, salt));
        userInfoDO.setSalt(salt);
        userInfoDO.setUpdateTime(new Date());
        userInfoDao.updateUserInfo(userInfoDO);
        CookieUtils.removeCookie("token");
        CookieUtils.removeCookie("uid");
        redisTemplate.opsForValue().set("LOGOUT:token", request.getToken(), 60 * 60 * 24 * 365, TimeUnit.SECONDS);
        panResult.success(null);
        panResult.setDataCode("200");
        return panResult;
    }

    @Override
    public RestAPIResult<String> loadImgHandle(String uid) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        UserInfoDO userInfoDO = userInfoDao.getUserInfoByUserId(uid);
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

    @Override
    public RestAPIResult<String> uploadPicHandle(String uid, MultipartFile file) throws IOException {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        String picLocation = fileRemote.upload(file).getRespData();
        UserInfoDO userInfoDO = userInfoDao.getUserInfoByUserId(uid);
        userInfoDO.setPicLocation(picLocation);
        userInfoDO.setUpdateTime(new Date());
        userInfoDao.updateUserInfo(userInfoDO);
        panResult.success(null);
        panResult.setDataCode("200");
        return panResult;
    }
}
