package top.quhailong.pan.core.gateway.config;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.nacos.api.NacosFactory;
import com.alibaba.nacos.api.PropertyKeyConst;
import com.alibaba.nacos.api.config.ConfigService;
import com.alibaba.nacos.api.config.listener.Listener;
import com.alibaba.nacos.api.exception.NacosException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.event.RefreshRoutesEvent;
import org.springframework.cloud.gateway.route.RouteDefinition;
import org.springframework.cloud.gateway.route.RouteDefinitionWriter;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationEventPublisherAware;
import org.springframework.context.annotation.Bean;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import top.quhailong.pan.utils.JSONUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Properties;
import java.util.concurrent.Executor;

/**
 * 动态路由配置
 *
 * @author: hailong.qu
 * @date: 2020/8/24
 */
@Component
public class DynamicRoutingConfig implements ApplicationEventPublisherAware {
    private final Logger logger = LoggerFactory.getLogger(DynamicRoutingConfig.class);
    /**
     * data-id
     */
    @Value("${gateway-route-data-id}")
    private String dataId;
    /**
     * group
     */
    @Value("${gateway-route-group}")
    private String group;
    /**
     * 服务地址
     */
    @Value("${spring.cloud.nacos.config.server-addr}")
    private String nacosServerAddr;
    /**
     * 用户名
     */
    @Value("${spring.cloud.nacos.config.username}")
    private String nacosUserName;
    /**
     * 密码
     */
    @Value("${spring.cloud.nacos.config.password}")
    private String nacosPassword;
    /**
     * 路由ID列表
     */
    private static final List<String> ROUTE_LIST = new ArrayList<>();
    private final RouteDefinitionWriter routeDefinitionWriter;

    private ApplicationEventPublisher applicationEventPublisher;

    public DynamicRoutingConfig(RouteDefinitionWriter routeDefinitionWriter) {
        this.routeDefinitionWriter = routeDefinitionWriter;
    }

    @Override
    public void setApplicationEventPublisher(@NonNull ApplicationEventPublisher applicationEventPublisher) {
        this.applicationEventPublisher = applicationEventPublisher;
    }

    /**
     * 刷新路由，开启配置文件变更监听
     *
     * @author: hailong.qu
     * @date: 2020/8/24
     */
    @Bean
    public void refreshRouting() throws NacosException {
        Properties properties = new Properties();
        properties.put(PropertyKeyConst.SERVER_ADDR, nacosServerAddr);
        properties.put(PropertyKeyConst.USERNAME, nacosUserName);
        properties.put(PropertyKeyConst.PASSWORD, nacosPassword);
        ConfigService configService = NacosFactory.createConfigService(properties);
        // 程序首次启动, 并加载初始化路由配置
        String configInfo = configService.getConfig(dataId, group, 5000);
        addAndPublishBatchRoute(configInfo);
        configService.addListener(dataId, group, new Listener() {
            @Override
            public Executor getExecutor() {
                return null;
            }

            @Override
            public void receiveConfigInfo(String configInfo) {
                addAndPublishBatchRoute(configInfo);
            }
        });
    }

    /**
     * 添加单条路由信息
     *
     * @author: hailong.qu
     * @date: 2020/9/2
     */
    private void addRoute(RouteDefinition definition) {
        routeDefinitionWriter.save(Mono.just(definition)).subscribe();
        ROUTE_LIST.add(definition.getId());
    }

    /**
     * 清空所有路由
     *
     * @author: hailong.qu
     * @date: 2020/9/2
     */
    private void clearRoute() {
        for (String id : ROUTE_LIST) {
            this.routeDefinitionWriter.delete(Mono.just(id)).subscribe();
        }
        ROUTE_LIST.clear();
    }

    /**
     * 批量添加和发布路由
     *
     * @author: hailong.qu
     * @date: 2020/9/2
     */
    private void addAndPublishBatchRoute(String configInfo) {
        if (configInfo != null && !Objects.equals(configInfo, "")) {
            try {
                boolean refreshGatewayRoute = JSONObject.parseObject(configInfo).getBoolean("refreshGatewayRoute");
                if (refreshGatewayRoute) {
                    clearRoute();
                    List<RouteDefinition> routeDefinitionList = JSONUtils.parseArray(JSONObject.parseObject(configInfo).getString("routeList"), RouteDefinition.class);
                    if (routeDefinitionList != null && routeDefinitionList.size() > 0) {
                        for (RouteDefinition routeDefinition : routeDefinitionList) {
                            addRoute(routeDefinition);
                        }
                    }
                    publish();
                    logger.info("路由更新成功");
                } else {
                    logger.info("路由未发生变更");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 发布配置
     *
     * @author: hailong.qu
     * @date: 2020/9/2
     */
    private void publish() {
        this.applicationEventPublisher.publishEvent(new RefreshRoutesEvent(this.routeDefinitionWriter));
    }
}
