package top.quhailong.pan.updateContent.service.impl;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import top.quhailong.pan.pojo.Capacity;
import top.quhailong.pan.pojo.Virtualaddress;
import top.quhailong.pan.pojo.VirtualaddressExample;
import top.quhailong.pan.pojo.VirtualaddressExample.Criteria;
import top.quhailong.pan.updateContent.mapper.CapacityMapper;
import top.quhailong.pan.updateContent.mapper.VirtualaddressMapper;
import top.quhailong.pan.updateContent.service.ResoucesService;
@Service
public class ResoucesServiceImpl implements ResoucesService {
	@Autowired
	private VirtualaddressMapper virtualaddressMapper;
	@Autowired
	private CapacityMapper capacityMapper;
	@Override
	public Virtualaddress checkFileType(String vid) {
		Virtualaddress virtualaddress = virtualaddressMapper.selectByPrimaryKey(vid);
		if (virtualaddress != null) {
			return virtualaddress;
		}else {
			return null;
		}
	}
	@Override
	public boolean copyOrMoveFile(Virtualaddress virtualaddress,String dest,String opera) {
		// TODO Auto-generated method stub
		try {
			if(opera.equals("copyOK")) {
				String pre = virtualaddress.getFilename().substring(0, virtualaddress.getFilename().lastIndexOf("."));
				String suffix = virtualaddress.getFilename().substring(virtualaddress.getFilename().lastIndexOf("."));
				VirtualaddressExample example = new VirtualaddressExample();
				Criteria criteria = example.createCriteria();
				criteria.andParentpathEqualTo(dest).andMd5EqualTo(virtualaddress.getMd5()).andFilenameLike("%" + suffix).andUidEqualTo(virtualaddress.getUid());
				List<Virtualaddress> list = virtualaddressMapper.selectByExample(example);
				if(list!=null && list.size()>0) {
					virtualaddress.setFilename(pre + "(" + (list.size()) + ")" + suffix);
				}else {
					virtualaddress.setFilename(virtualaddress.getFilename());
				}
				virtualaddress.setVid(UUID.randomUUID().toString().replaceAll("-", ""));
				virtualaddress.setParentpath(dest);
				virtualaddress.setCreatetime(new Date());
				virtualaddress.setUpdatetime(new Date());
				Capacity capacity = capacityMapper.selectByPrimaryKey(virtualaddress.getUid());
				if((capacity.getUsed()+virtualaddress.getFilesize())>capacity.getTotal()){
					return false;
				}
				virtualaddressMapper.insert(virtualaddress);
				capacity.setUsed(capacity.getUsed() + virtualaddress.getFilesize());
				capacityMapper.updateByPrimaryKey(capacity);
			}else {
				String oldVid = virtualaddress.getVid();
				virtualaddressMapper.deleteByPrimaryKey(oldVid);
				String pre = virtualaddress.getFilename().substring(0, virtualaddress.getFilename().lastIndexOf("."));
				String suffix = virtualaddress.getFilename().substring(virtualaddress.getFilename().lastIndexOf("."));
				VirtualaddressExample example = new VirtualaddressExample();
				Criteria criteria = example.createCriteria();
				criteria.andParentpathEqualTo(dest).andMd5EqualTo(virtualaddress.getMd5()).andFilenameLike("%" + suffix).andUidEqualTo(virtualaddress.getUid());
				List<Virtualaddress> list = virtualaddressMapper.selectByExample(example);
				if(list!=null && list.size()>0) {
					virtualaddress.setFilename(pre + "(" + (list.size()) + ")" + suffix);
				}else {
					virtualaddress.setFilename(virtualaddress.getFilename());
				}
				virtualaddress.setVid(UUID.randomUUID().toString().replaceAll("-", ""));
				virtualaddress.setParentpath(dest);
				virtualaddress.setCreatetime(new Date());
				virtualaddress.setUpdatetime(new Date());
				virtualaddressMapper.insert(virtualaddress);
			}
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			return false;
		}
	}
	@Override
	public boolean copyOrMoveDirFile(Virtualaddress virtualaddress, String dest, String opera) {
		try {
			VirtualaddressExample virtualaddressExample = new VirtualaddressExample();
			virtualaddressExample.createCriteria().andUidEqualTo(virtualaddress.getUid()).andFilenameEqualTo(virtualaddress.getFilename()).andParentpathEqualTo(dest);
			List<Virtualaddress> list = virtualaddressMapper.selectByExample(virtualaddressExample);
			String vid = UUID.randomUUID().toString().replaceAll("-", "");
			if(opera.equals("moveOK")) {
				virtualaddressMapper.deleteByPrimaryKey(virtualaddress.getVid());
			}
			Virtualaddress virtualaddress1 = new Virtualaddress();
			virtualaddress1.setAddrtype(0);
			virtualaddress1.setCreatetime(new Date());
			virtualaddress1.setFid(null);
			if(list!=null && list.size()>0) {
				virtualaddress1.setFilename(virtualaddress.getFilename() + "(" + (list.size()) + ")" );
			}else {
				virtualaddress1.setFilename(virtualaddress.getFilename());
			}
			virtualaddress1.setFilesize(null);
			virtualaddress1.setMd5(null);
			virtualaddress1.setParentpath(dest);
			virtualaddress1.setUid(virtualaddress.getUid());
			virtualaddress1.setUpdatetime(new Date());
			virtualaddress1.setVid(vid);
			virtualaddress1.setIsdir(1);
			
			
			VirtualaddressExample virtualaddressExample1 = new VirtualaddressExample();
			if(virtualaddress.getParentpath().equals("/")) {
				virtualaddressExample1.createCriteria().andUidEqualTo(virtualaddress.getUid()).andParentpathLike(virtualaddress.getParentpath() + virtualaddress.getFilename() + "%");
			}else {
				virtualaddressExample1.createCriteria().andUidEqualTo(virtualaddress.getUid()).andParentpathLike(virtualaddress.getParentpath() + "/" + virtualaddress.getFilename() + "%");
			}
			List<Virtualaddress> list1 = virtualaddressMapper.selectByExample(virtualaddressExample1);
			if(list1 != null && list1.size()>0) {
				for (Virtualaddress virtualaddress2 : list1) {
					String oldVid = virtualaddress2.getVid();
						virtualaddress2.setVid(UUID.randomUUID().toString().replaceAll("-", ""));
						if(dest.equals("/")) {
							if(virtualaddress.getParentpath().equals("/")) {
								virtualaddress2.setParentpath(dest + virtualaddress1.getFilename() + virtualaddress2.getParentpath().substring((virtualaddress.getParentpath() + virtualaddress.getFilename()).length(), virtualaddress2.getParentpath().length()));
							}else {
								virtualaddress2.setParentpath(dest + virtualaddress1.getFilename() + virtualaddress2.getParentpath().substring((virtualaddress.getParentpath() + "/" + virtualaddress.getFilename()).length(), virtualaddress2.getParentpath().length()));
							}
						}else {
							if(virtualaddress.getParentpath().equals("/")) {
								virtualaddress2.setParentpath(dest + "/" + virtualaddress1.getFilename() + virtualaddress2.getParentpath().substring((virtualaddress.getParentpath() + virtualaddress.getFilename()).length(), virtualaddress2.getParentpath().length()));
							}else {
								virtualaddress2.setParentpath(dest + "/" + virtualaddress1.getFilename() + virtualaddress2.getParentpath().substring((virtualaddress.getParentpath() + "/" + virtualaddress.getFilename()).length(), virtualaddress2.getParentpath().length()));
							}
						}
						virtualaddress2.setCreatetime(new Date());
						virtualaddress2.setUpdatetime(new Date());
						Capacity capacity = capacityMapper.selectByPrimaryKey(virtualaddress2.getUid());
						if(opera.equals("moveOK")) {
							virtualaddressMapper.deleteByPrimaryKey(oldVid);
							virtualaddressMapper.insert(virtualaddress2);
						}else{
							if((capacity.getUsed()+virtualaddress2.getFilesize())>capacity.getTotal()){
								return false;
							}
							capacity.setUsed(capacity.getUsed() + virtualaddress2.getFilesize());
							capacityMapper.updateByPrimaryKey(capacity);
							virtualaddressMapper.insert(virtualaddress2);
						}
				}
				virtualaddressMapper.insert(virtualaddress1);
			}else {
				virtualaddressMapper.insert(virtualaddress1);
				return true;
			}
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			return false;
		}
		
	}
	@Override
	public boolean checkFileName(String vid, String parentPath, String newName) {
		Virtualaddress virtualaddress = virtualaddressMapper.selectByPrimaryKey(vid);
		VirtualaddressExample example = new VirtualaddressExample();
		if(virtualaddress.getAddrtype()!=0) {
			String suffix = virtualaddress.getFilename().substring(virtualaddress.getFilename().lastIndexOf("."));
			example.createCriteria().andUidEqualTo(virtualaddress.getUid()).andAddrtypeEqualTo(virtualaddress.getAddrtype()).andParentpathEqualTo(parentPath).andFilenameEqualTo(newName + suffix);
		}else {
			example.createCriteria().andUidEqualTo(virtualaddress.getUid()).andAddrtypeEqualTo(virtualaddress.getAddrtype()).andParentpathEqualTo(parentPath).andFilenameEqualTo(newName);
		}
		List<Virtualaddress> list = virtualaddressMapper.selectByExample(example);
		if(list!=null && list.size()>0) {
			return false;
		}else {
			return true;
		}
	}
	@Override
	public void changeFileName(String vid, String parentPath, String newName) {
		Virtualaddress virtualaddress = virtualaddressMapper.selectByPrimaryKey(vid);
		String suffix = virtualaddress.getFilename().substring(virtualaddress.getFilename().lastIndexOf("."));
		VirtualaddressExample example = new VirtualaddressExample();
		example.createCriteria().andUidEqualTo(virtualaddress.getUid()).andAddrtypeEqualTo(virtualaddress.getAddrtype()).andParentpathEqualTo(parentPath).andFilenameEqualTo(newName + suffix);
		List<Virtualaddress> list = virtualaddressMapper.selectByExample(example);
		if(list!=null && list.size()>0) {
			virtualaddress.setFilename(newName + "(" + (list.size()) + ")" + virtualaddress.getFilename().substring(virtualaddress.getFilename().lastIndexOf(".")));
		}else {
			virtualaddress.setFilename(newName + virtualaddress.getFilename().substring(virtualaddress.getFilename().lastIndexOf(".")));
		}
		virtualaddress.setUpdatetime(new Date());
		virtualaddressMapper.updateByPrimaryKey(virtualaddress);
	}
	@Override
	public void changeDirFileName(String vid, String parentPath, String newName) {
		Virtualaddress virtualaddress = virtualaddressMapper.selectByPrimaryKey(vid);
		String oldName = virtualaddress.getFilename();
		VirtualaddressExample example = new VirtualaddressExample();
		example.createCriteria().andUidEqualTo(virtualaddress.getUid()).andAddrtypeEqualTo(virtualaddress.getAddrtype()).andParentpathEqualTo(parentPath).andFilenameEqualTo(newName);
		List<Virtualaddress> list = virtualaddressMapper.selectByExample(example);
		if(list!=null && list.size()>0) {
			virtualaddress.setFilename(newName + "(" + (list.size()) + ")");
		}else {
			virtualaddress.setFilename(newName);
		}
		virtualaddress.setUpdatetime(new Date());
		virtualaddressMapper.updateByPrimaryKey(virtualaddress);
		
		VirtualaddressExample virtualaddressExample = new VirtualaddressExample();
		if(virtualaddress.getParentpath().equals("/")) {
			virtualaddressExample.createCriteria().andUidEqualTo(virtualaddress.getUid()).andParentpathLike(virtualaddress.getParentpath() + oldName + "%");
		}else {
			virtualaddressExample.createCriteria().andUidEqualTo(virtualaddress.getUid()).andParentpathLike(virtualaddress.getParentpath() + "/" + oldName + "%");
		}
		List<Virtualaddress> list2 = virtualaddressMapper.selectByExample(virtualaddressExample);
		for (Virtualaddress virtualaddress2 : list2) {
			String suff = null;
			String pre = null;
			if(virtualaddress.getParentpath().equals("/")) {
				suff = virtualaddress2.getParentpath().substring((virtualaddress.getParentpath() + oldName).length(), virtualaddress2.getParentpath().length());
			}else {
				suff = virtualaddress2.getParentpath().substring((virtualaddress.getParentpath() + "/" + oldName).length(), virtualaddress2.getParentpath().length());
			}
			if(virtualaddress.getParentpath().equals("/")) {
				pre = virtualaddress.getParentpath() + virtualaddress.getFilename();
			}else {
				pre = virtualaddress.getParentpath() + "/" + virtualaddress.getFilename();
			}
			virtualaddress2.setParentpath(pre+suff);
			virtualaddressMapper.updateByPrimaryKey(virtualaddress2);
		}
	}
	@Override
	public void delFile(Virtualaddress virtualaddress) {
		virtualaddressMapper.deleteByPrimaryKey(virtualaddress.getVid());
		Capacity capacity = capacityMapper.selectByPrimaryKey(virtualaddress.getUid());
		capacity.setUsed(capacity.getUsed() - virtualaddress.getFilesize());
		capacityMapper.updateByPrimaryKey(capacity);
	}
	@Override
	public void delDirFile(Virtualaddress virtualaddress) {
		virtualaddressMapper.deleteByPrimaryKey(virtualaddress.getVid());
		VirtualaddressExample example = new VirtualaddressExample();
		if(virtualaddress.getParentpath().equals("/")) {
			example.createCriteria().andUidEqualTo(virtualaddress.getUid()).andParentpathLike(virtualaddress.getParentpath() + virtualaddress.getFilename() + "%");
		}else {
			example.createCriteria().andUidEqualTo(virtualaddress.getUid()).andParentpathLike(virtualaddress.getParentpath() + "/" + virtualaddress.getFilename() + "%");
		}
		List<Virtualaddress> list = virtualaddressMapper.selectByExample(example);
		for (Virtualaddress virtualaddress2 : list) {
			virtualaddressMapper.deleteByPrimaryKey(virtualaddress2.getVid());
			Capacity capacity = capacityMapper.selectByPrimaryKey(virtualaddress2.getUid());
			capacity.setUsed(capacity.getUsed() - virtualaddress2.getFilesize());
			capacityMapper.updateByPrimaryKey(capacity);
		}
	}
	@Override
	public Virtualaddress createDir(String dirName, String uid, String parentPath) {
		VirtualaddressExample virtualaddressExample = new VirtualaddressExample();
		virtualaddressExample.createCriteria().andUidEqualTo(uid).andFilenameEqualTo(dirName).andParentpathEqualTo(parentPath);
		List<Virtualaddress> list = virtualaddressMapper.selectByExample(virtualaddressExample);
		String vid = UUID.randomUUID().toString().replaceAll("-", "");
		Virtualaddress virtualaddress = new Virtualaddress();
		virtualaddress.setAddrtype(0);
		virtualaddress.setIsdir(1);
		virtualaddress.setCreatetime(new Date());
		virtualaddress.setFid(null);
		if(list!=null && list.size()>0) {
			virtualaddress.setFilename(dirName + "(" + (list.size()) + ")" );
		}else {
			virtualaddress.setFilename(dirName);
		}
		virtualaddress.setFilesize(null);
		virtualaddress.setMd5(null);
		virtualaddress.setParentpath(parentPath);
		virtualaddress.setUid(uid);
		virtualaddress.setUpdatetime(new Date());
		virtualaddress.setVid(vid);
		virtualaddressMapper.insert(virtualaddress);
		return virtualaddress;
	}

}
