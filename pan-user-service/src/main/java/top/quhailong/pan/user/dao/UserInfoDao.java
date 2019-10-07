package top.quhailong.pan.user.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import top.quhailong.pan.user.entity.UserInfoDO;

@Component
public interface UserInfoDao {
    int deleteByPrimaryKey(Integer id);

    int insert(UserInfoDO record);

    int insertSelective(UserInfoDO record);

    UserInfoDO selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(UserInfoDO record);

    int updateByPrimaryKey(UserInfoDO record);

    /**
     * 根据登录凭证获取用户信息
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    UserInfoDO getUserInfoByPassport(@Param("passport") String passport);

    /**
     * 根据用户名或手机号获取用户信息
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    UserInfoDO getUserInfoByUserNameOrPhone(@Param("userName") String userName, @Param("phone") String phone);

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
    UserInfoDO getUserInfoByUserId(@Param("userId") String userId);
}