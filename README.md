
# NetworkDisk_Storage
---
## 描述
基于SpringBoot和SpringCloud的网盘系统，与百度网盘相似
## 采用技术
本项目采用的SpringBoot和SpringCloud为最新版本（SpringBoot2.0.2和SpringCloud Finchley.RC2）  
数据加密采用JWT技术  
持久层框架采用Mybatis  
数据连接池采用druid  
数据库采用MySQL  
分布式缓存采用redis集群  
文件存储服务器采用FastDFS集群  
短信发送平台采用云之讯  
项目总体使用MAVEN进行构建
## 主要功能
1.用户登录、注册  
2.文件上传下载  
3.新建文件夹、文件夹重命名  
4.文件及文件夹的删除、复制、移动  
5.文件分类展示  
6.文件模糊搜索  
7.文件公开或加密分享  
8.容量展示  
9.用户头像上传  
10.用户修改密码及忘记密码  
## 项目模块划分
pan-common---通用组件  
pan-configServer---SpringCloud的配置中心  
pan-coreAPI---系统核心api处理，微服务之间相互调用  
pan-edgeServer---边缘系统（处理验证码，生成公钥，校验密码格式，发送短信）  
pan-eureka-server---服务注册中心  
pan-fastDFS---管理文件上传和下载到FastDFS集群中    
pan-login---登录服务  
pan-pages---系统登录及主要页面的展示服务  
pan-parent---MAVEN项目的总jar包管理  
pan-queryContent---系统数据查询服务  
pan-regist---系统注册服务  
pan-registPage---系统注册页面的展示服务  
pan-share---文件分享服务  
pan-updateContent---系统数据修改服务  
pan-zuul---系统登录注册，修改密码，边缘服务，上传头像等功能的路由网关  
pan-zuul2---系统核心功能的路由网关  
pan-zuul3---系统注册页面跳转的路由网关  
pan-zuul4---系统登录及主页面的路由网关  
## 系统部分截图
![Alt text](https://github.com/quhailong/NetworkDisk_Storage/blob/master/1.png)  
![Alt text](https://github.com/quhailong/NetworkDisk_Storage/blob/master/2.png)  
![Alt text](https://github.com/quhailong/NetworkDisk_Storage/blob/master/3.png)  
![Alt text](https://github.com/quhailong/NetworkDisk_Storage/blob/master/4.png)  
![Alt text](https://github.com/quhailong/NetworkDisk_Storage/blob/master/5.png)  
![Alt text](https://github.com/quhailong/NetworkDisk_Storage/blob/master/6.png)  
![Alt text](https://github.com/quhailong/NetworkDisk_Storage/blob/master/7.png)  
![Alt text](https://github.com/quhailong/NetworkDisk_Storage/blob/master/8.png)
