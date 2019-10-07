package top.quhailong.pan.request;

import java.io.Serializable;

/**
 * 复制或移动文件请求实体
 *
 * @author: quhailong
 * @date: 2019/9/24
 */
public class CopyOrMoveFileRequest implements Serializable {
    private String uid;
    private String vids;
    private String dest;
    private String opera;

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getVids() {
        return vids;
    }

    public void setVids(String vids) {
        this.vids = vids;
    }

    public String getDest() {
        return dest;
    }

    public void setDest(String dest) {
        this.dest = dest;
    }

    public String getOpera() {
        return opera;
    }

    public void setOpera(String opera) {
        this.opera = opera;
    }

    @Override
    public String toString() {
        return "CopyOrMoveFileRequest{" +
                "uid='" + uid + '\'' +
                ", vids='" + vids + '\'' +
                ", dest='" + dest + '\'' +
                ", opera='" + opera + '\'' +
                '}';
    }
}
