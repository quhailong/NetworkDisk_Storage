package top.quhailong.pan.request;

import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

/**
 * 上传文件请求实体
 *
 * @author: quhailong
 * @date: 2019/9/25
 */
public class UploadFileRequest implements Serializable {
    private String fid;
    private MultipartFile file;
    private String uid;
    private String parentPath;

    public String getFid() {
        return fid;
    }

    public void setFid(String fid) {
        this.fid = fid;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
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
        return "UploadFileRequest{" +
                "fid='" + fid + '\'' +
                ", file=" + file +
                ", uid='" + uid + '\'' +
                ", parentPath='" + parentPath + '\'' +
                '}';
    }
}
