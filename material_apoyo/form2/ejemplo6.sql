CREATE SCHEMA IF NOT EXISTS `ejemplo6` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
USE `ejemplo6`;

DROP TABLE IF EXISTS `ejemplo6`.`cliente` ;

CREATE  TABLE IF NOT EXISTS `ejemplo5`.`cliente` (
  `dni` INT NOT NULL ,
  `nombres` VARCHAR(45) NOT NULL ,
  `ciudad` VARCHAR(45) NOT NULL ,
  `fecha` DATE NOT NULL ,
  `genero` CHAR(1) NOT NULL ,
  `comentario` VARCHAR(100) NOT NULL ,
  PRIMARY KEY (`dni`) )
ENGINE = InnoDB;
