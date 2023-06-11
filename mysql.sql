CREATE TABLE `mymucsic`.`tbl_begin` (
  `begin_id` INT NOT NULL,
  `date` DATETIME NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `song_id` INT NOT NULL,
  `album_id` INT NOT NULL,
  `singer_id` INT NOT NULL,
  PRIMARY KEY (`begin_id`),
  INDEX `song_id_idx` (`song_id` ASC) VISIBLE,
  INDEX `album_id_idx` (`album_id` ASC) VISIBLE,
  INDEX `singer_id_idx` (`singer_id` ASC) VISIBLE,
  CONSTRAINT `song_id`
    FOREIGN KEY (`song_id`)
    REFERENCES `mymucsic`.`tbl_song` (`song_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `album_id`
    FOREIGN KEY (`album_id`)
    REFERENCES `mymucsic`.`tbl_album` (`album_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `singer_id`
    FOREIGN KEY (`singer_id`)
    REFERENCES `mymucsic`.`tbl_singer` (`singer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    );

CREATE TABLE `mymucsic`.`tbl_song` (
  `song_id` INT NOT NULL,
  `song_name` VARCHAR(100) NOT NULL,
  `type_id` INT NOT NULL,
  `song_writer_id` INT NOT NULL,
  `listen_count` int NOT NULL,
  `rate` double NOT NULL,
  PRIMARY KEY (`song_id`),
  INDEX `type_id_idx` (`type_id` ASC) VISIBLE,
  INDEX `song_writer_id_idx` (`song_writer_id` ASC) VISIBLE,
  CONSTRAINT `type_id`
    FOREIGN KEY (`type_id`)
    REFERENCES `mymucsic`.`tbl_song_type` (`type_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `song_writer_id`
    FOREIGN KEY (`song_writer_id`)
    REFERENCES `mymucsic`.`tbl_song_writer` (`song_writer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    );
    
CREATE TABLE `mymucsic`.`tbl_song_writer` (
  `song_writer_id` INT NOT NULL,
  `write_date` DATETIME NOT NULL,
  `writer_id` INT NOT NULL,
  PRIMARY KEY (`song_writer_id`),
  INDEX `writer_id_idx` (`writer_id` ASC) VISIBLE,
  CONSTRAINT `writer_id`
    FOREIGN KEY (`writer_id`)
    REFERENCES `mymucsic`.`tbl_writer` (`write_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    );


CREATE TABLE `mymucsic`.`tbl_song_type` (
  `type_id` INT NOT NULL,
  `type_name` VARCHAR(100) NOT NULL,
  `type_description` TEXT NULL,
  PRIMARY KEY (`type_id`)
  );

CREATE TABLE `mymucsic`.`tbl_album` (
  `album_id` INT NOT NULL,
  `album_name` VARCHAR(100) NOT NULL,
  `album_description` TEXT NULL,
  `album_date` DATETIME NOT NULL,
  PRIMARY KEY (`album_id`)
  );

CREATE TABLE `mymucsic`.`tbl_singer` (
  `singer_id` INT NOT NULL,
  `singer_name` VARCHAR(100) NOT NULL,
  `singer_description` TEXT NULL,
  `hometown` VARCHAR(255) NOT NULL,
  `date_of_birth` DATETIME NOT NULL,
  PRIMARY KEY (`singer_id`)
  );

CREATE TABLE `mymucsic`.`tbl_writer` (
  `write_id` INT NOT NULL,
  `writer_name` VARCHAR(100) NOT NULL,
  `writer_description` TEXT NULL,
  PRIMARY KEY (`write_id`)
  );

