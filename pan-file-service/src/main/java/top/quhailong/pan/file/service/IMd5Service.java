package top.quhailong.pan.file.service;

import top.quhailong.pan.utils.RestAPIResult;

public interface IMd5Service {
    /**
     * MD5校验数据处理
     *
     * @author: quhailong
     * @date: 2021/11/1
     */
    RestAPIResult<String> md5CheckHandle(String fid, String md5);
}
