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
@FeignClient(name="queryContent-service")
public interface QueryContentClient {
	@RequestMapping(value = "api/list", method = { RequestMethod.POST })
	public RestAPIResult<String> getList(@RequestParam("uid")String uid,@RequestParam("type")String type, @RequestParam("path")String path,@RequestParam("page")Integer page,@RequestParam("order")String order,@RequestParam("desc")Integer desc);
	@RequestMapping(value = "api/folderList", method = { RequestMethod.POST })
	public RestAPIResult<String> getFolderList(@RequestParam("uid")String uid, @RequestParam("parentPath")String parentPath);
	@RequestMapping(value = "api/search", method = { RequestMethod.POST })
	public RestAPIResult<String> search(@RequestParam("uid")String uid, @RequestParam("key")String key,@RequestParam("page")Integer page,@RequestParam("order")String order,@RequestParam("desc")Integer desc);
	@RequestMapping(value = "api/use", method = { RequestMethod.POST })
	public RestAPIResult<String> use(@RequestParam("uid")String uid);
}
