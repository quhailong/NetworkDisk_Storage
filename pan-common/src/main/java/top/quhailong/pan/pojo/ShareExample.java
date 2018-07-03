package top.quhailong.pan.pojo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ShareExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public ShareExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andSidIsNull() {
            addCriterion("sid is null");
            return (Criteria) this;
        }

        public Criteria andSidIsNotNull() {
            addCriterion("sid is not null");
            return (Criteria) this;
        }

        public Criteria andSidEqualTo(String value) {
            addCriterion("sid =", value, "sid");
            return (Criteria) this;
        }

        public Criteria andSidNotEqualTo(String value) {
            addCriterion("sid <>", value, "sid");
            return (Criteria) this;
        }

        public Criteria andSidGreaterThan(String value) {
            addCriterion("sid >", value, "sid");
            return (Criteria) this;
        }

        public Criteria andSidGreaterThanOrEqualTo(String value) {
            addCriterion("sid >=", value, "sid");
            return (Criteria) this;
        }

        public Criteria andSidLessThan(String value) {
            addCriterion("sid <", value, "sid");
            return (Criteria) this;
        }

        public Criteria andSidLessThanOrEqualTo(String value) {
            addCriterion("sid <=", value, "sid");
            return (Criteria) this;
        }

        public Criteria andSidLike(String value) {
            addCriterion("sid like", value, "sid");
            return (Criteria) this;
        }

        public Criteria andSidNotLike(String value) {
            addCriterion("sid not like", value, "sid");
            return (Criteria) this;
        }

        public Criteria andSidIn(List<String> values) {
            addCriterion("sid in", values, "sid");
            return (Criteria) this;
        }

        public Criteria andSidNotIn(List<String> values) {
            addCriterion("sid not in", values, "sid");
            return (Criteria) this;
        }

        public Criteria andSidBetween(String value1, String value2) {
            addCriterion("sid between", value1, value2, "sid");
            return (Criteria) this;
        }

        public Criteria andSidNotBetween(String value1, String value2) {
            addCriterion("sid not between", value1, value2, "sid");
            return (Criteria) this;
        }

        public Criteria andShareidIsNull() {
            addCriterion("shareId is null");
            return (Criteria) this;
        }

        public Criteria andShareidIsNotNull() {
            addCriterion("shareId is not null");
            return (Criteria) this;
        }

        public Criteria andShareidEqualTo(String value) {
            addCriterion("shareId =", value, "shareid");
            return (Criteria) this;
        }

        public Criteria andShareidNotEqualTo(String value) {
            addCriterion("shareId <>", value, "shareid");
            return (Criteria) this;
        }

        public Criteria andShareidGreaterThan(String value) {
            addCriterion("shareId >", value, "shareid");
            return (Criteria) this;
        }

        public Criteria andShareidGreaterThanOrEqualTo(String value) {
            addCriterion("shareId >=", value, "shareid");
            return (Criteria) this;
        }

        public Criteria andShareidLessThan(String value) {
            addCriterion("shareId <", value, "shareid");
            return (Criteria) this;
        }

        public Criteria andShareidLessThanOrEqualTo(String value) {
            addCriterion("shareId <=", value, "shareid");
            return (Criteria) this;
        }

        public Criteria andShareidLike(String value) {
            addCriterion("shareId like", value, "shareid");
            return (Criteria) this;
        }

        public Criteria andShareidNotLike(String value) {
            addCriterion("shareId not like", value, "shareid");
            return (Criteria) this;
        }

        public Criteria andShareidIn(List<String> values) {
            addCriterion("shareId in", values, "shareid");
            return (Criteria) this;
        }

        public Criteria andShareidNotIn(List<String> values) {
            addCriterion("shareId not in", values, "shareid");
            return (Criteria) this;
        }

        public Criteria andShareidBetween(String value1, String value2) {
            addCriterion("shareId between", value1, value2, "shareid");
            return (Criteria) this;
        }

        public Criteria andShareidNotBetween(String value1, String value2) {
            addCriterion("shareId not between", value1, value2, "shareid");
            return (Criteria) this;
        }

        public Criteria andThemeIsNull() {
            addCriterion("theme is null");
            return (Criteria) this;
        }

        public Criteria andThemeIsNotNull() {
            addCriterion("theme is not null");
            return (Criteria) this;
        }

        public Criteria andThemeEqualTo(String value) {
            addCriterion("theme =", value, "theme");
            return (Criteria) this;
        }

        public Criteria andThemeNotEqualTo(String value) {
            addCriterion("theme <>", value, "theme");
            return (Criteria) this;
        }

        public Criteria andThemeGreaterThan(String value) {
            addCriterion("theme >", value, "theme");
            return (Criteria) this;
        }

        public Criteria andThemeGreaterThanOrEqualTo(String value) {
            addCriterion("theme >=", value, "theme");
            return (Criteria) this;
        }

        public Criteria andThemeLessThan(String value) {
            addCriterion("theme <", value, "theme");
            return (Criteria) this;
        }

        public Criteria andThemeLessThanOrEqualTo(String value) {
            addCriterion("theme <=", value, "theme");
            return (Criteria) this;
        }

        public Criteria andThemeLike(String value) {
            addCriterion("theme like", value, "theme");
            return (Criteria) this;
        }

        public Criteria andThemeNotLike(String value) {
            addCriterion("theme not like", value, "theme");
            return (Criteria) this;
        }

        public Criteria andThemeIn(List<String> values) {
            addCriterion("theme in", values, "theme");
            return (Criteria) this;
        }

        public Criteria andThemeNotIn(List<String> values) {
            addCriterion("theme not in", values, "theme");
            return (Criteria) this;
        }

        public Criteria andThemeBetween(String value1, String value2) {
            addCriterion("theme between", value1, value2, "theme");
            return (Criteria) this;
        }

        public Criteria andThemeNotBetween(String value1, String value2) {
            addCriterion("theme not between", value1, value2, "theme");
            return (Criteria) this;
        }

        public Criteria andUidIsNull() {
            addCriterion("uid is null");
            return (Criteria) this;
        }

        public Criteria andUidIsNotNull() {
            addCriterion("uid is not null");
            return (Criteria) this;
        }

        public Criteria andUidEqualTo(String value) {
            addCriterion("uid =", value, "uid");
            return (Criteria) this;
        }

        public Criteria andUidNotEqualTo(String value) {
            addCriterion("uid <>", value, "uid");
            return (Criteria) this;
        }

        public Criteria andUidGreaterThan(String value) {
            addCriterion("uid >", value, "uid");
            return (Criteria) this;
        }

        public Criteria andUidGreaterThanOrEqualTo(String value) {
            addCriterion("uid >=", value, "uid");
            return (Criteria) this;
        }

        public Criteria andUidLessThan(String value) {
            addCriterion("uid <", value, "uid");
            return (Criteria) this;
        }

        public Criteria andUidLessThanOrEqualTo(String value) {
            addCriterion("uid <=", value, "uid");
            return (Criteria) this;
        }

        public Criteria andUidLike(String value) {
            addCriterion("uid like", value, "uid");
            return (Criteria) this;
        }

        public Criteria andUidNotLike(String value) {
            addCriterion("uid not like", value, "uid");
            return (Criteria) this;
        }

        public Criteria andUidIn(List<String> values) {
            addCriterion("uid in", values, "uid");
            return (Criteria) this;
        }

        public Criteria andUidNotIn(List<String> values) {
            addCriterion("uid not in", values, "uid");
            return (Criteria) this;
        }

        public Criteria andUidBetween(String value1, String value2) {
            addCriterion("uid between", value1, value2, "uid");
            return (Criteria) this;
        }

        public Criteria andUidNotBetween(String value1, String value2) {
            addCriterion("uid not between", value1, value2, "uid");
            return (Criteria) this;
        }

        public Criteria andIslockIsNull() {
            addCriterion("isLock is null");
            return (Criteria) this;
        }

        public Criteria andIslockIsNotNull() {
            addCriterion("isLock is not null");
            return (Criteria) this;
        }

        public Criteria andIslockEqualTo(Integer value) {
            addCriterion("isLock =", value, "islock");
            return (Criteria) this;
        }

        public Criteria andIslockNotEqualTo(Integer value) {
            addCriterion("isLock <>", value, "islock");
            return (Criteria) this;
        }

        public Criteria andIslockGreaterThan(Integer value) {
            addCriterion("isLock >", value, "islock");
            return (Criteria) this;
        }

        public Criteria andIslockGreaterThanOrEqualTo(Integer value) {
            addCriterion("isLock >=", value, "islock");
            return (Criteria) this;
        }

        public Criteria andIslockLessThan(Integer value) {
            addCriterion("isLock <", value, "islock");
            return (Criteria) this;
        }

        public Criteria andIslockLessThanOrEqualTo(Integer value) {
            addCriterion("isLock <=", value, "islock");
            return (Criteria) this;
        }

        public Criteria andIslockIn(List<Integer> values) {
            addCriterion("isLock in", values, "islock");
            return (Criteria) this;
        }

        public Criteria andIslockNotIn(List<Integer> values) {
            addCriterion("isLock not in", values, "islock");
            return (Criteria) this;
        }

        public Criteria andIslockBetween(Integer value1, Integer value2) {
            addCriterion("isLock between", value1, value2, "islock");
            return (Criteria) this;
        }

        public Criteria andIslockNotBetween(Integer value1, Integer value2) {
            addCriterion("isLock not between", value1, value2, "islock");
            return (Criteria) this;
        }

        public Criteria andSpasswordIsNull() {
            addCriterion("sPassword is null");
            return (Criteria) this;
        }

        public Criteria andSpasswordIsNotNull() {
            addCriterion("sPassword is not null");
            return (Criteria) this;
        }

        public Criteria andSpasswordEqualTo(String value) {
            addCriterion("sPassword =", value, "spassword");
            return (Criteria) this;
        }

        public Criteria andSpasswordNotEqualTo(String value) {
            addCriterion("sPassword <>", value, "spassword");
            return (Criteria) this;
        }

        public Criteria andSpasswordGreaterThan(String value) {
            addCriterion("sPassword >", value, "spassword");
            return (Criteria) this;
        }

        public Criteria andSpasswordGreaterThanOrEqualTo(String value) {
            addCriterion("sPassword >=", value, "spassword");
            return (Criteria) this;
        }

        public Criteria andSpasswordLessThan(String value) {
            addCriterion("sPassword <", value, "spassword");
            return (Criteria) this;
        }

        public Criteria andSpasswordLessThanOrEqualTo(String value) {
            addCriterion("sPassword <=", value, "spassword");
            return (Criteria) this;
        }

        public Criteria andSpasswordLike(String value) {
            addCriterion("sPassword like", value, "spassword");
            return (Criteria) this;
        }

        public Criteria andSpasswordNotLike(String value) {
            addCriterion("sPassword not like", value, "spassword");
            return (Criteria) this;
        }

        public Criteria andSpasswordIn(List<String> values) {
            addCriterion("sPassword in", values, "spassword");
            return (Criteria) this;
        }

        public Criteria andSpasswordNotIn(List<String> values) {
            addCriterion("sPassword not in", values, "spassword");
            return (Criteria) this;
        }

        public Criteria andSpasswordBetween(String value1, String value2) {
            addCriterion("sPassword between", value1, value2, "spassword");
            return (Criteria) this;
        }

        public Criteria andSpasswordNotBetween(String value1, String value2) {
            addCriterion("sPassword not between", value1, value2, "spassword");
            return (Criteria) this;
        }

        public Criteria andVisittimeIsNull() {
            addCriterion("visitTime is null");
            return (Criteria) this;
        }

        public Criteria andVisittimeIsNotNull() {
            addCriterion("visitTime is not null");
            return (Criteria) this;
        }

        public Criteria andVisittimeEqualTo(Integer value) {
            addCriterion("visitTime =", value, "visittime");
            return (Criteria) this;
        }

        public Criteria andVisittimeNotEqualTo(Integer value) {
            addCriterion("visitTime <>", value, "visittime");
            return (Criteria) this;
        }

        public Criteria andVisittimeGreaterThan(Integer value) {
            addCriterion("visitTime >", value, "visittime");
            return (Criteria) this;
        }

        public Criteria andVisittimeGreaterThanOrEqualTo(Integer value) {
            addCriterion("visitTime >=", value, "visittime");
            return (Criteria) this;
        }

        public Criteria andVisittimeLessThan(Integer value) {
            addCriterion("visitTime <", value, "visittime");
            return (Criteria) this;
        }

        public Criteria andVisittimeLessThanOrEqualTo(Integer value) {
            addCriterion("visitTime <=", value, "visittime");
            return (Criteria) this;
        }

        public Criteria andVisittimeIn(List<Integer> values) {
            addCriterion("visitTime in", values, "visittime");
            return (Criteria) this;
        }

        public Criteria andVisittimeNotIn(List<Integer> values) {
            addCriterion("visitTime not in", values, "visittime");
            return (Criteria) this;
        }

        public Criteria andVisittimeBetween(Integer value1, Integer value2) {
            addCriterion("visitTime between", value1, value2, "visittime");
            return (Criteria) this;
        }

        public Criteria andVisittimeNotBetween(Integer value1, Integer value2) {
            addCriterion("visitTime not between", value1, value2, "visittime");
            return (Criteria) this;
        }

        public Criteria andSavetimeIsNull() {
            addCriterion("saveTime is null");
            return (Criteria) this;
        }

        public Criteria andSavetimeIsNotNull() {
            addCriterion("saveTime is not null");
            return (Criteria) this;
        }

        public Criteria andSavetimeEqualTo(Integer value) {
            addCriterion("saveTime =", value, "savetime");
            return (Criteria) this;
        }

        public Criteria andSavetimeNotEqualTo(Integer value) {
            addCriterion("saveTime <>", value, "savetime");
            return (Criteria) this;
        }

        public Criteria andSavetimeGreaterThan(Integer value) {
            addCriterion("saveTime >", value, "savetime");
            return (Criteria) this;
        }

        public Criteria andSavetimeGreaterThanOrEqualTo(Integer value) {
            addCriterion("saveTime >=", value, "savetime");
            return (Criteria) this;
        }

        public Criteria andSavetimeLessThan(Integer value) {
            addCriterion("saveTime <", value, "savetime");
            return (Criteria) this;
        }

        public Criteria andSavetimeLessThanOrEqualTo(Integer value) {
            addCriterion("saveTime <=", value, "savetime");
            return (Criteria) this;
        }

        public Criteria andSavetimeIn(List<Integer> values) {
            addCriterion("saveTime in", values, "savetime");
            return (Criteria) this;
        }

        public Criteria andSavetimeNotIn(List<Integer> values) {
            addCriterion("saveTime not in", values, "savetime");
            return (Criteria) this;
        }

        public Criteria andSavetimeBetween(Integer value1, Integer value2) {
            addCriterion("saveTime between", value1, value2, "savetime");
            return (Criteria) this;
        }

        public Criteria andSavetimeNotBetween(Integer value1, Integer value2) {
            addCriterion("saveTime not between", value1, value2, "savetime");
            return (Criteria) this;
        }

        public Criteria andDownloadtimeIsNull() {
            addCriterion("downloadTime is null");
            return (Criteria) this;
        }

        public Criteria andDownloadtimeIsNotNull() {
            addCriterion("downloadTime is not null");
            return (Criteria) this;
        }

        public Criteria andDownloadtimeEqualTo(Integer value) {
            addCriterion("downloadTime =", value, "downloadtime");
            return (Criteria) this;
        }

        public Criteria andDownloadtimeNotEqualTo(Integer value) {
            addCriterion("downloadTime <>", value, "downloadtime");
            return (Criteria) this;
        }

        public Criteria andDownloadtimeGreaterThan(Integer value) {
            addCriterion("downloadTime >", value, "downloadtime");
            return (Criteria) this;
        }

        public Criteria andDownloadtimeGreaterThanOrEqualTo(Integer value) {
            addCriterion("downloadTime >=", value, "downloadtime");
            return (Criteria) this;
        }

        public Criteria andDownloadtimeLessThan(Integer value) {
            addCriterion("downloadTime <", value, "downloadtime");
            return (Criteria) this;
        }

        public Criteria andDownloadtimeLessThanOrEqualTo(Integer value) {
            addCriterion("downloadTime <=", value, "downloadtime");
            return (Criteria) this;
        }

        public Criteria andDownloadtimeIn(List<Integer> values) {
            addCriterion("downloadTime in", values, "downloadtime");
            return (Criteria) this;
        }

        public Criteria andDownloadtimeNotIn(List<Integer> values) {
            addCriterion("downloadTime not in", values, "downloadtime");
            return (Criteria) this;
        }

        public Criteria andDownloadtimeBetween(Integer value1, Integer value2) {
            addCriterion("downloadTime between", value1, value2, "downloadtime");
            return (Criteria) this;
        }

        public Criteria andDownloadtimeNotBetween(Integer value1, Integer value2) {
            addCriterion("downloadTime not between", value1, value2, "downloadtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeIsNull() {
            addCriterion("createtime is null");
            return (Criteria) this;
        }

        public Criteria andCreatetimeIsNotNull() {
            addCriterion("createtime is not null");
            return (Criteria) this;
        }

        public Criteria andCreatetimeEqualTo(Date value) {
            addCriterion("createtime =", value, "createtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeNotEqualTo(Date value) {
            addCriterion("createtime <>", value, "createtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeGreaterThan(Date value) {
            addCriterion("createtime >", value, "createtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeGreaterThanOrEqualTo(Date value) {
            addCriterion("createtime >=", value, "createtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeLessThan(Date value) {
            addCriterion("createtime <", value, "createtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeLessThanOrEqualTo(Date value) {
            addCriterion("createtime <=", value, "createtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeIn(List<Date> values) {
            addCriterion("createtime in", values, "createtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeNotIn(List<Date> values) {
            addCriterion("createtime not in", values, "createtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeBetween(Date value1, Date value2) {
            addCriterion("createtime between", value1, value2, "createtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeNotBetween(Date value1, Date value2) {
            addCriterion("createtime not between", value1, value2, "createtime");
            return (Criteria) this;
        }

        public Criteria andMultiIsNull() {
            addCriterion("multi is null");
            return (Criteria) this;
        }

        public Criteria andMultiIsNotNull() {
            addCriterion("multi is not null");
            return (Criteria) this;
        }

        public Criteria andMultiEqualTo(Integer value) {
            addCriterion("multi =", value, "multi");
            return (Criteria) this;
        }

        public Criteria andMultiNotEqualTo(Integer value) {
            addCriterion("multi <>", value, "multi");
            return (Criteria) this;
        }

        public Criteria andMultiGreaterThan(Integer value) {
            addCriterion("multi >", value, "multi");
            return (Criteria) this;
        }

        public Criteria andMultiGreaterThanOrEqualTo(Integer value) {
            addCriterion("multi >=", value, "multi");
            return (Criteria) this;
        }

        public Criteria andMultiLessThan(Integer value) {
            addCriterion("multi <", value, "multi");
            return (Criteria) this;
        }

        public Criteria andMultiLessThanOrEqualTo(Integer value) {
            addCriterion("multi <=", value, "multi");
            return (Criteria) this;
        }

        public Criteria andMultiIn(List<Integer> values) {
            addCriterion("multi in", values, "multi");
            return (Criteria) this;
        }

        public Criteria andMultiNotIn(List<Integer> values) {
            addCriterion("multi not in", values, "multi");
            return (Criteria) this;
        }

        public Criteria andMultiBetween(Integer value1, Integer value2) {
            addCriterion("multi between", value1, value2, "multi");
            return (Criteria) this;
        }

        public Criteria andMultiNotBetween(Integer value1, Integer value2) {
            addCriterion("multi not between", value1, value2, "multi");
            return (Criteria) this;
        }

        public Criteria andExpirationIsNull() {
            addCriterion("expiration is null");
            return (Criteria) this;
        }

        public Criteria andExpirationIsNotNull() {
            addCriterion("expiration is not null");
            return (Criteria) this;
        }

        public Criteria andExpirationEqualTo(Date value) {
            addCriterion("expiration =", value, "expiration");
            return (Criteria) this;
        }

        public Criteria andExpirationNotEqualTo(Date value) {
            addCriterion("expiration <>", value, "expiration");
            return (Criteria) this;
        }

        public Criteria andExpirationGreaterThan(Date value) {
            addCriterion("expiration >", value, "expiration");
            return (Criteria) this;
        }

        public Criteria andExpirationGreaterThanOrEqualTo(Date value) {
            addCriterion("expiration >=", value, "expiration");
            return (Criteria) this;
        }

        public Criteria andExpirationLessThan(Date value) {
            addCriterion("expiration <", value, "expiration");
            return (Criteria) this;
        }

        public Criteria andExpirationLessThanOrEqualTo(Date value) {
            addCriterion("expiration <=", value, "expiration");
            return (Criteria) this;
        }

        public Criteria andExpirationIn(List<Date> values) {
            addCriterion("expiration in", values, "expiration");
            return (Criteria) this;
        }

        public Criteria andExpirationNotIn(List<Date> values) {
            addCriterion("expiration not in", values, "expiration");
            return (Criteria) this;
        }

        public Criteria andExpirationBetween(Date value1, Date value2) {
            addCriterion("expiration between", value1, value2, "expiration");
            return (Criteria) this;
        }

        public Criteria andExpirationNotBetween(Date value1, Date value2) {
            addCriterion("expiration not between", value1, value2, "expiration");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}