CREATE TABLE `capacity` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户ID',
  `total_capacity` bigint(20) DEFAULT NULL COMMENT '总容量',
  `used_capacity` bigint(20) DEFAULT NULL COMMENT '使用容量',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='容量表';


CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `file_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '文件ID',
  `original_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '源名称',
  `file_size` int(11) DEFAULT NULL COMMENT '文件大小',
  `file_type` int(11) DEFAULT NULL COMMENT '文件类型',
  `file_location` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '文件地址',
  `file_md5` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '文件MD5',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_file_id` (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='文件信息表';


CREATE TABLE `share` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `share_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '分享ID',
  `theme` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '分享主题',
  `user_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户ID',
  `lock_whether` int(11) DEFAULT NULL COMMENT '是否加密',
  `share_password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '分享密码',
  `visit_count` int(11) DEFAULT NULL COMMENT '浏览次数',
  `save_count` int(11) DEFAULT NULL COMMENT '保存次数',
  `download_count` int(11) DEFAULT NULL COMMENT '下载次数',
  `multi_whether` int(11) DEFAULT NULL COMMENT '是否多文件',
  `expiration` datetime DEFAULT NULL COMMENT '过期时间',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_share_id` (`share_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='分享表';


CREATE TABLE `share_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `share_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '分享ID',
  `virtual_address_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '虚拟地址ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='分享文件对应表';



CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户ID',
  `user_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '密码',
  `phone` varchar(11) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '手机号',
  `salt` varchar(16) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '盐',
  `pic_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '头像地址',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_user_id` (`id`),
  UNIQUE KEY `index_user_name` (`user_name`),
  UNIQUE KEY `index_phone` (`phone`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户信息表';
INSERT INTO `pan`.`user_info` (`id`, `user_id`, `user_name`, `password`, `phone`, `salt`, `pic_location`, `create_time`, `update_time`) VALUES ('1', '628185656501301248', 'quhailong', '66173fe0be1ec5fe09a6ca0668c90832b68e20010588e145', '17526895020', '6301506080280084', '/', '2019-09-30 03:05:32', '2020-08-22 15:10:37');


CREATE TABLE `virtual_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uuid` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '业务ID',
  `file_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '文件ID',
  `user_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户ID',
  `file_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '文件名称',
  `addr_type` int(11) DEFAULT NULL COMMENT '虚拟地址类型',
  `file_md5` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '文件md5',
  `parent_path` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '父级路径',
  `file_size` int(11) DEFAULT NULL COMMENT '文件大小',
  `dir_whether` int(11) DEFAULT NULL COMMENT '是否是文件',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_uuid` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='虚拟地址表';