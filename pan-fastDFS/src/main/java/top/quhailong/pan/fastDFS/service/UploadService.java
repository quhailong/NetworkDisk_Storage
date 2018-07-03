package top.quhailong.pan.fastDFS.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import top.quhailong.pan.pojo.Virtualaddress;

public interface UploadService {
	public String[] createFile(MultipartFile file,String path,String md5);
	public boolean md5check(String md5);
	public boolean createVirtualAddress(String fid,String uid,String fileName,String md5,String fileType,String fileSizem,String parentPath);
	public String[] findFile(String md5);
	public Virtualaddress createDir(String dirName,String uid,String parentPath);
	public boolean checkDir(String uid,String dirName,String parentPath);
	public Map<String,String> getFids(List<String> vids,String uid);
	public String fileName(String vid,String uid);
}
