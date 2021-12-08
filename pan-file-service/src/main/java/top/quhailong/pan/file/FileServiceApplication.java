package top.quhailong.pan.file;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(value = "top.quhailong.pan.file.dao")
public class FileServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(FileServiceApplication.class, args);
    }

    /*//Tomcat large file upload connection reset
        @Bean
        public TomcatEmbeddedServletContainerFactory tomcatEmbedded() {
            TomcatEmbeddedServletContainerFactory tomcat = new TomcatEmbeddedServletContainerFactory();
            tomcat.addConnectorCustomizers((TomcatConnectorCustomizer) connector -> {
                if ((connector.getProtocolHandler() instanceof AbstractHttp11Protocol<?>)) {
                    //-1 means unlimited
                    ((AbstractHttp11Protocol<?>) connector.getProtocolHandler()).setMaxSwallowSize(-1);
                }
            });
            return tomcat;
        }*/
	 /*@Bean
	    public CorsFilter corsFilter() {
			final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        final CorsConfiguration config = new CorsConfiguration();
	        config.setAllowCredentials(true); // 允许cookies跨域
	        config.addAllowedOrigin("*");// #允许向该服务器提交请求的URI，*表示全部允许，在SpringMVC中，如果设成*，会自动转成当前请求头中的Origin
	        config.addAllowedHeader("*");// #允许访问的头信息,*表示全部
	        config.addAllowedMethod("*");// 允许提交请求的方法，*表示全部允许
	        source.registerCorsConfiguration("/**", config);
	        return new CorsFilter(source);
	    }*/
}
