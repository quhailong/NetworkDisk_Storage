package top.quhailong.pan.queryContent.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;

import top.quhailong.pan.pojo.Capacity;
import top.quhailong.pan.pojo.FolderInfo;
import top.quhailong.pan.pojo.Virtualaddress;
import top.quhailong.pan.pojo.VirtualaddressExample;
import top.quhailong.pan.pojo.VirtualaddressExample.Criteria;
import top.quhailong.pan.queryContent.mapper.CapacityMapper;
import top.quhailong.pan.queryContent.mapper.VirtualaddressMapper;
import top.quhailong.pan.queryContent.service.ResoucesService;
@Service
public class ResoucesServiceImpl implements ResoucesService {
	@Autowired
	private VirtualaddressMapper virtualaddressMapper;
	@Autowired
	private CapacityMapper capacityMapper;
	@Override
	public List<Virtualaddress> getList(String type, String path,String uid,Integer pageNum,String order,Integer desc) {
		PageHelper.startPage(pageNum, 100);
		if(desc.equals(1)) {
			if(type.equals("all")) {
				PageHelper.orderBy("isDir desc," + order + " desc");
			}else {
				PageHelper.orderBy(order + " desc");
			}
		}else {
			if(type.equals("all")) {
				PageHelper.orderBy("isDir desc," + order + " asc");
			}else {
				PageHelper.orderBy(order + " asc");
			}
		}
		VirtualaddressExample virtualaddressExample = new VirtualaddressExample();
		Criteria criteria = virtualaddressExample.createCriteria();
		criteria.andUidEqualTo(uid);
		if (type.equals("all")) {
			criteria.andParentpathEqualTo(path);
		}else if(type.equals("pic")){
			criteria.andAddrtypeEqualTo(1);
		}else if(type.equals("doc")) {
			criteria.andAddrtypeEqualTo(2);
		}else if(type.equals("video")) {
			criteria.andAddrtypeEqualTo(3);
		}else if(type.equals("mbt")) {
			criteria.andAddrtypeEqualTo(4);
		}else if(type.equals("music")){
			criteria.andAddrtypeEqualTo(5);
		}else if(type.equals("other")) {
			criteria.andAddrtypeEqualTo(6);
		}else {
			criteria.andAddrtypeEqualTo(7);
		}
		List<Virtualaddress> list = virtualaddressMapper.selectByExample(virtualaddressExample);
		if (list != null && list.size()>0) {
			return list;
		}else {
			return null;
		}
	}
	@Override
	public List<FolderInfo> getFolderList(String uid, String parentPath) {
		List<FolderInfo> folderInfos = new ArrayList<>();
		PageHelper.orderBy("fileName desc");
		VirtualaddressExample virtualaddressExample = new VirtualaddressExample();
		Criteria criteria = virtualaddressExample.createCriteria();
		criteria.andUidEqualTo(uid).andParentpathEqualTo(parentPath).andAddrtypeEqualTo(0);
		List<Virtualaddress> list = virtualaddressMapper.selectByExample(virtualaddressExample);
		if(list!=null && list.size()>0) {
			for (Virtualaddress virtualaddress : list) {
				VirtualaddressExample virtualaddressExample2 = new VirtualaddressExample();
				Criteria criteria2 = virtualaddressExample2.createCriteria();
				if(parentPath.equals("/")) {
					criteria2.andAddrtypeEqualTo(0).andUidEqualTo(uid).andParentpathEqualTo(parentPath + virtualaddress.getFilename());
				}else {
					criteria2.andAddrtypeEqualTo(0).andUidEqualTo(uid).andParentpathEqualTo(parentPath + "/" + virtualaddress.getFilename());
				}
				List<Virtualaddress> list2 = virtualaddressMapper.selectByExample(virtualaddressExample2);
				FolderInfo folderInfo = new FolderInfo();
				if(parentPath.equals("/")) {
					folderInfo.setPath(parentPath + virtualaddress.getFilename());
				}else {
					folderInfo.setPath(parentPath + "/" + virtualaddress.getFilename());
				}
				if(list2!=null && list2.size()>0) {
					folderInfo.setDir_empty(1);
				}else {
					folderInfo.setDir_empty(0);
				}
				folderInfos.add(folderInfo);
			}
			return folderInfos;
		}else {
			return null;
		}
	}
	@Override
	public List<Virtualaddress> search(String key,String uid, Integer pageNum, String order, Integer desc) {
		PageHelper.startPage(pageNum, 100);
		PageHelper.orderBy("isDir desc," + order + " desc");
		VirtualaddressExample example = new VirtualaddressExample();
		Criteria criteria = example.createCriteria();
		criteria.andUidEqualTo(uid);
		criteria.andFilenameLike("%" + key + "%");
		List<Virtualaddress> list = virtualaddressMapper.selectByExample(example);
		return list;
	}
	@Override
	public Capacity use(String uid) {
		Capacity capacity = capacityMapper.selectByPrimaryKey(uid);
		return capacity;
	}

}
