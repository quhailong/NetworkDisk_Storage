package top.quhailong.pan.edge.service;

import top.quhailong.pan.request.SendSmsRequest;
import top.quhailong.pan.request.base.RestAPIResultDTO;

public interface ISendSmsService {
    /**
     * 发送短信数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    RestAPIResultDTO<String> sendSmsHandle(SendSmsRequest request);

}
