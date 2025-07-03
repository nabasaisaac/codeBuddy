CREATE DATABASE codeBuddy;

USE codeBuddy;

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(30) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    account_status ENUM('active', 'inactive', 'suspended', 'pending', 'banned', 'locked') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE mentee(
  mentee_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  course VARCHAR(50)
);

CREATE TABLE mentor(
  mentor_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  course VARCHAR(50)
);

