package top.quhailong.pan.response;

import java.util.Date;

/**
 * 虚拟地址返回实体
 *
 * @author: quhailong
 * @date: 2019/9/25
 */
public class VirtualAddressDTO {

    private String uuid;

    private String fileId;

    private String userId;

    private String fileName;

    private Integer addrType;

    private String fileMd5;

    private String parentPath;

    private Integer fileSize;

    private Integer dirWhether;

    private Date createTime;

    private Date updateTime;

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getFileId() {
        return fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Integer getAddrType() {
        return addrType;
    }

    public void setAddrType(Integer addrType) {
        this.addrType = addrType;
    }

    public String getFileMd5() {
        return fileMd5;
    }

    public void setFileMd5(String fileMd5) {
        this.fileMd5 = fileMd5;
    }

    public String getParentPath() {
        return parentPath;
    }

    public void setParentPath(String parentPath) {
        this.parentPath = parentPath;
    }

    public Integer getFileSize() {
        return fileSize;
    }

    public void setFileSize(Integer fileSize) {
        this.fileSize = fileSize;
    }

    public Integer getDirWhether() {
        return dirWhether;
    }

    public void setDirWhether(Integer dirWhether) {
        this.dirWhether = dirWhether;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public String toString() {
        return "VirtualAddressDTO{" +
                "uuid='" + uuid + '\'' +
                ", fileId='" + fileId + '\'' +
                ", userId='" + userId + '\'' +
                ", fileName='" + fileName + '\'' +
                ", addrType=" + addrType +
                ", fileMd5='" + fileMd5 + '\'' +
                ", parentPath='" + parentPath + '\'' +
                ", fileSize=" + fileSize +
                ", dirWhether=" + dirWhether +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                '}';
    }
}
