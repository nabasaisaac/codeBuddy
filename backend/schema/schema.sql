CREATE DATABASE IF NOT EXISTS codeBuddy;

drop DATABASE CODEbUDDY;
USE codeBuddy;

CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    degree VARCHAR(50),
    role ENUM('Mentee', 'Mentor', 'Admin') NOT NULL,
    account_status ENUM('active', 'inactive', 'suspended', 'pending', 'banned', 'locked') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO users (
    name, 
    email, 
    password_hash, 
    degree, 
    role
) VALUES (
    'Isaac Nabasa', 
    'nabasaisaac16@gmail.com', 
    '$2b$10$vl4NkboPFOf67PqxvSZgueexshvNB732qO7MZ008xCatH7CEdU8N.', 
    'BSCS', 
    'Admin'
);

SELECT * FROM users;
SET FOREIGN_KEY_CHECKS = 1;
DROP TABLE users;

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

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE mentorship_requests;
use codeBuddy;
SELECT * FROM mentorship_requests WHERE mentor_id = ? order BY created_at ASC
DROP TABLE mentorship_requests;

SELECT * FROM mentorship_requests WHERE mentor_id=5 ORDER BY created_at DESC;
USE CODEBUDDY;
SELECT * FROM mentorship_requests;

INSERT INTO users (name, email, password_hash, degree, role)
VALUES 
('sasa', 'hummy@gmail.com', '$2b$10$HHR7zVvjBQ/.CJ19f4baHOTbcZJXTAEM.t/bWaFAEv12tUr7i/RgS', 'BSIT', 'Mentee'),
('sasa', 'sasa@gmail.com', '$2b$10$DXj7eUJgZunoZeK0sFbWUuOpipoOd/hOp9GdfBAFzif6Sngn9mrsq', 'BSCS', 'Mentor'),
('Absolom Jr', 'absolomjr100@gmail.com', '$2b$10$.aZMYxYKhpk4vjHWYGGrMuAYmqg7yf9dx/QbQThTwcUpLaX7aWRRy', 'BSCS', 'Mentee'),
('masai Absolom', 'masai@gmail.com', '$2b$10$ALfjaxFGM6smeZMVA/wASOvLgZtVBsWVoq6T9FuwvYjhZMiW3qRP2', 'BSDS', 'Mentee'),
('dorcus', 'dorcus@gmail.com', '$2b$10$fHBuQLe60p0uZ4JaxkD2YOLp1w7nyvRUE3T.RHqGq4cwY5jxTkBLm', 'BSCS', 'Mentor'),
('alvin', 'alvin@gmail.com', '$2b$10$Hq/L8K6GBQF9TIjkXEplTuCPwN9d4IygYcN4D0NCUlzW5pEO0JAGW', 'BSCS', 'Mentor'),
('allen', 'allen@gmail.com', '$2b$10$32E3e44FQY1furW0NosG1OX9CwHcny08IQ9qYJsJC0wJUztWqJIKa', 'BSCS', 'Mentor'),
('okolimo', 'okolimo@gmail.com', '$2b$10$BiLB9/P7m574yXBoo5Zgquc57684.N9NRg5U6HgV0hGsfYLesdm8i', 'BSCS', 'Mentor'),
('mukama', 'mukama@gmail.com', '$2b$10$cDaZ/9hiygzH/qK01wQITem31axktLeFDqJLF3uwPI3WXptyiA0i.', 'BSCS', 'Mentee'),
('aggrey', 'aggrey@gmail.com', '$2b$10$WQJ12t/l72.0BnaejB7fdexupGziQXbY7cVq2my96cUc1zRi91EqO', 'BSIT', 'Mentee'),
('amos', 'amos@gmail.com', '$2b$10$3czc1WWyVKE53GEMk8JqVeesflnVdUqTuru7Yi2Q/aiatCbLlIZuK', 'BSDS', 'Mentee'),
('komaketch', 'komaketch@gmail.com', '$2b$10$NJ8zSUTdq1fPr6xtX1hTyesa9C3ZQWyGdEcC6YUQTZbRJ/cEaD1j2', 'BSIT', 'Mentor'),
('denish', 'denish@gmail.com', '$2b$10$AbcOR24tWEV3JCuy0XmBN.mPY8AkgdBaFLAg/wr.Lzz/M9l.3vy.W', 'BSIT', 'Mentor'),
('eddie', 'eddie@gmail.com', '$2b$10$cv9WHvmuNkdUPSzJaLXUlO/HYjjaEr0QuHtK1Y8XwWa67JoS2Pnnm', 'BSIT', 'Mentor'),
('sanyu', 'sanyu@gmail.com', '$2b$10$lJ09msfRgJgfi5Pqf1AzROskF6m7zVvPtSaLrxlZ84bnLtpfdg6me', 'BSDS', 'Mentor'),
('solomy', 'solomy@gmail.com', '$2b$10$TO/tLeJ5fmQn9j7243AfFO44lySaJGwd8BT7mFhpYvnMIGdRM2aS.', 'BSDS', 'Mentor'),
('kagoya', 'kagoya@gmail.com', '$2b$10$9nGB3a1XbXI5ZYRK5I/hHeubzzivKkaLrtVFYxnMZT6dBCF/BlLKO', 'BSDS', 'Mentor'),
('Mukam Joseph', 'josephmukama77@gmail.com', '$2b$10$YV29LWiYy56DkJqbeP8cNew3nlssOkQVw3qz6GJ23RQvganFcP01G', 'BSDS', 'Mentor'),
('mukama atom', 'mukama55@gmail.com', '$2b$10$/jZYItTjgfFRtaCWZRAlWeOz6vfDMdgnG.io3S/12bcBWgYLxQW9u', 'BSDS', 'Mentee'),
('Akankwasa Tom', 'atomixtoms@gmail.com', '$2b$10$vVkffxfV2tnC6oq5.lrKAuxgTWhaF4JNHiE0uNGKUbwC0doQpV/Ly', 'BSIT', 'Mentor'),
('joseph mukama', 'josephmukama6@gmail.com', '$2b$10$37D.Gt2DJD65OvCYC0B.luCnzd/e5AJIPHmhaNvSVYZlbIXVViGU6', 'BSIT', 'Mentee');