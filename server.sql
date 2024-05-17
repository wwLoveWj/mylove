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
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME COMMENT 'Create Time',
    username VARCHAR(255) COMMENT '用户姓名',
    password VARCHAR(255) COMMENT '用户密码'
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
