package top.quhailong.pan.utils;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.*;
import redis.clients.jedis.params.SetParams;
import top.quhailong.pan.exception.CacheException;

import java.util.*;

/**
 * 缓存工具类 (集群)
 */

public class JedisClusterUtil {

    private static final Logger log = LoggerFactory.getLogger(JedisClusterUtil.class);

    private JedisCluster jedisCluster;


    public JedisClusterUtil(String cnodes, String password) {
        this.jedisCluster = getJedisClusterObj(cnodes, password);
    }


    /**
     * 判断key是否存在
     */
    public boolean isExistKey(String key) {
        try {
            return jedisCluster.exists(key);
        } catch (Exception e) {
            log.error("判断key是否存在失败, key:[{}] ", key, new CacheException(e));
        } finally {
            //jedisCluster.close();
        }

        return false;

    }

    /**
     * 计数器
     */
    public Long incr(String key, int seconds) {
        try {

            Long num = jedisCluster.incr(key);
            jedisCluster.expire(key, seconds);
            return num;
        } catch (Exception e) {
            log.error("value自增失败, key:[{}] ", key, new CacheException(e));
        } finally {
            //jedisCluster.close();
        }

        return 0L;
    }

    /**
     * 缓存value,并设置有效期
     */
    public boolean setValue(String key, String value, int seconds) {
        try {
            jedisCluster.setex(key, seconds, value);
            return true;
        } catch (Exception e) {
            log.error("Redis缓存[{}]失败, value[{}]", key, value, e);
        } finally {
            //jedisCluster.close();
        }
        return false;
    }

    /**
     * 缓存value
     *
     * @param nxxx NX|XX, NX -- Only set the key if it does not already exist. XX
     *             -- Only set the key
     */
    public boolean setValue(String key, String value, String nxxx, int seconds) {
        try {
            SetParams setParams = new SetParams();
            setParams.ex(seconds);
            String str = jedisCluster.set(key, value, setParams);
            if ("OK".equals(str)) {
                return true;
            }
        } catch (Exception e) {
            log.error("redis操作失败, key:{},value:{}", key, value, new CacheException(e));
        } finally {
            //jedisCluster.close();
        }

        return false;
    }

    /**
     * 缓存value
     */
    public boolean setValue(String key, String value) {

        return setValue(key, value, DateUtils.EXPIRE_7_DAYS);

    }

    /**
     * 设置KEY超时时间
     */
    public long expire(String key, int seconds) {
        long res = 0;
        try {
            res = jedisCluster.expire(key, seconds);
        } catch (Exception e) {
            log.error("设置超时时间失败, key:{}", key, new CacheException(e));
        } finally {
            //jedisCluster.close();
        }
        return res;
    }

    /**
     * 获取缓存Value,并转换成业务对象
     */
    public <T> T getValue(String key, Class<T> clazz) {
        try {
            String resultJson = this.getValue(key);
            return JSONUtils.parseObject(resultJson, clazz);
        } catch (Exception e) {
            log.error("JSON解析出现异常.key:{},dbindex:{}", key);
        }

        return null;

    }

    /**
     * 获取缓存Value
     */
    public String getValue(String key) {

        try {

            return jedisCluster.get(key);

        } catch (Exception e) {
            log.error("获取缓存中某个KEY的值出现异常！key：{}，异常信息：{}", key, new CacheException(e));
        } finally {
            //jedisCluster.close();
        }
        return null;
    }

    /**
     * 获取旧的Value,并且设置新的值
     */
    public String getSetValue(String key, String value) {

        try {
            return jedisCluster.getSet(key, value);
        } catch (Exception e) {
            log.error("获取缓存中某个KEY的值出现异常！key：{}，异常信息：{}", key, e);
        } finally {
            //jedisCluster.close();
        }
        return null;
    }

    /**
     * 删除缓存信息
     */
    public boolean delKey(String key) {

        try {
            jedisCluster.del(key);
            return true;
        } catch (Exception e) {
            log.error("删除缓存信息出现异常！,key:[{}]", key, new CacheException(e));
        } finally {
            //jedisCluster.close();
        }
        return false;

    }

    /**
     * 缓存Java对象
     */
    public boolean setValue(String key, Object object) {

        String jsonValue = JSONUtils.toJSONString(object);

        return this.setValue(key, jsonValue);

    }

    /**
     * 缓存Java对象
     */
    public boolean setValue(String key, Object object, int seconds) {

        String jsonValue = JSONUtils.toJSONString(object);

        return this.setValue(key, jsonValue, seconds);

    }

    /**
     * 缓存Map数据
     */
    public <K, T> boolean setHashMap(String key, Map<? extends K, ? extends T> map) {

        Map<String, String> strMap = new HashMap<String, String>();

        for (Map.Entry<? extends K, ? extends T> entry : map.entrySet()) {
            K mapKey = (K) entry.getKey();
            String mapValue = JSONUtils.toJSONString(entry.getValue());
            strMap.put(mapKey.toString(), mapValue);
        }

        try {
            jedisCluster.hmset(key, strMap);
            return true;
        } catch (Exception e) {
            log.error("缓存Map对象到缓存中出现异常,key:[{}],map:[{}]", key, map.toString(), new CacheException(e));
        } finally {
            //jedisCluster.close();
        }
        return false;
    }

    /**
     * 缓存Map数据
     */
    public boolean setStrHashMap(String key, Map<String, String> map) {

        try {
            jedisCluster.hmset(key, map);
            return true;
        } catch (Exception e) {
            log.error("缓存Map对象到缓存中出现异常,key:[{}],map:[{}]", key, map.toString(), new CacheException(e));
        } finally {
            //jedisCluster.close();
        }
        return false;
    }

    /**
     * 缓存Map单个属性值
     */
    public boolean setHashMapProp(String key, String field, String value) {
        try {
            jedisCluster.hset(key, field, value);
            return true;
        } catch (Exception e) {
            log.error("设置Map对象到缓存中出现异常！", new CacheException(e));
        } finally {
            //jedisCluster.close();
        }
        return false;
    }


    /**
     * 为字段值加上指定增量值
     */
    public long incrBy(String key, long value) {
        long res = 0;
        try {
            res = jedisCluster.incrBy(key, value);
            jedisCluster.expire(key, 7 * 24 * 3600);
        } catch (Exception e) {
            log.error("保存字段增量值异常！", new CacheException(e));
        } finally {
            //jedisCluster.close();
        }
        return res;
    }

    /**
     * 为哈希表中的字段值加上指定增量值
     */
    public long hincrBy(String key, String field, long value) {
        long res = 0;
        try {
            res = jedisCluster.hincrBy(key, field, value);
        } catch (Exception e) {
            log.error("设置Map对象到缓存中出现异常！", new CacheException(e));
        } finally {
            //jedisCluster.close();
        }
        return res;
    }

    /**
     * 获取Map中单个属性值
     */
    public String getHashMapProp(String key, String field) {

        try {
            return jedisCluster.hget(key, field);
        } catch (Exception e) {
            log.error("获取缓存中单个Map属性出现异常,key:[{}],field:[{}]", key, field, new CacheException(e));
        } finally {
            //jedisCluster.close();
        }
        return null;
    }


    /**
     * 获取Map集合数据
     */
    public Map<String, String> getStrHashMapAll(String key) {

        try {
            return jedisCluster.hgetAll(key);
        } catch (Exception e) {
            log.error("获取缓存中Map集合出现异常,key:[{}]", key, new CacheException(e));
        } finally {
            //jedisCluster.close();
        }

        return null;

    }

    /**
     * 获取Map集合数据 涉及到性能问题，不建议使用
     */
    @SuppressWarnings("unchecked")
    @Deprecated
    public <K, T> Map<K, T> getHashMapAll(String key, Class<T> clazz) {

        try {
            Map<String, String> strMap = jedisCluster.hgetAll(key);
            Map<K, T> map = new HashMap<K, T>();
            for (Map.Entry<String, String> entry : strMap.entrySet()) {
                K mapKey = (K) entry.getKey();
                T t = JSONUtils.parseObject(entry.getValue(), clazz);
                map.put(mapKey, t);
            }
            return map;
        } catch (Exception e) {
            log.error("获取缓存中Map集合出现异常,key:[{}]", key, new CacheException(e));
        } finally {
            //jedisCluster.close();
        }

        return null;

    }

    /**
     * 移除并返回list列尾元素,并转换为Java对象
     */
    public <T> T rpop(String key, Class<T> clazz) {

        try {
            String value = jedisCluster.rpop(key);
            return (T) JSONUtils.parseObject(value, clazz);
        } catch (Exception e) {
            log.error("移除list列尾元素出现异常,key:[{}],dbindex:[{}]", key, new CacheException(e));
        } finally {
            //jedisCluster.close();
        }

        return null;
    }

    /**
     * 移除并获取列表中的最后一个元素
     */
    public String rpop(String key) {

        try {
            return jedisCluster.rpop(key);
        } catch (Exception e) {
            log.error("移除list列尾元素出现异常,key:[{}],dbindex:[{}]", key, new CacheException(e));
        } finally {
            //jedisCluster.close();
        }
        return null;

    }

    /**
     * 将值插入到list列表头部
     */
    public boolean lpush(String key, String value) {

        try {
            jedisCluster.lpush(key, value);
            return true;
        } catch (Exception e) {
            log.error("将value值插入列表头部出现异常,key:[{}],value:[{}],dbindex:[{}]", key, value, new CacheException(e));
        } finally {
            //jedisCluster.close();
        }
        return false;
    }

    /**
     * 将Java 对象插入列表头部
     */
    public boolean lpush(String key, Object object) {

        return this.lpush(key, object, DateUtils.EXPIRE_7_DAYS);
    }

    /**
     * 将Java 对象插入列表头部
     */
    public boolean lpush(String key, Object object, int seconds) {

        String jsonValue = JSONUtils.toJSONString(object);
        try {
            jedisCluster.lpush(key, jsonValue);
            jedisCluster.expire(key, seconds);
            return true;
        } catch (Exception e) {
            log.error("将java对象插入列表头部出现异常,key:[{}],value:[{}],dbindex:[{}]", key, jsonValue,
                    new CacheException(e));
        } finally {
            //jedisCluster.close();
        }

        return false;
    }

    /**
     * 将Java 对象插入列表头部
     */
    public boolean lpushandsecond(String key, Object object, int seconds) {

        String jsonValue = JSONUtils.toJSONString(object);
        try {
            jedisCluster.lpush(key, jsonValue);
            jedisCluster.expire(key, seconds);
            return true;
        } catch (Exception e) {
            log.error("将java对象插入列表头部出现异常,key:[{}],value:[{}],dbindex:[{}]", key, jsonValue,
                    new CacheException(e));
        } finally {
            //jedisCluster.close();
        }

        return false;
    }

    /**
     * 移除list中与指定值相等的元素
     */
    public boolean lrem(String key, String value) {

        try {
            jedisCluster.lrem(key, 0, value);
            return true;
        } catch (Exception e) {
            log.error("移除list中与指定值相等的元素出现异常,key:[{}],value:[{}],dbindex:[{}]", key, value,
                    new CacheException(e));
        } finally {
            //jedisCluster.close();
        }

        return false;

    }

    /**
     * 获取list集合的长度
     */
    public long llen(String key) {

        try {
            return jedisCluster.llen(key);
        } catch (Exception e) {
            log.error("获取list集合的长度出现异常,key:[" + key + "]", e);
        } finally {
            //jedisCluster.close();
        }
        return -1;
    }

    /**
     * 获取list集合中所有的值
     */
    public List<String> lrange(String key) {

        try {
            return jedisCluster.lrange(key, 0, -1);
        } catch (Exception e) {
            log.error("获取list集合中所有的值出现异常,key:[{}],dbindex:[{}]", key, new CacheException(e));
        } finally {
            //jedisCluster.close();
        }

        return null;
    }

    /**
     * 从redis中获取对象值
     *
     * @param key   缓存key
     * @param clazz 返回的对象类型
     */
    public <T> T getObjectValue(String key, Class<T> clazz) {
        try {
            String value = jedisCluster.get(key);
            if (StringUtils.isBlank(value)) {
                return null;
            }
            return JSONUtils.parseObject(value, clazz);
        } catch (Exception e) {
            log.error("获取key中的值出现异常,key:[{}],dbindex:[{}]", key, new CacheException(e));
        } finally {
            //jedisCluster.close();
        }
        return null;
    }

    /**
     * 设置List集合
     */
    public void setList(String key, List<?> list, int index) {
        try {
            if (list.isEmpty()) {
                //如果list为空,则设置一个空
                jedisCluster.set(key.getBytes(), "".getBytes());
            } else {
                jedisCluster.set(key.getBytes(), SerializeUtil.serializeList(list));
            }
        } catch (Exception e) {
            log.error("获取key中的值出现异常,key:[{}],dbindex:[{}]", key, index, new CacheException(e));
        } finally {
            //jedisCluster.close();
        }
    }

    /**
     * 获取List集合
     */
    public List<?> getList(String key, int index) {
        try {
            if (!jedisCluster.exists(key)) {
                return null;
            }
            byte[] data = jedisCluster.get(key.getBytes());
            return SerializeUtil.unserializeList(data);
        } catch (Exception e) {
            log.error("获取key中的值出现异常,key:[{}],dbindex:[{}]", key, index, new CacheException(e));
        } finally {
            //jedisCluster.close();
        }
        return null;
    }

    /**
     * 从连接池中获取链接
     */
    public JedisCluster getJedisClusterObj(String clusterNodes, String password) {

        String[] serverArray = clusterNodes.split(",");
        Set<HostAndPort> nodes = new HashSet<>();
        for (String ipPort : serverArray) {
            String[] ipPortPair = ipPort.split(":");
            nodes.add(new HostAndPort(ipPortPair[0].trim(), Integer.valueOf(ipPortPair[1].trim())));

        }
        int connectionTimeout = 2000;
        int soTimeout = 2000;
        int maxAttempts = 2;
        GenericObjectPoolConfig poolConfig = new GenericObjectPoolConfig();
        JedisCluster jedisCluster = new JedisCluster(nodes, connectionTimeout, soTimeout, maxAttempts, password, poolConfig);
        return jedisCluster;
    }

    /**
     * 模糊遍历
     *
     * @param cursor
     * @param params
     * @return
     */
    public ScanResult<String> scan(String cursor, ScanParams params) {
        try {
            return jedisCluster.scan(cursor, params);
        } catch (Exception e) {
            log.info("模糊查询key出现异常,cursor:{},params:{}", cursor, params);
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 获取key o*
     *
     * @param pattern
     * @return
     */
    public TreeSet<String> getAllkeys(String pattern) {
        TreeSet<String> keys = new TreeSet<>();
        Map<String, JedisPool> clusterNodes = jedisCluster.getClusterNodes();
        for (String k : clusterNodes.keySet()) {
            JedisPool jp = clusterNodes.get(k);
            Jedis connection = jp.getResource();
            try {
                keys.addAll(connection.keys(pattern));
            } catch (Exception e) {
                log.error("回去keys出错", e);
            } finally {
                log.debug("关闭连接");
                connection.close();
            }
        }
        return keys;
    }
}
