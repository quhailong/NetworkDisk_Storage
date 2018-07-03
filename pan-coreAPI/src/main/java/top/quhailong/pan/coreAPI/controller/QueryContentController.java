package top.quhailong.pan.coreAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import top.quhailong.pan.coreAPI.client.QueryContentClient;
import top.quhailong.pan.utils.RestAPIResult;

@RestController
@RequestMapping("api")
public class QueryContentController {
	@Autowired(required=true)
	private QueryContentClient queryContentClient;
	@RequestMapping(value = "list", method = { RequestMethod.POST })
	public RestAPIResult<String> getList(String uid,String type, String path,Integer page,String order,Integer desc){
		RestAPIResult<String> result = queryContentClient.getList(uid, type, path, page, order, desc);
		return result;
	}
	@RequestMapping(value = "folderList", method = { RequestMethod.POST })
	public RestAPIResult<String> getFolderList(String uid, String parentPath){
		RestAPIResult<String> result = queryContentClient.getFolderList(uid, parentPath);
		return result;
	}
	@RequestMapping(value = "search", method = { RequestMethod.POST })
	public RestAPIResult<String> search(String uid, String key,Integer page,String order,Integer desc){
		RestAPIResult<String> result = queryContentClient.search(uid, key, page, order, desc);
		return result;
	}
	@RequestMapping(value = "use", method = { RequestMethod.POST })
	public RestAPIResult<String> use(String uid){
		RestAPIResult<String> result = queryContentClient.use(uid);
		return result;
	}
}
