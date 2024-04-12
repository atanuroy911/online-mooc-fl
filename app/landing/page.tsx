// app/Landing/page.tsx
'use client'

import React from 'react';
import Carousel from '../components/carousel';
// import ContentSection from '../components/ContentSection';

const images = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
  "image4.jpg",
]

const imageInfo = [
  { 
    mainText: 'Unlock the potential of Masters Courses and Projects', 
    subText: 'Join thousands of learners worldwide on our MOOC platform. Explore advanced topics and practical projects to elevate your skills.' 
  },
  { 
    mainText: 'Master your future with specialized courses and hands-on projects', 
    subText: 'Enroll in our Masters Courses and Projects designed to equip you with the expertise needed for success in your field. Get started today!' 
  },
  { 
    mainText: 'Empower your career with our advanced training solutions', 
    subText: 'Take your skills to the next level with our specialized Masters Courses and Projects. Invest in your professional development and unlock new opportunities.' 
  },
  { 
    mainText: 'Transform your learning journey with Masters Courses and Projects', 
    subText: 'Stay ahead of industry trends and gain practical experience through our MOOC platform. Accelerate your career growth with our comprehensive curriculum.' 
  }
];


export default function Page() {
  return (
    <div className="container mx-auto">
      {/* <Header /> */}
      <section className="mt-8">
        {/* <Banner /> */}
        <Carousel images={images} imageInfo={imageInfo}/>
      </section>
      
      {/* Add other sections/components here */}

      {/* <section id='free-courses'>
        <ContentSection/>
      </section> */}
      
    </div>
  );
};

