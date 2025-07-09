CREATE DATABASE IF NOT EXISTS codeBuddy;

drop DATABASE CODEbUDDY;
USE codeBuddy;

CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    degree VARCHAR(50),
    role ENUM('Mentee', 'Mentor') NOT NULL,
    account_status ENUM('active', 'inactive', 'suspended', 'pending', 'banned', 'locked') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

USE CODEBUDDY;
select * from users;
DESC users;
CREATE TABLE IF NOT EXISTS mentorship_requests (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    mentee_id INT,
    mentor_id INT,
    description TEXT,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (mentee_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (mentor_id) REFERENCES users(user_id) ON DELETE CASCADE
);

use codeBuddy;
SELECT * FROM mentorship_requests WHERE mentor_id = ? order BY created_at ASC
DROP TABLE mentorship_requests;

SELECT * FROM mentorship_requests WHERE mentor_id=5 ORDER BY created_at DESC;


