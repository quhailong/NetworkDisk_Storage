package top.quhailong.pan.updateContent.service;

import top.quhailong.pan.pojo.Virtualaddress;

public interface ResoucesService {
	public Virtualaddress checkFileType(String vid);
	public boolean copyOrMoveFile(Virtualaddress virtualaddress,String dest,String opera);
	public boolean copyOrMoveDirFile(Virtualaddress virtualaddress,String dest,String opera);
	public boolean checkFileName(String vid,String parentPath,String newName);
	public void changeFileName(String vid,String parentPath,String newName);
	public void changeDirFileName(String vid,String parentPath,String newName);
	public void delFile(Virtualaddress virtualaddress);
	public void delDirFile(Virtualaddress virtualaddress);
	public Virtualaddress createDir(String dirName,String uid,String parentPath);
}
