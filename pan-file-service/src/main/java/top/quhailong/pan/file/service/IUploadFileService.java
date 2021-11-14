package top.quhailong.pan.file.service;

import org.springframework.web.multipart.MultipartFile;
import top.quhailong.pan.request.QuickUploadFileRequest;
import top.quhailong.pan.request.UploadFileRequest;
import top.quhailong.pan.request.base.RestAPIResultDTO;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

public interface IUploadFileService {
    /**
     * 上传文件数据处理
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    RestAPIResultDTO<String> uploadFileHandle(UploadFileRequest request) throws IOException;

    /**
     * 秒传文件数据处理
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    RestAPIResultDTO<String> quickUploadFileHandle(QuickUploadFileRequest request) throws UnsupportedEncodingException;

    /**
     * 上传文件(内部调用)数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    RestAPIResultDTO<String> uploadHandle(MultipartFile file) throws IOException;
}
