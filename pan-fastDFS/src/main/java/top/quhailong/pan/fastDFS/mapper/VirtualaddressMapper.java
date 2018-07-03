package top.quhailong.pan.fastDFS.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import top.quhailong.pan.pojo.Virtualaddress;
import top.quhailong.pan.pojo.VirtualaddressExample;

public interface VirtualaddressMapper {
    int countByExample(VirtualaddressExample example);

    int deleteByExample(VirtualaddressExample example);

    int deleteByPrimaryKey(String vid);

    int insert(Virtualaddress record);

    int insertSelective(Virtualaddress record);

    List<Virtualaddress> selectByExample(VirtualaddressExample example);

    Virtualaddress selectByPrimaryKey(String vid);

    int updateByExampleSelective(@Param("record") Virtualaddress record, @Param("example") VirtualaddressExample example);

    int updateByExample(@Param("record") Virtualaddress record, @Param("example") VirtualaddressExample example);

    int updateByPrimaryKeySelective(Virtualaddress record);

    int updateByPrimaryKey(Virtualaddress record);
}