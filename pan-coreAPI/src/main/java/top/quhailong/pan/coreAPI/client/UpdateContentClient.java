package top.quhailong.pan.coreAPI.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import top.quhailong.pan.utils.RestAPIResult;

@FeignClient(name="updateContent-service")
public interface UpdateContentClient {
	@RequestMapping(value = "api/filemanager", method = { RequestMethod.POST })
	public RestAPIResult<String> filemanager(@RequestParam("uid")String uid,@RequestParam("vids")String vids,@RequestParam("dest")String dest,@RequestParam("opera")String opera);
	@RequestMapping(value = "api/rename", method = { RequestMethod.POST })
	public RestAPIResult<String> rename(@RequestParam("uid")String uid,@RequestParam("newName")String newName,@RequestParam("vid")String vid,@RequestParam("flag")String flag);
	@RequestMapping(value = "api/del", method = { RequestMethod.POST })
	public RestAPIResult<String> del(@RequestParam("uid")String uid,@RequestParam("vids")String vids);
	@RequestMapping(value = "api/createDir", method = { RequestMethod.POST })
	public RestAPIResult<String> createDir(@RequestParam("dirName")String dirName, @RequestParam("uid")String uid, @RequestParam("parentPath")String parentPath);
}
