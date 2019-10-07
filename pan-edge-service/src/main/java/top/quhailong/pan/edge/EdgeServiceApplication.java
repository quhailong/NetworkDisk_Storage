package top.quhailong.pan.edge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Configuration;
@Configuration
@SpringBootApplication
@EnableEurekaClient
public class EdgeServiceApplication extends SpringBootServletInitializer{
	public static void main(String[] args) {
        SpringApplication.run(EdgeServiceApplication.class, args);
    }

}
