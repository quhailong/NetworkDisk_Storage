package top.quhailong.pan.file.service;

import top.quhailong.pan.file.entity.FileDO;

public interface FileService {
    /**
     * 查询md5是否已经存在
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    Integer checkMd5Whether(String fileMd5);

    /**
     * 根据Md5获取文件信息
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    FileDO getFileByMd5(String fileMd5);

    /**
     * 保存文件信息
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    Integer saveFile(FileDO fileDO);

    /**
     * 根据文件ID获取文件信息
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    FileDO getFileByFid(String fileId);
}
