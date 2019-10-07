package top.quhailong.pan.request;

import java.io.Serializable;

/**
 * 秒传请求实体
 *
 * @author: quhailong
 * @date: 2019/9/25
 */
public class QuickUploadFileRequest implements Serializable {
    private String fid;
    private String fileName;
    private String md5;
    private String uid;
    private String parentPath;

    public String getFid() {
        return fid;
    }

    public void setFid(String fid) {
        this.fid = fid;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getMd5() {
        return md5;
    }

    public void setMd5(String md5) {
        this.md5 = md5;
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
        return "QuickUploadFileRequest{" +
                "fid='" + fid + '\'' +
                ", fileName='" + fileName + '\'' +
                ", md5='" + md5 + '\'' +
                ", uid='" + uid + '\'' +
                ", parentPath='" + parentPath + '\'' +
                '}';
    }
}
