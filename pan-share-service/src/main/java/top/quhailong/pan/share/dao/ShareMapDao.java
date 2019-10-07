package top.quhailong.pan.share.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import top.quhailong.pan.share.entity.ShareMapDO;

import java.util.List;

@Component
public interface ShareMapDao {
    int deleteByPrimaryKey(Integer id);

    int insert(ShareMapDO record);

    int insertSelective(ShareMapDO record);

    ShareMapDO selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ShareMapDO record);

    int updateByPrimaryKey(ShareMapDO record);

    /**
     * 保存分享文件对应
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    Integer saveShareMap(ShareMapDO shareMapDO);

    /**
     * 根据分享ID删除分享文件对应
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    Integer removeShareMapByShareIdList(@Param("shareIdList") List<String> shareIdList);

    /**
     * 根据分享ID获取分享文件对应
     *
     * @author: quhailong
     * @date: 2019/9/26
     */
    List<ShareMapDO> listShareMapByShareId(@Param("shareId") String shareId);
}