package top.quhailong.pan.share.remote;

import org.springframework.cloud.openfeign.FeignClient;
import top.quhailong.pan.serviceapi.service.UserService;

@FeignClient(value = "user-service")
public interface UserRemote extends UserService {
}
