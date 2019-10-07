package top.quhailong.pan.share.entity;

public class ShareMapDO {
    private Integer id;

    private String shareId;

    private String virtualAddressId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getShareId() {
        return shareId;
    }

    public void setShareId(String shareId) {
        this.shareId = shareId == null ? null : shareId.trim();
    }

    public String getVirtualAddressId() {
        return virtualAddressId;
    }

    public void setVirtualAddressId(String virtualAddressId) {
        this.virtualAddressId = virtualAddressId == null ? null : virtualAddressId.trim();
    }
}