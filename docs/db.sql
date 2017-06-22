DROP DATABASE mobilemassages;
CREATE DATABASE mobilemassages;
GRANT ALL ON mobilemassages.* TO 'mm'@'localhost' IDENTIFIED BY '123456';
USE mobilemassages;
CREATE TABLE todo (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  content VARCHAR(30)
);
INSERT INTO todo VALUES (1,'aaa'),(2,'bbb'),(3,'ccc');
