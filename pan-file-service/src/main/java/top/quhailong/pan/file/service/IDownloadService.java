package top.quhailong.pan.file.service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface IDownloadService {
    /**
     * 下载文件数据处理
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    void downloadHandle(String uid, String vids, HttpServletResponse res) throws IOException;

    /**
     * 下载分享文件数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    void downloadShareHandle(String lockPassword, String shareId, HttpServletResponse res) throws IOException;
}
