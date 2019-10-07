package top.quhailong.pan.user.remote;

import org.springframework.cloud.openfeign.FeignClient;
import top.quhailong.pan.serviceapi.service.EdgeService;
import top.quhailong.pan.utils.BasicAuthConfiguration;

/**
 * 边缘服务API
 *
 * @author: quhailong
 * @date: 2019/9/26
 */
@FeignClient(value = "edge-service",configuration = BasicAuthConfiguration.class)
public interface EdgeRemote extends EdgeService {
}
