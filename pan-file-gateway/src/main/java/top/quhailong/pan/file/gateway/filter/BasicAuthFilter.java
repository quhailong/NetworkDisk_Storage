package top.quhailong.pan.file.gateway.filter;

import com.alibaba.nacos.common.codec.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

/**
 * 全局basicAuth认证，其他服务加入了springSecurity，网官转发需要携带Authorization的请求头
 *
 * @author: quhailong
 * @date: 2020/8/23
 */
@Component
@RefreshScope
public class BasicAuthFilter implements GlobalFilter, Ordered {
    @Value("${basicAuthUserName}")
    private String basicAuthUserName;
    @Value("${basicAuthPassword}")
    private String basicAuthPassword;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        ServerHttpRequest newRequest = request.mutate().header("Authorization", "Basic " + getBase64Credentials(basicAuthUserName, basicAuthPassword)).build();
        return chain.filter(exchange.mutate().request(newRequest.mutate().build()).build());
    }

    @Override
    public int getOrder() {
        return -999;
    }

    /**
     * 生成Base64凭证
     *
     * @author: quhailong
     * @date: 2020/8/23
     */
    private String getBase64Credentials(String username, String password) {
        String plainCreds = username + ":" + password;
        byte[] plainCredsBytes = plainCreds.getBytes();
        byte[] base64CredsBytes = Base64.encodeBase64(plainCredsBytes);
        return new String(base64CredsBytes);
    }
}
