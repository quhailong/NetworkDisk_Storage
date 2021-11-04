package top.quhailong.pan.user.remote;

import org.springframework.cloud.openfeign.FeignClient;
import top.quhailong.pan.serviceapi.service.CoreService;

/**
 * 核心服务API
 *
 * @author: quhailong
 * @date: 2019/9/26
 */
@FeignClient(value = "core-service")
public interface CoreRemote extends CoreService {
}
