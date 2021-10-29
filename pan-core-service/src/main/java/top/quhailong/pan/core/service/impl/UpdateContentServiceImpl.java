package top.quhailong.pan.core.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.quhailong.pan.core.dao.CapacityDao;
import top.quhailong.pan.core.dao.VirtualAddressDao;
import top.quhailong.pan.core.entity.CapacityDO;
import top.quhailong.pan.core.entity.VirtualAddressDO;
import top.quhailong.pan.core.service.IUpdateContentService;
import top.quhailong.pan.request.CopyOrMoveFileRequest;
import top.quhailong.pan.request.CreateDirRequest;
import top.quhailong.pan.request.CreateVirtualAddressRequest;
import top.quhailong.pan.request.RenameFileOrDirRequest;
import top.quhailong.pan.utils.IDUtils;
import top.quhailong.pan.utils.JSONUtils;
import top.quhailong.pan.utils.RestAPIResult;

import java.util.*;
import java.util.regex.Pattern;

@Service
public class UpdateContentServiceImpl implements IUpdateContentService {
    @Autowired
    private VirtualAddressDao virtualAddressDao;
    @Autowired
    private CapacityDao capacityDao;

    /**
     * 重命名文件或文件夹数据处理
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    @Override
    public RestAPIResult<String> renameFileOrDirHandle(RenameFileOrDirRequest request) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        VirtualAddressDO virtualAddressDO = virtualAddressDao.getVirtualAddress(request.getVid());
        String suffix = "";
        if (virtualAddressDO.getAddrType() != 0) {
            suffix = virtualAddressDO.getFileName().substring(virtualAddressDO.getFileName().lastIndexOf("."));
        }
        Integer count = virtualAddressDao.checkVirtualAddress(virtualAddressDO.getUserId(), virtualAddressDO.getParentPath(), virtualAddressDO.getAddrType(), virtualAddressDO.getAddrType() != 0 ? request.getNewName() + suffix : request.getNewName());
        if (count == 0 || request.getFlag() != null) {
            if (virtualAddressDO.getAddrType() != 0) {
                changeFileName(request.getNewName(), virtualAddressDO, count);
            } else {
                changeDirFileName(request.getNewName(), virtualAddressDO, count);
            }
            panResult.setRespCode(200);
            panResult.setRespData("200");
            return panResult;
        } else {
            panResult.setRespCode(203);
            panResult.setRespData("有重名");
            return panResult;
        }
    }

    /**
     * 修改文件名称
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    private void changeFileName(String newName, VirtualAddressDO virtualAddressDO, Integer count) {
        if (count > 0) {
            virtualAddressDO.setFileName(newName + "(" + count + ")" + virtualAddressDO.getFileName().substring(virtualAddressDO.getFileName().lastIndexOf(".")));
        } else {
            virtualAddressDO.setFileName(newName + virtualAddressDO.getFileName().substring(virtualAddressDO.getFileName().lastIndexOf(".")));
        }
        virtualAddressDO.setUpdateTime(new Date());
        virtualAddressDao.updateVirtualAddress(virtualAddressDO);
    }

    /**
     * 修改文件夹名称
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    private void changeDirFileName(String newName, VirtualAddressDO virtualAddressDO, Integer count) {
        String oldName = virtualAddressDO.getFileName();
        if (count > 0) {
            virtualAddressDO.setFileName(newName + "(" + count + ")");
        } else {
            virtualAddressDO.setFileName(newName);
        }
        virtualAddressDO.setUpdateTime(new Date());
        virtualAddressDao.updateVirtualAddress(virtualAddressDO);

        List<VirtualAddressDO> virtualAddressDOList = virtualAddressDao.listVirtualAddressLikeFilePath(virtualAddressDO.getUserId(), virtualAddressDO.getParentPath().equals("/") ? virtualAddressDO.getParentPath() + oldName : virtualAddressDO.getParentPath() + "/" + oldName);
        if (virtualAddressDOList != null && virtualAddressDOList.size() > 0) {
            for (VirtualAddressDO virtualAddressLike : virtualAddressDOList) {
                String suff;
                String pre;
                if (virtualAddressLike.getParentPath().equals("/")) {
                    suff = virtualAddressLike.getParentPath().substring((virtualAddressDO.getParentPath() + oldName).length());
                } else {
                    suff = virtualAddressLike.getParentPath().substring((virtualAddressDO.getParentPath() + "/" + oldName).length());
                }
                if (virtualAddressLike.getParentPath().equals("/")) {
                    pre = virtualAddressLike.getParentPath() + virtualAddressDO.getFileName();
                } else {
                    pre = virtualAddressLike.getParentPath() + "/" + virtualAddressDO.getFileName();
                }
                virtualAddressLike.setParentPath(pre + suff);
                virtualAddressDao.updateVirtualAddress(virtualAddressLike);
            }
        }
    }

    /**
     * 删除文件数据处理
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    @Override
    public RestAPIResult<String> deleteFileHandle(String vids) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        List<String> vidList = JSONUtils.parseObject(vids, List.class);
        if (vidList != null && vidList.size() > 0) {
            for (String vid : vidList) {
                VirtualAddressDO virtualAddressDO = virtualAddressDao.getVirtualAddress(vid);
                if (virtualAddressDO.getAddrType() != 0) {
                    delFile(virtualAddressDO);
                } else {
                    delDirFile(virtualAddressDO);
                }
            }
        }
        panResult.success(null);
        panResult.setDataCode("200");
        return panResult;
    }

    /**
     * 删除文件
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    private void delFile(VirtualAddressDO virtualAddressDO) {
        virtualAddressDao.removeVirtualAddress(virtualAddressDO.getUuid());
        CapacityDO capacityDO = capacityDao.getCapacity(virtualAddressDO.getUserId());
        capacityDO.setUsedCapacity(capacityDO.getUsedCapacity() - virtualAddressDO.getFileSize());
        capacityDao.updateCapacity(capacityDO);
    }

    /**
     * 删除文件夹
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    private void delDirFile(VirtualAddressDO virtualAddressDO) {
        virtualAddressDao.removeVirtualAddress(virtualAddressDO.getUuid());
        List<VirtualAddressDO> virtualAddressDOList = virtualAddressDao.listVirtualAddressLikeFilePath(virtualAddressDO.getUserId(), virtualAddressDO.getParentPath().equals("/") ? virtualAddressDO.getParentPath() + virtualAddressDO.getFileName() : virtualAddressDO.getParentPath() + "/" + virtualAddressDO.getFileName());
        if (virtualAddressDOList != null && virtualAddressDOList.size() > 0) {
            for (VirtualAddressDO virtualAddressDOLike : virtualAddressDOList) {
                virtualAddressDao.removeVirtualAddress(virtualAddressDOLike.getUuid());
                CapacityDO capacityDO = capacityDao.getCapacity(virtualAddressDOLike.getUserId());
                capacityDO.setUsedCapacity(capacityDO.getUsedCapacity() - virtualAddressDOLike.getFileSize());
                capacityDao.updateCapacity(capacityDO);
            }
        }
    }

    /**
     * 创建文件夹数据处理
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    @Override
    public RestAPIResult<String> createDirHandle(CreateDirRequest request) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        if (!Pattern.compile("^[a-zA-Z0-9\u4E00-\u9FA5_]+$").matcher(request.getDirName()).matches()) {
            panResult.error("文件夹长度必须小于20，并且不能包含特殊字符，只能为数字、字母、中文、下划线");
            return panResult;
        }
        Integer count = virtualAddressDao.checkVirtualAddress(request.getUid(), request.getParentPath(), null, request.getDirName());
        VirtualAddressDO virtualAddressDO = new VirtualAddressDO();
        virtualAddressDO.setAddrType(0);
        virtualAddressDO.setDirWhether(1);
        virtualAddressDO.setCreateTime(new Date());
        virtualAddressDO.setFileId(null);
        if (count > 0) {
            virtualAddressDO.setFileName(request.getDirName() + "(" + count + ")");
        } else {
            virtualAddressDO.setFileName(request.getDirName());
        }
        virtualAddressDO.setFileSize(null);
        virtualAddressDO.setFileMd5(null);
        virtualAddressDO.setParentPath(request.getParentPath());
        virtualAddressDO.setUserId(request.getUid());
        virtualAddressDO.setUpdateTime(new Date());
        virtualAddressDO.setUuid(IDUtils.showNextId(new Random().nextInt(30)).toString());
        virtualAddressDao.saveVirtualAddress(virtualAddressDO);
        Map<String, Object> map = new HashMap<>();
        map.put("0", JSONUtils.toJSONString(virtualAddressDO));
        panResult.setRespMap(map);
        panResult.setRespData("200");
        return panResult;
    }

    /**
     * 复制或移动文件
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    private boolean copyOrMoveFile(VirtualAddressDO virtualAddressDO, String dest, String opera) {
        String oldUuid = virtualAddressDO.getUuid();
        String pre = virtualAddressDO.getFileName().substring(0, virtualAddressDO.getFileName().lastIndexOf("."));
        String suffix = virtualAddressDO.getFileName().substring(virtualAddressDO.getFileName().lastIndexOf("."));
        Integer count = virtualAddressDao.checkVirtualAddress(virtualAddressDO.getUserId(), dest, null, virtualAddressDO.getFileName());
        if (count > 0) {
            virtualAddressDO.setFileName(pre + "(" + count + ")" + suffix);
        }
        virtualAddressDO.setUuid(IDUtils.showNextId(new Random().nextInt(30)).toString());
        virtualAddressDO.setParentPath(dest);
        virtualAddressDO.setCreateTime(new Date());
        virtualAddressDO.setUpdateTime(new Date());
        if (opera.equals("copyOK")) {
            CapacityDO capacity = capacityDao.getCapacity(virtualAddressDO.getUserId());
            if ((capacity.getUsedCapacity() + virtualAddressDO.getFileSize()) > capacity.getTotalCapacity()) {
                return false;
            }
            virtualAddressDao.saveVirtualAddress(virtualAddressDO);
            capacity.setUsedCapacity(capacity.getUsedCapacity() + virtualAddressDO.getFileSize());
            capacityDao.updateCapacity(capacity);
        } else {
            virtualAddressDao.updateVirtualAddress(virtualAddressDO);
        }
        return true;
    }

    /**
     * 复制或移动文件夹
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    private boolean copyOrMoveDirFile(VirtualAddressDO virtualAddressDO, String dest, String opera) {
        Integer count = virtualAddressDao.checkVirtualAddress(virtualAddressDO.getUserId(), dest, null, virtualAddressDO.getFileName());
        String uuid = IDUtils.showNextId(new Random().nextInt(30)).toString();
        if (opera.equals("moveOK")) {
            virtualAddressDao.removeVirtualAddress(virtualAddressDO.getUuid());
        }
        VirtualAddressDO virtualAddressDONew = new VirtualAddressDO();
        virtualAddressDONew.setAddrType(0);
        virtualAddressDONew.setCreateTime(new Date());
        virtualAddressDONew.setFileId(null);
        if (count > 0) {
            virtualAddressDONew.setFileName(virtualAddressDO.getFileName() + "(" + count + ")");
        } else {
            virtualAddressDONew.setFileName(virtualAddressDO.getFileName());
        }
        virtualAddressDONew.setFileSize(null);
        virtualAddressDONew.setFileMd5(null);
        virtualAddressDONew.setParentPath(dest);
        virtualAddressDONew.setUserId(virtualAddressDO.getUserId());
        virtualAddressDONew.setUpdateTime(new Date());
        virtualAddressDONew.setUuid(uuid);
        virtualAddressDONew.setDirWhether(1);


        List<VirtualAddressDO> virtualAddressDOList = virtualAddressDao.listVirtualAddressLikeFilePath(virtualAddressDO.getUserId(), virtualAddressDO.getParentPath().equals("/") ? virtualAddressDO.getParentPath() + virtualAddressDO.getFileName() : virtualAddressDO.getParentPath() + "/" + virtualAddressDO.getFileName());
        if (virtualAddressDOList != null && virtualAddressDOList.size() > 0) {
            for (VirtualAddressDO virtualAddressLike : virtualAddressDOList) {
                String oldUuid = virtualAddressLike.getUuid();
                virtualAddressLike.setUuid(IDUtils.showNextId(new Random().nextInt(30)).toString());
                virtualAddressLike.setParentPath((dest.equals("/") ? dest : dest + "/") + virtualAddressDONew.getFileName() + virtualAddressDONew.getParentPath().substring(((virtualAddressDO.getParentPath().equals("/") ? virtualAddressDO.getParentPath() : virtualAddressDO.getParentPath() + "/") + virtualAddressDO.getFileName()).length(), virtualAddressLike.getParentPath().length()));
                virtualAddressLike.setCreateTime(new Date());
                virtualAddressLike.setUpdateTime(new Date());
                if (opera.equals("moveOK")) {
                    virtualAddressDao.removeVirtualAddress(oldUuid);
                    virtualAddressDao.saveVirtualAddress(virtualAddressLike);
                } else {
                    CapacityDO capacity = capacityDao.getCapacity(virtualAddressLike.getUserId());
                    if ((capacity.getUsedCapacity() + virtualAddressLike.getFileSize()) > capacity.getTotalCapacity()) {
                        return false;
                    }
                    capacity.setUsedCapacity(capacity.getUsedCapacity() + virtualAddressLike.getFileSize());
                    capacityDao.updateCapacity(capacity);
                    virtualAddressDao.saveVirtualAddress(virtualAddressLike);
                }
            }
        }
        virtualAddressDao.saveVirtualAddress(virtualAddressDONew);
        return true;

    }

    @Override
    public RestAPIResult<String> copyOrMoveFileHandle(CopyOrMoveFileRequest request) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        List<String> vidList = JSONUtils.parseObject(request.getVids(), List.class);
        for (String vid : vidList) {
            VirtualAddressDO virtualAddressDO = virtualAddressDao.getVirtualAddress(vid);
            if (virtualAddressDO.getAddrType() != 0) {
                if ((request.getDest().equals(virtualAddressDO.getParentPath()) || request.getDest().indexOf((virtualAddressDO.getParentPath().equals("/") ? virtualAddressDO.getParentPath() : virtualAddressDO.getParentPath() + "/") + virtualAddressDO.getFileName()) == 0)) {
                    if (request.getOpera().equals("copyOK")) {
                        panResult.error("不能将文件复制到自身或其子文件夹中");
                    } else {
                        panResult.error("不能将文件移动到自身或其子文件夹中");
                    }
                    return panResult;
                }
                if (!copyOrMoveFile(virtualAddressDO, request.getDest(), request.getOpera())) {
                    panResult.error("容量不足无法操作");
                    return panResult;
                }
            } else {
                if ((request.getDest().equals(virtualAddressDO.getParentPath()) || request.getDest().indexOf((virtualAddressDO.getParentPath().equals("/") ? virtualAddressDO.getParentPath() : virtualAddressDO.getParentPath() + "/") + virtualAddressDO.getFileName()) == 0)) {
                    if (request.getOpera().equals("copyOK")) {
                        panResult.error("不能将文件夹复制到自身或其子文件夹中");
                    } else {
                        panResult.error("不能将文件夹移动到自身或其子文件夹中");
                    }
                    return panResult;
                }
                if (!copyOrMoveDirFile(virtualAddressDO, request.getDest(), request.getOpera())) {
                    panResult.error("容量不足无法操作");
                    return panResult;
                }
            }
        }
        panResult.success(null);
        panResult.setDataCode("200");
        return panResult;
    }

    @Override
    public RestAPIResult<Integer> createVirtualAddressHandle(CreateVirtualAddressRequest request) {
        RestAPIResult<Integer> panResult = new RestAPIResult<>();
        String pre = request.getFileName().substring(0, request.getFileName().lastIndexOf("."));
        String suffix = request.getFileName().substring(request.getFileName().lastIndexOf("."));
        Integer count = virtualAddressDao.checkVirtualAddress(request.getUid(), request.getParentPath(), null, request.getFileName());
        VirtualAddressDO virtualAddressDO = new VirtualAddressDO();
        if (count > 0) {
            virtualAddressDO.setFileName(pre + "(" + count + ")" + suffix);
        } else {
            virtualAddressDO.setFileName(request.getFileName());
        }
        virtualAddressDO.setUuid(IDUtils.showNextId(new Random().nextInt(30)).toString());
        virtualAddressDO.setFileId(request.getFid());
        virtualAddressDO.setUserId(request.getUid());
        virtualAddressDO.setFileMd5(request.getMd5());
        virtualAddressDO.setAddrType(request.getMd5() == null ? 0 : Integer.valueOf(request.getFileType()));
        virtualAddressDO.setDirWhether(request.getMd5() == null ? 1 : 0);
        virtualAddressDO.setFileSize(request.getMd5() == null ? 0 : Integer.valueOf(request.getFileSizem()));
        virtualAddressDO.setParentPath(request.getParentPath() == null ? "/" : request.getParentPath());
        virtualAddressDO.setCreateTime(new Date());
        virtualAddressDO.setUpdateTime(new Date());
        Integer result = 0;
        CapacityDO capacity = capacityDao.getCapacity(request.getUid());
        if ((capacity.getUsedCapacity() + virtualAddressDO.getFileSize()) <= capacity.getTotalCapacity()) {
            result = virtualAddressDao.saveVirtualAddress(virtualAddressDO);
            capacity.setUsedCapacity(capacity.getUsedCapacity() + virtualAddressDO.getFileSize());
            capacityDao.updateCapacity(capacity);
        }
        panResult.success(result);
        return panResult;
    }
}
