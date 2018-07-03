package top.quhailong.pan.regist.service;

import top.quhailong.pan.pojo.Userinfo;

public interface RegistService {
	Userinfo userRegist(String phoneNum,String username,String password,String RSAKey);
	boolean checkPhone(String phoneNum);
	boolean checkUsername(String username);
	boolean changePwd(String newPassword,String uid);
	String uploadPic(String uid,String path);
	String loadPic(String uid);
	String getUserPhone(String username);
	Userinfo modifyPass(String username,String password,String RSAKey);
}
