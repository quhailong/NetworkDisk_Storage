
package top.quhailong.pan.request.base;

import top.quhailong.pan.enums.ResultCodeEnum;

import java.util.Map;

/**
 * REST API接口统一响应接口实体
 *
 * @author: quhailong
 * @date: 2021/11/13
 */
public class RestAPIResultDTO<T> extends AbstractAPIResultDTO<T> {

    /**
     * 成功响应，无响应BEAN
     *
     * @author: quhailong
     * @date: 2021/11/13
     */
    public static AbstractAPIResultDTO Success() {
        AbstractAPIResultDTO abstractApiResultDTO = new AbstractAPIResultDTO<>();
        abstractApiResultDTO.setRespCode(ResultCodeEnum.SUCCESS.getCode());
        abstractApiResultDTO.setRespMsg(ResultCodeEnum.SUCCESS.getMessage());
        abstractApiResultDTO.setRespData(true);
        return abstractApiResultDTO;
    }

    /**
     * 错误响应，无响应BEAN
     *
     * @author: quhailong
     * @date: 2021/11/13
     */
    public static AbstractAPIResultDTO Error() {
        AbstractAPIResultDTO abstractApiResultDTO = new AbstractAPIResultDTO<>();
        abstractApiResultDTO.setRespCode(ResultCodeEnum.SERVICE_EXCEPTION.getCode());
        abstractApiResultDTO.setRespMsg(ResultCodeEnum.SERVICE_EXCEPTION.getDesc());
        abstractApiResultDTO.setRespData(false);
        return abstractApiResultDTO;
    }

    /**
     * 成功响应，有响应BEAN
     *
     * @author: quhailong
     * @date: 2021/11/13
     */
    public static <T> RestAPIResultDTO<T> Success(T t) {
        RestAPIResultDTO<T> restAPIResultDTO = new RestAPIResultDTO<>();
        restAPIResultDTO.setRespCode(ResultCodeEnum.SUCCESS.getCode());
        restAPIResultDTO.setRespMsg(ResultCodeEnum.SUCCESS.getDesc());
        restAPIResultDTO.setRespData(t);
        return restAPIResultDTO;
    }

    /**
     * 成功响应，有响应BEAN和消息
     *
     * @author: quhailong
     * @date: 2021/11/13
     */
    public static <T> RestAPIResultDTO<T> Success(T t, String msg) {
        RestAPIResultDTO<T> restAPIResultDTO = new RestAPIResultDTO<>();
        restAPIResultDTO.setRespCode(ResultCodeEnum.SUCCESS.getCode());
        restAPIResultDTO.setRespMsg(msg);
        restAPIResultDTO.setRespData(t);
        return restAPIResultDTO;
    }


    /**
     * 成功响应，无响应BEAN，非默认响应消息
     *
     * @author: quhailong
     * @date: 2021/11/13
     */
    public static <T> RestAPIResultDTO<T> Success(String msg) {
        RestAPIResultDTO<T> restAPIResultDTO = new RestAPIResultDTO<>();
        restAPIResultDTO.setRespCode(ResultCodeEnum.SUCCESS.getCode());
        restAPIResultDTO.setRespMsg(msg);
        restAPIResultDTO.setRespData(null);
        return restAPIResultDTO;
    }

    /**
     * 错误响应，有响应BEAN，非默认状态码及响应消息
     *
     * @author: quhailong
     * @date: 2021/11/13
     */
    public static <T> RestAPIResultDTO<T> Error(T t, ResultCodeEnum resultCodeEnum) {
        RestAPIResultDTO<T> restAPIResultDTO = new RestAPIResultDTO<>();
        restAPIResultDTO.setRespCode(resultCodeEnum.getCode());
        restAPIResultDTO.setRespMsg(resultCodeEnum.getDesc());
        restAPIResultDTO.setRespData(t);
        return restAPIResultDTO;
    }

    /**
     * 错误响应，非默认响应消息
     *
     * @author: quhailong
     * @date: 2021/11/13
     */
    public static <T> RestAPIResultDTO<T> Error(String msg) {
        RestAPIResultDTO<T> restAPIResultDTO = new RestAPIResultDTO<>();
        restAPIResultDTO.setRespCode(ResultCodeEnum.SERVICE_EXCEPTION.getCode());
        restAPIResultDTO.setRespMsg(msg);
        restAPIResultDTO.setRespData(null);
        return restAPIResultDTO;
    }

    /**
     * 错误响应，非默认响应消息
     *
     * @author: quhailong
     * @date: 2021/11/13
     */
    public static <T> RestAPIResultDTO<T> Error(String msg, Integer code) {
        RestAPIResultDTO<T> restAPIResultDTO = new RestAPIResultDTO<>();
        restAPIResultDTO.setRespCode(code);
        restAPIResultDTO.setRespMsg(msg);
        restAPIResultDTO.setRespData(null);
        return restAPIResultDTO;
    }

    /**
     * 错误响应，非默认响应消息和响应体
     *
     * @author: quhailong
     * @date: 2021/11/13
     */
    public static <T> RestAPIResultDTO<T> Error(String msg, T t, Integer code) {
        RestAPIResultDTO<T> restAPIResultDTO = new RestAPIResultDTO<>();
        restAPIResultDTO.setRespCode(code);
        restAPIResultDTO.setRespMsg(msg);
        restAPIResultDTO.setRespData(t);
        return restAPIResultDTO;
    }

    /**
     * 错误响应，有响应BEAN，非默认状态码及自定义的相应消息
     * 目前适用于接口的参数校验响应
     *
     * @author: quhailong
     * @date: 2021/11/13
     */
    public static <T> RestAPIResultDTO<T> Error(T t, Map<String, String> errorInfo, ResultCodeEnum resultCodeEnum) {
        RestAPIResultDTO<T> restAPIResultDTO = new RestAPIResultDTO<>();
        restAPIResultDTO.setRespCode(resultCodeEnum.getCode());
        StringBuilder stringBuilder = new StringBuilder();
        if (null != errorInfo && errorInfo.size() > 0) {
            for (Map.Entry<String, String> entry : errorInfo.entrySet()) {
                stringBuilder.append(entry.getValue() + "\r\n");
            }
        }
        restAPIResultDTO.setRespMsg(stringBuilder.toString());
        restAPIResultDTO.setRespData(t);
        return restAPIResultDTO;
    }

    /**
     * 判断是否调用成功
     *
     * @author: quhailong
     * @date: 2021/11/13
     */
    public static boolean isSuccess(RestAPIResultDTO restAPIResultDTO) {
        return restAPIResultDTO != null && ResultCodeEnum.SUCCESS.getCode() == restAPIResultDTO.getRespCode();
    }

    /**
     * 判断是否调用成功且返回data不为空
     *
     * @author: quhailong
     * @date: 2021/11/13
     */
    public static boolean isSuccessWithData(RestAPIResultDTO restAPIResultDTO) {
        return isSuccess(restAPIResultDTO) && restAPIResultDTO.getRespData() != null;
    }

}
