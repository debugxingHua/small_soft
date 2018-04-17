CREATE DATABASE IF NOT EXISTS `sf_women` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `sf_women`;

--  创建客户表
--  user_id、名字、头像路径、状态地址、
DROP TABLE IF EXISTS `sf_user`;
CREATE TABLE `sf_user` (
  `user_id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `open_id` varchar(100) NOT NULL DEFAULT '',
  `union_id` varchar(100) NOT NULL DEFAULT '',
  `date` varchar(1000) NOT NULL DEFAULT '',
  `time` varchar(100) NOT NULL DEFAULT '',
  `count` INT(100) NOT NULL DEFAULT 1,
  `status` INT(100) NOT NULL DEFAULT 1,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--  创建收藏表
--  user_id、商品id
DROP TABLE IF EXISTS `sf_favorite`;
CREATE TABLE `sf_favorite` (
  `favorite_id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` SMALLINT (6) NOT NULL DEFAULT 0,
  `commodity_id` SMALLINT (6) NOT NULL DEFAULT 0,
  `date` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`favorite_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--  创建商品表
--  id、标题、主图url、现价、旧价、状态
DROP TABLE IF EXISTS `sf_commodity`;
CREATE TABLE `sf_commodity` (
  `commodity_id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(1000) NOT NULL DEFAULT '',
  `img_url` varchar(1000) NOT NULL DEFAULT '',
  `money_now` varchar(100) NOT NULL DEFAULT '',
  `money_old` varchar(100) NOT NULL DEFAULT '',
  `expressage` INT (100) NOT NULL DEFAULT 0,
  `sales` INT (100) NOT NULL DEFAULT 0,
  `color` varchar(1000) NOT NULL DEFAULT '',
  `size` varchar(1000) NOT NULL DEFAULT '',
  `order` INT(100) NOT NULL DEFAULT 0,
  `status` INT(100) NOT NULL DEFAULT 1,
  PRIMARY KEY (`commodity_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

INSERT INTO `sf_commodity` VALUES(1,'你所不知道的红酒','http://f10.baidu.com/it/u=121654667,1482133440&fm=72','199','599',0,1000,'红色,白色,屎黄色,透明色','S,M,L,XL,2Xl',0,1);
INSERT INTO `sf_commodity` VALUES(2,'电饭锅电饭锅水','http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg','99','499',1,1000,'红色,白色,屎黄色,透明色','S,M,L,XL,2Xl',0,1);
INSERT INTO `sf_commodity` VALUES(3,'第三方拉拉队首付','http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=27&gp=0.jpg','199','699',8,1000,'红色,白色,屎黄色,透明色','S,M,L,XL,2Xl',0,1);
INSERT INTO `sf_commodity` VALUES(4,'水电费是否对啥的水电费大法','http://f10.baidu.com/it/u=121654667,1482133440&fm=72','199','599',0,1000,'红色,白色,屎黄色,透明色','S,M,L,XL,2Xl',0,1);
INSERT INTO `sf_commodity` VALUES(5,'手动阀手动阀士大夫撒发达手动阀是的发送到','http://f10.baidu.com/it/u=121654667,1482133440&fm=72','699','799',7,1000,'红色,白色,屎黄色,透明色','S,M,L,XL,2Xl',0,1);
INSERT INTO `sf_commodity` VALUES(6,'飞手动阀发斯蒂芬手动阀打死废物egg','http://f10.baidu.com/it/u=121654667,1482133440&fm=72','199','599',2,1000,'红色,白色,屎黄色,透明色','S,M,L,XL,2Xl',0,1);

--  创建商品详情图片表
--  图片详情列表：关联商品commodity_id、img_url、
DROP TABLE IF EXISTS `sf_commodity_img`;
CREATE TABLE `sf_commodity_img` (
  `ci_id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `commodity_id` SMALLINT (6) NOT NULL DEFAULT 0,
  `img_url` varchar(1000) NOT NULL DEFAULT '空',
  PRIMARY KEY (`ci_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

INSERT INTO `sf_commodity_img` VALUES(1,1,'http://hexinghua.club/images/timg%20(30).jpg');
INSERT INTO `sf_commodity_img` VALUES(2,2,'http://hexinghua.club/images/timg%20(29).jpg');
INSERT INTO `sf_commodity_img` VALUES(3,2,'http://hexinghua.club/images/timg%20(28).jpg');
INSERT INTO `sf_commodity_img` VALUES(4,2,'http://hexinghua.club/images/timg%20(27).jpg');
INSERT INTO `sf_commodity_img` VALUES(5,2,'http://hexinghua.club/images/timg%20(26).jpg');
INSERT INTO `sf_commodity_img` VALUES(6,2,'http://hexinghua.club/images/timg%20(25).jpg');
INSERT INTO `sf_commodity_img` VALUES(7,2,'http://hexinghua.club/images/timg%20(24).jpg');
INSERT INTO `sf_commodity_img` VALUES(8,2,'http://hexinghua.club/images/timg%20(23).jpg');
INSERT INTO `sf_commodity_img` VALUES(9,2,'http://hexinghua.club/images/timg%20(22).jpg');
INSERT INTO `sf_commodity_img` VALUES(10,2,'http://hexinghua.club/images/timg%20(21).jpg');
INSERT INTO `sf_commodity_img` VALUES(11,2,'http://hexinghua.club/images/timg%20(20).jpg');
INSERT INTO `sf_commodity_img` VALUES(12,2,'http://hexinghua.club/images/timg%20(19).jpg');
INSERT INTO `sf_commodity_img` VALUES(13,2,'http://hexinghua.club/images/timg%20(18).jpg');
INSERT INTO `sf_commodity_img` VALUES(14,2,'http://hexinghua.club/images/timg%20(17).jpg');
INSERT INTO `sf_commodity_img` VALUES(15,2,'http://hexinghua.club/images/timg%20(16).jpg');
INSERT INTO `sf_commodity_img` VALUES(16,2,'http://hexinghua.club/images/timg%20(15).jpg');
INSERT INTO `sf_commodity_img` VALUES(17,2,'http://hexinghua.club/images/timg%20(14).jpg');
INSERT INTO `sf_commodity_img` VALUES(18,2,'http://hexinghua.club/images/timg%20(13).jpg');
INSERT INTO `sf_commodity_img` VALUES(19,2,'http://hexinghua.club/images/timg%20(12).jpg');
INSERT INTO `sf_commodity_img` VALUES(20,2,'http://hexinghua.club/images/timg%20(11).jpg');
--  创建swiper图片表
DROP TABLE IF EXISTS `sf_swiper_img`;
CREATE TABLE `sf_swiper_img` (
  `si_id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `swiper_id` SMALLINT (6) NOT NULL DEFAULT 0,
  `img_url` varchar(1000) NOT NULL DEFAULT '空',
  PRIMARY KEY (`si_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

INSERT INTO `sf_swiper_img` VALUES(1,1,'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg');
INSERT INTO `sf_swiper_img` VALUES(2,1,'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=27&gp=0.jpg');
INSERT INTO `sf_swiper_img` VALUES(3,1,'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=27&gp=0.jpg');

--  创建购物车
DROP TABLE IF EXISTS `sf_shop_cart`;
CREATE TABLE `sf_shop_cart` (
  `sc_id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` SMALLINT (6) NOT NULL DEFAULT 0,
  `commodity_id` SMALLINT (6) NOT NULL DEFAULT 0,
  `color` varchar(100) NOT NULL DEFAULT '',
  `size` varchar(100) NOT NULL DEFAULT '',
  `date` VARCHAR (100) NOT NULL DEFAULT '',
  `count` INT(100) NOT NULL DEFAULT 1,
  `selected` SMALLINT(10) NOT NULL DEFAULT 1,
  PRIMARY KEY (`sc_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

INSERT INTO `sf_shop_cart` VALUES(1,18,2,'red','12cm','2018年3月26日18:00:05',1,1);
INSERT INTO `sf_shop_cart` VALUES(2,2,3,'blue','13cm','2018年3月26日18:00:09',1,1);
INSERT INTO `sf_shop_cart` VALUES(3,3,2,'red','14cm','2016年3月26日18:00:13',1,1);


--  创建订单
DROP TABLE IF EXISTS `sf_indent`;
CREATE TABLE `sf_indent` (
  `indent_id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` SMALLINT (6) NOT NULL DEFAULT 0,
  `address_id` SMALLINT (6) NOT NULL DEFAULT 0,
  `commodity_id` VARCHAR (100) NOT NULL DEFAULT ',',
  `color` varchar(100) NOT NULL DEFAULT '',
  `size` varchar(100) NOT NULL DEFAULT '',
  `date` VARCHAR (100) NOT NULL DEFAULT '',
  `count` VARCHAR (100) NOT NULL DEFAULT 1,
  `red_bag` INT(100) NOT NULL DEFAULT 0,
  `expressage` INT(100) NOT NULL DEFAULT 0,
  `pay_money` VARCHAR (100) NOT NULL DEFAULT '',
  `money` VARCHAR (100) NOT NULL DEFAULT '',
  `leave_word_input` VARCHAR (1000) NOT NULL DEFAULT '',
  `status` SMALLINT(10) NOT NULL DEFAULT 1,
  PRIMARY KEY (`indent_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--  创建地址信息
--  用户id、姓名、邮编、电话、地址、默认地址、状态
DROP TABLE IF EXISTS `sf_address`;
CREATE TABLE `sf_address` (
  `address_id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` SMALLINT (6) NOT NULL DEFAULT 0,
  `name` varchar(100) NOT NULL DEFAULT '',
  `postcode` varchar(100) NOT NULL DEFAULT '',
  `phone` VARCHAR (100) NOT NULL DEFAULT '',
  `address` VARCHAR (100) NOT NULL DEFAULT '',
  `default` INT(2) NOT NULL DEFAULT 0,
  `status` SMALLINT(10) NOT NULL DEFAULT 1,
  PRIMARY KEY (`address_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;