package top.quhailong.pan.utils;

import top.quhailong.pan.exception.DateFormatException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;


/**
 * 时间、日期格式化
 *
 * @author:jingsheng.quan
 * @date:2018-08-14
 */
@SuppressWarnings("unused")
public class DateUtils {

    private static SimpleDateFormat dateFormat = new SimpleDateFormat();

    // 定义毫秒转换
    public static final int SECOND_MILLISECONDS = 1000;
    public static final int MINUTE_MILLISECONDS = SECOND_MILLISECONDS * 60;
    public static final int HOUR_MILLISECONDS = MINUTE_MILLISECONDS * 60;
    public static final int DAY_MILLISECONDS = HOUR_MILLISECONDS * 24;

    // 定义秒转换
    public static final int MINUTE_SECONDS = 60;
    public static final int HOUR_SECONDS = MINUTE_SECONDS * 60;
    public static final int DAY_SECONDS = HOUR_SECONDS * 24;

    // 一周的秒数
    public static final int EXPIRE_7_DAYS = DateUtils.DAY_SECONDS * 7;

    /**
     * 格式化为ISO 8601标准日期时间格式 当前格式为 “yyyy-MM-dd HH:mm:ss”
     */
    private static final String ISO_DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    /**
     * 格式化为ISO 8601标准日期时间格式 当前格式为 “yy年MM月dd日 HH时”
     */
    private static final String ISO_DATETIME_FORMAT_CN_ = "yy年MM月dd日";

    /**
     * 格式化为ISO 8601标准日期时间格式 当前格式为 “yyyy年MM月dd日 HH时mm分ss秒”
     */
    private static final String ISO_DATETIME_FORMAT_CN = "yyyy年MM月dd日 HH时";

    /**
     * 格式化为ISO 8601标准日期时间格式 当前格式为 “yyyy年MM月dd日 HH时mm分ss秒”
     */
    private static final String ISO_DATETIME_PARSE_CN = "yyyy年MM月dd日 HH时mm分";

    /**
     * 格式化为ISO 8601标准日期时间格式 当前格式为 “yyyy-MM-dd HH:mm”
     */
    private static final String DATETIME_FORMAT = "yyyy-MM-dd HH:mm";

    /**
     * 格式化为ISO 8601标准日期格式 当前格式为 “yyyy-MM-dd”
     */
    private static final String ISO_DATE_FORMAT = "yyyy-MM-dd";

    /**
     * 格式化为ISO 8601标准时间格式 当前格式为 “HH:mm”
     */
    private static final String ISO_TIME_FORMAT = "HH:mm";

    /**
     * 格式化为ISO 8601标准时间格式 当前格式为 “HH:mm:ss”
     */
    private static final String ISO_TIMEHHSSMM_FORMAT = "HH:mm:ss";

    /**
     * 格式化为ISO 8601标准时间格式 当前格式为 “MMddHHmmss”
     */
    private static final String ISO_TIMEMMddHHMMSS_FORMAT = "MMddHHmmss";

    /**
     * 携程的时间格式
     */
    private static final String REGEX_yyyyMMddHHmmss = "yyyyMMddHHmmss";

    /**
     * 时间格式2
     */
    private static final String REGEX_yyyyMMddHHmm = "yyyyMMddHHmm";

    /**
     * 时间格式3
     */
    private static final String WECHAT_yyyyMMdd = "yyyyMMdd";
    /**
     * 时间格式4
     */
    private static final String ALIPAY_yyyy_MM_dd = "yyyy-MM-dd";

    /**
     * 时间格式5
     */
    private static final String ANXINJIE_yyyyMMddHHmmss = "yyyyMMddHHmmss";


    /**
     * 将文本类型时间转换成标准的日期时间格式 当前使用格式为：yyyy-MM-dd HH:mm:ss
     *
     * @param: text yyyy_MM_dd_HHmmss
     */
    public synchronized static Date yyyy_MM_dd_HHmmss(String text) {
        try {
            dateFormat.applyPattern(DateUtils.ISO_DATETIME_FORMAT);
            return dateFormat.parse(text);
        } catch (ParseException e) {
            throw new DateFormatException(e);
        }

    }

    /**
     * 将文本类型时间转换成标准的日期时间格式 当前使用格式为：yyyy-MM-dd HH:mm:ss
     *
     * @param text 待转换的时间文本 不能为空
     * @return Date 转换后的标准时间格式
     */
    public synchronized static Date yyyy_MM_dd_HHmm(String text) {
        try {
            dateFormat.applyPattern(DateUtils.DATETIME_FORMAT);
            return dateFormat.parse(text);
        } catch (ParseException e) {
            throw new DateFormatException(e);
        }

    }

    /**
     * 将文本类型时间转换成标准的中文日期时间格式
     * <p>
     * 当前使用格式为：yyyy年MM月dd日 HH时mm分ss秒
     *
     * @param parseDate
     * @return String
     */
    public synchronized static String yyyy_MM_dd_HHmm_CN(Date parseDate) {
        dateFormat.applyPattern(DateUtils.ISO_DATETIME_FORMAT_CN);
        return dateFormat.format(parseDate);

    }

    /**
     * 将文本类型时间转换成标准的中文日期时间格式
     * <p>
     * 当前使用格式为：yyyy年MM月dd日 HH时mm分ss秒
     *
     * @param dateText
     * @param dateText
     * @return Date date
     * @author CHEHAUNBO
     * @since 2017年5月11日
     */
    public synchronized static Date yyyy_MM_dd_HHmm_CN(String dateText) {
        dateFormat.applyPattern(DateUtils.ISO_DATETIME_PARSE_CN);
        try {
            return dateFormat.parse(dateText);
        } catch (ParseException e) {
            throw new DateFormatException(e);
        }

    }

    /**
     * 将当前系统日期时间转换成指定格式的文本类型日期时间(yyyy-MM-dd HH:mm:ss)
     *
     * @return String
     */
    public synchronized static String yyyy_MM_dd_HHmmss() {
        try {
            dateFormat.applyPattern(DateUtils.ISO_DATETIME_FORMAT);
            return dateFormat.format(new Date());
        } catch (Exception e) {
            throw new DateFormatException(e);
        }

    }

    /**
     * 将当前系统日期时间转换成指定格式的文本类型日期时间(yyyy-MM-dd HH:mm:ss)
     */
    public synchronized static String yyyy_MM_dd_HHmmss(Date date) {

        dateFormat.applyPattern(DateUtils.ISO_DATETIME_FORMAT);
        return dateFormat.format(date);

    }

    /**
     * 将当前系统日期时间转换成指定格式的文本类型日期时间(yyyy-MM-dd)
     */
    public synchronized static String yyyy_MM_dd(Long timeStamp) {
        dateFormat.applyPattern(DateUtils.ISO_DATE_FORMAT);
        return dateFormat.format(timeStamp);

    }

    /**
     * 将传入的时间格式化（yyyyMMdd）
     *
     * @param date
     */
    public synchronized static String yyyyMMdd(Date date) {

        dateFormat.applyPattern(DateUtils.WECHAT_yyyyMMdd);
        return dateFormat.format(date);

    }

    /**
     * 将传入的时间格式化（yyyy_MM_dd）
     *
     * @param date
     */
    public synchronized static String yyyy_MM_dd(Date date) {
        dateFormat.applyPattern(DateUtils.ALIPAY_yyyy_MM_dd);
        return dateFormat.format(date);

    }

    /**
     * 将当前系统日期时间转换成指定格式的文本类型日期时间(yy年MM月dd日)
     *
     * @param date 时间
     * @return String
     */
    public synchronized static String yy_MM_dd_HHmmss(Date date) {
        dateFormat.applyPattern(DateUtils.ISO_DATETIME_FORMAT_CN_);
        return dateFormat.format(date);
    }

    /**
     * 将当前系统日期时间转换成指定格式的文本类型日期时间(yyyy-MM-dd HH:mm)
     *
     * @param date 时间
     */
    public synchronized static String yyyy_MM_dd_HHmm(Date date) {
        dateFormat.applyPattern(DateUtils.DATETIME_FORMAT);
        return dateFormat.format(date);
    }

    /**
     * 把指定时间转化为时分秒格式
     *
     * @param date 时间
     */
    public synchronized static String HHmmSS(Date date) {
        dateFormat.applyPattern(DateUtils.ISO_TIMEHHSSMM_FORMAT);
        return dateFormat.format(date);
    }

    /**
     * 将当前系统日期转换成指定格式的文本类型日期(yyyy-MM-dd)
     *
     * @return String 转换后的文本类型的系统日期
     */
    public synchronized static String yyyy_MM_dd() {
        dateFormat.applyPattern(DateUtils.ISO_DATE_FORMAT);
        return dateFormat.format(new Date());
    }

    /**
     * 将当前系统日期转换成指定格式的文本类型日期(yyyyMMddHHmmss)
     */
    public synchronized static String yyyyMMddHHmmss() {
        dateFormat.applyPattern(DateUtils.REGEX_yyyyMMddHHmmss);
        return dateFormat.format(new Date());
    }

    /**
     * 将日期转换为指定格式
     */
    public synchronized static Date yyyy_MM_ddDate(Date date) {
        dateFormat.applyPattern(DateUtils.ISO_DATE_FORMAT);
        try {
            return dateFormat.parse(dateFormat.format(date));
        } catch (ParseException e) {
            throw new DateFormatException(e);
        }
    }

    /**
     * 将文本类型时间转换成标准时间(HH:mm)
     *
     * @param text 待转换的文本时间 不能为空
     * @return Date 转换后的标准时间
     */
    public synchronized static Date HHmm(String text) {
        dateFormat.applyPattern(DateUtils.ISO_TIME_FORMAT);
        try {
            return dateFormat.parse(text);
        } catch (ParseException e) {
            throw new DateFormatException(e);
        }
    }

    /**
     * 将文本类型日期转换成标准日期(yyyy-MM-dd)
     *
     * @param text
     */
    public synchronized static String yyyy_Year_MM_Month_dd(String text) {
        try {
            dateFormat.applyPattern("yyyy-MM-dd");
            return dateFormat.format(dateFormat.parse(text));
        } catch (ParseException e) {
            throw new DateFormatException(e);
        }
    }

    /**
     * 获取系统当前时间戳
     *
     * @return long 获取到的当前系统时间戳
     */
    public synchronized static Long getTimeInMillis() {
        return Calendar.getInstance().getTimeInMillis();
    }

    /**
     * 获取指定时间的时间戳
     *
     * @param date
     */
    public synchronized static Long getTimeInMillisByTime(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        long timestamp = cal.getTimeInMillis();
        return timestamp;
    }

    /**
     * 获取指定时间的时间戳
     *
     * @param date
     */
    public synchronized static Long getTimeInMillisByTime(String date) {
        Date date1 = yyyy_MM_dd_HHmmss(date);
        Calendar cal = Calendar.getInstance();
        cal.setTime(date1);
        long timestamp = cal.getTimeInMillis();
        return timestamp;
    }

    /**
     * 通过时间转为 xx月xx日（周X） xx:xx
     */
    public synchronized static String getMMddEHHss(Date date) {
        dateFormat.applyPattern(ISO_DATETIME_FORMAT);
        String dayNames[] = {"日", "一", "二", "三", "四", "五", "六"};
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK) - 1;
        if (dayOfWeek < 0) {
            dayOfWeek = 0;
        }
        String str = dateFormat.format(date);
        StringBuffer myStr = new StringBuffer();

        myStr.append(str.substring(5, 7));
        myStr.append("月");
        myStr.append(str.substring(8, 10));
        myStr.append("日(周");
        myStr.append(dayNames[dayOfWeek]);
        myStr.append(") ");
        myStr.append(str.substring(11, 16));

        return myStr.toString();
    }

    /**
     * 获取标准时间的HHmm
     *
     * @param date
     */
    public static String getHHmm(Date date) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(ISO_TIME_FORMAT);
        return simpleDateFormat.format(date);
    }

    /**
     * 获取两个时间之间的间隔分钟数 单位：分钟
     *
     * @param date_one
     * @param date_two
     */
    public synchronized static Long getTimeIntervalsMinutes(Date date_one, Date date_two) {
        long intervals = Math.abs(date_two.getTime() - date_one.getTime());
        return intervals / (1000 * 60);
    }

    /**
     * 将秒转换成分钟
     *
     * @param second 秒
     */
    public static int dateSecondToMin(int second) {
        return Math.abs(second / 60);
    }

    /**
     * 判断当期日期是否为周末
     *
     * @param currentDate
     */
    public synchronized static boolean isWeekend(Date currentDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        int week = calendar.get(Calendar.DAY_OF_WEEK) - 1;
        if (week == 6 || week == 0) {// 0代表周日，6代表周六
            return true;
        } else {
            return false;
        }
    }

    /**
     * 将毫秒转为文本日期格式（年月 日 时 分 秒）
     *
     * @param millisecond 毫秒
     */
    public synchronized static String millisecondToDate(long millisecond) {
        dateFormat.applyPattern(ISO_DATETIME_FORMAT);
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(millisecond);
        return dateFormat.format(calendar.getTime());
    }

    /**
     * 判断两个时间点是不是同一天
     *
     * @param date1 时间1
     * @param date2 时间2
     */
    public synchronized static boolean isSameDate(Date date1, Date date2) {
        Calendar cal1 = Calendar.getInstance();
        cal1.setTime(date1);

        Calendar cal2 = Calendar.getInstance();
        cal2.setTime(date2);

        boolean isSameYear = cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR);
        boolean isSameMonth = isSameYear && cal1.get(Calendar.MONTH) == cal2.get(Calendar.MONTH);
        boolean isSameDate = isSameMonth && cal1.get(Calendar.DAY_OF_MONTH) == cal2.get(Calendar.DAY_OF_MONTH);

        return isSameDate;
    }

    /**
     * 获取两个时间的间隔
     *
     * @param date1 时间1
     * @param date2 时间2
     */
    public static Long getDateTimeDifferenceBySecond(Date date1, Date date2) {
        return Math.abs(date1.getTime() - date2.getTime()) / 1000;
    }

    /**
     * 解析类似08月25日(周四) 21:12的日期转化为Date格式
     */
    public static Date parseMMddWWHHSS(String date) {
        String mon = date.substring(0, 2);
        String day = date.substring(date.indexOf("月") + 1, date.indexOf("日"));
        String time = date.substring(date.indexOf(" ") + 1);
        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);

        StringBuilder builder = new StringBuilder();
        builder = builder.append(year);
        builder = builder.append("-");
        builder = builder.append(mon);
        builder = builder.append("-");
        builder = builder.append(day);
        builder = builder.append(" ");
        builder = builder.append(time);

        return DateUtils.yyyy_MM_dd_HHmm(builder.toString());
    }

    /**
     * 比较两个时间大小
     *
     * @param date1 第一个时间点
     * @param date2 第二个时间点
     * @return int 0 相等 1 大于 -1小于
     */
    public synchronized static int compareDate(Date date1, Date date2) {
        if (date1.getTime() > date2.getTime()) { // 大于
            return 1;
        } else if (date1.getTime() < date2.getTime()) { // 小于
            return -1;
        } else { // 相等
            return 0;
        }
    }

    /**
     * 将文本日期转换为标准日期
     *
     * @param text
     */
    public synchronized static Date yyyy_MM_dd(String text) {

        dateFormat.applyPattern(DateUtils.ISO_DATE_FORMAT);
        try {
            return dateFormat.parse(text);
        } catch (ParseException e) {
            throw new DateFormatException(e);
        }
    }

    /**
     * 将当前时间转换为指定格式 "MMddHHmmss"
     */
    public synchronized static String MMDDHHmmss() {
        dateFormat.applyPattern(DateUtils.ISO_TIMEMMddHHMMSS_FORMAT);
        return dateFormat.format(new Date());
    }

    /**
     * 当前时间添加分钟
     *
     * @param date   操作的时间
     * @param minute 分钟
     */
    public synchronized static Date addMinute(Date date, int minute) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.MINUTE, minute);
        return cal.getTime();
    }

    /**
     * 当前时间加上指定天数后的时间
     */
    public static Date currentAddDays(Date date, int days) {
        Calendar ca = Calendar.getInstance();
        ca.setTime(date);
        ca.add(Calendar.DATE, days);
        return ca.getTime();
    }

    /**
     * 格式化携程的请求时间
     */
    public synchronized static Date parseYYYYMMddHHmm(String datetime) {
        dateFormat.applyPattern(DateUtils.REGEX_yyyyMMddHHmm);
        try {
            return dateFormat.parse(datetime);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 格式化安新捷的请求时间
     */
    public synchronized static String yyyyMMddHHmmss(Date date) {
        dateFormat.applyPattern(DateUtils.ANXINJIE_yyyyMMddHHmmss);
        return dateFormat.format(date);
    }

    /**
     * 比较传入时间是否在当前四个小时后
     */
    public static Boolean comparativeTime(String date) {
        return parseYYYYMMddHHmm(date).getTime() - (new Date().getTime()) > 4 * 60 * 60 * 1000;
    }

    /**
     * 时间范围(判断传入时间是否为 7:00 至 18:00 之间)
     *
     * @param: date
     */
    public static Boolean timeFrame(String date) {
        String startTime = "07:00";
        String endTime = "23:59";

        String currentTime = HHmmSS(parseYYYYMMddHHmm(date));

        dateFormat.applyPattern(DateUtils.ISO_TIME_FORMAT);

        try {
            dateFormat.parse(startTime).getTime();

            if (dateFormat.parse(startTime).getTime() <= dateFormat.parse(currentTime).getTime()
                    && dateFormat.parse(currentTime).getTime() <= dateFormat.parse(endTime).getTime()) {
                return true;
            }

        } catch (ParseException e) {
            e.printStackTrace();
        }

        return false;
    }

    /**
     * 判断指定的日期是否在当前日期之前
     *
     * @param date
     * @return delayDay 延迟天数
     */
    public static boolean compareDate(Date date, int delayDay) {
        Calendar currentDate = Calendar.getInstance();
        currentDate.setTime(new Date());
        currentDate.add(Calendar.DAY_OF_MONTH, delayDay);

        Calendar date1 = Calendar.getInstance();
        date1.setTime(date);

        if (currentDate.after(date1)) {
            return true;
        }

        return false;
    }

    /**
     * 判断两个日期是否相等,不包含时间
     */
    public synchronized static boolean compareDateIsEqual(Date date1, Date date2) {
        dateFormat.applyPattern(ISO_DATE_FORMAT);

        String dateStr1 = dateFormat.format(date1);

        String dateStr2 = dateFormat.format(date2);

        if (dateStr2.equals(dateStr1)) {
            return true;
        }
        return false;
    }

    /**
     * format_yyyy_MM_dd_HHmm
     * 日期转换格式为yyyy_MM_dd_HHmm
     */
    public synchronized static String format_yyyy_MM_dd_HHmm(Date date) {
        dateFormat.applyPattern(DATETIME_FORMAT);
        return dateFormat.format(date);
    }

    /**
     * 获取当前时间所对应的初始0点时刻
     *
     * @param now      当前时间的时间戳
     * @param timeZone 所在时区
     */
    public synchronized static Date getStartZeroTimeOfDay(Long now, String timeZone) {
        String tz = timeZone.isEmpty() ? "GMT+8" : timeZone;
        TimeZone curTimeZone = TimeZone.getTimeZone(tz);
        Calendar calendar = Calendar.getInstance(curTimeZone);
        calendar.setTimeInMillis(now);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    /**
     * 获取当前时间所对应的午夜0点时刻
     *
     * @param now      当前时间的时间戳
     * @param timeZone 所在时区
     */
    public synchronized static Date getEndZeroTimeOfDay(Long now, String timeZone) {
        String tz = timeZone.isEmpty() ? "GMT+8" : timeZone;
        TimeZone curTimeZone = TimeZone.getTimeZone(tz);
        Calendar calendar = Calendar.getInstance(curTimeZone);
        calendar.setTimeInMillis(now);
        calendar.set(Calendar.HOUR_OF_DAY, 24);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    /**
     * @param now 当前时间的时间戳
     * @description 获取当前时间所对应的初始0点时刻
     */
    public synchronized static Date getStartZeroTimeOfDay(Long now) {
        return DateUtils.getStartZeroTimeOfDay(now, "GMT+8");
    }

    /**
     * 获取当前时间所对应的午夜0点时刻
     *
     * @param now 当前时间的时间戳
     */
    public synchronized static Date getEndZeroTimeOfDay(Long now) {
        return DateUtils.getEndZeroTimeOfDay(now, "GMT+8");
    }

    /**
     * 将秒转化为Date格式
     */
    public synchronized static Date milltimeToDate(long milltime) {
        dateFormat.applyPattern(ISO_DATETIME_FORMAT);
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(milltime);
        return calendar.getTime();
    }

    /**
     * 获取日期相减的天数
     */
    public synchronized static long getDaySub(String beginDateStr, String endDateStr) {
        dateFormat.applyPattern(ISO_DATE_FORMAT);
        long days = -1;
        try {
            Date beginDate = dateFormat.parse(beginDateStr);
            Date endDate = dateFormat.parse(endDateStr);
            days = (endDate.getTime() - beginDate.getTime()) / (24 * 60 * 60 * 1000);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return days;
    }

    /**
     * 判断日期是否为今日
     */
    public synchronized static boolean isToday(Date date) {
        dateFormat.applyPattern(ISO_DATE_FORMAT);
        if (dateFormat.format(date).toString().equals(dateFormat.format(new Date()).toString())) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 将分钟数转成xx天xx时xx分的展现形式
     *
     * @return
     */
    public synchronized static String getDayByMinutes(Long minutes) {
        StringBuffer stringBuffer = new StringBuffer();
        Long day = minutes / 1440;
        Long hour = minutes % 1440 / 60;
        Long minute = minutes % 1440 % 60;
        stringBuffer.append(day).append("天").append(hour).append("小时").append(minute).append("分");
        return stringBuffer.toString();
    }

    /**
     * 获取两个时间之间的间隔分钟数 单位：分钟
     * 不取绝对值
     *
     * @param nowDate
     * @param compareDate
     */
    public synchronized static Long getTimeIntervalsMinutesNotMathABS(Date nowDate, Date compareDate) {
        long intervals = compareDate.getTime() - nowDate.getTime();
        System.out.println("实际值：" + intervals);
        return intervals / (1000 * 60);
    }
}
