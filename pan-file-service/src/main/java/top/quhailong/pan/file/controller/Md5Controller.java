package top.quhailong.pan.file.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import top.quhailong.pan.file.service.IMd5Service;
import top.quhailong.pan.utils.RestAPIResult;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * Md5服务
 *
 * @author: quhailong
 * @date: 2019/9/25
 */
@RestController
public class Md5Controller {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Resource
    private HttpServletRequest httpServletRequest;
    @Autowired
    private IMd5Service md5Provider;

    /**
     * Md5校验服务
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    //@RequestMapping(value = "md5check" , method = { RequestMethod.POST })
    @RequestMapping(value = "md5check", method = RequestMethod.GET)
    public RestAPIResult<String> md5Check(String fid, String md5) {
        logger.info("Md5校验服务请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("Md5校验服务数据处理开始,md5:{}", md5);
        RestAPIResult<String> result = md5Provider.md5CheckHandle(fid, md5);
        logger.info("Md5校验服务数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("Md5校验服务调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }
}
