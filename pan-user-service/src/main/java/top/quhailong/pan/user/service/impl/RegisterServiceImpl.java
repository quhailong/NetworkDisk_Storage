package top.quhailong.pan.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import top.quhailong.pan.constant.RedisConstants;
import top.quhailong.pan.enums.ResultCodeEnum;
import top.quhailong.pan.framework.redis.core.utils.RedisUtil;
import top.quhailong.pan.request.ChangePwdRequest;
import top.quhailong.pan.request.RegPhoneSendRequest;
import top.quhailong.pan.request.SendSmsRequest;
import top.quhailong.pan.request.UserRegistRequest;
import top.quhailong.pan.request.base.RestAPIResultDTO;
import top.quhailong.pan.user.dao.UserInfoDao;
import top.quhailong.pan.user.entity.UserInfoDO;
import top.quhailong.pan.user.remote.CoreRemote;
import top.quhailong.pan.user.remote.EdgeRemote;
import top.quhailong.pan.user.remote.FileRemote;
import top.quhailong.pan.user.service.RegisterService;
import top.quhailong.pan.utils.*;

import java.io.IOException;
import java.util.Date;
import java.util.Objects;
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
    @Value("${sms-register-template-id}")
    private String templateId;
    @Autowired
    private UserInfoDao userInfoDao;
    @Autowired
    private CoreRemote coreRemote;
    @Autowired
    private EdgeRemote edgeRemote;
    @Autowired
    private FileRemote fileRemote;
    @Autowired
    private RedisUtil redisUtil;

    @Override
    public RestAPIResultDTO<String> checkUserNameHandle(String username) {
        if (Pattern.compile("^[a-zA-Z0-9\u4E00-\u9FA5_]+$").matcher(username).matches() && !Pattern.compile("^[0-9]+$").matcher(username).matches()) {
            UserInfoDO userInfoDO = userInfoDao.getUserInfoByUserNameOrPhone(username, null);
            if (userInfoDO != null) {
                return RestAPIResultDTO.Error("用户名已经被使用了，请更换");
            }
            return RestAPIResultDTO.Success("用户名没有被使用");
        } else {
            return RestAPIResultDTO.Error("用户名仅支持中英文、数字和下划线,且不能为纯数字");
        }
    }

    @Override
    public RestAPIResultDTO<String> checkPhoneHandle(String phoneNum) {
        if (Pattern.compile("^[1][3,4,5,7,8][0-9]{9}$").matcher(phoneNum).matches()) {
            UserInfoDO userInfoDO = userInfoDao.getUserInfoByUserNameOrPhone(null, phoneNum);
            if (userInfoDO != null) {
                return RestAPIResultDTO.Error("用户名已经被使用了", 144);
            }
            return RestAPIResultDTO.Success("用户名没有被使用");
        } else {
            return RestAPIResultDTO.Error("手机号码格式不正确");
        }
    }

    @Override
    public RestAPIResultDTO<String> userRegistHandle(UserRegistRequest request) throws Exception {
        if (redisUtil.hasKey(String.format(RedisConstants.REGIST, request.getPid()))) {
            if (redisUtil.hasKey(String.format(RedisConstants.SMS, request.getPhoneNum())) && redisUtil.get(String.format(RedisConstants.SMS, request.getPhoneNum())).equals(request.getVerifyCode())) {
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
                return RestAPIResultDTO.Success("注册成功");
            } else {
                return RestAPIResultDTO.Error("验证码错误");
            }
        } else {
            return RestAPIResultDTO.Error("页面失效，请刷新页面");
        }
    }

    @Override
    public RestAPIResultDTO<String> regPhoneSendHandle(RegPhoneSendRequest request) {
        if (request.getVcodestr() == null && request.getVcodestr() == null) {
            UserInfoDO userInfoDO = userInfoDao.getUserInfoByUserNameOrPhone(null, request.getPhoneNum());
            if (userInfoDO != null) {
                return RestAPIResultDTO.Error("手机号码已注册");
            } else {
                return RestAPIResultDTO.Success(UUID.randomUUID().toString().replaceAll("-", ""), "注册成功");
            }
        } else if (request.getVcodestr() != null && request.getVerfyCode() != null && request.getPhoneNum() != null) {
            if (redisUtil.hasKey(String.format(RedisConstants.VERFIYCODE, request.getVcodestr()))) {
                if (request.getVerfyCode().equalsIgnoreCase(redisUtil.get(String.format(RedisConstants.VERFIYCODE, request.getVcodestr())))) {
                    Integer sixNum = (int) ((Math.random() * 9 + 1) * 100000);
                    String param = sixNum.toString();
                    String mobile = request.getPhoneNum();
                    String uid = "";
                    SendSmsRequest sendSmsRequest = new SendSmsRequest();
                    sendSmsRequest.setSid(accountSid);
                    sendSmsRequest.setAppid(appId);
                    sendSmsRequest.setMobile(mobile);
                    sendSmsRequest.setParam(param);
                    sendSmsRequest.setTemplateid(templateId);
                    sendSmsRequest.setToken(authToken);
                    sendSmsRequest.setUid(uid);
                    RestAPIResultDTO<String> result = edgeRemote.sendSms(sendSmsRequest);
                    redisUtil.setEx(String.format(RedisConstants.SMS, request.getPhoneNum()), param, 120, TimeUnit.SECONDS);
                    redisUtil.delete(String.format(RedisConstants.VERFIYCODE, request.getVcodestr()));
                    if (result.errorWhether()) {
                        return RestAPIResultDTO.Error("发送短信失败");
                    }
                    return RestAPIResultDTO.Success("发送短信成功");
                } else {
                    return RestAPIResultDTO.Error("验证码错误");
                }
            } else {
                return RestAPIResultDTO.Error("验证码错误");
            }
        } else {
            return RestAPIResultDTO.Error(null, ResultCodeEnum.PARAMATER_ERROR);
        }
    }

    @Override
    public RestAPIResultDTO<String> changePwdHandle(ChangePwdRequest request) {
        String newPassword = RSAUtils.decryptDataOnJava(request.getNewPassword(), request.getRsaKey());
        UserInfoDO userInfoDO = userInfoDao.getUserInfoByUserId(request.getUid());
        String salt = IDUtils.showNextId(new Random().nextInt(30)).toString().substring(0, 16);
        userInfoDO.setPassword(MD5Utils.generate(newPassword, salt));
        userInfoDO.setSalt(salt);
        userInfoDO.setUpdateTime(new Date());
        userInfoDao.updateUserInfo(userInfoDO);
        CookieUtils.removeCookie("token");
        CookieUtils.removeCookie("uid");
        redisUtil.setEx(String.format(RedisConstants.LOGOUT, request.getToken()), request.getToken(), 60 * 60 * 24 * 365, TimeUnit.SECONDS);
        return RestAPIResultDTO.Success("修改成功");
    }

    @Override
    public RestAPIResultDTO<String> loadImgHandle(String uid) {
        UserInfoDO userInfoDO = userInfoDao.getUserInfoByUserId(uid);
        String picLocation = userInfoDO.getPicLocation();
        if (picLocation.contains("group")) {
            return RestAPIResultDTO.Success(picLocation, "成功");
        } else {
            return RestAPIResultDTO.Success("group1/M00/00/00/wKhdgF2RromAYwaYAAAJL2wXkdY418_big.jpg", "成功");
        }
    }

    @Override
    public RestAPIResultDTO<String> uploadPicHandle(String uid, MultipartFile file) throws IOException {
        String picLocation = fileRemote.upload(file).getRespData();
        UserInfoDO userInfoDO = userInfoDao.getUserInfoByUserId(uid);
        userInfoDO.setPicLocation(picLocation);
        userInfoDO.setUpdateTime(new Date());
        userInfoDao.updateUserInfo(userInfoDO);
        return RestAPIResultDTO.Success("上传成功");
    }
}
