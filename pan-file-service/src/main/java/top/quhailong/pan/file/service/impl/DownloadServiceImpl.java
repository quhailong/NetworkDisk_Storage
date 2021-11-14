package top.quhailong.pan.file.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.quhailong.pan.file.dao.FileDao;
import top.quhailong.pan.file.entity.FileDO;
import top.quhailong.pan.file.remote.CoreRemote;
import top.quhailong.pan.file.remote.ShareRemote;
import top.quhailong.pan.file.service.IDownloadService;
import top.quhailong.pan.file.utils.FastDFSClient;
import top.quhailong.pan.file.utils.FileUtils;
import top.quhailong.pan.response.VirtualAddressDTO;
import top.quhailong.pan.utils.JSONUtils;
import top.quhailong.pan.request.base.RestAPIResultDTO;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.zip.ZipOutputStream;

@Service
public class DownloadServiceImpl implements IDownloadService {
    @Autowired
    private CoreRemote coreRemote;
    @Autowired
    private FileDao fileDao;
    @Autowired
    private FileUtils fileUtils;
    @Autowired
    private ShareRemote shareRemote;
    /**
     * 下载文件数据处理
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    @Override
    public void downloadHandle(String uid, String vids, HttpServletResponse res) throws IOException {
        List<String> vidList = JSONUtils.parseObject(vids, List.class);
        download(uid, vidList, res);
    }

    /**
     * 处理下载
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    private void download(String uid, List<String> vidList, HttpServletResponse res) throws IOException {
        String fileName2 = coreRemote.getFileNameByVid(vidList.get(0), uid).getRespData();
        Map<String, String> map = getFids(vidList, uid);
        if (map != null && map.size() == 1) {
            for (Map.Entry<String, String> entry : map.entrySet()) {
                String groupName;
                String remoteFileName;
                String fileName = entry.getKey();
                groupName = entry.getValue().substring(0, entry.getValue().indexOf("/"));
                remoteFileName = entry.getValue().substring(groupName.length() + 1);
                InputStream inputStream = FastDFSClient.downFile(groupName, remoteFileName);
                res.setContentType("application/octet-stream");
                res.setHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes(), "ISO-8859-1"));
                byte[] buff = new byte[1024];
                BufferedInputStream bis = null;
                OutputStream os = null;
                try {
                    os = res.getOutputStream();
                    bis = new BufferedInputStream(inputStream);
                    int i = bis.read(buff);
                    while (i != -1) {
                        os.write(buff, 0, buff.length);
                        i = bis.read(buff);
                        os.flush();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    if (bis != null) {
                        try {
                            bis.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        } else if (map != null && map.size() > 1) {
            String folderName = UUID.randomUUID().toString().replaceAll("-", "");
            File fileDir = new File(folderName);
            fileDir.mkdir();
            String fileName3 = "【批量下载】" + fileName2.substring(0, fileName2.lastIndexOf(".")) + "等.zip";
            String zipFilePath = folderName + "/" + fileName3;
            File zip = new File(zipFilePath);
            if (!zip.exists()) {
                zip.createNewFile();
            }
            FileOutputStream fos = new FileOutputStream(zip);
            ZipOutputStream zos = new ZipOutputStream(fos);
            for (Map.Entry<String, String> entry : map.entrySet()) {
                String groupName = null;
                String remoteFileName = null;
                String fileName = entry.getKey();
                groupName = entry.getValue().substring(0, entry.getValue().indexOf("/"));
                remoteFileName = entry.getValue().substring(groupName.length() + 1, entry.getValue().length());
                InputStream inputStream = FastDFSClient.downFile(groupName, remoteFileName);
                File file = new File(folderName + "/" + fileName);
                OutputStream os = new FileOutputStream(file);
                int bytesRead = 0;
                byte[] buffer = new byte[8192];
                while ((bytesRead = inputStream.read(buffer, 0, 8192)) != -1) {
                    os.write(buffer, 0, bytesRead);
                }
                os.flush();
                os.close();
                inputStream.close();
                fileUtils.zipFile(file, zos);
            }
            zos.closeEntry();
            zos.close();
            fos.close();
            res.setContentType("application/octet-stream");
            res.setHeader("Content-Disposition", "attachment;filename=" + new String(fileName3.getBytes(), "ISO-8859-1"));
            byte[] buff = new byte[1024];
            BufferedInputStream bis = null;
            OutputStream os = null;
            try {
                InputStream fis = new BufferedInputStream(new FileInputStream(zipFilePath));
                os = res.getOutputStream();
                bis = new BufferedInputStream(fis);
                int i = bis.read(buff);
                while (i != -1) {
                    os.write(buff, 0, buff.length);
                    os.flush();
                    i = bis.read(buff);
                }
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (bis != null) {
                    try {
                        bis.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            fileUtils.delFolder(folderName);
        }
    }

    private Map<String, String> getFids(List<String> vidList, String uid) {
        Map<String, String> map = new HashMap<>();
        for (String vid : vidList) {
            VirtualAddressDTO virtualaddressDTO = coreRemote.getVirtualaddress(vid, uid).getRespData();
            FileDO fileDO = fileDao.getFileByFid(virtualaddressDTO.getFileId());
            map.put(virtualaddressDTO.getFileName(), fileDO.getFileLocation());
        }
        return map;
    }

    /**
     * 下载分享文件数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    @Override
    public void downloadShareHandle(String lockPassword, String shareId, HttpServletResponse res) throws IOException {
        RestAPIResultDTO<Map<String, Object>> apiResult = shareRemote.getVinfo(shareId, lockPassword);
        if (apiResult.getRespCode() == 1) {
            Map<String, Object> respMap = apiResult.getRespData();
            List<String> vidList = (List<String>) respMap.get("vid");
            String uid = respMap.get("uid").toString();
            download(uid, vidList, res);
            shareRemote.addShareDownload(shareId);
        }
    }

}
