package top.quhailong.pan.user.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import top.quhailong.pan.constant.RedisConstants;
import top.quhailong.pan.framework.redis.core.utils.RedisUtil;
import top.quhailong.pan.response.UserInfoDTO;
import top.quhailong.pan.user.dao.UserInfoDao;
import top.quhailong.pan.user.entity.UserInfoDO;
import top.quhailong.pan.user.service.PassportService;
import top.quhailong.pan.utils.*;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class PassportServiceImpl implements PassportService {
    @Autowired
    private UserInfoDao userInfoDao;
    @Autowired
    private RedisUtil redisUtil;

    @Override
    public RestAPIResult<String> loginHandle(String username, String password, String RSAKey) throws Exception {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        password = RSAUtils.decryptDataOnJava(password, RSAKey);
        UserInfoDO userInfoDO = userInfoDao.getUserInfoByPassport(username);
        if (userInfoDO != null) {
            if (MD5Utils.verify(password, userInfoDO.getPassword())) {
                String accessToken = JWTUtils.createJWT(IDUtils.showNextId(new Random().nextInt(30)).toString(),
                        JSONUtils.toJSONString(userInfoDO), 30 * 24 * 60 * 60 * 1000);

                CookieUtils.addCookie("token", accessToken);
                CookieUtils.addCookie("uid", userInfoDO.getUserId());
                panResult.success(null);
                return panResult;
            }
        }
        panResult.error("用户信息不存在");
        return panResult;
    }

    @Override
    public RestAPIResult<String> logoutHandle(String token) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        if (!StringUtils.isEmpty(token)) {
            JWTUtils.parseJWT(token, "nimadetou".getBytes());
            CookieUtils.removeCookie("token");
            CookieUtils.removeCookie("uid");
            redisUtil.setEx(String.format(RedisConstants.LOGOUT, token), token, 60 * 60 * 24 * 365, TimeUnit.SECONDS);
            panResult.success(null);
            return panResult;
        } else {
            panResult.error("token不能为空");
            return panResult;
        }
    }

    @Override
    public RestAPIResult<UserInfoDTO> getUserInfoHandle(String userId) {
        RestAPIResult<UserInfoDTO> panResult = new RestAPIResult<>();
        UserInfoDTO userInfoDTO = new UserInfoDTO();
        UserInfoDO userInfoDO = userInfoDao.getUserInfoByUserId(userId);
        if (userInfoDO != null) {
            BeanUtils.copyProperties(userInfoDO, userInfoDTO);
        }
        panResult.success(userInfoDTO);
        return panResult;
    }
}
