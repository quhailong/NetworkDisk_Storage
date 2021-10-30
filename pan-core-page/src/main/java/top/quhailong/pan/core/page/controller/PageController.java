package top.quhailong.pan.core.page.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import top.quhailong.pan.core.page.service.IPageService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@Controller
@CrossOrigin
public class PageController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Resource
    private HttpServletRequest httpServletRequest;
    @Autowired
    private IPageService pageService;

    /**
     * 首页跳转
     *
     * @author: quhailong
     * @date: 2019/9/27
     */
    @RequestMapping("/")
    public String index() {
        logger.info("首页跳转请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("首页跳转数据处理开始");
        String resultUrl = pageService.indexHandle();
        logger.info("首页跳转数据处理结束,resultUrl:{}", resultUrl);
        stopWatch.stop();
        logger.info("首页跳转调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return resultUrl;
    }

    /**
     * 跳转到主页面
     *
     * @author: quhailong
     * @date: 2019/9/27
     */
    @RequestMapping("/disk/home")
    public String home(Model model) {
        logger.info("跳转到主页面请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("跳转到主页面数据处理开始");
        String resultUrl = pageService.homeHandle(model);
        logger.info("跳转到主页面数据处理结束,resultUrl:{}", resultUrl);
        stopWatch.stop();
        logger.info("跳转到主页面调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return resultUrl;
    }

    /**
     * 跳转到分享管理页面
     *
     * @author: quhailong
     * @date: 2019/9/27
     */
    @RequestMapping("/share/manage")
    public String share(Model model) {
        logger.info("跳转到分享管理页面请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("跳转到分享管理页面数据处理开始");
        String resultUrl = pageService.shareHandle(model);
        logger.info("跳转到分享管理页面数据处理结束,resultUrl:{}", resultUrl);
        stopWatch.stop();
        logger.info("跳转到分享管理页面调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return resultUrl;
    }

    /**
     * 查看分享页面
     *
     * @author: quhailong
     * @date: 2019/9/27
     */
    @RequestMapping("/s/{shareId}")
    public String s(Model model, @PathVariable String shareId) {
        logger.info("查看分享页面请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("查看分享页面数据处理开始");
        String resultUrl = pageService.sHandle(model, shareId);
        logger.info("查看分享页面数据处理结束,resultUrl:{}", resultUrl);
        stopWatch.stop();
        logger.info("查看分享页面调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return resultUrl;
    }

}
