package top.quhailong.pan.core.gateway.filter;

import com.alibaba.fastjson.JSON;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import top.quhailong.pan.response.UserInfoDTO;
import top.quhailong.pan.utils.JSONUtils;
import top.quhailong.pan.utils.JWTUtils;
import top.quhailong.pan.utils.RestAPIResult;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

/**
 * token验证拦截器
 *
 * @author: quhailong
 * @date: 2020/8/23
 */
@Component
@RefreshScope
public class TokenFilter implements GlobalFilter, Ordered {
    @Value("${filter-url}")
    private String filterUrl;
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String uri = request.getURI().getPath();
        List<String> uriList = Arrays.asList(filterUrl.split(","));
        for (String filterUrl:uriList) {
            if(uri.contains(filterUrl)){
                return verifyToken(exchange, chain);
            }
        }
        return chain.filter(exchange);
    }

    private Mono<Void> verifyToken(ServerWebExchange exchange, GatewayFilterChain chain) {
        try {
            ServerHttpRequest request;
            HttpCookie cookie = exchange.getRequest().getCookies().getFirst("token");
            String token = cookie.getValue();
            Claims claims = JWTUtils.parseJWT(token, "nimadetou".getBytes());
            String subject = claims.getSubject();
            UserInfoDTO userinfo = JSONUtils.parseObject(subject, UserInfoDTO.class);
            String operationInfo = URLEncoder.encode(JSONUtils.toJSONString(userinfo), StandardCharsets.UTF_8.toString());
            request = exchange.getRequest().mutate().header("operationInfo", operationInfo).build();
            return chain.filter(exchange.mutate().request(request).build());
        } catch (Exception e) {
            ServerHttpResponse response = exchange.getResponse();
            response.getHeaders().add("Content-Type", "application/json;charset=UTF-8");
            RestAPIResult restAPIResult = new RestAPIResult();
            restAPIResult.error("token验证失败");
            DataBuffer dataBuffer = response.bufferFactory().wrap(JSON.toJSONString(restAPIResult).getBytes());
            return response.writeWith(Flux.just(dataBuffer));
        }
    }

    @Override
    public int getOrder() {
        return 0;
    }
}
