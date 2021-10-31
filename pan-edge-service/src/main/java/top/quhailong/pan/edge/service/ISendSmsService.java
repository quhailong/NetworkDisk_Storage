package top.quhailong.pan.edge.service;

import top.quhailong.pan.request.SendSmsRequest;
import top.quhailong.pan.utils.RestAPIResult;

public interface ISendSmsService {
    /**
     * 发送短信数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    RestAPIResult<String> sendSmsHandle(SendSmsRequest request);

}
