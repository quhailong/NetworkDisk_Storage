package top.quhailong.pan.serviceapi.service;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import top.quhailong.pan.request.SendSmsRequest;
import top.quhailong.pan.request.base.RestAPIResultDTO;

public interface EdgeService {
    @RequestMapping(value = "sendSms", method = RequestMethod.POST)
    RestAPIResultDTO<String> sendSms(@RequestBody SendSmsRequest request);
}
