/* 2024-05-09 16:28:51 [856 ms] */
ALTER TABLE `userInfo` RENAME `user`;
/* 2024-05-09 17:19:07 [223 ms] */
INSERT INTO
    `user` (
        `id`,
        `username`,
        `age`,
        `weight`,
        `score`,
        `status`,
        `create_time`
    )
VALUES (
        1,
        'ww',
        22,
        '173',
        100,
        '1',
        '2024-05-09 13:13:01'
    );
/* 2024-05-09 19:57:18 [1606 ms] */
ALTER TABLE `user` Add COLUMN `userId` VARCHAR(20);
/* 2024-05-10 10:19:08 [1486 ms] */
CREATE TABLE `score` (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    update_time DATETIME COMMENT 'Update Time',
    username VARCHAR(255) COMMENT '姓名',
    status VARCHAR(10) COMMENT '分数等级',
    score INT(100) COMMENT '分数',
    score_id VARCHAR(200) COMMENT '唯一值'
) COMMENT '分数信息表';
/* 2024-05-10 10:19:44 [4 ms] */
DELETE FROM `score` WHERE `id` = 1;
/* 2024-05-10 10:20:36 [337 ms] */
INSERT INTO
    `score` (
        `update_time`,
        `id`,
        `status`,
        `username`,
        `score`,
        `score_id`
    )
VALUES (
        '2024-05-10 00:00:00',
        1,
        '2',
        'ww',
        78,
        'rerere5465656565gfgf'
    );
/* 2024-05-10 16:16:20 [277 ms] */
DELETE FROM `score` WHERE `id` IN (1, 2, 3);
/* 2024-05-10 16:23:00 [170 ms] */
DELETE FROM `user` WHERE `id` IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
/* 2024-05-10 16:25:07 [174 ms] */
DELETE FROM `score` WHERE `id` IN (4, 5);
/* 2024-05-10 16:25:49 [197 ms] */
UPDATE `score` SET `id` = 1 WHERE `id` = 6;
/* 2024-05-10 16:43:01 [77 ms] */
DELETE FROM `score` WHERE `id` IN ( 1, 7, 8, 9, 10, 11, 12, 13, 14 );
/* 2024-05-11 13:49:18 [115 ms] */
select *
from score, user
where
    score.user_id = user.username
LIMIT 100;
/* 2024-05-11 13:51:35 [14 ms] */
select *
from score, user
where
    score.user_id = user.user_id
LIMIT 100;
/* 2024-05-11 13:52:14 [3 ms] */
select user.username
from score, user
where
    score.user_id = user.user_id
LIMIT 100;
/* 2024-05-13 11:44:15 [188 ms] */
DELETE FROM `user` WHERE `id` = 13;
/* 2024-05-13 11:44:25 [263 ms] */
UPDATE `user` SET `id` = 1 WHERE `id` = 11;

UPDATE `user` SET `id` = 2 WHERE `id` = 12;
/* 2024-05-14 14:57:35 [3297 ms] */
CREATE TABLE `editor_info` (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME COMMENT 'Create Time',
    editor_content VARCHAR(255) COMMENT '编辑器编辑内容',
    editor_id VARCHAR(255) COMMENT '编辑器的唯一ID'
) COMMENT '编辑器信息表';
/* 2024-05-14 15:23:44 [207 ms] */
DELETE FROM `editor_info` WHERE `id` IN (2, 3, 4, 5, 6, 7, 8, 9);

CREATE TABLE `editor_info` (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME COMMENT 'Create Time',
    editor_content VARCHAR(255) COMMENT '编辑器编辑内容',
    editor_id VARCHAR(255) COMMENT '编辑器的唯一ID'
) COMMENT '编辑器信息表';
