package top.quhailong.pan.user.service;

import top.quhailong.pan.response.UserInfoDTO;
import top.quhailong.pan.utils.RestAPIResult;

public interface PassportService {


    /**
     * 用户登录数据处理
     *
     * @author: quhailong
     * @date: 2020/8/9
     */
    RestAPIResult<String> loginHandle(String username, String password, String RSAKey) throws Exception;

    /**
     * 用户推出数据处理
     *
     * @author: quhailong
     * @date: 2020/8/9
     */
    RestAPIResult<String> logoutHandle(String token);

    /**
     * 获取用户信息数据处理
     *
     * @author: quhailong
     * @date: 2020/8/9
     */
    RestAPIResult<UserInfoDTO> getUserInfoHandle(String userId);
}
