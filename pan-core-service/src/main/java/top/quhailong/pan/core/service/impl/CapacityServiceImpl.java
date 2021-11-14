package top.quhailong.pan.core.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.quhailong.pan.core.dao.CapacityDao;
import top.quhailong.pan.core.entity.CapacityDO;
import top.quhailong.pan.core.service.ICapacityService;
import top.quhailong.pan.request.base.RestAPIResultDTO;
import top.quhailong.pan.utils.JSONUtils;

@Service
public class CapacityServiceImpl implements ICapacityService {
    @Autowired
    private CapacityDao capacityDao;

    @Override
    public RestAPIResultDTO<String> useCapacityHandle(String uid) {
        CapacityDO capacityDO = capacityDao.getCapacity(uid);
        String useJson = JSONUtils.toJSONString(capacityDO);
        return RestAPIResultDTO.Success(useJson, "成功");
    }

    @Override
    public RestAPIResultDTO<Integer> initCapacityHandle(String uid) {
        RestAPIResultDTO<Integer> panResult = new RestAPIResultDTO<>();
        CapacityDO capacityDO = new CapacityDO();
        capacityDO.setUserId(uid);
        capacityDO.setTotalCapacity(5368709120L);
        capacityDO.setUsedCapacity(0L);
        Integer result = capacityDao.saveCapacity(capacityDO);
        return RestAPIResultDTO.Success(result, "成功");
    }
}
