/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 8.0.21 : Database - transaction
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`transaction` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `transaction`;

/*Data for the table `business_user` */

insert  into `business_user`(`user_id`,`name`,`phone`,`sex`,`identification_front`,`identification_back`,`account`,`license`) values (3,'石荣兴','13718322331',1,'http://transaction-1304038944.cos.ap-beijing.myqcloud.com/root/14bbc98b-c516-419e-b862-fd2beb95c75c/identity_front.png','http://transaction-1304038944.cos.ap-beijing.myqcloud.com/root/14bbc98b-c516-419e-b862-fd2beb95c75c/identity_back.png','123456','http://transaction-1304038944.cos.ap-beijing.myqcloud.com/root/14bbc98b-c516-419e-b862-fd2beb95c75c/license.png');

/*Data for the table `comment` */

/*Data for the table `common_user` */

insert  into `common_user`(`user_id`,`name`,`phone`,`sex`,`city`,`account`) values (2,'石荣兴','13718322331',1,'南京','123456');

/*Data for the table `deal` */

insert  into `deal`(`deal_uuid`,`goods_uuid`,`shop_uuid`,`common_id`,`deal_time`,`deal_count`,`assess`,`status`) values ('39122893-c50a-42c7-b6d4-c4a85d399c1f','c6118fa9-063f-4b34-a3f0-56cc3b2d7236','14bbc98b-c516-419e-b862-fd2beb95c75c',3,'2021-04-01 09:46:10',3,5,2),('b232f1aa-644d-4b4d-88e1-4cc29b8944c5','c6118fa9-063f-4b34-a3f0-56cc3b2d7236','14bbc98b-c516-419e-b862-fd2beb95c75c',3,'2021-04-01 09:48:42',3,5,2),('05d5f371-2752-4325-b285-770a9d23fdc8','c6118fa9-063f-4b34-a3f0-56cc3b2d7236','14bbc98b-c516-419e-b862-fd2beb95c75c',3,'2021-04-01 17:30:25',3,4,2);

/*Data for the table `goods` */

insert  into `goods`(`goods_id`,`goods_uuid`,`shop_uuid`,`goods_name`,`goods_price`,`goods_description`,`goods_count`,`goods_praise_count`,`goods_praise_rate`,`goods_deal_count`,`goods_type`,`goods_discount_price`,`size`,`is_bargain`,`damage_level`,`discount`,`status`) values (1,'c6118fa9-063f-4b34-a3f0-56cc3b2d7236','14bbc98b-c516-419e-b862-fd2beb95c75c','测试商品1',200.00,'这是一个测试商品',11,0,0.00,12,'1',200.00,'非常大',0,10,100,1);

/*Data for the table `goods_picture` */

insert  into `goods_picture`(`goods_uuid`,`picture_path`,`join_time`) values ('c6118fa9-063f-4b34-a3f0-56cc3b2d7236','http://transaction-1304038944.cos.ap-beijing.myqcloud.com/root/14bbc98b-c516-419e-b862-fd2beb95c75c/c6118fa9-063f-4b34-a3f0-56cc3b2d7236/0590a41b-ae91-401b-9521-a527a46e2078.png','2021-04-01 09:24:09'),('c6118fa9-063f-4b34-a3f0-56cc3b2d7236','http://transaction-1304038944.cos.ap-beijing.myqcloud.com/root/14bbc98b-c516-419e-b862-fd2beb95c75c/c6118fa9-063f-4b34-a3f0-56cc3b2d7236/557231d1-c8d6-46e9-b5c1-c7b4e34fd303.png','2021-04-01 09:24:09'),('c6118fa9-063f-4b34-a3f0-56cc3b2d7236','http://transaction-1304038944.cos.ap-beijing.myqcloud.com/root/14bbc98b-c516-419e-b862-fd2beb95c75c/c6118fa9-063f-4b34-a3f0-56cc3b2d7236/a1ba9e2d-3800-4565-a60c-a89e5b7d9455.png','2021-04-01 09:24:09'),('c6118fa9-063f-4b34-a3f0-56cc3b2d7236','http://transaction-1304038944.cos.ap-beijing.myqcloud.com/root/14bbc98b-c516-419e-b862-fd2beb95c75c/c6118fa9-063f-4b34-a3f0-56cc3b2d7236/bb633524-161c-4ea4-a100-c6a63b40f1b3.png','2021-04-01 09:24:09');

/*Data for the table `middle_wallet` */

insert  into `middle_wallet`(`deal_uuid`,`sum_money`,`STATUS`) values ('05d5f371-2752-4325-b285-770a9d23fdc8',600.00,0);

/*Data for the table `shop` */

insert  into `shop`(`shop_id`,`shop_uuid`,`shop_name`,`business_id`,`level`,`praise_rate`,`praise_count`,`deal_count`,`create_time`,`status`) values (1,'14bbc98b-c516-419e-b862-fd2beb95c75c','石荣兴的小店',3,1,0.00,0,12,'2021-04-01 09:20:38',1);

/*Data for the table `shop_car` */

insert  into `shop_car`(`goods_uuid`,`common_id`,`goods_count`,`STATUS`) values ('c6118fa9-063f-4b34-a3f0-56cc3b2d7236',2,6,0);

/*Data for the table `user` */

insert  into `user`(`user_id`,`username`,`password`,`email`,`role`,`status`) values (1,'admin','admin','admin@qq.com',2,0),(2,'srx','3c1151ac953375d549605ca53600d051','1601684622@qq.com',0,0),(3,'srx1','3c1151ac953375d549605ca53600d051','16016846@qq.com',1,0);

/*Data for the table `wallet` */

insert  into `wallet`(`user_id`,`integral`,`sum_money`,`current_money`) values (2,400,600,600),(3,0,2400,2400);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
