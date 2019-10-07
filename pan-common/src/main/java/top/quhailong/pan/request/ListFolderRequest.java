package top.quhailong.pan.request;

import java.io.Serializable;

/**
 * 文件夹列表请求实体
 *
 * @author: quhailong
 * @date: 2019/9/24
 */
public class ListFolderRequest implements Serializable {
    private String uid;
    private String parentPath;

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getParentPath() {
        return parentPath;
    }

    public void setParentPath(String parentPath) {
        this.parentPath = parentPath;
    }

    @Override
    public String toString() {
        return "ListFolderRequest{" +
                "uid='" + uid + '\'' +
                ", parentPath='" + parentPath + '\'' +
                '}';
    }
}
