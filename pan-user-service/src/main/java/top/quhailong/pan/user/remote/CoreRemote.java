package top.quhailong.pan.user.remote;

import org.springframework.cloud.openfeign.FeignClient;
import top.quhailong.pan.serviceapi.service.CoreService;
import top.quhailong.pan.utils.BasicAuthConfiguration;

/**
 * 核心服务API
 *
 * @author: quhailong
 * @date: 2019/9/26
 */
@FeignClient(value = "core-service",configuration = BasicAuthConfiguration.class)
public interface CoreRemote extends CoreService {
}
