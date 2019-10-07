package top.quhailong.pan.file.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import top.quhailong.pan.file.dao.FileDao;
import top.quhailong.pan.file.entity.FileDO;
import top.quhailong.pan.file.service.FileService;
@Component
public class FileServiceImpl implements FileService {
    @Autowired
    private FileDao fileDao;
    @Override
    public Integer checkMd5Whether(String fileMd5) {
        return fileDao.checkMd5Whether(fileMd5);
    }

    @Override
    public FileDO getFileByMd5(String fileMd5) {
        return fileDao.getFileByMd5(fileMd5);
    }

    @Override
    public Integer saveFile(FileDO fileDO) {
        return fileDao.saveFile(fileDO);
    }

    @Override
    public FileDO getFileByFid(String fileId) {
        return fileDao.getFileByFid(fileId);
    }
}
