package top.quhailong.pan.coreAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import top.quhailong.pan.coreAPI.client.UpdateContentClient;
import top.quhailong.pan.utils.RestAPIResult;

@RestController
@RequestMapping("api")
public class UpdateContentController {
	@Autowired
	private UpdateContentClient updateContentClient;
	@RequestMapping(value = "filemanager", method = { RequestMethod.POST })
	public RestAPIResult<String> filemanager(String uid,String vids,String dest,String opera){
		RestAPIResult<String> result = updateContentClient.filemanager(uid, vids, dest, opera);
		return result;
	}
	@RequestMapping(value = "rename", method = { RequestMethod.POST })
	public RestAPIResult<String> rename(String uid,String newName,String vid,String flag){
		RestAPIResult<String> result = updateContentClient.rename(uid, newName, vid, flag);
		return result;
	}
	@RequestMapping(value = "del", method = { RequestMethod.POST })
	public RestAPIResult<String> del(String uid,String vids){
		RestAPIResult<String> result = updateContentClient.del(uid, vids);
		return result;
	}
	@RequestMapping(value = "createDir", method = { RequestMethod.POST })
	public RestAPIResult<String> createDir(@RequestParam("dirName")String dirName, @RequestParam("uid")String uid, @RequestParam("parentPath")String parentPath){
		RestAPIResult<String> result = updateContentClient.createDir(dirName, uid, parentPath);
		return result;
	}
}
