import React, { useState } from 'react';

// Define a type for your course data
type Course = {
  title: string;
  description: string;
  imageUrl: string;
};

const ContentSection = () => {
  // Define your course data
  const courseData: { [key: string]: Course[] } = {
    'Web Dev': [
      { title: 'HTML and CSS Fundamentals', description: 'Learn the basics of HTML and CSS for web development', imageUrl: '/w1.png' },
      { title: 'JavaScript Essentials', description: 'Master the fundamentals of JavaScript programming language', imageUrl: '/w2.jpeg' },
      { title: 'React.js for Beginners', description: 'Get started with React.js library for building user interfaces', imageUrl: '/w3.jpeg' },
      { title: 'Node.js Crash Course', description: 'Learn the basics of Node.js for server-side JavaScript development', imageUrl: '/w4.jpeg' },
    ],
    'App Dev': [
      { title: 'iOS App Development with Swift', description: 'Build native iOS apps using the Swift programming language', imageUrl: '/ios-app-development-company.webp' },
      { title: 'Android App Development with Kotlin', description: 'Develop Android apps using the Kotlin programming language', imageUrl: '/Android-App-Development-1.jpeg' },
      { title: 'Cross-platform Mobile App Development', description: 'Create mobile apps that work on both iOS and Android platforms', imageUrl: '/Cross-Platform-App-development-illustration.webp' },
      { title: 'Flutter UI Design Masterclass', description: 'Design beautiful user interfaces with Flutter framework', imageUrl: '/flutter.png' },
    ],
    'Android': [
      { title: 'Android Basics: User Interface', description: 'Learn the basics of Android app development focusing on UI', imageUrl: '/Android-User-Interface-1.jpeg' },
      { title: 'Android Basics: User Input', description: 'Get started with user input handling in Android apps', imageUrl: '/maxresdefault.jpeg' },
      { title: 'Android Networking Fundamentals', description: 'Understand networking concepts for Android app development', imageUrl: '/Networking-twitter.png' },
      { title: 'Android Database Essentials', description: 'Learn to work with databases in Android apps', imageUrl: '/maxresdefault2.jpeg' },
    ],
    'Python': [
      { title: 'Python Programming Basics', description: 'Introduction to Python programming language', imageUrl: '/1686548640655.jpeg' },
      { title: 'Python Data Structures', description: 'Explore different data structures in Python', imageUrl: '/pythondatastructuresmin.png' },
      { title: 'Python Web Scraping', description: 'Learn how to extract data from websites using Python', imageUrl: '/web-scraping-with-python.png' },
      { title: 'Django Web Development', description: 'Build web applications using Django framework', imageUrl: '/Python-and-Django-for-Web-Development.jpeg' },
    ],
  };
  

  // State to track the active tab
  const [activeTab, setActiveTab] = useState(Object.keys(courseData)[0]);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Free Courses for any one</h2>
          <p className="mt-4 text-lg text-gray-500">From critical workplace skills to technical topics basic IT courses are available for free</p>
        </div>
        <div className="mt-10">
          <div className="flex justify-center">
            {Object.keys(courseData).map((category) => (
              <button
                key={category}
                className={`${
                  activeTab === category ? 'bg-indigo-600 text-white' : 'text-indigo-600 hover:bg-indigo-100'
                } px-4 py-2 mr-4 rounded-full`}
                onClick={() => setActiveTab(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseData[activeTab].map((course, index) => (
              <div
                key={index}
                className="bg-white overflow-hidden shadow-xl rounded-lg relative"
                onMouseEnter={(e) => {
                  e.currentTarget.classList.add('shadow-2xl', 'transform', 'scale-105');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.remove('shadow-2xl', 'transform', 'scale-105');
                }}
              >
                <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                  <p className="mt-2 text-gray-600">{course.description}</p>
                  <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
