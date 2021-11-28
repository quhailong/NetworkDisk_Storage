package top.quhailong.pan.framework.web.handle;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import top.quhailong.pan.enums.ResultCodeEnum;
import top.quhailong.pan.exception.CustomException;
import top.quhailong.pan.request.base.RestAPIResultDTO;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 全局异常处理
 *
 * @author: quhailong
 * @date: 2021/11/13
 */
@RestControllerAdvice
@AllArgsConstructor
@Slf4j
public class GlobalExceptionHandler {
    /**
     * 处理自定义异常
     *
     * @author: quhailong
     * @date: 2021/11/13
     */
    @ExceptionHandler(value = CustomException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public RestAPIResultDTO customExceptionHandler(CustomException e) {
        log.error("出现异常！原因是:{}", e.getRestAPIResult().getRespMsg());
        return e.getRestAPIResult();
    }

    /**
     * 处理空指针的异常
     *
     * @param req
     * @param e
     * @return
     */
    @ExceptionHandler(value = NullPointerException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public RestAPIResultDTO<String> exceptionHandler(HttpServletRequest req, NullPointerException e) {
        log.error("发生空指针异常！原因是:", e);
        return RestAPIResultDTO.Error("发生空指针异常！");
    }


    /**
     * 处理其他异常
     *
     * @param req
     * @param e
     * @return
     */
    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public RestAPIResultDTO<String> exceptionHandler(HttpServletRequest req, Exception e) {
        log.error("未知异常！原因是:", e);
        return RestAPIResultDTO.Error(null);
    }

    /**
     * 处理参数校验异常
     *
     * @author: quhailong
     * @date: 2021/11/13
     */
    @ExceptionHandler(value = {BindException.class, MethodArgumentNotValidException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public RestAPIResultDTO<String> bindExceptionHandler(Exception e) {
        log.error("出现异常！原因是:", e);
        List<FieldError> fieldErrorList = new ArrayList<>();
        if (e instanceof BindException) {
            fieldErrorList = ((BindException) e).getFieldErrors();
        } else if (e instanceof MethodArgumentNotValidException) {
            fieldErrorList = ((MethodArgumentNotValidException) e).getBindingResult().getFieldErrors();
        }
        Map<String, String> errorMsg = new HashMap<>();
        if (fieldErrorList.size() > 0) {
            for (FieldError fieldError : fieldErrorList) {
                errorMsg.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
        }
        return RestAPIResultDTO.Error(null, errorMsg, ResultCodeEnum.PARAMATER_ERROR);
    }

}
