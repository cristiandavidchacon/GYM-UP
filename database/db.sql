CREATE DATABASE db_CAFS;

USE db_CAFS;

-- TABLE USER
-- Todas las contraseñas estan cifrado con SHA1

CREATE TABLE users (
  id INT(11) NOT NULL, 
  username VARCHAR(60) NOT NULL, 
  password VARCHAR(120) NOT NULL,
  fullname VARCHAR(60) NOT NULL 
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

INSERT INTO users (id, username, password, fullname) 
  VALUES (1, 'john.carter@uao.edu.co', 'password1', 'John Carter');

INSERT INTO users (id, username, password, fullname) 
  VALUES (3, 'rafael_antonio.gomez@uao.edu.co', 'password1', 'Rafael Gomez');


SELECT * FROM users;

