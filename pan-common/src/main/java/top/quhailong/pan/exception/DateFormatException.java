package top.quhailong.pan.exception;

/**
 * 日期格式化异常
 *
 * @author: quhailong
 * @date: 2019/9/25
 */
@SuppressWarnings("serial")
public class DateFormatException extends RuntimeException {

	public DateFormatException() {
		super();
	}
	
	public DateFormatException(Exception e) {
		super(e);
	}

	public DateFormatException(String msg) {
		super(msg);
	}

	public DateFormatException(String msg, Exception e) {
		super(msg, e);
	}

}
