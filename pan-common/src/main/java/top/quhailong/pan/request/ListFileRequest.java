package top.quhailong.pan.request;
/**
 * 文件列表请求实体
 *
 * @author: quhailong
 * @date: 2019/9/24
 */
public class ListFileRequest {
    private String type;
    private String uid;
    private String path;
    private Integer page;
    private String order;
    private Integer desc;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public Integer getDesc() {
        return desc;
    }

    public void setDesc(Integer desc) {
        this.desc = desc;
    }

    @Override
    public String toString() {
        return "ListFileRequest{" +
                "type='" + type + '\'' +
                ", uid='" + uid + '\'' +
                ", path='" + path + '\'' +
                ", page=" + page +
                ", order='" + order + '\'' +
                ", desc=" + desc +
                '}';
    }
}
