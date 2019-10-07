package top.quhailong.pan.share.provider;

import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import top.quhailong.pan.request.*;
import top.quhailong.pan.response.ShareDTO;
import top.quhailong.pan.response.UserInfoDTO;
import top.quhailong.pan.response.VirtualAddressDTO;
import top.quhailong.pan.share.entity.ShareDO;
import top.quhailong.pan.share.entity.ShareMapDO;
import top.quhailong.pan.share.remote.CoreRemote;
import top.quhailong.pan.share.remote.UserRemote;
import top.quhailong.pan.share.service.ShareMapService;
import top.quhailong.pan.share.service.ShareService;
import top.quhailong.pan.utils.BeanUtils;
import top.quhailong.pan.utils.IDUtils;
import top.quhailong.pan.utils.JSONUtils;
import top.quhailong.pan.utils.RestAPIResult;

import java.util.*;

/**
 * 分享数据处理
 *
 * @author: quhailong
 * @date: 2019/9/26
 */
@Component
public class ShareProvider {
    @Autowired
    private ShareService shareService;
    @Autowired
    private ShareMapService shareMapService;
    @Autowired
    private CoreRemote coreRemote;
    @Autowired
    private UserRemote userRemote;

    public RestAPIResult<String> shareHandle(ShareRequest request) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        List<String> vidList = JSONUtils.parseObject(request.getVids(), List.class);
        if (vidList == null) {
            return null;
        }
        String fileName = coreRemote.getFileNameByVid(vidList.get(0), request.getUid()).getRespData();
        String shareId = IDUtils.showNextId(new Random().nextInt(30)).toString();
        ShareDO shareDO = new ShareDO();
        shareDO.setCreateTime(new Date());
        shareDO.setDownloadCount(0);
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        if (request.getExpiration().equals("forever")) {
            c.add(Calendar.YEAR, 100);
            Date newDate = c.getTime();
            shareDO.setExpiration(newDate);
        } else if (request.getExpiration().equals("seven")) {
            c.add(Calendar.DATE, 7);
            Date newDate = c.getTime();
            shareDO.setExpiration(newDate);
        } else if (request.getExpiration().equals("one")) {
            c.add(Calendar.DATE, 1);
            Date newDate = c.getTime();
            shareDO.setExpiration(newDate);
        }
        if (request.getFlag().equals("public")) {
            shareDO.setSharePassword("");
            shareDO.setLockWhether(0);
        } else if (request.getFlag().equals("private")) {
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
            shareDO.setSharePassword(sb.toString());
            shareDO.setLockWhether(1);
        }
        if (vidList.size() > 1) {
            shareDO.setMultiWhether(1);
        } else {
            shareDO.setMultiWhether(0);
        }
        shareDO.setSaveCount(0);
        shareDO.setShareId(shareId);
        shareDO.setTheme(fileName);
        shareDO.setUserId(request.getUid());
        shareDO.setVisitCount(0);
        shareService.saveShare(shareDO);
        for (String vid : vidList) {
            ShareMapDO shareMapDO = new ShareMapDO();
            shareMapDO.setVirtualAddressId(vid);
            shareMapDO.setShareId(shareId);
            shareMapService.saveShareMap(shareMapDO);
        }
        if (request.getFlag().equals("public")) {
            panResult.success("null");
            panResult.setRespData(shareId);
        } else if (request.getFlag().equals("private")) {
            panResult.success("null");
            panResult.setRespData(shareId + "," + shareDO.getSharePassword());
        }
        return panResult;
    }

    /**
     * 分享列表数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    public RestAPIResult<String> shareListHandle(ShareListRequest request) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        PageHelper.startPage(request.getPage(), 100);
        if (request.getDesc().equals(1)) {
            PageHelper.orderBy(request.getOrder() + " desc");
        } else {
            PageHelper.orderBy(request.getOrder() + " asc");
        }
        List<ShareDO> shareDOList = shareService.listShareByUserId(request.getUid());
        if (shareDOList != null && shareDOList.size() > 0) {
            Map<String, Object> map = new HashMap<>();
            int i = 0;
            for (ShareDO shareDO : shareDOList) {
                map.put(i++ + "", JSONUtils.toJSONString(shareDO));
            }
            panResult.setRespMap(map);
            panResult.setRespData("200");
            return panResult;
        } else {
            panResult.success(null);
            return panResult;
        }
    }

    /**
     * 取消分享数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    public RestAPIResult<String> unShareHandle(String uid, String shareIds) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        List<String> shareIdList = JSONUtils.parseObject(shareIds, List.class);
        shareService.removeShareByShareIdList(uid, shareIdList);
        shareMapService.removeShareMapByShareIdList(shareIdList);
        panResult.success(null);
        return panResult;
    }

    /**
     * 获取分享用户信息数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    public RestAPIResult<String> getShareUserHandle(String shareId) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        ShareDTO ShareDTO = new ShareDTO();
        ShareDO shareDO = shareService.getShareByShareId(shareId);
        if(shareDO == null){
            return panResult;
        }
        BeanUtils.copyPropertiesIgnoreNull(shareDO, ShareDTO);
        UserInfoDTO userInfoDTO = userRemote.getUserInfo(shareDO.getUserId()).getRespData();
        Map<String, Object> map = new HashMap<>();
        map.put("userinfo", JSONUtils.toJSONString(userInfoDTO));
        map.put("share", JSONUtils.toJSONString(ShareDTO));
        panResult.setRespMap(map);
        panResult.setRespData("success");
        return panResult;
    }

    /**
     * 保存分享数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    public RestAPIResult<String> saveShareHandle(SaveShareRequest request) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        if (verifyLock(request.getLockPassword(), request.getShareId())) {
            List<ShareMapDO> shareMapDOList = shareMapService.listShareMapByShareId(request.getShareId());
            if (shareMapDOList != null && shareMapDOList.size() > 0) {
                for (ShareMapDO shareMapDO : shareMapDOList) {
                    VirtualAddressDTO virtualAddressDTO = coreRemote.getVirtualaddress(shareMapDO.getVirtualAddressId(), request.getUid()).getRespData();
                    CreateVirtualAddressRequest createVirtualAddressRequest = new CreateVirtualAddressRequest();
                    createVirtualAddressRequest.setUid(request.getUid());
                    createVirtualAddressRequest.setParentPath(request.getDest());
                    createVirtualAddressRequest.setMd5(virtualAddressDTO.getFileMd5());
                    createVirtualAddressRequest.setFileType(virtualAddressDTO.getAddrType() + "");
                    createVirtualAddressRequest.setFileSizem(virtualAddressDTO.getFileSize() + "");
                    createVirtualAddressRequest.setFileName(virtualAddressDTO.getFileName());
                    createVirtualAddressRequest.setFid(virtualAddressDTO.getFileId());
                    Integer result = coreRemote.createVirtualAddress(createVirtualAddressRequest).getRespData();
                    if (result.equals(0)) {
                        panResult.error("保存失败，容量不足");
                        return panResult;
                    }
                }
                ShareDO shareDO = shareService.getShareByShareId(request.getShareId());
                shareDO.setSaveCount(shareDO.getSaveCount() + 1);
                shareService.updateShare(shareDO);
                panResult.success(null);
                return panResult;
            }
            panResult.error("分享失效");
            return panResult;
        }
        panResult.error("提取密码不正确");
        return panResult;
    }

    /**
     * 验证分享密码
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    private boolean verifyLock(String lockPassword, String shareId) {
        ShareDO shareDO = shareService.getShareByShareId(shareId);
        if (shareDO != null) {
            if (shareDO.getSharePassword().equals(lockPassword)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 查询分享是否带密码数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    public RestAPIResult<String> checkLockHandle(String shareId) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        ShareDO shareDO = shareService.getShareByShareId(shareId);
        if (shareDO != null) {
            if (shareDO.getLockWhether().equals(1)) {
                panResult.success(null);
                panResult.setRespData("Lock");
                return panResult;
            }
            panResult.success(null);
            panResult.setRespData("unLock");
            return panResult;
        }
        panResult.error();
        return panResult;
    }

    /**
     * 验证分享密码数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    public RestAPIResult<String> verifykLockHandle(String lockPassword, String shareId) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        if (verifyLock(lockPassword, shareId)) {
            panResult.success(null);
            panResult.setRespData("200");
        } else {
            panResult.error();
            panResult.setRespData("500");
        }
        return panResult;
    }

    /**
     * 根据分享ID获取虚拟地址ID数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    public RestAPIResult<String> getVinfoHandle(String shareId, String lockPassword) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        Map<String, Object> map = new HashMap<>();
        if (verifyLock(lockPassword, shareId)) {
            List<ShareMapDO> shareMapDOList = shareMapService.listShareMapByShareId(shareId);
            List<String> vids = new ArrayList<>();
            if (shareMapDOList != null && shareMapDOList.size() > 0) {
                for (ShareMapDO shareMapDO : shareMapDOList) {
                    vids.add(shareMapDO.getVirtualAddressId());
                    map.put("vid", vids);
                }
            }
            ShareDO shareDO = shareService.getShareByShareId(shareId);
            map.put("uid", shareDO.getUserId());
            panResult.setRespMap(map);
            return panResult;
        }
        panResult.error();
        return panResult;
    }

    /**
     * 增加分享访问量数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    public void addShareViewCountHandle(AddShareViewCountRequest request) {
        ShareDO shareDO = shareService.getShareByShareId(request.getShareId());
        if (shareDO != null) {
            shareDO.setVisitCount(shareDO.getVisitCount() + 1);
        }
        shareService.updateShare(shareDO);
    }

    /**
     * 增加分享下载量数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    public void addShareDownloadCountHandle(String shareId) {
        ShareDO shareDO = shareService.getShareByShareId(shareId);
        if (shareDO != null) {
            shareDO.setDownloadCount(shareDO.getDownloadCount() + 1);
        }
        shareService.updateShare(shareDO);
    }
}
