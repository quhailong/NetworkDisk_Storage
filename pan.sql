/*
Navicat MySQL Data Transfer

Source Server         : mycat
Source Server Version : 50629
Source Host           : 118.89.238.129:8066
Source Database       : pan

Target Server Type    : MYSQL
Target Server Version : 50629
File Encoding         : 65001

Date: 2018-07-03 15:31:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for capacity
-- ----------------------------
DROP TABLE IF EXISTS `capacity`;
CREATE TABLE `capacity` (
  `uid` varchar(255) NOT NULL,
  `total` bigint(20) NOT NULL,
  `used` bigint(20) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `fid` varchar(255) NOT NULL,
  `originalName` varchar(255) NOT NULL,
  `size` int(11) NOT NULL,
  `fileType` int(11) NOT NULL,
  `fileLocation` varchar(255) NOT NULL,
  `createtime` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `md5` varchar(255) NOT NULL,
  PRIMARY KEY (`fid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for share
-- ----------------------------
DROP TABLE IF EXISTS `share`;
CREATE TABLE `share` (
  `sid` varchar(255) NOT NULL,
  `shareId` varchar(255) NOT NULL,
  `theme` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `uid` varchar(255) NOT NULL,
  `isLock` int(11) NOT NULL,
  `sPassword` varchar(255) DEFAULT NULL,
  `visitTime` int(11) NOT NULL,
  `saveTime` int(11) NOT NULL,
  `downloadTime` int(11) NOT NULL,
  `createtime` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `multi` int(11) NOT NULL,
  `expiration` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sharemap
-- ----------------------------
DROP TABLE IF EXISTS `sharemap`;
CREATE TABLE `sharemap` (
  `mid` varchar(255) NOT NULL,
  `shareId` varchar(255) NOT NULL,
  `vid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`mid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `uid` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `picLocation` varchar(255) NOT NULL,
  `createtime` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updatetime` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for virtualaddress
-- ----------------------------
DROP TABLE IF EXISTS `virtualaddress`;
CREATE TABLE `virtualaddress` (
  `vid` varchar(255) NOT NULL,
  `fid` varchar(255) DEFAULT NULL,
  `uid` varchar(255) NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `addrType` int(11) NOT NULL,
  `createtime` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updatetime` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `md5` varchar(255) DEFAULT NULL,
  `parentPath` varchar(255) NOT NULL,
  `fileSize` int(11) DEFAULT NULL,
  `isDir` int(11) NOT NULL,
  PRIMARY KEY (`vid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
