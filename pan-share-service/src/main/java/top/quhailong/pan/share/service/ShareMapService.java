package top.quhailong.pan.share.service;

import top.quhailong.pan.share.entity.ShareMapDO;

import java.util.List;

public interface ShareMapService {
    /**
     * 保存分享文件对应
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    Integer saveShareMap(ShareMapDO shareMapDO);

    /**
     * 根据分享ID删除分享文件对应
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    Integer removeShareMapByShareIdList(List<String> shareIdList);

    /**
     * 根据分享ID获取分享文件对应
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    List<ShareMapDO> listShareMapByShareId(String shareId);
}
