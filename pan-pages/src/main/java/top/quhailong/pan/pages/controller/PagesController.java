package top.quhailong.pan.pages.controller;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import top.quhailong.pan.pages.client.ShareClient;
import top.quhailong.pan.pages.utils.MyRedisTemplate;
import top.quhailong.pan.pojo.Share;
import top.quhailong.pan.pojo.Userinfo;
import top.quhailong.pan.utils.CookieUtils;
import top.quhailong.pan.utils.JWTUtils;
import top.quhailong.pan.utils.JsonUtils;
import top.quhailong.pan.utils.RestAPIResult;

@Controller
@CrossOrigin
public class PagesController {
	@Autowired
	private MyRedisTemplate redisTemplate;
	@Autowired
	private ShareClient shareClient;
	@RequestMapping("/")
	public String index(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String token = CookieUtils.getCookie("token");
		if (StringUtils.isEmpty(token)) {
			return "login";
		} else {
			return "redirect:http://727pan.cn/disk/home";
		}
	}

	@RequestMapping("/disk/home")
	public String home(Model model, HttpServletRequest request, HttpServletResponse response) {
		String token = CookieUtils.getCookie("token");
		if (!StringUtils.isEmpty(token)) {
			try {
				if(token.equals(redisTemplate.get("LOGOUT", "token"))) {
					return "login";
				}else {
					Claims claims = JWTUtils.parseJWT(token, "nimadetou".getBytes());
					String subject = claims.getSubject();
					Userinfo userinfo = JsonUtils.jsonToPojo(subject, Userinfo.class);
					model.addAttribute("name", userinfo.getUsername());
					return "index";
				}
			} catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException
					| IllegalArgumentException exception) {
				// TODO: handle exception
				exception.printStackTrace();
				return "login";
			}
		}
		return "login";
	}
	@RequestMapping("/share/manage")
	public String share(Model model, HttpServletRequest request, HttpServletResponse response) {
		String token = CookieUtils.getCookie("token");
		if (!StringUtils.isEmpty(token)) {
			try {
				if(token.equals(redisTemplate.get("LOGOUT", "token"))) {
					return "login";
				}else {
					Claims claims = JWTUtils.parseJWT(token, "nimadetou".getBytes());
					String subject = claims.getSubject();
					Userinfo userinfo = JsonUtils.jsonToPojo(subject, Userinfo.class);
					model.addAttribute("name", userinfo.getUsername());
					return "share";
				}
			} catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException
					| IllegalArgumentException exception) {
				// TODO: handle exception
				exception.printStackTrace();
				return "login";
			}
		}
		return "login";
	}
	@RequestMapping("/s/{shareId}")
	public String s(Model model, @PathVariable String shareId) {
		String token = CookieUtils.getCookie("token");
		if (!StringUtils.isEmpty(token)) {
			try {
				if(token.equals(redisTemplate.get("LOGOUT", "token"))) {
					return "login";
				}else {
					Claims claims = JWTUtils.parseJWT(token, "nimadetou".getBytes());
					String subject = claims.getSubject();
					Userinfo userinfo = JsonUtils.jsonToPojo(subject, Userinfo.class);
					RestAPIResult<String> result = shareClient.getShareUser(shareId);
					Map<String, Object> map = result.getRespMap();
					Userinfo userinfo2 = JsonUtils.jsonToPojo((String)map.get("userinfo"), Userinfo.class);
					if(userinfo2 == null) {
						model.addAttribute("name", userinfo.getUsername());
						return "sError";
					}else if(userinfo2.getUid().equals(userinfo.getUid())) {
						model.addAttribute("name", userinfo.getUsername());
						return "share";
					}
					Share share = JsonUtils.jsonToPojo((String)map.get("share"), Share.class);
					if(share.getExpiration()!=null && share.getExpiration().getTime()-(new Date().getTime()) < 0) {
						return "sError";
					}
					model.addAttribute("name", userinfo.getUsername());
					model.addAttribute("shareUser", userinfo2.getUsername());
					if(share.getMulti() == 1) {
						model.addAttribute("shareName", share.getTheme() + "等文件");
					}else {
						model.addAttribute("shareName", share.getTheme() + "文件");
					}
					shareClient.addShareView(shareId);
					model.addAttribute("shareId", share.getShareid());
					return "s";
				}
			} catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException
					| IllegalArgumentException exception) {
				// TODO: handle exception
				exception.printStackTrace();
				return "login";
			}
		}
		return "login";
	}
	
}
