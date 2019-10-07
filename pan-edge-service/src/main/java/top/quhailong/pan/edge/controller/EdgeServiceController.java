package top.quhailong.pan.edge.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.*;
import top.quhailong.pan.edge.provider.EdgeServiceProvider;
import top.quhailong.pan.utils.RestAPIResult;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

@RestController
public class EdgeServiceController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Resource
    private HttpServletRequest httpServletRequest;
    @Autowired
    private EdgeServiceProvider edgeServiceProvider;

    /**
     * 生成公钥
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    //@RequestMapping(value = "getPublickKey", method = {RequestMethod.GET})
    @RequestMapping(value = "getpublickey", method = RequestMethod.GET)
    public RestAPIResult<String> getPublicKey() throws Exception {
        logger.info("生成公钥请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("生成公钥数据处理开始");
        RestAPIResult<String> result = edgeServiceProvider.getPublicKeyHandle();
        logger.info("生成公钥数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("生成公钥调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }

    /**
     * 生成验证码
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    @RequestMapping(value = "getverfyimg/{vcodestr}", method = RequestMethod.GET)
    public void getVerfyImg(@PathVariable(value = "vcodestr") String vcodestr, HttpServletResponse response) {
        logger.info("生成验证码请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("生成验证码数据处理开始");
        edgeServiceProvider.getVerfyImgHandle(vcodestr, response);
        logger.info("生成验证码数据处理结束");
        stopWatch.stop();
        logger.info("生成验证码调用时间,millies:{}", stopWatch.getTotalTimeMillis());
    }


    /**
     * 检查密码格式
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    @RequestMapping(value = "regcheckpwd", method = RequestMethod.POST)
    public RestAPIResult<String> regCheckPwd(@RequestParam("password") String password, @RequestParam("RSAKey") String RSAKey) {
        logger.info("检查密码格式请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("检查密码格式数据处理开始");
        RestAPIResult<String> result = edgeServiceProvider.regCheckPwdHandle(password, RSAKey);
        logger.info("检查密码格式数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("检查密码格式调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }

    /**
     * 变换图片的UUID
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    //@RequestMapping("/regsmscodestr")
    @RequestMapping(value = "/regsmscodestr", method = RequestMethod.GET)
    public RestAPIResult<String> regsmscodestr() {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        logger.info("变换图片的UUID请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        panResult.setRespCode(1);
        panResult.setRespData(UUID.randomUUID().toString().replaceAll("-", ""));
        stopWatch.stop();
        logger.info("变换图片的UUID调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return panResult;
    }
}
