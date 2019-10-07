package top.quhailong.pan.request;
/**
 * 忘记密码发送短信请求实体
 *
 * @author: quhailong
 * @date: 2019/9/26
 */
public class ForgetPhoneSendRequest {
    private String username;
    private String verfyCode;
    private String vcodestr;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getVerfyCode() {
        return verfyCode;
    }

    public void setVerfyCode(String verfyCode) {
        this.verfyCode = verfyCode;
    }

    public String getVcodestr() {
        return vcodestr;
    }

    public void setVcodestr(String vcodestr) {
        this.vcodestr = vcodestr;
    }

    @Override
    public String toString() {
        return "ForgetPhoneSendRequest{" +
                "username='" + username + '\'' +
                ", verfyCode='" + verfyCode + '\'' +
                ", vcodestr='" + vcodestr + '\'' +
                '}';
    }
}
