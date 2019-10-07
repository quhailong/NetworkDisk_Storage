package top.quhailong.pan.user.provider;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import top.quhailong.pan.response.UserInfoDTO;
import top.quhailong.pan.user.entity.UserInfoDO;
import top.quhailong.pan.user.service.UserInfoService;
import top.quhailong.pan.utils.*;

import java.util.Random;

/**
 * 账户服务数据处理类
 *
 * @author: quhailong
 * @date: 2019/9/25
 */
@Component
public class PassportProvider {
    @Autowired
    private UserInfoService userInfoService;
    @Autowired
    private JedisClusterUtil jedisClusterUtil;

    /**
     * 登录数据处理
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    public RestAPIResult<String> loginHandle(String username, String password, String RSAKey) throws Exception {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        password = RSAUtils.decryptDataOnJava(password, RSAKey);
        UserInfoDO userInfoDO = userInfoService.getUserInfoByPassport(username);
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

    /**
     * 退出数据处理
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    public RestAPIResult<String> logoutHandle(String token) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        if (!StringUtils.isEmpty(token)) {
            JWTUtils.parseJWT(token, "nimadetou".getBytes());
            CookieUtils.removeCookie("token");
            CookieUtils.removeCookie("uid");
            jedisClusterUtil.setValue("LOGOUT:" + token, token, 60 * 60 * 24 * 365);
            panResult.success(null);
            return panResult;
        } else {
            panResult.error("token不能为空");
            return panResult;
        }
    }

    /**
     * 获取用户信息数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    public RestAPIResult<UserInfoDTO> getUserInfoHandle(String userId){
        RestAPIResult<UserInfoDTO> panResult = new RestAPIResult<>();
        UserInfoDTO userInfoDTO = new UserInfoDTO();
        UserInfoDO userInfoDO = userInfoService.getUserInfoByUserId(userId);
        if(userInfoDO != null){
            BeanUtils.copyProperties(userInfoDO,userInfoDTO);
        }
        panResult.success(userInfoDTO);
        return panResult;
    }
}
