package top.quhailong.pan.file.client;

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
	@RequestMapping(value = "api/getVinfo", method = { RequestMethod.POST })
	public RestAPIResult<String> getVinfo(@RequestParam("shareId")String shareId,@RequestParam("lockPassword")String lockPassword);
	@RequestMapping(value = "api/addShareDownload", method = { RequestMethod.POST })
	public void addShareDownload(@RequestParam("shareId")String shareId);
}
