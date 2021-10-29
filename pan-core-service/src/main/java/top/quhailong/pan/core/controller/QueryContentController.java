package top.quhailong.pan.core.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import top.quhailong.pan.core.service.IQueryContentService;
import top.quhailong.pan.request.CheckDirWhetherRequest;
import top.quhailong.pan.request.ListFileRequest;
import top.quhailong.pan.request.ListFolderRequest;
import top.quhailong.pan.request.SearchFileRequest;
import top.quhailong.pan.response.VirtualAddressDTO;
import top.quhailong.pan.utils.RestAPIResult;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

/**
 * 查询服务
 *
 * @author: quhailong
 * @date: 2019/9/24
 */
@RestController
//@RequestMapping("api")
public class QueryContentController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Resource
    private HttpServletRequest httpServletRequest;
    @Autowired
    private IQueryContentService queryContentService;

    /**
     * 查询文件列表
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    //@RequestMapping(value = "list", method = { RequestMethod.POST })
    @RequestMapping(value = "listfile", method = RequestMethod.GET)
    public RestAPIResult<String> listFile(ListFileRequest request) throws UnsupportedEncodingException {
        logger.info("查询文件列表请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("查询文件列表数据处理开始,request:{}", request);
        RestAPIResult<String> result = queryContentService.listFileHandle(request);
        logger.info("查询文件列表数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("查询文件列表调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }

    /**
     * 展示文件夹列表
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    //@RequestMapping(value = "folderList", method = {RequestMethod.POST})
    @RequestMapping(value = "listfolder", method = RequestMethod.GET)
    public RestAPIResult<String> listFolder(ListFolderRequest request) throws Exception {
        logger.info("展示文件夹列表请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("展示文件夹列表数据处理开始,request:{}", request);
        RestAPIResult<String> result = queryContentService.listFolderHandle(request);
        logger.info("展示文件夹列表数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("展示文件夹列表调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }

    /**
     * 搜索文件
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    //@RequestMapping(value = "search", method = {RequestMethod.POST})
    @RequestMapping(value = "searchfile", method = RequestMethod.GET)
    public RestAPIResult<String> searchFile(SearchFileRequest request) {
        logger.info("搜索文件请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("搜索文件数据处理开始,request:{}", request);
        RestAPIResult<String> result = queryContentService.searchFileHandle(request);
        logger.info("搜索文件数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("搜索文件调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }

    /**
     * 查询文件夹是否存在(调用)
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    @RequestMapping(value = "checkdirwhether", method = RequestMethod.GET)
    public RestAPIResult<Integer> checkDirWhether(CheckDirWhetherRequest request) {
        logger.info("查询文件夹是否存在请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("查询文件夹是否存在数据处理开始,request:{}", request);
        RestAPIResult<Integer> result = queryContentService.checkDirWhetherHandle(request);
        logger.info("查询文件夹是否存在数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("查询文件夹是否存在调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }

    /**
     * 根据虚拟地址ID获取文件名称(调用)
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    @RequestMapping(value = "getfilenamebyvid", method = RequestMethod.GET)
    public RestAPIResult<String> getFileNameByVid(String vid, String uid) {
        logger.info("根据虚拟地址ID获取文件名称请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("根据虚拟地址ID获取文件名称数据处理开始,vid:{}", vid);
        RestAPIResult<String> result = queryContentService.getFileNameByVidHandle(vid, uid);
        logger.info("根据虚拟地址ID获取文件名称数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("根据虚拟地址ID获取文件名称调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }

    /**
     * 根据虚拟地址ID获取实体
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    @RequestMapping(value = "getvirtualaddress", method = RequestMethod.GET)
    public RestAPIResult<VirtualAddressDTO> getVirtualaddress(String vid, String uid) {
        logger.info("根据虚拟地址ID获取实体请求URL：{}", httpServletRequest.getRequestURL());
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        logger.info("根据虚拟地址ID获取实体数据处理开始,vid:{}", vid);
        RestAPIResult<VirtualAddressDTO> result = queryContentService.getVirtualaddressHandle(vid, uid);
        logger.info("根据虚拟地址ID获取实体数据处理结束,result:{}", result);
        stopWatch.stop();
        logger.info("根据虚拟地址ID获取实体调用时间,millies:{}", stopWatch.getTotalTimeMillis());
        return result;
    }


}
