-- Table for storing posts
CREATE TABLE Posts (
    PostID INT PRIMARY KEY AUTO_INCREMENT,
    Subject VARCHAR(255),
    Content TEXT NOT NULL,
    CreatedBy VARCHAR(255),
    CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Comments (
    CommentID INT AUTO_INCREMENT PRIMARY KEY,
    PostID INT NOT NULL,
    Comment TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (PostID) REFERENCES Posts(PostID)
);

ALTER TABLE `Comments` ADD `CreatedBy` VARCHAR(255) NOT NULL AFTER `Comment`;
