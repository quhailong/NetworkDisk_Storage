package top.quhailong.pan.request;

import java.io.Serializable;

/**
 * 检查文件夹是否存在请求实体
 *
 * @author: quhailong
 * @date: 2019/9/25
 */
public class CheckDirWhetherRequest implements Serializable {
    private String uid;
    private String dirName;
    private String parentPath;

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getDirName() {
        return dirName;
    }

    public void setDirName(String dirName) {
        this.dirName = dirName;
    }

    public String getParentPath() {
        return parentPath;
    }

    public void setParentPath(String parentPath) {
        this.parentPath = parentPath;
    }

    @Override
    public String toString() {
        return "CheckDirWhetherRequest{" +
                "uid='" + uid + '\'' +
                ", dirName='" + dirName + '\'' +
                ", parentPath='" + parentPath + '\'' +
                '}';
    }
}
