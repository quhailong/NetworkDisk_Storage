package top.quhailong.pan.edgeServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Configuration;
@Configuration
@SpringBootApplication
@EnableEurekaClient
public class EdgeServerApplication extends SpringBootServletInitializer{
	public static void main(String[] args) {
        SpringApplication.run(EdgeServerApplication.class, args);
    }
}
