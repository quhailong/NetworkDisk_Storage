package top.quhailong.pan.file.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import top.quhailong.pan.file.entity.FileDO;
@Component
public interface FileDao {
    int deleteByPrimaryKey(Integer id);

    int insert(FileDO record);

    int insertSelective(FileDO record);

    FileDO selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(FileDO record);

    int updateByPrimaryKey(FileDO record);

    /**
     * 查询md5是否已经存在
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    Integer checkMd5Whether(@Param("fileMd5") String fileMd5);

    /**
     * 根据Md5获取文件信息
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    FileDO getFileByMd5(@Param("fileMd5") String fileMd5);

    /**
     * 保存文件信息
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    Integer saveFile(FileDO fileDO);

    /**
     * 根据文件ID获取文件信息
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    FileDO getFileByFid(@Param("fileId") String fileId);
}