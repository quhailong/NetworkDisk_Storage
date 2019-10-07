package top.quhailong.pan.request;

import java.io.Serializable;

/**
 * 创建虚拟地址请求实体
 *
 * @author: quhailong
 * @date: 2019/9/25
 */
public class CreateVirtualAddressRequest implements Serializable {
    private String fid;
    private String uid;
    private String fileName;
    private String md5;
    private String fileType;
    private String fileSizem;
    private String parentPath;

    public String getFid() {
        return fid;
    }

    public void setFid(String fid) {
        this.fid = fid;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
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

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getFileSizem() {
        return fileSizem;
    }

    public void setFileSizem(String fileSizem) {
        this.fileSizem = fileSizem;
    }

    public String getParentPath() {
        return parentPath;
    }

    public void setParentPath(String parentPath) {
        this.parentPath = parentPath;
    }

    @Override
    public String toString() {
        return "CreateVirtualAddressRequest{" +
                "fid='" + fid + '\'' +
                ", uid='" + uid + '\'' +
                ", fileName='" + fileName + '\'' +
                ", md5='" + md5 + '\'' +
                ", fileType='" + fileType + '\'' +
                ", fileSizem='" + fileSizem + '\'' +
                ", parentPath='" + parentPath + '\'' +
                '}';
    }
}
