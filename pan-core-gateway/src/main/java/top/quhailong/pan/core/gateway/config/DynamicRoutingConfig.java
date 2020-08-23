package top.quhailong.pan.core.gateway.config;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.nacos.api.NacosFactory;
import com.alibaba.nacos.api.PropertyKeyConst;
import com.alibaba.nacos.api.config.ConfigService;
import com.alibaba.nacos.api.config.listener.Listener;
import com.alibaba.nacos.api.exception.NacosException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.event.RefreshRoutesEvent;
import org.springframework.cloud.gateway.filter.FilterDefinition;
import org.springframework.cloud.gateway.handler.predicate.PredicateDefinition;
import org.springframework.cloud.gateway.route.RouteDefinition;
import org.springframework.cloud.gateway.route.RouteDefinitionWriter;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationEventPublisherAware;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;
import top.quhailong.pan.core.gateway.entity.FilterEntity;
import top.quhailong.pan.core.gateway.entity.PredicateEntity;
import top.quhailong.pan.core.gateway.entity.RouteEntity;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.Executor;
/**
 * 动态路由配置
 *
 * @author: quhailong
 * @date: 2020/8/23
 */
@Component
@RefreshScope
public class DynamicRoutingConfig implements ApplicationEventPublisherAware, CommandLineRunner {
    private final Logger logger = LoggerFactory.getLogger(DynamicRoutingConfig.class);
    @Value("${gateway-route-data-id}")
    private String dataId;
    @Value("${gateway-route-group}")
    private String group;
    @Value("${spring.cloud.nacos.config.server-addr}")
    private String nacosServerAddr;
    @Value("${spring.cloud.nacos.config.username}")
    private String nacosUserName;
    @Value("${spring.cloud.nacos.config.password}")
    private String nacosPassword;

    @Autowired
    private RouteDefinitionWriter routeDefinitionWriter;

    private ApplicationEventPublisher applicationEventPublisher;
    /**
     * 刷新路由，开启配置文件变更监听
     *
     * @author: quhailong
     * @date: 2020/8/23
     */
    @Bean
    public void refreshRouting() throws NacosException {
        Properties properties = new Properties();
        properties.put(PropertyKeyConst.SERVER_ADDR, nacosServerAddr);
        properties.put(PropertyKeyConst.USERNAME, nacosUserName);
        properties.put(PropertyKeyConst.PASSWORD, nacosPassword);
        ConfigService configService = NacosFactory.createConfigService(properties);
        configService.addListener(dataId, group, new Listener() {
            @Override
            public Executor getExecutor() {
                return null;
            }

            @Override
            public void receiveConfigInfo(String configInfo) {
                logger.info(configInfo);

                boolean refreshGatewayRoute = JSONObject.parseObject(configInfo).getBoolean("refreshGatewayRoute");

                if (refreshGatewayRoute) {
                    List<RouteEntity> list = JSON.parseArray(JSONObject.parseObject(configInfo).getString("routeList")).toJavaList(RouteEntity.class);

                    for (RouteEntity route : list) {
                        update(assembleRouteDefinition(route));
                    }
                } else {
                    logger.info("路由未发生变更");
                }


            }
        });
    }

    @Override
    public void setApplicationEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
        this.applicationEventPublisher = applicationEventPublisher;
    }

    /**
     * 更新路由
     *
     * @author: quhailong
     * @date: 2020/8/23
     */
    public void update(RouteDefinition routeDefinition) {

        try {
            this.routeDefinitionWriter.delete(Mono.just(routeDefinition.getId()));
            logger.info("路由更新成功");
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }

        try {
            routeDefinitionWriter.save(Mono.just(routeDefinition)).subscribe();
            this.applicationEventPublisher.publishEvent(new RefreshRoutesEvent(this));
            logger.info("路由更新成功");
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
    }

    public RouteDefinition assembleRouteDefinition(RouteEntity routeEntity) {

        RouteDefinition definition = new RouteDefinition();

        // ID
        definition.setId(routeEntity.getId());

        // Predicates
        List<PredicateDefinition> pdList = new ArrayList<>();
        for (PredicateEntity predicateEntity : routeEntity.getPredicates()) {
            PredicateDefinition predicateDefinition = new PredicateDefinition();
            predicateDefinition.setArgs(predicateEntity.getArgs());
            predicateDefinition.setName(predicateEntity.getName());
            pdList.add(predicateDefinition);
        }
        definition.setPredicates(pdList);

        // Filters
        List<FilterDefinition> fdList = new ArrayList<>();
        for (FilterEntity filterEntity : routeEntity.getFilters()) {
            FilterDefinition filterDefinition = new FilterDefinition();
            filterDefinition.setArgs(filterEntity.getArgs());
            filterDefinition.setName(filterEntity.getName());
            fdList.add(filterDefinition);
        }
        definition.setFilters(fdList);

        // URI
        URI uri = UriComponentsBuilder.fromUriString(routeEntity.getUri()).build().toUri();
        definition.setUri(uri);

        return definition;
    }
    /**
     * 项目启动拉取配置文件进行初始化
     *
     * @author: quhailong
     * @date: 2020/8/23
     */
    @Override
    public void run(String... args) throws Exception {
        Properties properties = new Properties();
        properties.put(PropertyKeyConst.SERVER_ADDR, nacosServerAddr);
        properties.put(PropertyKeyConst.USERNAME, nacosUserName);
        properties.put(PropertyKeyConst.PASSWORD, nacosPassword);
        ConfigService configService = NacosFactory.createConfigService(properties);
        String serviceConfig = configService.getConfig(dataId, group, 5000);
        boolean refreshGatewayRoute = JSONObject.parseObject(serviceConfig).getBoolean("refreshGatewayRoute");
        if (refreshGatewayRoute) {
            List<RouteEntity> list = JSON.parseArray(JSONObject.parseObject(serviceConfig).getString("routeList")).toJavaList(RouteEntity.class);
            for (RouteEntity route : list) {
                update(assembleRouteDefinition(route));
            }
        } else {
            logger.info("路由未发生变更");
        }
    }
}
