package top.quhailong.pan.request;
/**
 * 修改密码请求实体
 *
 * @author: quhailong
 * @date: 2019/9/26
 */
public class ChangePwdRequest {
    private String token;
    private String uid;
    private String newPassword;
    private String rsaKey;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getRsaKey() {
        return rsaKey;
    }

    public void setRsaKey(String rsaKey) {
        this.rsaKey = rsaKey;
    }

    @Override
    public String toString() {
        return "ChangePwdRequest{" +
                "token='" + token + '\'' +
                ", uid='" + uid + '\'' +
                ", newPassword='" + newPassword + '\'' +
                ", rsaKey='" + rsaKey + '\'' +
                '}';
    }
}
