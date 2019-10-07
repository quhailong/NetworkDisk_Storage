package top.quhailong.pan.serviceapi.service;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import top.quhailong.pan.response.UserInfoDTO;
import top.quhailong.pan.utils.RestAPIResult;

public interface UserService {
    @RequestMapping(value = "getuserinfo", method = RequestMethod.POST)
    RestAPIResult<UserInfoDTO> getUserInfo(@RequestParam("userId") String userId);
}
