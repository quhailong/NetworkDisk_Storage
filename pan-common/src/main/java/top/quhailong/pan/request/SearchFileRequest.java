package top.quhailong.pan.request;

import java.io.Serializable;

/**
 * 搜索文件请求实体
 *
 * @author: quhailong
 * @date: 2019/9/24
 */
public class SearchFileRequest implements Serializable {
    private String uid;
    private String key;
    private Integer page;
    private String order;
    private Integer desc;

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
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
        return "SearchFileRequest{" +
                "uid='" + uid + '\'' +
                ", key='" + key + '\'' +
                ", page=" + page +
                ", order='" + order + '\'' +
                ", desc=" + desc +
                '}';
    }
}
