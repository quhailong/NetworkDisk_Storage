package top.quhailong.pan.request;
/**
 * 保存分享请求实体
 *
 * @author: quhailong
 * @date: 2019/9/26
 */
public class SaveShareRequest {
    private String lockPassword;
    private String shareId;
    private String dest;
    private String uid;

    public String getLockPassword() {
        return lockPassword;
    }

    public void setLockPassword(String lockPassword) {
        this.lockPassword = lockPassword;
    }

    public String getShareId() {
        return shareId;
    }

    public void setShareId(String shareId) {
        this.shareId = shareId;
    }

    public String getDest() {
        return dest;
    }

    public void setDest(String dest) {
        this.dest = dest;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    @Override
    public String toString() {
        return "SaveShareRequest{" +
                "lockPassword='" + lockPassword + '\'' +
                ", shareId='" + shareId + '\'' +
                ", dest='" + dest + '\'' +
                ", uid='" + uid + '\'' +
                '}';
    }
}
