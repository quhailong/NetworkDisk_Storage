package top.quhailong.pan.regist.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import top.quhailong.pan.utils.RestAPIResult;
/**
 * 微服务调用
 * @author 屈海龙
 *
 */
@FeignClient(name="edge-service")
public interface SmsFeignClient {
	@RequestMapping("/api/sendSms")
	public RestAPIResult<String> sendSms(@RequestParam("sid")String sid,
			@RequestParam("token")String token,@RequestParam("appid")String appid,@RequestParam("templateid")String templateid,
			@RequestParam("param")String param,@RequestParam("mobile")String mobile,@RequestParam("uid")String uid);
}
