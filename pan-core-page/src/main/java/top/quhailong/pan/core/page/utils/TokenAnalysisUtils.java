package top.quhailong.pan.core.page.utils;

import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;
import top.quhailong.pan.response.UserInfoDTO;
import top.quhailong.pan.utils.JSONUtils;
import top.quhailong.pan.utils.JWTUtils;

/**
 * Token分析工具类
 *
 * @author: quhailong
 * @date: 2019/9/27
 */
@Component
public class TokenAnalysisUtils {
    public UserInfoDTO tokenAnalysis(String token) {
        Claims claims = JWTUtils.parseJWT(token, "nimadetou".getBytes());
        String subject = claims.getSubject();
        UserInfoDTO userInfoDTO = JSONUtils.parseObject(subject, UserInfoDTO.class);
        return userInfoDTO;
    }
}
