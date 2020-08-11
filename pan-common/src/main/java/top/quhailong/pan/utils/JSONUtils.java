package top.quhailong.pan.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.alibaba.fastjson.serializer.SerializerFeature;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * JSON工具类
 *
 * @author:jingsheng.quan
 * @date:2018-08-14
 */
public class JSONUtils<T> {


    /**
     * 将String 转化为 json对象
     *
     * @param json json字符串
     */
    public static final JSONObject parseObject(String json) {
        JSONObject jsonObject = JSON.parseObject(json);
        return jsonObject;
    }

    /**
     * 将JSON字符串转化为JAVA BEAN
     *
     * @param json JSON字符串
     * @param clazz JAVA BEAN 类型
     */
    public static final <T> T parseObject(String json, Class<T> clazz) {
        T t = (T) JSON.parseObject(json, clazz);
        return t;
    }

    /**
     * 将JSON字符串转化为JSON数组
     * @param json JSON字符串
     */
    public static final JSONArray parseArray(String json) {
        JSONArray jsonArray = JSON.parseArray(json);
        return jsonArray;
    }

    /**
     * 将JSON字符串转为JAVA 集合
     * @param json JSON字符串
     * @param clazz 集合中BEAN类型
     */
    public static final <T> List<T> parseArray(String json, Class<T> clazz) {
        List<T> list = JSON.parseArray(json, clazz);
        return list;
    }

    /**
     *  将JSON 对象转化 为JSON 字符串
     * @param object JSON 对象
     */
    public static final String toJSONString(Object object) {
        String jsonStr = JSON.toJSONString(object);
        return jsonStr;
    }


    /**
     * 将JSON字符串转化为MAP对象
     * @param json JSON字符串
     */
    public static final Map<String, Object> convertJsonToMap(String json) {

        Map<String, Object> map = JSON.parseObject(json, new TypeReference<Map<String, Object>>() {
        });

        return map;
    }

    /**
     * 将JAVA对象转化为JSON字符串以及特定的时间格式
     * @param object JAVA 对象
     * @param dataFormat 日期格式
     */
    public static final String toJSONString(Object object, String dataFormat) {
        String jsonStr = JSON.toJSONStringWithDateFormat(object, dataFormat, SerializerFeature.WriteDateUseDateFormat);
        return jsonStr;
    }

    /**
     * json数组转List
     * @param search
     * @return
     */
    public  List<T> jsonToList(String search, T t){
        List<T> resultList = new ArrayList<>();
        List<Map<String,String>> listObjectFir = (List<Map<String,String>>) JSONArray.parse(search);
        for(Map<String,String> mapList : listObjectFir){
            Field[] fields = t.getClass().getFields();
            for (Field field: fields) {
                if(mapList.get(field.getName())!= null){
                    StringBuffer setMethod = new StringBuffer().append("set").append(field.getName().substring(0, 1).toUpperCase()).append(field.getName().substring(1));
                    try {
                        t.getClass().getMethod(setMethod.toString()).invoke(t);
                    } catch (IllegalAccessException e) {
                        e.printStackTrace();
                    } catch (InvocationTargetException e) {
                        e.printStackTrace();
                    } catch (NoSuchMethodException e) {
                        e.printStackTrace();
                    }
                }
            }
            resultList.add(t);
        }
        return resultList;
    }
}