package top.quhailong.pan.framework.redis.core.idempotent.annotation;

import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.METHOD})
@Documented
public @interface Idempotent {
    String uniqueIdentification(); // 接口唯一标识
}
