package top.quhailong.pan.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import top.quhailong.pan.user.dao.UserInfoDao;
import top.quhailong.pan.user.entity.UserInfoDO;
import top.quhailong.pan.user.service.UserInfoService;
@Component
public class UserInfoServiceImpl implements UserInfoService {
    @Autowired
    private UserInfoDao userInfoDao;
    @Override
    public UserInfoDO getUserInfoByPassport(String passport) {
        return userInfoDao.getUserInfoByPassport(passport);
    }

    @Override
    public UserInfoDO getUserInfoByUserNameOrPhone(String userName, String phone) {
        return userInfoDao.getUserInfoByUserNameOrPhone(userName, phone);
    }

    @Override
    public Integer saveUserInfo(UserInfoDO userInfoDO) {
        return userInfoDao.saveUserInfo(userInfoDO);
    }

    @Override
    public Integer updateUserInfo(UserInfoDO userInfoDO) {
        return userInfoDao.updateUserInfo(userInfoDO);
    }

    @Override
    public UserInfoDO getUserInfoByUserId(String userId) {
        return userInfoDao.getUserInfoByUserId(userId);
    }
}
