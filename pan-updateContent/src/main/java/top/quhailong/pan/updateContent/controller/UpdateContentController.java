package top.quhailong.pan.updateContent.controller;

import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import top.quhailong.pan.pojo.Virtualaddress;
import top.quhailong.pan.updateContent.service.ResoucesService;
import top.quhailong.pan.utils.JsonUtils;
import top.quhailong.pan.utils.RestAPIResult;
@RestController
@RequestMapping("api")
public class UpdateContentController {
	@Autowired
	private ResoucesService resoucesService;
	/**
	 * 文件复制或移动
	 * @param uid
	 * @param vids
	 * @param dest
	 * @param opera
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "filemanager", method = { RequestMethod.POST })
	public RestAPIResult<String> filemanager(String uid,String vids,String dest,String opera) throws Exception {
		RestAPIResult<String> panResult = new RestAPIResult<String>();
			try {
				List<String> list = JsonUtils.jsonToList(vids, String.class);
				for (String string : list) {	
					Virtualaddress virtualaddress = resoucesService.checkFileType(string);
					if(virtualaddress.getAddrtype() != null) {
						if(virtualaddress.getAddrtype() != 0) {
							if(opera.equals("copyOK")) {
								if(virtualaddress.getParentpath().equals("/")) {
									if((dest.equals(virtualaddress.getParentpath()) || dest.indexOf(virtualaddress.getParentpath() + virtualaddress.getFilename()) == 0)) {
										panResult.error("不能将文件复制到自身或其子文件夹中");
										return panResult;
									}	
								}else {
									if((dest.equals(virtualaddress.getParentpath()) || dest.indexOf(virtualaddress.getParentpath() + "/" + virtualaddress.getFilename()) == 0)) {
										panResult.error("不能将文件复制到自身或其子文件夹中");
										return panResult;
									}
								}	
							}else if(opera.equals("moveOK")){
								if(virtualaddress.getParentpath().equals("/")) {
									if((dest.equals(virtualaddress.getParentpath()) || dest.indexOf(virtualaddress.getParentpath() + virtualaddress.getFilename()) == 0)) {
										panResult.error("不能将文件移动到自身或其子文件夹中");
										return panResult;
									}	
								}else {
									if((dest.equals(virtualaddress.getParentpath()) || dest.indexOf(virtualaddress.getParentpath() + "/" + virtualaddress.getFilename()) == 0)) {
										panResult.error("不能将文件移动到自身或其子文件夹中");
										return panResult;
									}
								}	
							}else {
								panResult.error("操作异常");
								return panResult;
							}
							if(!resoucesService.copyOrMoveFile(virtualaddress, dest, opera)) {
								panResult.error("出现异常");
								return panResult;
							}
						}else {
							if(opera.equals("copyOK")) {
								if(virtualaddress.getParentpath().equals("/")) {
									if((dest.equals(virtualaddress.getParentpath()) || dest.indexOf(virtualaddress.getParentpath() + virtualaddress.getFilename()) == 0) && opera.equals("moveOK")) {
										panResult.error("不能将文件夹复制到自身或其子文件夹中");
										return panResult;
									}	
								}else {
									if((dest.equals(virtualaddress.getParentpath()) || dest.indexOf(virtualaddress.getParentpath() + "/" + virtualaddress.getFilename()) == 0) && opera.equals("moveOK")) {
										panResult.error("不能将文件夹复制到自身或其子文件夹中");
										return panResult;
									}
								}	
							}else if(opera.equals("moveOK")){
								if(virtualaddress.getParentpath().equals("/")) {
									if((dest.equals(virtualaddress.getParentpath()) || dest.indexOf(virtualaddress.getParentpath() + virtualaddress.getFilename()) == 0) && opera.equals("moveOK")) {
										panResult.error("不能将文件夹移动到自身或其子文件夹中");
										return panResult;
									}	
								}else {
									if((dest.equals(virtualaddress.getParentpath()) || dest.indexOf(virtualaddress.getParentpath() + "/" + virtualaddress.getFilename()) == 0) && opera.equals("moveOK")) {
										panResult.error("不能将文件夹移动到自身或其子文件夹中");
										return panResult;
									}
								}	
							}else {
								panResult.error("操作异常");
								return panResult;
							}
							if(!resoucesService.copyOrMoveDirFile(virtualaddress, dest, opera)) {
								panResult.error("出现异常");
								return panResult;
							}
						}
					}else {
						panResult.error("不存在!!!!");
						return panResult;
					}
				}
				panResult.success(null);
				panResult.setDataCode("200");
				return panResult;
			} catch (Exception e) {
				panResult.error("出现异常");
				return panResult;
			}
	}
	/**
	 * 文件或文件夹重命名
	 * @param token
	 * @param newName
	 * @param vid
	 * @param flag
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "rename", method = { RequestMethod.POST })
	public RestAPIResult<String> rename(String uid,String newName,String vid,String flag) throws Exception {
		RestAPIResult<String> panResult = new RestAPIResult<String>();
			try {
				Virtualaddress virtualaddress = resoucesService.checkFileType(vid);
				if(virtualaddress.getAddrtype() != 0) {
					if(resoucesService.checkFileName(vid, virtualaddress.getParentpath(), newName) || flag!=null) {
						resoucesService.changeFileName(vid, virtualaddress.getParentpath(), newName);
						panResult.setRespCode(200);
						panResult.setRespData("200");
						return panResult;
					}else {
						panResult.setRespCode(203);
						panResult.setRespData("有重名");
						return panResult;
					}	
				}else {
					if(resoucesService.checkFileName(vid, virtualaddress.getParentpath(), newName) || flag!=null) {
						resoucesService.changeDirFileName(vid, virtualaddress.getParentpath(), newName);
						panResult.setRespCode(200);
						panResult.setRespData("200");
						return panResult;
					}else {
						panResult.setRespCode(203);
						panResult.setRespData("有重名");
						return panResult;
					}	
					
				}
				
			} catch (Exception e) {
				panResult.error("出现异常");
				return panResult;
			}
	}
	/**
	 * 删除文件
	 * @param token
	 * @param vids
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "del", method = { RequestMethod.POST })
	public RestAPIResult<String> del(String uid,String vids) throws Exception {
		RestAPIResult<String> panResult = new RestAPIResult<String>();
			try {
				List<String> list = JsonUtils.jsonToList(vids, String.class);
				for (String string : list) {	
					Virtualaddress virtualaddress = resoucesService.checkFileType(string);
					if(virtualaddress.getAddrtype() != null) {
						if(virtualaddress.getAddrtype() != 0) {
							resoucesService.delFile(virtualaddress);
						}else {
							resoucesService.delDirFile(virtualaddress);
						}
					}else {
						panResult.error("不存在!!!!");
						return panResult;
					}
				}
				panResult.success(null);
				panResult.setDataCode("200");
				return panResult;
			} catch (Exception e) {
				panResult.error("出现异常");
				return panResult;
			}
	}
	/**
	 * 创建文件夹
	 * @param dirName
	 * @param uid
	 * @param parentPath
	 * @return
	 */
	@RequestMapping("/createDir") // new annotation since 4.3
	@ResponseBody
	public RestAPIResult<String> createDir(String dirName, String uid, String parentPath) {
		RestAPIResult<String> panResult = new RestAPIResult<String>();
		if (!Pattern.compile("^[a-zA-Z0-9\u4E00-\u9FA5_]+$").matcher(dirName).matches()) {
			panResult.error("文件夹长度必须小于20，并且不能包含特殊字符，只能为数字、字母、中文、下划线");
			return panResult;
		}
			try {
				parentPath = URLDecoder.decode(parentPath, "UTF-8");
				Virtualaddress createDir = resoucesService.createDir(dirName, uid, parentPath);
				Map<String, Object> map = new HashMap<>();
				map.put("0", JsonUtils.objectToJson(createDir));
				panResult.setRespMap(map);
				panResult.setRespData("200");
				return panResult;
			} catch (Exception e) {
				panResult.error("出现异常");
				return panResult;
			}
	}
}
