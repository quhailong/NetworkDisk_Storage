package top.quhailong.pan.request;
/**
 * 分享列表请求实体
 *
 * @author: quhailong
 * @date: 2019/9/26
 */
public class ShareListRequest {
    private Integer desc;
    private String order;
    private Integer page;
    private String uid;

    public Integer getDesc() {
        return desc;
    }

    public void setDesc(Integer desc) {
        this.desc = desc;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    @Override
    public String toString() {
        return "ShareListRequest{" +
                "desc=" + desc +
                ", order='" + order + '\'' +
                ", page=" + page +
                ", uid='" + uid + '\'' +
                '}';
    }
}
