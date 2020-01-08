
# NetworkDisk_Storage
---
## 郑重声明！！！
因本人在B站看到有人将此毕业设计进行售卖，因此作出如下声明：  
此系统为本人2018年的毕业设计，属于原创，本人允许开发者进行二次开发及传播，仅用于学习用途，不允许进行售卖，否则将追究受益人责任，请遵循GPL-v2.0协议，如需要商业用途，请联系作者   
特此声明！
## 2019年10月07日改版
修改原先模糊的微服务概念，修改项目结构，eureka中增加认证，微服务调用增加BasicAuth认证，规范代码规范（但不完整，后续会继续修改），删掉发送短信相关参数，需要使用的话请在云之讯申请账号或采用其它平台短信服务。
## 描述
基于SpringBoot和SpringCloud的网盘系统，与百度网盘相似
## 采用技术
本项目采用的SpringBoot和SpringCloud为最新版本（SpringBoot2.1.7和SpringCloud Greenwich.SR2）  
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
pan-config-service---SpringCloud的配置中心  
pan-core-page---系统核心页面  
pan-core-service---系统核心服务  
pan-core-zuul---系统核心服务网关  
pan-edge-service---边缘系统（处理验证码，生成公钥，校验密码格式，发送短信）  
pan-eureka-service---服务注册中心  
pan-file-service---系统文件服务  
pan-file-zuul---系统文件服务网关  
pan-parent---MAVEN项目的总jar包管理  
pan-service-api---系统微服务调用api管理  
pan-regist-page---系统注册页面的展示服务  
pan-share-service---文件分享服务  
pan-user-service---系统用户服务  
## 项目运行顺序
先启动pan-eureka-service，再启动pan-config-service，之后启动其他模块（无顺序），pan-common需要install  
http://localhost:8097/为主界面，数据库sql脚本在工程根目录。  
>注意：每个项目中的resources文件夹需要IDEA识别出来，否则不能读取配置文件  
![Alt text](https://github.com/quhailong/NetworkDisk_Storage/blob/master/9.png)
## 系统部分截图
![Alt text](https://github.com/quhailong/NetworkDisk_Storage/blob/master/1.png)  
![Alt text](https://github.com/quhailong/NetworkDisk_Storage/blob/master/2.png)  
![Alt text](https://github.com/quhailong/NetworkDisk_Storage/blob/master/3.png)  
![Alt text](https://github.com/quhailong/NetworkDisk_Storage/blob/master/4.png)  
![Alt text](https://github.com/quhailong/NetworkDisk_Storage/blob/master/5.png)  
![Alt text](https://github.com/quhailong/NetworkDisk_Storage/blob/master/6.png)  
![Alt text](https://github.com/quhailong/NetworkDisk_Storage/blob/master/7.png)  
![Alt text](https://github.com/quhailong/NetworkDisk_Storage/blob/master/8.png)
## tips
项目有些地方还不太完善，如果有什么问题请联系  
QQ：961584293  
WX: ququhailong  
邮箱:qhl961584293@163.com  
如果觉得还行，就请点个赞把
