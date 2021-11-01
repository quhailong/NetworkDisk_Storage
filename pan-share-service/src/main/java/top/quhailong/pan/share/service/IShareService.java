package top.quhailong.pan.share.service;

import top.quhailong.pan.request.AddShareViewCountRequest;
import top.quhailong.pan.request.SaveShareRequest;
import top.quhailong.pan.request.ShareListRequest;
import top.quhailong.pan.request.ShareRequest;
import top.quhailong.pan.utils.RestAPIResult;

public interface IShareService {
    /**
     * 分享文件数据处理
     *
     * @author: quhailong
     * @date: 2021/11/1
     */
    RestAPIResult<String> shareHandle(ShareRequest request);

    /**
     * 分享列表数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    RestAPIResult<String> shareListHandle(ShareListRequest request);

    /**
     * 取消分享数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    RestAPIResult<String> unShareHandle(String uid, String shareIds);

    /**
     * 获取分享用户信息数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    RestAPIResult<String> getShareUserHandle(String shareId);

    /**
     * 保存分享数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    RestAPIResult<String> saveShareHandle(SaveShareRequest request);

    /**
     * 查询分享是否带密码数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    RestAPIResult<String> checkLockHandle(String shareId);

    /**
     * 验证分享密码数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    RestAPIResult<String> verifykLockHandle(String lockPassword, String shareId);

    /**
     * 根据分享ID获取虚拟地址ID数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    RestAPIResult<String> getVinfoHandle(String shareId, String lockPassword);

    /**
     * 增加分享访问量数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    void addShareViewCountHandle(AddShareViewCountRequest request);

    /**
     * 增加分享下载量数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    void addShareDownloadCountHandle(String shareId);
}
