CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Book`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Book` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Book` (
  `idBook` INT NOT NULL,
  PRIMARY KEY (`idBook`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Genre`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Genre` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Genre` (
  `idGenre` INT NOT NULL,
  PRIMARY KEY (`idGenre`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Role` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Role` (
  `idRole` INT NOT NULL,
  PRIMARY KEY (`idRole`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`User` ;

CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `idUser` INT NOT NULL,
  `Role_idRole` INT NOT NULL,
  PRIMARY KEY (`idUser`, `Role_idRole`),
  INDEX `fk_User_Role1_idx` (`Role_idRole` ASC) VISIBLE,
  CONSTRAINT `fk_User_Role1`
    FOREIGN KEY (`Role_idRole`)
    REFERENCES `mydb`.`Role` (`idRole`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Order` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Order` (
  `idOrder` INT NOT NULL,
  `User_idUser` INT NOT NULL,
  PRIMARY KEY (`idOrder`, `User_idUser`),
  INDEX `fk_Order_User_idx` (`User_idUser` ASC) VISIBLE,
  CONSTRAINT `fk_Order_User`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `mydb`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Author`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Author` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Author` (
  `idAuthor` INT NOT NULL,
  PRIMARY KEY (`idAuthor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Book_has_Author`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Book_has_Author` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Book_has_Author` (
  `Book_idBook` INT NOT NULL,
  `Author_idAuthor` INT NOT NULL,
  PRIMARY KEY (`Book_idBook`, `Author_idAuthor`),
  INDEX `fk_Book_has_Author_Author1_idx` (`Author_idAuthor` ASC) VISIBLE,
  INDEX `fk_Book_has_Author_Book1_idx` (`Book_idBook` ASC) VISIBLE,
  CONSTRAINT `fk_Book_has_Author_Book1`
    FOREIGN KEY (`Book_idBook`)
    REFERENCES `mydb`.`Book` (`idBook`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Book_has_Author_Author1`
    FOREIGN KEY (`Author_idAuthor`)
    REFERENCES `mydb`.`Author` (`idAuthor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Book_has_Genre`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Book_has_Genre` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Book_has_Genre` (
  `Book_idBook` INT NOT NULL,
  `Genre_idGenre` INT NOT NULL,
  PRIMARY KEY (`Book_idBook`, `Genre_idGenre`),
  INDEX `fk_Book_has_Genre_Genre1_idx` (`Genre_idGenre` ASC) VISIBLE,
  INDEX `fk_Book_has_Genre_Book1_idx` (`Book_idBook` ASC) VISIBLE,
  CONSTRAINT `fk_Book_has_Genre_Book1`
    FOREIGN KEY (`Book_idBook`)
    REFERENCES `mydb`.`Book` (`idBook`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Book_has_Genre_Genre1`
    FOREIGN KEY (`Genre_idGenre`)
    REFERENCES `mydb`.`Genre` (`idGenre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Order_has_Book`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Order_has_Book` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Order_has_Book` (
  `Order_idOrder` INT NOT NULL,
  `Book_idBook` INT NOT NULL,
  PRIMARY KEY (`Order_idOrder`, `Book_idBook`),
  INDEX `fk_Order_has_Book_Book1_idx` (`Book_idBook` ASC) VISIBLE,
  INDEX `fk_Order_has_Book_Order1_idx` (`Order_idOrder` ASC) VISIBLE,
  CONSTRAINT `fk_Order_has_Book_Order1`
    FOREIGN KEY (`Order_idOrder`)
    REFERENCES `mydb`.`Order` (`idOrder`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Order_has_Book_Book1`
    FOREIGN KEY (`Book_idBook`)
    REFERENCES `mydb`.`Book` (`idBook`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`RateInfo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`RateInfo` ;

CREATE TABLE IF NOT EXISTS `mydb`.`RateInfo` (
  `idRateInfo` INT NOT NULL,
  PRIMARY KEY (`idRateInfo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Rate`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Rate` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Rate` (
  `Book_idBook` INT NOT NULL,
  `User_idUser` INT NOT NULL,
  `RateInfo_idRateInfo` INT NOT NULL,
  PRIMARY KEY (`Book_idBook`, `User_idUser`, `RateInfo_idRateInfo`),
  INDEX `fk_Rate_Book1_idx` (`Book_idBook` ASC) VISIBLE,
  INDEX `fk_Rate_User1_idx` (`User_idUser` ASC) VISIBLE,
  INDEX `fk_Rate_RateInfo1_idx` (`RateInfo_idRateInfo` ASC) VISIBLE,
  CONSTRAINT `fk_Rate_Book1`
    FOREIGN KEY (`Book_idBook`)
    REFERENCES `mydb`.`Book` (`idBook`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Rate_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `mydb`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Rate_RateInfo1`
    FOREIGN KEY (`RateInfo_idRateInfo`)
    REFERENCES `mydb`.`RateInfo` (`idRateInfo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;