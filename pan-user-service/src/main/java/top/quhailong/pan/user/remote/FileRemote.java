package top.quhailong.pan.user.remote;

import org.springframework.cloud.openfeign.FeignClient;
import top.quhailong.pan.serviceapi.service.FileService;

/**
 * 文件调用API
 *
 * @author: quhailong
 * @date: 2019/9/26
 */
@FeignClient(value = "file-service")
public interface FileRemote extends FileService {
}
