package top.quhailong.pan.file.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import top.quhailong.pan.file.service.IDownloadService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 下载文件
 *
 * @author: quhailong
 * @date: 2019/9/25
 */
@RestController
public class DownloadController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Resource
    private HttpServletRequest httpServletRequest;
    @Autowired
    private IDownloadService downloadService;

    /**
     * 下载文件
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    //@RequestMapping(value = "/download", method = RequestMethod.POST)
    @RequestMapping(value = "download", method = RequestMethod.GET)
    public void download(String uid, String vids, HttpServletResponse res) throws IOException {
        logger.info("下载文件请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("下载文件数据处理开始,vids:{}", vids);
        downloadService.downloadHandle(uid, vids, res);
        logger.info("下载文件数据处理结束");
        stopWatch.stop();
        logger.info("下载文件调用时间,millies:{}", stopWatch.getTotalTimeMillis());
    }

    /**
     * 下载分享文件
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    //@RequestMapping(value = "/downloadShare", method = RequestMethod.POST)
    @RequestMapping(value = "downloadshare", method = RequestMethod.GET)
    public void downloadShare(String lockPassword, String shareId, HttpServletResponse res) throws IOException {
        logger.info("下载分享文件请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("下载分享文件数据处理开始,shareId:{}", shareId);
        downloadService.downloadShareHandle(lockPassword, shareId, res);
        logger.info("下载分享文件数据处理结束");
        stopWatch.stop();
        logger.info("下载分享文件调用时间,millies:{}", stopWatch.getTotalTimeMillis());
    }
}
