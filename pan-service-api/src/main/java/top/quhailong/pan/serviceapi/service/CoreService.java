package top.quhailong.pan.serviceapi.service;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import top.quhailong.pan.request.CheckDirWhetherRequest;
import top.quhailong.pan.request.CreateDirRequest;
import top.quhailong.pan.request.CreateVirtualAddressRequest;
import top.quhailong.pan.response.VirtualAddressDTO;
import top.quhailong.pan.utils.RestAPIResult;

public interface CoreService {
    @RequestMapping(value = "createdir", method = RequestMethod.POST)
    RestAPIResult<String> createDir(@RequestBody CreateDirRequest request);

    @RequestMapping(value = "checkdirwhether", method = RequestMethod.GET)
    RestAPIResult<Integer> checkDirWhether(CheckDirWhetherRequest request);

    @RequestMapping(value = "createvirtualaddress", method = RequestMethod.POST)
    RestAPIResult<Integer> createVirtualAddress(@RequestBody CreateVirtualAddressRequest request);

    @RequestMapping(value = "getfilenamebyvid", method = RequestMethod.GET)
    RestAPIResult<String> getFileNameByVid(@RequestParam("vid")String vid,@RequestParam("uid") String uid);

    @RequestMapping(value = "getvirtualaddress", method = RequestMethod.GET)
    RestAPIResult<VirtualAddressDTO> getVirtualaddress(@RequestParam("vid") String vid, @RequestParam("uid") String uid);

    @RequestMapping(value = "initcapacity", method = RequestMethod.POST)
    RestAPIResult<Integer> initCapacity(@RequestParam("userId")String userId);
}
