package top.quhailong.pan.core.zuul.filter;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import io.jsonwebtoken.Claims;
import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import top.quhailong.pan.pojo.Userinfo;
import top.quhailong.pan.utils.Base64Utils;
import top.quhailong.pan.utils.CookieUtils;
import top.quhailong.pan.utils.JSONUtils;
import top.quhailong.pan.utils.JWTUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

/**
 * token过滤器，校验token必输项方法，token不能为空
 *
 * @author guooo
 */
@Component
public class PreFilter extends ZuulFilter {

    private static Logger log = LoggerFactory.getLogger(PreFilter.class);

    /*
     * 过滤器的具体逻辑。可用很复杂，包括查sql，nosql去判断该请求到底有没有权限访问。
     *
     * @see com.netflix.zuul.IZuulFilter#run()
     */
    private String getBase64Credentials(String username, String password) {
        String plainCreds = username + ":" + password;
        byte[] plainCredsBytes = plainCreds.getBytes();
        byte[] base64CredsBytes = Base64.encodeBase64(plainCredsBytes);
        return new String(base64CredsBytes);
    }
    @Override
    public Object run() {
        RequestContext ctx = RequestContext.getCurrentContext();
        ctx.addZuulRequestHeader("Authorization","Basic " + getBase64Credentials("admin","admin123"));
        HttpServletRequest request = ctx.getRequest();
        String curOrigin = request.getHeader("Origin");
        log.info(String.format("%s >>> %s >>> %s", request.getMethod(), request.getRequestURI(), curOrigin));
        if (request.getRequestURI().contains("/api/user")) {
            if (request.getRequestURI().contains("logout") || request.getRequestURI().contains("changepwd") || request.getRequestURI().contains("loadimg") || request.getRequestURI().contains("uploadpic")) {
                verifyToken(ctx);
            }
        }
        if(request.getRequestURI().contains("/api/core")){
            verifyToken(ctx);
        }

        //---------------------------------------------------------------------------------------------------------------------------------------
            /*if (request.getRequestURI().contains("/regcheckusername") || request.getRequestURI().contains("/regcheckphone") || request.getRequestURI().contains("/getpass") || request.getRequestURI().contains("/css") || request.getRequestURI().contains("/js") || request.getRequestURI().contains("/css") || request.getRequestURI().contains("/images")) {
                ctx.setSendZuulResponse(true);
                return null;
            }
            InputStream in = (InputStream) ctx.get("requestEntity");
            if (in == null) {
                in = ctx.getRequest().getInputStream();
            }
            String token = null;
            if (request.getRequestURI().equals("/api/edge/getpublickey")) {
                ctx.setSendZuulResponse(true);
                return null;
            }
            if (!request.getRequestURI().contains("getverfyimg") && !request.getRequestURI().contains("regsmscodestr")) {
                if (!request.getContentType().contains("multipart/form-data")) {
                    token = ctx.getRequest().getParameter("token");
                } else {
                    Part part = request.getPart("token");
                    InputStream name = part.getInputStream();
                    token = StreamUtils.copyToString(name, Charset.forName("UTF-8"));
                }
            }
            if (request.getRequestURI().equals("/api/user/logout") || request.getRequestURI().equals("/api/user/changepwd") || request.getRequestURI().equals("/api/user/uploadpic") || request.getRequestURI().equals("/api/user/loadimg")) {
                Claims claims = JWTUtils.parseJWT(token, "nimadetou".getBytes());
                String subject = claims.getSubject();
                Userinfo userinfo = JsonUtils.jsonToPojo(subject, Userinfo.class);
                log.info(userinfo.getUid());
                ctx.setSendZuulResponse(true);
                return null;
            } else {
                ctx.setSendZuulResponse(true);
                return null;
            }*/
        return null;
    }

    private void verifyToken(RequestContext ctx) {
        try {
            String token = CookieUtils.getCookie("token");
            Claims claims = JWTUtils.parseJWT(token, "nimadetou".getBytes());
            String subject = claims.getSubject();
            Userinfo userinfo = JSONUtils.parseObject(subject, Userinfo.class);
            log.info(userinfo.getUid());
            ctx.setSendZuulResponse(true);
        } catch (Exception e) {
            ctx.setSendZuulResponse(false);
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
