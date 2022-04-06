package top.quhailong.pan.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.stereotype.Service;
import top.quhailong.pan.constant.RedisConstants;
import top.quhailong.pan.enums.ResultCodeEnum;
import top.quhailong.pan.framework.redis.core.utils.RedisUtil;
import top.quhailong.pan.request.ForgetPhoneSendRequest;
import top.quhailong.pan.request.ModifyPassRequest;
import top.quhailong.pan.request.SendSmsRequest;
import top.quhailong.pan.request.base.RestAPIResultDTO;
import top.quhailong.pan.user.dao.UserInfoDao;
import top.quhailong.pan.user.entity.UserInfoDO;
import top.quhailong.pan.user.remote.EdgeRemote;
import top.quhailong.pan.user.service.PasswordService;
import top.quhailong.pan.utils.*;

import java.util.Date;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@RefreshScope
@Service
public class PasswordServiceImpl implements PasswordService {
    @Autowired
    private RedisUtil redisUtil;
    @Autowired
    private EdgeRemote edgeRemote;
    @Autowired
    private UserInfoDao userInfoDao;
    @Value("${sms-accountSid}")
    private String accountSid;
    @Value("${sms-appId}")
    private String appId;
    @Value("${sms-authToken}")
    private String authToken;
    @Value("${sms-forget-pass-template-id}")
    private String templateId;

    @Override
    public RestAPIResultDTO<String> forgetPhoneSendHandle(ForgetPhoneSendRequest request) {
        if (request.getVcodestr() != null && request.getVerfyCode() != null && request.getUsername() != null) {
            if (redisUtil.hasKey(String.format(RedisConstants.VERFIYCODE, request.getVcodestr()))) {
                if (request.getVerfyCode().equalsIgnoreCase(redisUtil.get(String.format(RedisConstants.VERFIYCODE, request.getVcodestr())))) {
                    UserInfoDO userInfoDO = userInfoDao.getUserInfoByPassport(request.getUsername());
                    if (userInfoDO != null && userInfoDO.getPhone() == null) {
                        return RestAPIResultDTO.Error("手机号码不存在");
                    }
                    Integer sixNum = (int) ((Math.random() * 9 + 1) * 100000);
                    String param = sixNum.toString();
                    String mobile = userInfoDO.getPhone();
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
                    redisUtil.setEx(String.format(RedisConstants.SMSForget, userInfoDO.getPhone()), param, 120, TimeUnit.SECONDS);
                    redisUtil.delete(String.format(RedisConstants.VERFIYCODE, request.getVcodestr()));
                    if (result.errorWhether()) {
                        return RestAPIResultDTO.Error("发送短信失败");
                    }
                    return RestAPIResultDTO.Success("短信发送成功");
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
    public RestAPIResultDTO<String> checkPhoneSendHandle(String username) {
        UserInfoDO userInfoDO = userInfoDao.getUserInfoByPassport(username);
        String userPhone = userInfoDO.getPhone();
        if (userPhone == null) {
            return RestAPIResultDTO.Error("用户已存在", 144);
        } else {
            return RestAPIResultDTO.Success("用户可用");
        }
    }

    @Override
    public RestAPIResultDTO<String> modifyPassHandle(ModifyPassRequest request) {
        UserInfoDO userInfoDO = userInfoDao.getUserInfoByPassport(request.getUsername());
        if (userInfoDO == null) {
            return RestAPIResultDTO.Error("用户信息不存在");
        }
        String phoneNum = userInfoDO.getPhone();
        if (phoneNum == null) {
            return RestAPIResultDTO.Error("手机号码不存在");
        }

        if (redisUtil.hasKey(String.format(RedisConstants.SMSForget, phoneNum)) && redisUtil.get(String.format(RedisConstants.SMSForget, phoneNum)).equals(request.getVerifyCode())) {
            try {
                String rsaKey = redisUtil.get(request.getPublicKey());
                String newPassword = RSAUtils.decryptDataOnJava(request.getPassword(), rsaKey);
                String salt = IDUtils.showNextId(new Random().nextInt(30)).toString().substring(0, 16);
                userInfoDO.setPassword(MD5Utils.generate(newPassword, salt));
                userInfoDO.setSalt(salt);
                userInfoDO.setUpdateTime(new Date());
                userInfoDao.updateUserInfo(userInfoDO);
                userInfoDO.setPassword("");
                String accessToken = JWTUtils.createJWT(IDUtils.showNextId(new Random().nextInt(30)).toString(), JSONUtils.toJSONString(userInfoDO), 12 * 60 * 60 * 1000);
                CookieUtils.addCookie("token", accessToken);
                CookieUtils.addCookie("uid", userInfoDO.getUserId());
                redisUtil.delete(request.getPublicKey());
                return RestAPIResultDTO.Success("修改密码成功");
            } catch (Exception e) {
                return RestAPIResultDTO.Error("存入数据库发生错误");
            }
        } else {
            return RestAPIResultDTO.Error("验证码错误");
        }
    }
}
