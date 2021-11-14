package top.quhailong.pan.user.service;

import top.quhailong.pan.response.UserInfoDTO;
import top.quhailong.pan.request.base.RestAPIResultDTO;

public interface PassportService {


    /**
     * 用户登录数据处理
     *
     * @author: quhailong
     * @date: 2020/8/9
     */
    RestAPIResultDTO<String> loginHandle(String username, String password, String RSAKey) throws Exception;

    /**
     * 用户推出数据处理
     *
     * @author: quhailong
     * @date: 2020/8/9
     */
    RestAPIResultDTO<String> logoutHandle(String token);

    /**
     * 获取用户信息数据处理
     *
     * @author: quhailong
     * @date: 2020/8/9
     */
    RestAPIResultDTO<UserInfoDTO> getUserInfoHandle(String userId);
}
