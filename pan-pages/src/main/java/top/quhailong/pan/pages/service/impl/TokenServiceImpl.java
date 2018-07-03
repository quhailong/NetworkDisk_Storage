package top.quhailong.pan.pages.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import top.quhailong.pan.pages.service.TokenService;
import top.quhailong.pan.pages.utils.MyRedisTemplate;
import top.quhailong.pan.pojo.Userinfo;
import top.quhailong.pan.utils.JsonUtils;
import top.quhailong.pan.utils.PanResult;
@Service
public class TokenServiceImpl implements TokenService {
	@Autowired
	private MyRedisTemplate redisTemplate;

	@Override
	public PanResult getUserByToken(String token) {
		// 根据token到redis中取用户信息
		String json = redisTemplate.get("SESSION:" , token);
		// 取不到用户信息，登录已经过期，返回登录过期
		if (StringUtils.isBlank(json)) {
			return PanResult.build(201, "用户登录已经过期");
		}
		// 取到用户信息,更新token的过期时间
		redisTemplate.expire("SESSION" , token);
		// 返回结果，PanResult其中包含TbUser对象 
		Userinfo user = (Userinfo) JsonUtils.jsonToPojo(json, Userinfo.class);
		return PanResult.ok(user);
	}

	@Override
	public boolean exists(String prefix, String key) {
		// TODO Auto-generated method stub
		return redisTemplate.exists(prefix, key);
	}

}
