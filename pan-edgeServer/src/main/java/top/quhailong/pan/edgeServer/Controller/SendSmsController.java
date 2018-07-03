package top.quhailong.pan.edgeServer.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import top.quhailong.pan.edgeServer.utils.AbsRestClient;
import top.quhailong.pan.edgeServer.utils.JsonReqClient;
import top.quhailong.pan.pojo.SmsResult;
import top.quhailong.pan.utils.JsonUtils;
import top.quhailong.pan.utils.RestAPIResult;

@RestController
public class SendSmsController {
	@RequestMapping("/api/sendSms")
	public RestAPIResult<String> sendSms(@RequestParam("sid")String sid,
			@RequestParam("token")String token,@RequestParam("appid")String appid,@RequestParam("templateid")String templateid,
			@RequestParam("param")String param,@RequestParam("mobile")String mobile,@RequestParam("uid")String uid){
		RestAPIResult<String> panResult = new RestAPIResult<String>();
		try {
			String jsonResult = InstantiationRestAPI().sendSms(sid, token, appid, templateid, param, mobile, uid);
			System.out.println("Response content is: " + jsonResult);
			SmsResult result = JsonUtils.jsonToPojo(jsonResult, SmsResult.class);
			if(!result.getMsg().equals("OK")) {
				panResult.error();
				panResult.setRespData(result.getMsg());
				return panResult;
			}
		} catch (Exception e) {
			// TODO: handle exception
			panResult.error();
			return panResult;
		}
		panResult.success(null);
		return panResult;
	}
	static AbsRestClient InstantiationRestAPI() {
		return new JsonReqClient();
	}
}
