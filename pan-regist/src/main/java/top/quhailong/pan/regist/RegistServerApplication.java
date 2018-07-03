package top.quhailong.pan.regist;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;
@Configuration
@SpringBootApplication
@MapperScan(value = "top.quhailong.pan.regist.mapper")
@EnableEurekaClient
@EnableFeignClients(basePackages = "top.quhailong.pan.regist.client")
public class RegistServerApplication extends SpringBootServletInitializer{
	public static void main(String[] args) {
        SpringApplication.run(RegistServerApplication.class, args);
    }
}
