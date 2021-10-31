package top.quhailong.pan.edge.service;

import top.quhailong.pan.utils.RestAPIResult;

import javax.servlet.http.HttpServletResponse;

public interface IEdgeService {
    /**
     * 检查密码格式数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    RestAPIResult<String> regCheckPwdHandle(String password, String RSAKey);

    /**
     * 生成公钥数据处理
     *
     * @author: quhailong
     * @date: 2021/10/31
     */
    RestAPIResult<String> getPublicKeyHandle() throws Exception;

    /**
     * 生成验证码数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    void getVerfyImgHandle(String vcodestr, HttpServletResponse response);
}
