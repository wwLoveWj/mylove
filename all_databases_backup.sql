-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: userinfo
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `api_info`
--

DROP TABLE IF EXISTS `api_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_info` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `create_time` datetime DEFAULT NULL COMMENT 'Create Time',
  `api_key` varchar(255) DEFAULT NULL COMMENT '鏄熺伀澶фā鍨媋pi_key',
  `api_secret` varchar(255) DEFAULT NULL COMMENT '鏄熺伀澶фā鍨媋pi_secret',
  `app_id` varchar(255) DEFAULT NULL COMMENT '鏄熺伀澶фā鍨媋pp_id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='鏄熺伀澶фā鍨嬬殑api鏁版嵁';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_info`
--

LOCK TABLES `api_info` WRITE;
/*!40000 ALTER TABLE `api_info` DISABLE KEYS */;
INSERT INTO `api_info` VALUES (1,NULL,'cfaae3a25cec44bb1f62f4d85d90dbe5','ZWZkOTBjZDM4Y2UxMjI1NmQzNjk0MTlm','908c51d9'),(2,NULL,'HPJEIWOOTHGWHJCO','your emial','閭鎺堟潈鐮?);
/*!40000 ALTER TABLE `api_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `editor_info`
--

DROP TABLE IF EXISTS `editor_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `editor_info` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
  `editor_content` varchar(9000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '缂栬緫鍣ㄧ紪杈戝唴瀹?,
  `editor_id` varchar(255) DEFAULT NULL COMMENT '缂栬緫鍣ㄧ殑鍞竴ID',
  `title` varchar(255) DEFAULT NULL COMMENT '鏂囩珷鏍囬',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=451 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='缂栬緫鍣ㄤ俊鎭〃';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editor_info`
--

LOCK TABLES `editor_info` WRITE;
/*!40000 ALTER TABLE `editor_info` DISABLE KEYS */;
INSERT INTO `editor_info` VALUES (450,'2024-07-09 13:13:18','<p>6666666666666缂栬緫浜?/p><h1>鎴戞槸澶ф爣棰?/h1><h2>鎴戞槸h2鏍囬</h2><h3>鎴戞槸h3鏍囬</h3>','6d911be6-68bb-634a-af64-b85d14e9b4ec','鎴戝啓鐨勭涓€绡囨枃绔?);
/*!40000 ALTER TABLE `editor_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `link_info`
--

DROP TABLE IF EXISTS `link_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `link_info` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
  `name` varchar(255) DEFAULT NULL COMMENT '缃戝潃鍚嶇О',
  `link` varchar(512) DEFAULT NULL COMMENT '缃戦〉閾炬帴',
  `avatar` varchar(512) DEFAULT NULL COMMENT '缃戦〉澶村儚',
  `description` varchar(255) DEFAULT NULL COMMENT '缃戠珯鎻忚堪',
  `link_id` varchar(255) DEFAULT NULL COMMENT '缃戝潃鍞竴鏍囪瘑id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='鍒涘缓缃戦〉鍗＄墖琛?;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link_info`
--

LOCK TABLES `link_info` WRITE;
/*!40000 ALTER TABLE `link_info` DISABLE KEYS */;
INSERT INTO `link_info` VALUES (4,'2024-06-17 11:48:36','閰峰暒楸?,'https://www.kulayu.com/','http://localhost:3007/9ca9698ae3c895f5218fd3386acd40d7.gif','鍏ㄧ綉璧勬簮鎼滅储鐨勭綉绔?,'3e784810-bc2e-6429-97a6-df89aa203ef7'),(5,'2024-06-17 11:49:41','鍔ㄦ极宀?,'https://www.zymk.cn/','http://localhost:3007/25ea4dd09a0a8c591cd0e0d0d6df47ea.png','鍏充簬鍔ㄦ极鐨勭綉绔?,'4fe5319f-2c8a-6b70-ba3d-571f5d3f78be'),(6,'2024-06-17 11:52:49','antd','https://ant-design.antgroup.com/components/avatar-cn?from=msidevs.net#avatar','http://localhost:3007/2437b2789695929bd4fcf59da2e575b0.webp','鍓嶇UI妗嗘灦缃戠珯','0938c00e-d9fe-60b8-91a1-67dd89f54b72'),(8,'2024-06-19 12:05:04','浠ｇ爜鐗囨','https://snippet-generator.app/?description=22222&tabtrigger=222&snippet=&mode=vscode','http://localhost:3007/9688686d943d0881e3476c78a1a5bebf.jpg','vscode鐨勪唬鐮佺墖娈电敓鎴愮綉绔欙紝渚嬪锛氳緭鍏ue鐩存帴鐢熸垚vue鐨勬ā鏉夸俊鎭?,'04f9f4b0-911c-6de7-9c1e-093ee1056adf'),(9,'2024-06-20 01:20:13','闅忔満鍥剧墖','https://picsum.photos','http://localhost:3007/e4f6a8076e92645e4c2b8780f1d05ec3.jpg','鍙互鑾峰彇闅忔満涓嶅悓鐨勫浘鐗?,'90ba0786-1923-6ddb-8ac1-e1ed841f62ea'),(10,'2024-06-26 14:03:00','鎵嬫満鍙?,'http://www.yunjm.xyz/','http://localhost:3007/378baa97f892a3b70b3ffc8cb04d8e8f.jpg','闅忔満鎵嬫満鍙风爜鎺ユ敹楠岃瘉鐮佸钩鍙?,'cf26bdaa-759b-6f79-954b-e9e8329b41cb'),(11,'2024-06-30 12:31:36','CSS鍙鍖?,'https://css.bqrdh.com/glassmorphism-editor','http://localhost:3007/6b19f93e9099c0e3c554b8983a77ba15.jpg','涓€娆惧彲瑙嗗寲鑾峰彇CSS鏍峰紡鐨勪唬鐮佺敓鎴愬櫒','2e60725a-90d6-6ff5-911c-9ba1ba9a852d'),(12,'2024-06-30 12:33:06','CSS閰风偒鍓嶇缁勪欢','https://navnav.co','http://localhost:3007/6feb6c349dab08c4f372c0404451734e.jpg','鏁欎綘鎬庝箞浣跨敤css鍐欏姩鐢?,'d4528ce8-79ae-6b3d-9435-8be08ca14761'),(13,'2024-06-30 12:37:18','3000澶氫釜UI鏁堟灉','https://uiverse.io/','http://localhost:3007/864806abf8022200bcd2ceef3c405ee0.jpg','鍐欑殑灏忕粍浠剁殑UI鏁堟灉锛岄兘鏄痟tml鍐欑殑','52ebd46b-cbd2-690f-a6d3-49b03f422ef4'),(14,'2024-07-07 03:55:24','github鍔犻€熷櫒','https://tool.chinaz.com/dns/','http://localhost:3007/dbaaf71717436cb79f4c508615757628.jpg','github鎵撲笉寮€鏃剁殑鍔犻€熷櫒锛屾妸ip鍐欏叆host鏂囦欢','136b30f8-16be-6a88-b90c-9c18c9297b58');
/*!40000 ALTER TABLE `link_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_info`
--

DROP TABLE IF EXISTS `login_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_info` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Create Time',
  `username` varchar(255) DEFAULT NULL COMMENT '鐢ㄦ埛濮撳悕',
  `password` varchar(255) DEFAULT NULL COMMENT '鐢ㄦ埛瀵嗙爜',
  `user_id` varchar(255) NOT NULL COMMENT '鐢ㄦ埛鍞竴id',
  `email` varchar(255) DEFAULT NULL COMMENT '鐢ㄦ埛閭',
  `status` int DEFAULT '1' COMMENT '璐︽埛鐘舵€侊紝1姝ｅ父锛?寮傚父',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '鏇存柊鏃堕棿',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='鐢ㄦ埛淇℃伅';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_info`
--

LOCK TABLES `login_info` WRITE;
/*!40000 ALTER TABLE `login_info` DISABLE KEYS */;
INSERT INTO `login_info` VALUES (13,'2024-07-11 09:42:41','ww','c68af70ec821cc4402d9b9e6aa624b19','2b587411-5e02-662b-afba-217f42be4bda','blww885@163.com',1,'2024-07-15 08:13:49'),(14,'2024-07-14 11:07:28','wj','726d8f5a75d538be4bf894bb4a717568','e4cf9c4f-1cd8-6ba3-b264-57ec3c1b7235','15868191835@163.com',1,'2024-07-15 08:13:49'),(19,'2024-07-15 12:30:33','admin','0c39f2fa28f99c40585e7550c2d255cb','2507eed7-79ff-6fc9-91ad-4a12ac7dde48','17386472953@163.com',1,'2024-07-15 12:30:33'),(22,'2024-07-16 07:31:27','ww001','726d8f5a75d538be4bf894bb4a717568','24eb6d5a-8baf-6d72-9966-39ebc7aeb270',NULL,1,'2024-07-16 07:31:27'),(23,'2024-07-19 06:12:01','apply','726d8f5a75d538be4bf894bb4a717568','ef12ed97-c32a-6c8e-b320-f87e8523f3bd',NULL,1,'2024-07-19 06:12:01'),(24,'2024-07-20 13:57:42','wj009','726d8f5a75d538be4bf894bb4a717568','1f380bc2-154f-6bcb-b808-ec2a753ccc88',NULL,1,'2024-07-20 13:57:42');
/*!40000 ALTER TABLE `login_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mail_info`
--

DROP TABLE IF EXISTS `mail_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mail_info` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `create_time` datetime DEFAULT NULL COMMENT 'Create Time',
  `pass` varchar(255) DEFAULT NULL COMMENT '鐢ㄦ埛鎺堟潈鐮?,
  `user` varchar(255) DEFAULT NULL COMMENT '鐢ㄦ埛閭',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='鐢ㄦ埛璁剧疆淇℃伅';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mail_info`
--

LOCK TABLES `mail_info` WRITE;
/*!40000 ALTER TABLE `mail_info` DISABLE KEYS */;
INSERT INTO `mail_info` VALUES (1,NULL,'HPJEIWOOTHGWHJCO',NULL);
/*!40000 ALTER TABLE `mail_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menus` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '鍞竴id',
  `pid` int NOT NULL COMMENT '涓婄骇鐖惰妭鐐圭殑id锛屽嵆涓簆arentId锛堟敞鎰忥紝children瀛楁鏄笉鐢ㄥ瓨鍌紝children瀛楁鏄€掑綊鏃讹紝娣诲姞杩涘幓鐨勶級',
  `pids` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT '涓婄骇鑺傜偣鐨刬d鏁扮粍杞殑瀛楃涓?,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT '鏍戣妭鐐圭殑鍚嶅瓧',
  `path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT '鍗充负鑿滃崟鐨刾ath',
  `component` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT '褰撹闂畊rl鏃讹紝鍓嶇璺敱闇€瑕佽鍙栧苟娓叉煋鐨?vue鏂囦欢鐨勮矾寰勶紝涓€鑸槸鐩稿浜巔age閲岀殑',
  `type` int DEFAULT '1' COMMENT 'type涓?鏄彍鍗曪紝涓?鏄寜閽?,
  `icon` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT '鑿滃崟鐨勫浘鏍囧悕',
  `sort` int DEFAULT NULL COMMENT '鑿滃崟鐨勪笂涓嬫帓搴?,
  `status` int DEFAULT '1' COMMENT '鏄惁寮€鍚瓧娈碉紝1鏄紑鍚紝2鏄叧闂?,
  `isHidden` int DEFAULT NULL COMMENT '鏄惁闅愯棌鑿滃崟锛?鏄殣钘忥紝0鏄樉绀?,
  `isCache` int DEFAULT NULL COMMENT '鏄惁缂撳瓨锛?鏄紦瀛橈紝2鏄笉缂撳瓨',
  `remark` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT '澶囨敞',
  `isDel` int DEFAULT '1' COMMENT '鍒犻櫎鏍囪瘑锛?浠ｈ〃鏈垹闄ゅ彲鐢紝2浠ｈ〃宸插垹闄や笉鍙敤',
  `key` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT '鑿滃崟閫変腑鍞竴鍊?,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=COMPACT COMMENT='鐢ㄦ埛鑿滃崟淇℃伅';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menus`
--

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
INSERT INTO `menus` VALUES (1,0,NULL,'router.home','/home','./home/index',1,'HomeOutlined',1,1,NULL,NULL,NULL,1,'home'),(2,0,NULL,'router.mails','/mails','./mails/index.tsx',1,'SendOutlined',2,1,NULL,NULL,NULL,1,'mails'),(3,0,NULL,'router.link','/link','./cardLink/index',1,'TagsOutlined',3,1,NULL,NULL,NULL,1,'link'),(4,0,NULL,'router.ai','/ai','./chatGpt/index',1,'OpenAIOutlined',4,1,NULL,NULL,NULL,1,'ai'),(5,0,NULL,'router.todo','/todo','./todoNotification/index',1,'BellOutlined',5,1,NULL,NULL,NULL,1,'todo'),(6,0,NULL,'router.users','/user','./userInfo/index',1,'UserOutlined',6,1,NULL,NULL,NULL,1,'user'),(7,0,NULL,'router.integral','/integral',NULL,1,'PayCircleOutlined',7,1,NULL,NULL,NULL,1,'integral'),(8,7,NULL,'router.integral.table','/integral/integral-table','./integral/index',1,NULL,NULL,1,NULL,NULL,NULL,1,'integral-table'),(9,7,NULL,'router.integral.details','/integral/intergral-details','./integral/components/Details',1,NULL,NULL,1,1,NULL,NULL,1,'integral-details'),(10,0,NULL,'router.article','/article',NULL,1,'ReadOutlined',8,1,NULL,NULL,NULL,1,'article'),(11,10,NULL,'router.article.table','/article/article-table','./article/index',1,NULL,NULL,1,NULL,NULL,NULL,1,'article-table'),(12,10,NULL,'router.article.edit','/article/edit','./article/components/ArticleCreate.tsx',1,NULL,NULL,1,1,NULL,NULL,1,'edit'),(13,10,NULL,'router.article.create','/article/create','./article/components/ArticleCreate.tsx',1,NULL,NULL,1,1,NULL,NULL,1,'create'),(14,0,NULL,'router.auth','/auth','./auth/index',1,'KeyOutlined',9,1,NULL,NULL,NULL,1,'auth'),(15,0,NULL,'router.chat','/chat','./chatBot/index',1,'RobotOutlined',10,1,1,NULL,NULL,1,'chat'),(16,0,NULL,'router.system','/system',NULL,1,'SettingOutlined',11,1,NULL,NULL,NULL,1,'system'),(17,16,NULL,'router.system.account','/system/system-account','./system/account/index',1,NULL,NULL,1,NULL,NULL,NULL,1,'system-account'),(18,16,NULL,'router.system.role','/system/system-role','./system/role/index',1,NULL,NULL,1,NULL,NULL,NULL,1,'system-role'),(105,16,NULL,'router.system.menu','/system/menu','./menuConfig/index',1,NULL,NULL,1,0,NULL,NULL,1,'menu');
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT COMMENT '姣忎竴涓鑹茬殑id',
  `rolename` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT '姣忎竴涓鑹茬殑name鍚嶅瓧',
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL COMMENT '瑙掕壊鐨勫娉?,
  `menuIds` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci COMMENT '褰撳墠鐨勮繖涓鑹茶兘鐪嬪埌锛堝嬀閫夛級鐨勮彍鍗曠殑id锛堢粰瑙掕壊璧嬩簣鑿滃崟锛?,
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=COMPACT COMMENT='鐢ㄦ埛瑙掕壊淇℃伅';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'绠＄悊鍛?,'鎷ユ湁绯荤粺鎵€鏈夋潈闄?,'1,15,16,2,3,14,10,7,6,5,4,17,18,8,9,11,12,13'),(2,'鏅€氱敤鎴?,'鎷ユ湁閮ㄥ垎鏉冮檺','1,16,18,17,12,10,11,13,7,8,9'),(38,'搴旂敤绠＄悊鍛?,'鍙互绠＄悊閭銆佺綉鍧€銆佸緟鍔為€氱煡绛夊姛鑳?,'2,3,5,15,1');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `score_info`
--

DROP TABLE IF EXISTS `score_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `score_info` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `update_time` datetime DEFAULT NULL COMMENT 'Update Time',
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '鐢ㄦ埛鍞竴id',
  `deduction_reason` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '鎵ｅ垎鍘熷洜',
  `deduction_score` int DEFAULT NULL COMMENT '鎵ｉ櫎鍒嗘暟',
  `score_id` varchar(200) DEFAULT NULL COMMENT '鍞竴鍊?,
  `description` varchar(255) DEFAULT NULL COMMENT '鎻忚堪',
  `score` int DEFAULT '100' COMMENT '鎬诲垎',
  `username` varchar(255) DEFAULT NULL COMMENT '鐢ㄦ埛鍚?,
  `deduction_time` datetime DEFAULT NULL COMMENT '鎵ｅ垎鏃堕棿',
  `deduction_person` varchar(16) DEFAULT NULL COMMENT '鎵ｅ垎浜?,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='鍒嗘暟淇℃伅琛?;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score_info`
--

LOCK TABLES `score_info` WRITE;
/*!40000 ALTER TABLE `score_info` DISABLE KEYS */;
INSERT INTO `score_info` VALUES (23,'2024-05-14 20:27:16','c37a4971-0895-445c-b09e-7225c0d0fcef','55555',2,'88cb4526-3f26-4a45-afcb-9da6148242f4','66',48,'ww','2024-05-14 20:21:45','wj'),(25,'2024-05-14 20:23:35','f8d597e7-4ed9-4ab8-9a22-b8a9d278f57c','11',10,'f4a234b3-2b2b-425f-903b-6a45776c6762','11',190,'wj','2024-05-14 20:23:35','wj'),(26,'2024-05-25 12:38:47','97c931bd-dbdf-6bd5-a945-ae93dc369642','88888',5,'1558dca2-82ac-693d-bf61-9898cf8121ba','99999',95,'鎺堟潈鐮?,'2024-05-25 12:38:47','wj');
/*!40000 ALTER TABLE `score_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_info`
--

DROP TABLE IF EXISTS `task_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_info` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
  `task_id` varchar(255) DEFAULT NULL COMMENT '浠诲姟鍞竴ID',
  `task` varchar(512) DEFAULT NULL COMMENT '浠诲姟',
  `status` varchar(512) DEFAULT NULL COMMENT '浠诲姟鐘舵€?,
  `reminder_time` varchar(255) DEFAULT NULL COMMENT '鎻愰啋鏃堕棿',
  `reminder_pattern` varchar(255) DEFAULT NULL COMMENT '鎻愰啋鐨勬椂闂存牸寮?,
  `interval_unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '鏃堕棿闂撮殧鍗曚綅',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='浠诲姟淇℃伅';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_info`
--

LOCK TABLES `task_info` WRITE;
/*!40000 ALTER TABLE `task_info` DISABLE KEYS */;
INSERT INTO `task_info` VALUES (84,'2024-07-15 03:04:52','5c384b34-a810-6e5f-baf1-191cb3e2022f','8888','1','10','intervalTime','second'),(85,'2024-07-15 03:10:39','9afa9be8-ec87-63a6-b903-58ae8a7698fc','999','1','2024-07-15T04:12:58.000Z','fixedDate','second'),(86,'2024-07-15 03:29:46','ba7cc0db-104e-641c-92da-f3ed4e920c19','7777','0','20','intervalTime','second'),(87,'2024-07-15 03:29:47','9a039e78-abd7-602c-80de-01252ef830b5','7777','1','2024-07-15T04:18:54.100Z','fixedDate','second');
/*!40000 ALTER TABLE `task_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL COMMENT '鍚嶅瓧',
  `age` int DEFAULT NULL COMMENT '骞撮緞',
  `weight` varchar(200) DEFAULT NULL COMMENT '浣撻噸',
  `score` int DEFAULT NULL COMMENT '鎬诲垎',
  `status` varchar(10) DEFAULT NULL COMMENT '鐘舵€?,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '鍒涘缓鏃堕棿',
  `user_id` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '鐢ㄦ埛鍞竴ID',
  `description` varchar(255) DEFAULT NULL COMMENT '鎻忚堪',
  `email` varchar(255) DEFAULT NULL COMMENT '閭',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='鐢ㄦ埛琛?;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,'wj',18,'96',200,'1','2024-05-10 08:24:15','f8d597e7-4ed9-4ab8-9a22-b8a9d278f57c',NULL,'15868191835@163.com'),(2,'ww',22,'135',40,'2','2024-05-14 12:04:38','c37a4971-0895-445c-b09e-7225c0d0fcef','999','blww885@163.com'),(3,'鎺堟潈鐮?,18,'176',100,'3','2024-05-24 13:53:13','97c931bd-dbdf-6bd5-a945-ae93dc369642','HPJEIWOOTHGWHJCO',NULL),(16,'wjw',20,'150',300,'3','2024-05-25 05:16:58','8a5ec79e-e5ff-63e6-be95-200f9cf1e28d','3333','wjw666@163.com');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_role`
--

DROP TABLE IF EXISTS `users_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_role` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
  `role_id` int DEFAULT NULL COMMENT '瑙掕壊鍒楄〃鐨勫敮涓€鏍囪瘑',
  `user_id` varchar(255) DEFAULT NULL COMMENT '鐢ㄦ埛鍒楄〃鐨勫敮涓€鏍囪瘑',
  `description` varchar(100) DEFAULT NULL COMMENT '澶囨敞',
  `username` varchar(255) DEFAULT NULL COMMENT '鐢ㄦ埛鍚?,
  `rolename` varchar(255) DEFAULT NULL COMMENT '瑙掕壊鍚?,
  `status` int DEFAULT '1' COMMENT '褰撳墠鐢ㄦ埛瑙掕壊鐨勭姸鎬侊紝1姝ｅ父锛?寮傚父',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='瑙掕壊琛ㄥ拰鐢ㄦ埛琛ㄧ殑鏄犲皠鍏崇郴';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_role`
--

LOCK TABLES `users_role` WRITE;
/*!40000 ALTER TABLE `users_role` DISABLE KEYS */;
INSERT INTO `users_role` VALUES (5,'2024-07-11 03:39:18',2,'e4cf9c4f-1cd8-6ba3-b264-57ec3c1b7235','6666','wj','鏅€氱敤鎴?,1),(6,'2024-07-11 04:30:34',1,'2b587411-5e02-662b-afba-217f42be4bda','888888','ww','绠＄悊鍛?,1),(10,'2024-07-15 08:41:48',1,'2507eed7-79ff-6fc9-91ad-4a12ac7dde48',NULL,'admin','绠＄悊鍛?,1),(13,'2024-07-15 12:42:23',1,'24eb6d5a-8baf-6d72-9966-39ebc7aeb270',NULL,'ww001','绠＄悊鍛?,1),(14,'2024-07-19 06:12:01',38,'ef12ed97-c32a-6c8e-b320-f87e8523f3bd',NULL,'apply','搴旂敤绠＄悊鍛?,1),(15,'2024-07-20 13:57:42',38,'1f380bc2-154f-6bcb-b808-ec2a753ccc88',NULL,'wj009','搴旂敤绠＄悊鍛?,1);
/*!40000 ALTER TABLE `users_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-26  9:43:04
