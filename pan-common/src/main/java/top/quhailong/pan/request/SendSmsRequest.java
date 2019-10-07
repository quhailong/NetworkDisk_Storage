package top.quhailong.pan.request;
/**
 * 发送短信请求实体
 *
 * @author: quhailong
 * @date: 2019/9/26
 */
public class SendSmsRequest {
     private String sid;
     private String token;
     private String appid;
     private String templateid;
     private String param;
     private String mobile;
     private String uid;

    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getAppid() {
        return appid;
    }

    public void setAppid(String appid) {
        this.appid = appid;
    }

    public String getTemplateid() {
        return templateid;
    }

    public void setTemplateid(String templateid) {
        this.templateid = templateid;
    }

    public String getParam() {
        return param;
    }

    public void setParam(String param) {
        this.param = param;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    @Override
    public String toString() {
        return "SendSmsRequest{" +
                "sid='" + sid + '\'' +
                ", token='" + token + '\'' +
                ", appid='" + appid + '\'' +
                ", templateid='" + templateid + '\'' +
                ", param='" + param + '\'' +
                ", mobile='" + mobile + '\'' +
                ", uid='" + uid + '\'' +
                '}';
    }
}
