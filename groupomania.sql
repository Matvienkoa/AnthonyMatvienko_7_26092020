-- MySQL Workbench Synchronization
-- Generated: 2021-04-21 11:06
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: matvi

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

ALTER TABLE `groupomania`.`posts` 
DROP FOREIGN KEY `fk_posts_users`;

ALTER TABLE `groupomania`.`comments` 
DROP FOREIGN KEY `fk_comments_posts1`;

ALTER TABLE `groupomania`.`likes` 
DROP FOREIGN KEY `fk_likes_posts1`;

ALTER TABLE `groupomania`.`posts` 
CHANGE COLUMN `userId` `userId` INT(11) NULL DEFAULT NULL ;

ALTER TABLE `groupomania`.`likes` 
CHANGE COLUMN `postId` `postId` INT(11) NULL DEFAULT NULL ,
CHANGE COLUMN `userId` `userId` INT(11) NULL DEFAULT NULL ;

ALTER TABLE `groupomania`.`posts` 
ADD CONSTRAINT `fk_posts_users`
  FOREIGN KEY (`userId`)
  REFERENCES `groupomania`.`users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `groupomania`.`comments` 
DROP FOREIGN KEY `fk_comments_users1`;

ALTER TABLE `groupomania`.`comments` ADD CONSTRAINT `fk_comments_users1`
  FOREIGN KEY (`userId`)
  REFERENCES `groupomania`.`users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_comments_posts1`
  FOREIGN KEY (`postId`)
  REFERENCES `groupomania`.`posts` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `groupomania`.`likes` 
DROP FOREIGN KEY `fk_likes_users1`;

ALTER TABLE `groupomania`.`likes` ADD CONSTRAINT `fk_likes_users1`
  FOREIGN KEY (`userId`)
  REFERENCES `groupomania`.`users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_likes_posts1`
  FOREIGN KEY (`postId`)
  REFERENCES `groupomania`.`posts` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
