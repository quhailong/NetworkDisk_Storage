package top.quhailong.pan.login.service.impl;

import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import top.quhailong.pan.login.mapper.UserinfoMapper;
import top.quhailong.pan.login.service.LoginService;
import top.quhailong.pan.pojo.Userinfo;
import top.quhailong.pan.pojo.UserinfoExample;
import top.quhailong.pan.pojo.UserinfoExample.Criteria;
import top.quhailong.pan.utils.MD5Utils;
@Service
public class LoginServiceImpl implements LoginService{
	@Autowired
	private UserinfoMapper userinfoMapper;
	@Override
	public Userinfo getUserinfo(String username,String password) {
		UserinfoExample userinfoExample = new UserinfoExample();
		Criteria criteria = userinfoExample.createCriteria();
		Pattern pattern = Pattern.compile("[0-9]*");
		if (pattern.matcher(username).matches()) {
			criteria.andPhoneEqualTo(username);
		}else {
			criteria.andUsernameEqualTo(username);
		}
		List<Userinfo> list = userinfoMapper.selectByExample(userinfoExample);
		if (list != null && list.size()>0) {
			Userinfo userinfo = list.get(0);
			if (MD5Utils.verify(password, userinfo.getPassword())) {
				userinfo.setPassword("");
				return userinfo;
			}else {
				return null;
			}
		}else {
			return null;
		}
	}
}
