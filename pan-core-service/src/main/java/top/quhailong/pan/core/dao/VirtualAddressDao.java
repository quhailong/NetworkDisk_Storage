package top.quhailong.pan.core.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import top.quhailong.pan.core.entity.VirtualAddressDO;

import java.util.List;

@Component
public interface VirtualAddressDao {
    int deleteByPrimaryKey(Integer id);

    int insert(VirtualAddressDO record);

    int insertSelective(VirtualAddressDO record);

    VirtualAddressDO selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(VirtualAddressDO record);

    int updateByPrimaryKey(VirtualAddressDO record);

    /**
     * 获取虚拟地址信息
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    List<VirtualAddressDO> listVirtualAddress(@Param("userId") String userId, @Param("parentPath") String parentPath, @Param("addrType") Integer addrType);

    /**
     * 搜索文件
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    List<VirtualAddressDO> listVirtualAddressLikeFileName(@Param("userId") String userId, @Param("fileName") String fileName);

    /**
     * 判断重名
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    Integer checkVirtualAddress(@Param("userId") String userId, @Param("parentPath") String parentPath, @Param("addrType") Integer addrType, @Param("fileName") String fileName);

    /**
     * 获取虚拟地址信息
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    VirtualAddressDO getVirtualAddress(@Param("uuid") String uuid);

    /**
     * 修改虚拟地址信息
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    Integer updateVirtualAddress(VirtualAddressDO virtualAddressDO);

    /**
     * 获取父路径相关的虚拟地址
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    List<VirtualAddressDO> listVirtualAddressLikeFilePath(@Param("userId") String userId, @Param("parentPath") String parentPath);

    /**
     * 删除虚拟地址
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    Integer removeVirtualAddress(@Param("uuid") String uuid);


    /**
     * 保存虚拟地址
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    Integer saveVirtualAddress(VirtualAddressDO virtualAddressDO);
}