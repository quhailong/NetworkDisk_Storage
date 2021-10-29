package top.quhailong.pan.core.service.impl;

import com.github.pagehelper.PageHelper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.quhailong.pan.core.dao.VirtualAddressDao;
import top.quhailong.pan.core.entity.VirtualAddressDO;
import top.quhailong.pan.core.service.IQueryContentService;
import top.quhailong.pan.pojo.FolderInfo;
import top.quhailong.pan.request.CheckDirWhetherRequest;
import top.quhailong.pan.request.ListFileRequest;
import top.quhailong.pan.request.ListFolderRequest;
import top.quhailong.pan.request.SearchFileRequest;
import top.quhailong.pan.response.VirtualAddressDTO;
import top.quhailong.pan.utils.JSONUtils;
import top.quhailong.pan.utils.RestAPIResult;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class QueryContentServiceImpl implements IQueryContentService {
    @Autowired
    private VirtualAddressDao virtualAddressDao;

    @Override
    public RestAPIResult<String> listFileHandle(ListFileRequest request) throws UnsupportedEncodingException {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        String path = request.getPath();
        if (request.getPath() != null) {
            path = URLDecoder.decode(path, "UTF-8");
        }
        PageHelper.startPage(request.getPage(), 100);
        if (request.getDesc().equals(1)) {
            if (request.getType().equals("all")) {
                PageHelper.orderBy("dir_whether desc," + request.getOrder() + " desc");
            } else {
                PageHelper.orderBy(request.getOrder() + " desc");
            }
        } else {
            if (request.getType().equals("all")) {
                PageHelper.orderBy("dir_whether desc," + request.getOrder() + " asc");
            } else {
                PageHelper.orderBy(request.getOrder() + " asc");
            }
        }
        Integer type = 0;
        String parentPath = null;
        if (request.getType().equals("all")) {
            parentPath = path;
            type = null;
        } else if (request.getType().equals("pic")) {
            type = 1;
        } else if (request.getType().equals("doc")) {
            type = 2;
        } else if (request.getType().equals("video")) {
            type = 3;
        } else if (request.getType().equals("mbt")) {
            type = 4;
        } else if (request.getType().equals("music")) {
            type = 5;
        } else if (request.getType().equals("other")) {
            type = 6;
        } else {
            type = 7;
        }
        List<VirtualAddressDO> virtualAddressDOList = virtualAddressDao.listVirtualAddress(request.getUid(), parentPath, type);
        if (virtualAddressDOList != null && virtualAddressDOList.size() > 0) {
            Map<String, Object> map = new HashMap<>();
            int i = 0;
            for (VirtualAddressDO virtualAddressDO : virtualAddressDOList) {
                map.put(i++ + "", JSONUtils.toJSONString(virtualAddressDO));
            }
            panResult.setRespMap(map);
            panResult.setRespData("200");
            return panResult;
        } else {
            panResult.success(null);
            return panResult;
        }
    }

    @Override
    public RestAPIResult<String> listFolderHandle(ListFolderRequest request) throws UnsupportedEncodingException {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        String parentPath = request.getParentPath();
        if (parentPath != null) {
            parentPath = URLDecoder.decode(parentPath, "UTF-8");
        }

        List<FolderInfo> folderInfos = new ArrayList<>();
        PageHelper.orderBy("file_name desc");
        List<VirtualAddressDO> virtualaddressDOList = virtualAddressDao.listVirtualAddress(request.getUid(), parentPath, 0);
        if (virtualaddressDOList != null && virtualaddressDOList.size() > 0) {
            for (VirtualAddressDO virtualAddressDO : virtualaddressDOList) {
                List<VirtualAddressDO> inVirtualAddressDOList = virtualAddressDao.listVirtualAddress(request.getUid(), parentPath.equals("/") ? parentPath + virtualAddressDO.getFileName() : parentPath + "/" + virtualAddressDO.getFileName(), 0);
                FolderInfo folderInfo = new FolderInfo();
                if (parentPath.equals("/")) {
                    folderInfo.setPath(parentPath + virtualAddressDO.getFileName());
                } else {
                    folderInfo.setPath(parentPath + "/" + virtualAddressDO.getFileName());
                }
                if (inVirtualAddressDOList != null && inVirtualAddressDOList.size() > 0) {
                    folderInfo.setDir_empty(1);
                } else {
                    folderInfo.setDir_empty(0);
                }
                folderInfos.add(folderInfo);
            }
            if (folderInfos != null && folderInfos.size() > 0) {
                Map<String, Object> map = new HashMap<>();
                int i = 0;
                for (FolderInfo folderInfo : folderInfos) {
                    map.put(i++ + "", JSONUtils.toJSONString(folderInfo));
                }
                panResult.setRespMap(map);
                panResult.setRespData("200");
                return panResult;
            } else {
                panResult.success(null);
                return panResult;
            }
        } else {
            return null;
        }
    }

    @Override
    public RestAPIResult<String> searchFileHandle(SearchFileRequest request) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        PageHelper.startPage(request.getPage(), 100);
        PageHelper.orderBy("dir_whether desc," + request.getOrder() + " desc");
        List<VirtualAddressDO> virtualAddressDOList = virtualAddressDao.listVirtualAddressLikeFileName(request.getUid(), request.getKey());
        if (virtualAddressDOList != null && virtualAddressDOList.size() > 0) {
            Map<String, Object> map = new HashMap<>();
            int i = 0;
            for (VirtualAddressDO virtualAddressDO : virtualAddressDOList) {
                map.put(i++ + "", JSONUtils.toJSONString(virtualAddressDO));
            }
            panResult.setRespMap(map);
            panResult.setRespData("200");
            return panResult;
        } else {
            panResult.setRespData("200");
            return panResult;
        }
    }

    @Override
    public RestAPIResult<Integer> checkDirWhetherHandle(CheckDirWhetherRequest request) {
        Integer count = virtualAddressDao.checkVirtualAddress(request.getUid(), request.getParentPath(), null, request.getDirName());
        RestAPIResult<Integer> panResult = new RestAPIResult<>();
        panResult.success(count);
        return panResult;
    }

    @Override
    public RestAPIResult<String> getFileNameByVidHandle(String vid, String uid) {
        VirtualAddressDO virtualAddressDO = virtualAddressDao.getVirtualAddress(vid);
        RestAPIResult<String> panResult = new RestAPIResult<>();
        panResult.success(virtualAddressDO.getFileName());
        return panResult;
    }

    @Override
    public RestAPIResult<VirtualAddressDTO> getVirtualaddressHandle(String vid, String uid) {
        RestAPIResult<VirtualAddressDTO> panResult = new RestAPIResult<>();
        VirtualAddressDTO virtualaddressDTO = new VirtualAddressDTO();
        VirtualAddressDO virtualAddressDO = virtualAddressDao.getVirtualAddress(vid);
        BeanUtils.copyProperties(virtualAddressDO, virtualaddressDTO);
        panResult.success(virtualaddressDTO);
        return panResult;
    }
}
