-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 12, 2024 at 05:01 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `education_live`
--

-- --------------------------------------------------------

--
-- Table structure for table `Comments`
--

CREATE TABLE `Comments` (
  `CommentID` int(11) NOT NULL,
  `PostID` int(11) NOT NULL,
  `Comment` text NOT NULL,
  `CreatedBy` varchar(255) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Comments`
--

INSERT INTO `Comments` (`CommentID`, `PostID`, `Comment`, `CreatedBy`, `CreatedAt`) VALUES
(3, 5, 'Hello Teacher', 'atanur1012', '2024-04-11 22:18:45');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `courseId` varchar(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `department_short` varchar(10) DEFAULT NULL,
  `credits` int(11) NOT NULL,
  `instructor` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `learning_objectives` text DEFAULT NULL,
  `prerequisites` text DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `qualifications` text DEFAULT NULL,
  `experience` text DEFAULT NULL,
  `syllabus` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `courseId`, `name`, `department`, `department_short`, `credits`, `instructor`, `content`, `learning_objectives`, `prerequisites`, `duration`, `qualifications`, `experience`, `syllabus`) VALUES
(1, 'CSE110', 'Blockchain Fundamentals', 'Computer Science and Engineering', 'CSE', 55, 'John Doe', 'Introduction to Blockchain technology, Cryptography basics, Decentralized networks', 'Understand the fundamentals of Blockchain, Learn about various consensus algorithms, Explore smart contracts and decentralized applications', 'Basic knowledge of computer science and programming', '4 weeks', 'PhD in Computer Science, Certified Blockchain Developer', '10+ years of experience in blockchain development and research', 'Week 1: Introduction to Blockchain\nWeek 2: Cryptography and Security\nWeek 3: Decentralized Applications\nWeek 4: Smart Contracts and Use Cases'),
(2, 'CSE120', 'Cybersecurity Basics', 'Computer Science and Engineering', 'CSE', 55, 'David Johnson', 'Introduction to cybersecurity, Network security, Cryptography', 'Understand cybersecurity threats and vulnerabilities, Learn about network security protocols, Explore cryptographic techniques', 'Basic knowledge of computer networks and security concepts', '5 weeks', 'CISSP, CEH, Certified Cybersecurity Analyst', '12+ years of experience in cybersecurity consulting and training', 'Week 1: Introduction to Cybersecurity\nWeek 2: Network Security\nWeek 3: Cryptography Basics\nWeek 4: Cyber Threats and Defense\nWeek 5: Security Best Practices'),
(3, 'CSE130', 'Machine Learning Essentials', 'Computer Science and Engineering', 'CSE', 55, 'Emily Brown', 'Supervised learning, Unsupervised learning, Deep learning', 'Understand machine learning algorithms, Implement supervised and unsupervised learning techniques, Explore deep learning concepts', 'Basic knowledge of programming and statistics', '8 weeks', 'PhD in Machine Learning, Certified Data Scientist', '6+ years of experience in machine learning research and development', 'Week 1: Introduction to Machine Learning\nWeek 2: Supervised Learning\nWeek 3: Unsupervised Learning\nWeek 4: Deep Learning Basics\nWeek 5: Advanced Deep Learning\nWeek 6-8: Projects and Applications'),
(4, 'CSE140', 'Data Structures and Algorithms', 'Computer Science and Engineering', 'CSE', 55, 'Sarah Jones', 'Arrays, Linked lists, Trees, Sorting and searching algorithms', 'Understand data structures and their applications, Implement algorithms for sorting and searching, Analyze algorithmic complexity', 'Basic knowledge of programming and data structures', '6 weeks', 'MS in Computer Science, Certified Software Engineer', '8+ years of experience in software development and algorithm design', 'Week 1: Introduction to Data Structures\nWeek 2: Arrays and Linked Lists\nWeek 3: Trees and Graphs\nWeek 4: Sorting Algorithms\nWeek 5: Searching Algorithms\nWeek 6: Advanced Topics and Applications'),
(5, 'EEE222', 'Digital Circuit Design', 'Electrical Engineering', 'EEE', 55, 'Jane Smith', 'Boolean algebra, Logic gates, Sequential and combinational circuits', 'Design digital circuits using logic gates, Understand sequential and combinational circuits, Simulate and test digital designs', 'Basic knowledge of electronics and digital systems', '6 weeks', 'MS in Electrical Engineering, Certified Electronics Engineer', '8+ years of experience in digital circuit design and simulation', 'Week 1: Introduction to Digital Systems\nWeek 2: Boolean Algebra and Logic Gates\nWeek 3: Sequential Circuits\nWeek 4: Combinational Circuits\nWeek 5: Simulation and Testing\nWeek 6: Project Work'),
(6, 'EEE333', 'Power Systems Analysis', 'Electrical Engineering', 'EEE', 55, 'Michael Wilson', 'Power system components, Transmission line modeling, Load flow analysis', 'Analyze power system components and behavior, Perform load flow and fault analysis, Understand power system stability', 'Basic knowledge of electric circuits and power systems', '7 weeks', 'MS in Electrical Engineering, PE License', '10+ years of experience in power systems engineering and analysis', 'Week 1: Introduction to Power Systems\nWeek 2: Transmission Line Modeling\nWeek 3: Load Flow Analysis\nWeek 4: Fault Analysis\nWeek 5: Power System Stability\nWeek 6-7: Case Studies and Projects');

-- --------------------------------------------------------

--
-- Table structure for table `course_students`
--

CREATE TABLE `course_students` (
  `course_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_students`
--

INSERT INTO `course_students` (`course_id`, `student_id`) VALUES
(2, 1),
(2, 3),
(3, 1),
(3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Posts`
--

CREATE TABLE `Posts` (
  `PostID` int(11) NOT NULL,
  `Subject` varchar(255) DEFAULT NULL,
  `Content` text NOT NULL,
  `CreatedBy` varchar(255) DEFAULT NULL,
  `CreationDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Posts`
--

INSERT INTO `Posts` (`PostID`, `Subject`, `Content`, `CreatedBy`, `CreationDate`) VALUES
(2, 'fasfasfsa', 'asfasfsfsadf', 'teacher123', '2024-04-09 17:59:56'),
(3, 'bla bla', 'bla bla', 'teacher123', '2024-04-09 18:04:25'),
(4, 'afasf', 'asdfasfsaf', 'teacher123', '2024-04-09 18:05:14'),
(5, 'This is teacher', 'Lorem Impsuojfosajfasjflsdkjf', 'teacher123', '2024-04-11 22:00:43'),
(6, 'This is student', 'a;kjf;lasjflasjflasjflsjflasfjlsfjlsafj', 'atanur1012', '2024-04-11 22:15:54');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `course_id`, `title`, `content`) VALUES
(1, 3, 'FIGHT THE CHICKEN', 'Get the Chicken and Attack him'),
(3, 3, 'Power Fight', 'FIGHT THE DEMONS'),
(4, 3, 'Kill the Hour', 'WASTE YOUR TIME'),
(5, 3, 'Power Fight', 'FIGHT THE DEMONS'),
(6, 2, 'Breaking the Cipher', 'Caesar Cipher');

-- --------------------------------------------------------

--
-- Table structure for table `task_completions`
--

CREATE TABLE `task_completions` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `completed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task_completions`
--

INSERT INTO `task_completions` (`id`, `student_id`, `task_id`, `completed`) VALUES
(2, 1, 1, 1),
(3, 1, 4, 1),
(5, 1, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `teacher_login`
--

CREATE TABLE `teacher_login` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher_login`
--

INSERT INTO `teacher_login` (`id`, `username`, `password`, `full_name`, `email`) VALUES
(1, 'teacher123', '$2a$12$hYc/cetN5EPRKLdCRCoRruFaNHVySsqNsTqEK65f7pUk0rq5HNUI.', 'John Doe', 'john.doe@example.com');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `UserID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `RollNumber` int(11) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `JoinDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`UserID`, `username`, `FirstName`, `LastName`, `RollNumber`, `Password`, `Email`, `JoinDate`) VALUES
(1, 'atanur1012', 'Atanu', 'Roy', 22111012, '$2b$10$m/L.NCIa1dfWoAHddRUA2eiDPGW4FLbesQCN.A44lAFzjxU/SbbDK', 'atanuroy911@gmail.com', '2024-04-09 15:51:18'),
(3, 'sazedulh1269', 'Sazedul', 'Haque', 21111269, '$2b$10$uzOV9Jf7fcxn5WHUJDfJr.JF9vt2S4nn0g4fa3vMXWOgvGtC0XGom', 'stsazedul01@jxust.edu.cn', '2024-04-11 21:53:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`CommentID`),
  ADD KEY `PostID` (`PostID`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_students`
--
ALTER TABLE `course_students`
  ADD PRIMARY KEY (`course_id`,`student_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `Posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`PostID`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `task_completions`
--
ALTER TABLE `task_completions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_id` (`task_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `teacher_login`
--
ALTER TABLE `teacher_login`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `CommentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Posts`
--
ALTER TABLE `Posts`
  MODIFY `PostID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `task_completions`
--
ALTER TABLE `task_completions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `teacher_login`
--
ALTER TABLE `teacher_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`PostID`) REFERENCES `Posts` (`PostID`);

--
-- Constraints for table `course_students`
--
ALTER TABLE `course_students`
  ADD CONSTRAINT `course_students_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `course_students_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `Users` (`UserID`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

--
-- Constraints for table `task_completions`
--
ALTER TABLE `task_completions`
  ADD CONSTRAINT `task_completions_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`),
  ADD CONSTRAINT `task_completions_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `Users` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
