package top.quhailong.pan.serviceapi.service;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import top.quhailong.pan.response.UserInfoDTO;
import top.quhailong.pan.request.base.RestAPIResultDTO;

public interface UserService {
    @RequestMapping(value = "getuserinfo", method = RequestMethod.POST)
    RestAPIResultDTO<UserInfoDTO> getUserInfo(@RequestParam("userId") String userId);
}
