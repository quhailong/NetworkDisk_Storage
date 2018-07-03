package top.quhailong.pan.queryContent.controller;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import top.quhailong.pan.pojo.Capacity;
import top.quhailong.pan.pojo.FolderInfo;
import top.quhailong.pan.pojo.Virtualaddress;
import top.quhailong.pan.queryContent.service.ResoucesService;
import top.quhailong.pan.utils.JsonUtils;
import top.quhailong.pan.utils.RestAPIResult;

@RestController
@RequestMapping("api")
public class QueryContentController {
	@Autowired
	private ResoucesService resoucesService;
	/**
	 * 展示文件
	 * @param type
	 * @param token
	 * @param path
	 * @param page
	 * @param order
	 * @param desc
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "list", method = { RequestMethod.POST })
	public RestAPIResult<String> getList(String type, String uid, String path,Integer page,String order,Integer desc) throws Exception {
		if(path != null) {
			path = URLDecoder.decode(path, "UTF-8");
		}
		RestAPIResult<String> panResult = new RestAPIResult<String>();
		List<Virtualaddress> list = new ArrayList<>();
			try {
				list = resoucesService.getList(type, path,uid,page,order,desc);
				if(list!=null && list.size()>0) {
					Map<String, Object> map = new HashMap<>();
					int i = 0;
					for (Virtualaddress virtualaddress : list) {
						map.put(i++ + "", JsonUtils.objectToJson(virtualaddress));
					}
					panResult.setRespMap(map);
					panResult.setRespData("200");
					return panResult;
				}else {
					panResult.success(null);
					return panResult;
				}
			} catch (Exception e) {
				panResult.error("出现异常");
				return panResult;
			}
	}
	/**
	 * 展示文件夹
	 * @param token
	 * @param parentPath
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "folderList", method = { RequestMethod.POST })
	public RestAPIResult<String> getFolderList(String uid, String parentPath) throws Exception {
		if(parentPath != null) {
			parentPath = URLDecoder.decode(parentPath, "UTF-8");
		}
		RestAPIResult<String> panResult = new RestAPIResult<String>();
		List<FolderInfo> list = new ArrayList<>();
			try {
				list = resoucesService.getFolderList(uid, parentPath);
				if(list!=null && list.size()>0) {
					Map<String, Object> map = new HashMap<>();
					int i = 0;
					for (FolderInfo folderInfo : list) {
						map.put(i++ + "", JsonUtils.objectToJson(folderInfo));
					}
					panResult.setRespMap(map);
					panResult.setRespData("200");
					return panResult;
				}else {
					panResult.success(null);
					return panResult;
				}
			} catch (Exception e) {
				panResult.error("出现异常");
				return panResult;
			}
	}
	/**
	 * 查找文件
	 * @param token
	 * @param key
	 * @param page
	 * @param order
	 * @param desc
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "search", method = { RequestMethod.POST })
	public RestAPIResult<String> search(String uid, String key,Integer page,String order,Integer desc) throws Exception {
		key = URLDecoder.decode(key, "UTF-8");
		RestAPIResult<String> panResult = new RestAPIResult<String>();
			try {
				List<Virtualaddress> list = resoucesService.search(key,uid, page, order, desc);
				if(list!=null && list.size()>0) {
					Map<String, Object> map = new HashMap<>();
					int i = 0;
					for (Virtualaddress virtualaddress : list) {
						map.put(i++ + "", JsonUtils.objectToJson(virtualaddress));
					}
					panResult.setRespMap(map);
					panResult.setRespData("200");
					return panResult;
				}else {
					panResult.setRespData("200");
					return panResult;
				}
			} catch (Exception e) {
				panResult.error("出现异常");
				return panResult;
			}
	}
	@RequestMapping(value = "use", method = { RequestMethod.POST })
	public RestAPIResult<String> use(String uid) throws Exception {
		RestAPIResult<String> panResult = new RestAPIResult<String>();
			try {
				Capacity use = resoucesService.use(uid);
				String useJson = JsonUtils.objectToJson(use);
				panResult.success(null);
				panResult.setRespData(useJson);
				return panResult;
			} catch (Exception e) {
				panResult.error("出现异常");
				return panResult;
			}
	}
}
