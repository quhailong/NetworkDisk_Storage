package top.quhailong.pan.regist.page.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import top.quhailong.pan.framework.redis.core.utils.RedisUtil;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Controller
@CrossOrigin
public class RegistPageController {
    @Autowired
    private RedisUtil redisUtil;

    /**
     * 注册页面跳转
     *
     * @author: quhailong
     * @date: 2019/9/27
     */
    @RequestMapping("/")
    public String regist(Model model) {
        String pid = UUID.randomUUID().toString();
        model.addAttribute("pid", pid);
        redisUtil.setEx("regist:" + pid, "registPid", 600, TimeUnit.SECONDS);
        return "regist";
    }

    @RequestMapping(value = "/getpass", method = RequestMethod.GET)
    public String index(Model model, HttpServletRequest request) {
        return "forgetpass";
    }

}
