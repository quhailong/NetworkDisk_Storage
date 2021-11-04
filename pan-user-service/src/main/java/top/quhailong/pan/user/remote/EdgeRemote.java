package top.quhailong.pan.user.remote;

import org.springframework.cloud.openfeign.FeignClient;
import top.quhailong.pan.serviceapi.service.EdgeService;

/**
 * 边缘服务API
 *
 * @author: quhailong
 * @date: 2019/9/26
 */
@FeignClient(value = "edge-service")
public interface EdgeRemote extends EdgeService {
}
