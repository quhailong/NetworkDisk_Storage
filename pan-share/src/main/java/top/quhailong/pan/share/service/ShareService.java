package top.quhailong.pan.share.service;

import java.util.List;

import top.quhailong.pan.pojo.Share;
import top.quhailong.pan.pojo.Userinfo;

public interface ShareService {
	String createPublicShare(String uid,String vids,String expiration);
	String[] createPrivateShare(String uid,String vids,String expiration);
	List<Share> shareList(Integer desc,String order,Integer page,String uid);
	boolean unShare(String uid,String vids);
	Userinfo getShareUser(String shareId);
	Share getShare(String shareId);
	boolean saveShare(String uid,String shareId,String dest);
	Integer checkLock(String shareId);
	boolean verifyLock(String lockPassword,String shareId);
	List<String> getVids(String shareId);
	String getUid(String shareId);
	void addShareView(String shareId);
	void addShareDownload(String shareId);
}
