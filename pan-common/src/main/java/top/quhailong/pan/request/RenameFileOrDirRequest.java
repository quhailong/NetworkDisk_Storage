package top.quhailong.pan.request;

import java.io.Serializable;

/**
 * 重命名文件或文件夹请求实体
 *
 * @author: quhailong
 * @date: 2019/9/24
 */
public class RenameFileOrDirRequest implements Serializable {
    private String uid;
    private String newName;
    private String vid;
    private String flag;

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getNewName() {
        return newName;
    }

    public void setNewName(String newName) {
        this.newName = newName;
    }

    public String getVid() {
        return vid;
    }

    public void setVid(String vid) {
        this.vid = vid;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    @Override
    public String toString() {
        return "RenameFileOrDirRequest{" +
                "uid='" + uid + '\'' +
                ", newName='" + newName + '\'' +
                ", vid='" + vid + '\'' +
                ", flag='" + flag + '\'' +
                '}';
    }
}
