package top.quhailong.pan.regist.service.impl;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import top.quhailong.pan.pojo.Capacity;
import top.quhailong.pan.pojo.Userinfo;
import top.quhailong.pan.pojo.UserinfoExample;
import top.quhailong.pan.pojo.UserinfoExample.Criteria;
import top.quhailong.pan.regist.mapper.CapacityMapper;
import top.quhailong.pan.regist.mapper.UserinfoMapper;
import top.quhailong.pan.regist.service.RegistService;
import top.quhailong.pan.utils.MD5Utils;
import top.quhailong.pan.utils.RSAUtils;
@Service
public class RegistServiceImpl implements RegistService {
	@Autowired
	private UserinfoMapper userinfoMapper;
	@Autowired
	private CapacityMapper capacityMapper;
	@Override
	public Userinfo userRegist(String phoneNum, String username, String password, String RSAKey) {
		password = RSAUtils.decryptDataOnJava(password, RSAKey);
		Userinfo userinfo = new Userinfo();
		String salt = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 16);
		userinfo.setPassword(MD5Utils.generate(password, salt));
		userinfo.setSalt(salt);
		userinfo.setPhone(phoneNum);
		userinfo.setUsername(username);
		String uid = UUID.randomUUID().toString().replaceAll("-", "");
		userinfo.setUid(uid);
		userinfo.setCreatetime(new Date());
		userinfo.setUpdatetime(new Date());
		userinfo.setPiclocation("/");
		userinfoMapper.insert(userinfo);
		userinfo.setPassword("");
		Capacity capacity = new Capacity();
		capacity.setUid(uid);
		capacity.setTotal(5368709120l);
		capacity.setUsed(0l);
		capacityMapper.insert(capacity);
		return userinfo;
	}
	@Override
	public boolean checkPhone(String phoneNum) {
		UserinfoExample userinfoExample = new UserinfoExample();
		userinfoExample.createCriteria().andPhoneEqualTo(phoneNum);
		List<Userinfo> list = userinfoMapper.selectByExample(userinfoExample);
		if (list != null && list.size()>0) {
			return false;
		}else {
			return true;
		}
	}
	@Override
	public boolean checkUsername(String username) {
		UserinfoExample userinfoExample = new UserinfoExample();
		userinfoExample.createCriteria().andUsernameEqualTo(username);
		List<Userinfo> list = userinfoMapper.selectByExample(userinfoExample);
		if (list != null && list.size()>0) {
			return false;
		}else {
			return true;
		}
	}
	@Override
	public boolean changePwd(String newPassword, String uid) {
		Userinfo userinfo = userinfoMapper.selectByPrimaryKey(uid);
		String salt = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 16);
		userinfo.setPassword(MD5Utils.generate(newPassword, salt));
		userinfo.setSalt(salt);
		userinfo.setUpdatetime(new Date());
		userinfoMapper.updateByPrimaryKey(userinfo);
		return false;
	}
	@Override
	public String uploadPic(String uid, String path) {
		// TODO Auto-generated method stub
		Userinfo userinfo = userinfoMapper.selectByPrimaryKey(uid);
		String oldPicLocation = userinfo.getPiclocation();
		userinfo.setPiclocation(path);
		userinfo.setUpdatetime(new Date());
		userinfoMapper.updateByPrimaryKey(userinfo);
		return oldPicLocation;
	}
	@Override
	public String loadPic(String uid) {
		Userinfo userinfo = userinfoMapper.selectByPrimaryKey(uid);
		String piclocation = userinfo.getPiclocation();
		return piclocation;
	}
	@Override
	public String getUserPhone(String username) {
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
			return userinfo.getPhone();
		}else {
			return null;
		}
	}
	@Override
	public Userinfo modifyPass(String username, String password, String RSAKey) {
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
			password = RSAUtils.decryptDataOnJava(password, RSAKey);
			String salt = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 16);
			userinfo.setPassword(MD5Utils.generate(password, salt));
			userinfo.setSalt(salt);
			userinfo.setUpdatetime(new Date());
			userinfoMapper.updateByPrimaryKey(userinfo);
			userinfo.setPassword("");
			return userinfo;
		}else {
			return null;
		}
		
	}

}
