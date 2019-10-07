package top.quhailong.pan.share.remote;

import org.springframework.cloud.openfeign.FeignClient;
import top.quhailong.pan.serviceapi.service.CoreService;
import top.quhailong.pan.utils.BasicAuthConfiguration;

@FeignClient(value = "core-service",configuration = BasicAuthConfiguration.class)
public interface CoreRemote extends CoreService {
}
