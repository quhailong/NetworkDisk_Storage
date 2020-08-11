package top.quhailong.pan.user.service;

import top.quhailong.pan.request.ForgetPhoneSendRequest;
import top.quhailong.pan.request.ModifyPassRequest;
import top.quhailong.pan.utils.RestAPIResult;

public interface PasswordService {
    /**
     * 忘记密码短信服务数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    RestAPIResult<String> forgetPhoneSendHandle(ForgetPhoneSendRequest request);

    /**
     * 手机号/用户名校验数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    RestAPIResult<String> checkPhoneSendHandle(String username);

    /**
     * 忘记密码的修改数据处理
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    RestAPIResult<String> modifyPassHandle(ModifyPassRequest request);
}
