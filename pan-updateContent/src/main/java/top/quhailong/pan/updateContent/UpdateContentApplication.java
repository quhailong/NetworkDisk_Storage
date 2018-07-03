package top.quhailong.pan.updateContent;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Configuration;
@Configuration
@SpringBootApplication
@MapperScan(value = "top.quhailong.pan.updateContent.mapper")
@EnableEurekaClient
public class UpdateContentApplication{
	public static void main(String[] args) {
        SpringApplication.run(UpdateContentApplication.class, args);
    }
}
