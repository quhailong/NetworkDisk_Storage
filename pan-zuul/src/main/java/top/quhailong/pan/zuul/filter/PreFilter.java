package top.quhailong.pan.zuul.filter;

import java.io.InputStream;
import java.nio.charset.Charset;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

import io.jsonwebtoken.Claims;
import top.quhailong.pan.pojo.Userinfo;
import top.quhailong.pan.utils.JWTUtils;
import top.quhailong.pan.utils.JsonUtils;

/**
 * token过滤器，校验token必输项方法，token不能为空
 * 
 * @author guooo
 *
 */	
@Component
public class PreFilter extends ZuulFilter {
	
	private static Logger log = LoggerFactory.getLogger(PreFilter.class);
	/*
	 * 过滤器的具体逻辑。可用很复杂，包括查sql，nosql去判断该请求到底有没有权限访问。
	 * 
	 * @see com.netflix.zuul.IZuulFilter#run()
	 */
	@Override
	public Object run() {
		RequestContext ctx = RequestContext.getCurrentContext();
		try {
	        HttpServletRequest request = ctx.getRequest();
	        String curOrigin = request.getHeader("Origin");
	        log.info(String.format("%s >>> %s >>> %s", request.getMethod(), request.getRequestURI().toString(),curOrigin));
	        if(request.getRequestURI().toString().contains("/getpass")||request.getRequestURI().toString().contains("/css")||request.getRequestURI().toString().contains("/js")||request.getRequestURI().toString().contains("/css")||request.getRequestURI().toString().contains("/images")) {
	        	ctx.setSendZuulResponse(true);
				return null;
	        }
			InputStream in = (InputStream) ctx.get("requestEntity");
			if (in == null) {
				in = ctx.getRequest().getInputStream();
			}
			String token = null;
			if(request.getRequestURI().toString().equals("/cgi/getPublickKey")) {
				ctx.setSendZuulResponse(true);
				return null;
			}
			if(!request.getRequestURI().toString().contains("/cgi/getVerfyImg")&&!request.getRequestURI().toString().contains("/cgi/regsmscodestr")) {
				if(!request.getContentType().contains("multipart/form-data")) {
					token = ctx.getRequest().getParameter("token");
				}else {
					Part part = request.getPart("token");
					InputStream name = part.getInputStream();
					token = StreamUtils.copyToString(name, Charset.forName("UTF-8"));
				}
			}
			if (request.getRequestURI().toString().equals("/v2/api/logout") || request.getRequestURI().toString().equals("/v2/api/changePwd") || request.getRequestURI().toString().equals("/v2/api/uploadPic") || request.getRequestURI().toString().equals("/v2/api/loadImg")) {
				Claims claims = JWTUtils.parseJWT(token, "nimadetou".getBytes());
				String subject = claims.getSubject();
				Userinfo userinfo = JsonUtils.jsonToPojo(subject, Userinfo.class);
				log.info(userinfo.getUid());
				ctx.setSendZuulResponse(true);
				return null;
			}else {
				ctx.setSendZuulResponse(true);
				return null;
			}
		} catch (Exception e) {
			// TODO: handle exception
			ctx.setSendZuulResponse(false);
			return null;
		}
		
	}

	/*
	 * 这里可以写逻辑判断，是否要过滤，本文true,永远过滤。
	 * 
	 * @see com.netflix.zuul.IZuulFilter#shouldFilter()
	 */
	@Override
	public boolean shouldFilter() {
		return true;
	}

	@Override
	public int filterOrder() {
		return 0;
	}

	/*
	 * (non-Javadoc) pre：路由之前 routing：路由之时 post： 路由之后 error：发送错误调用
	 * 
	 * @see com.netflix.zuul.ZuulFilter#filterType()
	 */
	@Override
	public String filterType() {
		return "pre";
	}

}
