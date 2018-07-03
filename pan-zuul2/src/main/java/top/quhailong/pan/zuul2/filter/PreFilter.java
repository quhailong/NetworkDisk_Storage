package top.quhailong.pan.zuul2.filter;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.http.HttpServletRequestWrapper;
import com.netflix.zuul.http.ServletInputStreamWrapper;

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
			//TODO 可将Front-app服务中的APISecurityCheck中针对accessToken的校验迁移至此，提前验证
			HttpServletRequest request = ctx.getRequest();
			String curOrigin = request.getHeader("Origin");
			log.info(String.format("%s >>> %s >>> %s", request.getMethod(), request.getRequestURI().toString(),curOrigin));
			String token = ctx.getRequest().getParameter("token");
			InputStream in = (InputStream) ctx.get("requestEntity");
			if (in == null) {
				in = ctx.getRequest().getInputStream();
			}
			if (!StringUtils.isEmpty(token)) {
				Claims claims = JWTUtils.parseJWT(token, "nimadetou".getBytes());
				String subject = claims.getSubject();
				Userinfo userinfo = JsonUtils.jsonToPojo(subject, Userinfo.class);
				String body = StreamUtils.copyToString(in, Charset.forName("UTF-8"));
				body = StringUtils.replace(body, "token=" + token, "uid=" + userinfo.getUid());
				final byte[] reqBodyBytes = body.getBytes();
				ctx.setRequest(new HttpServletRequestWrapper(request){      
				    @Override  
				    public ServletInputStream getInputStream() throws IOException {  
				      return new ServletInputStreamWrapper(reqBodyBytes);  
				    }  
				    @Override  
				    public int getContentLength() {  
				      return reqBodyBytes.length;  
				    }  
				    @Override  
				    public long getContentLengthLong() {  
				      return reqBodyBytes.length;  
				    }  
				  });
				ctx.setSendZuulResponse(true);
				return null;
			}else {
				ctx.setSendZuulResponse(false);
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
