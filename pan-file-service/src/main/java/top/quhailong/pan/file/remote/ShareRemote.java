package top.quhailong.pan.file.remote;

import org.springframework.cloud.openfeign.FeignClient;
import top.quhailong.pan.serviceapi.service.ShareService;
import top.quhailong.pan.utils.BasicAuthConfiguration;

@FeignClient(value = "share-service",configuration = BasicAuthConfiguration.class)
public interface ShareRemote extends ShareService {
}
