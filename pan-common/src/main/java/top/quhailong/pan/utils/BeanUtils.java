package top.quhailong.pan.utils;

import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.util.*;

/**
 * Bean 操作工具类
 *
 * @author:jingsheng.quan
 * @date:2018-08-14
 */
public class BeanUtils {
    /**
     * 对象属性赋值,忽略空值
     */
    public static void copyPropertiesIgnoreNull(Object src, Object target) {
        if (src != null) {
            org.springframework.beans.BeanUtils.copyProperties(src, target, getNullPropertyNames(src));
        }
    }

    private static String[] getNullPropertyNames(Object source) {
        BeanWrapper src = new BeanWrapperImpl(source);
        PropertyDescriptor[] pds = src.getPropertyDescriptors();
        Set<String> emptyNames = new HashSet<String>();
        for (PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null)
                emptyNames.add(pd.getName());
        }
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }

    /**
     * 将Map转换为Bean
     */
    public static <T> T mapArrayToBean(Map<String, String[]> map, Class<T> clazz) {
        if (map == null) {
            return null;
        }
        Map<String, String> params = new HashMap<String, String>();
        for (Iterator<String> iter = map.keySet().iterator(); iter.hasNext(); ) {
            String name = iter.next();
            String[] values = (String[]) map.get(name);
            String valueStr = "";
            for (int i = 0; i < values.length; i++) {
                valueStr = (i == values.length - 1) ? valueStr + values[i] : valueStr + values[i] + ",";
            }
            params.put(name, valueStr);
        }
        return BeanUtils.mapToBean(params, clazz);
    }

    /**
     * 将Map转换为Bean
     */
    public static <T> T mapToBean(Map<String, String> map, Class<T> clazz) {
        if (map == null) {
            return null;
        }
        T bean = null;
        try {
            bean = clazz.newInstance();
            org.apache.commons.beanutils.BeanUtils.populate(bean, map);
        } catch (IllegalAccessException | InvocationTargetException | InstantiationException e) {
            throw new RuntimeException();
        }
        return bean;
    }

    public static <T> T mapToBean2(Map<String, Object> map, Class<T> clazz) {
        if (map == null) {
            return null;
        }
        T bean = null;
        try {
            bean = clazz.newInstance();
            org.apache.commons.beanutils.BeanUtils.populate(bean, map);
        } catch (IllegalAccessException | InvocationTargetException | InstantiationException e) {
            throw new RuntimeException();
        }
        return bean;
    }

    /**
     * 将Bean转换为Map
     */
    public static Map<String, String> beanToMap(Object bean) {
        if (bean == null) {
            return null;
        }
        try {
            return org.apache.commons.beanutils.BeanUtils.describe(bean);
        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            throw new RuntimeException();
        }
    }
}
