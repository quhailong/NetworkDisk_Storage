package top.quhailong.pan.response;

import java.util.Date;

/**
 * 分享返回实体
 *
 * @author: quhailong
 * @date: 2019/9/27
 */
public class ShareDTO {

    private String shareId;

    private String theme;

    private String userId;

    private Integer lockWhether;

    private String sharePassword;

    private Integer visitCount;

    private Integer saveCount;

    private Integer downloadCount;

    private Integer multiWhether;

    private Date expiration;

    public Date getExpiration() {
        return expiration;
    }

    public void setExpiration(Date expiration) {
        this.expiration = expiration;
    }

    public String getShareId() {
        return shareId;
    }

    public void setShareId(String shareId) {
        this.shareId = shareId;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getLockWhether() {
        return lockWhether;
    }

    public void setLockWhether(Integer lockWhether) {
        this.lockWhether = lockWhether;
    }

    public String getSharePassword() {
        return sharePassword;
    }

    public void setSharePassword(String sharePassword) {
        this.sharePassword = sharePassword;
    }

    public Integer getVisitCount() {
        return visitCount;
    }

    public void setVisitCount(Integer visitCount) {
        this.visitCount = visitCount;
    }

    public Integer getSaveCount() {
        return saveCount;
    }

    public void setSaveCount(Integer saveCount) {
        this.saveCount = saveCount;
    }

    public Integer getDownloadCount() {
        return downloadCount;
    }

    public void setDownloadCount(Integer downloadCount) {
        this.downloadCount = downloadCount;
    }

    public Integer getMultiWhether() {
        return multiWhether;
    }

    public void setMultiWhether(Integer multiWhether) {
        this.multiWhether = multiWhether;
    }

    @Override
    public String toString() {
        return "ShareDTO{" +
                "shareId='" + shareId + '\'' +
                ", theme='" + theme + '\'' +
                ", userId='" + userId + '\'' +
                ", lockWhether=" + lockWhether +
                ", sharePassword='" + sharePassword + '\'' +
                ", visitCount=" + visitCount +
                ", saveCount=" + saveCount +
                ", downloadCount=" + downloadCount +
                ", multiWhether=" + multiWhether +
                ", expiration=" + expiration +
                '}';
    }
}
