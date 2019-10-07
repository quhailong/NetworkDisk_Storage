package top.quhailong.pan.core.service;

import top.quhailong.pan.core.entity.VirtualAddressDO;

import java.util.List;

public interface VirtualaddressService {

    /**
     * 获取虚拟地址信息
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    List<VirtualAddressDO> listVirtualAddress(String userId, String parentPath, Integer addrType);

    /**
     * 搜索文件
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    List<VirtualAddressDO> listVirtualAddressLikeFileName(String userId, String fileName);

    /**
     * 判断重名
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    Integer checkVirtualAddress(String userId, String parentPath, Integer addrType, String fileName);

    /**
     * 获取虚拟地址信息
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    VirtualAddressDO getVirtualAddress(String uuid);

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
    List<VirtualAddressDO> listVirtualAddressLikeFilePath(String userId, String parentPath);

    /**
     * 删除虚拟地址
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    Integer removeVirtualAddress(String uuid);


    /**
     * 保存虚拟地址
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    Integer saveVirtualAddress(VirtualAddressDO virtualAddressDO);
}
