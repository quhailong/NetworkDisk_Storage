package top.quhailong.pan.core.service;

import top.quhailong.pan.request.base.RestAPIResultDTO;

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
    RestAPIResultDTO<String> useCapacityHandle(String uid);

    /**
     * 初始化容量数据处理
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    RestAPIResultDTO<Integer> initCapacityHandle(String uid);
}
