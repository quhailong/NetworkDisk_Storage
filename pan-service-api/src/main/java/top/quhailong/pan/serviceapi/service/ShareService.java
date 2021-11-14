package top.quhailong.pan.serviceapi.service;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import top.quhailong.pan.request.base.RestAPIResultDTO;

import java.util.Map;

public interface ShareService {

    @RequestMapping(value = "addsharedownload", method = {RequestMethod.POST})
    void addShareDownload(@RequestParam("shareId") String shareId);

    @RequestMapping(value = "getvinfo", method = RequestMethod.GET)
    RestAPIResultDTO<Map<String, Object>> getVinfo(@RequestParam("shareId") String shareId, @RequestParam("lockPassword") String lockPassword);
}
