package top.quhailong.pan.framework.redis.core.idempotent.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import top.quhailong.pan.constant.RedisConstants;
import top.quhailong.pan.enums.ResultCodeEnum;
import top.quhailong.pan.exception.CustomException;
import top.quhailong.pan.framework.redis.core.idempotent.annotation.Idempotent;
import top.quhailong.pan.framework.redis.core.utils.RedisUtil;
import top.quhailong.pan.framework.redis.core.utils.TokenUtil;

import java.lang.reflect.Method;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * aop操作日志保存配置
 *
 * @author: quhailong
 * @date: 2020/7/26
 */
@Order(1)
@Aspect
@Slf4j
class IdempotentAopHandler {
    @Autowired
    private RedisUtil redisUtil;

    /**
     * 设置操作日志切入点 记录操作日志 在注解的位置切入代码
     */
    @Pointcut("@annotation(top.quhailong.pan.framework.redis.core.idempotent.annotation.Idempotent)")
    public void IdempotentPointCut() {
    }

    /**
     * 环绕通知，接口幂等
     *
     * @author: quhailong
     * @date: 2020/7/26
     */
    @Around("IdempotentPointCut()")
    public Object addIdempotent(ProceedingJoinPoint proceedingJoinPoint) {
        Object result = null;
        // 从切面织入点处通过反射机制获取织入点处的方法
        MethodSignature signature = (MethodSignature) proceedingJoinPoint.getSignature();
        // 获取切入点所在的方法
        Method method = signature.getMethod();
        // 获取操作
        Idempotent idempotent = method.getAnnotation(Idempotent.class);
        String uniqueIdentification = idempotent.uniqueIdentification();
        String idempotentLock = String.format(RedisConstants.IDEMPOTENT_LOCK, uniqueIdentification, TokenUtil.getToken());
        if (redisUtil.setIfAbsentEx(idempotentLock, UUID.randomUUID().toString(), 120, TimeUnit.SECONDS)) {
            try {
                result = proceedingJoinPoint.proceed();
            } catch (Throwable e) {
                log.error("业务处理出现异常", e);
                throw new CustomException(ResultCodeEnum.SERVICE_EXCEPTION.getCode(), ResultCodeEnum.SERVICE_EXCEPTION.getDesc());
            } finally {
                redisUtil.delete(idempotentLock);
            }
        } else {
            throw new CustomException(ResultCodeEnum.IDEMPOTENT_LOCK_ERROR.getCode(), ResultCodeEnum.IDEMPOTENT_LOCK_ERROR.getMessage());
        }
        return result;
    }
}