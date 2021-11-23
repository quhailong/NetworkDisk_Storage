package top.quhailong.pan.enums;

public enum ResultCodeEnum {
    SUCCESS(1, "成功", "成功"),
    PARAMATER_ERROR(400, "参数错误", "参数错误"),
    FORBIDDEN(403, "拒绝访问", "拒绝访问"),
    UNAVAILABLE(503, "服务不可用", "连不上服务"),
    SERVICE_EXCEPTION(0, "服务错误", "服务内部异常"),
    FILE_OR_DIR_REPEAT_NAME(50000, "有重名", "文件或文件夹有重名"),
    IDEMPOTENT_LOCK_ERROR(99999, "请勿重复提交", "重复提交幂等锁");


    private int code;
    private String message;
    private String desc;

    ResultCodeEnum(int code, String message, String desc) {
        this.setCode(code);
        this.setMessage(message);
        this.setDesc(desc);
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public static String getName(Integer code) {
        for (ResultCodeEnum c : ResultCodeEnum.values()) {
            if (code.equals(c.getCode())) {
                return c.desc;
            }
        }
        return null;
    }
}
