package top.quhailong.pan.file.provider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import top.quhailong.pan.file.entity.FileDO;
import top.quhailong.pan.file.remote.CoreRemote;
import top.quhailong.pan.file.service.FileService;
import top.quhailong.pan.file.utils.FileUtils;
import top.quhailong.pan.request.*;
import top.quhailong.pan.utils.IDUtils;
import top.quhailong.pan.utils.JedisClusterUtil;
import top.quhailong.pan.utils.RestAPIResult;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Date;
import java.util.Random;

/**
 * 上传文件数据处理类
 *
 * @author: quhailong
 * @date: 2019/9/25
 */
@Component
public class UploadFileProvider {
    @Autowired
    private CoreRemote coreRemote;
    @Autowired
    private JedisClusterUtil jedisClusterUtil;
    @Autowired
    private FileService fileService;
    @Autowired
    private FileUtils fileUtils;

    /**
     * 上传文件数据处理
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    public RestAPIResult<String> uploadFileHandle(UploadFileRequest request) throws IOException {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        String parentPath = request.getParentPath();
        MultipartFile file = request.getFile();
        if (parentPath != null) {
            parentPath = URLDecoder.decode(parentPath, "UTF-8");
        } else {
            parentPath = "/";
        }
        String upPath = "";
        synchronized (this) {
            // 我的资源/滴滴滴.txt
            if (file.getOriginalFilename().contains("/")) {
                upPath = file.getOriginalFilename().substring(0, file.getOriginalFilename().lastIndexOf("/"));
                if (upPath.contains("/")) {
                    upPath = upPath.substring(upPath.lastIndexOf("/") + 1);
                }
                CheckDirWhetherRequest checkDirWhetherRequest = new CheckDirWhetherRequest();
                checkDirWhetherRequest.setUid(request.getUid());
                checkDirWhetherRequest.setDirName(upPath);
                checkDirWhetherRequest.setParentPath(parentPath);
                Integer count = coreRemote.checkDirWhether(checkDirWhetherRequest).getRespData();
                if (count == 0) {
                    CreateDirRequest createDirRequest = new CreateDirRequest();
                    createDirRequest.setDirName(upPath);
                    createDirRequest.setParentPath(parentPath);
                    createDirRequest.setUid(request.getUid());
                    coreRemote.createDir(createDirRequest);
                }
            }
            String md5 = jedisClusterUtil.getValue("fileMd5:" + request.getFid());
            jedisClusterUtil.delKey("fileMd5:" + request.getFid());
            Integer count = fileService.checkMd5Whether(md5);
            FileDO fileDO;
            if (count > 0) {
                fileDO = getFileDOByMd5(md5);
            } else {
                String path = fileUtils.saveFile(file);
                fileDO = saveFileToDatabase(file, path, md5);
            }
            CreateVirtualAddressRequest createVirtualAddressRequest = new CreateVirtualAddressRequest();
            createVirtualAddressRequest.setFid(fileDO.getFileId());
            createVirtualAddressRequest.setFileName(file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("/") + 1));
            createVirtualAddressRequest.setFileSizem(fileDO.getFileSize() + "");
            createVirtualAddressRequest.setFileType(fileDO.getFileType() + "");
            createVirtualAddressRequest.setMd5(md5);
            createVirtualAddressRequest.setUid(request.getUid());
            if (parentPath.equals("/")) {
                createVirtualAddressRequest.setParentPath(parentPath + upPath);
            } else {
                createVirtualAddressRequest.setParentPath(upPath.equals("") ? parentPath : parentPath + "/" + upPath);
            }
            coreRemote.createVirtualAddress(createVirtualAddressRequest);
            panResult.success(null);
            return panResult;
        }
    }

    /**
     * 查询文件
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    private FileDO getFileDOByMd5(String md5) {
        FileDO fileDO = fileService.getFileByMd5(md5);
        return fileDO;
    }

    /**
     * 保存文件到数据库
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    private FileDO saveFileToDatabase(MultipartFile file, String path, String md5) {
        String fileName = file.getOriginalFilename();
        if (file.getOriginalFilename().contains("/")) {
            fileName = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("/") + 1);
        }
        String fid = IDUtils.showNextId(new Random().nextInt(30)).toString();
        FileDO fileDO = new FileDO();
        fileDO.setFileId(fid);
        fileDO.setOriginalName(fileName);
        fileDO.setFileLocation(path);
        fileDO.setFileSize((int) file.getSize());
        fileDO.setFileMd5(md5);
        fileDO.setCreateTime(new Date());
        String contentType = file.getContentType();
        if (contentType.equals("image/jpeg") || contentType.equals("image/gif")) {
            fileDO.setFileType(1);
        } else if (contentType.equals("application/pdf") || contentType.equals("application/msword") || contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document") || contentType.equals("application/x-ppt") || contentType.equals("application/vnd.openxmlformats-officedocument.presentationml.presentation") || file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1, file.getOriginalFilename().length()).equals("txt")) {
            fileDO.setFileType(2);
        } else if (contentType.equals("video/mpeg4") || contentType.equals("video/avi") || contentType.equals("application/vnd.rn-realmedia-vbr") || contentType.equals("video/mpg") || contentType.equals("video/x-ms-wmv")) {
            fileDO.setFileType(3);
        } else if (contentType.equals("application/x-bittorrent")) {
            fileDO.setFileType(4);
        } else if (contentType.equals("audio/mp3")) {
            fileDO.setFileType(5);
        } else {
            fileDO.setFileType(6);
        }
        fileService.saveFile(fileDO);
        return fileDO;
    }

    /**
     * 秒传文件数据处理
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    public RestAPIResult<String> quickUploadFileHandle(QuickUploadFileRequest request) throws UnsupportedEncodingException {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        String parentPath = request.getParentPath();
        String fileName = request.getFileName();
        if (parentPath != null) {
            parentPath = URLDecoder.decode(parentPath, "UTF-8");
        } else {
            parentPath = "/";
        }
        synchronized (this) {
            String upPath = "";
            FileDO fileDO = fileService.getFileByMd5(request.getMd5());
            CreateVirtualAddressRequest createVirtualAddressRequest = new CreateVirtualAddressRequest();
            createVirtualAddressRequest.setFid(fileDO.getFileId());
            createVirtualAddressRequest.setFileName(fileName.substring(fileName.lastIndexOf("/") + 1));
            createVirtualAddressRequest.setFileSizem(fileDO.getFileSize() + "");
            createVirtualAddressRequest.setFileType(fileDO.getFileType() + "");
            createVirtualAddressRequest.setMd5(request.getMd5());
            createVirtualAddressRequest.setUid(request.getUid());
            if (fileName.contains("/")) {
                upPath = fileName.substring(0, fileName.lastIndexOf("/"));
                if (upPath.contains("/")) {
                    upPath = upPath.substring(upPath.lastIndexOf("/") + 1);
                }
                CheckDirWhetherRequest checkDirWhetherRequest = new CheckDirWhetherRequest();
                checkDirWhetherRequest.setUid(request.getUid());
                checkDirWhetherRequest.setDirName(upPath);
                checkDirWhetherRequest.setParentPath(parentPath);
                Integer count = coreRemote.checkDirWhether(checkDirWhetherRequest).getRespData();
                if (count == 0) {
                    CreateDirRequest createDirRequest = new CreateDirRequest();
                    createDirRequest.setDirName(upPath);
                    createDirRequest.setParentPath(parentPath);
                    createDirRequest.setUid(request.getUid());
                    coreRemote.createDir(createDirRequest);
                }
                createVirtualAddressRequest.setParentPath(parentPath + upPath);
                if (parentPath.equals("/")) {
                    createVirtualAddressRequest.setParentPath(parentPath + upPath);
                } else {
                    createVirtualAddressRequest.setParentPath(upPath.equals("") ? parentPath : parentPath + "/" + upPath);
                }
            } else {
                createVirtualAddressRequest.setParentPath(parentPath);
            }
            coreRemote.createVirtualAddress(createVirtualAddressRequest);
            jedisClusterUtil.delKey("fileMd5:" + request.getFid());
            panResult.success(null);
            return panResult;
        }
    }

    /**
     * 上传文件(内部调用)数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    public RestAPIResult<String> uploadHandle(MultipartFile file) throws IOException {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        String fileAddr = fileUtils.saveFile(file);
        panResult.success(fileAddr);
        return panResult;
    }
}
