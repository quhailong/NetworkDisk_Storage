package top.quhailong.pan.framework.redis.core.utils;

import top.quhailong.pan.utils.CookieUtils;

public class TokenUtil {
    public static String getToken() {
        return CookieUtils.getCookie("token");
    }
}
