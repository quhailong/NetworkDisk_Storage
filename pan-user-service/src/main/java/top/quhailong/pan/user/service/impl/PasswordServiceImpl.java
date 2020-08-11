package top.quhailong.pan.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.quhailong.pan.request.ForgetPhoneSendRequest;
import top.quhailong.pan.request.ModifyPassRequest;
import top.quhailong.pan.request.SendSmsRequest;
import top.quhailong.pan.user.dao.UserInfoDao;
import top.quhailong.pan.user.entity.UserInfoDO;
import top.quhailong.pan.user.remote.EdgeRemote;
import top.quhailong.pan.user.service.PasswordService;
import top.quhailong.pan.utils.*;

import java.util.Date;
import java.util.Random;

@Service
public class PasswordServiceImpl implements PasswordService {
    @Autowired
    private JedisClusterUtil jedisClusterUtil;
    @Autowired
    private EdgeRemote edgeRemote;
    @Autowired
    private UserInfoDao userInfoDao;

    @Override
    public RestAPIResult<String> forgetPhoneSendHandle(ForgetPhoneSendRequest request) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        if (request.getVcodestr() != null && request.getVerfyCode() != null && request.getUsername() != null) {
            if (jedisClusterUtil.isExistKey("verfiyCode:" + request.getVcodestr())) {
                if (request.getVerfyCode().equalsIgnoreCase(jedisClusterUtil.getValue("verfiyCode:" + request.getVcodestr()))) {
                    UserInfoDO userInfoDO = userInfoDao.getUserInfoByPassport(request.getUsername());
                    if (userInfoDO != null && userInfoDO.getPhone() == null) {
                        panResult.error("手机号码不存在");
                        return panResult;
                    }
                    String sid = "";
                    String token = "";
                    String appid = "";
                    String templateid = "";
                    Integer sixNum = (int) ((Math.random() * 9 + 1) * 100000);
                    String param = sixNum.toString();
                    String mobile = userInfoDO.getPhone();
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
                    jedisClusterUtil.setValue("SMSForget:" + userInfoDO.getPhone(), param, 120);
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

    @Override
    public RestAPIResult<String> checkPhoneSendHandle(String username) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        UserInfoDO userInfoDO = userInfoDao.getUserInfoByPassport(username);
        String userPhone = userInfoDO.getPhone();
        if (userPhone == null) {
            panResult.setRespCode(144);
            panResult.setRespData(null);
            return panResult;
        } else {
            panResult.success(null);
            return panResult;
        }
    }

    @Override
    public RestAPIResult<String> modifyPassHandle(ModifyPassRequest request) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        UserInfoDO userInfoDO = userInfoDao.getUserInfoByPassport(request.getUsername());
        if (userInfoDO == null) {
            panResult.error("用户信息不存在");
            return panResult;
        }
        String phoneNum = userInfoDO.getPhone();
        if (phoneNum == null) {
            panResult.error("手机号码不存在");
            return panResult;
        }

        if (jedisClusterUtil.isExistKey("SMSForget:" + phoneNum) && jedisClusterUtil.getValue("SMSForget:" + phoneNum).equals(request.getVerifyCode())) {
            try {
                String newPassword = RSAUtils.decryptDataOnJava(request.getPassword(), request.getRsaKey());
                String salt = IDUtils.showNextId(new Random().nextInt(30)).toString().substring(0, 16);
                userInfoDO.setPassword(MD5Utils.generate(newPassword, salt));
                userInfoDO.setSalt(salt);
                userInfoDO.setUpdateTime(new Date());
                userInfoDao.updateUserInfo(userInfoDO);
                userInfoDO.setPassword("");
                String accessToken = JWTUtils.createJWT(IDUtils.showNextId(new Random().nextInt(30)).toString(), JSONUtils.toJSONString(userInfoDO), 12 * 60 * 60 * 1000);
                CookieUtils.addCookie("token", accessToken);
                CookieUtils.addCookie("uid", userInfoDO.getUserId());
                panResult.success(null);
                return panResult;
            } catch (Exception e) {
                panResult.error("存入数据库发生错误");
                return panResult;
            }
        } else {
            panResult.error("验证码错误");
            return panResult;
        }
    }
}
