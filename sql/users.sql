CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    Password VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    JoinDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `Users` ADD `FirstName` VARCHAR(255) NOT NULL AFTER `UserID`, ADD `LastName` VARCHAR(255) NOT NULL AFTER `FirstName`, ADD `RollNumber` INT NOT NULL AFTER `LastName`;

CREATE TABLE course_students (
    course_id INT,
    student_id INT,
    PRIMARY KEY (course_id, student_id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (student_id) REFERENCES Users(UserId)
);