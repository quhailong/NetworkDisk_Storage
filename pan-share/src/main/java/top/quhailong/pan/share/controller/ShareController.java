package top.quhailong.pan.share.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import top.quhailong.pan.pojo.Share;
import top.quhailong.pan.pojo.Userinfo;
import top.quhailong.pan.share.service.ShareService;
import top.quhailong.pan.utils.JsonUtils;
import top.quhailong.pan.utils.RestAPIResult;
@RestController
@RequestMapping("api")
public class ShareController {
	@Autowired
	private ShareService shareService;
	@RequestMapping(value = "share", method = { RequestMethod.POST })
	public RestAPIResult<String> share(String expiration,String flag,String uid,String vids) throws Exception {
		RestAPIResult<String> panResult = new RestAPIResult<String>();
		if (flag.equals("public")) {
			String result = shareService.createPublicShare(uid, vids, expiration);
			panResult.success("null");
			panResult.setRespData(result);
		}else if(flag.equals("private")){
			String[] result = shareService.createPrivateShare(uid, vids, expiration);
			panResult.success("null");
			panResult.setRespData(result[0] + "," + result[1]);
		}else {
			panResult.error();
		}
		return panResult;	
	}
	@RequestMapping(value = "shareList", method = { RequestMethod.POST })
	public RestAPIResult<String> shareList(Integer desc,String order,Integer page,String uid){
		RestAPIResult<String> panResult = new RestAPIResult<String>();
		List<Share> list = shareService.shareList(desc, order, page, uid);
		if(list!=null && list.size()>0) {
			Map<String, Object> map = new HashMap<>();
			int i = 0;
			for (Share share : list) {
				map.put(i++ + "", JsonUtils.objectToJson(share));
			}
			panResult.setRespMap(map);
			panResult.setRespData("200");
			return panResult;
		}else {
			panResult.success(null);
			return panResult;
		}
	}
	@RequestMapping(value = "unShare", method = { RequestMethod.POST })
	public RestAPIResult<String> unShare(String uid,String vids){
		RestAPIResult<String> panResult = new RestAPIResult<String>();
		if(shareService.unShare(uid, vids)) {
			panResult.success(null);
			return panResult;
		}else {
			panResult.error();
			return panResult;
		}
	}
	@RequestMapping(value = "getShareUser", method = { RequestMethod.POST })
	public RestAPIResult<String> getShareUser(String shareId){
		RestAPIResult<String> panResult = new RestAPIResult<String>();
		Map<String,Object> map = new HashMap<>();
		try {
			Userinfo userinfo = shareService.getShareUser(shareId);
			Share share = shareService.getShare(shareId);
			panResult.success(null);
			map.put("userinfo", JsonUtils.objectToJson(userinfo));
			map.put("share", JsonUtils.objectToJson(share));
			panResult.setRespMap(map);
			return panResult;
		} catch (Exception e) {
			// TODO: handle exception
			panResult.error();
			return panResult;
		}
	}
	@RequestMapping(value = "saveShare", method = { RequestMethod.POST })
	public RestAPIResult<String> saveShare(String lockPassword,String shareId,String dest,String uid){
		RestAPIResult<String> panResult = new RestAPIResult<String>();
		if(!shareService.verifyLock(lockPassword, shareId)) {
			panResult.error("提取密码不正确");
			return panResult;
		}
		try {
			if(shareService.saveShare(uid, shareId, dest)) {
				panResult.success(null);
				return panResult;
			}else {
				panResult.error("保存失败，容量不足");
				return panResult;
			}
		} catch (Exception e) {
			// TODO: handle exception
			panResult.error();
			return panResult;
		}
	}
	@RequestMapping(value = "checkLock", method = { RequestMethod.POST })
	public RestAPIResult<String> checkLock(@RequestParam("shareId")String shareId){
		RestAPIResult<String> panResult = new RestAPIResult<String>();
		Integer checkLock = shareService.checkLock(shareId);
		if(checkLock!=null) {
			if(checkLock == 1) {
				panResult.success(null);
				panResult.setRespData("Lock");
				return panResult;
			}else {
				panResult.success(null);
				panResult.setRespData("unLock");
				return panResult;
			}
		}else {
			panResult.error();
			return panResult;
		}
	}
	@RequestMapping(value = "verifykLock", method = { RequestMethod.POST })
	public RestAPIResult<String> verifykLock(@RequestParam("lockPassword")String lockPassword,@RequestParam("shareId")String shareId){
		RestAPIResult<String> panResult = new RestAPIResult<String>();
		if(shareService.verifyLock(lockPassword, shareId)) {
			panResult.success(null);
			panResult.setRespData("200");
			return panResult;
		}else {
			panResult.error();
			panResult.setRespData("500");
			return panResult;
		}
	}
	@RequestMapping(value = "getVinfo", method = { RequestMethod.POST })
	public RestAPIResult<String> getUid(@RequestParam("shareId")String shareId,@RequestParam("lockPassword")String lockPassword){
		RestAPIResult<String> panResult = new RestAPIResult<String>();
		Map<String, Object> map = new HashMap<>();
		if(!shareService.verifyLock(lockPassword, shareId)) {
			panResult.error();
			return panResult;
		}else {
			List<String> vids = shareService.getVids(shareId);
			String uid = shareService.getUid(shareId);
			panResult.success(null);
			map.put("vid", vids);
			map.put("uid", uid);
			panResult.setRespMap(map);
			return panResult;
		}
	}
	@RequestMapping(value = "addShareView", method = { RequestMethod.POST })
	public void addShareView(@RequestParam("shareId")String shareId){
		shareService.addShareView(shareId);
	}
	@RequestMapping(value = "addShareDownload", method = { RequestMethod.POST })
	public void addShareDownload(@RequestParam("shareId")String shareId){
		shareService.addShareDownload(shareId);
	}
}
