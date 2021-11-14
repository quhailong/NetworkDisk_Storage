package top.quhailong.pan.core.service;

import top.quhailong.pan.request.CheckDirWhetherRequest;
import top.quhailong.pan.request.ListFileRequest;
import top.quhailong.pan.request.ListFolderRequest;
import top.quhailong.pan.request.SearchFileRequest;
import top.quhailong.pan.response.VirtualAddressDTO;
import top.quhailong.pan.request.base.RestAPIResultDTO;

import java.io.UnsupportedEncodingException;
import java.util.Map;

public interface IQueryContentService {
    /**
     * 查询文件列表数据处理
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    RestAPIResultDTO<Map<String, Object>> listFileHandle(ListFileRequest request) throws UnsupportedEncodingException;

    /**
     * 展示文件夹数据处理
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    RestAPIResultDTO<Map<String, Object>> listFolderHandle(ListFolderRequest request) throws UnsupportedEncodingException;

    /**
     * 查找文件数据处理
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    RestAPIResultDTO<Map<String, Object>> searchFileHandle(SearchFileRequest request);

    /**
     * 查询文件夹是否存在(调用)数据处理
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    RestAPIResultDTO<Integer> checkDirWhetherHandle(CheckDirWhetherRequest request);

    /**
     * 根据虚拟地址ID获取文件名称(调用)数据处理
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    RestAPIResultDTO<String> getFileNameByVidHandle(String vid, String uid);

    /**
     * 根据多个虚拟地址ID获取文件名称级所在文件位置数据处理
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    RestAPIResultDTO<VirtualAddressDTO> getVirtualaddressHandle(String vid, String uid);
}
