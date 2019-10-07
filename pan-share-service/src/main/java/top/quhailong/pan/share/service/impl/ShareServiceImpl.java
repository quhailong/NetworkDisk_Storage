package top.quhailong.pan.share.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import top.quhailong.pan.share.dao.ShareDao;
import top.quhailong.pan.share.entity.ShareDO;
import top.quhailong.pan.share.service.ShareService;

import java.util.List;

@Component
public class ShareServiceImpl implements ShareService {
    @Autowired
    private ShareDao shareDao;

    @Override
    public Integer saveShare(ShareDO shareDO) {
        return shareDao.saveShare(shareDO);
    }

    @Override
    public List<ShareDO> listShareByUserId(String userId) {
        return shareDao.listShareByUserId(userId);
    }

    @Override
    public Integer removeShareByShareIdList(String userId, List<String> shareIdList) {
        return shareDao.removeShareByShareIdList(userId, shareIdList);
    }

    @Override
    public ShareDO getShareByShareId(String shareId) {
        return shareDao.getShareByShareId(shareId);
    }

    @Override
    public Integer updateShare(ShareDO shareDO) {
        return shareDao.updateShare(shareDO);
    }
}
