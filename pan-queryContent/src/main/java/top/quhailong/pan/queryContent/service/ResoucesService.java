package top.quhailong.pan.queryContent.service;

import java.util.List;

import top.quhailong.pan.pojo.Capacity;
import top.quhailong.pan.pojo.FolderInfo;
import top.quhailong.pan.pojo.Virtualaddress;

public interface ResoucesService {
	public List<Virtualaddress> getList(String type,String path,String uid,Integer pageNum,String order,Integer desc);
	public List<FolderInfo> getFolderList(String uid, String parentPath);
	public List<Virtualaddress> search(String key,String uid,Integer pageNum,String order,Integer desc);
	public Capacity use(String uid);
}
