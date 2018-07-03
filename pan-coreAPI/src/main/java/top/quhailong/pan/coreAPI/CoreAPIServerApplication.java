package top.quhailong.pan.coreAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;
@Configuration
@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients(basePackages = "top.quhailong.pan.coreAPI.client")
public class CoreAPIServerApplication{
	public static void main(String[] args) {
        SpringApplication.run(CoreAPIServerApplication.class, args);
    }
}
