package top.quhailong.pan.core.service;

import top.quhailong.pan.core.entity.CapacityDO;
import top.quhailong.pan.utils.JSONUtils;
import top.quhailong.pan.utils.RestAPIResult;

/**
 * 容量接口
 *
 * @author: quhailong
 * @date: 2021/10/29
 */
public interface ICapacityService {
    /**
     * 容量查询数据处理
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    RestAPIResult<String> useCapacityHandle(String uid);

    /**
     * 初始化容量数据处理
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    RestAPIResult<Integer> initCapacityHandle(String uid);
}
