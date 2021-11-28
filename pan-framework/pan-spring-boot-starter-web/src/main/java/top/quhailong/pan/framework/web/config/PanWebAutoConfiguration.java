package top.quhailong.pan.framework.web.config;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import top.quhailong.pan.framework.web.handle.GlobalExceptionHandler;

@EnableFeignClients(basePackages = "top.*")
public class PanWebAutoConfiguration{

    @Bean
    public GlobalExceptionHandler globalExceptionHandler() {
        return new GlobalExceptionHandler();
    }
}
