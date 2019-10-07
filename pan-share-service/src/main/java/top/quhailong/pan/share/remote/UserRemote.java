package top.quhailong.pan.share.remote;

import org.springframework.cloud.openfeign.FeignClient;
import top.quhailong.pan.serviceapi.service.UserService;
import top.quhailong.pan.utils.BasicAuthConfiguration;

@FeignClient(value = "user-service",configuration = BasicAuthConfiguration.class)
public interface UserRemote extends UserService {
}
