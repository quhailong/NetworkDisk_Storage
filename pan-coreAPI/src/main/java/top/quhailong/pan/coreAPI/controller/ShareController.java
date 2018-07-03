package top.quhailong.pan.coreAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import top.quhailong.pan.coreAPI.client.ShareClient;
import top.quhailong.pan.utils.RestAPIResult;

@RestController
@RequestMapping("api")
public class ShareController {
	@Autowired
	private ShareClient shareClient;
	@RequestMapping(value = "share", method = { RequestMethod.POST })
	public RestAPIResult<String> share(String expiration,String flag,String uid,String vids){
		RestAPIResult<String> result = shareClient.share(expiration,flag,uid,vids);
		return result;
	}
	@RequestMapping(value = "shareList", method = { RequestMethod.POST })
	public RestAPIResult<String> shareList(@RequestParam("desc")Integer desc,@RequestParam("order")String order,@RequestParam("page")Integer page,@RequestParam("uid")String uid){
		RestAPIResult<String> result = shareClient.shareList(desc, order, page, uid);
		return result;
	}
	@RequestMapping(value = "unShare", method = { RequestMethod.POST })
	public RestAPIResult<String> unShare(@RequestParam("uid")String uid,@RequestParam("vids")String vids){
		RestAPIResult<String> result = shareClient.unShare(uid, vids);
		return result;
	}
	@RequestMapping(value = "saveShare", method = { RequestMethod.POST })
	public RestAPIResult<String> saveShare(@RequestParam("lockPassword")String lockPassword,@RequestParam("shareId")String shareId,@RequestParam("dest")String dest,@RequestParam("uid")String uid){
		RestAPIResult<String> result = shareClient.saveShare(lockPassword,shareId, dest, uid);
		return result;
	}
	@RequestMapping(value = "checkLock", method = { RequestMethod.POST })
	public RestAPIResult<String> checkLock(@RequestParam("shareId")String shareId){
		RestAPIResult<String> result = shareClient.checkLock(shareId);
		return result;
	}
	@RequestMapping(value = "verifykLock", method = { RequestMethod.POST })
	public RestAPIResult<String> verifykLock(@RequestParam("lockPassword")String lockPassword,@RequestParam("shareId")String shareId){
		RestAPIResult<String> result = shareClient.verifykLock(lockPassword, shareId);
		return result;
	}
}
