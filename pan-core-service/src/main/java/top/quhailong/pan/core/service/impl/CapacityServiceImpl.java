package top.quhailong.pan.core.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import top.quhailong.pan.core.dao.CapacityDao;
import top.quhailong.pan.core.entity.CapacityDO;
import top.quhailong.pan.core.service.ICapacityService;
import top.quhailong.pan.utils.JSONUtils;
import top.quhailong.pan.utils.RestAPIResult;

@Service
public class CapacityServiceImpl implements ICapacityService {
    @Autowired
    private CapacityDao capacityDao;

    @Override
    public RestAPIResult<String> useCapacityHandle(String uid) {
        RestAPIResult<String> panResult = new RestAPIResult<>();
        CapacityDO capacityDO = capacityDao.getCapacity(uid);
        String useJson = JSONUtils.toJSONString(capacityDO);
        panResult.success(null);
        panResult.setRespData(useJson);
        return panResult;
    }

    @Override
    public RestAPIResult<Integer> initCapacityHandle(String uid) {
        RestAPIResult<Integer> panResult = new RestAPIResult<>();
        CapacityDO capacityDO = new CapacityDO();
        capacityDO.setUserId(uid);
        capacityDO.setTotalCapacity(5368709120L);
        capacityDO.setUsedCapacity(0L);
        Integer result = capacityDao.saveCapacity(capacityDO);
        panResult.success(result);
        return panResult;
    }
}
