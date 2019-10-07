package top.quhailong.pan.request;
/**
 * 分享请求实体
 *
 * @author: quhailong
 * @date: 2019/9/26
 */
public class ShareRequest {
    private String expiration;
    private String flag;
    private String uid;
    private String vids;

    public String getExpiration() {
        return expiration;
    }

    public void setExpiration(String expiration) {
        this.expiration = expiration;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getVids() {
        return vids;
    }

    public void setVids(String vids) {
        this.vids = vids;
    }

    @Override
    public String toString() {
        return "ShareRequest{" +
                "expiration='" + expiration + '\'' +
                ", flag='" + flag + '\'' +
                ", uid='" + uid + '\'' +
                ", vids='" + vids + '\'' +
                '}';
    }
}
