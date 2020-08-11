package top.quhailong.pan.user.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
public class UserInfoDO {
    private Integer id;

    private String userId;

    private String userName;

    private String password;

    private String phone;

    private String salt;

    private String picLocation;

    private Date createTime;

    private Date updateTime;
}