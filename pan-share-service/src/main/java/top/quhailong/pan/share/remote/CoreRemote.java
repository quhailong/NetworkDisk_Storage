package top.quhailong.pan.share.remote;

import org.springframework.cloud.openfeign.FeignClient;
import top.quhailong.pan.serviceapi.service.CoreService;

@FeignClient(value = "core-service")
public interface CoreRemote extends CoreService {
}
