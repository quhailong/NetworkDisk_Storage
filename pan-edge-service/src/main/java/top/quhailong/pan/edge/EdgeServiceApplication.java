package top.quhailong.pan.edge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Configuration;

@Configuration
@SpringBootApplication
@EnableDiscoveryClient
public class EdgeServiceApplication extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(EdgeServiceApplication.class, args);
    }

}
