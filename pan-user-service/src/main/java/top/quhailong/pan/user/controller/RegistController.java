package top.quhailong.pan.user.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import top.quhailong.pan.request.ChangePwdRequest;
import top.quhailong.pan.request.RegPhoneSendRequest;
import top.quhailong.pan.request.UserRegistRequest;
import top.quhailong.pan.user.provider.RegistProvider;
import top.quhailong.pan.utils.RestAPIResult;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Random;

/**
 * 注册服务
 *
 * @author: quhailong
 * @date: 2019/9/25
 */
@RestController
public class RegistController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Resource
    private HttpServletRequest httpServletRequest;
    @Autowired
    private RegistProvider registProvider;

    /**
     * 用户名查重
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    @RequestMapping(value = "regcheckusername", method = RequestMethod.GET)
    public RestAPIResult<String> checkUserName(@RequestParam("userName") String userName) {
        logger.info("用户名查重请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("用户名查重数据处理开始,userName:{}", userName);
        RestAPIResult<String> result = registProvider.checkUserNameHandle(userName);
        logger.info("用户名查重数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("用户名查重调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }

    /**
     * 手机号查重
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    @RequestMapping(value = "regcheckphone", method = RequestMethod.GET)
    public RestAPIResult<String> checkPhone(@RequestParam("phoneNum") String phoneNum) {
        logger.info("手机号查重请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("手机号查重数据处理开始,phoneNum:{}", phoneNum);
        RestAPIResult<String> result = registProvider.checkPhoneHandle(phoneNum);
        logger.info("手机号查重数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("手机号查重调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }

    /**
     * 用户注册
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    @RequestMapping(value = "regphone", method = RequestMethod.POST)
    public RestAPIResult<String> userRegist(@RequestBody UserRegistRequest request) throws Exception {
        logger.info("用户注册请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("用户注册数据处理开始,request:{}", request);
        RestAPIResult<String> result = registProvider.userRegistHandle(request);
        logger.info("用户注册数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("用户注册调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }

    /**
     * 注册发送短信
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    @RequestMapping(value = "regphonesend", method = RequestMethod.POST)
    public RestAPIResult<String> regPhoneSend(@RequestBody RegPhoneSendRequest request) {
        logger.info("注册发送短信请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("注册发送短信数据处理开始,request:{}", request);
        RestAPIResult<String> result = registProvider.regPhoneSendHandle(request);
        logger.info("注册发送短信数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("注册发送短信调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }

    /**
     * 修改密码
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    //@RequestMapping(value = "api/changePwd", method =  RequestMethod.POST )
    @RequestMapping(value = "changepwd", method = RequestMethod.POST)
    public RestAPIResult<String> changePwd(@RequestBody ChangePwdRequest request) {
        logger.info("修改密码请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("修改密码数据处理开始,request:{}", request);
        RestAPIResult<String> result = registProvider.changePwdHandle(request);
        logger.info("修改密码数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("修改密码调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }

    /**
     * 加载用户头像
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    //@RequestMapping(value = "api/loadImg", method = { RequestMethod.POST })
    @RequestMapping(value = "loadimg", method = RequestMethod.GET)
    public RestAPIResult<String> loadImg(@RequestParam("uid") String uid) {
        logger.info("加载用户头像请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("加载用户头像数据处理开始,uid:{}", uid);
        RestAPIResult<String> result = registProvider.loadImgHandle(uid);
        logger.info("加载用户头像数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("加载用户头像调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }

    /**
     * 上传用户头像
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    //@RequestMapping(value = "api/uploadPic", method = { RequestMethod.POST })
    @RequestMapping(value = "uploadpic", method = RequestMethod.POST)
    public RestAPIResult<String> uploadPic(@RequestParam("uid") String uid, @RequestParam("file") MultipartFile file) throws IOException {
        logger.info("上传用户头像请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("上传用户头像数据处理开始,uid:{}", uid);
        RestAPIResult<String> result = registProvider.uploadPicHandle(uid, file);
        logger.info("上传用户头像数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("上传用户头像调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }

}
