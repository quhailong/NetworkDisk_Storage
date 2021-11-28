package top.quhailong.pan.framework.nacos.config;

import com.alibaba.cloud.nacos.ribbon.NacosRule;
import com.alibaba.nacos.api.NacosFactory;
import com.alibaba.nacos.api.config.ConfigService;
import com.alibaba.nacos.api.exception.NacosException;
import com.netflix.loadbalancer.IRule;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import java.util.Properties;

/**
 * nacos自动配置类
 *
 * @author: quhailong
 * @date: 2021/11/14
 */
@Configuration
@EnableDiscoveryClient
@Slf4j
public class PanNacosAutoConfiguration {
    /**
     * 服务地址
     */
    @Value("${spring.cloud.nacos.discovery.server-addr}")
    private String nacosServerAddr;

    /**
     * 用户名
     */
    @Value("${spring.cloud.nacos.discovery.username}")
    private String nacosUserName;

    /**
     * 密码
     */
    @Value("${spring.cloud.nacos.discovery.password}")
    private String nacosPassword;

    @Bean
    public ConfigService getConfigService() {
        ConfigService configService = null;
        Properties properties = new Properties();
        properties.put("serverAddr", nacosServerAddr);
        properties.put("username", nacosUserName);
        properties.put("password", nacosPassword);
        try {
            configService = NacosFactory.createConfigService(properties);
        } catch (NacosException e) {
            log.error("捕获异常：", e);
        }
        return configService;
    }
    /**
     * 配置nacos根据权重来负载均衡
     *
     * @author qiaok
     *
     * @since : 2021/10/12
     */
    @Bean
    @Scope(value = "prototype")
    public IRule ribbonRule() {
        return new NacosRule();
    }
}
