package top.quhailong.pan.serviceapi.service;

import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import top.quhailong.pan.request.CheckDirWhetherRequest;
import top.quhailong.pan.request.CreateDirRequest;
import top.quhailong.pan.request.CreateVirtualAddressRequest;
import top.quhailong.pan.response.VirtualAddressDTO;
import top.quhailong.pan.request.base.RestAPIResultDTO;

import java.util.Map;

public interface CoreService {
    @RequestMapping(value = "createdir", method = RequestMethod.POST)
    RestAPIResultDTO<Map<String, Object>> createDir(@RequestBody CreateDirRequest request);

    @RequestMapping(value = "checkdirwhether", method = RequestMethod.GET)
    RestAPIResultDTO<Integer> checkDirWhether(@SpringQueryMap CheckDirWhetherRequest request);

    @RequestMapping(value = "createvirtualaddress", method = RequestMethod.POST)
    RestAPIResultDTO<Integer> createVirtualAddress(@RequestBody CreateVirtualAddressRequest request);

    @RequestMapping(value = "getfilenamebyvid", method = RequestMethod.GET)
    RestAPIResultDTO<String> getFileNameByVid(@RequestParam("vid") String vid, @RequestParam("uid") String uid);

    @RequestMapping(value = "getvirtualaddress", method = RequestMethod.GET)
    RestAPIResultDTO<VirtualAddressDTO> getVirtualaddress(@RequestParam("vid") String vid, @RequestParam("uid") String uid);

    @RequestMapping(value = "initcapacity", method = RequestMethod.POST)
    RestAPIResultDTO<Integer> initCapacity(@RequestParam("userId") String userId);
}
