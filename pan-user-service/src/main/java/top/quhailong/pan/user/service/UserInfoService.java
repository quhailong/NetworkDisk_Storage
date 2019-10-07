package top.quhailong.pan.user.service;

import top.quhailong.pan.user.entity.UserInfoDO;

public interface UserInfoService {
    /**
     * 根据登录凭证获取用户信息
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    UserInfoDO getUserInfoByPassport(String passport);

    /**
     * 根据用户名或手机号获取用户信息
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    UserInfoDO getUserInfoByUserNameOrPhone(String userName, String phone);

    /**
     * 保存用户信息
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    Integer saveUserInfo(UserInfoDO userInfoDO);

    /**
     * 更新用户信息
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    Integer updateUserInfo(UserInfoDO userInfoDO);

    /**
     * 根据用户ID获取用户信息
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    UserInfoDO getUserInfoByUserId(String userId);
}
