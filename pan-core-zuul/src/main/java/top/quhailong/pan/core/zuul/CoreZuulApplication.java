package top.quhailong.pan.core.zuul;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * 登录、注册网关
 * @author 屈海龙
 *
 */
@EnableZuulProxy
@EnableDiscoveryClient
@SpringBootApplication
public class CoreZuulApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoreZuulApplication.class, args);
	}
	@Bean
    public CorsFilter corsFilter() {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); // 允许cookies跨域
        //config.addAllowedOrigin("http://regist.727pan.cn");// #允许向该服务器提交请求的URI，*表示全部允许，在SpringMVC中，如果设成*，会自动转成当前请求头中的Origin
        //config.addAllowedOrigin("http://727pan.cn");// #允许向该服务器提交请求的URI，*表示全部允许，在SpringMVC中，如果设成*，会自动转成当前请求头中的Origin
        config.addAllowedOrigin("*");// #允许向该服务器提交请求的URI，*表示全部允许，在SpringMVC中，如果设成*，会自动转成当前请求头中的Origin
        config.addAllowedHeader("*");// #允许访问的头信息,*表示全部
        config.addAllowedMethod("*");// 允许提交请求的方法，*表示全部允许
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

}
