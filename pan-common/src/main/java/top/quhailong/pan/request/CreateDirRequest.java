package top.quhailong.pan.request;

import java.io.Serializable;

/**
 * 创建文件夹请求实体
 *
 * @author: quhailong
 * @date: 2019/9/24
 */
public class CreateDirRequest implements Serializable {
    private String dirName;
    private String uid;
    private String parentPath;

    public String getDirName() {
        return dirName;
    }

    public void setDirName(String dirName) {
        this.dirName = dirName;
    }

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
        return "CreateDirRequest{" +
                "dirName='" + dirName + '\'' +
                ", uid='" + uid + '\'' +
                ", parentPath='" + parentPath + '\'' +
                '}';
    }
}
