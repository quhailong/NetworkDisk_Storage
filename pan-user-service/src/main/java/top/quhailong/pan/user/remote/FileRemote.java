package top.quhailong.pan.user.remote;

import org.springframework.cloud.openfeign.FeignClient;
import top.quhailong.pan.serviceapi.service.FileService;
import top.quhailong.pan.utils.BasicAuthConfiguration;

/**
 * 文件调用API
 *
 * @author: quhailong
 * @date: 2019/9/26
 */
@FeignClient(value = "file-service",configuration = BasicAuthConfiguration.class)
public interface FileRemote extends FileService {
}
