package top.quhailong.pan.core.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * 核心网关
 *
 * @author: quhailong
 * @date: 2020/8/23
 */
@EnableDiscoveryClient
@SpringBootApplication
public class CoreGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(CoreGatewayApplication.class, args);
    }

}
