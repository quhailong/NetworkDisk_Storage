package top.quhailong.pan.login;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Configuration;
@Configuration
@SpringBootApplication
@MapperScan(value = "top.quhailong.pan.login.mapper")
@EnableEurekaClient
public class LoginServerApplication extends SpringBootServletInitializer{
	public static void main(String[] args) {
        SpringApplication.run(LoginServerApplication.class, args);
    }
}
