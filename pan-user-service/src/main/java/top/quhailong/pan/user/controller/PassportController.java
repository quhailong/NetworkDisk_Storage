package top.quhailong.pan.user.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import top.quhailong.pan.request.base.RestAPIResultDTO;
import top.quhailong.pan.response.UserInfoDTO;
import top.quhailong.pan.user.service.PassportService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RestController
public class PassportController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Resource
    private HttpServletRequest httpServletRequest;
    @Autowired
    private PassportService passportService;

    /**
     * 登录请求
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    @RequestMapping(value = "login", method = RequestMethod.POST)
    public RestAPIResultDTO<String> login(@RequestParam("username") String username, @RequestParam("password") String password, @RequestParam("publicKey") String publicKey) throws Exception {
        logger.info("登录请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("登录数据处理开始,username:{}", username);
        RestAPIResultDTO<String> result = passportService.loginHandle(username, password, publicKey);
        logger.info("登录数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("登录调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }

    /**
     * 退出
     *
     * @param token
     * @return
     */
    @RequestMapping(value = "logout", method = RequestMethod.GET)
    public RestAPIResultDTO<String> logout(@RequestParam("token") String token) {
        logger.info("退出请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("退出数据处理开始,token:{}", token);
        RestAPIResultDTO<String> result = passportService.logoutHandle(token);
        logger.info("退出数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("退出调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }

    /**
     * 根据用户ID获取用户信息
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    @RequestMapping(value = "getuserinfo", method = RequestMethod.POST)
    public RestAPIResultDTO<UserInfoDTO> getUserInfo(@RequestParam("userId") String userId) {
        logger.info("根据用户ID获取用户信息请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("根据用户ID获取用户信息数据处理开始,userId:{}", userId);
        RestAPIResultDTO<UserInfoDTO> result = passportService.getUserInfoHandle(userId);
        logger.info("根据用户ID获取用户信息数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("根据用户ID获取用户信息调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }

}
