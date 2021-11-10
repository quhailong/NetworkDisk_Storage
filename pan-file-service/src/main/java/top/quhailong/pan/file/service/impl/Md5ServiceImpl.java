package top.quhailong.pan.file.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.quhailong.pan.file.dao.FileDao;
import top.quhailong.pan.file.service.IMd5Service;
import top.quhailong.pan.framework.redis.core.utils.RedisUtil;
import top.quhailong.pan.utils.RestAPIResult;

import java.util.concurrent.TimeUnit;

@Service
public class Md5ServiceImpl implements IMd5Service {
    @Autowired
    private RedisUtil redisUtil;
    @Autowired
    private FileDao fileDao;

    @Override
    public RestAPIResult<String> md5CheckHandle(String fid, String md5) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        redisUtil.setEx("fileMd5:" + fid, md5, 259200, TimeUnit.SECONDS);
        Integer count = fileDao.checkMd5Whether(md5);
        if (count > 0) {
            panResult.success(null);
        } else {
            panResult.error();
        }
        return panResult;
    }
}
