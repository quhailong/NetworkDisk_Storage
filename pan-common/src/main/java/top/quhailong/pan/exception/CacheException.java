package top.quhailong.pan.exception;

/**
 * 缓存操作异常
 *
 * @author: quhailong
 * @date: 2019/9/25
 */
@SuppressWarnings("serial")
public class CacheException extends RuntimeException {

    private Integer code = 500;

    private Exception ex;

    public CacheException() {
        super();
    }

    public CacheException(Exception e) {
        super(e);
    }

    public CacheException(String msg) {
        super(msg);
    }

    public CacheException(int code, String msg, Exception e) {
        super(msg, e);
        this.code = code;
    }

    public CacheException(String msg, Exception e) {
        super(msg, e);
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Exception getEx() {
        return ex;
    }

    public void setEx(Exception ex) {
        this.ex = ex;
    }

    public String toString(){
        return ex.getMessage() +" ------- "+ ex.getStackTrace();
    }

}