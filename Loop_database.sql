-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: loop_database
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `login_information`
--

DROP TABLE IF EXISTS `login_information`;
CREATE TABLE `login_information` (
  `UID` int NOT NULL,
  `Login_log` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT COLLATE=utf8_general_ci;
--

LOCK TABLES `login_information` WRITE;
UNLOCK TABLES;


--
-- Table structure for table `user_information`
--

DROP TABLE IF EXISTS `user_information`;
CREATE TABLE `user_information` (
  `UID` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(45) NOT NULL,
  `Firstname` varchar(45) NOT NULL,
  `Lastname` varchar(45) NOT NULL,
  `Username` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `Dob` date NOT NULL,
  `Plan` enum('-','Free','Montly','Year') NOT NULL,
  `Role` enum('ADMIN','USER') NOT NULL default 'USER',
  `regis_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`UID`),
  UNIQUE(`Username`)
) ENGINE=InnoDB  DEFAULT COLLATE=utf8_general_ci;

LOCK TABLES `user_information` WRITE;
UNLOCK TABLES;

INSERT INTO `user_information`(`Email`, `Firstname`, `Lastname`, `Username`, `Password`, `Dob`, `Plan`, `Role`) VALUES ('admin@admin.com','admin','admin','admin','admin','2022-03-28','-','ADMIN');


--
-- Table structure for table `song_information`
--

DROP TABLE IF EXISTS `song_information`;
CREATE TABLE `song_information` ( 
	`song_id` INT(255) NOT NULL AUTO_INCREMENT , 
	`song_name` VARCHAR(100) NOT NULL , 
	`image` VARCHAR(200) NOT NULL , 
	`artist` VARCHAR(100) NOT NULL , 
	`category` VARCHAR(100) NOT NULL,
	`description` VARCHAR(100) NOT NULL , 
	`create_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`song_id`))
ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

LOCK TABLES `song_information` WRITE;
UNLOCK TABLES;

INSERT INTO `song_information`(`song_name`, `image`, `artist`, `category`, `description`) VALUES ('Beggin','https://i.imgur.com/5pwxIKr_d.webp?maxwidth=760&fidelity=grand','Maneskin','ROCK','Put your loving hand out, baby Cause Im beggin.....');
INSERT INTO `song_information`(`song_name`, `image`, `artist`, `category`, `description`) VALUES ('Calling My Phone','https://i.imgur.com/CujMIKt.jpg','Lil Tjay(feat. 6LACK)','HIP-HOP','Steady callin my phone I done told you before that its over, leave me lone....');
INSERT INTO `song_information`(`song_name`, `image`, `artist`, `category`, `description`) VALUES ('Easy on me','https://i.imgur.com/1dWnM1B.jpg','Adele','POP','There aint no gold in this river.....');
INSERT INTO `song_information`(`song_name`, `image`, `artist`, `category`, `description`) VALUES ('Cold Heart','https://i.imgur.com/l0VzQle.jpg','Elton John & Dua Lipa','POP','Its a human sign When things go wrong....');
INSERT INTO `song_information`(`song_name`, `image`, `artist`, `category`, `description`) VALUES ('Leave the Door Open','https://i.imgur.com/PxluvVi.jpg','Bruno Mars, Anderson .Paak, Silk Sonic','R-AND-B','Said baby, said baby, said baby....');
INSERT INTO `song_information`(`song_name`, `image`, `artist`, `category`, `description`) VALUES ('ZOMBIFIED','https://i.imgur.com/kQkCF8q.jpg','Falling In Reverse','ROCK','The monsters arent living under your bed....');
INSERT INTO `song_information`(`song_name`, `image`, `artist`, `category`, `description`) VALUES ('Straightenin','https://i.imgur.com/N2HjPpQ.png','Migos','HIP-HOP','DJ Durel! (Ayy, Castro go crazy).....');
INSERT INTO `song_information`(`song_name`, `image`, `artist`, `category`, `description`) VALUES ('Gods Country','https://i.imgur.com/0rWNnq1.jpg','Blake Shelton','ROCK','Right outside of this one church town...');