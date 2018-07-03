package top.quhailong.pan.share;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Configuration;
@Configuration
@SpringBootApplication
@MapperScan(value = "top.quhailong.pan.share.mapper")
@EnableEurekaClient
public class ShareApplication{
	public static void main(String[] args) {
        SpringApplication.run(ShareApplication.class, args);
    }
}
