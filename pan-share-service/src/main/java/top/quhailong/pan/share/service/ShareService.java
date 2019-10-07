package top.quhailong.pan.share.service;

import top.quhailong.pan.share.entity.ShareDO;

import java.util.List;

public interface ShareService {
    /**
     * 保存分享信息
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    Integer saveShare(ShareDO shareDO);

    /**
     * 获取分享列表根据用户ID
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    List<ShareDO> listShareByUserId(String userId);

    /**
     * 删除分享根据多个分享ID
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    Integer removeShareByShareIdList(String userId, List<String> shareIdList);

    /**
     * 根据分享ID获取分享信息
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    ShareDO getShareByShareId(String shareId);

    /**
     * 更新分享信息
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    Integer updateShare(ShareDO shareDO);
}
