package top.quhailong.pan.queryContent;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Configuration;
@Configuration
@SpringBootApplication
@MapperScan(value = "top.quhailong.pan.queryContent.mapper")
@EnableEurekaClient
public class QueryContentApplication{
	public static void main(String[] args) {
        SpringApplication.run(QueryContentApplication.class, args);
    }
}
