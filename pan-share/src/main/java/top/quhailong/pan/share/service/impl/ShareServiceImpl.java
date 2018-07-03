package top.quhailong.pan.share.service.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;

import top.quhailong.pan.pojo.Capacity;
import top.quhailong.pan.pojo.Share;
import top.quhailong.pan.pojo.ShareExample;
import top.quhailong.pan.pojo.ShareExample.Criteria;
import top.quhailong.pan.pojo.Sharemap;
import top.quhailong.pan.pojo.SharemapExample;
import top.quhailong.pan.pojo.Userinfo;
import top.quhailong.pan.pojo.UserinfoExample;
import top.quhailong.pan.pojo.Virtualaddress;
import top.quhailong.pan.pojo.VirtualaddressExample;
import top.quhailong.pan.share.mapper.CapacityMapper;
import top.quhailong.pan.share.mapper.ShareMapper;
import top.quhailong.pan.share.mapper.SharemapMapper;
import top.quhailong.pan.share.mapper.UserinfoMapper;
import top.quhailong.pan.share.mapper.VirtualaddressMapper;
import top.quhailong.pan.share.service.ShareService;
import top.quhailong.pan.utils.JsonUtils;

@Service
public class ShareServiceImpl implements ShareService {
	@Autowired
	private ShareMapper shareMapper;
	@Autowired
	private UserinfoMapper userinfoMapper;
	@Autowired
	private VirtualaddressMapper virtualaddressMapper;
	@Autowired
	private SharemapMapper sharemapMapper;
	@Autowired
	private CapacityMapper capacityMapper;

	@Override
	public String createPublicShare(String uid, String vids, String expiration) {
		List<String> list = JsonUtils.jsonToList(vids, String.class);
		if (list == null) {
			return null;
		}
		VirtualaddressExample example = new VirtualaddressExample();
		example.createCriteria().andUidEqualTo(uid).andVidIn(list);
		List<Virtualaddress> list2 = virtualaddressMapper.selectByExample(example);
		if (list2 == null && list.size() == 0) {
			return null;
		}
		String shareId = UUID.randomUUID().toString().replaceAll("-", "");
		Share share = new Share();
		share.setCreatetime(new Date());
		share.setDownloadtime(0);
		Calendar c = Calendar.getInstance();
	    c.setTime(new Date());
	    if(expiration.equals("forever")) {
	    	c.add(Calendar.YEAR, 100);
	    	Date newDate = c.getTime();
	    	share.setExpiration(newDate);
	    }else if(expiration.equals("seven")) {
	    	c.add(Calendar.DATE, 7);
	    	Date newDate = c.getTime();
	    	share.setExpiration(newDate);
	    }else if(expiration.equals("one")){
	    	c.add(Calendar.DATE, 1);
	    	Date newDate = c.getTime();
	    	share.setExpiration(newDate);
	    }
		share.setIslock(0);
		if (list.size() > 1) {
			share.setMulti(1);
		} else {
			share.setMulti(0);
		}
		share.setSavetime(0);
		share.setShareid(shareId);
		share.setSid(UUID.randomUUID().toString().replaceAll("-", ""));
		share.setSpassword("");
		share.setTheme(list2.get(0).getFilename());
		share.setUid(uid);
		share.setVisittime(0);
		shareMapper.insert(share);
		for (Virtualaddress virtualaddress : list2) {
			Sharemap sharemap = new Sharemap();
			sharemap.setMid(UUID.randomUUID().toString().replaceAll("-", ""));
			sharemap.setVid(virtualaddress.getVid());
			sharemap.setShareid(shareId);
			sharemapMapper.insert(sharemap);
		}
		return shareId;
	}

	@Override
	public String[] createPrivateShare(String uid, String vids, String expiration) {
		String[] result = new String[2];
		List<String> list = JsonUtils.jsonToList(vids, String.class);
		if (list == null) {
			return null;
		}
		VirtualaddressExample example = new VirtualaddressExample();
		example.createCriteria().andUidEqualTo(uid).andVidIn(list);
		List<Virtualaddress> list2 = virtualaddressMapper.selectByExample(example);
		if (list2 == null && list.size() == 0) {
			return null;
		}
		String shareId = UUID.randomUUID().toString().replaceAll("-", "");
		Share share = new Share();
		share.setCreatetime(new Date());
		share.setDownloadtime(0);
		Calendar c = Calendar.getInstance();
	    c.setTime(new Date());
	    if(expiration.equals("forever")) {
	    	c.add(Calendar.YEAR, 100);
	    	Date newDate = c.getTime();
	    	share.setExpiration(newDate);
	    }else if(expiration.equals("seven")) {
	    	c.add(Calendar.DATE, 7);
	    	Date newDate = c.getTime();
	    	share.setExpiration(newDate);
	    }else if(expiration.equals("one")){
	    	c.add(Calendar.DATE, 1);
	    	Date newDate = c.getTime();
	    	share.setExpiration(newDate);
	    }
		share.setIslock(1);
		if (list.size() > 1) {
			share.setMulti(1);
		} else {
			share.setMulti(0);
		}
		share.setSavetime(0);
		share.setShareid(shareId);
		share.setSid(UUID.randomUUID().toString().replaceAll("-", ""));
		share.setSpassword("");
		share.setTheme(list2.get(0).getFilename());
		share.setUid(uid);
		share.setVisittime(0);
		String words = "ABCDEFGHIJKMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
		StringBuffer sb = new StringBuffer();
		Random random = new Random();
		for (int i = 0; i < 4; i++) {
			// 生成一个随机数字
			int index = random.nextInt(words.length()); // 生成随机数 0 到 length - 1
			// 获得字母数字
			char c1 = words.charAt(index);
			sb.append(c1);
		}
		share.setSpassword(sb.toString());
		result[0] = shareId;
		result[1] = sb.toString();
		shareMapper.insert(share);
		for (Virtualaddress virtualaddress : list2) {
			Sharemap sharemap = new Sharemap();
			sharemap.setMid(UUID.randomUUID().toString().replaceAll("-", ""));
			sharemap.setVid(virtualaddress.getVid());
			sharemap.setShareid(shareId);
			sharemapMapper.insert(sharemap);
		}
		return result;
	}

	@Override
	public List<Share> shareList(Integer desc, String order, Integer page, String uid) {
		PageHelper.startPage(page, 100);
		if (desc.equals(1)) {
			PageHelper.orderBy(order + " desc");
		} else {
			PageHelper.orderBy(order + " asc");
		}
		ShareExample shareExample = new ShareExample();
		Criteria criteria = shareExample.createCriteria();
		criteria.andUidEqualTo(uid);
		List<Share> list = shareMapper.selectByExample(shareExample);
		if (list != null && list.size() > 0) {
			return list;
		} else {
			return null;
		}
	}

	@Override
	public boolean unShare(String uid, String vids) {
		List<String> list = JsonUtils.jsonToList(vids, String.class);
		if (list == null) {
			return false;
		}
		try {
			ShareExample example = new ShareExample();
			example.createCriteria().andUidEqualTo(uid).andShareidIn(list);
			shareMapper.deleteByExample(example);
			SharemapExample example2 = new SharemapExample();
			example2.createCriteria().andShareidIn(list);
			sharemapMapper.deleteByExample(example2);
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			return false;
		}

	}

	@Override
	public Userinfo getShareUser(String shareId) {
		// TODO Auto-generated method stub
		ShareExample shareExample = new ShareExample();
		shareExample.createCriteria().andShareidEqualTo(shareId);
		List<Share> list = shareMapper.selectByExample(shareExample);
		if (list != null && list.size() > 0) {
			String uid = list.get(0).getUid();
			UserinfoExample userinfoExample = new UserinfoExample();
			userinfoExample.createCriteria().andUidEqualTo(uid);
			List<Userinfo> list2 = userinfoMapper.selectByExample(userinfoExample);
			if (list2 != null && list2.size() > 0) {
				return list2.get(0);
			}
		}
		return null;
	}

	@Override
	public Share getShare(String shareId) {
		// TODO Auto-generated method stub
		ShareExample shareExample = new ShareExample();
		shareExample.createCriteria().andShareidEqualTo(shareId);
		List<Share> list = shareMapper.selectByExample(shareExample);
		if (list != null && list.size() > 0) {
			return list.get(0);
		}
		return null;
	}

	@Override
	public boolean saveShare(String uid, String shareId, String dest) {
		// TODO Auto-generated method stub
		SharemapExample example = new SharemapExample();
		example.createCriteria().andShareidEqualTo(shareId);
		List<Sharemap> list = sharemapMapper.selectByExample(example);
		if (list != null && list.size() > 0) {
			for (Sharemap sharemap : list) {
				VirtualaddressExample example2 = new VirtualaddressExample();
				example2.createCriteria().andVidEqualTo(sharemap.getVid());
				List<Virtualaddress> list2 = virtualaddressMapper.selectByExample(example2);
				if (list2 != null && list2.size() > 0) {
					Virtualaddress virtualaddress = new Virtualaddress();
					virtualaddress.setAddrtype(list2.get(0).getAddrtype());
					if(list2.get(0).getAddrtype() == 0) {
						virtualaddress.setIsdir(1);
					}else {
						virtualaddress.setIsdir(0);
					}
					virtualaddress.setCreatetime(new Date());
					virtualaddress.setFid(list2.get(0).getFid());
					VirtualaddressExample example3 = new VirtualaddressExample();
					example3.createCriteria().andUidEqualTo(uid).andParentpathEqualTo(dest)
							.andFilenameEqualTo(list2.get(0).getFilename());
					List<Virtualaddress> list3 = virtualaddressMapper.selectByExample(example3);
					if (list3 != null && list3.size() > 0) {
						String pre = list2.get(0).getFilename().substring(0,
								list2.get(0).getFilename().lastIndexOf("."));
						String suffix = list2.get(0).getFilename()
								.substring(list2.get(0).getFilename().lastIndexOf("."));
						virtualaddress.setFilename(pre + "(" + (list3.size()) + ")" + suffix);
					} else {
						virtualaddress.setFilename(list2.get(0).getFilename());
					}
					virtualaddress.setFilesize(list2.get(0).getFilesize());
					virtualaddress.setMd5(list2.get(0).getMd5());
					virtualaddress.setParentpath(dest);
					virtualaddress.setUid(uid);
					virtualaddress.setUpdatetime(new Date());
					virtualaddress.setVid(UUID.randomUUID().toString().replaceAll("-", ""));
					Capacity capacity = capacityMapper.selectByPrimaryKey(uid);
					if((capacity.getUsed()+virtualaddress.getFilesize())>capacity.getTotal()){
						return false;
					}
					virtualaddressMapper.insert(virtualaddress);
					capacity.setUsed(capacity.getUsed() + virtualaddress.getFilesize());
					capacityMapper.updateByPrimaryKey(capacity);
				} else {
					return false;
				}
			}
			ShareExample shareExample = new ShareExample();
			shareExample.createCriteria().andShareidEqualTo(shareId);
			List<Share> sharelist = shareMapper.selectByExample(shareExample);
			Share share = sharelist.get(0);
			share.setSavetime(share.getSavetime() + 1);
			shareMapper.updateByPrimaryKey(share);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public Integer checkLock(String shareId) {
		// TODO Auto-generated method stub
		ShareExample example = new ShareExample();
		example.createCriteria().andShareidEqualTo(shareId);
		List<Share> list = shareMapper.selectByExample(example);
		if(list!=null && list.size()>0) {
			return list.get(0).getIslock();
		}else {
			return null;
		}
	}

	@Override
	public boolean verifyLock(String lockPassword, String shareId) {
		ShareExample example = new ShareExample();
		example.createCriteria().andShareidEqualTo(shareId);
		List<Share> list = shareMapper.selectByExample(example);
		if(list!=null && list.size()>0) {
			if(list.get(0).getSpassword().equals(lockPassword)) {
				return true;
			}else {
				return false;
			}
		}else {
			return false;
		}
	}

	@Override
	public List<String> getVids(String shareId) {
		// TODO Auto-generated method stub
		SharemapExample example = new SharemapExample();
		example.createCriteria().andShareidEqualTo(shareId);
		List<Sharemap> list = sharemapMapper.selectByExample(example);
		List<String> vids = new ArrayList<>();
		if(list!=null && list.size()>0) {
			for (Sharemap sharemap : list) {
				vids.add(sharemap.getVid());
			}
			return vids;
		}else {
			return null;
		}
	}

	@Override
	public String getUid(String shareId) {
		// TODO Auto-generated method stub
		ShareExample example = new ShareExample();
		example.createCriteria().andShareidEqualTo(shareId);
		List<Share> list = shareMapper.selectByExample(example);
		if(list!=null && list.size()>0) {
			return list.get(0).getUid();
		}else {
			return null;
		}
	}

	@Override
	public void addShareView(String shareId) {
		// TODO Auto-generated method stub
		ShareExample example = new ShareExample();
		example.createCriteria().andShareidEqualTo(shareId);
		List<Share> list = shareMapper.selectByExample(example);
		Share share = list.get(0);
		share.setVisittime(share.getVisittime() + 1);
		shareMapper.updateByPrimaryKey(share);
	}

	@Override
	public void addShareDownload(String shareId) {
		// TODO Auto-generated method stub
		ShareExample example = new ShareExample();
		example.createCriteria().andShareidEqualTo(shareId);
		List<Share> list = shareMapper.selectByExample(example);
		Share share = list.get(0);
		share.setDownloadtime(share.getDownloadtime() + 1);
		shareMapper.updateByPrimaryKey(share);
	}

}
