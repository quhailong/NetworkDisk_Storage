package top.quhailong.pan.share.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import top.quhailong.pan.share.dao.ShareMapDao;
import top.quhailong.pan.share.entity.ShareMapDO;
import top.quhailong.pan.share.service.ShareMapService;

import java.util.List;

@Component
public class ShareMapServiceImpl implements ShareMapService {
    @Autowired
    private ShareMapDao shareMapDao;

    @Override
    public Integer saveShareMap(ShareMapDO shareMapDO) {
        return shareMapDao.saveShareMap(shareMapDO);
    }

    @Override
    public Integer removeShareMapByShareIdList(List<String> shareIdList) {
        return shareMapDao.removeShareMapByShareIdList(shareIdList);
    }

    @Override
    public List<ShareMapDO> listShareMapByShareId(String shareId) {
        return shareMapDao.listShareMapByShareId(shareId);
    }
}
