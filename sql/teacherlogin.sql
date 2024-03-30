CREATE TABLE teacher_login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO teacher_login (username, password, full_name, email) 
VALUES ('teacher123', '$2a$12$hYc/cetN5EPRKLdCRCoRruFaNHVySsqNsTqEK65f7pUk0rq5HNUI.', 'John Doe', 'john.doe@example.com');

-- teacher123
-- teacherpassword