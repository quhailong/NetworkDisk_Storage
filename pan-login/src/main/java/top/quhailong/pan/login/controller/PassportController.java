package top.quhailong.pan.login.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import top.quhailong.pan.login.service.LoginService;
import top.quhailong.pan.login.utils.MyRedisTemplate;
import top.quhailong.pan.pojo.Userinfo;
import top.quhailong.pan.utils.CookieUtils;
import top.quhailong.pan.utils.JWTUtils;
import top.quhailong.pan.utils.JsonUtils;
import top.quhailong.pan.utils.RSAUtils;
import top.quhailong.pan.utils.RestAPIResult;

@RestController
@RequestMapping("v2")
public class PassportController {
	@Autowired
	private LoginService loginService;
	@Autowired
	private MyRedisTemplate redisTemplate;

	@RequestMapping(value = "api/login", method = { RequestMethod.POST })
	public RestAPIResult<String> login(@RequestParam("username") String username,
			@RequestParam("password") String password, @RequestParam("RSAKey") String RSAKey) {
		RestAPIResult<String> panResult = new RestAPIResult<String>();
		password = RSAUtils.decryptDataOnJava(password, RSAKey);
		Userinfo userinfo = loginService.getUserinfo(username, password);
		try {
			String accessToken = JWTUtils.createJWT(UUID.randomUUID().toString().replaceAll("-", ""),
					JsonUtils.objectToJson(userinfo), 30 * 24 * 60 * 60 * 1000);

			CookieUtils.addCookie("token", accessToken);
			CookieUtils.addCookie("uid", userinfo.getUid());
			panResult.success(null);
			return panResult;
		} catch (Exception e) {
			// TODO: handle exception
			panResult.error("用户信息不存在");
			return panResult;
		}

	}
	/**
	 * 退出
	 * @param token
	 * @return
	 */
	@RequestMapping(value = "api/logout", method = { RequestMethod.POST })
	public RestAPIResult<String> logout(@RequestParam("token") String token) {
		RestAPIResult<String> panResult = new RestAPIResult<>();
		if (!StringUtils.isEmpty(token)) {
			try {
				JWTUtils.parseJWT(token, "nimadetou".getBytes());
				CookieUtils.removeCookie("token");
				CookieUtils.removeCookie("uid");
				redisTemplate.setWithExpireTime("LOGOUT", "token", token,60*60*24*365);
				panResult.success(null);
				return panResult;
			} catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException
					| IllegalArgumentException exception) {
				// TODO: handle exception
				exception.printStackTrace();
				panResult.error("此token已过期");
				return panResult;
			}
		}else {
			panResult.error("token不能为空");
			return panResult;
		}
	}

}
