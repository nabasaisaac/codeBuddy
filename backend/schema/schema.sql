CREATE DATABASE IF NOT EXISTS codeBuddy;
USE codeBuddy;

-- Drop tables in reverse order to avoid foreign key constraints
DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS mentorship_requests;
DROP TABLE IF EXISTS personal_info;
DROP TABLE IF EXISTS users;

-- Users table
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

-- Personal Info table
CREATE TABLE IF NOT EXISTS personal_info (
    info_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    phone VARCHAR(20),
    university VARCHAR(100),
    year_of_study INT,
    bio TEXT,
    profile_picture VARCHAR(255),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Mentorship Requests table
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

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    reported_by INT,
    reported_user INT,
    reason TEXT,
    status ENUM('open', 'resolved', 'dismissed') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reported_by) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (reported_user) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Insert sample data
INSERT INTO users (name, email, password_hash, degree, role)
VALUES 
('Admin User', 'admin@codebuddy.com', '$2b$10$YV29LWiYy56DkJqbeP8cNew3nlssOkQVw3qz6GJ23RQvganFcP01G', 'Computer Science', 'Admin'),
('sasa', 'hummy@gmail.com', '$2b$10$HHR7zVvjBQ/.CJ19f4baHOTbcZJXTAEM.t/bWaFAEv12tUr7i/RgS', 'BSIT', 'Mentee'),
('sasa', 'sasa@gmail.com', '$2b$10$DXj7eUJgZunoZeK0sFbWUuOpipoOd/hOp9GdfBAFzif6Sngn9mrsq', 'BSCS', 'Mentor'),
('Absolom Jr', 'absolomjr100@gmail.com', '$2b$10$.aZMYxYKhpk4vjHWYGGrMuAYmqg7yf9dx/QbQThTwcUpLaX7aWRRy', 'BSCS', 'Mentee'),
('masai Absolom', 'masai@gmail.com', '$2b$10$ALfjaxFGM6smeZMVA/wASOvLgZtVBsWVoq6T9FuwvYjhZMiW3qRP2', 'BSDS', 'Mentee');

INSERT INTO personal_info (user_id, phone, university, year_of_study, bio)
VALUES 
(1, '123-456-7890', 'Tech University', 4, 'Admin managing CodeBuddy platform'),
(2, '234-567-8901', 'State University', 2, 'Aspiring web developer'),
(3, '345-678-9012', 'Tech University', 3, 'Experienced mentor in Python'),
(4, '456-789-0123', 'State University', 1, 'Learning JavaScript'),
(5, '567-890-1234', 'Tech University', 2, 'Interested in data science');


