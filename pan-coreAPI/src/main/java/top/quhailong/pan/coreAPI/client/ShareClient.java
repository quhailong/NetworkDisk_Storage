package top.quhailong.pan.coreAPI.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import top.quhailong.pan.utils.RestAPIResult;

/**
 * 微服务调用
 * @author 屈海龙
 *
 */
@FeignClient(name="pan-share")
public interface ShareClient {
	@RequestMapping(value = "api/share", method = { RequestMethod.POST })
	public RestAPIResult<String> share(@RequestParam("expiration")String expiration,@RequestParam("flag")String flag,@RequestParam("uid")String uid,@RequestParam("vids")String vids);
	@RequestMapping(value = "api/shareList", method = { RequestMethod.POST })
	public RestAPIResult<String> shareList(@RequestParam("desc")Integer desc,@RequestParam("order")String order,@RequestParam("page")Integer page,@RequestParam("uid")String uid);
	@RequestMapping(value = "api/unShare", method = { RequestMethod.POST })
	public RestAPIResult<String> unShare(@RequestParam("uid")String uid,@RequestParam("vids")String vids);
	@RequestMapping(value = "api/saveShare", method = { RequestMethod.POST })
	public RestAPIResult<String> saveShare(@RequestParam("lockPassword")String lockPassword,@RequestParam("shareId")String shareId,@RequestParam("dest")String dest,@RequestParam("uid")String uid);
	@RequestMapping(value = "api/checkLock", method = { RequestMethod.POST })
	public RestAPIResult<String> checkLock(@RequestParam("shareId")String shareId);
	@RequestMapping(value = "api/verifykLock", method = { RequestMethod.POST })
	public RestAPIResult<String> verifykLock(@RequestParam("lockPassword")String lockPassword,@RequestParam("shareId")String shareId);
}
