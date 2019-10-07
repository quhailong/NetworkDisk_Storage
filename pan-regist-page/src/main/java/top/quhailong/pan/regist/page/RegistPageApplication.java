package top.quhailong.pan.regist.page;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class RegistPageApplication {

	public static void main(String[] args) {
		SpringApplication.run(RegistPageApplication.class, args);
	}
}
