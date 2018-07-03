package top.quhailong.pan.pages.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import top.quhailong.pan.utils.RestAPIResult;

/**
 * feign与@RequestParam配合使用时，一定要写value值。
 * feign方法的@RequestMapping，务必与服务端方法保持一致，请求类型，请求参数，返回值等等
 * 
 * TODO 可以从服务端定义一个接口层，服务实现层实现接口，调用方扩展此接口，即可完成接口定义的复用，而无须在此重新复制一次。
 * 但此举会导致服务端接口变动后，调用方就会直接受影响，建议事先约定好规则
 * 
 * @author quhailong
 *
 */
@FeignClient(name="pan-share")
public interface ShareClient {
	@RequestMapping(value = "api/getShareUser", method = { RequestMethod.POST })
	public RestAPIResult<String> getShareUser(@RequestParam("shareId")String shareId);
	@RequestMapping(value = "api/addShareView", method = { RequestMethod.POST })
	public void addShareView(@RequestParam("shareId")String shareId);
}
