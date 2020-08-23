package top.quhailong.pan.user.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import top.quhailong.pan.utils.JedisClusterUtil;

@Configuration
@RefreshScope
public class RedisCacheConfiguration {
    Logger logger = LoggerFactory.getLogger(RedisCacheConfiguration.class);

    /*@Value("${spring.redis.host}")
    private String host;

    @Value("${spring.redis.port}")
    private int port;

    @Value("${spring.redis.timeout}")
    private int timeout;

    @Value("${spring.redis.pool.max.idle}")
    private int maxIdle;

    @Value("${spring.redis.pool.max.wait}")
    private long maxWaitMillis;*/

    @Value("${redisPassword}")
    private String password;

    @Value("${redisUrl}")
    private String nodes;


    /*public JedisPool getRedisPoolFactory() {
        logger.info("JedisPool注入成功！！");
        logger.info("redis地址：" + host + ":" + port);
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxIdle(maxIdle);
        jedisPoolConfig.setMaxWaitMillis(maxWaitMillis);
        JedisPool jedisPool = new JedisPool(jedisPoolConfig, host, port, timeout, password);
        return jedisPool;
    }*/

    @Bean
    @Primary
    @RefreshScope
    public JedisClusterUtil getJedisClusterUtil() {
        logger.info("开始初始化JedisCluster,nodes:{},password:{}！！", nodes, password);
        JedisClusterUtil jedisClusterUtil = new JedisClusterUtil(nodes, password);
        logger.info("初始化JedisCluster成功");
        return jedisClusterUtil;
    }


}
