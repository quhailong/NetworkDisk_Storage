package top.quhailong.pan.share;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@SpringBootApplication
@MapperScan(value = "top.quhailong.pan.share.dao")
@EnableFeignClients
@EnableDiscoveryClient
public class ShareServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ShareServiceApplication.class, args);
    }
}
