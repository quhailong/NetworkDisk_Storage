package top.quhailong.pan.edge.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import top.quhailong.pan.edge.service.ISendSmsService;
import top.quhailong.pan.request.SendSmsRequest;
import top.quhailong.pan.request.base.RestAPIResultDTO;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RestController
public class SendSmsController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Resource
    private HttpServletRequest httpServletRequest;
    @Autowired
    private ISendSmsService sendSmsService;

    /**
     * 发送短信
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    //@RequestMapping("/api/sendSms")
    @RequestMapping(value = "sendSms", method = RequestMethod.POST)
    public RestAPIResultDTO<String> sendSms(@RequestBody SendSmsRequest request) {
        logger.info("发送短信请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("发送短信数据处理开始");
        RestAPIResultDTO<String> result = sendSmsService.sendSmsHandle(request);
        logger.info("发送短信数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("发送短信调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }
}
