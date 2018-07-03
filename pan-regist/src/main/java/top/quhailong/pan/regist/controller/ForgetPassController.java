package top.quhailong.pan.regist.controller;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import top.quhailong.pan.pojo.Userinfo;
import top.quhailong.pan.regist.client.SmsFeignClient;
import top.quhailong.pan.regist.service.RegistService;
import top.quhailong.pan.regist.utils.MyRedisTemplate;
import top.quhailong.pan.utils.CookieUtils;
import top.quhailong.pan.utils.JWTUtils;
import top.quhailong.pan.utils.JsonUtils;
import top.quhailong.pan.utils.RestAPIResult;

@Controller
@CrossOrigin
public class ForgetPassController {
	@Autowired
	private MyRedisTemplate redisTemplate;
	@Autowired
	private RegistService registService;
	@Autowired
	private SmsFeignClient smsFeignClient;
	@RequestMapping("/getpass")
	public String index(Model model,HttpServletRequest request) {
		return "forgetpass";
	}
	/**
	 * 发送忘记密码短信服务
	 * @param phoneNum
	 * @param VerfyCode
	 * @param session
	 * @param vcodestr
	 * @return
	 */
	@RequestMapping(value = "/getpass/forgetphonesend" , method = { RequestMethod.POST })
	@ResponseBody
	public RestAPIResult<String> forgetphonesend(@RequestParam("username") String username,
			@RequestParam(required = false) String VerfyCode, HttpSession session,
			@RequestParam(required = false) String vcodestr) {
		RestAPIResult<String> panResult = new RestAPIResult<String>();
		if (vcodestr != null && VerfyCode != null && username != null) {
			if (redisTemplate.exists("verfiyCode", vcodestr)) {
				if (VerfyCode.equalsIgnoreCase(redisTemplate.get("verfiyCode", vcodestr))) {
					String phoneNum = registService.getUserPhone(username);
					if(phoneNum == null) {
						panResult.error("手机号码不存在");
						return panResult;
					}
					String sid = "";
					String token = "";
					String appid = "";
					String templateid = "";
					Integer sixNum = (int) ((Math.random() * 9 + 1) * 100000);
					String param = sixNum.toString();
					String mobile = phoneNum;
					String uid = "";
					try {
						RestAPIResult<String> result = smsFeignClient.sendSms(sid, token, appid, templateid, param, mobile, uid);
						redisTemplate.setWithExpireTime("SMSForget", phoneNum, param, 120);
						redisTemplate.deleteWithPrefix("verfiyCode", vcodestr);
						if (result.getRespMsg().equals("0")) {
							panResult.error("发送短信失败");
							return panResult;
						}
						panResult.success(null);
						return panResult;
					} catch (Exception e) {
						// TODO: handle exception
						panResult.error("发送短信失败");
						return panResult;
					}
				} else {
					panResult.error("验证码错误");
					return panResult;
				}
			} else {
				panResult.error("验证码错误");
				return panResult;
			}
		} else {
			panResult.error("别瞎捷豹改参数");
			return panResult;
		}
	}
	/**
	 * 手机号/用户名校验
	 * @param phoneNum
	 * @return
	 */
	@RequestMapping(value = "/getpass/checkphonesend" , method = { RequestMethod.POST })
	@ResponseBody
	public RestAPIResult<String> checkphone(@RequestParam("username") String username){
		RestAPIResult<String> panResult = new RestAPIResult<>();
		String userPhone = registService.getUserPhone(username);
		if(userPhone == null) {
			panResult.setRespCode(144);
			panResult.setRespData(null);
			return panResult;
		}else {
			panResult.success(null);
			return panResult;
		}
	}
	/**
	 * 忘记密码的修改
	 * @param phoneNum
	 * @param username
	 * @param password
	 * @param verifyCode
	 * @param RSAKey
	 * @param pid
	 * @return
	 */
	@RequestMapping(value = "/getpass/modifyPass", method = { RequestMethod.POST })
	@ResponseBody
	public RestAPIResult<String> userRegist(@RequestParam("username") String username, @RequestParam("password") String password,
			@RequestParam("verifyCode") String verifyCode, @RequestParam("RSAKey") String RSAKey) {
		RestAPIResult<String> panResult = new RestAPIResult<>();
			String phoneNum = registService.getUserPhone(username);
			if(phoneNum == null) {
				panResult.error("手机号码不存在");
				return panResult;
			}
			if (redisTemplate.exists("SMSForget", phoneNum) && redisTemplate.get("SMSForget", phoneNum).equals(verifyCode)) {
				try {
					Userinfo userinfo = registService.modifyPass(username, password, RSAKey);
					if(userinfo == null) {
						panResult.error("用户信息不存在");
						return panResult;
					}
					userinfo.setPassword("");
					String accessToken = JWTUtils.createJWT(UUID.randomUUID().toString().replaceAll("-", ""),
							JsonUtils.objectToJson(userinfo), 12 * 60 * 60 * 1000);

					CookieUtils.addCookie("token", accessToken);
					CookieUtils.addCookie("uid", userinfo.getUid());
					panResult.success(null);
					return panResult;
				} catch (Exception e) {
					// TODO: handle exception
					panResult.error("存入数据库发生错误");
					return panResult;
				}
			} else {
				panResult.error("验证码错误");
				return panResult;
			}

	}
}
