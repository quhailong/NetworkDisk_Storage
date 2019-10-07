package top.quhailong.pan.core.provider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import top.quhailong.pan.core.entity.CapacityDO;
import top.quhailong.pan.core.service.CapacityService;
import top.quhailong.pan.utils.JSONUtils;
import top.quhailong.pan.utils.RestAPIResult;

/**
 * 容量服务数据处理
 *
 * @author: quhailong
 * @date: 2019/9/24
 */
@Component
public class CapacityProvider {
    @Autowired
    private CapacityService capacityService;

    /**
     * 容量查询数据处理
     *
     * @author: quhailong
     * @date: 2019/9/24
     */
    public RestAPIResult<String> useCapacityHandle(String uid) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        CapacityDO capacityDO = capacityService.getCapacity(uid);
        String useJson = JSONUtils.toJSONString(capacityDO);
        panResult.success(null);
        panResult.setRespData(useJson);
        return panResult;
    }

    /**
     * 初始化容量数据处理
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    public RestAPIResult<Integer> initCapacityHandle(String uid){
        RestAPIResult<Integer> panResult = new RestAPIResult<>();
        CapacityDO capacityDO = new CapacityDO();
        capacityDO.setUserId(uid);
        capacityDO.setTotalCapacity(5368709120L);
        capacityDO.setUsedCapacity(0L);
        Integer result = capacityService.saveCapacity(capacityDO);
        panResult.success(result);
        return panResult;
    }
}
