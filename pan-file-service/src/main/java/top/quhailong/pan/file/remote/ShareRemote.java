package top.quhailong.pan.file.remote;

import org.springframework.cloud.openfeign.FeignClient;
import top.quhailong.pan.serviceapi.service.ShareService;

@FeignClient(value = "share-service")
public interface ShareRemote extends ShareService {
}
