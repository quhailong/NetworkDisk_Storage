package top.quhailong.pan.regist.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;
import java.util.regex.Pattern;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import top.quhailong.pan.pojo.FastDFSFile;
import top.quhailong.pan.pojo.Userinfo;
import top.quhailong.pan.regist.client.SmsFeignClient;
import top.quhailong.pan.regist.service.RegistService;
import top.quhailong.pan.regist.utils.FastDFSClient;
import top.quhailong.pan.regist.utils.MyRedisTemplate;
import top.quhailong.pan.utils.CookieUtils;
import top.quhailong.pan.utils.JWTUtils;
import top.quhailong.pan.utils.JsonUtils;
import top.quhailong.pan.utils.RSAUtils;
import top.quhailong.pan.utils.RestAPIResult;

@RestController
@RequestMapping("v2")
public class RegistController {
	private static Logger logger = LoggerFactory.getLogger(RegistController.class);
	@Autowired
	private RegistService registService;
	@Autowired
	private MyRedisTemplate redisTemplate;
	@Autowired
	private SmsFeignClient smsFeignClient;
	/**
	 * 用户名查重
	 * @param username
	 * @return
	 */
	@RequestMapping(value = "regcheckusername" , method = { RequestMethod.POST })
	public RestAPIResult<String> checkusername(@RequestParam("username") String username){
		RestAPIResult<String> panResult = new RestAPIResult<>();
		if (Pattern.compile("^[a-zA-Z0-9\u4E00-\u9FA5_]+$").matcher(username).matches() && !Pattern.compile("^[0-9]+$").matcher(username).matches() ) {
			if (registService.checkUsername(username)) {
				panResult.success(null);
				return panResult;
			}else {
				panResult.error("用户名已经被使用了，请更换");
				return panResult;
			}
		}else {
			panResult.error("用户名仅支持中英文、数字和下划线,且不能为纯数字");
			return panResult;
		}
	}
	/**
	 * 手机号查重
	 * @param phoneNum
	 * @return
	 */
	@RequestMapping(value = "regcheckphone" , method = { RequestMethod.POST })
	public RestAPIResult<String> checkphone(@RequestParam("phoneNum") String phoneNum){
		RestAPIResult<String> panResult = new RestAPIResult<>();
		if (Pattern.compile("^[1][3,4,5,7,8][0-9]{9}$").matcher(phoneNum).matches()) {
			if (registService.checkPhone(phoneNum)) {
				panResult.success(null);
				return panResult;
			}else {
				panResult.setRespCode(144);
				panResult.setRespData(null);
				return panResult;
			}
		}else {
			panResult.error("手机号码格式不正确");
			return panResult;
		}
	}
	/**
	 * 手机号注册
	 * @param phoneNum
	 * @param username
	 * @param password
	 * @param verifyCode
	 * @param RSAKey
	 * @param pid
	 * @return
	 */
	@RequestMapping(value = "api/regphone", method = { RequestMethod.POST })
	public RestAPIResult<String> userRegist(@RequestParam("phoneNum") String phoneNum,
			@RequestParam("username") String username, @RequestParam("password") String password,
			@RequestParam("verifyCode") String verifyCode, @RequestParam("RSAKey") String RSAKey,
			@RequestParam("pid") String pid) {
		RestAPIResult<String> panResult = new RestAPIResult<>();
		if (redisTemplate.exists("regist", pid)) {
			if (redisTemplate.exists("SMS", phoneNum) && redisTemplate.get("SMS", phoneNum).equals(verifyCode)) {
				try {
					Userinfo userinfo = registService.userRegist(phoneNum, username, password, RSAKey);
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
		} else {
			panResult.error("页面失效，请刷新页面");
			return panResult;
		}

	}
	/**
	 * 发送短信服务
	 * @param phoneNum
	 * @param VerfyCode
	 * @param session
	 * @param vcodestr
	 * @return
	 */
	@RequestMapping(value = "regphonesend" , method = { RequestMethod.POST })
	public RestAPIResult<String> regphonesend(@RequestParam("phoneNum") String phoneNum,
			@RequestParam(required = false) String VerfyCode, HttpSession session,
			@RequestParam(required = false) String vcodestr) {
		RestAPIResult<String> panResult = new RestAPIResult<String>();
		if (vcodestr == null && VerfyCode == null) {
			if (registService.checkPhone(phoneNum)) {
				panResult.setRespCode(1);
				panResult.setRespData(UUID.randomUUID().toString().replaceAll("-", ""));
				return panResult;
			} else {
				panResult.error("手机号码已注册");
				return panResult;
			}
		} else if (vcodestr != null && VerfyCode != null && phoneNum != null) {
			if (redisTemplate.exists("verfiyCode", vcodestr)) {
				if (VerfyCode.equalsIgnoreCase(redisTemplate.get("verfiyCode", vcodestr))) {
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
						redisTemplate.setWithExpireTime("SMS", phoneNum, param, 120);
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
	@RequestMapping(value = "api/changePwd", method = { RequestMethod.POST })
	public RestAPIResult<String> changePwd(@RequestParam("token") String token,@RequestParam("uid") String uid,@RequestParam("newPassword") String newPassword,@RequestParam("RSAKey") String RSAKey) {
		RestAPIResult<String> panResult = new RestAPIResult<>();
		newPassword = RSAUtils.decryptDataOnJava(newPassword, RSAKey);
		registService.changePwd(newPassword, uid);
		CookieUtils.removeCookie("token");
		CookieUtils.removeCookie("uid");
		redisTemplate.setWithExpireTime("LOGOUT", "token", token,60*60*24*365);
		panResult.success(null);
		panResult.setDataCode("200");
		return panResult;

	}
	@RequestMapping(value = "api/uploadPic", method = { RequestMethod.POST })
	public RestAPIResult<String> uploadPic(@RequestParam("uid") String uid,@RequestParam("file") MultipartFile file) {
		RestAPIResult<String> panResult = new RestAPIResult<>();
		try {
			String path = saveFile(file);
			String uploadPic = registService.uploadPic(uid, path);
			if(!uploadPic.equals("/")) {
				String groupName = uploadPic.substring(0, uploadPic.indexOf("/"));
				String remoteFileName = uploadPic.substring(groupName.length() + 1,uploadPic.length());
				FastDFSClient.deleteFile(groupName, remoteFileName);
			}
			panResult.success(null);
			panResult.setDataCode("200");
			return panResult;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			panResult.error("服务器错误");
			return panResult;
		}
	}
	@RequestMapping(value = "api/loadImg", method = { RequestMethod.POST })
	public RestAPIResult<String> loadImg(@RequestParam("uid") String uid) {
		RestAPIResult<String> panResult = new RestAPIResult<>();
		String picLoction = registService.loadPic(uid);
		if (picLoction.contains("group")) {
			panResult.success("null");
			panResult.setRespData(picLoction);
		}else {
			panResult.success("null");
			panResult.setRespData("group1/M00/00/00/rBUADlsZ1FSAFTaGAAAJL6K5LJc011.jpg");
		}
		return panResult;
	}
	public String saveFile(MultipartFile multipartFile) throws IOException {
		String[] fileAbsolutePath = {};
		String fileName = multipartFile.getOriginalFilename();
		String ext = fileName.substring(fileName.lastIndexOf(".") + 1);
		byte[] file_buff = null;
		InputStream inputStream = multipartFile.getInputStream();
		if (inputStream != null) {
			int len1 = inputStream.available();
			file_buff = new byte[len1];
			inputStream.read(file_buff);
		}
		inputStream.close();
		FastDFSFile file = new FastDFSFile(fileName, file_buff, ext);
		try {
			fileAbsolutePath = FastDFSClient.upload(file); // upload to fastdfs
		} catch (Exception e) {
			logger.error("upload file Exception!", e);
		}
		if (fileAbsolutePath == null) {
			logger.error("upload file failed,please upload again!");
		}
		// String path=FastDFSClient.getTrackerUrl()+fileAbsolutePath[0]+
		// "/"+fileAbsolutePath[1];
		return fileAbsolutePath[0] + "/" + fileAbsolutePath[1];
	}
}
