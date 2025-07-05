/*--------------建库语句------------*/
CREATE DATABASE `userInfo` DEFAULT CHARACTER SET = 'utf8mb4';

/* 2024-05-10 10:19:08 [1486 ms] */
CREATE TABLE `score_info` (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    update_time DATETIME COMMENT 'Update Time',
    username VARCHAR(255) COMMENT '姓名',
    status VARCHAR(10) COMMENT '分数等级',
    score INT(100) COMMENT '分数',
    score_id VARCHAR(200) COMMENT '唯一值'
) COMMENT '分数信息表';
/* 2024-05-14 14:57:35 [3297 ms] */
CREATE TABLE `editor_info` (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME COMMENT 'Create Time',
    editor_content VARCHAR(255) COMMENT '编辑器编辑内容',
    editor_id VARCHAR(255) COMMENT '编辑器的唯一ID'
) COMMENT '编辑器信息表';

CREATE TABLE `login_info` (
    `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
    `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Create Time',
    `username` varchar(255) DEFAULT NULL COMMENT '用户姓名',
    `password` varchar(255) DEFAULT NULL COMMENT '用户密码',
    `user_id` varchar(255) NOT NULL COMMENT '用户唯一id',
    `email` varchar(255) DEFAULT NULL COMMENT '用户邮箱',
    `status` int DEFAULT '1' COMMENT '账户状态，1正常，0异常',
    `update_time` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) COMMENT '用户信息';

CREATE TABLE `user_info` (
    `id` int NOT NULL AUTO_INCREMENT,
    `username` varchar(100) DEFAULT NULL COMMENT '名字',
    `age` int DEFAULT NULL COMMENT '年龄',
    `weight` varchar(200) DEFAULT NULL COMMENT '体重',
    `score` int DEFAULT NULL COMMENT '总分',
    `status` varchar(10) DEFAULT NULL COMMENT '状态',
    `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `user_id` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '用户唯一ID',
    `description` varchar(255) DEFAULT NULL COMMENT '描述',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户表';

CREATE TABLE `mail_info` (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME COMMENT 'Create Time',
    pass VARCHAR(255) COMMENT "用户授权码",
    user VARCHAR(255) COMMENT "用户邮箱"
) COMMENT '用户设置信息';

CREATE TABLE `link_info` (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
    name VARCHAR(255) COMMENT "网址名称",
    link VARCHAR(512) COMMENT "网页链接",
    avatar VARCHAR(512) COMMENT "网页头像",
    description VARCHAR(255) COMMENT "网站描述"
) COMMENT '创建网页卡片表';

CREATE TABLE `task_info` (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
    complete_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '完成时间',
    task_id VARCHAR(255) COMMENT "任务唯一ID",
    task VARCHAR(512) COMMENT "任务",
    status VARCHAR(512) COMMENT "任务状态",
    reminder_time VARCHAR(255) COMMENT "提醒时间"
) COMMENT '任务信息';

DROP TABLE IF EXISTS `menus`;
-- 插入用户菜单表
CREATE TABLE `menus` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
    `pid` int(11) NOT NULL COMMENT '上级父节点的id，即为parentId（注意，children字段是不用存储，children字段是递归时，添加进去的）',
    `pids` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '上级节点的id数组转的字符串',
    `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '树节点的名字',
    `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '即为菜单的path',
    `cUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '当访问url时，前端路由需要读取并渲染的.vue文件的路径，一般是相对于views里的',
    `type` int(255) NULL DEFAULT NULL COMMENT 'type为1是菜单，为2是按钮',
    `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '菜单的图标名',
    `sort` int(255) NULL DEFAULT NULL COMMENT '菜单的上下排序',
    `status` int(255) NULL DEFAULT NULL COMMENT '是否开启字段，1是开启，2是关闭',
    `isHidden` int(255) NULL DEFAULT NULL COMMENT '是否隐藏菜单，1是显示，2是隐藏',
    `isCache` int(255) NULL DEFAULT NULL COMMENT '是否缓存，1是缓存，2是不缓存',
    `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '备注',
    `isDel` int(255) NULL DEFAULT 1 COMMENT '删除标识，1代表未删除可用，2代表已删除不可用',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 105 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

DROP TABLE IF EXISTS `roles`;
-- 用户角色信息表
CREATE TABLE `roles` (
    `roleId` int(255) NOT NULL AUTO_INCREMENT COMMENT '每一个角色的id',
    `roleName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '每一个角色的name名字',
    `roleRemark` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '角色的备注',
    `menuIds` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL COMMENT '当前的这个角色能看到（勾选）的菜单的id（给角色赋予菜单）',
    PRIMARY KEY (`roleId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

CREATE TABLE `users_role` (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME COMMENT 'Create Time',
    role_id VARCHAR(255) COMMENT "角色列表的唯一标识",
    user_id VARCHAR(255) COMMENT "用户列表的唯一标识"
) COMMENT '角色表和用户表的映射关系';

CREATE TABLE `img_info` (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Create Time',
    `original_name` VARCHAR(255) COMMENT '原始图片名',
    filename VARCHAR(255) COMMENT '图片名',
    `img_id` VARCHAR(255) COMMENT "唯一值",
    `img_path` VARCHAR(255) COMMENT "图片路径",
    `img_url` VARCHAR(255) COMMENT '图片URL',
    `img_type` VARCHAR(10) COMMENT '图片类型',
    descrption VARCHAR(255) COMMENT '备注'
) COMMENT '图片信息';

CREATE TABLE `article_app` (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    coverType VARCHAR(16),
    coverUrl VARCHAR(255),
    type VARCHAR(16),
    visible VARCHAR(32),
    tag VARCHAR(64),
    `column` VARCHAR(64),
    author VARCHAR(64),
    authorAvatar VARCHAR(255),
    createTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    likeCount INT DEFAULT 0,
    readCount INT DEFAULT 0,
    commentCount INT DEFAULT 0,
    isLiked TINYINT DEFAULT 0,
    isCollected TINYINT DEFAULT 0
) COMMENT 'APP端的文章系统';
