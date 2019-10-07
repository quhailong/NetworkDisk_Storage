package top.quhailong.pan.core.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import top.quhailong.pan.core.dao.CapacityDao;
import top.quhailong.pan.core.entity.CapacityDO;
import top.quhailong.pan.core.service.CapacityService;
@Component
public class CapacityServiceImpl implements CapacityService {
    @Autowired
    private CapacityDao capacityDao;
    @Override
    public CapacityDO getCapacity(String userId) {
        return capacityDao.getCapacity(userId);
    }

    @Override
    public Integer updateCapacity(CapacityDO capacityDO) {
        return capacityDao.updateCapacity(capacityDO);
    }

    @Override
    public Integer saveCapacity(CapacityDO capacityDO) {
        return capacityDao.saveCapacity(capacityDO);
    }
}
