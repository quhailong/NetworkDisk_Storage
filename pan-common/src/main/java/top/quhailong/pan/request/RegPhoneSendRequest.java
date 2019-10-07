package top.quhailong.pan.request;

/**
 * 注册发送短信请求实体
 *
 * @author: quhailong
 * @date: 2019/9/26
 */
public class RegPhoneSendRequest {
    private String phoneNum;
    private String verfyCode;
    private String vcodestr;

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
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
        return "RegPhoneSendRequest{" +
                "phoneNum='" + phoneNum + '\'' +
                ", verfyCode='" + verfyCode + '\'' +
                ", vcodestr='" + vcodestr + '\'' +
                '}';
    }
}
