package top.quhailong.pan.constant;

/**
 * redis常量
 *
 * @author: quhailong
 * @date: 2021/11/12
 */
public class RedisConstants {
    /**
     * 文件MD5，fileMd5:文件ID
     */
    public static final String FILE_MD5 = "fileMd5:%s";
    /**
     * 退出，logout:用户token
     */
    public static final String LOGOUT = "logout:%s";
    /**
     * 验证码，verfiyCode:vcodestr
     */
    public static final String VERFIYCODE = "verfiyCode:%s";
    /**
     * 注册页面uuid缓存，regist:随机id
     */
    public static final String REGIST = "regist:%s";
    /**
     * 忘记密码短信验证码，SMSForget:手机号
     */
    public static final String SMSForget = "SMSForget:%s";
    /**
     * 注册短信验证码，SMS:手机号
     */
    public static final String SMS = "SMS:%s";
}
