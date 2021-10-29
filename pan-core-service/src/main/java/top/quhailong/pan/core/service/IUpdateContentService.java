package top.quhailong.pan.core.service;

import top.quhailong.pan.request.CopyOrMoveFileRequest;
import top.quhailong.pan.request.CreateDirRequest;
import top.quhailong.pan.request.CreateVirtualAddressRequest;
import top.quhailong.pan.request.RenameFileOrDirRequest;
import top.quhailong.pan.utils.RestAPIResult;

public interface IUpdateContentService {
    /**
     * 重命名文件或文件夹数据处理
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    RestAPIResult<String> renameFileOrDirHandle(RenameFileOrDirRequest request);

    /**
     * 删除文件数据处理
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    RestAPIResult<String> deleteFileHandle(String vids);


    /**
     * 创建文件夹数据处理
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    RestAPIResult<String> createDirHandle(CreateDirRequest request);

    /**
     * 复制或移动文件数据处理
     *
     * @author: quhailong
     * @date: 2021/10/29
     */
    RestAPIResult<String> copyOrMoveFileHandle(CopyOrMoveFileRequest request);

    /**
     * 创建虚拟地址数据处理
     *
     * @author: quhailong
     * @date: 2021/10/29
     */
    RestAPIResult<Integer> createVirtualAddressHandle(CreateVirtualAddressRequest request);
}
