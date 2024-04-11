-- Create the table
CREATE TABLE courses (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255),
    department VARCHAR(255),
    department_short VARCHAR(10),
    instructor VARCHAR(255),
    content TEXT,
    learning_objectives TEXT,
    prerequisites TEXT,
    duration VARCHAR(50),
    qualifications TEXT,
    experience TEXT,
    syllabus TEXT
);

ALTER TABLE `courses` ADD `credits` INT NOT NULL AFTER `department_short`;


-- Insert data
INSERT INTO courses (id, name, department, department_short, credits, instructor, content, learning_objectives, prerequisites, duration, qualifications, experience, syllabus) VALUES
('CSE110', 'Blockchain Fundamentals', 'Computer Science and Engineering', 'CSE', 55,'John Doe', 'Introduction to Blockchain technology, Cryptography basics, Decentralized networks', 'Understand the fundamentals of Blockchain, Learn about various consensus algorithms, Explore smart contracts and decentralized applications', 'Basic knowledge of computer science and programming', '4 weeks', 'PhD in Computer Science, Certified Blockchain Developer', '10+ years of experience in blockchain development and research', 'Week 1: Introduction to Blockchain\nWeek 2: Cryptography and Security\nWeek 3: Decentralized Applications\nWeek 4: Smart Contracts and Use Cases'),
('EEE222', 'Digital Circuit Design', 'Electrical Engineering', 'EEE',55, 'Jane Smith', 'Boolean algebra, Logic gates, Sequential and combinational circuits', 'Design digital circuits using logic gates, Understand sequential and combinational circuits, Simulate and test digital designs', 'Basic knowledge of electronics and digital systems', '6 weeks', 'MS in Electrical Engineering, Certified Electronics Engineer', '8+ years of experience in digital circuit design and simulation', 'Week 1: Introduction to Digital Systems\nWeek 2: Boolean Algebra and Logic Gates\nWeek 3: Sequential Circuits\nWeek 4: Combinational Circuits\nWeek 5: Simulation and Testing\nWeek 6: Project Work'),
('CSE120', 'Cybersecurity Basics', 'Computer Science and Engineering', 'CSE',55, 'David Johnson', 'Introduction to cybersecurity, Network security, Cryptography', 'Understand cybersecurity threats and vulnerabilities, Learn about network security protocols, Explore cryptographic techniques', 'Basic knowledge of computer networks and security concepts', '5 weeks', 'CISSP, CEH, Certified Cybersecurity Analyst', '12+ years of experience in cybersecurity consulting and training', 'Week 1: Introduction to Cybersecurity\nWeek 2: Network Security\nWeek 3: Cryptography Basics\nWeek 4: Cyber Threats and Defense\nWeek 5: Security Best Practices'),
('CSE130', 'Machine Learning Essentials', 'Computer Science and Engineering', 'CSE',55, 'Emily Brown', 'Supervised learning, Unsupervised learning, Deep learning', 'Understand machine learning algorithms, Implement supervised and unsupervised learning techniques, Explore deep learning concepts', 'Basic knowledge of programming and statistics', '8 weeks', 'PhD in Machine Learning, Certified Data Scientist', '6+ years of experience in machine learning research and development', 'Week 1: Introduction to Machine Learning\nWeek 2: Supervised Learning\nWeek 3: Unsupervised Learning\nWeek 4: Deep Learning Basics\nWeek 5: Advanced Deep Learning\nWeek 6-8: Projects and Applications'),
('EEE333', 'Power Systems Analysis', 'Electrical Engineering', 'EEE',55, 'Michael Wilson', 'Power system components, Transmission line modeling, Load flow analysis', 'Analyze power system components and behavior, Perform load flow and fault analysis, Understand power system stability', 'Basic knowledge of electric circuits and power systems', '7 weeks', 'MS in Electrical Engineering, PE License', '10+ years of experience in power systems engineering and analysis', 'Week 1: Introduction to Power Systems\nWeek 2: Transmission Line Modeling\nWeek 3: Load Flow Analysis\nWeek 4: Fault Analysis\nWeek 5: Power System Stability\nWeek 6-7: Case Studies and Projects'),
('CSE140', 'Data Structures and Algorithms', 'Computer Science and Engineering', 'CSE',55, 'Sarah Jones', 'Arrays, Linked lists, Trees, Sorting and searching algorithms', 'Understand data structures and their applications, Implement algorithms for sorting and searching, Analyze algorithmic complexity', 'Basic knowledge of programming and data structures', '6 weeks', 'MS in Computer Science, Certified Software Engineer', '8+ years of experience in software development and algorithm design', 'Week 1: Introduction to Data Structures\nWeek 2: Arrays and Linked Lists\nWeek 3: Trees and Graphs\nWeek 4: Sorting Algorithms\nWeek 5: Searching Algorithms\nWeek 6: Advanced Topics and Applications');


CREATE TABLE course_students (
    course_id INT,
    student_id INT,
    PRIMARY KEY (course_id, student_id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (student_id) REFERENCES students(id)
);