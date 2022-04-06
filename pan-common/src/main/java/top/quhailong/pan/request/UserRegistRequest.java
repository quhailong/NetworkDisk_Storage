package top.quhailong.pan.request;

/**
 * 用户注册请求实体
 *
 * @author: quhailong
 * @date: 2019/9/25
 */
public class UserRegistRequest {
    private String phoneNum;
    private String username;
    private String password;
    private String verifyCode;
    private String publicKey;
    private String pid;

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getVerifyCode() {
        return verifyCode;
    }

    public void setVerifyCode(String verifyCode) {
        this.verifyCode = verifyCode;
    }

    public String getPublicKey() {
        return publicKey;
    }

    public void setPublicKey(String publicKey) {
        this.publicKey = publicKey;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    @Override
    public String toString() {
        return "UserRegistRequest{" +
                "phoneNum='" + phoneNum + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", verifyCode='" + verifyCode + '\'' +
                ", publicKey='" + publicKey + '\'' +
                ", pid='" + pid + '\'' +
                '}';
    }
}
