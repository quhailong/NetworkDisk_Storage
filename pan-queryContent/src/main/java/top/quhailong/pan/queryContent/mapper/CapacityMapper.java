package top.quhailong.pan.queryContent.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import top.quhailong.pan.pojo.Capacity;
import top.quhailong.pan.pojo.CapacityExample;

public interface CapacityMapper {
    int countByExample(CapacityExample example);

    int deleteByExample(CapacityExample example);

    int deleteByPrimaryKey(String uid);

    int insert(Capacity record);

    int insertSelective(Capacity record);

    List<Capacity> selectByExample(CapacityExample example);

    Capacity selectByPrimaryKey(String uid);

    int updateByExampleSelective(@Param("record") Capacity record, @Param("example") CapacityExample example);

    int updateByExample(@Param("record") Capacity record, @Param("example") CapacityExample example);

    int updateByPrimaryKeySelective(Capacity record);

    int updateByPrimaryKey(Capacity record);
}