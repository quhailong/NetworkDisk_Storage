package top.quhailong.pan.registPage.controller;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import top.quhailong.pan.registPage.utils.MyRedisTemplate;

@Controller
@CrossOrigin
public class RegistPagesController {
	@Autowired
	private MyRedisTemplate redisTemplate;
	@RequestMapping("/")
	public String regist(Model model,HttpServletRequest request) {
		String pid = UUID.randomUUID().toString();
		model.addAttribute("pid", pid);
		redisTemplate.setWithExpireTime("regist", pid, "registPid", 600);
		return "regist";
	}
	
}
