package top.quhailong.pan.edge.service.impl;

import org.springframework.stereotype.Service;
import top.quhailong.pan.edge.service.ISendSmsService;
import top.quhailong.pan.edge.utils.AbsRestClient;
import top.quhailong.pan.edge.utils.JsonReqClient;
import top.quhailong.pan.pojo.SmsResult;
import top.quhailong.pan.request.SendSmsRequest;
import top.quhailong.pan.utils.JSONUtils;
import top.quhailong.pan.utils.RestAPIResult;

@Service
public class SendSmsServiceImpl implements ISendSmsService {
    @Override
    public RestAPIResult<String> sendSmsHandle(SendSmsRequest request) {
        RestAPIResult<String> panResult = new RestAPIResult<String>();
        String jsonResult = InstantiationRestAPI().sendSms(request.getSid(), request.getToken(), request.getAppid(), request.getTemplateid(), request.getParam(), request.getMobile(), request.getUid());
        System.out.println("Response content is: " + jsonResult);
        SmsResult result = JSONUtils.parseObject(jsonResult, SmsResult.class);
        if (!result.getMsg().equals("OK")) {
            panResult.error();
            panResult.setRespData(result.getMsg());
            return panResult;
        }
        panResult.success(null);
        return panResult;
    }
    static AbsRestClient InstantiationRestAPI() {
        return new JsonReqClient();
    }
}
