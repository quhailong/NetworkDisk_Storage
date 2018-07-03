package top.quhailong.pan.share.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import top.quhailong.pan.pojo.Sharemap;
import top.quhailong.pan.pojo.SharemapExample;

public interface SharemapMapper {
    int countByExample(SharemapExample example);

    int deleteByExample(SharemapExample example);

    int deleteByPrimaryKey(String mid);

    int insert(Sharemap record);

    int insertSelective(Sharemap record);

    List<Sharemap> selectByExample(SharemapExample example);

    Sharemap selectByPrimaryKey(String mid);

    int updateByExampleSelective(@Param("record") Sharemap record, @Param("example") SharemapExample example);

    int updateByExample(@Param("record") Sharemap record, @Param("example") SharemapExample example);

    int updateByPrimaryKeySelective(Sharemap record);

    int updateByPrimaryKey(Sharemap record);
}