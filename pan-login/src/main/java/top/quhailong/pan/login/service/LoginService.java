package top.quhailong.pan.login.service;

import top.quhailong.pan.pojo.Userinfo;

public interface LoginService {
	public Userinfo getUserinfo(String username,String password);
}
