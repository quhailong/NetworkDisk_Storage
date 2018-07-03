package top.quhailong.pan.fastDFS.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import top.quhailong.pan.fastDFS.mapper.CapacityMapper;
import top.quhailong.pan.fastDFS.mapper.FileMapper;
import top.quhailong.pan.fastDFS.mapper.VirtualaddressMapper;
import top.quhailong.pan.fastDFS.service.UploadService;
import top.quhailong.pan.pojo.Capacity;
import top.quhailong.pan.pojo.File;
import top.quhailong.pan.pojo.FileExample;
import top.quhailong.pan.pojo.Virtualaddress;
import top.quhailong.pan.pojo.VirtualaddressExample;
import top.quhailong.pan.pojo.VirtualaddressExample.Criteria;
@Service
public class UploadServiceImpl implements UploadService {
	@Autowired
	private FileMapper fileMapper;
	@Autowired
	private VirtualaddressMapper virtualaddressMapper;
	@Autowired
	private CapacityMapper capacityMapper;
	@Override
	public String[] createFile(MultipartFile file,String path,String md5) {
		// TODO Auto-generated method stub
		String fileName = file.getOriginalFilename();
		if(file.getOriginalFilename().contains("/")) {
			fileName = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("/") + 1,file.getOriginalFilename().length());
		}
		String fileType = null;
		String [] results = new String[3];
		String fid = UUID.randomUUID().toString().replaceAll("-", "");
		results[0]=fid;
		File file_ = new File();
		file_.setFid(fid);
		file_.setOriginalname(fileName);
		file_.setFilelocation(path);
		file_.setSize((int)file.getSize());
		file_.setMd5(md5);
		file_.setCreatetime(new Date());
		String contentType = file.getContentType();
		if(contentType.equals("image/jpeg") || contentType.equals("image/gif")) {
			fileType = "1";
			file_.setFiletype(1);
		}else if(contentType.equals("application/pdf") || contentType.equals("application/msword") || contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document") || contentType.equals("application/x-ppt") || contentType.equals("application/vnd.openxmlformats-officedocument.presentationml.presentation") || file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1, file.getOriginalFilename().length()).equals("txt")){
			fileType = "2";
			file_.setFiletype(2);
		}else if(contentType.equals("video/mpeg4") || contentType.equals("video/avi") || contentType.equals("application/vnd.rn-realmedia-vbr") || contentType.equals("video/mpg") || contentType.equals("video/x-ms-wmv")){
			fileType = "3";
			file_.setFiletype(3);
		}else if(contentType.equals("application/x-bittorrent")){
			fileType = "4";
			file_.setFiletype(4);
		}else if(contentType.equals("audio/mp3")){
			fileType = "5";
			file_.setFiletype(5);
		}else {
			fileType = "6";
			file_.setFiletype(6);
		}
		results[1] = fileType;
		results[2] = file.getSize() + "";
		fileMapper.insert(file_);
		return results;
	}
	@Override
	public boolean md5check(String md5) {
		// TODO Auto-generated method stub
		FileExample fileExample= new FileExample();
		fileExample.createCriteria().andMd5EqualTo(md5);
		List<File> list = fileMapper.selectByExample(fileExample);
		if (list!=null && list.size()>0) {
			return true;
		}else {
			return false;
		}
	}
	@Override
	public String[] findFile(String md5) {
		// TODO Auto-generated method stub
		String [] results = new String[3];
		FileExample fileExample = new FileExample();
		fileExample.createCriteria().andMd5EqualTo(md5);
		List<File> list = fileMapper.selectByExample(fileExample);
		if(list!=null&&list.size()>0) {
			results[0] = list.get(0).getFid();
			results[1] = list.get(0).getFiletype().toString();
			results[2] = list.get(0).getSize() + "";
			return results;
		}else {
			return null;
		}
	}
	@Override
	public boolean createVirtualAddress(String fid, String uid, String fileName,String md5,String fileType,String fileSize,String parentPath) {
		try {
			String pre = fileName.substring(0, fileName.lastIndexOf("."));
			String suffix = fileName.substring(fileName.lastIndexOf("."));
			VirtualaddressExample virtualaddressExample = new VirtualaddressExample();
			virtualaddressExample.createCriteria().andUidEqualTo(uid).andMd5EqualTo(md5).andFilenameLike("%" + suffix).andParentpathEqualTo(parentPath);
			List<Virtualaddress> list = virtualaddressMapper.selectByExample(virtualaddressExample);
			Virtualaddress virtualaddress = new Virtualaddress();
			if(list!=null && list.size()>0) {
				virtualaddress.setFilename(pre + "(" + (list.size()) + ")" + suffix);
			}else {
				virtualaddress.setFilename(fileName);
			}
			virtualaddress.setVid(UUID.randomUUID().toString().replaceAll("-", ""));
			virtualaddress.setFid(fid);
			virtualaddress.setUid(uid);
			virtualaddress.setMd5(md5);
			if (md5!=null) {
				virtualaddress.setAddrtype(Integer.valueOf(fileType));
				virtualaddress.setIsdir(0);
				virtualaddress.setFilesize(Integer.valueOf(fileSize));
			}else {
				virtualaddress.setIsdir(1);
				virtualaddress.setAddrtype(0);
				virtualaddress.setFilesize(0);
			}
			if(parentPath !=null) {
				virtualaddress.setParentpath(parentPath);
			}else {
				virtualaddress.setParentpath("/");
			}
			virtualaddress.setCreatetime(new Date());
			virtualaddress.setUpdatetime(new Date());
			virtualaddressMapper.insert(virtualaddress);
			Capacity capacity = capacityMapper.selectByPrimaryKey(uid);
			capacity.setUsed(capacity.getUsed() + virtualaddress.getFilesize());
			capacityMapper.updateByPrimaryKey(capacity);
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			return false;
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
	@Override
	public boolean checkDir(String uid, String dirName,String parentPath) {
		VirtualaddressExample virtualaddressExample = new VirtualaddressExample();
		Criteria criteria = virtualaddressExample.createCriteria();
		criteria.andUidEqualTo(uid).andParentpathEqualTo(parentPath).andFilenameEqualTo(dirName);
		List<Virtualaddress> list = virtualaddressMapper.selectByExample(virtualaddressExample);
		if(list!=null && list.size()>0) {
			return false;
		}else {
			return true;
		}
	}
	@Override
	public Map<String,String> getFids(List<String> vids,String uid) {
		Map<String, String> map = new HashMap<>();
		List<String> fileLocation = new ArrayList<>();
		for (String string : vids) {
			VirtualaddressExample example = new VirtualaddressExample();
			example.createCriteria().andVidEqualTo(string).andUidEqualTo(uid);
			List<Virtualaddress> list = virtualaddressMapper.selectByExample(example);
			if(list!=null && list.size()>0) {
				FileExample fileExample = new FileExample();
				fileExample.createCriteria().andFidEqualTo(list.get(0).getFid());
				List<File> list2 = fileMapper.selectByExample(fileExample);
				if(list2!=null && list2.size()>0) {
					fileLocation.add(list2.get(0).getFilelocation());
					map.put(list.get(0).getFilename(), list2.get(0).getFilelocation());
				}else {
					
				}
			}else {
				
			}
		}
		return map;
	}
	@Override
	public String fileName(String vid,String uid) {
		// TODO Auto-generated method stub
		VirtualaddressExample example = new VirtualaddressExample();
		example.createCriteria().andVidEqualTo(vid).andUidEqualTo(uid);
		List<Virtualaddress> list = virtualaddressMapper.selectByExample(example);
		if (list!=null &&list.size()>0) {
			return list.get(0).getFilename();
		}
		return null;
	}
}
